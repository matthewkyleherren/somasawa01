! function () {
	"use strict";
	/*!
	 * GSAP 3.10.1
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	 */
	let t, e, n, i, r, s, a, o, l, c = {
			autoSleep: 120,
			force3D: "auto",
			nullTargetWarn: 1,
			units: {
				lineHeight: ""
			}
		},
		h = {
			duration: .5,
			overwrite: !1,
			delay: 0
		},
		u = 1e8,
		d = 1e-8,
		p = 2 * Math.PI,
		m = p / 4,
		f = 0,
		g = Math.sqrt,
		v = Math.cos,
		y = Math.sin,
		_ = t => "string" == typeof t,
		x = t => "function" == typeof t,
		w = t => "number" == typeof t,
		b = t => void 0 === t,
		M = t => "object" == typeof t,
		S = t => !1 !== t,
		T = () => "undefined" != typeof window,
		E = t => x(t) || _(t),
		A = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function () {},
		L = Array.isArray,
		C = /(?:-?\.?\d|\.)+/gi,
		R = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
		P = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
		D = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
		I = /[+-]=-?[.\d]+/,
		O = /[^,'"\[\]\s]+/gi,
		N = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
		z = {},
		B = {},
		F = t => (B = ut(t, z)) && nn,
		k = (t, e) => console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()"),
		U = (t, e) => !e && console.warn(t),
		H = (t, e) => t && (z[t] = e) && B && (B[t] = e) || z,
		G = () => 0,
		V = {},
		W = [],
		q = {},
		j = {},
		X = {},
		Y = 30,
		J = [],
		Z = "",
		Q = t => {
			let e, n, i = t[0];
			if (M(i) || x(i) || (t = [t]), !(e = (i._gsap || {}).harness)) {
				for (n = J.length; n-- && !J[n].targetTest(i););
				e = J[n]
			}
			for (n = t.length; n--;) t[n] && (t[n]._gsap || (t[n]._gsap = new Te(t[n], e))) || t.splice(n, 1);
			return t
		},
		K = t => t._gsap || Q(Ht(t))[0]._gsap,
		tt = (t, e, n) => (n = t[e]) && x(n) ? t[e]() : b(n) && t.getAttribute && t.getAttribute(e) || n,
		et = (t, e) => (t = t.split(",")).forEach(e) || t,
		nt = t => Math.round(1e5 * t) / 1e5 || 0,
		it = t => Math.round(1e7 * t) / 1e7 || 0,
		rt = (t, e) => {
			let n = e.charAt(0),
				i = parseFloat(e.substr(2));
			return t = parseFloat(t), "+" === n ? t + i : "-" === n ? t - i : "*" === n ? t * i : t / i
		},
		st = (t, e) => {
			let n = e.length,
				i = 0;
			for (; t.indexOf(e[i]) < 0 && ++i < n;);
			return i < n
		},
		at = () => {
			let t, e, n = W.length,
				i = W.slice(0);
			for (q = {}, W.length = 0, t = 0; t < n; t++) e = i[t], e && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
		},
		ot = (t, e, n, i) => {
			W.length && at(), t.render(e, n, i), W.length && at()
		},
		lt = t => {
			let e = parseFloat(t);
			return (e || 0 === e) && (t + "").match(O).length < 2 ? e : _(t) ? t.trim() : t
		},
		ct = t => t,
		ht = (t, e) => {
			for (let n in e) n in t || (t[n] = e[n]);
			return t
		},
		ut = (t, e) => {
			for (let n in e) t[n] = e[n];
			return t
		},
		dt = (t, e) => {
			for (let n in e) "__proto__" !== n && "constructor" !== n && "prototype" !== n && (t[n] = M(e[n]) ? dt(t[n] || (t[n] = {}), e[n]) : e[n]);
			return t
		},
		pt = (t, e) => {
			let n, i = {};
			for (n in t) n in e || (i[n] = t[n]);
			return i
		},
		mt = t => {
			let n = t.parent || e,
				i = t.keyframes ? (r = L(t.keyframes), (t, e) => {
					for (let n in e) n in t || "duration" === n && r || "ease" === n || (t[n] = e[n])
				}) : ht;
			var r;
			if (S(t.inherit))
				for (; n;) i(t, n.vars.defaults), n = n.parent || n._dp;
			return t
		},
		ft = (t, e, n = "_first", i = "_last", r) => {
			let s, a = t[i];
			if (r)
				for (s = e[r]; a && a[r] > s;) a = a._prev;
			return a ? (e._next = a._next, a._next = e) : (e._next = t[n], t[n] = e), e._next ? e._next._prev = e : t[i] = e, e._prev = a, e.parent = e._dp = t, e
		},
		gt = (t, e, n = "_first", i = "_last") => {
			let r = e._prev,
				s = e._next;
			r ? r._next = s : t[n] === e && (t[n] = s), s ? s._prev = r : t[i] === e && (t[i] = r), e._next = e._prev = e.parent = null
		},
		vt = (t, e) => {
			t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t), t._act = 0
		},
		yt = (t, e) => {
			if (t && (!e || e._end > t._dur || e._start < 0)) {
				let e = t;
				for (; e;) e._dirty = 1, e = e.parent
			}
			return t
		},
		_t = t => !t || t._ts && _t(t.parent),
		xt = t => t._repeat ? wt(t._tTime, t = t.duration() + t._rDelay) * t : 0,
		wt = (t, e) => {
			let n = Math.floor(t /= e);
			return t && n === t ? n - 1 : n
		},
		bt = (t, e) => (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur),
		Mt = t => t._end = it(t._start + (t._tDur / Math.abs(t._ts || t._rts || d) || 0)),
		St = (t, e) => {
			let n = t._dp;
			return n && n.smoothChildTiming && t._ts && (t._start = it(n._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Mt(t), n._dirty || yt(n, t)), t
		},
		Tt = (t, e) => {
			let n;
			if ((e._time || e._initted && !e._dur) && (n = bt(t.rawTime(), e), (!e._dur || Bt(0, e.totalDuration(), n) - e._tTime > d) && e.render(n, !0)), yt(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
				if (t._dur < t.duration())
					for (n = t; n._dp;) n.rawTime() >= 0 && n.totalTime(n._tTime), n = n._dp;
				t._zTime = -1e-8
			}
		},
		Et = (t, n, i, r) => (n.parent && vt(n), n._start = it((w(i) ? i : i || t !== e ? Ot(t, i, n) : t._time) + n._delay), n._end = it(n._start + (n.totalDuration() / Math.abs(n.timeScale()) || 0)), ft(t, n, "_first", "_last", t._sort ? "_start" : 0), Rt(n) || (t._recent = n), r || Tt(t, n), t),
		At = (t, e) => (z.ScrollTrigger || k("scrollTrigger", e)) && z.ScrollTrigger.create(e, t),
		Lt = (t, e, n, i) => (Ie(t, e), t._initted ? !n && t._pt && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && a !== de.frame ? (W.push(t), t._lazy = [e, i], 1) : void 0 : 1),
		Ct = ({
			parent: t
		}) => t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || Ct(t)),
		Rt = ({
			data: t
		}) => "isFromStart" === t || "isStart" === t,
		Pt = (t, e, n, i) => {
			let r = t._repeat,
				s = it(e) || 0,
				a = t._tTime / t._tDur;
			return a && !i && (t._time *= s / t._dur), t._dur = s, t._tDur = r ? r < 0 ? 1e10 : it(s * (r + 1) + t._rDelay * r) : s, a > 0 && !i ? St(t, t._tTime = t._tDur * a) : t.parent && Mt(t), n || yt(t.parent, t), t
		},
		Dt = t => t instanceof Ae ? yt(t) : Pt(t, t._dur),
		It = {
			_start: 0,
			endTime: G,
			totalDuration: G
		},
		Ot = (t, e, n) => {
			let i, r, s, a = t.labels,
				o = t._recent || It,
				l = t.duration() >= u ? o.endTime(!1) : t._dur;
			return _(e) && (isNaN(e) || e in a) ? (r = e.charAt(0), s = "%" === e.substr(-1), i = e.indexOf("="), "<" === r || ">" === r ? (i >= 0 && (e = e.replace(/=/, "")), ("<" === r ? o._start : o.endTime(o._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (s ? (i < 0 ? o : n).totalDuration() / 100 : 1)) : i < 0 ? (e in a || (a[e] = l), a[e]) : (r = parseFloat(e.charAt(i - 1) + e.substr(i + 1)), s && n && (r = r / 100 * (L(n) ? n[0] : n).totalDuration()), i > 1 ? Ot(t, e.substr(0, i - 1), n) + r : l + r)) : null == e ? l : +e
		},
		Nt = (t, e, n) => {
			let i, r, s = w(e[1]),
				a = (s ? 2 : 1) + (t < 2 ? 0 : 1),
				o = e[a];
			if (s && (o.duration = e[1]), o.parent = n, t) {
				for (i = o, r = n; r && !("immediateRender" in i);) i = r.vars.defaults || {}, r = S(r.vars.inherit) && r.parent;
				o.immediateRender = S(i.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[a - 1]
			}
			return new Fe(e[0], o, e[a + 1])
		},
		zt = (t, e) => t || 0 === t ? e(t) : e,
		Bt = (t, e, n) => n < t ? t : n > e ? e : n,
		Ft = (t, e) => _(t) && (e = N.exec(t)) ? e[1] : "",
		kt = [].slice,
		Ut = (t, e) => t && M(t) && "length" in t && (!e && !t.length || t.length - 1 in t && M(t[0])) && !t.nodeType && t !== n,
		Ht = (t, e, n) => !_(t) || n || !i && pe() ? L(t) ? ((t, e, n = []) => t.forEach((t => _(t) && !e || Ut(t, 1) ? n.push(...Ht(t)) : n.push(t))) || n)(t, n) : Ut(t) ? kt.call(t, 0) : t ? [t] : [] : kt.call((e || r).querySelectorAll(t), 0),
		Gt = t => t.sort((() => .5 - Math.random())),
		Vt = t => {
			if (x(t)) return t;
			let e = M(t) ? t : {
					each: t
				},
				n = xe(e.ease),
				i = e.from || 0,
				r = parseFloat(e.base) || 0,
				s = {},
				a = i > 0 && i < 1,
				o = isNaN(i) || a,
				l = e.axis,
				c = i,
				h = i;
			return _(i) ? c = h = {
				center: .5,
				edges: .5,
				end: 1
			} [i] || 0 : !a && o && (c = i[0], h = i[1]), (t, a, d) => {
				let p, m, f, v, y, _, x, w, b, M = (d || e).length,
					S = s[M];
				if (!S) {
					if (b = "auto" === e.grid ? 0 : (e.grid || [1, u])[1], !b) {
						for (x = -1e8; x < (x = d[b++].getBoundingClientRect().left) && b < M;);
						b--
					}
					for (S = s[M] = [], p = o ? Math.min(b, M) * c - .5 : i % b, m = b === u ? 0 : o ? M * h / b - .5 : i / b | 0, x = 0, w = u, _ = 0; _ < M; _++) f = _ % b - p, v = m - (_ / b | 0), S[_] = y = l ? Math.abs("y" === l ? v : f) : g(f * f + v * v), y > x && (x = y), y < w && (w = y);
					"random" === i && Gt(S), S.max = x - w, S.min = w, S.v = M = (parseFloat(e.amount) || parseFloat(e.each) * (b > M ? M - 1 : l ? "y" === l ? M / b : b : Math.max(b, M / b)) || 0) * ("edges" === i ? -1 : 1), S.b = M < 0 ? r - M : r, S.u = Ft(e.amount || e.each) || 0, n = n && M < 0 ? ye(n) : n
				}
				return M = (S[t] - S.min) / S.max || 0, it(S.b + (n ? n(M) : M) * S.v) + S.u
			}
		},
		Wt = t => {
			let e = Math.pow(10, ((t + "").split(".")[1] || "").length);
			return n => {
				let i = Math.round(parseFloat(n) / t) * t * e;
				return (i - i % 1) / e + (w(n) ? 0 : Ft(n))
			}
		},
		qt = (t, e) => {
			let n, i, r = L(t);
			return !r && M(t) && (n = r = t.radius || u, t.values ? (t = Ht(t.values), (i = !w(t[0])) && (n *= n)) : t = Wt(t.increment)), zt(e, r ? x(t) ? e => (i = t(e), Math.abs(i - e) <= n ? i : e) : e => {
				let r, s, a = parseFloat(i ? e.x : e),
					o = parseFloat(i ? e.y : 0),
					l = u,
					c = 0,
					h = t.length;
				for (; h--;) i ? (r = t[h].x - a, s = t[h].y - o, r = r * r + s * s) : r = Math.abs(t[h] - a), r < l && (l = r, c = h);
				return c = !n || l <= n ? t[c] : e, i || c === e || w(e) ? c : c + Ft(e)
			} : Wt(t))
		},
		jt = (t, e, n, i) => zt(L(t) ? !e : !0 === n ? !!(n = 0) : !i, (() => L(t) ? t[~~(Math.random() * t.length)] : (n = n || 1e-5) && (i = n < 1 ? 10 ** ((n + "").length - 2) : 1) && Math.floor(Math.round((t - n / 2 + Math.random() * (e - t + .99 * n)) / n) * n * i) / i)),
		Xt = (t, e, n) => zt(n, (n => t[~~e(n)])),
		Yt = function (t, e, n) {
			let i = e - t;
			return L(t) ? Xt(t, Yt(0, t.length), e) : zt(n, (e => (i + (e - t) % i) % i + t))
		},
		Jt = (t, e, n) => {
			let i = e - t,
				r = 2 * i;
			return L(t) ? Xt(t, Jt(0, t.length - 1), e) : zt(n, (e => t + ((e = (r + (e - t) % r) % r || 0) > i ? r - e : e)))
		},
		Zt = t => {
			let e, n, i, r, s = 0,
				a = "";
			for (; ~(e = t.indexOf("random(", s));) i = t.indexOf(")", e), r = "[" === t.charAt(e + 7), n = t.substr(e + 7, i - e - 7).match(r ? O : C), a += t.substr(s, e - s) + jt(r ? n : +n[0], r ? 0 : +n[1], +n[2] || 1e-5), s = i + 1;
			return a + t.substr(s, t.length - s)
		},
		Qt = (t, e, n, i, r) => {
			let s = e - t,
				a = i - n;
			return zt(r, (e => n + ((e - t) / s * a || 0)))
		},
		Kt = (t, e, n, i) => {
			let r = isNaN(t + e) ? 0 : n => (1 - n) * t + n * e;
			if (!r) {
				let s, a, o, l, c, h = _(t),
					u = {};
				if (!0 === n && (i = 1) && (n = null), h) t = {
					p: t
				}, e = {
					p: e
				};
				else if (L(t) && !L(e)) {
					for (o = [], l = t.length, c = l - 2, a = 1; a < l; a++) o.push(Kt(t[a - 1], t[a]));
					l--, r = t => {
						t *= l;
						let e = Math.min(c, ~~t);
						return o[e](t - e)
					}, n = e
				} else i || (t = ut(L(t) ? [] : {}, t));
				if (!o) {
					for (s in e) Pe.call(u, t, s, "get", e[s]);
					r = e => Xe(e, u) || (h ? t.p : t)
				}
			}
			return zt(n, r)
		},
		$t = (t, e, n) => {
			let i, r, s, a = t.labels,
				o = u;
			for (i in a) r = a[i] - e, r < 0 == !!n && r && o > (r = Math.abs(r)) && (s = i, o = r);
			return s
		},
		te = (t, e, n) => {
			let i, r, s = t.vars,
				a = s[e];
			if (a) return i = s[e + "Params"], r = s.callbackScope || t, n && W.length && at(), i ? a.apply(r, i) : a.call(r)
		},
		ee = t => (vt(t), t.scrollTrigger && t.scrollTrigger.kill(!1), t.progress() < 1 && te(t, "onInterrupt"), t),
		ne = t => {
			let e = (t = !t.name && t.default || t).name,
				n = x(t),
				i = e && !n && t.init ? function () {
					this._props = []
				} : t,
				r = {
					init: G,
					render: Xe,
					add: Pe,
					kill: Je,
					modifier: Ye,
					rawVars: 0
				},
				s = {
					targetTest: 0,
					get: 0,
					getSetter: Ve,
					aliases: {},
					register: 0
				};
			if (pe(), t !== i) {
				if (j[e]) return;
				ht(i, ht(pt(t, r), s)), ut(i.prototype, ut(r, pt(t, s))), j[i.prop = e] = i, t.targetTest && (J.push(i), V[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
			}
			H(e, i), t.register && t.register(nn, i, Ke)
		},
		ie = 255,
		re = {
			aqua: [0, ie, ie],
			lime: [0, ie, 0],
			silver: [192, 192, 192],
			black: [0, 0, 0],
			maroon: [128, 0, 0],
			teal: [0, 128, 128],
			blue: [0, 0, ie],
			navy: [0, 0, 128],
			white: [ie, ie, ie],
			olive: [128, 128, 0],
			yellow: [ie, ie, 0],
			orange: [ie, 165, 0],
			gray: [128, 128, 128],
			purple: [128, 0, 128],
			green: [0, 128, 0],
			red: [ie, 0, 0],
			pink: [ie, 192, 203],
			cyan: [0, ie, ie],
			transparent: [ie, ie, ie, 0]
		},
		se = (t, e, n) => (6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1 ? e + (n - e) * t * 6 : t < .5 ? n : 3 * t < 2 ? e + (n - e) * (2 / 3 - t) * 6 : e) * ie + .5 | 0,
		ae = (t, e, n) => {
			let i, r, s, a, o, l, c, h, u, d, p = t ? w(t) ? [t >> 16, t >> 8 & ie, t & ie] : 0 : re.black;
			if (!p) {
				if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), re[t]) p = re[t];
				else if ("#" === t.charAt(0)) {
					if (t.length < 6 && (i = t.charAt(1), r = t.charAt(2), s = t.charAt(3), t = "#" + i + i + r + r + s + s + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")), 9 === t.length) return p = parseInt(t.substr(1, 6), 16), [p >> 16, p >> 8 & ie, p & ie, parseInt(t.substr(7), 16) / 255];
					p = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & ie, t & ie]
				} else if ("hsl" === t.substr(0, 3))
					if (p = d = t.match(C), e) {
						if (~t.indexOf("=")) return p = t.match(R), n && p.length < 4 && (p[3] = 1), p
					} else a = +p[0] % 360 / 360, o = +p[1] / 100, l = +p[2] / 100, r = l <= .5 ? l * (o + 1) : l + o - l * o, i = 2 * l - r, p.length > 3 && (p[3] *= 1), p[0] = se(a + 1 / 3, i, r), p[1] = se(a, i, r), p[2] = se(a - 1 / 3, i, r);
				else p = t.match(C) || re.transparent;
				p = p.map(Number)
			}
			return e && !d && (i = p[0] / ie, r = p[1] / ie, s = p[2] / ie, c = Math.max(i, r, s), h = Math.min(i, r, s), l = (c + h) / 2, c === h ? a = o = 0 : (u = c - h, o = l > .5 ? u / (2 - c - h) : u / (c + h), a = c === i ? (r - s) / u + (r < s ? 6 : 0) : c === r ? (s - i) / u + 2 : (i - r) / u + 4, a *= 60), p[0] = ~~(a + .5), p[1] = ~~(100 * o + .5), p[2] = ~~(100 * l + .5)), n && p.length < 4 && (p[3] = 1), p
		},
		oe = t => {
			let e = [],
				n = [],
				i = -1;
			return t.split(ce).forEach((t => {
				let r = t.match(P) || [];
				e.push(...r), n.push(i += r.length + 1)
			})), e.c = n, e
		},
		le = (t, e, n) => {
			let i, r, s, a, o = "",
				l = (t + o).match(ce),
				c = e ? "hsla(" : "rgba(",
				h = 0;
			if (!l) return t;
			if (l = l.map((t => (t = ae(t, e, 1)) && c + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")")), n && (s = oe(t), i = n.c, i.join(o) !== s.c.join(o)))
				for (r = t.replace(ce, "1").split(P), a = r.length - 1; h < a; h++) o += r[h] + (~i.indexOf(h) ? l.shift() || c + "0,0,0,0)" : (s.length ? s : l.length ? l : n).shift());
			if (!r)
				for (r = t.split(ce), a = r.length - 1; h < a; h++) o += r[h] + l[h];
			return o + r[a]
		},
		ce = function () {
			let t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
			for (t in re) e += "|" + t + "\\b";
			return new RegExp(e + ")", "gi")
		}(),
		he = /hsl[a]?\(/,
		ue = t => {
			let e, n = t.join(" ");
			if (ce.lastIndex = 0, ce.test(n)) return e = he.test(n), t[1] = le(t[1], e), t[0] = le(t[0], e, oe(t[1])), !0
		},
		de = function () {
			let t, e, a, o, c, h, u = Date.now,
				d = 500,
				p = 33,
				m = u(),
				f = m,
				g = 1e3 / 240,
				v = g,
				y = [],
				_ = n => {
					let i, r, s, a, l = u() - f,
						x = !0 === n;
					if (l > d && (m += l - p), f += l, s = f - m, i = s - v, (i > 0 || x) && (a = ++o.frame, c = s - 1e3 * o.time, o.time = s /= 1e3, v += i + (i >= g ? 4 : g - i), r = 1), x || (t = e(_)), r)
						for (h = 0; h < y.length; h++) y[h](s, c, a, n)
				};
			return o = {
				time: 0,
				frame: 0,
				tick() {
					_(!0)
				},
				deltaRatio: t => c / (1e3 / (t || 60)),
				wake() {
					s && (!i && T() && (n = i = window, r = n.document || {}, z.gsap = nn, (n.gsapVersions || (n.gsapVersions = [])).push(nn.version), F(B || n.GreenSockGlobals || !n.gsap && n || {}), a = n.requestAnimationFrame), t && o.sleep(), e = a || (t => setTimeout(t, v - 1e3 * o.time + 1 | 0)), l = 1, _(2))
				},
				sleep() {
					(a ? n.cancelAnimationFrame : clearTimeout)(t), l = 0, e = G
				},
				lagSmoothing(t, e) {
					d = t || 1e8, p = Math.min(e, d, 0)
				},
				fps(t) {
					g = 1e3 / (t || 240), v = 1e3 * o.time + g
				},
				add(t, e, n) {
					let i = e ? (e, n, r, s) => {
						t(e, n, r, s), o.remove(i)
					} : t;
					return o.remove(t), y[n ? "unshift" : "push"](i), pe(), i
				},
				remove(t, e) {
					~(e = y.indexOf(t)) && y.splice(e, 1) && h >= e && h--
				},
				_listeners: y
			}, o
		}(),
		pe = () => !l && de.wake(),
		me = {},
		fe = /^[\d.\-M][\d.\-,\s]/,
		ge = /["']/g,
		ve = t => {
			let e, n, i, r = {},
				s = t.substr(1, t.length - 3).split(":"),
				a = s[0],
				o = 1,
				l = s.length;
			for (; o < l; o++) n = s[o], e = o !== l - 1 ? n.lastIndexOf(",") : n.length, i = n.substr(0, e), r[a] = isNaN(i) ? i.replace(ge, "").trim() : +i, a = n.substr(e + 1).trim();
			return r
		},
		ye = t => e => 1 - t(1 - e),
		_e = (t, e) => {
			let n, i = t._first;
			for (; i;) i instanceof Ae ? _e(i, e) : !i.vars.yoyoEase || i._yoyo && i._repeat || i._yoyo === e || (i.timeline ? _e(i.timeline, e) : (n = i._ease, i._ease = i._yEase, i._yEase = n, i._yoyo = e)), i = i._next
		},
		xe = (t, e) => t && (x(t) ? t : me[t] || (t => {
			let e = (t + "").split("("),
				n = me[e[0]];
			return n && e.length > 1 && n.config ? n.config.apply(null, ~t.indexOf("{") ? [ve(e[1])] : (t => {
				let e = t.indexOf("(") + 1,
					n = t.indexOf(")"),
					i = t.indexOf("(", e);
				return t.substring(e, ~i && i < n ? t.indexOf(")", n + 1) : n)
			})(t).split(",").map(lt)) : me._CE && fe.test(t) ? me._CE("", t) : n
		})(t)) || e,
		we = (t, e, n = (t => 1 - e(1 - t)), i = (t => t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2)) => {
			let r, s = {
				easeIn: e,
				easeOut: n,
				easeInOut: i
			};
			return et(t, (t => {
				me[t] = z[t] = s, me[r = t.toLowerCase()] = n;
				for (let e in s) me[r + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = me[t + "." + e] = s[e]
			})), s
		},
		be = t => e => e < .5 ? (1 - t(1 - 2 * e)) / 2 : .5 + t(2 * (e - .5)) / 2,
		Me = (t, e, n) => {
			let i = e >= 1 ? e : 1,
				r = (n || (t ? .3 : .45)) / (e < 1 ? e : 1),
				s = r / p * (Math.asin(1 / i) || 0),
				a = t => 1 === t ? 1 : i * 2 ** (-10 * t) * y((t - s) * r) + 1,
				o = "out" === t ? a : "in" === t ? t => 1 - a(1 - t) : be(a);
			return r = p / r, o.config = (e, n) => Me(t, e, n), o
		},
		Se = (t, e = 1.70158) => {
			let n = t => t ? --t * t * ((e + 1) * t + e) + 1 : 0,
				i = "out" === t ? n : "in" === t ? t => 1 - n(1 - t) : be(n);
			return i.config = e => Se(t, e), i
		};
	et("Linear,Quad,Cubic,Quart,Quint,Strong", ((t, e) => {
		let n = e < 5 ? e + 1 : e;
		we(t + ",Power" + (n - 1), e ? t => t ** n : t => t, (t => 1 - (1 - t) ** n), (t => t < .5 ? (2 * t) ** n / 2 : 1 - (2 * (1 - t)) ** n / 2))
	})), me.Linear.easeNone = me.none = me.Linear.easeIn, we("Elastic", Me("in"), Me("out"), Me()), ((t, e) => {
		let n = 1 / e,
			i = i => i < n ? t * i * i : i < .7272727272727273 ? t * (i - 1.5 / e) ** 2 + .75 : i < .9090909090909092 ? t * (i -= 2.25 / e) * i + .9375 : t * (i - 2.625 / e) ** 2 + .984375;
		we("Bounce", (t => 1 - i(1 - t)), i)
	})(7.5625, 2.75), we("Expo", (t => t ? 2 ** (10 * (t - 1)) : 0)), we("Circ", (t => -(g(1 - t * t) - 1))), we("Sine", (t => 1 === t ? 1 : 1 - v(t * m))), we("Back", Se("in"), Se("out"), Se()), me.SteppedEase = me.steps = z.SteppedEase = {
		config(t = 1, e) {
			let n = 1 / t,
				i = t + (e ? 0 : 1),
				r = e ? 1 : 0;
			return t => ((i * Bt(0, .99999999, t) | 0) + r) * n
		}
	}, h.ease = me["quad.out"], et("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (t => Z += t + "," + t + "Params,"));
	class Te {
		constructor(t, e) {
			this.id = f++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : tt, this.set = e ? e.getSetter : Ve
		}
	}
	class Ee {
		constructor(t) {
			this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Pt(this, +t.duration, 1, 1), this.data = t.data, l || de.wake()
		}
		delay(t) {
			return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay
		}
		duration(t) {
			return arguments.length ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
		}
		totalDuration(t) {
			return arguments.length ? (this._dirty = 0, Pt(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
		}
		totalTime(t, e) {
			if (pe(), !arguments.length) return this._tTime;
			let n = this._dp;
			if (n && n.smoothChildTiming && this._ts) {
				for (St(this, t), !n._dp || n.parent || Tt(n, this); n && n.parent;) n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
				!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && t < this._tDur || this._ts < 0 && t > 0 || !this._tDur && !t) && Et(this._dp, this, this._start - this._delay)
			}
			return (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === d || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t), ot(this, t, e)), this
		}
		time(t, e) {
			return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + xt(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time
		}
		totalProgress(t, e) {
			return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
		}
		progress(t, e) {
			return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + xt(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
		}
		iteration(t, e) {
			let n = this.duration() + this._rDelay;
			return arguments.length ? this.totalTime(this._time + (t - 1) * n, e) : this._repeat ? wt(this._tTime, n) + 1 : 1
		}
		timeScale(t) {
			if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
			if (this._rts === t) return this;
			let e = this.parent && this._ts ? bt(this.parent._time, this) : this._tTime;
			return this._rts = +t || 0, this._ts = this._ps || -1e-8 === t ? 0 : this._rts, this.totalTime(Bt(-this._delay, this._tDur, e), !0), Mt(this), (t => {
				let e = t.parent;
				for (; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent;
				return t
			})(this)
		}
		paused(t) {
			return arguments.length ? (this._ps !== t && (this._ps = t, t ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (pe(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== d && (this._tTime -= d)))), this) : this._ps
		}
		startTime(t) {
			if (arguments.length) {
				this._start = t;
				let e = this.parent || this._dp;
				return e && (e._sort || !this.parent) && Et(e, this, t - this._delay), this
			}
			return this._start
		}
		endTime(t) {
			return this._start + (S(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
		}
		rawTime(t) {
			let e = this.parent || this._dp;
			return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? bt(e.rawTime(t), this) : this._tTime : this._tTime
		}
		globalTime(t) {
			let e = this,
				n = arguments.length ? t : e.rawTime();
			for (; e;) n = e._start + n / (e._ts || 1), e = e._dp;
			return n
		}
		repeat(t) {
			return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t, Dt(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
		}
		repeatDelay(t) {
			if (arguments.length) {
				let e = this._time;
				return this._rDelay = t, Dt(this), e ? this.time(e) : this
			}
			return this._rDelay
		}
		yoyo(t) {
			return arguments.length ? (this._yoyo = t, this) : this._yoyo
		}
		seek(t, e) {
			return this.totalTime(Ot(this, t), S(e))
		}
		restart(t, e) {
			return this.play().totalTime(t ? -this._delay : 0, S(e))
		}
		play(t, e) {
			return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
		}
		reverse(t, e) {
			return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
		}
		pause(t, e) {
			return null != t && this.seek(t, e), this.paused(!0)
		}
		resume() {
			return this.paused(!1)
		}
		reversed(t) {
			return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -1e-8 : 0)), this) : this._rts < 0
		}
		invalidate() {
			return this._initted = this._act = 0, this._zTime = -1e-8, this
		}
		isActive() {
			let t, e = this.parent || this._dp,
				n = this._start;
			return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= n && t < this.endTime(!0) - d))
		}
		eventCallback(t, e, n) {
			let i = this.vars;
			return arguments.length > 1 ? (e ? (i[t] = e, n && (i[t + "Params"] = n), "onUpdate" === t && (this._onUpdate = e)) : delete i[t], this) : i[t]
		}
		then(t) {
			let e = this;
			return new Promise((n => {
				let i = x(t) ? t : ct,
					r = () => {
						let t = e.then;
						e.then = null, x(i) && (i = i(e)) && (i.then || i === e) && (e.then = t), n(i), e.then = t
					};
				e._initted && 1 === e.totalProgress() && e._ts >= 0 || !e._tTime && e._ts < 0 ? r() : e._prom = r
			}))
		}
		kill() {
			ee(this)
		}
	}
	ht(Ee.prototype, {
		_time: 0,
		_start: 0,
		_end: 0,
		_tTime: 0,
		_tDur: 0,
		_dirty: 0,
		_repeat: 0,
		_yoyo: !1,
		parent: null,
		_initted: !1,
		_rDelay: 0,
		_ts: 1,
		_dp: 0,
		ratio: 0,
		_zTime: -1e-8,
		_prom: 0,
		_ps: !1,
		_rts: 1
	});
	class Ae extends Ee {
		constructor(t = {}, n) {
			super(t), this.labels = {}, this.smoothChildTiming = !!t.smoothChildTiming, this.autoRemoveChildren = !!t.autoRemoveChildren, this._sort = S(t.sortChildren), e && Et(t.parent || e, this, n), t.reversed && this.reverse(), t.paused && this.paused(!0), t.scrollTrigger && At(this, t.scrollTrigger)
		}
		to(t, e, n) {
			return Nt(0, arguments, this), this
		}
		from(t, e, n) {
			return Nt(1, arguments, this), this
		}
		fromTo(t, e, n, i) {
			return Nt(2, arguments, this), this
		}
		set(t, e, n) {
			return e.duration = 0, e.parent = this, mt(e).repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new Fe(t, e, Ot(this, n), 1), this
		}
		call(t, e, n) {
			return Et(this, Fe.delayedCall(0, t, e), n)
		}
		staggerTo(t, e, n, i, r, s, a) {
			return n.duration = e, n.stagger = n.stagger || i, n.onComplete = s, n.onCompleteParams = a, n.parent = this, new Fe(t, n, Ot(this, r)), this
		}
		staggerFrom(t, e, n, i, r, s, a) {
			return n.runBackwards = 1, mt(n).immediateRender = S(n.immediateRender), this.staggerTo(t, e, n, i, r, s, a)
		}
		staggerFromTo(t, e, n, i, r, s, a, o) {
			return i.startAt = n, mt(i).immediateRender = S(i.immediateRender), this.staggerTo(t, e, i, r, s, a, o)
		}
		render(t, n, i) {
			let r, s, a, o, l, c, h, u, p, m, f, g, v = this._time,
				y = this._dirty ? this.totalDuration() : this._tDur,
				_ = this._dur,
				x = t <= 0 ? 0 : it(t),
				w = this._zTime < 0 != t < 0 && (this._initted || !_);
			if (this !== e && x > y && t >= 0 && (x = y), x !== this._tTime || i || w) {
				if (v !== this._time && _ && (x += this._time - v, t += this._time - v), r = x, p = this._start, u = this._ts, c = !u, w && (_ || (v = this._zTime), (t || !n) && (this._zTime = t)), this._repeat) {
					if (f = this._yoyo, l = _ + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * l + t, n, i);
					if (r = it(x % l), x === y ? (o = this._repeat, r = _) : (o = ~~(x / l), o && o === x / l && (r = _, o--), r > _ && (r = _)), m = wt(this._tTime, l), !v && this._tTime && m !== o && (m = o), f && 1 & o && (r = _ - r, g = 1), o !== m && !this._lock) {
						let t = f && 1 & m,
							e = t === (f && 1 & o);
						if (o < m && (t = !t), v = t ? 0 : _, this._lock = 1, this.render(v || (g ? 0 : it(o * l)), n, !_)._lock = 0, this._tTime = x, !n && this.parent && te(this, "onRepeat"), this.vars.repeatRefresh && !g && (this.invalidate()._lock = 1), v && v !== this._time || c !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
						if (_ = this._dur, y = this._tDur, e && (this._lock = 2, v = t ? _ : -1e-4, this.render(v, !0), this.vars.repeatRefresh && !g && this.invalidate()), this._lock = 0, !this._ts && !c) return this;
						_e(this, g)
					}
				}
				if (this._hasPause && !this._forcing && this._lock < 2 && (h = ((t, e, n) => {
						let i;
						if (n > e)
							for (i = t._first; i && i._start <= n;) {
								if ("isPause" === i.data && i._start > e) return i;
								i = i._next
							} else
								for (i = t._last; i && i._start >= n;) {
									if ("isPause" === i.data && i._start < e) return i;
									i = i._prev
								}
					})(this, it(v), it(r)), h && (x -= r - (r = h._start))), this._tTime = x, this._time = r, this._act = !u, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = t, v = 0), !v && r && !n && (te(this, "onStart"), this._tTime !== x)) return this;
				if (r >= v && t >= 0)
					for (s = this._first; s;) {
						if (a = s._next, (s._act || r >= s._start) && s._ts && h !== s) {
							if (s.parent !== this) return this.render(t, n, i);
							if (s.render(s._ts > 0 ? (r - s._start) * s._ts : (s._dirty ? s.totalDuration() : s._tDur) + (r - s._start) * s._ts, n, i), r !== this._time || !this._ts && !c) {
								h = 0, a && (x += this._zTime = -1e-8);
								break
							}
						}
						s = a
					} else {
						s = this._last;
						let e = t < 0 ? t : r;
						for (; s;) {
							if (a = s._prev, (s._act || e <= s._end) && s._ts && h !== s) {
								if (s.parent !== this) return this.render(t, n, i);
								if (s.render(s._ts > 0 ? (e - s._start) * s._ts : (s._dirty ? s.totalDuration() : s._tDur) + (e - s._start) * s._ts, n, i), r !== this._time || !this._ts && !c) {
									h = 0, a && (x += this._zTime = e ? -1e-8 : d);
									break
								}
							}
							s = a
						}
					}
				if (h && !n && (this.pause(), h.render(r >= v ? 0 : -1e-8)._zTime = r >= v ? 1 : -1, this._ts)) return this._start = p, Mt(this), this.render(t, n, i);
				this._onUpdate && !n && te(this, "onUpdate", !0), (x === y && this._tTime >= this.totalDuration() || !x && v) && (p !== this._start && Math.abs(u) === Math.abs(this._ts) || this._lock || ((t || !_) && (x === y && this._ts > 0 || !x && this._ts < 0) && vt(this, 1), n || t < 0 && !v || !x && !v && y || (te(this, x === y && t >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(x < y && this.timeScale() > 0) && this._prom())))
			}
			return this
		}
		add(t, e) {
			if (w(e) || (e = Ot(this, e, t)), !(t instanceof Ee)) {
				if (L(t)) return t.forEach((t => this.add(t, e))), this;
				if (_(t)) return this.addLabel(t, e);
				if (!x(t)) return this;
				t = Fe.delayedCall(0, t)
			}
			return this !== t ? Et(this, t, e) : this
		}
		getChildren(t = !0, e = !0, n = !0, i = -1e8) {
			let r = [],
				s = this._first;
			for (; s;) s._start >= i && (s instanceof Fe ? e && r.push(s) : (n && r.push(s), t && r.push(...s.getChildren(!0, e, n)))), s = s._next;
			return r
		}
		getById(t) {
			let e = this.getChildren(1, 1, 1),
				n = e.length;
			for (; n--;)
				if (e[n].vars.id === t) return e[n]
		}
		remove(t) {
			return _(t) ? this.removeLabel(t) : x(t) ? this.killTweensOf(t) : (gt(this, t), t === this._recent && (this._recent = this._last), yt(this))
		}
		totalTime(t, e) {
			return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = it(de.time - (this._ts > 0 ? t / this._ts : (this.totalDuration() - t) / -this._ts))), super.totalTime(t, e), this._forcing = 0, this) : this._tTime
		}
		addLabel(t, e) {
			return this.labels[t] = Ot(this, e), this
		}
		removeLabel(t) {
			return delete this.labels[t], this
		}
		addPause(t, e, n) {
			let i = Fe.delayedCall(0, e || G, n);
			return i.data = "isPause", this._hasPause = 1, Et(this, i, Ot(this, t))
		}
		removePause(t) {
			let e = this._first;
			for (t = Ot(this, t); e;) e._start === t && "isPause" === e.data && vt(e), e = e._next
		}
		killTweensOf(t, e, n) {
			let i = this.getTweensOf(t, n),
				r = i.length;
			for (; r--;) Le !== i[r] && i[r].kill(t, e);
			return this
		}
		getTweensOf(t, e) {
			let n, i = [],
				r = Ht(t),
				s = this._first,
				a = w(e);
			for (; s;) s instanceof Fe ? st(s._targets, r) && (a ? (!Le || s._initted && s._ts) && s.globalTime(0) <= e && s.globalTime(s.totalDuration()) > e : !e || s.isActive()) && i.push(s) : (n = s.getTweensOf(r, e)).length && i.push(...n), s = s._next;
			return i
		}
		tweenTo(t, e) {
			e = e || {};
			let n, i = this,
				r = Ot(i, t),
				{
					startAt: s,
					onStart: a,
					onStartParams: o,
					immediateRender: l
				} = e,
				c = Fe.to(i, ht({
					ease: e.ease || "none",
					lazy: !1,
					immediateRender: !1,
					time: r,
					overwrite: "auto",
					duration: e.duration || Math.abs((r - (s && "time" in s ? s.time : i._time)) / i.timeScale()) || d,
					onStart: () => {
						if (i.pause(), !n) {
							let t = e.duration || Math.abs((r - (s && "time" in s ? s.time : i._time)) / i.timeScale());
							c._dur !== t && Pt(c, t, 0, 1).render(c._time, !0, !0), n = 1
						}
						a && a.apply(c, o || [])
					}
				}, e));
			return l ? c.render(0) : c
		}
		tweenFromTo(t, e, n) {
			return this.tweenTo(e, ht({
				startAt: {
					time: Ot(this, t)
				}
			}, n))
		}
		recent() {
			return this._recent
		}
		nextLabel(t = this._time) {
			return $t(this, Ot(this, t))
		}
		previousLabel(t = this._time) {
			return $t(this, Ot(this, t), 1)
		}
		currentLabel(t) {
			return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + d)
		}
		shiftChildren(t, e, n = 0) {
			let i, r = this._first,
				s = this.labels;
			for (; r;) r._start >= n && (r._start += t, r._end += t), r = r._next;
			if (e)
				for (i in s) s[i] >= n && (s[i] += t);
			return yt(this)
		}
		invalidate() {
			let t = this._first;
			for (this._lock = 0; t;) t.invalidate(), t = t._next;
			return super.invalidate()
		}
		clear(t = !0) {
			let e, n = this._first;
			for (; n;) e = n._next, this.remove(n), n = e;
			return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), yt(this)
		}
		totalDuration(t) {
			let n, i, r, s = 0,
				a = this,
				o = a._last,
				l = u;
			if (arguments.length) return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -t : t));
			if (a._dirty) {
				for (r = a.parent; o;) n = o._prev, o._dirty && o.totalDuration(), i = o._start, i > l && a._sort && o._ts && !a._lock ? (a._lock = 1, Et(a, o, i - o._delay, 1)._lock = 0) : l = i, i < 0 && o._ts && (s -= i, (!r && !a._dp || r && r.smoothChildTiming) && (a._start += i / a._ts, a._time -= i, a._tTime -= i), a.shiftChildren(-i, !1, -Infinity), l = 0), o._end > s && o._ts && (s = o._end), o = n;
				Pt(a, a === e && a._time > s ? a._time : s, 1, 1), a._dirty = 0
			}
			return a._tDur
		}
		static updateRoot(t) {
			if (e._ts && (ot(e, bt(t, e)), a = de.frame), de.frame >= Y) {
				Y += c.autoSleep || 120;
				let t = e._first;
				if ((!t || !t._ts) && c.autoSleep && de._listeners.length < 2) {
					for (; t && !t._ts;) t = t._next;
					t || de.sleep()
				}
			}
		}
	}
	ht(Ae.prototype, {
		_lock: 0,
		_hasPause: 0,
		_forcing: 0
	});
	let Le, Ce, Re = function (t, e, n, i, r, s, a) {
			let o, l, c, h, u, d, p, m, f = new Ke(this._pt, t, e, 0, 1, je, null, r),
				g = 0,
				v = 0;
			for (f.b = n, f.e = i, n += "", (p = ~(i += "").indexOf("random(")) && (i = Zt(i)), s && (m = [n, i], s(m, t, e), n = m[0], i = m[1]), l = n.match(D) || []; o = D.exec(i);) h = o[0], u = i.substring(g, o.index), c ? c = (c + 1) % 5 : "rgba(" === u.substr(-5) && (c = 1), h !== l[v++] && (d = parseFloat(l[v - 1]) || 0, f._pt = {
				_next: f._pt,
				p: u || 1 === v ? u : ",",
				s: d,
				c: "=" === h.charAt(1) ? rt(d, h) - d : parseFloat(h) - d,
				m: c && c < 4 ? Math.round : 0
			}, g = D.lastIndex);
			return f.c = g < i.length ? i.substring(g, i.length) : "", f.fp = a, (I.test(i) || p) && (f.e = 0), this._pt = f, f
		},
		Pe = function (t, e, n, i, r, s, a, o, l) {
			x(i) && (i = i(r || 0, t, s));
			let h, u = t[e],
				d = "get" !== n ? n : x(u) ? l ? t[e.indexOf("set") || !x(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : u,
				p = x(u) ? l ? He : Ue : ke;
			if (_(i) && (~i.indexOf("random(") && (i = Zt(i)), "=" === i.charAt(1) && (h = rt(d, i) + (Ft(d) || 0), (h || 0 === h) && (i = h))), d !== i || Ce) return isNaN(d * i) || "" === i ? (!u && !(e in t) && k(e, i), Re.call(this, t, e, d, i, p, o || c.stringFilter, l)) : (h = new Ke(this._pt, t, e, +d || 0, i - (d || 0), "boolean" == typeof u ? qe : We, 0, p), l && (h.fp = l), a && h.modifier(a, this, t), this._pt = h)
		},
		De = (t, e, n, i, r, s) => {
			let a, l, c, h;
			if (j[t] && !1 !== (a = new j[t]).init(r, a.rawVars ? e[t] : ((t, e, n, i, r) => {
					if (x(t) && (t = Ne(t, r, e, n, i)), !M(t) || t.style && t.nodeType || L(t) || A(t)) return _(t) ? Ne(t, r, e, n, i) : t;
					let s, a = {};
					for (s in t) a[s] = Ne(t[s], r, e, n, i);
					return a
				})(e[t], i, r, s, n), n, i, s) && (n._pt = l = new Ke(n._pt, r, t, 0, 1, a.render, a, 0, a.priority), n !== o))
				for (c = n._ptLookup[n._targets.indexOf(r)], h = a._props.length; h--;) c[a._props[h]] = l;
			return a
		},
		Ie = (n, i) => {
			let r, s, a, o, l, c, p, m, f, g, v, y, _, x = n.vars,
				{
					ease: w,
					startAt: b,
					immediateRender: M,
					lazy: T,
					onUpdate: E,
					onUpdateParams: A,
					callbackScope: L,
					runBackwards: C,
					yoyoEase: R,
					keyframes: P,
					autoRevert: D
				} = x,
				I = n._dur,
				O = n._startAt,
				N = n._targets,
				z = n.parent,
				B = z && "nested" === z.data ? z.parent._targets : N,
				F = "auto" === n._overwrite && !t,
				k = n.timeline;
			if (k && (!P || !w) && (w = "none"), n._ease = xe(w, h.ease), n._yEase = R ? ye(xe(!0 === R ? w : R, h.ease)) : 0, R && n._yoyo && !n._repeat && (R = n._yEase, n._yEase = n._ease, n._ease = R), n._from = !k && !!x.runBackwards, !k || P && !x.stagger) {
				if (m = N[0] ? K(N[0]).harness : 0, y = m && x[m.prop], r = pt(x, V), O && (vt(O.render(-1, !0)), O._lazy = 0), b)
					if (vt(n._startAt = Fe.set(N, ht({
							data: "isStart",
							overwrite: !1,
							parent: z,
							immediateRender: !0,
							lazy: S(T),
							startAt: null,
							delay: 0,
							onUpdate: E,
							onUpdateParams: A,
							callbackScope: L,
							stagger: 0
						}, b))), i < 0 && !M && !D && n._startAt.render(-1, !0), M) {
						if (i > 0 && !D && (n._startAt = 0), I && i <= 0) return void(i && (n._zTime = i))
					} else !1 === D && (n._startAt = 0);
				else if (C && I)
					if (O) !D && (n._startAt = 0);
					else if (i && (M = !1), a = ht({
						overwrite: !1,
						data: "isFromStart",
						lazy: M && S(T),
						immediateRender: M,
						stagger: 0,
						parent: z
					}, r), y && (a[m.prop] = y), vt(n._startAt = Fe.set(N, a)), i < 0 && n._startAt.render(-1, !0), n._zTime = i, M) {
					if (!i) return
				} else Ie(n._startAt, d);
				for (n._pt = n._ptCache = 0, T = I && S(T) || T && !I, s = 0; s < N.length; s++) {
					if (l = N[s], p = l._gsap || Q(N)[s]._gsap, n._ptLookup[s] = g = {}, q[p.id] && W.length && at(), v = B === N ? s : B.indexOf(l), m && !1 !== (f = new m).init(l, y || r, n, v, B) && (n._pt = o = new Ke(n._pt, l, f.name, 0, 1, f.render, f, 0, f.priority), f._props.forEach((t => {
							g[t] = o
						})), f.priority && (c = 1)), !m || y)
						for (a in r) j[a] && (f = De(a, r, n, v, l, B)) ? f.priority && (c = 1) : g[a] = o = Pe.call(n, l, a, "get", r[a], v, B, 0, x.stringFilter);
					n._op && n._op[s] && n.kill(l, n._op[s]), F && n._pt && (Le = n, e.killTweensOf(l, g, n.globalTime(i)), _ = !n.parent, Le = 0), n._pt && T && (q[p.id] = 1)
				}
				c && Qe(n), n._onInit && n._onInit(n)
			}
			n._onUpdate = E, n._initted = (!n._op || n._pt) && !_, P && i <= 0 && k.render(u, !0, !0)
		},
		Oe = (t, e, n, i) => {
			let r, s, a = e.ease || i || "power1.inOut";
			if (L(e)) s = n[t] || (n[t] = []), e.forEach(((t, n) => s.push({
				t: n / (e.length - 1) * 100,
				v: t,
				e: a
			})));
			else
				for (r in e) s = n[r] || (n[r] = []), "ease" === r || s.push({
					t: parseFloat(t),
					v: e[r],
					e: a
				})
		},
		Ne = (t, e, n, i, r) => x(t) ? t.call(e, n, i, r) : _(t) && ~t.indexOf("random(") ? Zt(t) : t,
		ze = Z + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
		Be = {};
	et(ze + ",id,stagger,delay,duration,paused,scrollTrigger", (t => Be[t] = 1));
	class Fe extends Ee {
		constructor(n, i, r, s) {
			"number" == typeof i && (r.duration = i, i = r, r = null), super(s ? i : mt(i));
			let a, o, l, h, u, d, p, m, {
					duration: f,
					delay: g,
					immediateRender: v,
					stagger: y,
					overwrite: _,
					keyframes: x,
					defaults: b,
					scrollTrigger: T,
					yoyoEase: C
				} = this.vars,
				R = i.parent || e,
				P = (L(n) || A(n) ? w(n[0]) : "length" in i) ? [n] : Ht(n);
			if (this._targets = P.length ? Q(P) : U("GSAP target " + n + " not found. https://greensock.com", !c.nullTargetWarn) || [], this._ptLookup = [], this._overwrite = _, x || y || E(f) || E(g)) {
				if (i = this.vars, a = this.timeline = new Ae({
						data: "nested",
						defaults: b || {}
					}), a.kill(), a.parent = a._dp = this, a._start = 0, y || E(f) || E(g)) {
					if (h = P.length, p = y && Vt(y), M(y))
						for (u in y) ~ze.indexOf(u) && (m || (m = {}), m[u] = y[u]);
					for (o = 0; o < h; o++) l = pt(i, Be), l.stagger = 0, C && (l.yoyoEase = C), m && ut(l, m), d = P[o], l.duration = +Ne(f, this, o, d, P), l.delay = (+Ne(g, this, o, d, P) || 0) - this._delay, !y && 1 === h && l.delay && (this._delay = g = l.delay, this._start += g, l.delay = 0), a.to(d, l, p ? p(o, d, P) : 0), a._ease = me.none;
					a.duration() ? f = g = 0 : this.timeline = 0
				} else if (x) {
					mt(ht(a.vars.defaults, {
						ease: "none"
					})), a._ease = xe(x.ease || i.ease || "none");
					let t, e, n, r = 0;
					if (L(x)) x.forEach((t => a.to(P, t, ">")));
					else {
						for (u in l = {}, x) "ease" === u || "easeEach" === u || Oe(u, x[u], l, x.easeEach);
						for (u in l)
							for (t = l[u].sort(((t, e) => t.t - e.t)), r = 0, o = 0; o < t.length; o++) e = t[o], n = {
								ease: e.e,
								duration: (e.t - (o ? t[o - 1].t : 0)) / 100 * f
							}, n[u] = e.v, a.to(P, n, r), r += n.duration;
						a.duration() < f && a.to({}, {
							duration: f - a.duration()
						})
					}
				}
				f || this.duration(f = a.duration())
			} else this.timeline = 0;
			!0 !== _ || t || (Le = this, e.killTweensOf(P), Le = 0), Et(R, this, r), i.reversed && this.reverse(), i.paused && this.paused(!0),
				(v || !f && !x && this._start === it(R._time) && S(v) && _t(this) && "nested" !== R.data) && (this._tTime = -1e-8, this.render(Math.max(0, -g))), T && At(this, T)
		}
		render(t, e, n) {
			let i, r, s, a, o, l, c, h, u, p = this._time,
				m = this._tDur,
				f = this._dur,
				g = t > m - d && t >= 0 ? m : t < d ? 0 : t;
			if (f) {
				if (g !== this._tTime || !t || n || !this._initted && this._tTime || this._startAt && this._zTime < 0 != t < 0) {
					if (i = g, h = this.timeline, this._repeat) {
						if (a = f + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * a + t, e, n);
						if (i = it(g % a), g === m ? (s = this._repeat, i = f) : (s = ~~(g / a), s && s === g / a && (i = f, s--), i > f && (i = f)), l = this._yoyo && 1 & s, l && (u = this._yEase, i = f - i), o = wt(this._tTime, a), i === p && !n && this._initted) return this._tTime = g, this;
						s !== o && (h && this._yEase && _e(h, l), !this.vars.repeatRefresh || l || this._lock || (this._lock = n = 1, this.render(it(a * s), !0).invalidate()._lock = 0))
					}
					if (!this._initted) {
						if (Lt(this, t < 0 ? t : i, n, e)) return this._tTime = 0, this;
						if (p !== this._time) return this;
						if (f !== this._dur) return this.render(t, e, n)
					}
					if (this._tTime = g, this._time = i, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = c = (u || this._ease)(i / f), this._from && (this.ratio = c = 1 - c), i && !p && !e && (te(this, "onStart"), this._tTime !== g)) return this;
					for (r = this._pt; r;) r.r(c, r.d), r = r._next;
					h && h.render(t < 0 ? t : !i && l ? -1e-8 : h._dur * h._ease(i / this._dur), e, n) || this._startAt && (this._zTime = t), this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, n), te(this, "onUpdate")), this._repeat && s !== o && this.vars.onRepeat && !e && this.parent && te(this, "onRepeat"), g !== this._tDur && g || this._tTime !== g || (t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, !0), (t || !f) && (g === this._tDur && this._ts > 0 || !g && this._ts < 0) && vt(this, 1), e || t < 0 && !p || !g && !p || (te(this, g === m ? "onComplete" : "onReverseComplete", !0), this._prom && !(g < m && this.timeScale() > 0) && this._prom()))
				}
			} else((t, e, n, i) => {
				let r, s, a, o = t.ratio,
					l = e < 0 || !e && (!t._start && Ct(t) && (t._initted || !Rt(t)) || (t._ts < 0 || t._dp._ts < 0) && !Rt(t)) ? 0 : 1,
					c = t._rDelay,
					h = 0;
				if (c && t._repeat && (h = Bt(0, t._tDur, e), s = wt(h, c), t._yoyo && 1 & s && (l = 1 - l), s !== wt(t._tTime, c) && (o = 1 - l, t.vars.repeatRefresh && t._initted && t.invalidate())), l !== o || i || t._zTime === d || !e && t._zTime) {
					if (!t._initted && Lt(t, e, i, n)) return;
					for (a = t._zTime, t._zTime = e || (n ? d : 0), n || (n = e && !a), t.ratio = l, t._from && (l = 1 - l), t._time = 0, t._tTime = h, r = t._pt; r;) r.r(l, r.d), r = r._next;
					t._startAt && e < 0 && t._startAt.render(e, !0, !0), t._onUpdate && !n && te(t, "onUpdate"), h && t._repeat && !n && t.parent && te(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === l && (l && vt(t, 1), n || (te(t, l ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()))
				} else t._zTime || (t._zTime = e)
			})(this, t, e, n);
			return this
		}
		targets() {
			return this._targets
		}
		invalidate() {
			return this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(), super.invalidate()
		}
		resetTo(t, e, n, i) {
			l || de.wake(), this._ts || this.play();
			let r, s = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
			return this._initted || Ie(this, s), r = this._ease(s / this._dur), ((t, e, n, i, r, s, a) => {
				let o, l, c, h = (t._pt && t._ptCache || (t._ptCache = {}))[e];
				if (!h)
					for (h = t._ptCache[e] = [], l = t._ptLookup, c = t._targets.length; c--;) {
						if (o = l[c][e], o && o.d && o.d._pt)
							for (o = o.d._pt; o && o.p !== e;) o = o._next;
						if (!o) return Ce = 1, t.vars[e] = "+=0", Ie(t, a), Ce = 0, 1;
						h.push(o)
					}
				for (c = h.length; c--;) o = h[c], o.s = !i && 0 !== i || r ? o.s + (i || 0) + s * o.c : i, o.c = n - o.s, o.e && (o.e = nt(n) + Ft(o.e)), o.b && (o.b = o.s + Ft(o.b))
			})(this, t, e, n, i, r, s) ? this.resetTo(t, e, n, i) : (St(this, 0), this.parent || ft(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0))
		}
		kill(t, e = "all") {
			if (!(t || e && "all" !== e)) return this._lazy = this._pt = 0, this.parent ? ee(this) : this;
			if (this.timeline) {
				let n = this.timeline.totalDuration();
				return this.timeline.killTweensOf(t, e, Le && !0 !== Le.vars.overwrite)._first || ee(this), this.parent && n !== this.timeline.totalDuration() && Pt(this, this._dur * this.timeline._tDur / n, 0, 1), this
			}
			let n, i, r, s, a, o, l, c = this._targets,
				h = t ? Ht(t) : c,
				u = this._ptLookup,
				d = this._pt;
			if ((!e || "all" === e) && ((t, e) => {
					let n = t.length,
						i = n === e.length;
					for (; i && n-- && t[n] === e[n];);
					return n < 0
				})(c, h)) return "all" === e && (this._pt = 0), ee(this);
			for ((n = this._op = this._op || [], "all" !== e && (_(e) && (a = {}, et(e, (t => a[t] = 1)), e = a), e = ((t, e) => {
					let n, i, r, s, a = t[0] ? K(t[0]).harness : 0,
						o = a && a.aliases;
					if (!o) return e;
					for (i in n = ut({}, e), o)
						if (i in n)
							for (s = o[i].split(","), r = s.length; r--;) n[s[r]] = n[i];
					return n
				})(c, e)), l = c.length); l--;)
				if (~h.indexOf(c[l]))
					for (a in i = u[l], "all" === e ? (n[l] = e, s = i, r = {}) : (r = n[l] = n[l] || {}, s = e), s) o = i && i[a], o && ("kill" in o.d && !0 !== o.d.kill(a) || gt(this, o, "_pt"), delete i[a]), "all" !== r && (r[a] = 1);
			return this._initted && !this._pt && d && ee(this), this
		}
		static to(t, e) {
			return new Fe(t, e, arguments[2])
		}
		static from(t, e) {
			return Nt(1, arguments)
		}
		static delayedCall(t, e, n, i) {
			return new Fe(e, 0, {
				immediateRender: !1,
				lazy: !1,
				overwrite: !1,
				delay: t,
				onComplete: e,
				onReverseComplete: e,
				onCompleteParams: n,
				onReverseCompleteParams: n,
				callbackScope: i
			})
		}
		static fromTo(t, e, n) {
			return Nt(2, arguments)
		}
		static set(t, e) {
			return e.duration = 0, e.repeatDelay || (e.repeat = 0), new Fe(t, e)
		}
		static killTweensOf(t, n, i) {
			return e.killTweensOf(t, n, i)
		}
	}
	ht(Fe.prototype, {
		_targets: [],
		_lazy: 0,
		_startAt: 0,
		_op: 0,
		_onInit: 0
	}), et("staggerTo,staggerFrom,staggerFromTo", (t => {
		Fe[t] = function () {
			let e = new Ae,
				n = kt.call(arguments, 0);
			return n.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, n)
		}
	}));
	let ke = (t, e, n) => t[e] = n,
		Ue = (t, e, n) => t[e](n),
		He = (t, e, n, i) => t[e](i.fp, n),
		Ge = (t, e, n) => t.setAttribute(e, n),
		Ve = (t, e) => x(t[e]) ? Ue : b(t[e]) && t.setAttribute ? Ge : ke,
		We = (t, e) => e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e),
		qe = (t, e) => e.set(e.t, e.p, !!(e.s + e.c * t), e),
		je = function (t, e) {
			let n = e._pt,
				i = "";
			if (!t && e.b) i = e.b;
			else if (1 === t && e.e) i = e.e;
			else {
				for (; n;) i = n.p + (n.m ? n.m(n.s + n.c * t) : Math.round(1e4 * (n.s + n.c * t)) / 1e4) + i, n = n._next;
				i += e.c
			}
			e.set(e.t, e.p, i, e)
		},
		Xe = function (t, e) {
			let n = e._pt;
			for (; n;) n.r(t, n.d), n = n._next
		},
		Ye = function (t, e, n, i) {
			let r, s = this._pt;
			for (; s;) r = s._next, s.p === i && s.modifier(t, e, n), s = r
		},
		Je = function (t) {
			let e, n, i = this._pt;
			for (; i;) n = i._next, i.p === t && !i.op || i.op === t ? gt(this, i, "_pt") : i.dep || (e = 1), i = n;
			return !e
		},
		Ze = (t, e, n, i) => {
			i.mSet(t, e, i.m.call(i.tween, n, i.mt), i)
		},
		Qe = t => {
			let e, n, i, r, s = t._pt;
			for (; s;) {
				for (e = s._next, n = i; n && n.pr > s.pr;) n = n._next;
				(s._prev = n ? n._prev : r) ? s._prev._next = s: i = s, (s._next = n) ? n._prev = s : r = s, s = e
			}
			t._pt = i
		};
	class Ke {
		constructor(t, e, n, i, r, s, a, o, l) {
			this.t = e, this.s = i, this.c = r, this.p = n, this.r = s || We, this.d = a || this, this.set = o || ke, this.pr = l || 0, this._next = t, t && (t._prev = this)
		}
		modifier(t, e, n) {
			this.mSet = this.mSet || this.set, this.set = Ze, this.m = t, this.mt = n, this.tween = e
		}
	}
	et(Z + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (t => V[t] = 1)), z.TweenMax = z.TweenLite = Fe, z.TimelineLite = z.TimelineMax = Ae, e = new Ae({
		sortChildren: !1,
		defaults: h,
		autoRemoveChildren: !0,
		id: "root",
		smoothChildTiming: !0
	}), c.stringFilter = ue;
	const $e = {
		registerPlugin(...t) {
			t.forEach((t => ne(t)))
		},
		timeline: t => new Ae(t),
		getTweensOf: (t, n) => e.getTweensOf(t, n),
		getProperty(t, e, n, i) {
			_(t) && (t = Ht(t)[0]);
			let r = K(t || {}).get,
				s = n ? ct : lt;
			return "native" === n && (n = ""), t ? e ? s((j[e] && j[e].get || r)(t, e, n, i)) : (e, n, i) => s((j[e] && j[e].get || r)(t, e, n, i)) : t
		},
		quickSetter(t, e, n) {
			if ((t = Ht(t)).length > 1) {
				let i = t.map((t => nn.quickSetter(t, e, n))),
					r = i.length;
				return t => {
					let e = r;
					for (; e--;) i[e](t)
				}
			}
			t = t[0] || {};
			let i = j[e],
				r = K(t),
				s = r.harness && (r.harness.aliases || {})[e] || e,
				a = i ? e => {
					let r = new i;
					o._pt = 0, r.init(t, n ? e + n : e, o, 0, [t]), r.render(1, r), o._pt && Xe(1, o)
				} : r.set(t, s);
			return i ? a : e => a(t, s, n ? e + n : e, r, 1)
		},
		quickTo(t, e, n) {
			let i = nn.to(t, ut({
					[e]: "+=0.1",
					paused: !0
				}, n || {})),
				r = (t, n, r) => i.resetTo(e, t, n, r);
			return r.tween = i, r
		},
		isTweening: t => e.getTweensOf(t, !0).length > 0,
		defaults: t => (t && t.ease && (t.ease = xe(t.ease, h.ease)), dt(h, t || {})),
		config: t => dt(c, t || {}),
		registerEffect({
			name: t,
			effect: e,
			plugins: n,
			defaults: i,
			extendTimeline: r
		}) {
			(n || "").split(",").forEach((e => e && !j[e] && !z[e] && U(t + " effect requires " + e + " plugin."))), X[t] = (t, n, r) => e(Ht(t), ht(n || {}, i), r), r && (Ae.prototype[t] = function (e, n, i) {
				return this.add(X[t](e, M(n) ? n : (i = n) && {}, this), i)
			})
		},
		registerEase(t, e) {
			me[t] = xe(e)
		},
		parseEase(t, e) {
			return arguments.length ? xe(t, e) : me
		},
		getById: t => e.getById(t),
		exportRoot(t = {}, n) {
			let i, r, s = new Ae(t);
			for (s.smoothChildTiming = S(t.smoothChildTiming), e.remove(s), s._dp = 0, s._time = s._tTime = e._time, i = e._first; i;) r = i._next, !n && !i._dur && i instanceof Fe && i.vars.onComplete === i._targets[0] || Et(s, i, i._start - i._delay), i = r;
			return Et(e, s, 0), s
		},
		utils: {
			wrap: Yt,
			wrapYoyo: Jt,
			distribute: Vt,
			random: jt,
			snap: qt,
			normalize: (t, e, n) => Qt(t, e, 0, 1, n),
			getUnit: Ft,
			clamp: (t, e, n) => zt(n, (n => Bt(t, e, n))),
			splitColor: ae,
			toArray: Ht,
			selector: t => (t = Ht(t)[0] || U("Invalid scope") || {}, e => {
				let n = t.current || t.nativeElement || t;
				return Ht(e, n.querySelectorAll ? n : n === t ? U("Invalid scope") || r.createElement("div") : t)
			}),
			mapRange: Qt,
			pipe: (...t) => e => t.reduce(((t, e) => e(t)), e),
			unitize: (t, e) => n => t(parseFloat(n)) + (e || Ft(n)),
			interpolate: Kt,
			shuffle: Gt
		},
		install: F,
		effects: X,
		ticker: de,
		updateRoot: Ae.updateRoot,
		plugins: j,
		globalTimeline: e,
		core: {
			PropTween: Ke,
			globals: H,
			Tween: Fe,
			Timeline: Ae,
			Animation: Ee,
			getCache: K,
			_removeLinkedListItem: gt,
			suppressOverwrites: e => t = e
		}
	};
	et("to,from,fromTo,delayedCall,set,killTweensOf", (t => $e[t] = Fe[t])), de.add(Ae.updateRoot), o = $e.to({}, {
		duration: 0
	});
	let tn = (t, e) => {
			let n = t._pt;
			for (; n && n.p !== e && n.op !== e && n.fp !== e;) n = n._next;
			return n
		},
		en = (t, e) => ({
			name: t,
			rawVars: 1,
			init(t, n, i) {
				i._onInit = t => {
					let i, r;
					if (_(n) && (i = {}, et(n, (t => i[t] = 1)), n = i), e) {
						for (r in i = {}, n) i[r] = e(n[r]);
						n = i
					}((t, e) => {
						let n, i, r, s = t._targets;
						for (n in e)
							for (i = s.length; i--;) r = t._ptLookup[i][n], r && (r = r.d) && (r._pt && (r = tn(r, n)), r && r.modifier && r.modifier(e[n], t, s[i], n))
					})(t, n)
				}
			}
		});
	const nn = $e.registerPlugin({
		name: "attr",
		init(t, e, n, i, r) {
			let s, a;
			for (s in e) a = this.add(t, "setAttribute", (t.getAttribute(s) || 0) + "", e[s], i, r, 0, 0, s), a && (a.op = s), this._props.push(s)
		}
	}, {
		name: "endArray",
		init(t, e) {
			let n = e.length;
			for (; n--;) this.add(t, n, t[n] || 0, e[n])
		}
	}, en("roundProps", Wt), en("modifiers"), en("snap", qt)) || $e;
	Fe.version = Ae.version = nn.version = "3.10.1", s = 1, T() && pe();
	/*!
	 * CSSPlugin 3.10.1
	 * https://greensock.com
	 *
	 * Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	 */
	let rn, sn, an, on, ln, cn, hn, un = {},
		dn = 180 / Math.PI,
		pn = Math.PI / 180,
		mn = Math.atan2,
		fn = /([A-Z])/g,
		gn = /(left|right|width|margin|padding|x)/i,
		vn = /[\s,\(]\S/,
		yn = {
			autoAlpha: "opacity,visibility",
			scale: "scaleX,scaleY",
			alpha: "opacity"
		},
		_n = (t, e) => e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e),
		xn = (t, e) => e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e),
		wn = (t, e) => e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e),
		bn = (t, e) => {
			let n = e.s + e.c * t;
			e.set(e.t, e.p, ~~(n + (n < 0 ? -.5 : .5)) + e.u, e)
		},
		Mn = (t, e) => e.set(e.t, e.p, t ? e.e : e.b, e),
		Sn = (t, e) => e.set(e.t, e.p, 1 !== t ? e.b : e.e, e),
		Tn = (t, e, n) => t.style[e] = n,
		En = (t, e, n) => t.style.setProperty(e, n),
		An = (t, e, n) => t._gsap[e] = n,
		Ln = (t, e, n) => t._gsap.scaleX = t._gsap.scaleY = n,
		Cn = (t, e, n, i, r) => {
			let s = t._gsap;
			s.scaleX = s.scaleY = n, s.renderTransform(r, s)
		},
		Rn = (t, e, n, i, r) => {
			let s = t._gsap;
			s[e] = n, s.renderTransform(r, s)
		},
		Pn = "transform",
		Dn = Pn + "Origin",
		In = (t, e) => {
			let n = sn.createElementNS ? sn.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : sn.createElement(t);
			return n.style ? n : sn.createElement(t)
		},
		On = (t, e, n) => {
			let i = getComputedStyle(t);
			return i[e] || i.getPropertyValue(e.replace(fn, "-$1").toLowerCase()) || i.getPropertyValue(e) || !n && On(t, zn(e) || e, 1) || ""
		},
		Nn = "O,Moz,ms,Ms,Webkit".split(","),
		zn = (t, e, n) => {
			let i = (e || ln).style,
				r = 5;
			if (t in i && !n) return t;
			for (t = t.charAt(0).toUpperCase() + t.substr(1); r-- && !(Nn[r] + t in i););
			return r < 0 ? null : (3 === r ? "ms" : r >= 0 ? Nn[r] : "") + t
		},
		Bn = () => {
			"undefined" != typeof window && window.document && (rn = window, sn = rn.document, an = sn.documentElement, ln = In("div") || {
				style: {}
			}, In("div"), Pn = zn(Pn), Dn = Pn + "Origin", ln.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", hn = !!zn("perspective"), on = 1)
		},
		Fn = function (t) {
			let e, n = In("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
				i = this.parentNode,
				r = this.nextSibling,
				s = this.style.cssText;
			if (an.appendChild(n), n.appendChild(this), this.style.display = "block", t) try {
				e = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = Fn
			} catch (t) {} else this._gsapBBox && (e = this._gsapBBox());
			return i && (r ? i.insertBefore(this, r) : i.appendChild(this)), an.removeChild(n), this.style.cssText = s, e
		},
		kn = (t, e) => {
			let n = e.length;
			for (; n--;)
				if (t.hasAttribute(e[n])) return t.getAttribute(e[n])
		},
		Un = t => {
			let e;
			try {
				e = t.getBBox()
			} catch (n) {
				e = Fn.call(t, !0)
			}
			return e && (e.width || e.height) || t.getBBox === Fn || (e = Fn.call(t, !0)), !e || e.width || e.x || e.y ? e : {
				x: +kn(t, ["x", "cx", "x1"]) || 0,
				y: +kn(t, ["y", "cy", "y1"]) || 0,
				width: 0,
				height: 0
			}
		},
		Hn = t => !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !Un(t)),
		Gn = (t, e) => {
			if (e) {
				let n = t.style;
				e in un && e !== Dn && (e = Pn), n.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), n.removeProperty(e.replace(fn, "-$1").toLowerCase())) : n.removeAttribute(e)
			}
		},
		Vn = (t, e, n, i, r, s) => {
			let a = new Ke(t._pt, e, n, 0, 1, s ? Sn : Mn);
			return t._pt = a, a.b = i, a.e = r, t._props.push(n), a
		},
		Wn = {
			deg: 1,
			rad: 1,
			turn: 1
		},
		qn = (t, e, n, i) => {
			let r, s, a, o, l = parseFloat(n) || 0,
				c = (n + "").trim().substr((l + "").length) || "px",
				h = ln.style,
				u = gn.test(e),
				d = "svg" === t.tagName.toLowerCase(),
				p = (d ? "client" : "offset") + (u ? "Width" : "Height"),
				m = 100,
				f = "px" === i,
				g = "%" === i;
			return i === c || !l || Wn[i] || Wn[c] ? l : ("px" !== c && !f && (l = qn(t, e, n, "px")), o = t.getCTM && Hn(t), !g && "%" !== c || !un[e] && !~e.indexOf("adius") ? (h[u ? "width" : "height"] = m + (f ? c : i), s = ~e.indexOf("adius") || "em" === i && t.appendChild && !d ? t : t.parentNode, o && (s = (t.ownerSVGElement || {}).parentNode), s && s !== sn && s.appendChild || (s = sn.body), a = s._gsap, a && g && a.width && u && a.time === de.time ? nt(l / a.width * m) : ((g || "%" === c) && (h.position = On(t, "position")), s === t && (h.position = "static"), s.appendChild(ln), r = ln[p], s.removeChild(ln), h.position = "absolute", u && g && (a = K(s), a.time = de.time, a.width = s[p]), nt(f ? r * l / m : r && l ? m / r * l : 0))) : (r = o ? t.getBBox()[u ? "width" : "height"] : t[p], nt(g ? l / r * m : l / 100 * r)))
		},
		jn = (t, e, n, i) => {
			let r;
			return on || Bn(), e in yn && "transform" !== e && ~(e = yn[e]).indexOf(",") && (e = e.split(",")[0]), un[e] && "transform" !== e ? (r = ri(t, i), r = "transformOrigin" !== e ? r[e] : r.svg ? r.origin : si(On(t, Dn)) + " " + r.zOrigin + "px") : (r = t.style[e], (!r || "auto" === r || i || ~(r + "").indexOf("calc(")) && (r = Qn[e] && Qn[e](t, e, n) || On(t, e) || tt(t, e) || ("opacity" === e ? 1 : 0))), n && !~(r + "").trim().indexOf(" ") ? qn(t, e, r, n) + n : r
		},
		Xn = function (t, e, n, i) {
			if (!n || "none" === n) {
				let i = zn(e, t, 1),
					r = i && On(t, i, 1);
				r && r !== n ? (e = i, n = r) : "borderColor" === e && (n = On(t, "borderTopColor"))
			}
			let r, s, a, o, l, h, u, d, p, m, f, g, v = new Ke(this._pt, t.style, e, 0, 1, je),
				y = 0,
				_ = 0;
			if (v.b = n, v.e = i, n += "", "auto" === (i += "") && (t.style[e] = i, i = On(t, e) || i, t.style[e] = n), r = [n, i], ue(r), n = r[0], i = r[1], a = n.match(P) || [], g = i.match(P) || [], g.length) {
				for (; s = P.exec(i);) u = s[0], p = i.substring(y, s.index), l ? l = (l + 1) % 5 : "rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5) || (l = 1), u !== (h = a[_++] || "") && (o = parseFloat(h) || 0, f = h.substr((o + "").length), "=" === u.charAt(1) && (u = rt(o, u) + f), d = parseFloat(u), m = u.substr((d + "").length), y = P.lastIndex - m.length, m || (m = m || c.units[e] || f, y === i.length && (i += m, v.e += m)), f !== m && (o = qn(t, e, h, m) || 0), v._pt = {
					_next: v._pt,
					p: p || 1 === _ ? p : ",",
					s: o,
					c: d - o,
					m: l && l < 4 || "zIndex" === e ? Math.round : 0
				});
				v.c = y < i.length ? i.substring(y, i.length) : ""
			} else v.r = "display" === e && "none" === i ? Sn : Mn;
			return I.test(i) && (v.e = 0), this._pt = v, v
		},
		Yn = {
			top: "0%",
			bottom: "100%",
			left: "0%",
			right: "100%",
			center: "50%"
		},
		Jn = t => {
			let e = t.split(" "),
				n = e[0],
				i = e[1] || "50%";
			return "top" !== n && "bottom" !== n && "left" !== i && "right" !== i || (t = n, n = i, i = t), e[0] = Yn[n] || n, e[1] = Yn[i] || i, e.join(" ")
		},
		Zn = (t, e) => {
			if (e.tween && e.tween._time === e.tween._dur) {
				let t, n, i, r = e.t,
					s = r.style,
					a = e.u,
					o = r._gsap;
				if ("all" === a || !0 === a) s.cssText = "", n = 1;
				else
					for (a = a.split(","), i = a.length; --i > -1;) t = a[i], un[t] && (n = 1, t = "transformOrigin" === t ? Dn : Pn), Gn(r, t);
				n && (Gn(r, Pn), o && (o.svg && r.removeAttribute("transform"), ri(r, 1), o.uncache = 1))
			}
		},
		Qn = {
			clearProps(t, e, n, i, r) {
				if ("isFromStart" !== r.data) {
					let s = t._pt = new Ke(t._pt, e, n, 0, 0, Zn);
					return s.u = i, s.pr = -10, s.tween = r, t._props.push(n), 1
				}
			}
		},
		Kn = [1, 0, 0, 1, 0, 0],
		$n = {},
		ti = t => "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t,
		ei = t => {
			let e = On(t, Pn);
			return ti(e) ? Kn : e.substr(7).match(R).map(nt)
		},
		ni = (t, e) => {
			let n, i, r, s, a = t._gsap || K(t),
				o = t.style,
				l = ei(t);
			return a.svg && t.getAttribute("transform") ? (r = t.transform.baseVal.consolidate().matrix, l = [r.a, r.b, r.c, r.d, r.e, r.f], "1,0,0,1,0,0" === l.join(",") ? Kn : l) : (l !== Kn || t.offsetParent || t === an || a.svg || (r = o.display, o.display = "block", n = t.parentNode, n && t.offsetParent || (s = 1, i = t.nextSibling, an.appendChild(t)), l = ei(t), r ? o.display = r : Gn(t, "display"), s && (i ? n.insertBefore(t, i) : n ? n.appendChild(t) : an.removeChild(t))), e && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l)
		},
		ii = (t, e, n, i, r, s) => {
			let a, o, l, c, h = t._gsap,
				u = r || ni(t, !0),
				d = h.xOrigin || 0,
				p = h.yOrigin || 0,
				m = h.xOffset || 0,
				f = h.yOffset || 0,
				g = u[0],
				v = u[1],
				y = u[2],
				_ = u[3],
				x = u[4],
				w = u[5],
				b = e.split(" "),
				M = parseFloat(b[0]) || 0,
				S = parseFloat(b[1]) || 0;
			n ? u !== Kn && (o = g * _ - v * y) && (l = M * (_ / o) + S * (-y / o) + (y * w - _ * x) / o, c = M * (-v / o) + S * (g / o) - (g * w - v * x) / o, M = l, S = c) : (a = Un(t), M = a.x + (~b[0].indexOf("%") ? M / 100 * a.width : M), S = a.y + (~(b[1] || b[0]).indexOf("%") ? S / 100 * a.height : S)), i || !1 !== i && h.smooth ? (x = M - d, w = S - p, h.xOffset = m + (x * g + w * y) - x, h.yOffset = f + (x * v + w * _) - w) : h.xOffset = h.yOffset = 0, h.xOrigin = M, h.yOrigin = S, h.smooth = !!i, h.origin = e, h.originIsAbsolute = !!n, t.style[Dn] = "0px 0px", s && (Vn(s, h, "xOrigin", d, M), Vn(s, h, "yOrigin", p, S), Vn(s, h, "xOffset", m, h.xOffset), Vn(s, h, "yOffset", f, h.yOffset)), t.setAttribute("data-svg-origin", M + " " + S)
		},
		ri = (t, e) => {
			let n = t._gsap || new Te(t);
			if ("x" in n && !e && !n.uncache) return n;
			let i, r, s, a, o, l, h, u, d, p, m, f, g, v, y, _, x, w, b, M, S, T, E, A, L, C, R, P, D, I, O, N, z = t.style,
				B = n.scaleX < 0,
				F = "px",
				k = "deg",
				U = On(t, Dn) || "0";
			return i = r = s = l = h = u = d = p = m = 0, a = o = 1, n.svg = !(!t.getCTM || !Hn(t)), v = ni(t, n.svg), n.svg && (A = (!n.uncache || "0px 0px" === U) && !e && t.getAttribute("data-svg-origin"), ii(t, A || U, !!A || n.originIsAbsolute, !1 !== n.smooth, v)), f = n.xOrigin || 0, g = n.yOrigin || 0, v !== Kn && (w = v[0], b = v[1], M = v[2], S = v[3], i = T = v[4], r = E = v[5], 6 === v.length ? (a = Math.sqrt(w * w + b * b), o = Math.sqrt(S * S + M * M), l = w || b ? mn(b, w) * dn : 0, d = M || S ? mn(M, S) * dn + l : 0, d && (o *= Math.abs(Math.cos(d * pn))), n.svg && (i -= f - (f * w + g * M), r -= g - (f * b + g * S))) : (N = v[6], I = v[7], R = v[8], P = v[9], D = v[10], O = v[11], i = v[12], r = v[13], s = v[14], y = mn(N, D), h = y * dn, y && (_ = Math.cos(-y), x = Math.sin(-y), A = T * _ + R * x, L = E * _ + P * x, C = N * _ + D * x, R = T * -x + R * _, P = E * -x + P * _, D = N * -x + D * _, O = I * -x + O * _, T = A, E = L, N = C), y = mn(-M, D), u = y * dn, y && (_ = Math.cos(-y), x = Math.sin(-y), A = w * _ - R * x, L = b * _ - P * x, C = M * _ - D * x, O = S * x + O * _, w = A, b = L, M = C), y = mn(b, w), l = y * dn, y && (_ = Math.cos(y), x = Math.sin(y), A = w * _ + b * x, L = T * _ + E * x, b = b * _ - w * x, E = E * _ - T * x, w = A, T = L), h && Math.abs(h) + Math.abs(l) > 359.9 && (h = l = 0, u = 180 - u), a = nt(Math.sqrt(w * w + b * b + M * M)), o = nt(Math.sqrt(E * E + N * N)), y = mn(T, E), d = Math.abs(y) > 2e-4 ? y * dn : 0, m = O ? 1 / (O < 0 ? -O : O) : 0), n.svg && (A = t.getAttribute("transform"), n.forceCSS = t.setAttribute("transform", "") || !ti(On(t, Pn)), A && t.setAttribute("transform", A))), Math.abs(d) > 90 && Math.abs(d) < 270 && (B ? (a *= -1, d += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (o *= -1, d += d <= 0 ? 180 : -180)), e = e || n.uncache, n.x = i - ((n.xPercent = i && (!e && n.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0))) ? t.offsetWidth * n.xPercent / 100 : 0) + F, n.y = r - ((n.yPercent = r && (!e && n.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-r) ? -50 : 0))) ? t.offsetHeight * n.yPercent / 100 : 0) + F, n.z = s + F, n.scaleX = nt(a), n.scaleY = nt(o), n.rotation = nt(l) + k, n.rotationX = nt(h) + k, n.rotationY = nt(u) + k, n.skewX = d + k, n.skewY = p + k, n.transformPerspective = m + F, (n.zOrigin = parseFloat(U.split(" ")[2]) || 0) && (z[Dn] = si(U)), n.xOffset = n.yOffset = 0, n.force3D = c.force3D, n.renderTransform = n.svg ? di : hn ? ui : oi, n.uncache = 0, n
		},
		si = t => (t = t.split(" "))[0] + " " + t[1],
		ai = (t, e, n) => {
			let i = Ft(e);
			return nt(parseFloat(e) + parseFloat(qn(t, "x", n + "px", i))) + i
		},
		oi = (t, e) => {
			e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, ui(t, e)
		},
		li = "0deg",
		ci = "0px",
		hi = ") ",
		ui = function (t, e) {
			let {
				xPercent: n,
				yPercent: i,
				x: r,
				y: s,
				z: a,
				rotation: o,
				rotationY: l,
				rotationX: c,
				skewX: h,
				skewY: u,
				scaleX: d,
				scaleY: p,
				transformPerspective: m,
				force3D: f,
				target: g,
				zOrigin: v
			} = e || this, y = "", _ = "auto" === f && t && 1 !== t || !0 === f;
			if (v && (c !== li || l !== li)) {
				let t, e = parseFloat(l) * pn,
					n = Math.sin(e),
					i = Math.cos(e);
				e = parseFloat(c) * pn, t = Math.cos(e), r = ai(g, r, n * t * -v), s = ai(g, s, -Math.sin(e) * -v), a = ai(g, a, i * t * -v + v)
			}
			m !== ci && (y += "perspective(" + m + hi), (n || i) && (y += "translate(" + n + "%, " + i + "%) "), (_ || r !== ci || s !== ci || a !== ci) && (y += a !== ci || _ ? "translate3d(" + r + ", " + s + ", " + a + ") " : "translate(" + r + ", " + s + hi), o !== li && (y += "rotate(" + o + hi), l !== li && (y += "rotateY(" + l + hi), c !== li && (y += "rotateX(" + c + hi), h === li && u === li || (y += "skew(" + h + ", " + u + hi), 1 === d && 1 === p || (y += "scale(" + d + ", " + p + hi), g.style[Pn] = y || "translate(0, 0)"
		},
		di = function (t, e) {
			let n, i, r, s, a, {
					xPercent: o,
					yPercent: l,
					x: c,
					y: h,
					rotation: u,
					skewX: d,
					skewY: p,
					scaleX: m,
					scaleY: f,
					target: g,
					xOrigin: v,
					yOrigin: y,
					xOffset: _,
					yOffset: x,
					forceCSS: w
				} = e || this,
				b = parseFloat(c),
				M = parseFloat(h);
			u = parseFloat(u), d = parseFloat(d), p = parseFloat(p), p && (p = parseFloat(p), d += p, u += p), u || d ? (u *= pn, d *= pn, n = Math.cos(u) * m, i = Math.sin(u) * m, r = Math.sin(u - d) * -f, s = Math.cos(u - d) * f, d && (p *= pn, a = Math.tan(d - p), a = Math.sqrt(1 + a * a), r *= a, s *= a, p && (a = Math.tan(p), a = Math.sqrt(1 + a * a), n *= a, i *= a)), n = nt(n), i = nt(i), r = nt(r), s = nt(s)) : (n = m, s = f, i = r = 0), (b && !~(c + "").indexOf("px") || M && !~(h + "").indexOf("px")) && (b = qn(g, "x", c, "px"), M = qn(g, "y", h, "px")), (v || y || _ || x) && (b = nt(b + v - (v * n + y * r) + _), M = nt(M + y - (v * i + y * s) + x)), (o || l) && (a = g.getBBox(), b = nt(b + o / 100 * a.width), M = nt(M + l / 100 * a.height)), a = "matrix(" + n + "," + i + "," + r + "," + s + "," + b + "," + M + ")", g.setAttribute("transform", a), w && (g.style[Pn] = a)
		},
		pi = function (t, e, n, i, r) {
			let s, a, o = 360,
				l = _(r),
				c = parseFloat(r) * (l && ~r.indexOf("rad") ? dn : 1) - i,
				h = i + c + "deg";
			return l && (s = r.split("_")[1], "short" === s && (c %= o, c !== c % 180 && (c += c < 0 ? o : -360)), "cw" === s && c < 0 ? c = (c + 36e9) % o - ~~(c / o) * o : "ccw" === s && c > 0 && (c = (c - 36e9) % o - ~~(c / o) * o)), t._pt = a = new Ke(t._pt, e, n, i, c, xn), a.e = h, a.u = "deg", t._props.push(n), a
		},
		mi = (t, e) => {
			for (let n in e) t[n] = e[n];
			return t
		},
		fi = (t, e, n) => {
			let i, r, s, a, o, l, c, h, u = mi({}, n._gsap),
				d = n.style;
			for (r in u.svg ? (s = n.getAttribute("transform"), n.setAttribute("transform", ""), d[Pn] = e, i = ri(n, 1), Gn(n, Pn), n.setAttribute("transform", s)) : (s = getComputedStyle(n)[Pn], d[Pn] = e, i = ri(n, 1), d[Pn] = s), un) s = u[r], a = i[r], s !== a && "perspective,force3D,transformOrigin,svgOrigin".indexOf(r) < 0 && (c = Ft(s), h = Ft(a), o = c !== h ? qn(n, r, s, h) : parseFloat(s), l = parseFloat(a), t._pt = new Ke(t._pt, i, r, o, l - o, _n), t._pt.u = h || 0, t._props.push(r));
			mi(i, u)
		};
	et("padding,margin,Width,Radius", ((t, e) => {
		let n = "Top",
			i = "Right",
			r = "Bottom",
			s = "Left",
			a = (e < 3 ? [n, i, r, s] : [n + s, n + i, r + i, r + s]).map((n => e < 2 ? t + n : "border" + n + t));
		Qn[e > 1 ? "border" + t : t] = function (t, e, n, i, r) {
			let s, o;
			if (arguments.length < 4) return s = a.map((e => jn(t, e, n))), o = s.join(" "), 5 === o.split(s[0]).length ? s[0] : o;
			s = (i + "").split(" "), o = {}, a.forEach(((t, e) => o[t] = s[e] = s[e] || s[(e - 1) / 2 | 0])), t.init(e, o, r)
		}
	}));
	const gi = {
		name: "css",
		register: Bn,
		targetTest: t => t.style && t.nodeType,
		init(t, e, n, i, r) {
			let s, a, o, l, h, u, d, p, m, f, g, v, y, x, w, b = this._props,
				M = t.style,
				S = n.vars.startAt;
			for (d in on || Bn(), e)
				if ("autoRound" !== d && (a = e[d], !j[d] || !De(d, e, n, i, t, r)))
					if (h = typeof a, u = Qn[d], "function" === h && (a = a.call(n, i, t, r), h = typeof a), "string" === h && ~a.indexOf("random(") && (a = Zt(a)), u) u(this, t, d, a, n) && (w = 1);
					else if ("--" === d.substr(0, 2)) s = (getComputedStyle(t).getPropertyValue(d) + "").trim(), a += "", ce.lastIndex = 0, ce.test(s) || (p = Ft(s), m = Ft(a)), m ? p !== m && (s = qn(t, d, s, m) + m) : p && (a += p), this.add(M, "setProperty", s, a, i, r, 0, 0, d), b.push(d);
			else if ("undefined" !== h) {
				if (S && d in S ? (s = "function" == typeof S[d] ? S[d].call(n, i, t, r) : S[d], _(s) && ~s.indexOf("random(") && (s = Zt(s)), Ft(s + "") || (s += c.units[d] || Ft(jn(t, d)) || ""), "=" === (s + "").charAt(1) && (s = jn(t, d))) : s = jn(t, d), l = parseFloat(s), f = "string" === h && "=" === a.charAt(1) && a.substr(0, 2), f && (a = a.substr(2)), o = parseFloat(a), d in yn && ("autoAlpha" === d && (1 === l && "hidden" === jn(t, "visibility") && o && (l = 0), Vn(this, M, "visibility", l ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)), "scale" !== d && "transform" !== d && (d = yn[d], ~d.indexOf(",") && (d = d.split(",")[0]))), g = d in un, g)
					if (v || (y = t._gsap, y.renderTransform && !e.parseTransform || ri(t, e.parseTransform), x = !1 !== e.smoothOrigin && y.smooth, v = this._pt = new Ke(this._pt, M, Pn, 0, 1, y.renderTransform, y, 0, -1), v.dep = 1), "scale" === d) this._pt = new Ke(this._pt, y, "scaleY", y.scaleY, (f ? rt(y.scaleY, f + o) : o) - y.scaleY || 0), b.push("scaleY", d), d += "X";
					else {
						if ("transformOrigin" === d) {
							a = Jn(a), y.svg ? ii(t, a, 0, x, 0, this) : (m = parseFloat(a.split(" ")[2]) || 0, m !== y.zOrigin && Vn(this, y, "zOrigin", y.zOrigin, m), Vn(this, M, d, si(s), si(a)));
							continue
						}
						if ("svgOrigin" === d) {
							ii(t, a, 1, x, 0, this);
							continue
						}
						if (d in $n) {
							pi(this, y, d, l, f ? rt(l, f + a) : a);
							continue
						}
						if ("smoothOrigin" === d) {
							Vn(this, y, "smooth", y.smooth, a);
							continue
						}
						if ("force3D" === d) {
							y[d] = a;
							continue
						}
						if ("transform" === d) {
							fi(this, a, t);
							continue
						}
					}
				else d in M || (d = zn(d) || d);
				if (g || (o || 0 === o) && (l || 0 === l) && !vn.test(a) && d in M) p = (s + "").substr((l + "").length), o || (o = 0), m = Ft(a) || (d in c.units ? c.units[d] : p), p !== m && (l = qn(t, d, s, m)), this._pt = new Ke(this._pt, g ? y : M, d, l, (f ? rt(l, f + o) : o) - l, g || "px" !== m && "zIndex" !== d || !1 === e.autoRound ? _n : bn), this._pt.u = m || 0, p !== m && "%" !== m && (this._pt.b = s, this._pt.r = wn);
				else if (d in M) Xn.call(this, t, d, s, f ? f + a : a);
				else {
					if (!(d in t)) {
						k(d, a);
						continue
					}
					this.add(t, d, s || t[d], f ? f + a : a, i, r)
				}
				b.push(d)
			}
			w && Qe(this)
		},
		get: jn,
		aliases: yn,
		getSetter(t, e, n) {
			let i = yn[e];
			return i && i.indexOf(",") < 0 && (e = i), e in un && e !== Dn && (t._gsap.x || jn(t, "x")) ? n && cn === n ? "scale" === e ? Ln : An : (cn = n || {}) && ("scale" === e ? Cn : Rn) : t.style && !b(t.style[e]) ? Tn : ~e.indexOf("-") ? En : Ve(t, e)
		},
		core: {
			_removeProperty: Gn,
			_getMatrix: ni
		}
	};
	nn.utils.checkPrefix = zn,
		function (t, e, n, i) {
			let r = et(t + "," + e + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (t => {
				un[t] = 1
			}));
			et(e, (t => {
				c.units[t] = "deg", $n[t] = 1
			})), yn[r[13]] = t + "," + e, et("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (t => {
				let e = t.split(":");
				yn[e[1]] = r[e[0]]
			}))
		}("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY"), et("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (t => {
			c.units[t] = "px"
		})), nn.registerPlugin(gi);
	const vi = nn.registerPlugin(gi) || nn;
	vi.core.Tween;
	/*!
	 * Observer 3.10.1
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	 */
	let yi, _i, xi, wi, bi, Mi, Si, Ti, Ei, Ai, Li, Ci = () => yi || "undefined" != typeof window && (yi = window.gsap) && yi.registerPlugin && yi,
		Ri = 1,
		Pi = [],
		Di = [],
		Ii = [],
		Oi = Date.now,
		Ni = (t, e) => e,
		zi = (t, e) => ~Ii.indexOf(t) && Ii[Ii.indexOf(t) + 1][e],
		Bi = t => !!~Ai.indexOf(t),
		Fi = (t, e, n, i) => t.addEventListener(e, n, {
			passive: !i
		}),
		ki = (t, e, n) => t.removeEventListener(e, n),
		Ui = "scrollLeft",
		Hi = "scrollTop",
		Gi = () => Li && Li.isPressed || Di.cache++,
		Vi = t => e => (e || 0 === e ? (Ri && (xi.history.scrollRestoration = "manual"), t(e), t.v = e, t.c = Di.cache, Li && Li.isPressed && Ni("ss", e)) : (Di.cache !== t.c || Ni("ref")) && (t.c = Di.cache, t.v = t()), t.v),
		Wi = {
			s: Ui,
			p: "left",
			p2: "Left",
			os: "right",
			os2: "Right",
			d: "width",
			d2: "Width",
			a: "x",
			sc: Vi((function (t) {
				return arguments.length ? xi.scrollTo(t, qi.sc()) : xi.pageXOffset || wi.scrollLeft || bi.scrollLeft || Mi.scrollLeft || 0
			}))
		},
		qi = {
			s: Hi,
			p: "top",
			p2: "Top",
			os: "bottom",
			os2: "Bottom",
			d: "height",
			d2: "Height",
			a: "y",
			op: Wi,
			sc: Vi((function (t) {
				return arguments.length ? xi.scrollTo(Wi.sc(), t) : xi.pageYOffset || wi.scrollTop || bi.scrollTop || Mi.scrollTop || 0
			}))
		},
		ji = t => yi.utils.toArray(t)[0] || ("string" == typeof t && !1 !== yi.config().nullTargetWarn ? console.warn("Element not found:", t) : null),
		Xi = (t, {
			s: e,
			sc: n
		}) => {
			let i = Di.indexOf(t),
				r = n === qi.sc ? 1 : 2;
			return !~i && (i = Di.push(t) - 1), Di[i + r] || (Di[i + r] = zi(t, e) || (Bi(t) ? n : function (n) {
				return arguments.length ? t[e] = n : t[e]
			}))
		},
		Yi = (t, e, n) => {
			let i = t,
				r = t,
				s = Oi(),
				a = s,
				o = e || 50,
				l = Math.max(500, 3 * o),
				c = (t, e) => {
					let l = Oi();
					e || l - s > o ? (r = i, i = t, a = s, s = l) : n ? i += t : i = r + (t - r) / (l - a) * (s - a)
				};
			return {
				update: c,
				reset: () => {
					r = i = n ? 0 : i, a = s = 0
				},
				getVelocity: t => {
					let e = a,
						o = r,
						h = Oi();
					return (t || 0 === t) && t !== i && c(t), s === a || h - a > l ? 0 : (i + (n ? o : -o)) / ((n ? h : s) - e) * 1e3
				}
			}
		},
		Ji = (t, e) => (e && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t),
		Zi = t => {
			let e = Math.max(...t),
				n = Math.min(...t);
			return Math.abs(e) >= Math.abs(n) ? e : n
		},
		Qi = t => (yi = t || Ci(), yi && !_i && "undefined" != typeof document && (xi = window, wi = document, bi = wi.documentElement, Mi = wi.body, Ai = [xi, wi, bi, Mi], yi.utils.clamp, Ti = "onpointerenter" in Mi ? "pointer" : "mouse", Si = Ki.isTouch = xi.matchMedia && xi.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in xi || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, setTimeout((() => Ri = 0), 500), _i = 1), _i);
	Wi.op = qi, Di.cache = 0;
	class Ki {
		constructor(t) {
			this.init(t)
		}
		init(t) {
			_i || Qi(yi) || console.warn("Please gsap.registerPlugin(Observer)"), Ei || (Ei = yi.core.globals().ScrollTrigger, Ei && Ei.core && (() => {
				let t = Ei.core,
					e = t.bridge || {},
					n = t._scrollers,
					i = t._proxies;
				n.push(...Di), i.push(...Ii), Di = n, Ii = i, Ni = (t, n) => e[t](n)
			})());
			let {
				tolerance: e,
				dragMinimum: n,
				type: i,
				target: r,
				lineHeight: s,
				debounce: a,
				preventDefault: o,
				onStop: l,
				onStopDelay: c,
				ignore: h,
				wheelSpeed: u,
				event: d,
				onDragStart: p,
				onDragEnd: m,
				onDrag: f,
				onPress: g,
				onRelease: v,
				onRight: y,
				onLeft: _,
				onUp: x,
				onDown: w,
				onChangeX: b,
				onChangeY: M,
				onChange: S,
				onToggleX: T,
				onToggleY: E,
				onHover: A,
				onHoverEnd: L,
				onMove: C,
				ignoreCheck: R,
				isNormalizer: P,
				onGestureStart: D,
				onGestureEnd: I,
				onWheel: O,
				onEnable: N,
				onDisable: z,
				onClick: B,
				scrollSpeed: F
			} = t;
			this.target = r = ji(r) || bi, this.vars = t, h && (h = yi.utils.toArray(h)), e = e || 0, n = n || 0, u = u || 1, F = F || 1, i = i || "wheel,touch,pointer", a = !1 !== a, s || (s = parseFloat(xi.getComputedStyle(Mi).lineHeight) || 22);
			let k, U, H, G, V, W = this,
				q = 0,
				j = 0,
				X = Xi(r, Wi),
				Y = Xi(r, qi),
				J = X(),
				Z = Y(),
				Q = ("ontouchstart" in bi ? "touchstart,touchmove,touchcancel,touchend" : i.indexOf("pointer") >= 0 && !("onpointerdown" in bi) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(","),
				K = ~i.indexOf("touch") && !~i.indexOf("pointer") && "pointerdown" === Q[0],
				tt = Bi(r),
				et = r.ownerDocument || wi,
				nt = [0, 0, 0],
				it = [0, 0, 0],
				rt = (t, e) => (W.event = t) && h && ~h.indexOf(t.target) || e && K && "touch" !== t.pointerType || R && R(t),
				st = () => {
					let t = W.deltaX = Zi(nt),
						n = W.deltaY = Zi(it),
						i = Math.abs(t) >= e,
						r = Math.abs(n) >= e;
					S && (i || r) && S(W, t, n, nt, it), i && (y && W.deltaX > 0 && y(W), _ && W.deltaX < 0 && _(W), b && b(W), T && W.deltaX < 0 != q < 0 && T(W), q = W.deltaX, nt[0] = nt[1] = nt[2] = 0), r && (w && W.deltaY > 0 && w(W), x && W.deltaY < 0 && x(W), M && M(W), E && W.deltaY < 0 != j < 0 && E(W), j = W.deltaY, it[0] = it[1] = it[2] = 0), G && (C(W), G = !1), H && (f(W), H = !1), V && (O(W), V = !1), k = 0
				},
				at = (t, e, n) => {
					nt[n] += t, it[n] += e, W._vx.update(t, 2 === n), W._vy.update(e, 2 === n), a ? k || (k = requestAnimationFrame(st)) : st()
				},
				ot = t => {
					if (rt(t, 1)) return;
					let e = (t = Ji(t, o)).clientX,
						i = t.clientY,
						r = e - W.x,
						s = i - W.y,
						a = W.isDragging;
					W.x = e, W.y = i, (a || Math.abs(W.startX - e) >= n || Math.abs(W.startY - i) >= n) && (f && (H = !0), a || (W.isDragging = !0), at(r, s, 2), a || p && p(W))
				},
				lt = W.onPress = t => {
					rt(t, 1) || (U.pause(), W.isPressed = !0, t = Ji(t, o), q = j = 0, W.startX = W.x = t.clientX, W.startY = W.y = t.clientY, W._vx.reset(), W._vy.reset(), Fi(P ? r : et, Q[1], ot, o), W.deltaX = W.deltaY = 0, g && g(W))
				},
				ct = t => {
					if (rt(t, 1)) return;
					ki(P ? r : et, Q[1], ot);
					let e = W.isDragging;
					e || (W._vx.reset(), W._vy.reset()), W.isDragging = W.isGesturing = W.isPressed = !1, l && !P && U.restart(!0), m && e && m(W), v && v(W, e)
				},
				ht = t => t.touches && t.touches.length > 1 && (W.isGesturing = !0) && D(t, W.isDragging),
				ut = () => (W.isGesturing = !1) || I(W),
				dt = t => {
					if (rt(t)) return;
					let e = X(),
						n = Y();
					at((e - J) * F, (n - Z) * F, 1), J = e, Z = n, l && U.restart(!0)
				},
				pt = t => {
					if (rt(t)) return;
					t = Ji(t, o), O && (V = !0);
					let e = (1 === t.deltaMode ? s : 2 === t.deltaMode ? xi.innerHeight : 1) * u;
					at(t.deltaX * e, t.deltaY * e, 0), l && !P && U.restart(!0)
				},
				mt = t => {
					if (rt(t)) return;
					let e = t.clientX,
						n = t.clientY,
						i = e - W.x,
						r = n - W.y;
					W.x = e, W.y = n, C && (G = !0), (i || r) && at(i, r, 2)
				},
				ft = t => {
					W.event = t, A(W)
				},
				gt = t => {
					W.event = t, L(W)
				},
				vt = t => rt(t) || Ji(t, o) && B(W);
			U = W._dc = yi.delayedCall(c || .25, (() => {
				W._vx.reset(), W._vy.reset(), U.pause(), l && l(W)
			})).pause(), W.deltaX = W.deltaY = 0, W._vx = Yi(0, 50, !0), W._vy = Yi(0, 50, !0), W.scrollX = X, W.scrollY = Y, W.isDragging = W.isGesturing = W.isPressed = !1, W.enable = t => (W.isEnabled || (Fi(tt ? et : r, "scroll", Gi), i.indexOf("scroll") >= 0 && Fi(tt ? et : r, "scroll", dt, o), i.indexOf("wheel") >= 0 && Fi(r, "wheel", pt, o), (i.indexOf("touch") >= 0 && Si || i.indexOf("pointer") >= 0) && (Fi(r, Q[0], lt, o), Fi(et, Q[2], ct), Fi(et, Q[3], ct), B && Fi(r, "click", vt), D && Fi(et, "gesturestart", ht), I && Fi(et, "gestureend", ut), A && Fi(r, Ti + "enter", ft), L && Fi(r, Ti + "leave", gt), C && Fi(r, Ti + "move", mt)), W.isEnabled = !0, t && t.type && lt(t), N && N(W)), W), W.disable = () => {
				W.isEnabled && (Pi.filter((t => t !== W && Bi(t.target))).length || ki(tt ? et : r, "scroll", Gi), ki(tt ? et : r, "scroll", dt), ki(r, "wheel", pt), ki(r, Q[0], lt), ki(et, Q[2], ct), ki(et, Q[3], ct), ki(r, "click", vt), ki(et, "gesturestart", ht), ki(et, "gestureend", ut), ki(r, Ti + "enter", ft), ki(r, Ti + "leave", gt), ki(r, Ti + "move", mt), W.isEnabled = !1, z && z(W))
			}, W.kill = () => {
				W.disable();
				let t = Pi.indexOf(W);
				t >= 0 && Pi.splice(t, 1), Li === W && (Li = 0)
			}, Pi.push(W), P && (Li = W), W.enable(d)
		}
		get velocityX() {
			return this._vx.getVelocity()
		}
		get velocityY() {
			return this._vy.getVelocity()
		}
	}
	Ki.version = "3.10.1", Ki.create = t => new Ki(t), Ki.register = Qi, Ki.getAll = () => Pi.slice(), Ki.getById = t => Pi.filter((e => e.vars.id === t))[0], Ci() && yi.registerPlugin(Ki);
	/*!
	 * ScrollTrigger 3.10.1
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	 */
	let $i, tr, er, nr, ir, rr, sr, ar, or, lr, cr, hr, ur, dr, pr, mr, fr, gr, vr, yr, _r, xr, wr, br, Mr, Sr, Tr, Er, Ar, Lr, Cr, Rr, Pr = 1,
		Dr = Date.now,
		Ir = Dr(),
		Or = 0,
		Nr = 0,
		zr = () => dr = 1,
		Br = () => dr = 0,
		Fr = t => t,
		kr = t => Math.round(1e5 * t) / 1e5 || 0,
		Ur = () => "undefined" != typeof window,
		Hr = () => $i || Ur() && ($i = window.gsap) && $i.registerPlugin && $i,
		Gr = t => !!~sr.indexOf(t),
		Vr = t => zi(t, "getBoundingClientRect") || (Gr(t) ? () => (Ks.width = er.innerWidth, Ks.height = er.innerHeight, Ks) : () => ds(t)),
		Wr = (t, {
			s: e,
			d2: n,
			d: i,
			a: r
		}) => (e = "scroll" + n) && (r = zi(t, e)) ? r() - Vr(t)()[i] : Gr(t) ? (ir[e] || rr[e]) - (er["inner" + n] || ir["client" + n] || rr["client" + n]) : t[e] - t["offset" + n],
		qr = (t, e) => {
			for (let n = 0; n < vr.length; n += 3)(!e || ~e.indexOf(vr[n + 1])) && t(vr[n], vr[n + 1], vr[n + 2])
		},
		jr = t => "string" == typeof t,
		Xr = t => "function" == typeof t,
		Yr = t => "number" == typeof t,
		Jr = t => "object" == typeof t,
		Zr = t => Xr(t) && t(),
		Qr = (t, e) => () => {
			let n = Zr(t),
				i = Zr(e);
			return () => {
				Zr(n), Zr(i)
			}
		},
		Kr = (t, e, n) => t && t.progress(e ? 0 : 1) && n && t.pause(),
		$r = (t, e) => {
			if (t.enabled) {
				let n = e(t);
				n && n.totalTime && (t.callbackAnimation = n)
			}
		},
		ts = Math.abs,
		es = "left",
		ns = "right",
		is = "bottom",
		rs = "width",
		ss = "height",
		as = "padding",
		os = "margin",
		ls = "Width",
		cs = "px",
		hs = t => er.getComputedStyle(t),
		us = (t, e) => {
			for (let n in e) n in t || (t[n] = e[n]);
			return t
		},
		ds = (t, e) => {
			let n = e && "matrix(1, 0, 0, 1, 0, 0)" !== hs(t)[pr] && $i.to(t, {
					x: 0,
					y: 0,
					xPercent: 0,
					yPercent: 0,
					rotation: 0,
					rotationX: 0,
					rotationY: 0,
					scale: 1,
					skewX: 0,
					skewY: 0
				}).progress(1),
				i = t.getBoundingClientRect();
			return n && n.progress(0).kill(), i
		},
		ps = (t, {
			d2: e
		}) => t["offset" + e] || t["client" + e] || 0,
		ms = t => {
			let e, n = [],
				i = t.labels,
				r = t.duration();
			for (e in i) n.push(i[e] / r);
			return n
		},
		fs = t => {
			let e = $i.utils.snap(t),
				n = Array.isArray(t) && t.slice(0).sort(((t, e) => t - e));
			return n ? (t, i, r = .001) => {
				let s;
				if (!i) return e(t);
				if (i > 0) {
					for (t -= r, s = 0; s < n.length; s++)
						if (n[s] >= t) return n[s];
					return n[s - 1]
				}
				for (s = n.length, t += r; s--;)
					if (n[s] <= t) return n[s];
				return n[0]
			} : (n, i, r = .001) => {
				let s = e(n);
				return !i || Math.abs(s - n) < r || s - n < 0 == i < 0 ? s : e(i < 0 ? n - t : n + t)
			}
		},
		gs = (t, e, n, i) => n.split(",").forEach((n => t(e, n, i))),
		vs = (t, e, n, i) => t.addEventListener(e, n, {
			passive: !i
		}),
		ys = (t, e, n) => t.removeEventListener(e, n),
		_s = (t, e, n) => n && n.wheelHandler && t(e, "wheel", n),
		xs = {
			startColor: "green",
			endColor: "red",
			indent: 0,
			fontSize: "16px",
			fontWeight: "normal"
		},
		ws = {
			toggleActions: "play",
			anticipatePin: 0
		},
		bs = {
			top: 0,
			left: 0,
			center: .5,
			bottom: 1,
			right: 1
		},
		Ms = (t, e) => {
			if (jr(t)) {
				let n = t.indexOf("="),
					i = ~n ? +(t.charAt(n - 1) + 1) * parseFloat(t.substr(n + 1)) : 0;
				~n && (t.indexOf("%") > n && (i *= e / 100), t = t.substr(0, n - 1)), t = i + (t in bs ? bs[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0)
			}
			return t
		},
		Ss = (t, e, n, i, {
			startColor: r,
			endColor: s,
			fontSize: a,
			indent: o,
			fontWeight: l
		}, c, h, u) => {
			let d = nr.createElement("div"),
				p = Gr(n) || "fixed" === zi(n, "pinType"),
				m = -1 !== t.indexOf("scroller"),
				f = p ? rr : n,
				g = -1 !== t.indexOf("start"),
				v = g ? r : s,
				y = "border-color:" + v + ";font-size:" + a + ";color:" + v + ";font-weight:" + l + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
			return y += "position:" + ((m || u) && p ? "fixed;" : "absolute;"), (m || u || !p) && (y += (i === qi ? ns : is) + ":" + (c + parseFloat(o)) + "px;"), h && (y += "box-sizing:border-box;text-align:left;width:" + h.offsetWidth + "px;"), d._isStart = g, d.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), d.style.cssText = y, d.innerText = e || 0 === e ? t + "-" + e : t, f.children[0] ? f.insertBefore(d, f.children[0]) : f.appendChild(d), d._offset = d["offset" + i.op.d2], Ts(d, 0, i, g), d
		},
		Ts = (t, e, n, i) => {
			let r = {
					display: "block"
				},
				s = n[i ? "os2" : "p2"],
				a = n[i ? "p2" : "os2"];
			t._isFlipped = i, r[n.a + "Percent"] = i ? -100 : 0, r[n.a] = i ? "1px" : 0, r["border" + s + ls] = 1, r["border" + a + ls] = 0, r[n.p] = e + "px", $i.set(t, r)
		},
		Es = [],
		As = {},
		Ls = () => Dr() - Or > 34 && qs(),
		Cs = () => {
			wr && wr.isPressed || (Di.cache++, Er || (Er = requestAnimationFrame(qs)), Or || zs("scrollStart"), Or = Dr())
		},
		Rs = () => {
			Di.cache++, !ur && !xr && !nr.fullscreenElement && (!br || Sr !== er.innerWidth || Math.abs(er.innerHeight - Mr) > .25 * er.innerHeight) && ar.restart(!0)
		},
		Ps = {},
		Ds = [],
		Is = [],
		Os = t => {
			let e, n = $i.ticker.frame,
				i = [],
				r = 0;
			if (Lr !== n || Pr) {
				for (ks(); r < Is.length; r += 4) e = er.matchMedia(Is[r]).matches, e !== Is[r + 3] && (Is[r + 3] = e, e ? i.push(r) : ks(1, Is[r]) || Xr(Is[r + 2]) && Is[r + 2]());
				for (Fs(), r = 0; r < i.length; r++) e = i[r], Ar = Is[e], Is[e + 2] = Is[e + 1](t);
				Ar = 0, tr && Gs(0, 1), Lr = n, zs("matchMedia")
			}
		},
		Ns = () => ys(ia, "scrollEnd", Ns) || Gs(!0),
		zs = t => Ps[t] && Ps[t].map((t => t())) || Ds,
		Bs = [],
		Fs = t => {
			for (let e = 0; e < Bs.length; e += 5) t && Bs[e + 4] !== t || (Bs[e].style.cssText = Bs[e + 1], Bs[e].getBBox && Bs[e].setAttribute("transform", Bs[e + 2] || ""), Bs[e + 3].uncache = 1)
		},
		ks = (t, e) => {
			let n;
			for (mr = 0; mr < Es.length; mr++) n = Es[mr], e && n.media !== e || (t ? n.kill(1) : n.revert());
			e && Fs(e), e || zs("revert")
		},
		Us = () => Di.cache++ && Di.forEach((t => "function" == typeof t && (t.rec = 0))),
		Hs = 0,
		Gs = (t, e) => {
			if (Or && !t) return void vs(ia, "scrollEnd", Ns);
			Cr = !0;
			let n = zs("refreshInit");
			yr && ia.sort(), e || ks(), Es.slice(0).forEach((t => t.refresh())), Es.forEach((t => "max" === t.vars.end && t.setPositions(t.start, Wr(t.scroller, t._dir)))), n.forEach((t => t && t.render && t.render(-1))), Us(), ar.pause(), Hs++, Cr = !1, zs("refresh")
		},
		Vs = 0,
		Ws = 1,
		qs = () => {
			if (!Cr) {
				Rr && Rr.update(0), ia.isUpdating = !0;
				let t = Es.length,
					e = Dr(),
					n = e - Ir >= 50,
					i = t && Es[0].scroll();
				if (Ws = Vs > i ? -1 : 1, Vs = i, n && (Or && !dr && e - Or > 200 && (Or = 0, zs("scrollEnd")), cr = Ir, Ir = e), Ws < 0) {
					for (mr = t; mr-- > 0;) Es[mr] && Es[mr].update(0, n);
					Ws = 1
				} else
					for (mr = 0; mr < t; mr++) Es[mr] && Es[mr].update(0, n);
				ia.isUpdating = !1
			}
			Er = 0
		},
		js = [es, "top", is, ns, "marginBottom", "marginRight", "marginTop", "marginLeft", "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
		Xs = js.concat([rs, ss, "boxSizing", "maxWidth", "maxHeight", "position", os, as, "paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]),
		Ys = (t, e, n, i) => {
			if (t.parentNode !== e) {
				let r, s = js.length,
					a = e.style,
					o = t.style;
				for (; s--;) r = js[s], a[r] = n[r];
				a.position = "absolute" === n.position ? "absolute" : "relative", "inline" === n.display && (a.display = "inline-block"), o.bottom = o.right = a.flexBasis = "auto", a.overflow = "visible", a.boxSizing = "border-box", a.width = ps(t, Wi) + cs, a.height = ps(t, qi) + cs, a.padding = o.margin = o.top = o.left = "0", Zs(i), o.width = o.maxWidth = n.width, o.height = o.maxHeight = n.height, o.padding = n.padding, t.parentNode.insertBefore(e, t), e.appendChild(t)
			}
		},
		Js = /([A-Z])/g,
		Zs = t => {
			if (t) {
				let e, n, i = t.t.style,
					r = t.length,
					s = 0;
				for ((t.t._gsap || $i.core.getCache(t.t)).uncache = 1; s < r; s += 2) n = t[s + 1], e = t[s], n ? i[e] = n : i[e] && i.removeProperty(e.replace(Js, "-$1").toLowerCase())
			}
		},
		Qs = t => {
			let e = Xs.length,
				n = t.style,
				i = [],
				r = 0;
			for (; r < e; r++) i.push(Xs[r], n[Xs[r]]);
			return i.t = t, i
		},
		Ks = {
			left: 0,
			top: 0
		},
		$s = (t, e, n, i, r, s, a, o, l, c, h, u, d) => {
			Xr(t) && (t = t(o)), jr(t) && "max" === t.substr(0, 3) && (t = u + ("=" === t.charAt(4) ? Ms("0" + t.substr(3), n) : 0));
			let p, m, f, g = d ? d.time() : 0;
			if (d && d.seek(0), Yr(t)) a && Ts(a, n, i, !0);
			else {
				Xr(e) && (e = e(o));
				let s, h, u, d, p = t.split(" ");
				f = ji(e) || rr, s = ds(f) || {}, s && (s.left || s.top) || "none" !== hs(f).display || (d = f.style.display, f.style.display = "block", s = ds(f), d ? f.style.display = d : f.style.removeProperty("display")), h = Ms(p[0], s[i.d]), u = Ms(p[1] || "0", n), t = s[i.p] - l[i.p] - c + h + r - u, a && Ts(a, u, i, n - u < 20 || a._isStart && u > 20), n -= n - u
			}
			if (s) {
				let e = t + n,
					r = s._isStart;
				p = "scroll" + i.d2, Ts(s, e, i, r && e > 20 || !r && (h ? Math.max(rr[p], ir[p]) : s.parentNode[p]) <= e + 1), h && (l = ds(a), h && (s.style[i.op.p] = l[i.op.p] - i.op.m - s._offset + cs))
			}
			return d && f && (p = ds(f), d.seek(u), m = ds(f), d._caScrollDist = p[i.p] - m[i.p], t = t / d._caScrollDist * u), d && d.seek(g), d ? t : Math.round(t)
		},
		ta = /(webkit|moz|length|cssText|inset)/i,
		ea = (t, e, n, i) => {
			if (t.parentNode !== e) {
				let r, s, a = t.style;
				if (e === rr) {
					for (r in t._stOrig = a.cssText, s = hs(t), s) + r || ta.test(r) || !s[r] || "string" != typeof a[r] || "0" === r || (a[r] = s[r]);
					a.top = n, a.left = i
				} else a.cssText = t._stOrig;
				$i.core.getCache(t).uncache = 1, e.appendChild(t)
			}
		},
		na = (t, e) => {
			let n, i, r = Xi(t, e),
				s = "_scroll" + e.p2,
				a = (e, o, l, c, h) => {
					let u = a.tween,
						d = o.onComplete,
						p = {};
					return l = l || r(), h = c && h || 0, c = c || e - l, u && u.kill(), n = Math.round(l), o[s] = e, o.modifiers = p, p[s] = t => ((t = kr(r())) !== n && t !== i && Math.abs(t - n) > 2 && Math.abs(t - i) > 2 ? (u.kill(), a.tween = 0) : t = l + c * u.ratio + h * u.ratio * u.ratio, i = n, n = kr(t)), o.onComplete = () => {
						a.tween = 0, d && d.call(u)
					}, u = a.tween = $i.to(t, o), u
				};
			return t[s] = r, r.wheelHandler = () => a.tween && a.tween.kill() && (a.tween = 0), vs(t, "wheel", r.wheelHandler), a
		};
	class ia {
		constructor(t, e) {
			tr || ia.register($i) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(t, e)
		}
		init(t, e) {
			if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Nr) return void(this.update = this.refresh = this.kill = Fr);
			t = us(jr(t) || Yr(t) || t.nodeType ? {
				trigger: t
			} : t, ws);
			let n, i, r, s, a, o, l, c, h, u, d, p, m, f, g, v, y, _, x, w, b, M, S, T, E, A, L, C, R, P, D, I, O, N, z, B, F, k, {
					onUpdate: U,
					toggleClass: H,
					id: G,
					onToggle: V,
					onRefresh: W,
					scrub: q,
					trigger: j,
					pin: X,
					pinSpacing: Y,
					invalidateOnRefresh: J,
					anticipatePin: Z,
					onScrubComplete: Q,
					onSnapComplete: K,
					once: tt,
					snap: et,
					pinReparent: nt,
					pinSpacer: it,
					containerAnimation: rt,
					fastScrollEnd: st,
					preventOverlaps: at
				} = t,
				ot = t.horizontal || t.containerAnimation && !1 !== t.horizontal ? Wi : qi,
				lt = !q && 0 !== q,
				ct = ji(t.scroller || er),
				ht = $i.core.getCache(ct),
				ut = Gr(ct),
				dt = "fixed" === ("pinType" in t ? t.pinType : zi(ct, "pinType") || ut && "fixed"),
				pt = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack],
				mt = lt && t.toggleActions.split(" "),
				ft = "markers" in t ? t.markers : ws.markers,
				gt = ut ? 0 : parseFloat(hs(ct)["border" + ot.p2 + ls]) || 0,
				vt = this,
				yt = t.onRefreshInit && (() => t.onRefreshInit(vt)),
				_t = ((t, e, {
					d: n,
					d2: i,
					a: r
				}) => (r = zi(t, "getBoundingClientRect")) ? () => r()[n] : () => (e ? er["inner" + i] : t["client" + i]) || 0)(ct, ut, ot),
				xt = ((t, e) => !e || ~Ii.indexOf(t) ? Vr(t) : () => Ks)(ct, ut),
				wt = 0,
				bt = Xi(ct, ot);
			var Mt;
			if (vt.media = Ar, vt._dir = ot, Z *= 45, vt.scroller = ct, vt.scroll = rt ? rt.time.bind(rt) : bt, s = bt(), vt.vars = t, e = e || t.animation, "refreshPriority" in t && (yr = 1, -9999 === t.refreshPriority && (Rr = vt)), ht.tweenScroll = ht.tweenScroll || {
					top: na(ct, qi),
					left: na(ct, Wi)
				}, vt.tweenTo = n = ht.tweenScroll[ot.p], vt.scrubDuration = t => {
					D = Yr(t) && t, D ? P ? P.duration(t) : P = $i.to(e, {
						ease: "expo",
						totalProgress: "+=0.001",
						duration: D,
						paused: !0,
						onComplete: () => Q && Q(vt)
					}) : (P && P.progress(1).kill(), P = 0)
				}, e && (e.vars.lazy = !1, e._initted || !1 !== e.vars.immediateRender && !1 !== t.immediateRender && e.render(0, !0, !0), vt.animation = e.pause(), e.scrollTrigger = vt, vt.scrubDuration(q), C = 0, G || (G = e.vars.id)), Es.push(vt), et && (Jr(et) && !et.push || (et = {
					snapTo: et
				}), "scrollBehavior" in rr.style && $i.set(ut ? [rr, ir] : ct, {
					scrollBehavior: "auto"
				}), r = Xr(et.snapTo) ? et.snapTo : "labels" === et.snapTo ? (t => e => $i.utils.snap(ms(t), e))(e) : "labelsDirectional" === et.snapTo ? (Mt = e, (t, e) => fs(ms(Mt))(t, e.direction)) : !1 !== et.directional ? (t, e) => fs(et.snapTo)(t, ur ? 0 : e.direction) : $i.utils.snap(et.snapTo), I = et.duration || {
					min: .1,
					max: 2
				}, I = Jr(I) ? lr(I.min, I.max) : lr(I, I), O = $i.delayedCall(et.delay || D / 2 || .1, (() => {
					if (Math.abs(vt.getVelocity()) < 10 && !dr && wt !== bt()) {
						let t = e && !lt ? e.totalProgress() : vt.progress,
							i = (t - R) / (Dr() - cr) * 1e3 || 0,
							s = $i.utils.clamp(-vt.progress, 1 - vt.progress, ts(i / 2) * i / .185),
							a = vt.progress + (!1 === et.inertia ? 0 : s),
							c = lr(0, 1, r(a, vt)),
							h = bt(),
							u = Math.round(o + c * m),
							{
								onStart: d,
								onInterrupt: p,
								onComplete: f
							} = et,
							g = n.tween;
						if (h <= l && h >= o && u !== h) {
							if (g && !g._initted && g.data <= ts(u - h)) return;
							!1 === et.inertia && (s = c - vt.progress), n(u, {
								duration: I(ts(.185 * Math.max(ts(a - t), ts(c - t)) / i / .05 || 0)),
								ease: et.ease || "power3",
								data: ts(u - h),
								onInterrupt: () => O.restart(!0) && p && p(vt),
								onComplete: () => {
									vt.update(), wt = bt(), C = R = e && !lt ? e.totalProgress() : vt.progress, K && K(vt), f && f(vt)
								}
							}, h, s * m, u - h - s * m), d && d(vt, n.tween)
						}
					} else vt.isActive && O.restart(!0)
				})).pause()), G && (As[G] = vt), j = vt.trigger = ji(j || X), k = j && j._gsap && j._gsap.stRevert, k && (k = k(vt)), X = !0 === X ? j : ji(X), jr(H) && (H = {
					targets: j,
					className: H
				}), X && (!1 === Y || Y === os || (Y = !(!Y && "flex" === hs(X.parentNode).display) && as), vt.pin = X, !1 !== t.force3D && $i.set(X, {
					force3D: !0
				}), i = $i.core.getCache(X), i.spacer ? f = i.pinState : (it && (it = ji(it), it && !it.nodeType && (it = it.current || it.nativeElement), i.spacerIsNative = !!it, it && (i.spacerState = Qs(it))), i.spacer = y = it || nr.createElement("div"), y.classList.add("pin-spacer"), G && y.classList.add("pin-spacer-" + G), i.pinState = f = Qs(X)), vt.spacer = y = i.spacer, L = hs(X), S = L[Y + ot.os2], x = $i.getProperty(X), w = $i.quickSetter(X, ot.a, cs), Ys(X, y, L), v = Qs(X)), ft) {
				p = Jr(ft) ? us(ft, xs) : xs, u = Ss("scroller-start", G, ct, ot, p, 0), d = Ss("scroller-end", G, ct, ot, p, 0, u), _ = u["offset" + ot.op.d2];
				let t = ji(zi(ct, "content") || ct);
				c = this.markerStart = Ss("start", G, t, ot, p, _, 0, rt), h = this.markerEnd = Ss("end", G, t, ot, p, _, 0, rt), rt && (F = $i.quickSetter([c, h], ot.a, cs)), dt || Ii.length && !0 === zi(ct, "fixedMarkers") || ((t => {
					let e = hs(t).position;
					t.style.position = "absolute" === e || "fixed" === e ? e : "relative"
				})(ut ? rr : ct), $i.set([u, d], {
					force3D: !0
				}), E = $i.quickSetter(u, ot.a, cs), A = $i.quickSetter(d, ot.a, cs))
			}
			if (rt) {
				let t = rt.vars.onUpdate,
					e = rt.vars.onUpdateParams;
				rt.eventCallback("onUpdate", (() => {
					vt.update(0, 0, 1), t && t.apply(e || [])
				}))
			}
			vt.previous = () => Es[Es.indexOf(vt) - 1], vt.next = () => Es[Es.indexOf(vt) + 1], vt.revert = t => {
				let n = !1 !== t || !vt.enabled,
					i = ur;
				n !== vt.isReverted && (n && (vt.scroll.rec || !ur || !Cr || (vt.scroll.rec = bt()), z = Math.max(bt(), vt.scroll.rec || 0), N = vt.progress, B = e && e.progress()), c && [c, h, u, d].forEach((t => t.style.display = n ? "none" : "block")), n && (ur = 1), vt.update(n), ur = i, X && (n ? ((t, e, n) => {
					Zs(n);
					let i = t._gsap;
					if (i.spacerIsNative) Zs(i.spacerState);
					else if (t.parentNode === e) {
						let n = e.parentNode;
						n && (n.insertBefore(t, e), n.removeChild(e))
					}
				})(X, y, f) : (!nt || !vt.isActive) && Ys(X, y, hs(X), T)), vt.isReverted = n)
			}, vt.refresh = (n, i) => {
				if ((ur || !vt.enabled) && !i) return;
				if (X && n && Or) return void vs(ia, "scrollEnd", Ns);
				!Cr && yt && yt(vt), ur = 1, P && P.pause(), J && e && e.time(-.01, !0).invalidate(), vt.isReverted || vt.revert();
				let r, p, _, w, S, E, A, L, C, R, D = _t(),
					I = xt(),
					F = rt ? rt.duration() : Wr(ct, ot),
					k = 0,
					U = 0,
					H = t.end,
					G = t.endTrigger || j,
					V = t.start || (0 !== t.start && j ? X ? "0 0" : "0 100%" : 0),
					q = vt.pinnedContainer = t.pinnedContainer && ji(t.pinnedContainer),
					Z = j && Math.max(0, Es.indexOf(vt)) || 0,
					Q = Z;
				for (; Q--;) E = Es[Q], E.end || E.refresh(0, 1) || (ur = 1), A = E.pin, !A || A !== j && A !== X || E.isReverted || (R || (R = []), R.unshift(E), E.revert()), E !== Es[Q] && (Z--, Q--);
				for (Xr(V) && (V = V(vt)), o = $s(V, j, D, ot, bt(), c, u, vt, I, gt, dt, F, rt) || (X ? -.001 : 0), Xr(H) && (H = H(vt)), jr(H) && !H.indexOf("+=") && (~H.indexOf(" ") ? H = (jr(V) ? V.split(" ")[0] : "") + H : (k = Ms(H.substr(2), D), H = jr(V) ? V : o + k, G = j)), l = Math.max(o, $s(H || (G ? "100% 0" : F), G, D, ot, bt() + k, h, d, vt, I, gt, dt, F, rt)) || -.001, m = l - o || (o -= .01) && .001, k = 0, Q = Z; Q--;) E = Es[Q], A = E.pin, A && E.start - E._pinPush < o && !rt && E.end > 0 && (r = E.end - E.start, A !== j && A !== q || Yr(V) || (k += r * (1 - E.progress)), A === X && (U += r));
				if (o += k, l += k, vt._pinPush = U, c && k && (r = {}, r[ot.a] = "+=" + k, q && (r[ot.p] = "-=" + bt()), $i.set([c, h], r)), X) r = hs(X), w = ot === qi, _ = bt(), b = parseFloat(x(ot.a)) + U, !F && l > 1 && ((ut ? rr : ct).style["overflow-" + ot.a] = "scroll"), Ys(X, y, r), v = Qs(X), p = ds(X, !0), L = dt && Xi(ct, w ? Wi : qi)(), Y && (T = [Y + ot.os2, m + U + cs], T.t = y, Q = Y === as ? ps(X, ot) + m + U : 0, Q && T.push(ot.d, Q + cs), Zs(T), dt && bt(z)), dt && (S = {
					top: p.top + (w ? _ - o : L) + cs,
					left: p.left + (w ? L : _ - o) + cs,
					boxSizing: "border-box",
					position: "fixed"
				}, S.width = S.maxWidth = Math.ceil(p.width) + cs, S.height = S.maxHeight = Math.ceil(p.height) + cs, S.margin = S.marginTop = S.marginRight = S.marginBottom = S.marginLeft = "0", S.padding = r.padding, S.paddingTop = r.paddingTop, S.paddingRight = r.paddingRight, S.paddingBottom = r.paddingBottom, S.paddingLeft = r.paddingLeft, g = ((t, e, n) => {
					let i, r = [],
						s = t.length,
						a = n ? 8 : 0;
					for (; a < s; a += 2) i = t[a], r.push(i, i in e ? e[i] : t[a + 1]);
					return r.t = t.t, r
				})(f, S, nt)), e ? (C = e._initted, _r(1), e.render(e.duration(), !0, !0), M = x(ot.a) - b + m + U, m !== M && g.splice(g.length - 2, 2), e.render(0, !0, !0), C || e.invalidate(), _r(0)) : M = m;
				else if (j && bt() && !rt)
					for (p = j.parentNode; p && p !== rr;) p._pinOffset && (o -= p._pinOffset, l -= p._pinOffset), p = p.parentNode;
				R && R.forEach((t => t.revert(!1))), vt.start = o, vt.end = l, s = a = bt(), rt || (s < z && bt(z), vt.scroll.rec = 0), vt.revert(!1), O && vt.isActive && bt(o + m * N), ur = 0, e && lt && (e._initted || B) && e.progress() !== B && e.progress(B, !0).render(e.time(), !0, !0), (N !== vt.progress || rt) && (e && !lt && e.totalProgress(N, !0), vt.progress = N, vt.update(0, 0, 1)), X && Y && (y._pinOffset = Math.round(vt.progress * M)), W && W(vt)
			}, vt.getVelocity = () => (bt() - a) / (Dr() - cr) * 1e3 || 0, vt.endAnimation = () => {
				Kr(vt.callbackAnimation), e && (P ? P.progress(1) : e.paused() ? lt || Kr(e, vt.direction < 0, 1) : Kr(e, e.reversed()))
			}, vt.labelToScroll = t => e && e.labels && (o || vt.refresh() || o) + e.labels[t] / e.duration() * m || 0, vt.getTrailing = t => {
				let e = Es.indexOf(vt),
					n = vt.direction > 0 ? Es.slice(0, e).reverse() : Es.slice(e + 1);
				return (jr(t) ? n.filter((e => e.vars.preventOverlaps === t)) : n).filter((t => vt.direction > 0 ? t.end <= o : t.start >= l))
			}, vt.update = (t, i, r) => {
				if (rt && !r && !t) return;
				let c, h, d, p, f, _, x, T, L = vt.scroll(),
					D = t ? 0 : (L - o) / m,
					I = D < 0 ? 0 : D > 1 ? 1 : D || 0,
					N = vt.progress;
				if (i && (a = s, s = rt ? bt() : L, et && (R = C, C = e && !lt ? e.totalProgress() : I)), Z && !I && X && !ur && !Pr && Or && o < L + (L - a) / (Dr() - cr) * Z && (I = 1e-4), I !== N && vt.enabled) {
					if (c = vt.isActive = !!I && I < 1, h = !!N && N < 1, _ = c !== h, f = _ || !!I != !!N, vt.direction = I > N ? 1 : -1, vt.progress = I, f && !ur && (d = I && !N ? 0 : 1 === I ? 1 : 1 === N ? 2 : 3, lt && (p = !_ && "none" !== mt[d + 1] && mt[d + 1] || mt[d], T = e && ("complete" === p || "reset" === p || p in e))), at && (_ || T) && (T || q || !e) && (Xr(at) ? at(vt) : vt.getTrailing(at).forEach((t => t.endAnimation()))), lt || (!P || ur || Pr ? e && e.totalProgress(I, !!ur) : ((rt || Rr && Rr !== vt) && P.render(P._dp._time - P._start), P.resetTo ? P.resetTo("totalProgress", I, e._tTime / e._tDur) : (P.vars.totalProgress = I, P.invalidate().restart()))), X)
						if (t && Y && (y.style[Y + ot.os2] = S), dt) {
							if (f) {
								if (x = !t && I > N && l + 1 > L && L + 1 >= Wr(ct, ot), nt)
									if (t || !c && !x) ea(X, y);
									else {
										let t = ds(X, !0),
											e = L - o;
										ea(X, rr, t.top + (ot === qi ? e : 0) + cs, t.left + (ot === qi ? 0 : e) + cs)
									} Zs(c || x ? g : v), M !== m && I < 1 && c || w(b + (1 !== I || x ? 0 : M))
							}
						} else w(kr(b + M * I));
					et && !n.tween && !ur && !Pr && O.restart(!0), H && (_ || tt && I && (I < 1 || !Tr)) && or(H.targets).forEach((t => t.classList[c || tt ? "add" : "remove"](H.className))), U && !lt && !t && U(vt), f && !ur ? (lt && (T && ("complete" === p ? e.pause().totalProgress(1) : "reset" === p ? e.restart(!0).pause() : "restart" === p ? e.restart(!0) : e[p]()), U && U(vt)), !_ && Tr || (V && _ && $r(vt, V), pt[d] && $r(vt, pt[d]), tt && (1 === I ? vt.kill(!1, 1) : pt[d] = 0), _ || (d = 1 === I ? 1 : 3, pt[d] && $r(vt, pt[d]))), st && !c && Math.abs(vt.getVelocity()) > (Yr(st) ? st : 2500) && (Kr(vt.callbackAnimation), P ? P.progress(1) : Kr(e, !I, 1))) : lt && U && !ur && U(vt)
				}
				if (A) {
					let t = rt ? L / rt.duration() * (rt._caScrollDist || 0) : L;
					E(t + (u._isFlipped ? 1 : 0)), A(t)
				}
				F && F(-L / rt.duration() * (rt._caScrollDist || 0))
			}, vt.enable = (t, e) => {
				vt.enabled || (vt.enabled = !0, vs(ct, "resize", Rs), vs(ut ? nr : ct, "scroll", Cs), yt && vs(ia, "refreshInit", yt), !1 !== t && (vt.progress = N = 0, s = a = wt = bt()), !1 !== e && vt.refresh())
			}, vt.getTween = t => t && n ? n.tween : P, vt.setPositions = (t, e) => {
				X && (b += t - o, M += e - t - m), vt.start = o = t, vt.end = l = e, m = e - t, vt.update()
			}, vt.disable = (t, e) => {
				if (vt.enabled && (!1 !== t && vt.revert(), vt.enabled = vt.isActive = !1, e || P && P.pause(), z = 0, i && (i.uncache = 1), yt && ys(ia, "refreshInit", yt), O && (O.pause(), n.tween && n.tween.kill() && (n.tween = 0)), !ut)) {
					let t = Es.length;
					for (; t--;)
						if (Es[t].scroller === ct && Es[t] !== vt) return;
					ys(ct, "resize", Rs), ys(ct, "scroll", Cs)
				}
			}, vt.kill = (n, r) => {
				vt.disable(n, r), P && !r && P.kill(), G && delete As[G];
				let s = Es.indexOf(vt);
				s >= 0 && Es.splice(s, 1), s === mr && Ws > 0 && mr--, s = 0, Es.forEach((t => t.scroller === vt.scroller && (s = 1))), s || (vt.scroll.rec = 0), e && (e.scrollTrigger = null, n && e.render(-1), r || e.kill()), c && [c, h, u, d].forEach((t => t.parentNode && t.parentNode.removeChild(t))), X && (i && (i.uncache = 1), s = 0, Es.forEach((t => t.pin === X && s++)), s || (i.spacer = 0)), t.onKill && t.onKill(vt)
			}, vt.enable(!1, !1), k && k(vt), e && e.add && !m ? $i.delayedCall(.01, (() => o || l || vt.refresh())) && (m = .01) && (o = l = 0) : vt.refresh()
		}
		static register(t) {
			return tr || ($i = t || Hr(), Ur() && window.document && ia.enable(), tr = Nr), tr
		}
		static defaults(t) {
			if (t)
				for (let e in t) ws[e] = t[e];
			return ws
		}
		static disable(t, e) {
			Nr = 0, Es.forEach((n => n[e ? "kill" : "disable"](t))), ys(er, "wheel", Cs), ys(nr, "scroll", Cs), clearInterval(hr), ys(nr, "touchcancel", Fr), ys(rr, "touchstart", Fr), gs(ys, nr, "pointerdown,touchstart,mousedown", zr), gs(ys, nr, "pointerup,touchend,mouseup", Br), ar.kill(), qr(ys);
			for (let t = 0; t < Di.length; t += 3) _s(ys, Di[t], Di[t + 1]), _s(ys, Di[t], Di[t + 2])
		}
		static enable() {
			if (er = window, nr = document, ir = nr.documentElement, rr = nr.body, $i && (or = $i.utils.toArray, lr = $i.utils.clamp, _r = $i.core.suppressOverwrites || Fr, $i.core.globals("ScrollTrigger", ia), rr)) {
				Nr = 1, ia.isTouch = er.matchMedia && er.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in er || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, sr = [er, nr, ir, rr], Mr = er.innerHeight, Sr = er.innerWidth, Ki.register($i), vs(nr, "scroll", Cs);
				let t, e, n = rr.style,
					i = n.borderTopStyle;
				for (n.borderTopStyle = "solid", t = ds(rr), qi.m = Math.round(t.top + qi.sc()) || 0, Wi.m = Math.round(t.left + Wi.sc()) || 0, i ? n.borderTopStyle = i : n.removeProperty("border-top-style"), hr = setInterval(Ls, 250), $i.delayedCall(.5, (() => Pr = 0)), vs(nr, "touchcancel", Fr), vs(rr, "touchstart", Fr), gs(vs, nr, "pointerdown,touchstart,mousedown", zr), gs(vs, nr, "pointerup,touchend,mouseup", Br), pr = $i.utils.checkPrefix("transform"), Xs.push(pr), tr = Dr(), ar = $i.delayedCall(.2, Gs).pause(), vr = [nr, "visibilitychange", () => {
						let t = er.innerWidth,
							e = er.innerHeight;
						nr.hidden ? (fr = t, gr = e) : fr === t && gr === e || Rs()
					}, nr, "DOMContentLoaded", Gs, er, "load", Gs, er, "resize", Rs], qr(vs), Es.forEach((t => t.enable(0, 1))), e = 0; e < Di.length; e += 3) _s(ys, Di[e], Di[e + 1]), _s(ys, Di[e], Di[e + 2])
			}
		}
		static config(t) {
			"limitCallbacks" in t && (Tr = !!t.limitCallbacks);
			let e = t.syncInterval;
			e && clearInterval(hr) || (hr = e) && setInterval(Ls, e), "ignoreMobileResize" in t && (br = 1 === ia.isTouch && t.ignoreMobileResize), "autoRefreshEvents" in t && (qr(ys) || qr(vs, t.autoRefreshEvents || "none"), xr = -1 === (t.autoRefreshEvents + "").indexOf("resize"))
		}
		static scrollerProxy(t, e) {
			let n = ji(t),
				i = Di.indexOf(n),
				r = Gr(n);
			~i && Di.splice(i, r ? 6 : 2), e && (r ? Ii.unshift(er, e, rr, e, ir, e) : Ii.unshift(n, e))
		}
		static matchMedia(t) {
			let e, n, i, r, s;
			for (n in t) i = Is.indexOf(n), r = t[n], Ar = n, "all" === n ? r() : (e = er.matchMedia(n), e && (e.matches && (s = r()), ~i ? (Is[i + 1] = Qr(Is[i + 1], r), Is[i + 2] = Qr(Is[i + 2], s)) : (i = Is.length, Is.push(n, r, s), e.addListener ? e.addListener(Os) : e.addEventListener("change", Os)), Is[i + 3] = e.matches)), Ar = 0;
			return Is
		}
		static clearMatchMedia(t) {
			t || (Is.length = 0), (t = Is.indexOf(t)) >= 0 && Is.splice(t, 4)
		}
		static isInViewport(t, e, n) {
			let i = (jr(t) ? ji(t) : t).getBoundingClientRect(),
				r = i[n ? rs : ss] * e || 0;
			return n ? i.right - r > 0 && i.left + r < er.innerWidth : i.bottom - r > 0 && i.top + r < er.innerHeight
		}
		static positionInViewport(t, e, n) {
			jr(t) && (t = ji(t));
			let i = t.getBoundingClientRect(),
				r = i[n ? rs : ss],
				s = null == e ? r / 2 : e in bs ? bs[e] * r : ~e.indexOf("%") ? parseFloat(e) * r / 100 : parseFloat(e) || 0;
			return n ? (i.left + s) / er.innerWidth : (i.top + s) / er.innerHeight
		}
	}
	ia.version = "3.10.1", ia.saveStyles = t => t ? or(t).forEach((t => {
		if (t && t.style) {
			let e = Bs.indexOf(t);
			e >= 0 && Bs.splice(e, 5), Bs.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), $i.core.getCache(t), Ar)
		}
	})) : Bs, ia.revert = (t, e) => ks(!t, e), ia.create = (t, e) => new ia(t, e), ia.refresh = t => t ? Rs() : (tr || ia.register()) && Gs(!0), ia.update = qs, ia.clearScrollMemory = Us, ia.maxScroll = (t, e) => Wr(t, e ? Wi : qi), ia.getScrollFunc = (t, e) => Xi(ji(t), e ? Wi : qi), ia.getById = t => As[t], ia.getAll = () => Es.filter((t => "ScrollSmoother" !== t.vars.id)), ia.isScrolling = () => !!Or, ia.snapDirectional = fs, ia.addEventListener = (t, e) => {
		let n = Ps[t] || (Ps[t] = []);
		~n.indexOf(e) || n.push(e)
	}, ia.removeEventListener = (t, e) => {
		let n = Ps[t],
			i = n && n.indexOf(e);
		i >= 0 && n.splice(i, 1)
	}, ia.batch = (t, e) => {
		let n, i = [],
			r = {},
			s = e.interval || .016,
			a = e.batchMax || 1e9,
			o = (t, e) => {
				let n = [],
					i = [],
					r = $i.delayedCall(s, (() => {
						e(n, i), n = [], i = []
					})).pause();
				return t => {
					n.length || r.restart(!0), n.push(t.trigger), i.push(t), a <= n.length && r.progress(1)
				}
			};
		for (n in e) r[n] = "on" === n.substr(0, 2) && Xr(e[n]) && "onRefreshInit" !== n ? o(0, e[n]) : e[n];
		return Xr(a) && (a = a(), vs(ia, "refresh", (() => a = e.batchMax()))), or(t).forEach((t => {
			let e = {};
			for (n in r) e[n] = r[n];
			e.trigger = t, i.push(ia.create(e))
		})), i
	};
	let ra = (t, e, n, i) => (e > i ? t(i) : e < 0 && t(0), n > i ? (i - e) / (n - e) : n < 0 ? e / (e - n) : 1),
		sa = t => {
			!0 === t ? (rr.style.removeProperty("touch-action"), ir.style.removeProperty("touch-action")) : rr.style.touchAction = ir.style.touchAction = t ? "pan-" + t : "none"
		},
		aa = t => {
			Jr(t) || (t = {}), t.preventDefault = t.isNormalizer = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
			let e, n, i, r, s, a, o, l, c, {
					normalizeScrollX: h,
					momentum: u
				} = t,
				d = 0,
				p = Xi(ir, qi),
				m = Xi(ir, Wi),
				f = 1,
				g = Xr(u) ? () => u(e) : () => u || 2.8,
				v = () => d = Dr(),
				y = () => i = !1,
				_ = Fr,
				x = Fr,
				w = () => {
					n = Wr(ir, qi), x = lr(0, n), h && (_ = lr(0, Wr(ir, Wi))), r = Hs
				},
				b = ia.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),
				M = () => {
					w(), s.isActive() && s.vars.scrollY > n && s.resetTo("scrollY", Wr(ir, qi))
				};
			return t.ignoreCheck = t => b && "touchmove" === t.type && (() => {
				if (i) return requestAnimationFrame(y), !0;
				i = !0
			})() || f > 1 || e.isGesturing || t.touches && t.touches.length > 1, t.onPress = () => {
				let t = f;
				f = er.visualViewport && er.visualViewport.scale || 1, s.pause(), t !== f && sa(f > 1 || !h && "x"), i = !1, a = m(), o = p(), w(), r = Hs
			}, t.onRelease = t.onGestureStart = (t, e) => {
				let n = t.event,
					i = n.changedTouches ? n.changedTouches[0] : n;
				if (!e || Math.abs(t.x - t.startX) <= 3 && Math.abs(t.y - t.startY) <= 3) $i.delayedCall(.05, (() => {
					if (Dr() - d > 300 && !n.defaultPrevented)
						if (n.target.click) n.target.click();
						else if (l.createEvent) {
						let t = l.createEvent("MouseEvents");
						t.initMouseEvent("click", !0, !0, er, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), n.target.dispatchEvent(t)
					}
				})), c.restart(!0);
				else {
					let e, n, i = g();
					h && (e = m(), n = e + .05 * i * -t.velocityX / .227 / f, i *= ra(m, e, n, Wr(ir, Wi)), s.vars.scrollX = _(n)), e = p(), n = e + .05 * i * -t.velocityY / .227 / f, i *= ra(p, e, n, Wr(ir, qi)), s.vars.scrollY = x(n), s.invalidate().duration(i).play(.01)
				}
			}, t.onWheel = () => s._ts && s.pause(), t.onChange = (t, e, n, i, s) => {
				Hs !== r && w(), e && h && m(_(i[2] === e ? a + (t.startX - t.x) / f : m() + e - i[1])), n && p(x(s[2] === n ? o + (t.startY - t.y) / f : p() + n - s[1])), qs()
			}, t.onEnable = t => {
				sa(!h && "x"), vs(er, "resize", M), t.target.addEventListener("click", v, {
					capture: !0
				})
			}, t.onDisable = t => {
				sa(!0), ys(er, "resize", M), ys(t.target, "click", v)
			}, e = new Ki(t), l = e.target.ownerDocument || nr, c = e._dc, s = $i.to(e, {
				ease: "power4",
				paused: !0,
				scrollX: h ? "+=0.1" : "+=0",
				scrollY: "+=0.1",
				onComplete: c.vars.onComplete
			}), e
		};
	ia.sort = t => Es.sort(t || ((t, e) => -1e6 * (t.vars.refreshPriority || 0) + t.start - (e.start + -1e6 * (e.vars.refreshPriority || 0)))), ia.observe = t => new Ki(t), ia.normalizeScroll = t => {
		if (void 0 === t) return wr;
		if (!0 === t && wr) return wr.enable();
		let e = t instanceof Ki;
		return wr && (!1 === t || e && t !== wr) && wr.kill(), t && !e && (t = aa(t)), wr = t && t.enable()
	}, ia.core = {
		_getVelocityProp: Yi,
		_scrollers: Di,
		_proxies: Ii,
		bridge: {
			ss: () => {
				Or || zs("scrollStart"), Or = Dr()
			},
			ref: () => ur
		}
	}, Hr() && $i.registerPlugin(ia);
	/*!
	 * paths 3.10.1
	 * https://greensock.com
	 *
	 * Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	 */
	let oa = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
		la = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
		ca = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
		ha = /(^[#\.][a-z]|[a-y][a-z])/i,
		ua = Math.PI / 180,
		da = Math.sin,
		pa = Math.cos,
		ma = Math.abs,
		fa = Math.sqrt,
		ga = t => "string" == typeof t,
		va = t => "number" == typeof t,
		ya = 1e5,
		_a = t => Math.round(t * ya) / ya || 0;

	function xa(t) {
		let e, n = 0;
		for (t.reverse(); n < t.length; n += 2) e = t[n], t[n] = t[n + 1], t[n + 1] = e;
		t.reversed = !t.reversed
	}
	let wa = {
		rect: "rx,ry,x,y,width,height",
		circle: "r,cx,cy",
		ellipse: "rx,ry,cx,cy",
		line: "x1,x2,y1,y2"
	};

	function ba(t, e) {
		let n, i, r, s, a, o, l, c, h, u, d, p, m, f, g, v, y, _, x, w, b, M, S = t.tagName.toLowerCase(),
			T = .552284749831;
		return "path" !== S && t.getBBox ? (o = ((t, e) => {
			let n, i = document.createElementNS("http://www.w3.org/2000/svg", "path"),
				r = [].slice.call(t.attributes),
				s = r.length;
			for (e = "," + e + ","; --s > -1;) n = r[s].nodeName.toLowerCase(), e.indexOf("," + n + ",") < 0 && i.setAttributeNS(null, n, r[s].nodeValue);
			return i
		})(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), M = ((t, e) => {
			let n = e ? e.split(",") : [],
				i = {},
				r = n.length;
			for (; --r > -1;) i[n[r]] = +t.getAttribute(n[r]) || 0;
			return i
		})(t, wa[S]), "rect" === S ? (s = M.rx, a = M.ry || s, i = M.x, r = M.y, u = M.width - 2 * s, d = M.height - 2 * a, s || a ? (p = i + s * (1 - T), m = i + s, f = m + u, g = f + s * T, v = f + s, y = r + a * (1 - T), _ = r + a, x = _ + d, w = x + a * T, b = x + a, n = "M" + v + "," + _ + " V" + x + " C" + [v, w, g, b, f, b, f - (f - m) / 3, b, m + (f - m) / 3, b, m, b, p, b, i, w, i, x, i, x - (x - _) / 3, i, _ + (x - _) / 3, i, _, i, y, p, r, m, r, m + (f - m) / 3, r, f - (f - m) / 3, r, f, r, g, r, v, y, v, _].join(",") + "z") : n = "M" + (i + u) + "," + r + " v" + d + " h" + -u + " v" + -d + " h" + u + "z") : "circle" === S || "ellipse" === S ? ("circle" === S ? (s = a = M.r, c = s * T) : (s = M.rx, a = M.ry, c = a * T), i = M.cx, r = M.cy, l = s * T, n = "M" + (i + s) + "," + r + " C" + [i + s, r + c, i + l, r + a, i, r + a, i - l, r + a, i - s, r + c, i - s, r, i - s, r - c, i - l, r - a, i, r - a, i + l, r - a, i + s, r - c, i + s, r].join(",") + "z") : "line" === S ? n = "M" + M.x1 + "," + M.y1 + " L" + M.x2 + "," + M.y2 : "polyline" !== S && "polygon" !== S || (h = (t.getAttribute("points") + "").match(la) || [], i = h.shift(), r = h.shift(), n = "M" + i + "," + r + " L" + h.join(","), "polygon" === S && (n += "," + i + "," + r + "z")), o.setAttribute("d", Ta(o._gsRawPath = Sa(n))), e && t.parentNode && (t.parentNode.insertBefore(o, t), t.parentNode.removeChild(t)), o) : t
	}

	function Ma(t, e, n, i, r, s, a, o, l) {
		if (t === o && e === l) return;
		n = ma(n), i = ma(i);
		let c = r % 360 * ua,
			h = pa(c),
			u = da(c),
			d = Math.PI,
			p = 2 * d,
			m = (t - o) / 2,
			f = (e - l) / 2,
			g = h * m + u * f,
			v = -u * m + h * f,
			y = g * g,
			_ = v * v,
			x = y / (n * n) + _ / (i * i);
		x > 1 && (n = fa(x) * n, i = fa(x) * i);
		let w = n * n,
			b = i * i,
			M = (w * b - w * _ - b * y) / (w * _ + b * y);
		M < 0 && (M = 0);
		let S = (s === a ? -1 : 1) * fa(M),
			T = S * (n * v / i),
			E = S * (-i * g / n),
			A = (t + o) / 2 + (h * T - u * E),
			L = (e + l) / 2 + (u * T + h * E),
			C = (g - T) / n,
			R = (v - E) / i,
			P = (-g - T) / n,
			D = (-v - E) / i,
			I = C * C + R * R,
			O = (R < 0 ? -1 : 1) * Math.acos(C / fa(I)),
			N = (C * D - R * P < 0 ? -1 : 1) * Math.acos((C * P + R * D) / fa(I * (P * P + D * D)));
		isNaN(N) && (N = d), !a && N > 0 ? N -= p : a && N < 0 && (N += p), O %= p, N %= p;
		let z, B = Math.ceil(ma(N) / (p / 4)),
			F = [],
			k = N / B,
			U = 4 / 3 * da(k / 2) / (1 + pa(k / 2)),
			H = h * n,
			G = u * n,
			V = u * -i,
			W = h * i;
		for (z = 0; z < B; z++) g = pa(r = O + z * k), v = da(r), C = pa(r += k), R = da(r), F.push(g - U * v, v + U * g, C + U * R, R - U * C, C, R);
		for (z = 0; z < F.length; z += 2) g = F[z], v = F[z + 1], F[z] = g * H + v * V + A, F[z + 1] = g * G + v * W + L;
		return F[z - 2] = o, F[z - 1] = l, F
	}

	function Sa(t) {
		let e, n, i, r, s, a, o, l, c, h, u, d, p, m, f, g = (t + "").replace(ca, (t => {
				let e = +t;
				return e < 1e-4 && e > -1e-4 ? 0 : e
			})).match(oa) || [],
			v = [],
			y = 0,
			_ = 0,
			x = 2 / 3,
			w = g.length,
			b = 0,
			M = "ERROR: malformed path: " + t,
			S = function (t, e, n, i) {
				h = (n - t) / 3, u = (i - e) / 3, o.push(t + h, e + u, n - h, i - u, n, i)
			};
		if (!t || !isNaN(g[0]) || isNaN(g[1])) return console.log(M), v;
		for (e = 0; e < w; e++)
			if (p = s, isNaN(g[e]) ? (s = g[e].toUpperCase(), a = s !== g[e]) : e--, i = +g[e + 1], r = +g[e + 2], a && (i += y, r += _), e || (l = i, c = r), "M" === s) o && (o.length < 8 ? v.length -= 1 : b += o.length), y = l = i, _ = c = r, o = [i, r], v.push(o), e += 2, s = "L";
			else if ("C" === s) o || (o = [0, 0]), a || (y = _ = 0), o.push(i, r, y + 1 * g[e + 3], _ + 1 * g[e + 4], y += 1 * g[e + 5], _ += 1 * g[e + 6]), e += 6;
		else if ("S" === s) h = y, u = _, "C" !== p && "S" !== p || (h += y - o[o.length - 4], u += _ - o[o.length - 3]), a || (y = _ = 0), o.push(h, u, i, r, y += 1 * g[e + 3], _ += 1 * g[e + 4]), e += 4;
		else if ("Q" === s) h = y + (i - y) * x, u = _ + (r - _) * x, a || (y = _ = 0), y += 1 * g[e + 3], _ += 1 * g[e + 4], o.push(h, u, y + (i - y) * x, _ + (r - _) * x, y, _), e += 4;
		else if ("T" === s) h = y - o[o.length - 4], u = _ - o[o.length - 3], o.push(y + h, _ + u, i + (y + 1.5 * h - i) * x, r + (_ + 1.5 * u - r) * x, y = i, _ = r), e += 2;
		else if ("H" === s) S(y, _, y = i, _), e += 1;
		else if ("V" === s) S(y, _, y, _ = i + (a ? _ - y : 0)), e += 1;
		else if ("L" === s || "Z" === s) "Z" === s && (i = l, r = c, o.closed = !0), ("L" === s || ma(y - i) > .5 || ma(_ - r) > .5) && (S(y, _, i, r), "L" === s && (e += 2)), y = i, _ = r;
		else if ("A" === s) {
			if (m = g[e + 4], f = g[e + 5], h = g[e + 6], u = g[e + 7], n = 7, m.length > 1 && (m.length < 3 ? (u = h, h = f, n--) : (u = f, h = m.substr(2), n -= 2), f = m.charAt(1), m = m.charAt(0)), d = Ma(y, _, +g[e + 1], +g[e + 2], +g[e + 3], +m, +f, (a ? y : 0) + 1 * h, (a ? _ : 0) + 1 * u), e += n, d)
				for (n = 0; n < d.length; n++) o.push(d[n]);
			y = o[o.length - 2], _ = o[o.length - 1]
		} else console.log(M);
		return e = o.length, e < 6 ? (v.pop(), e = 0) : o[0] === o[e - 2] && o[1] === o[e - 1] && (o.closed = !0), v.totalPoints = b + e, v
	}

	function Ta(t) {
		va(t[0]) && (t = [t]);
		let e, n, i, r, s = "",
			a = t.length;
		for (n = 0; n < a; n++) {
			for (r = t[n], s += "M" + _a(r[0]) + "," + _a(r[1]) + " C", e = r.length, i = 2; i < e; i++) s += _a(r[i++]) + "," + _a(r[i++]) + " " + _a(r[i++]) + "," + _a(r[i++]) + " " + _a(r[i++]) + "," + _a(r[i]) + " ";
			r.closed && (s += "z")
		}
		return s
	}
	/*!
	 * MorphSVGPlugin 3.10.1
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	 */
	let Ea, Aa, La, Ca, Ra, Pa = () => Ea || "undefined" != typeof window && (Ea = window.gsap) && Ea.registerPlugin && Ea,
		Da = t => "function" == typeof t,
		Ia = Math.atan2,
		Oa = Math.cos,
		Na = Math.sin,
		za = Math.sqrt,
		Ba = Math.PI,
		Fa = 2 * Ba,
		ka = .3 * Ba,
		Ua = .7 * Ba,
		Ha = 1e20,
		Ga = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
		Va = /(^[#\.][a-z]|[a-y][a-z])/i,
		Wa = /[achlmqstvz]/i,
		qa = t => console && console.warn(t),
		ja = t => {
			let e, n = t.length,
				i = 0,
				r = 0;
			for (e = 0; e < n; e++) i += t[e++], r += t[e];
			return [i / (n / 2), r / (n / 2)]
		},
		Xa = t => {
			let e, n, i, r = t.length,
				s = t[0],
				a = s,
				o = t[1],
				l = o;
			for (i = 6; i < r; i += 6) e = t[i], n = t[i + 1], e > s ? s = e : e < a && (a = e), n > o ? o = n : n < l && (l = n);
			return t.centerX = (s + a) / 2, t.centerY = (o + l) / 2, t.size = (s - a) * (o - l)
		},
		Ya = (t, e = 3) => {
			let n, i, r, s, a, o, l, c, h, u, d, p, m, f, g, v, y = t.length,
				_ = t[0][0],
				x = _,
				w = t[0][1],
				b = w,
				M = 1 / e;
			for (; --y > -1;)
				for (a = t[y], n = a.length, s = 6; s < n; s += 6)
					for (h = a[s], u = a[s + 1], d = a[s + 2] - h, f = a[s + 3] - u, p = a[s + 4] - h, g = a[s + 5] - u, m = a[s + 6] - h, v = a[s + 7] - u, o = e; --o > -1;) l = M * o, c = 1 - l, i = (l * l * m + 3 * c * (l * p + c * d)) * l + h, r = (l * l * v + 3 * c * (l * g + c * f)) * l + u, i > _ ? _ = i : i < x && (x = i), r > w ? w = r : r < b && (b = r);
			return t.centerX = (_ + x) / 2, t.centerY = (w + b) / 2, t.left = x, t.width = _ - x, t.top = b, t.height = w - b, t.size = (_ - x) * (w - b)
		},
		Ja = (t, e) => e.length - t.length,
		Za = (t, e) => {
			let n = t.size || Xa(t),
				i = e.size || Xa(e);
			return Math.abs(i - n) < (n + i) / 20 ? e.centerX - t.centerX || e.centerY - t.centerY : i - n
		},
		Qa = (t, e) => {
			let n, i, r = t.slice(0),
				s = t.length,
				a = s - 2;
			for (e |= 0, n = 0; n < s; n++) i = (n + e) % a, t[n++] = r[i], t[n] = r[i + 1]
		},
		Ka = (t, e, n, i, r) => {
			let s, a, o, l, c = t.length,
				h = 0,
				u = c - 2;
			for (n *= 6, a = 0; a < c; a += 6) s = (a + n) % u, l = t[s] - (e[a] - i), o = t[s + 1] - (e[a + 1] - r), h += za(o * o + l * l);
			return h
		},
		$a = (t, e, n) => {
			let i, r, s, a = t.length,
				o = ja(t),
				l = ja(e),
				c = l[0] - o[0],
				h = l[1] - o[1],
				u = Ka(t, e, 0, c, h),
				d = 0;
			for (s = 6; s < a; s += 6) r = Ka(t, e, s / 6, c, h), r < u && (u = r, d = s);
			if (n)
				for (i = t.slice(0), xa(i), s = 6; s < a; s += 6) r = Ka(i, e, s / 6, c, h), r < u && (u = r, d = -s);
			return d / 6
		},
		to = (t, e, n) => {
			let i, r, s, a, o, l, c = t.length,
				h = Ha,
				u = 0,
				d = 0;
			for (; --c > -1;)
				for (i = t[c], l = i.length, o = 0; o < l; o += 6) r = i[o] - e, s = i[o + 1] - n, a = za(r * r + s * s), a < h && (h = a, u = i[o], d = i[o + 1]);
			return [u, d]
		},
		eo = (t, e, n, i, r, s) => {
			let a, o, l, c, h, u = e.length,
				d = 0,
				p = Math.min(t.size || Xa(t), e[n].size || Xa(e[n])) * i,
				m = Ha,
				f = t.centerX + r,
				g = t.centerY + s;
			for (o = n; o < u && (a = e[o].size || Xa(e[o]), !(a < p)); o++) l = e[o].centerX - f, c = e[o].centerY - g, h = za(l * l + c * c), h < m && (d = o, m = h);
			return h = e[d], e.splice(d, 1), h
		},
		no = (t, e) => {
			let n, i, r, s, a, o, l, c, h, u, d, p, m, f, g = 0,
				v = t.length,
				y = e / ((v - 2) / 6);
			for (m = 2; m < v; m += 6)
				for (g += y; g > .999999;) n = t[m - 2], i = t[m - 1], r = t[m], s = t[m + 1], a = t[m + 2], o = t[m + 3], l = t[m + 4], c = t[m + 5], f = 1 / ((Math.floor(g) || 1) + 1), h = n + (r - n) * f, d = r + (a - r) * f, h += (d - h) * f, d += (a + (l - a) * f - d) * f, u = i + (s - i) * f, p = s + (o - s) * f, u += (p - u) * f, p += (o + (c - o) * f - p) * f, t.splice(m, 4, n + (r - n) * f, i + (s - i) * f, h, u, h + (d - h) * f, u + (p - u) * f, d, p, a + (l - a) * f, o + (c - o) * f), m += 6, v += 6, g--;
			return t
		},
		io = (t, e, n, i, r) => {
			let s, a, o, l, c, h, u, d = e.length - t.length,
				p = d > 0 ? e : t,
				m = d > 0 ? t : e,
				f = 0,
				g = "complexity" === i ? Ja : Za,
				v = "position" === i ? 0 : "number" == typeof i ? i : .8,
				y = m.length,
				_ = "object" == typeof n && n.push ? n.slice(0) : [n],
				x = "reverse" === _[0] || _[0] < 0,
				w = "log" === n;
			if (m[0]) {
				if (p.length > 1 && (t.sort(g), e.sort(g), h = p.size || Ya(p), h = m.size || Ya(m), h = p.centerX - m.centerX, u = p.centerY - m.centerY, g === Za))
					for (y = 0; y < m.length; y++) p.splice(y, 0, eo(m[y], p, y, v, h, u));
				if (d)
					for (d < 0 && (d = -d), p[0].length > m[0].length && no(m[0], (p[0].length - m[0].length) / 6 | 0), y = m.length; f < d;) l = p[y].size || Xa(p[y]), o = to(m, p[y].centerX, p[y].centerY), l = o[0], c = o[1], m[y++] = [l, c, l, c, l, c, l, c], m.totalPoints += 8, f++;
				for (y = 0; y < t.length; y++) s = e[y], a = t[y], d = s.length - a.length, d < 0 ? no(s, -d / 6 | 0) : d > 0 && no(a, d / 6 | 0), x && !1 !== r && !a.reversed && xa(a), (n = _[y] || 0 === _[y] ? _[y] : "auto") && (a.closed || Math.abs(a[0] - a[a.length - 2]) < .5 && Math.abs(a[1] - a[a.length - 1]) < .5 ? "auto" === n || "log" === n ? (_[y] = n = $a(a, s, !y || !1 === r), n < 0 && (x = !0, xa(a), n = -n), Qa(a, 6 * n)) : "reverse" !== n && (y && n < 0 && xa(a), Qa(a, 6 * (n < 0 ? -n : n))) : !x && ("auto" === n && Math.abs(s[0] - a[0]) + Math.abs(s[1] - a[1]) + Math.abs(s[s.length - 2] - a[a.length - 2]) + Math.abs(s[s.length - 1] - a[a.length - 1]) > Math.abs(s[0] - a[a.length - 2]) + Math.abs(s[1] - a[a.length - 1]) + Math.abs(s[s.length - 2] - a[0]) + Math.abs(s[s.length - 1] - a[1]) || n % 2) ? (xa(a), _[y] = -1, x = !0) : "auto" === n ? _[y] = 0 : "reverse" === n && (_[y] = -1), a.closed !== s.closed && (a.closed = s.closed = !1));
				return w && qa("shapeIndex:[" + _.join(",") + "]"), t.shapeIndex = _, _
			}
		},
		ro = (t, e, n, i, r) => {
			let s = Sa(t[0]),
				a = Sa(t[1]);
			io(s, a, e || 0 === e ? e : "auto", n, r) && (t[0] = Ta(s), t[1] = Ta(a), "log" !== i && !0 !== i || qa('precompile:["' + t[0] + '","' + t[1] + '"]'))
		},
		so = (t, e) => {
			let n, i, r, s, a, o, l, c = 0,
				h = parseFloat(t[0]),
				u = parseFloat(t[1]),
				d = h + "," + u + " ",
				p = .999999;
			for (r = t.length, n = .5 * e / (.5 * r - 1), i = 0; i < r - 2; i += 2) {
				if (c += n, o = parseFloat(t[i + 2]), l = parseFloat(t[i + 3]), c > p)
					for (a = 1 / (Math.floor(c) + 1), s = 1; c > p;) d += (h + (o - h) * a * s).toFixed(2) + "," + (u + (l - u) * a * s).toFixed(2) + " ", c--, s++;
				d += o + "," + l + " ", h = o, u = l
			}
			return d
		},
		ao = t => {
			let e = t[0].match(Ga) || [],
				n = t[1].match(Ga) || [],
				i = n.length - e.length;
			i > 0 ? t[0] = so(e, i) : t[1] = so(n, -i)
		},
		oo = t => isNaN(t) ? ao : e => {
			ao(e), e[1] = ((t, e) => {
				if (!e) return t;
				let n, i, r, s = t.match(Ga) || [],
					a = s.length,
					o = "";
				for ("reverse" === e ? (i = a - 1, n = -2) : (i = (2 * (parseInt(e, 10) || 0) + 1 + 100 * a) % a, n = 2), r = 0; r < a; r += 2) o += s[i - 1] + "," + s[i] + " ", i = (i + n) % a;
				return o
			})(e[1], parseInt(t, 10))
		},
		lo = (t, e) => {
			let n, i, r, s, a, o, l, c, h, u, d, p, m = t.length,
				f = .2 * (e || 1);
			for (; --m > -1;) {
				for (i = t[m], d = i.isSmooth = i.isSmooth || [0, 0, 0, 0], p = i.smoothData = i.smoothData || [0, 0, 0, 0], d.length = 4, c = i.length - 2, l = 6; l < c; l += 6) r = i[l] - i[l - 2], s = i[l + 1] - i[l - 1], a = i[l + 2] - i[l], o = i[l + 3] - i[l + 1], h = Ia(s, r), u = Ia(o, a), n = Math.abs(h - u) < f, n && (p[l - 2] = h, p[l + 2] = u, p[l - 1] = za(r * r + s * s), p[l + 3] = za(a * a + o * o)), d.push(n, n, 0, 0, n, n);
				i[c] === i[0] && i[c + 1] === i[1] && (r = i[0] - i[c - 2], s = i[1] - i[c - 1], a = i[2] - i[0], o = i[3] - i[1], h = Ia(s, r), u = Ia(o, a), Math.abs(h - u) < f && (p[c - 2] = h, p[2] = u, p[c - 1] = za(r * r + s * s), p[3] = za(a * a + o * o), d[c - 2] = d[c - 1] = !0))
			}
			return t
		},
		co = t => {
			let e = t.trim().split(" ");
			return {
				x: (~t.indexOf("left") ? 0 : ~t.indexOf("right") ? 100 : isNaN(parseFloat(e[0])) ? 50 : parseFloat(e[0])) / 100,
				y: (~t.indexOf("top") ? 0 : ~t.indexOf("bottom") ? 100 : isNaN(parseFloat(e[1])) ? 50 : parseFloat(e[1])) / 100
			}
		},
		ho = "Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",
		uo = function (t, e, n, i) {
			let r, s, a = this._origin,
				o = this._eOrigin,
				l = t[n] - a.x,
				c = t[n + 1] - a.y,
				h = za(l * l + c * c),
				u = Ia(c, l);
			var d;
			return l = e[n] - o.x, c = e[n + 1] - o.y, r = Ia(c, l) - u, s = (d = r) !== d % Ba ? d + (d < 0 ? Fa : -Fa) : d, !i && La && Math.abs(s + La.ca) < ka && (i = La), this._anchorPT = La = {
				_next: this._anchorPT,
				t: t,
				sa: u,
				ca: i && s * i.ca < 0 && Math.abs(s) > Ua ? r : s,
				sl: h,
				cl: za(l * l + c * c) - h,
				i: n
			}
		},
		po = t => {
			Ea = Pa(), Ra = Ra || Ea && Ea.plugins.morphSVG, Ea && Ra ? (Aa = Ea.utils.toArray, Ra.prototype._tweenRotation = uo, Ca = 1) : t && qa("Please gsap.registerPlugin(MorphSVGPlugin)")
		};
	const mo = {
		version: "3.10.1",
		name: "morphSVG",
		rawVars: 1,
		register(t, e) {
			Ea = t, Ra = e, po()
		},
		init(t, e, n, i, r) {
			if (Ca || po(1), !e) return qa("invalid shape"), !1;
			let s, a, o, l, c, h, u, d, p, m, f, g, v, y, _, x, w, b, M, S, T, E;
			if (Da(e) && (e = e.call(n, i, t, r)), "string" == typeof e || e.getBBox || e[0]) e = {
				shape: e
			};
			else if ("object" == typeof e) {
				for (a in s = {}, e) s[a] = Da(e[a]) && "render" !== a ? e[a].call(n, i, t, r) : e[a];
				e = s
			}
			let A = t.nodeType ? window.getComputedStyle(t) : {},
				L = A.fill + "",
				C = !("none" === L || "0" === (L.match(Ga) || [])[3] || "evenodd" === A.fillRule),
				R = (e.origin || "50 50").split(",");
			if (s = (t.nodeName + "").toUpperCase(), c = "POLYLINE" === s || "POLYGON" === s, "PATH" !== s && !c && !e.prop) return qa("Cannot morph a <" + s + "> element. " + ho), !1;
			if (a = "PATH" === s ? "d" : "points", !e.prop && !Da(t.setAttribute)) return !1;
			if (l = ((t, e, n) => {
					let i, r;
					return (!("string" == typeof t) || Va.test(t) || (t.match(Ga) || []).length < 3) && (i = Aa(t)[0], i ? (r = (i.nodeName + "").toUpperCase(), e && "PATH" !== r && (i = ba(i, !1), r = "PATH"), t = i.getAttribute("PATH" === r ? "d" : "points") || "", i === n && (t = i.getAttributeNS(null, "data-original") || t)) : (qa("WARNING: invalid morph to: " + t), t = !1)), t
				})(e.shape || e.d || e.points || "", "d" === a, t), c && Wa.test(l)) return qa("A <" + s + "> cannot accept path data. " + ho), !1;
			if (h = e.shapeIndex || 0 === e.shapeIndex ? e.shapeIndex : "auto", u = e.map || mo.defaultMap, this._prop = e.prop, this._render = e.render || mo.defaultRender, this._apply = "updateTarget" in e ? e.updateTarget : mo.defaultUpdateTarget, this._rnd = Math.pow(10, isNaN(e.precision) ? 2 : +e.precision), this._tween = n, l) {
				if (this._target = t, w = "object" == typeof e.precompile, m = this._prop ? t[this._prop] : t.getAttribute(a), this._prop || t.getAttributeNS(null, "data-original") || t.setAttributeNS(null, "data-original", m), "d" === a || this._prop) {
					if (m = Sa(w ? e.precompile[0] : m), f = Sa(w ? e.precompile[1] : l), !w && !io(m, f, h, u, C)) return !1;
					for ("log" !== e.precompile && !0 !== e.precompile || qa('precompile:["' + Ta(m) + '","' + Ta(f) + '"]'), T = "linear" !== (e.type || mo.defaultType), T && (m = lo(m, e.smoothTolerance), f = lo(f, e.smoothTolerance), m.size || Ya(m), f.size || Ya(f), S = co(R[0]), this._origin = m.origin = {
							x: m.left + S.x * m.width,
							y: m.top + S.y * m.height
						}, R[1] && (S = co(R[1])), this._eOrigin = {
							x: f.left + S.x * f.width,
							y: f.top + S.y * f.height
						}), this._rawPath = t._gsRawPath = m, v = m.length; --v > -1;)
						for (_ = m[v], x = f[v], d = _.isSmooth || [], p = x.isSmooth || [], y = _.length, La = 0, g = 0; g < y; g += 2) x[g] === _[g] && x[g + 1] === _[g + 1] || (T ? d[g] && p[g] ? (b = _.smoothData, M = x.smoothData, E = g + (g === y - 4 ? 7 - y : 5), this._controlPT = {
							_next: this._controlPT,
							i: g,
							j: v,
							l1s: b[g + 1],
							l1c: M[g + 1] - b[g + 1],
							l2s: b[E],
							l2c: M[E] - b[E]
						}, o = this._tweenRotation(_, x, g + 2), this._tweenRotation(_, x, g, o), this._tweenRotation(_, x, E - 1, o), g += 4) : this._tweenRotation(_, x, g) : (o = this.add(_, g, _[g], x[g]), o = this.add(_, g + 1, _[g + 1], x[g + 1]) || o))
				} else o = this.add(t, "setAttribute", t.getAttribute(a) + "", l + "", i, r, 0, oo(h), a);
				T && (this.add(this._origin, "x", this._origin.x, this._eOrigin.x), o = this.add(this._origin, "y", this._origin.y, this._eOrigin.y)), o && (this._props.push("morphSVG"), o.end = l, o.endProp = a)
			}
			return 1
		},
		render(t, e) {
			let n, i, r, s, a, o, l, c, h, u, d, p, m, f = e._rawPath,
				g = e._controlPT,
				v = e._anchorPT,
				y = e._rnd,
				_ = e._target,
				x = e._pt;
			for (; x;) x.r(t, x.d), x = x._next;
			if (1 === t && e._apply)
				for (x = e._pt; x;) x.end && (e._prop ? _[e._prop] = x.end : _.setAttribute(x.endProp, x.end)), x = x._next;
			else if (f) {
				for (; v;) o = v.sa + t * v.ca, a = v.sl + t * v.cl, v.t[v.i] = e._origin.x + Oa(o) * a, v.t[v.i + 1] = e._origin.y + Na(o) * a, v = v._next;
				for (r = t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1; g;) l = g.i, s = f[g.j], m = l + (l === s.length - 4 ? 7 - s.length : 5), o = Ia(s[m] - s[l + 1], s[m - 1] - s[l]), d = Na(o), p = Oa(o), h = s[l + 2], u = s[l + 3], a = g.l1s + r * g.l1c, s[l] = h - p * a, s[l + 1] = u - d * a, a = g.l2s + r * g.l2c, s[m - 1] = h + p * a, s[m] = u + d * a, g = g._next;
				if (_._gsRawPath = f, e._apply) {
					for (n = "", i = " ", c = 0; c < f.length; c++)
						for (s = f[c], a = s.length, n += "M" + (s[0] * y | 0) / y + " " + (s[1] * y | 0) / y + " C", l = 2; l < a; l++) n += (s[l] * y | 0) / y + " ";
					e._prop ? _[e._prop] = n : _.setAttribute("d", n)
				}
			}
			e._render && f && e._render.call(e._tween, f, _)
		},
		kill(t) {
			this._pt = this._rawPath = 0
		},
		getRawPath: function (t) {
			let e, n = (t = ga(t) && ha.test(t) && document.querySelector(t) || t).getAttribute ? t : 0;
			return n && (t = t.getAttribute("d")) ? (n._gsPath || (n._gsPath = {}), e = n._gsPath[t], e && !e._dirty ? e : n._gsPath[t] = Sa(t)) : t ? ga(t) ? Sa(t) : va(t[0]) ? [t] : t : console.warn("Expecting a <path> element or an SVG path data string")
		},
		stringToRawPath: Sa,
		rawPathToString: Ta,
		normalizeStrings(t, e, {
			shapeIndex: n,
			map: i
		}) {
			let r = [t, e];
			return ro(r, n, i), r
		},
		pathFilter: ro,
		pointsFilter: ao,
		getTotalSize: Ya,
		equalizeSegmentQuantity: io,
		convertToPath: (t, e) => Aa(t).map((t => ba(t, !1 !== e))),
		defaultType: "linear",
		defaultUpdateTarget: !0,
		defaultMap: "size"
	};

	function fo(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}

	function go(t, e) {
		for (var n = 0; n < e.length; n++) {
			var i = e[n];
			i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
		}
	}

	function vo(t, e, n) {
		return e && go(t.prototype, e), n && go(t, n), Object.defineProperty(t, "prototype", {
			writable: !1
		}), t
	}

	function yo(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
		return i
	}

	function _o(t, e) {
		var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
		if (!n) {
			if (Array.isArray(t) || (n = function (t, e) {
					if (t) {
						if ("string" == typeof t) return yo(t, e);
						var n = Object.prototype.toString.call(t).slice(8, -1);
						return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? yo(t, e) : void 0
					}
				}(t)) || e && t && "number" == typeof t.length) {
				n && (t = n);
				var i = 0,
					r = function () {};
				return {
					s: r,
					n: function () {
						return i >= t.length ? {
							done: !0
						} : {
							done: !1,
							value: t[i++]
						}
					},
					e: function (t) {
						throw t
					},
					f: r
				}
			}
			throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
		}
		var s, a = !0,
			o = !1;
		return {
			s: function () {
				n = n.call(t)
			},
			n: function () {
				var t = n.next();
				return a = t.done, t
			},
			e: function (t) {
				o = !0, s = t
			},
			f: function () {
				try {
					a || null == n.return || n.return()
				} finally {
					if (o) throw s
				}
			}
		}
	}

	function xo(t) {
		for (var e = t.length - 1; e > 0; e--) {
			var n = Math.floor(Math.random() * (e + 1)),
				i = [t[n], t[e]];
			t[e] = i[0], t[n] = i[1]
		}
		return t
	}

	function wo(t) {
		var e = t.getBoundingClientRect();
		return e.top < window.innerHeight && e.bottom > 0
	}

	function bo(t) {
		for (var e = t.parentNode.childNodes, n = 0, i = 0; i < e.length; i++) {
			if (e[i] == t) return n;
			1 == e[i].nodeType && n++
		}
		return -1
	}

	function Mo() {
		return !(!("ontouchstart" in window) && !navigator.msMaxTouchPoints)
	}
	Pa() && Ea.registerPlugin(mo);
	var So = function () {
			function t() {
				var e = this;
				if (fo(this, t), document.querySelector(".animSplit")) {
					var n = [];
					document.querySelectorAll(".animSplit span").forEach((function (t) {
						n.push(t)
					}));
					var i = xo(n);
					vi.to(i, {
						opacity: 1,
						y: "0px",
						stagger: .1,
						duration: .3,
						delay: .1,
						ease: "power4.out"
					})
				}
				document.body.classList.contains("home") || "hidden" != document.querySelector(".toK2").style.visibility || vi.to(".toK2", {
					autoAlpha: 1,
					duration: .2
				});
				var r = [1, 2, 3, 4, 5, 6, 7];
				r = xo(r);
				var s = 0;
				document.querySelectorAll(".innerM").forEach((function (t) {
					t.querySelector(".innerMask").classList.add("innerMask" + r[s]), t.querySelector(".devant").setAttribute("src", t.querySelector(".devant").getAttribute("data-url") + "/img/formes/" + r[s] + "b.svg"), s++
				})), this.textSelectionne = !1, vi.delayedCall(.2, (function () {
					document.querySelectorAll(".ast1").forEach((function (t) {
						vi.to(t, {
							rotate: -760,
							ease: "none",
							scrollTrigger: {
								trigger: t.closest(".h-module"),
								start: "top bottom",
								end: "bottom top",
								scrub: .5
							}
						})
					})), document.querySelectorAll(".bar").forEach((function (t) {
						vi.to([t, t.querySelector(".mask")], {
							x: "0px",
							ease: "power4.inOut",
							duration: 2,
							scrollTrigger: {
								trigger: t,
								start: "top 90%"
							}
						}), vi.to(t.querySelector("span"), {
							opacity: 1,
							ease: "none",
							duration: 1,
							delay: 1,
							scrollTrigger: {
								trigger: t,
								start: "top 90%"
							}
						})
					}))
				})), document.querySelector(".lettres2") && (document.querySelectorAll(".lettres2").forEach((function (t) {
					t.querySelectorAll("span:not(.tab)") && t.querySelectorAll("span:not(.tab)").forEach((function (t) {
						t.parentNode.querySelector(".tab") && (t.addEventListener("mouseenter", (function (e) {
							t.parentNode.querySelector(".tab").innerHTML = t.parentNode.getAttribute("data-mot-" + bo(t)), t.parentNode.querySelector(".tab").classList.add("actif"), t.classList.add("hovered"), vi.set(document.querySelector(".hovered").parentNode.querySelector(".tab"), {
								x: e.clientX - document.querySelector(".hovered").parentNode.getBoundingClientRect().left,
								y: e.clientY - document.querySelector(".hovered").getBoundingClientRect().top - 40
							})
						})), t.addEventListener("mouseleave", (function () {
							t.parentNode.querySelector(".tab").classList.remove("actif"), t.classList.remove("hovered")
						})))
					}))
				})), this.mouseE = this.mouseMove.bind(this), window.addEventListener("mousemove", this.mouseE)), document.addEventListener("selectionchange", (function () {
					"" == window.getSelection().toString() || e.textSelectionne ? "" == window.getSelection().toString() && e.textSelectionne && (e.textSelectionne = !1, clearInterval(e.setInter), document.body.classList.remove("c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"), document.body.classList.remove("c10", "c11", "c12", "c13", "c14", "c15", "c16", "c17", "c18", "c19"), document.body.classList.remove("c20", "c21", "c22", "c23", "c24", "c25", "c26", "c27", "c28", "c29"), document.body.classList.remove("c30", "c31", "c32", "c33", "c34", "c35", "c36", "c37", "c38", "c39"), document.body.classList.remove("c40", "c41", "c42", "c43", "c44", "c45", "c46", "c47", "c48", "c49"), document.body.classList.remove("c50", "c51", "c52", "c53", "c54", "c55", "c56", "c57", "c58", "c59"), document.body.classList.remove("c60", "c61", "c62", "c63", "c64")) : (e.textSelectionne = !0, e.animationSelection())
				})), vi.delayedCall(1, (function () {
					document.querySelectorAll(".parallaxMedia").forEach((function (t) {
						var e = t.querySelector(".media");
						vi.to(e, {
							y: "0%",
							ease: "none",
							scrollTrigger: {
								trigger: t,
								start: "top bottom",
								end: "bottom top",
								scrub: !0
							}
						})
					}))
				}))
			}
			return vo(t, [{
				key: "mouseMove",
				value: function (t) {
					document.querySelector(".hovered") && vi.set(document.querySelector(".hovered").parentNode.querySelector(".tab"), {
						x: t.clientX - document.querySelector(".hovered").parentNode.getBoundingClientRect().left,
						y: t.clientY - document.querySelector(".hovered").getBoundingClientRect().top - 40
					})
				}
			}, {
				key: "animationSelection",
				value: function () {
					var t = 0;
					this.setInter = setInterval((function () {
						document.body.classList.remove("c" + t), t = (t + 1) % 65, document.body.classList.add("c" + t)
					}), 50)
				}
			}, {
				key: "killGlobal",
				value: function () {
					clearInterval(this.setInter), window.removeEventListener("mousemove", this.mouseE)
				}
			}]), t
		}(),
		To = vo((function t() {
			fo(this, t), vi.to(".toK2", {
				autoAlpha: 0,
				duration: .2
			}), document.querySelector("html").classList.contains("toActivePro") ? (document.querySelector("html").classList.remove("toActivePro"), window.scrollTo(0, document.querySelector(".h-module").getBoundingClientRect().top - 5), vi.set(".bloc1, .pastPro, .pastPro .bloc", {
				y: "0px"
			}), vi.set(".textsIntro .col2", {
				opacity: 1
			}), vi.to(".premiersBlocs", {
				y: 0,
				ease: "power4.out",
				duration: 1
			}), vi.to(".premiersBlocs .bloc", {
				y: "0px",
				ease: "power4.out",
				duration: 1,
				stagger: .4
			})) : document.querySelector("html").classList.contains("toPastPro") ? (document.querySelector("html").classList.remove("toPastPro"), window.scrollTo(0, document.querySelector(".pastPro").getBoundingClientRect().top - 5 - window.innerHeight), vi.set(".bloc1, .premiersBlocs, .premiersBlocs .bloc", {
				y: "0px"
			}), vi.set(".textsIntro .col2", {
				opacity: 1
			}), vi.to(".pastPro", {
				y: 0,
				ease: "power4.out",
				duration: 1
			}), vi.to(".pastPro .bloc", {
				y: "0px",
				ease: "power4.out",
				duration: 1,
				stagger: .4
			})) : (vi.set(".premiersBlocs, .pastPro, .pastPro .bloc", {
				y: 0
			}), vi.to(".bloc1", {
				y: "0px",
				ease: "power4.out",
				duration: 2
			}), window.innerWidth > 767 ? vi.to(".premiersBlocs .bloc", {
				y: "0px",
				ease: "power4.out",
				duration: 1,
				stagger: .2,
				delay: 1
			}) : vi.fromTo(".premiersBlocs .bloc", {
				y: "300px"
			}, {
				y: "0px",
				ease: "power4.out",
				duration: 1,
				stagger: .2,
				delay: 1
			}), vi.to(".textsIntro .col2", {
				opacity: 1,
				stagger: .2,
				delay: 1
			}))
		})),
		Eo = function () {
			function t() {
				var e = this;
				fo(this, t), vi.to(".toK2", {
					autoAlpha: 0,
					duration: .2
				}), this.oldPosX = 0, this.xTo = vi.quickTo(".bloc", "x", {
					duration: 1,
					ease: "power4"
				}), this.yTo = vi.quickTo(".bloc", "y", {
					duration: 1,
					ease: "power4"
				}), this.rotTo = vi.quickTo(".bloc", "rotation", {
					duration: 1,
					ease: "power4"
				}), vi.to(".bloc", {
					y: "0px",
					ease: "power4.out",
					duration: 2,
					onComplete: function () {
						e.mouseE = e.mouseMove.bind(e), window.addEventListener("mousemove", e.mouseE)
					}
				}), this.hoverE = this.hoverEnter.bind(this), document.querySelector(".inner-nav").addEventListener("mouseenter", this.hoverE), this.hoverL = this.hoverLeave.bind(this), document.querySelector(".inner-nav").addEventListener("mouseleave", this.hoverL), vi.to(".bloc span", {
					y: "0px",
					ease: "power4.out",
					duration: 2,
					onComplete: function () {}
				})
			}
			return vo(t, [{
				key: "hoverEnter",
				value: function (t) {
					vi.to(".bloc", {
						opacity: 0,
						duration: .2
					})
				}
			}, {
				key: "hoverLeave",
				value: function (t) {
					vi.to(".bloc", {
						opacity: 1,
						duration: .2
					})
				}
			}, {
				key: "mouseMove",
				value: function (t) {
					var e = this;
					this.xTo(t.clientX - window.innerWidth / 2), this.yTo(t.clientY - window.innerHeight / 2), this.rotTo((t.clientX - this.oldPosX) / 2), this.oldPosX = t.clientX, window.clearTimeout(this.isMoving), this.isMoving = setTimeout((function () {
						e.rotTo(0)
					}), 66)
				}
			}, {
				key: "kill",
				value: function () {
					window.removeEventListener("mousemove", this.mouseE), document.querySelector(".inner-nav").removeEventListener("mouseenter", this.hoverE), document.querySelector(".inner-nav").removeEventListener("mouseleave", this.hoverL), vi.to(".bloc", {
						opacity: 0,
						duration: .2
					})
				}
			}]), t
		}(),
		Ao = vo((function t() {
			var e = this;
			fo(this, t), this.animEnCours = !1, document.querySelectorAll(".carouImg").forEach((function (t) {
				var n = 0,
					i = t.getAttribute("data-index"),
					r = t.querySelectorAll(".lesImgs image").length - 1,
					s = t.querySelectorAll(".lesImgs image").length;
				t.querySelector(".prev").addEventListener("click", (function () {
					if (!e.animEnCours) {
						e.animEnCours = !0, --r < 0 && (r = s - 1);
						var a = t.querySelectorAll(".lesImgs image")[r].cloneNode(!0);
						t.querySelector(".lesImgs").append(a), vi.fromTo(a, {
							opacity: 0
						}, {
							opacity: 1,
							duration: .6,
							ease: "power4.inOut"
						}), n = (n + 1) % 7, vi.to(t.querySelector("#forme-" + i + "-1"), {
							morphSVG: "#forme-" + i + "-" + (n + 1),
							duration: .6,
							ease: "power4.inOut",
							onComplete: function () {
								e.animEnCours = !1, vi.set(t.querySelector(".lesImgs image"), {
									opacity: 0
								}), vi.set(a, {
									opacity: 1
								})
							}
						})
					}
				})), t.querySelector(".next").addEventListener("click", (function () {
					if (!e.animEnCours) {
						e.animEnCours = !0, r = (r + 1) % s;
						var a = t.querySelectorAll(".lesImgs image")[r].cloneNode(!0);
						t.querySelector(".lesImgs").append(a), vi.fromTo(a, {
							opacity: 0
						}, {
							opacity: 1,
							duration: .6,
							ease: "power4.inOut"
						}), n = (n + 1) % 7, vi.to(t.querySelector("#forme-" + i + "-1"), {
							morphSVG: "#forme-" + i + "-" + (n + 1),
							duration: .6,
							ease: "power4.inOut",
							onComplete: function () {
								e.animEnCours = !1, vi.set(t.querySelector(".lesImgs image"), {
									opacity: 0
								}), vi.set(a, {
									opacity: 1
								})
							}
						})
					}
				}))
			})), document.querySelectorAll(".lesQuotes").forEach((function (t) {
				var n = 0,
					i = t.querySelectorAll(".uneQuote").length;
				t.parentNode.querySelector(".prev").addEventListener("click", (function () {
					if (!e.animEnCours) {
						e.animEnCours = !0, vi.to(t.querySelectorAll(".uneQuote")[n], {
							opacity: 0,
							duration: .6,
							ease: "power4.inOut"
						}), --n < 0 && (n = i - 1);
						var r = t.querySelectorAll(".uneQuote")[n];
						vi.to(r, {
							opacity: 1,
							duration: .6,
							delay: .6,
							ease: "power4.inOut",
							onComplete: function () {
								e.animEnCours = !1
							}
						})
					}
				})), t.parentNode.querySelector(".next").addEventListener("click", (function () {
					if (!e.animEnCours) {
						e.animEnCours = !0, vi.to(t.querySelectorAll(".uneQuote")[n], {
							opacity: 0,
							duration: .6,
							ease: "power4.inOut"
						}), n = (n + 1) % i;
						var r = t.querySelectorAll(".uneQuote")[n];
						vi.to(r, {
							opacity: 1,
							duration: .6,
							delay: .6,
							ease: "power4.inOut",
							onComplete: function () {
								e.animEnCours = !1
							}
						})
					}
				}))
			}));
			var n = 320;
			if (window.innerWidth < 768 && (n = 245), document.querySelector(".tempToSingle.actif")) {
				document.querySelector(".s-boutons").classList.add("on"), document.querySelector(".h-module-first").classList.add("on");
				var i = document.querySelector(".tempToSingle > img").getAttribute("src");
				document.querySelector(".fondSingle img").setAttribute("src", i), vi.delayedCall(.1, (function () {
					document.querySelector(".tempToSingle").classList.remove("actif")
				})), vi.to(".s-boutons", {
					delay: .1,
					height: window.innerHeight - n + "px",
					duration: 1,
					ease: "power4.inOut"
				}), vi.to(".s-boutons .btn", {
					delay: .3,
					y: "0%",
					duration: 1,
					stagger: .15,
					ease: "power4.out"
				})
			} else {
				var r = 0;
				document.querySelector(".tempToSingle.actif2") && (vi.delayedCall(.1, (function () {
					document.querySelector(".tempToSingle").classList.remove("actif2")
				})), r = .1), vi.set(".s-boutons", {
					height: window.innerHeight - n + "px"
				}), vi.to(".h-module-first", {
					y: "0px",
					duration: 1,
					delay: r,
					ease: "power4.out"
				}), vi.to(".s-boutons .btn", {
					delay: .8 + r,
					y: "0%",
					duration: 1,
					stagger: .15,
					ease: "power4.out",
					onStart: function () {
						document.querySelector(".s-boutons").classList.add("on")
					}
				})
			}
			vi.delayedCall(1, (function () {
				vi.to(".blurNoise", {
					opacity: 1,
					ease: "none",
					scrollTrigger: {
						trigger: ".fondSingle",
						start: "top top",
						end: "+=500px",
						scrub: !0
					}
				})
			}))
		}));
	/**
	 * @license
	 * Copyright 2010-2021 Three.js Authors
	 * SPDX-License-Identifier: MIT
	 */
	const Lo = "135",
		Co = 100,
		Ro = 301,
		Po = 302,
		Do = 306,
		Io = 1e3,
		Oo = 1001,
		No = 1002,
		zo = 1003,
		Bo = 1006,
		Fo = 1008,
		ko = 1009,
		Uo = 1012,
		Ho = 1014,
		Go = 1015,
		Vo = 1016,
		Wo = 1020,
		qo = 1022,
		jo = 1023,
		Xo = 1026,
		Yo = 1027,
		Jo = 2300,
		Zo = 2301,
		Qo = 2302,
		Ko = 2400,
		$o = 2401,
		tl = 2402,
		el = 2500,
		nl = 3e3,
		il = 3001,
		rl = 3007,
		sl = 3002,
		al = 7680,
		ol = 35044,
		ll = 35048,
		cl = "300 es";
	class hl {
		addEventListener(t, e) {
			void 0 === this._listeners && (this._listeners = {});
			const n = this._listeners;
			void 0 === n[t] && (n[t] = []), -1 === n[t].indexOf(e) && n[t].push(e)
		}
		hasEventListener(t, e) {
			if (void 0 === this._listeners) return !1;
			const n = this._listeners;
			return void 0 !== n[t] && -1 !== n[t].indexOf(e)
		}
		removeEventListener(t, e) {
			if (void 0 === this._listeners) return;
			const n = this._listeners[t];
			if (void 0 !== n) {
				const t = n.indexOf(e); - 1 !== t && n.splice(t, 1)
			}
		}
		dispatchEvent(t) {
			if (void 0 === this._listeners) return;
			const e = this._listeners[t.type];
			if (void 0 !== e) {
				t.target = this;
				const n = e.slice(0);
				for (let e = 0, i = n.length; e < i; e++) n[e].call(this, t);
				t.target = null
			}
		}
	}
	const ul = [];
	for (let t = 0; t < 256; t++) ul[t] = (t < 16 ? "0" : "") + t.toString(16);
	const dl = Math.PI / 180,
		pl = 180 / Math.PI;

	function ml() {
		const t = 4294967295 * Math.random() | 0,
			e = 4294967295 * Math.random() | 0,
			n = 4294967295 * Math.random() | 0,
			i = 4294967295 * Math.random() | 0;
		return (ul[255 & t] + ul[t >> 8 & 255] + ul[t >> 16 & 255] + ul[t >> 24 & 255] + "-" + ul[255 & e] + ul[e >> 8 & 255] + "-" + ul[e >> 16 & 15 | 64] + ul[e >> 24 & 255] + "-" + ul[63 & n | 128] + ul[n >> 8 & 255] + "-" + ul[n >> 16 & 255] + ul[n >> 24 & 255] + ul[255 & i] + ul[i >> 8 & 255] + ul[i >> 16 & 255] + ul[i >> 24 & 255]).toUpperCase()
	}

	function fl(t, e, n) {
		return Math.max(e, Math.min(n, t))
	}

	function gl(t, e, n) {
		return (1 - n) * t + n * e
	}

	function vl(t) {
		return 0 == (t & t - 1) && 0 !== t
	}

	function yl(t) {
		return Math.pow(2, Math.floor(Math.log(t) / Math.LN2))
	}
	class _l {
		constructor(t = 0, e = 0) {
			this.x = t, this.y = e
		}
		get width() {
			return this.x
		}
		set width(t) {
			this.x = t
		}
		get height() {
			return this.y
		}
		set height(t) {
			this.y = t
		}
		set(t, e) {
			return this.x = t, this.y = e, this
		}
		setScalar(t) {
			return this.x = t, this.y = t, this
		}
		setX(t) {
			return this.x = t, this
		}
		setY(t) {
			return this.y = t, this
		}
		setComponent(t, e) {
			switch (t) {
				case 0:
					this.x = e;
					break;
				case 1:
					this.y = e;
					break;
				default:
					throw new Error("index is out of range: " + t)
			}
			return this
		}
		getComponent(t) {
			switch (t) {
				case 0:
					return this.x;
				case 1:
					return this.y;
				default:
					throw new Error("index is out of range: " + t)
			}
		}
		clone() {
			return new this.constructor(this.x, this.y)
		}
		copy(t) {
			return this.x = t.x, this.y = t.y, this
		}
		add(t, e) {
			return void 0 !== e ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this)
		}
		addScalar(t) {
			return this.x += t, this.y += t, this
		}
		addVectors(t, e) {
			return this.x = t.x + e.x, this.y = t.y + e.y, this
		}
		addScaledVector(t, e) {
			return this.x += t.x * e, this.y += t.y * e, this
		}
		sub(t, e) {
			return void 0 !== e ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this)
		}
		subScalar(t) {
			return this.x -= t, this.y -= t, this
		}
		subVectors(t, e) {
			return this.x = t.x - e.x, this.y = t.y - e.y, this
		}
		multiply(t) {
			return this.x *= t.x, this.y *= t.y, this
		}
		multiplyScalar(t) {
			return this.x *= t, this.y *= t, this
		}
		divide(t) {
			return this.x /= t.x, this.y /= t.y, this
		}
		divideScalar(t) {
			return this.multiplyScalar(1 / t)
		}
		applyMatrix3(t) {
			const e = this.x,
				n = this.y,
				i = t.elements;
			return this.x = i[0] * e + i[3] * n + i[6], this.y = i[1] * e + i[4] * n + i[7], this
		}
		min(t) {
			return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this
		}
		max(t) {
			return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this
		}
		clamp(t, e) {
			return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this
		}
		clampScalar(t, e) {
			return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this
		}
		clampLength(t, e) {
			const n = this.length();
			return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)))
		}
		floor() {
			return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
		}
		ceil() {
			return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
		}
		round() {
			return this.x = Math.round(this.x), this.y = Math.round(this.y), this
		}
		roundToZero() {
			return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this
		}
		negate() {
			return this.x = -this.x, this.y = -this.y, this
		}
		dot(t) {
			return this.x * t.x + this.y * t.y
		}
		cross(t) {
			return this.x * t.y - this.y * t.x
		}
		lengthSq() {
			return this.x * this.x + this.y * this.y
		}
		length() {
			return Math.sqrt(this.x * this.x + this.y * this.y)
		}
		manhattanLength() {
			return Math.abs(this.x) + Math.abs(this.y)
		}
		normalize() {
			return this.divideScalar(this.length() || 1)
		}
		angle() {
			return Math.atan2(-this.y, -this.x) + Math.PI
		}
		distanceTo(t) {
			return Math.sqrt(this.distanceToSquared(t))
		}
		distanceToSquared(t) {
			const e = this.x - t.x,
				n = this.y - t.y;
			return e * e + n * n
		}
		manhattanDistanceTo(t) {
			return Math.abs(this.x - t.x) + Math.abs(this.y - t.y)
		}
		setLength(t) {
			return this.normalize().multiplyScalar(t)
		}
		lerp(t, e) {
			return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this
		}
		lerpVectors(t, e, n) {
			return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this
		}
		equals(t) {
			return t.x === this.x && t.y === this.y
		}
		fromArray(t, e = 0) {
			return this.x = t[e], this.y = t[e + 1], this
		}
		toArray(t = [], e = 0) {
			return t[e] = this.x, t[e + 1] = this.y, t
		}
		fromBufferAttribute(t, e, n) {
			return void 0 !== n && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this
		}
		rotateAround(t, e) {
			const n = Math.cos(e),
				i = Math.sin(e),
				r = this.x - t.x,
				s = this.y - t.y;
			return this.x = r * n - s * i + t.x, this.y = r * i + s * n + t.y, this
		}
		random() {
			return this.x = Math.random(), this.y = Math.random(), this
		}*[Symbol.iterator]() {
			yield this.x, yield this.y
		}
	}
	_l.prototype.isVector2 = !0;
	class xl {
		constructor() {
			this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
		}
		set(t, e, n, i, r, s, a, o, l) {
			const c = this.elements;
			return c[0] = t, c[1] = i, c[2] = a, c[3] = e, c[4] = r, c[5] = o, c[6] = n, c[7] = s, c[8] = l, this
		}
		identity() {
			return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
		}
		copy(t) {
			const e = this.elements,
				n = t.elements;
			return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this
		}
		extractBasis(t, e, n) {
			return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this
		}
		setFromMatrix4(t) {
			const e = t.elements;
			return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this
		}
		multiply(t) {
			return this.multiplyMatrices(this, t)
		}
		premultiply(t) {
			return this.multiplyMatrices(t, this)
		}
		multiplyMatrices(t, e) {
			const n = t.elements,
				i = e.elements,
				r = this.elements,
				s = n[0],
				a = n[3],
				o = n[6],
				l = n[1],
				c = n[4],
				h = n[7],
				u = n[2],
				d = n[5],
				p = n[8],
				m = i[0],
				f = i[3],
				g = i[6],
				v = i[1],
				y = i[4],
				_ = i[7],
				x = i[2],
				w = i[5],
				b = i[8];
			return r[0] = s * m + a * v + o * x, r[3] = s * f + a * y + o * w, r[6] = s * g + a * _ + o * b, r[1] = l * m + c * v + h * x, r[4] = l * f + c * y + h * w, r[7] = l * g + c * _ + h * b, r[2] = u * m + d * v + p * x, r[5] = u * f + d * y + p * w, r[8] = u * g + d * _ + p * b, this
		}
		multiplyScalar(t) {
			const e = this.elements;
			return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this
		}
		determinant() {
			const t = this.elements,
				e = t[0],
				n = t[1],
				i = t[2],
				r = t[3],
				s = t[4],
				a = t[5],
				o = t[6],
				l = t[7],
				c = t[8];
			return e * s * c - e * a * l - n * r * c + n * a * o + i * r * l - i * s * o
		}
		invert() {
			const t = this.elements,
				e = t[0],
				n = t[1],
				i = t[2],
				r = t[3],
				s = t[4],
				a = t[5],
				o = t[6],
				l = t[7],
				c = t[8],
				h = c * s - a * l,
				u = a * o - c * r,
				d = l * r - s * o,
				p = e * h + n * u + i * d;
			if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
			const m = 1 / p;
			return t[0] = h * m, t[1] = (i * l - c * n) * m, t[2] = (a * n - i * s) * m, t[3] = u * m, t[4] = (c * e - i * o) * m, t[5] = (i * r - a * e) * m, t[6] = d * m, t[7] = (n * o - l * e) * m, t[8] = (s * e - n * r) * m, this
		}
		transpose() {
			let t;
			const e = this.elements;
			return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this
		}
		getNormalMatrix(t) {
			return this.setFromMatrix4(t).invert().transpose()
		}
		transposeIntoArray(t) {
			const e = this.elements;
			return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this
		}
		setUvTransform(t, e, n, i, r, s, a) {
			const o = Math.cos(r),
				l = Math.sin(r);
			return this.set(n * o, n * l, -n * (o * s + l * a) + s + t, -i * l, i * o, -i * (-l * s + o * a) + a + e, 0, 0, 1), this
		}
		scale(t, e) {
			const n = this.elements;
			return n[0] *= t, n[3] *= t, n[6] *= t, n[1] *= e, n[4] *= e, n[7] *= e, this
		}
		rotate(t) {
			const e = Math.cos(t),
				n = Math.sin(t),
				i = this.elements,
				r = i[0],
				s = i[3],
				a = i[6],
				o = i[1],
				l = i[4],
				c = i[7];
			return i[0] = e * r + n * o, i[3] = e * s + n * l, i[6] = e * a + n * c, i[1] = -n * r + e * o, i[4] = -n * s + e * l, i[7] = -n * a + e * c, this
		}
		translate(t, e) {
			const n = this.elements;
			return n[0] += t * n[2], n[3] += t * n[5], n[6] += t * n[8], n[1] += e * n[2], n[4] += e * n[5], n[7] += e * n[8], this
		}
		equals(t) {
			const e = this.elements,
				n = t.elements;
			for (let t = 0; t < 9; t++)
				if (e[t] !== n[t]) return !1;
			return !0
		}
		fromArray(t, e = 0) {
			for (let n = 0; n < 9; n++) this.elements[n] = t[n + e];
			return this
		}
		toArray(t = [], e = 0) {
			const n = this.elements;
			return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t
		}
		clone() {
			return (new this.constructor).fromArray(this.elements)
		}
	}

	function wl(t) {
		if (0 === t.length) return -1 / 0;
		let e = t[0];
		for (let n = 1, i = t.length; n < i; ++n) t[n] > e && (e = t[n]);
		return e
	}

	function bl(t) {
		return document.createElementNS("http://www.w3.org/1999/xhtml", t)
	}

	function Ml(t, e = 0) {
		let n = 3735928559 ^ e,
			i = 1103547991 ^ e;
		for (let e, r = 0; r < t.length; r++) e = t.charCodeAt(r), n = Math.imul(n ^ e, 2654435761), i = Math.imul(i ^ e, 1597334677);
		return n = Math.imul(n ^ n >>> 16, 2246822507) ^ Math.imul(i ^ i >>> 13, 3266489909), i = Math.imul(i ^ i >>> 16, 2246822507) ^ Math.imul(n ^ n >>> 13, 3266489909), 4294967296 * (2097151 & i) + (n >>> 0)
	}
	let Sl;
	xl.prototype.isMatrix3 = !0;
	class Tl {
		static getDataURL(t) {
			if (/^data:/i.test(t.src)) return t.src;
			if ("undefined" == typeof HTMLCanvasElement) return t.src;
			let e;
			if (t instanceof HTMLCanvasElement) e = t;
			else {
				void 0 === Sl && (Sl = bl("canvas")), Sl.width = t.width, Sl.height = t.height;
				const n = Sl.getContext("2d");
				t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = Sl
			}
			return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", .6)) : e.toDataURL("image/png")
		}
	}
	let El = 0;
	class Al extends hl {
		constructor(t = Al.DEFAULT_IMAGE, e = Al.DEFAULT_MAPPING, n = 1001, i = 1001, r = 1006, s = 1008, a = 1023, o = 1009, l = 1, c = 3e3) {
			super(), Object.defineProperty(this, "id", {
				value: El++
			}), this.uuid = ml(), this.name = "", this.image = t, this.mipmaps = [], this.mapping = e, this.wrapS = n, this.wrapT = i, this.magFilter = r, this.minFilter = s, this.anisotropy = l, this.format = a, this.internalFormat = null, this.type = o, this.offset = new _l(0, 0), this.repeat = new _l(1, 1), this.center = new _l(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new xl, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = c, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1
		}
		updateMatrix() {
			this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
		}
		clone() {
			return (new this.constructor).copy(this)
		}
		copy(t) {
			return this.name = t.name, this.image = t.image, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.encoding = t.encoding, this.userData = JSON.parse(JSON.stringify(t.userData)), this
		}
		toJSON(t) {
			const e = void 0 === t || "string" == typeof t;
			if (!e && void 0 !== t.textures[this.uuid]) return t.textures[this.uuid];
			const n = {
				metadata: {
					version: 4.5,
					type: "Texture",
					generator: "Texture.toJSON"
				},
				uuid: this.uuid,
				name: this.name,
				mapping: this.mapping,
				repeat: [this.repeat.x, this.repeat.y],
				offset: [this.offset.x, this.offset.y],
				center: [this.center.x, this.center.y],
				rotation: this.rotation,
				wrap: [this.wrapS, this.wrapT],
				format: this.format,
				type: this.type,
				encoding: this.encoding,
				minFilter: this.minFilter,
				magFilter: this.magFilter,
				anisotropy: this.anisotropy,
				flipY: this.flipY,
				premultiplyAlpha: this.premultiplyAlpha,
				unpackAlignment: this.unpackAlignment
			};
			if (void 0 !== this.image) {
				const i = this.image;
				if (void 0 === i.uuid && (i.uuid = ml()), !e && void 0 === t.images[i.uuid]) {
					let e;
					if (Array.isArray(i)) {
						e = [];
						for (let t = 0, n = i.length; t < n; t++) i[t].isDataTexture ? e.push(Ll(i[t].image)) : e.push(Ll(i[t]))
					} else e = Ll(i);
					t.images[i.uuid] = {
						uuid: i.uuid,
						url: e
					}
				}
				n.image = i.uuid
			}
			return "{}" !== JSON.stringify(this.userData) && (n.userData = this.userData), e || (t.textures[this.uuid] = n), n
		}
		dispose() {
			this.dispatchEvent({
				type: "dispose"
			})
		}
		transformUv(t) {
			if (300 !== this.mapping) return t;
			if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
				case Io:
					t.x = t.x - Math.floor(t.x);
					break;
				case Oo:
					t.x = t.x < 0 ? 0 : 1;
					break;
				case No:
					1 === Math.abs(Math.floor(t.x) % 2) ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x)
			}
			if (t.y < 0 || t.y > 1) switch (this.wrapT) {
				case Io:
					t.y = t.y - Math.floor(t.y);
					break;
				case Oo:
					t.y = t.y < 0 ? 0 : 1;
					break;
				case No:
					1 === Math.abs(Math.floor(t.y) % 2) ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y)
			}
			return this.flipY && (t.y = 1 - t.y), t
		}
		set needsUpdate(t) {
			!0 === t && this.version++
		}
	}

	function Ll(t) {
		return "undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && t instanceof ImageBitmap ? Tl.getDataURL(t) : t.data ? {
			data: Array.prototype.slice.call(t.data),
			width: t.width,
			height: t.height,
			type: t.data.constructor.name
		} : (console.warn("THREE.Texture: Unable to serialize Texture."), {})
	}
	Al.DEFAULT_IMAGE = void 0, Al.DEFAULT_MAPPING = 300, Al.prototype.isTexture = !0;
	class Cl {
		constructor(t = 0, e = 0, n = 0, i = 1) {
			this.x = t, this.y = e, this.z = n, this.w = i
		}
		get width() {
			return this.z
		}
		set width(t) {
			this.z = t
		}
		get height() {
			return this.w
		}
		set height(t) {
			this.w = t
		}
		set(t, e, n, i) {
			return this.x = t, this.y = e, this.z = n, this.w = i, this
		}
		setScalar(t) {
			return this.x = t, this.y = t, this.z = t, this.w = t, this
		}
		setX(t) {
			return this.x = t, this
		}
		setY(t) {
			return this.y = t, this
		}
		setZ(t) {
			return this.z = t, this
		}
		setW(t) {
			return this.w = t, this
		}
		setComponent(t, e) {
			switch (t) {
				case 0:
					this.x = e;
					break;
				case 1:
					this.y = e;
					break;
				case 2:
					this.z = e;
					break;
				case 3:
					this.w = e;
					break;
				default:
					throw new Error("index is out of range: " + t)
			}
			return this
		}
		getComponent(t) {
			switch (t) {
				case 0:
					return this.x;
				case 1:
					return this.y;
				case 2:
					return this.z;
				case 3:
					return this.w;
				default:
					throw new Error("index is out of range: " + t)
			}
		}
		clone() {
			return new this.constructor(this.x, this.y, this.z, this.w)
		}
		copy(t) {
			return this.x = t.x, this.y = t.y, this.z = t.z, this.w = void 0 !== t.w ? t.w : 1, this
		}
		add(t, e) {
			return void 0 !== e ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this)
		}
		addScalar(t) {
			return this.x += t, this.y += t, this.z += t, this.w += t, this
		}
		addVectors(t, e) {
			return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this
		}
		addScaledVector(t, e) {
			return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this
		}
		sub(t, e) {
			return void 0 !== e ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this)
		}
		subScalar(t) {
			return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this
		}
		subVectors(t, e) {
			return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this
		}
		multiply(t) {
			return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this
		}
		multiplyScalar(t) {
			return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this
		}
		applyMatrix4(t) {
			const e = this.x,
				n = this.y,
				i = this.z,
				r = this.w,
				s = t.elements;
			return this.x = s[0] * e + s[4] * n + s[8] * i + s[12] * r, this.y = s[1] * e + s[5] * n + s[9] * i + s[13] * r, this.z = s[2] * e + s[6] * n + s[10] * i + s[14] * r, this.w = s[3] * e + s[7] * n + s[11] * i + s[15] * r, this
		}
		divideScalar(t) {
			return this.multiplyScalar(1 / t)
		}
		setAxisAngleFromQuaternion(t) {
			this.w = 2 * Math.acos(t.w);
			const e = Math.sqrt(1 - t.w * t.w);
			return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this
		}
		setAxisAngleFromRotationMatrix(t) {
			let e, n, i, r;
			const s = .01,
				a = .1,
				o = t.elements,
				l = o[0],
				c = o[4],
				h = o[8],
				u = o[1],
				d = o[5],
				p = o[9],
				m = o[2],
				f = o[6],
				g = o[10];
			if (Math.abs(c - u) < s && Math.abs(h - m) < s && Math.abs(p - f) < s) {
				if (Math.abs(c + u) < a && Math.abs(h + m) < a && Math.abs(p + f) < a && Math.abs(l + d + g - 3) < a) return this.set(1, 0, 0, 0), this;
				e = Math.PI;
				const t = (l + 1) / 2,
					o = (d + 1) / 2,
					v = (g + 1) / 2,
					y = (c + u) / 4,
					_ = (h + m) / 4,
					x = (p + f) / 4;
				return t > o && t > v ? t < s ? (n = 0, i = .707106781, r = .707106781) : (n = Math.sqrt(t), i = y / n, r = _ / n) : o > v ? o < s ? (n = .707106781, i = 0, r = .707106781) : (i = Math.sqrt(o), n = y / i, r = x / i) : v < s ? (n = .707106781, i = .707106781, r = 0) : (r = Math.sqrt(v), n = _ / r, i = x / r), this.set(n, i, r, e), this
			}
			let v = Math.sqrt((f - p) * (f - p) + (h - m) * (h - m) + (u - c) * (u - c));
			return Math.abs(v) < .001 && (v = 1), this.x = (f - p) / v, this.y = (h - m) / v, this.z = (u - c) / v, this.w = Math.acos((l + d + g - 1) / 2), this
		}
		min(t) {
			return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this
		}
		max(t) {
			return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this
		}
		clamp(t, e) {
			return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this
		}
		clampScalar(t, e) {
			return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this.w = Math.max(t, Math.min(e, this.w)), this
		}
		clampLength(t, e) {
			const n = this.length();
			return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)))
		}
		floor() {
			return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
		}
		ceil() {
			return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
		}
		round() {
			return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
		}
		roundToZero() {
			return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w), this
		}
		negate() {
			return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
		}
		dot(t) {
			return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
		}
		lengthSq() {
			return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
		}
		length() {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
		}
		manhattanLength() {
			return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
		}
		normalize() {
			return this.divideScalar(this.length() || 1)
		}
		setLength(t) {
			return this.normalize().multiplyScalar(t)
		}
		lerp(t, e) {
			return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this
		}
		lerpVectors(t, e, n) {
			return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this.w = t.w + (e.w - t.w) * n, this
		}
		equals(t) {
			return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
		}
		fromArray(t, e = 0) {
			return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this
		}
		toArray(t = [], e = 0) {
			return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t
		}
		fromBufferAttribute(t, e, n) {
			return void 0 !== n && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this
		}
		random() {
			return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this
		}*[Symbol.iterator]() {
			yield this.x, yield this.y, yield this.z, yield this.w
		}
	}
	Cl.prototype.isVector4 = !0;
	class Rl extends hl {
		constructor(t, e, n = {}) {
			super(), this.width = t, this.height = e, this.depth = 1, this.scissor = new Cl(0, 0, t, e), this.scissorTest = !1, this.viewport = new Cl(0, 0, t, e), this.texture = new Al(void 0, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.encoding), this.texture.isRenderTargetTexture = !0, this.texture.image = {
				width: t,
				height: e,
				depth: 1
			}, this.texture.generateMipmaps = void 0 !== n.generateMipmaps && n.generateMipmaps, this.texture.internalFormat = void 0 !== n.internalFormat ? n.internalFormat : null, this.texture.minFilter = void 0 !== n.minFilter ? n.minFilter : Bo, this.depthBuffer = void 0 === n.depthBuffer || n.depthBuffer, this.stencilBuffer = void 0 !== n.stencilBuffer && n.stencilBuffer, this.depthTexture = void 0 !== n.depthTexture ? n.depthTexture : null
		}
		setTexture(t) {
			t.image = {
				width: this.width,
				height: this.height,
				depth: this.depth
			}, this.texture = t
		}
		setSize(t, e, n = 1) {
			this.width === t && this.height === e && this.depth === n || (this.width = t, this.height = e, this.depth = n, this.texture.image.width = t, this.texture.image.height = e, this.texture.image.depth = n, this.dispose()), this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e)
		}
		clone() {
			return (new this.constructor).copy(this)
		}
		copy(t) {
			return this.width = t.width, this.height = t.height, this.depth = t.depth, this.viewport.copy(t.viewport), this.texture = t.texture.clone(), this.texture.image = {
				...this.texture.image
			}, this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.depthTexture = t.depthTexture, this
		}
		dispose() {
			this.dispatchEvent({
				type: "dispose"
			})
		}
	}
	Rl.prototype.isWebGLRenderTarget = !0;
	(class extends Rl {
		constructor(t, e, n) {
			super(t, e);
			const i = this.texture;
			this.texture = [];
			for (let t = 0; t < n; t++) this.texture[t] = i.clone()
		}
		setSize(t, e, n = 1) {
			if (this.width !== t || this.height !== e || this.depth !== n) {
				this.width = t, this.height = e, this.depth = n;
				for (let i = 0, r = this.texture.length; i < r; i++) this.texture[i].image.width = t, this.texture[i].image.height = e, this.texture[i].image.depth = n;
				this.dispose()
			}
			return this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e), this
		}
		copy(t) {
			this.dispose(), this.width = t.width, this.height = t.height, this.depth = t.depth, this.viewport.set(0, 0, this.width, this.height), this.scissor.set(0, 0, this.width, this.height), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.depthTexture = t.depthTexture, this.texture.length = 0;
			for (let e = 0, n = t.texture.length; e < n; e++) this.texture[e] = t.texture[e].clone();
			return this
		}
	}).prototype.isWebGLMultipleRenderTargets = !0;
	class Pl extends Rl {
		constructor(t, e, n = {}) {
			super(t, e, n), this.samples = 4, this.ignoreDepthForMultisampleCopy = void 0 === n.ignoreDepth || n.ignoreDepth, this.useRenderToTexture = void 0 !== n.useRenderToTexture && n.useRenderToTexture, this.useRenderbuffer = !1 === this.useRenderToTexture
		}
		copy(t) {
			return super.copy.call(this, t), this.samples = t.samples, this.useRenderToTexture = t.useRenderToTexture, this.useRenderbuffer = t.useRenderbuffer, this
		}
	}
	Pl.prototype.isWebGLMultisampleRenderTarget = !0;
	class Dl {
		constructor(t = 0, e = 0, n = 0, i = 1) {
			this._x = t, this._y = e, this._z = n, this._w = i
		}
		static slerp(t, e, n, i) {
			return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."), n.slerpQuaternions(t, e, i)
		}
		static slerpFlat(t, e, n, i, r, s, a) {
			let o = n[i + 0],
				l = n[i + 1],
				c = n[i + 2],
				h = n[i + 3];
			const u = r[s + 0],
				d = r[s + 1],
				p = r[s + 2],
				m = r[s + 3];
			if (0 === a) return t[e + 0] = o, t[e + 1] = l, t[e + 2] = c, void(t[e + 3] = h);
			if (1 === a) return t[e + 0] = u, t[e + 1] = d, t[e + 2] = p, void(t[e + 3] = m);
			if (h !== m || o !== u || l !== d || c !== p) {
				let t = 1 - a;
				const e = o * u + l * d + c * p + h * m,
					n = e >= 0 ? 1 : -1,
					i = 1 - e * e;
				if (i > Number.EPSILON) {
					const r = Math.sqrt(i),
						s = Math.atan2(r, e * n);
					t = Math.sin(t * s) / r, a = Math.sin(a * s) / r
				}
				const r = a * n;
				if (o = o * t + u * r, l = l * t + d * r, c = c * t + p * r, h = h * t + m * r, t === 1 - a) {
					const t = 1 / Math.sqrt(o * o + l * l + c * c + h * h);
					o *= t, l *= t, c *= t, h *= t
				}
			}
			t[e] = o, t[e + 1] = l, t[e + 2] = c, t[e + 3] = h
		}
		static multiplyQuaternionsFlat(t, e, n, i, r, s) {
			const a = n[i],
				o = n[i + 1],
				l = n[i + 2],
				c = n[i + 3],
				h = r[s],
				u = r[s + 1],
				d = r[s + 2],
				p = r[s + 3];
			return t[e] = a * p + c * h + o * d - l * u, t[e + 1] = o * p + c * u + l * h - a * d, t[e + 2] = l * p + c * d + a * u - o * h, t[e + 3] = c * p - a * h - o * u - l * d, t
		}
		get x() {
			return this._x
		}
		set x(t) {
			this._x = t, this._onChangeCallback()
		}
		get y() {
			return this._y
		}
		set y(t) {
			this._y = t, this._onChangeCallback()
		}
		get z() {
			return this._z
		}
		set z(t) {
			this._z = t, this._onChangeCallback()
		}
		get w() {
			return this._w
		}
		set w(t) {
			this._w = t, this._onChangeCallback()
		}
		set(t, e, n, i) {
			return this._x = t, this._y = e, this._z = n, this._w = i, this._onChangeCallback(), this
		}
		clone() {
			return new this.constructor(this._x, this._y, this._z, this._w)
		}
		copy(t) {
			return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this
		}
		setFromEuler(t, e) {
			if (!t || !t.isEuler) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
			const n = t._x,
				i = t._y,
				r = t._z,
				s = t._order,
				a = Math.cos,
				o = Math.sin,
				l = a(n / 2),
				c = a(i / 2),
				h = a(r / 2),
				u = o(n / 2),
				d = o(i / 2),
				p = o(r / 2);
			switch (s) {
				case "XYZ":
					this._x = u * c * h + l * d * p, this._y = l * d * h - u * c * p, this._z = l * c * p + u * d * h, this._w = l * c * h - u * d * p;
					break;
				case "YXZ":
					this._x = u * c * h + l * d * p, this._y = l * d * h - u * c * p, this._z = l * c * p - u * d * h, this._w = l * c * h + u * d * p;
					break;
				case "ZXY":
					this._x = u * c * h - l * d * p, this._y = l * d * h + u * c * p, this._z = l * c * p + u * d * h, this._w = l * c * h - u * d * p;
					break;
				case "ZYX":
					this._x = u * c * h - l * d * p, this._y = l * d * h + u * c * p, this._z = l * c * p - u * d * h, this._w = l * c * h + u * d * p;
					break;
				case "YZX":
					this._x = u * c * h + l * d * p, this._y = l * d * h + u * c * p, this._z = l * c * p - u * d * h, this._w = l * c * h - u * d * p;
					break;
				case "XZY":
					this._x = u * c * h - l * d * p, this._y = l * d * h - u * c * p, this._z = l * c * p + u * d * h, this._w = l * c * h + u * d * p;
					break;
				default:
					console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + s)
			}
			return !1 !== e && this._onChangeCallback(), this
		}
		setFromAxisAngle(t, e) {
			const n = e / 2,
				i = Math.sin(n);
			return this._x = t.x * i, this._y = t.y * i, this._z = t.z * i, this._w = Math.cos(n), this._onChangeCallback(), this
		}
		setFromRotationMatrix(t) {
			const e = t.elements,
				n = e[0],
				i = e[4],
				r = e[8],
				s = e[1],
				a = e[5],
				o = e[9],
				l = e[2],
				c = e[6],
				h = e[10],
				u = n + a + h;
			if (u > 0) {
				const t = .5 / Math.sqrt(u + 1);
				this._w = .25 / t, this._x = (c - o) * t, this._y = (r - l) * t, this._z = (s - i) * t
			} else if (n > a && n > h) {
				const t = 2 * Math.sqrt(1 + n - a - h);
				this._w = (c - o) / t, this._x = .25 * t, this._y = (i + s) / t, this._z = (r + l) / t
			} else if (a > h) {
				const t = 2 * Math.sqrt(1 + a - n - h);
				this._w = (r - l) / t, this._x = (i + s) / t, this._y = .25 * t, this._z = (o + c) / t
			} else {
				const t = 2 * Math.sqrt(1 + h - n - a);
				this._w = (s - i) / t, this._x = (r + l) / t, this._y = (o + c) / t, this._z = .25 * t
			}
			return this._onChangeCallback(), this
		}
		setFromUnitVectors(t, e) {
			let n = t.dot(e) + 1;
			return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize()
		}
		angleTo(t) {
			return 2 * Math.acos(Math.abs(fl(this.dot(t), -1, 1)))
		}
		rotateTowards(t, e) {
			const n = this.angleTo(t);
			if (0 === n) return this;
			const i = Math.min(1, e / n);
			return this.slerp(t, i), this
		}
		identity() {
			return this.set(0, 0, 0, 1)
		}
		invert() {
			return this.conjugate()
		}
		conjugate() {
			return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this
		}
		dot(t) {
			return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w
		}
		lengthSq() {
			return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
		}
		length() {
			return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
		}
		normalize() {
			let t = this.length();
			return 0 === t ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this
		}
		multiply(t, e) {
			return void 0 !== e ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(t, e)) : this.multiplyQuaternions(this, t)
		}
		premultiply(t) {
			return this.multiplyQuaternions(t, this)
		}
		multiplyQuaternions(t, e) {
			const n = t._x,
				i = t._y,
				r = t._z,
				s = t._w,
				a = e._x,
				o = e._y,
				l = e._z,
				c = e._w;
			return this._x = n * c + s * a + i * l - r * o, this._y = i * c + s * o + r * a - n * l, this._z = r * c + s * l + n * o - i * a, this._w = s * c - n * a - i * o - r * l, this._onChangeCallback(), this
		}
		slerp(t, e) {
			if (0 === e) return this;
			if (1 === e) return this.copy(t);
			const n = this._x,
				i = this._y,
				r = this._z,
				s = this._w;
			let a = s * t._w + n * t._x + i * t._y + r * t._z;
			if (a < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, a = -a) : this.copy(t), a >= 1) return this._w = s, this._x = n, this._y = i, this._z = r, this;
			const o = 1 - a * a;
			if (o <= Number.EPSILON) {
				const t = 1 - e;
				return this._w = t * s + e * this._w, this._x = t * n + e * this._x, this._y = t * i + e * this._y, this._z = t * r + e * this._z, this.normalize(), this._onChangeCallback(), this
			}
			const l = Math.sqrt(o),
				c = Math.atan2(l, a),
				h = Math.sin((1 - e) * c) / l,
				u = Math.sin(e * c) / l;
			return this._w = s * h + this._w * u, this._x = n * h + this._x * u, this._y = i * h + this._y * u, this._z = r * h + this._z * u, this._onChangeCallback(), this
		}
		slerpQuaternions(t, e, n) {
			this.copy(t).slerp(e, n)
		}
		random() {
			const t = Math.random(),
				e = Math.sqrt(1 - t),
				n = Math.sqrt(t),
				i = 2 * Math.PI * Math.random(),
				r = 2 * Math.PI * Math.random();
			return this.set(e * Math.cos(i), n * Math.sin(r), n * Math.cos(r), e * Math.sin(i))
		}
		equals(t) {
			return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w
		}
		fromArray(t, e = 0) {
			return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this
		}
		toArray(t = [], e = 0) {
			return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t
		}
		fromBufferAttribute(t, e) {
			return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this
		}
		_onChange(t) {
			return this._onChangeCallback = t, this
		}
		_onChangeCallback() {}
	}
	Dl.prototype.isQuaternion = !0;
	class Il {
		constructor(t = 0, e = 0, n = 0) {
			this.x = t, this.y = e, this.z = n
		}
		set(t, e, n) {
			return void 0 === n && (n = this.z), this.x = t, this.y = e, this.z = n, this
		}
		setScalar(t) {
			return this.x = t, this.y = t, this.z = t, this
		}
		setX(t) {
			return this.x = t, this
		}
		setY(t) {
			return this.y = t, this
		}
		setZ(t) {
			return this.z = t, this
		}
		setComponent(t, e) {
			switch (t) {
				case 0:
					this.x = e;
					break;
				case 1:
					this.y = e;
					break;
				case 2:
					this.z = e;
					break;
				default:
					throw new Error("index is out of range: " + t)
			}
			return this
		}
		getComponent(t) {
			switch (t) {
				case 0:
					return this.x;
				case 1:
					return this.y;
				case 2:
					return this.z;
				default:
					throw new Error("index is out of range: " + t)
			}
		}
		clone() {
			return new this.constructor(this.x, this.y, this.z)
		}
		copy(t) {
			return this.x = t.x, this.y = t.y, this.z = t.z, this
		}
		add(t, e) {
			return void 0 !== e ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e)) : (this.x += t.x, this.y += t.y, this.z += t.z, this)
		}
		addScalar(t) {
			return this.x += t, this.y += t, this.z += t, this
		}
		addVectors(t, e) {
			return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this
		}
		addScaledVector(t, e) {
			return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this
		}
		sub(t, e) {
			return void 0 !== e ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e)) : (this.x -= t.x, this.y -= t.y, this.z -= t.z, this)
		}
		subScalar(t) {
			return this.x -= t, this.y -= t, this.z -= t, this
		}
		subVectors(t, e) {
			return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this
		}
		multiply(t, e) {
			return void 0 !== e ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(t, e)) : (this.x *= t.x, this.y *= t.y, this.z *= t.z, this)
		}
		multiplyScalar(t) {
			return this.x *= t, this.y *= t, this.z *= t, this
		}
		multiplyVectors(t, e) {
			return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this
		}
		applyEuler(t) {
			return t && t.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(Nl.setFromEuler(t))
		}
		applyAxisAngle(t, e) {
			return this.applyQuaternion(Nl.setFromAxisAngle(t, e))
		}
		applyMatrix3(t) {
			const e = this.x,
				n = this.y,
				i = this.z,
				r = t.elements;
			return this.x = r[0] * e + r[3] * n + r[6] * i, this.y = r[1] * e + r[4] * n + r[7] * i, this.z = r[2] * e + r[5] * n + r[8] * i, this
		}
		applyNormalMatrix(t) {
			return this.applyMatrix3(t).normalize()
		}
		applyMatrix4(t) {
			const e = this.x,
				n = this.y,
				i = this.z,
				r = t.elements,
				s = 1 / (r[3] * e + r[7] * n + r[11] * i + r[15]);
			return this.x = (r[0] * e + r[4] * n + r[8] * i + r[12]) * s, this.y = (r[1] * e + r[5] * n + r[9] * i + r[13]) * s, this.z = (r[2] * e + r[6] * n + r[10] * i + r[14]) * s, this
		}
		applyQuaternion(t) {
			const e = this.x,
				n = this.y,
				i = this.z,
				r = t.x,
				s = t.y,
				a = t.z,
				o = t.w,
				l = o * e + s * i - a * n,
				c = o * n + a * e - r * i,
				h = o * i + r * n - s * e,
				u = -r * e - s * n - a * i;
			return this.x = l * o + u * -r + c * -a - h * -s, this.y = c * o + u * -s + h * -r - l * -a, this.z = h * o + u * -a + l * -s - c * -r, this
		}
		project(t) {
			return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)
		}
		unproject(t) {
			return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)
		}
		transformDirection(t) {
			const e = this.x,
				n = this.y,
				i = this.z,
				r = t.elements;
			return this.x = r[0] * e + r[4] * n + r[8] * i, this.y = r[1] * e + r[5] * n + r[9] * i, this.z = r[2] * e + r[6] * n + r[10] * i, this.normalize()
		}
		divide(t) {
			return this.x /= t.x, this.y /= t.y, this.z /= t.z, this
		}
		divideScalar(t) {
			return this.multiplyScalar(1 / t)
		}
		min(t) {
			return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this
		}
		max(t) {
			return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this
		}
		clamp(t, e) {
			return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this
		}
		clampScalar(t, e) {
			return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this
		}
		clampLength(t, e) {
			const n = this.length();
			return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)))
		}
		floor() {
			return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
		}
		ceil() {
			return this.x = Math.ceil(this.x),
				this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
		}
		round() {
			return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
		}
		roundToZero() {
			return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z), this
		}
		negate() {
			return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
		}
		dot(t) {
			return this.x * t.x + this.y * t.y + this.z * t.z
		}
		lengthSq() {
			return this.x * this.x + this.y * this.y + this.z * this.z
		}
		length() {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
		}
		manhattanLength() {
			return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
		}
		normalize() {
			return this.divideScalar(this.length() || 1)
		}
		setLength(t) {
			return this.normalize().multiplyScalar(t)
		}
		lerp(t, e) {
			return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this
		}
		lerpVectors(t, e, n) {
			return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this
		}
		cross(t, e) {
			return void 0 !== e ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(t, e)) : this.crossVectors(this, t)
		}
		crossVectors(t, e) {
			const n = t.x,
				i = t.y,
				r = t.z,
				s = e.x,
				a = e.y,
				o = e.z;
			return this.x = i * o - r * a, this.y = r * s - n * o, this.z = n * a - i * s, this
		}
		projectOnVector(t) {
			const e = t.lengthSq();
			if (0 === e) return this.set(0, 0, 0);
			const n = t.dot(this) / e;
			return this.copy(t).multiplyScalar(n)
		}
		projectOnPlane(t) {
			return Ol.copy(this).projectOnVector(t), this.sub(Ol)
		}
		reflect(t) {
			return this.sub(Ol.copy(t).multiplyScalar(2 * this.dot(t)))
		}
		angleTo(t) {
			const e = Math.sqrt(this.lengthSq() * t.lengthSq());
			if (0 === e) return Math.PI / 2;
			const n = this.dot(t) / e;
			return Math.acos(fl(n, -1, 1))
		}
		distanceTo(t) {
			return Math.sqrt(this.distanceToSquared(t))
		}
		distanceToSquared(t) {
			const e = this.x - t.x,
				n = this.y - t.y,
				i = this.z - t.z;
			return e * e + n * n + i * i
		}
		manhattanDistanceTo(t) {
			return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
		}
		setFromSpherical(t) {
			return this.setFromSphericalCoords(t.radius, t.phi, t.theta)
		}
		setFromSphericalCoords(t, e, n) {
			const i = Math.sin(e) * t;
			return this.x = i * Math.sin(n), this.y = Math.cos(e) * t, this.z = i * Math.cos(n), this
		}
		setFromCylindrical(t) {
			return this.setFromCylindricalCoords(t.radius, t.theta, t.y)
		}
		setFromCylindricalCoords(t, e, n) {
			return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this
		}
		setFromMatrixPosition(t) {
			const e = t.elements;
			return this.x = e[12], this.y = e[13], this.z = e[14], this
		}
		setFromMatrixScale(t) {
			const e = this.setFromMatrixColumn(t, 0).length(),
				n = this.setFromMatrixColumn(t, 1).length(),
				i = this.setFromMatrixColumn(t, 2).length();
			return this.x = e, this.y = n, this.z = i, this
		}
		setFromMatrixColumn(t, e) {
			return this.fromArray(t.elements, 4 * e)
		}
		setFromMatrix3Column(t, e) {
			return this.fromArray(t.elements, 3 * e)
		}
		equals(t) {
			return t.x === this.x && t.y === this.y && t.z === this.z
		}
		fromArray(t, e = 0) {
			return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this
		}
		toArray(t = [], e = 0) {
			return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t
		}
		fromBufferAttribute(t, e, n) {
			return void 0 !== n && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this
		}
		random() {
			return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this
		}
		randomDirection() {
			const t = 2 * (Math.random() - .5),
				e = Math.random() * Math.PI * 2,
				n = Math.sqrt(1 - t ** 2);
			return this.x = n * Math.cos(e), this.y = n * Math.sin(e), this.z = t, this
		}*[Symbol.iterator]() {
			yield this.x, yield this.y, yield this.z
		}
	}
	Il.prototype.isVector3 = !0;
	const Ol = new Il,
		Nl = new Dl;
	class zl {
		constructor(t = new Il(1 / 0, 1 / 0, 1 / 0), e = new Il(-1 / 0, -1 / 0, -1 / 0)) {
			this.min = t, this.max = e
		}
		set(t, e) {
			return this.min.copy(t), this.max.copy(e), this
		}
		setFromArray(t) {
			let e = 1 / 0,
				n = 1 / 0,
				i = 1 / 0,
				r = -1 / 0,
				s = -1 / 0,
				a = -1 / 0;
			for (let o = 0, l = t.length; o < l; o += 3) {
				const l = t[o],
					c = t[o + 1],
					h = t[o + 2];
				l < e && (e = l), c < n && (n = c), h < i && (i = h), l > r && (r = l), c > s && (s = c), h > a && (a = h)
			}
			return this.min.set(e, n, i), this.max.set(r, s, a), this
		}
		setFromBufferAttribute(t) {
			let e = 1 / 0,
				n = 1 / 0,
				i = 1 / 0,
				r = -1 / 0,
				s = -1 / 0,
				a = -1 / 0;
			for (let o = 0, l = t.count; o < l; o++) {
				const l = t.getX(o),
					c = t.getY(o),
					h = t.getZ(o);
				l < e && (e = l), c < n && (n = c), h < i && (i = h), l > r && (r = l), c > s && (s = c), h > a && (a = h)
			}
			return this.min.set(e, n, i), this.max.set(r, s, a), this
		}
		setFromPoints(t) {
			this.makeEmpty();
			for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
			return this
		}
		setFromCenterAndSize(t, e) {
			const n = Fl.copy(e).multiplyScalar(.5);
			return this.min.copy(t).sub(n), this.max.copy(t).add(n), this
		}
		setFromObject(t) {
			return this.makeEmpty(), this.expandByObject(t)
		}
		clone() {
			return (new this.constructor).copy(this)
		}
		copy(t) {
			return this.min.copy(t.min), this.max.copy(t.max), this
		}
		makeEmpty() {
			return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this
		}
		isEmpty() {
			return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
		}
		getCenter(t) {
			return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(.5)
		}
		getSize(t) {
			return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min)
		}
		expandByPoint(t) {
			return this.min.min(t), this.max.max(t), this
		}
		expandByVector(t) {
			return this.min.sub(t), this.max.add(t), this
		}
		expandByScalar(t) {
			return this.min.addScalar(-t), this.max.addScalar(t), this
		}
		expandByObject(t) {
			t.updateWorldMatrix(!1, !1);
			const e = t.geometry;
			void 0 !== e && (null === e.boundingBox && e.computeBoundingBox(), kl.copy(e.boundingBox), kl.applyMatrix4(t.matrixWorld), this.union(kl));
			const n = t.children;
			for (let t = 0, e = n.length; t < e; t++) this.expandByObject(n[t]);
			return this
		}
		containsPoint(t) {
			return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z)
		}
		containsBox(t) {
			return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z
		}
		getParameter(t, e) {
			return e.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z))
		}
		intersectsBox(t) {
			return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z)
		}
		intersectsSphere(t) {
			return this.clampPoint(t.center, Fl), Fl.distanceToSquared(t.center) <= t.radius * t.radius
		}
		intersectsPlane(t) {
			let e, n;
			return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant
		}
		intersectsTriangle(t) {
			if (this.isEmpty()) return !1;
			this.getCenter(jl), Xl.subVectors(this.max, jl), Ul.subVectors(t.a, jl), Hl.subVectors(t.b, jl), Gl.subVectors(t.c, jl), Vl.subVectors(Hl, Ul), Wl.subVectors(Gl, Hl), ql.subVectors(Ul, Gl);
			let e = [0, -Vl.z, Vl.y, 0, -Wl.z, Wl.y, 0, -ql.z, ql.y, Vl.z, 0, -Vl.x, Wl.z, 0, -Wl.x, ql.z, 0, -ql.x, -Vl.y, Vl.x, 0, -Wl.y, Wl.x, 0, -ql.y, ql.x, 0];
			return !!Zl(e, Ul, Hl, Gl, Xl) && (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !!Zl(e, Ul, Hl, Gl, Xl) && (Yl.crossVectors(Vl, Wl), e = [Yl.x, Yl.y, Yl.z], Zl(e, Ul, Hl, Gl, Xl)))
		}
		clampPoint(t, e) {
			return e.copy(t).clamp(this.min, this.max)
		}
		distanceToPoint(t) {
			return Fl.copy(t).clamp(this.min, this.max).sub(t).length()
		}
		getBoundingSphere(t) {
			return this.getCenter(t.center), t.radius = .5 * this.getSize(Fl).length(), t
		}
		intersect(t) {
			return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this
		}
		union(t) {
			return this.min.min(t.min), this.max.max(t.max), this
		}
		applyMatrix4(t) {
			return this.isEmpty() || (Bl[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), Bl[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), Bl[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), Bl[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), Bl[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), Bl[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), Bl[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), Bl[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(Bl)), this
		}
		translate(t) {
			return this.min.add(t), this.max.add(t), this
		}
		equals(t) {
			return t.min.equals(this.min) && t.max.equals(this.max)
		}
	}
	zl.prototype.isBox3 = !0;
	const Bl = [new Il, new Il, new Il, new Il, new Il, new Il, new Il, new Il],
		Fl = new Il,
		kl = new zl,
		Ul = new Il,
		Hl = new Il,
		Gl = new Il,
		Vl = new Il,
		Wl = new Il,
		ql = new Il,
		jl = new Il,
		Xl = new Il,
		Yl = new Il,
		Jl = new Il;

	function Zl(t, e, n, i, r) {
		for (let s = 0, a = t.length - 3; s <= a; s += 3) {
			Jl.fromArray(t, s);
			const a = r.x * Math.abs(Jl.x) + r.y * Math.abs(Jl.y) + r.z * Math.abs(Jl.z),
				o = e.dot(Jl),
				l = n.dot(Jl),
				c = i.dot(Jl);
			if (Math.max(-Math.max(o, l, c), Math.min(o, l, c)) > a) return !1
		}
		return !0
	}
	const Ql = new zl,
		Kl = new Il,
		$l = new Il,
		tc = new Il;
	class ec {
		constructor(t = new Il, e = -1) {
			this.center = t, this.radius = e
		}
		set(t, e) {
			return this.center.copy(t), this.radius = e, this
		}
		setFromPoints(t, e) {
			const n = this.center;
			void 0 !== e ? n.copy(e) : Ql.setFromPoints(t).getCenter(n);
			let i = 0;
			for (let e = 0, r = t.length; e < r; e++) i = Math.max(i, n.distanceToSquared(t[e]));
			return this.radius = Math.sqrt(i), this
		}
		copy(t) {
			return this.center.copy(t.center), this.radius = t.radius, this
		}
		isEmpty() {
			return this.radius < 0
		}
		makeEmpty() {
			return this.center.set(0, 0, 0), this.radius = -1, this
		}
		containsPoint(t) {
			return t.distanceToSquared(this.center) <= this.radius * this.radius
		}
		distanceToPoint(t) {
			return t.distanceTo(this.center) - this.radius
		}
		intersectsSphere(t) {
			const e = this.radius + t.radius;
			return t.center.distanceToSquared(this.center) <= e * e
		}
		intersectsBox(t) {
			return t.intersectsSphere(this)
		}
		intersectsPlane(t) {
			return Math.abs(t.distanceToPoint(this.center)) <= this.radius
		}
		clampPoint(t, e) {
			const n = this.center.distanceToSquared(t);
			return e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e
		}
		getBoundingBox(t) {
			return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t)
		}
		applyMatrix4(t) {
			return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this
		}
		translate(t) {
			return this.center.add(t), this
		}
		expandByPoint(t) {
			tc.subVectors(t, this.center);
			const e = tc.lengthSq();
			if (e > this.radius * this.radius) {
				const t = Math.sqrt(e),
					n = .5 * (t - this.radius);
				this.center.add(tc.multiplyScalar(n / t)), this.radius += n
			}
			return this
		}
		union(t) {
			return $l.subVectors(t.center, this.center).normalize().multiplyScalar(t.radius), this.expandByPoint(Kl.copy(t.center).add($l)), this.expandByPoint(Kl.copy(t.center).sub($l)), this
		}
		equals(t) {
			return t.center.equals(this.center) && t.radius === this.radius
		}
		clone() {
			return (new this.constructor).copy(this)
		}
	}
	const nc = new Il,
		ic = new Il,
		rc = new Il,
		sc = new Il,
		ac = new Il,
		oc = new Il,
		lc = new Il;
	class cc {
		constructor(t = new Il, e = new Il(0, 0, -1)) {
			this.origin = t, this.direction = e
		}
		set(t, e) {
			return this.origin.copy(t), this.direction.copy(e), this
		}
		copy(t) {
			return this.origin.copy(t.origin), this.direction.copy(t.direction), this
		}
		at(t, e) {
			return e.copy(this.direction).multiplyScalar(t).add(this.origin)
		}
		lookAt(t) {
			return this.direction.copy(t).sub(this.origin).normalize(), this
		}
		recast(t) {
			return this.origin.copy(this.at(t, nc)), this
		}
		closestPointToPoint(t, e) {
			e.subVectors(t, this.origin);
			const n = e.dot(this.direction);
			return n < 0 ? e.copy(this.origin) : e.copy(this.direction).multiplyScalar(n).add(this.origin)
		}
		distanceToPoint(t) {
			return Math.sqrt(this.distanceSqToPoint(t))
		}
		distanceSqToPoint(t) {
			const e = nc.subVectors(t, this.origin).dot(this.direction);
			return e < 0 ? this.origin.distanceToSquared(t) : (nc.copy(this.direction).multiplyScalar(e).add(this.origin), nc.distanceToSquared(t))
		}
		distanceSqToSegment(t, e, n, i) {
			ic.copy(t).add(e).multiplyScalar(.5), rc.copy(e).sub(t).normalize(), sc.copy(this.origin).sub(ic);
			const r = .5 * t.distanceTo(e),
				s = -this.direction.dot(rc),
				a = sc.dot(this.direction),
				o = -sc.dot(rc),
				l = sc.lengthSq(),
				c = Math.abs(1 - s * s);
			let h, u, d, p;
			if (c > 0)
				if (h = s * o - a, u = s * a - o, p = r * c, h >= 0)
					if (u >= -p)
						if (u <= p) {
							const t = 1 / c;
							h *= t, u *= t, d = h * (h + s * u + 2 * a) + u * (s * h + u + 2 * o) + l
						} else u = r, h = Math.max(0, -(s * u + a)), d = -h * h + u * (u + 2 * o) + l;
			else u = -r, h = Math.max(0, -(s * u + a)), d = -h * h + u * (u + 2 * o) + l;
			else u <= -p ? (h = Math.max(0, -(-s * r + a)), u = h > 0 ? -r : Math.min(Math.max(-r, -o), r), d = -h * h + u * (u + 2 * o) + l) : u <= p ? (h = 0, u = Math.min(Math.max(-r, -o), r), d = u * (u + 2 * o) + l) : (h = Math.max(0, -(s * r + a)), u = h > 0 ? r : Math.min(Math.max(-r, -o), r), d = -h * h + u * (u + 2 * o) + l);
			else u = s > 0 ? -r : r, h = Math.max(0, -(s * u + a)), d = -h * h + u * (u + 2 * o) + l;
			return n && n.copy(this.direction).multiplyScalar(h).add(this.origin), i && i.copy(rc).multiplyScalar(u).add(ic), d
		}
		intersectSphere(t, e) {
			nc.subVectors(t.center, this.origin);
			const n = nc.dot(this.direction),
				i = nc.dot(nc) - n * n,
				r = t.radius * t.radius;
			if (i > r) return null;
			const s = Math.sqrt(r - i),
				a = n - s,
				o = n + s;
			return a < 0 && o < 0 ? null : a < 0 ? this.at(o, e) : this.at(a, e)
		}
		intersectsSphere(t) {
			return this.distanceSqToPoint(t.center) <= t.radius * t.radius
		}
		distanceToPlane(t) {
			const e = t.normal.dot(this.direction);
			if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
			const n = -(this.origin.dot(t.normal) + t.constant) / e;
			return n >= 0 ? n : null
		}
		intersectPlane(t, e) {
			const n = this.distanceToPlane(t);
			return null === n ? null : this.at(n, e)
		}
		intersectsPlane(t) {
			const e = t.distanceToPoint(this.origin);
			if (0 === e) return !0;
			return t.normal.dot(this.direction) * e < 0
		}
		intersectBox(t, e) {
			let n, i, r, s, a, o;
			const l = 1 / this.direction.x,
				c = 1 / this.direction.y,
				h = 1 / this.direction.z,
				u = this.origin;
			return l >= 0 ? (n = (t.min.x - u.x) * l, i = (t.max.x - u.x) * l) : (n = (t.max.x - u.x) * l, i = (t.min.x - u.x) * l), c >= 0 ? (r = (t.min.y - u.y) * c, s = (t.max.y - u.y) * c) : (r = (t.max.y - u.y) * c, s = (t.min.y - u.y) * c), n > s || r > i ? null : ((r > n || n != n) && (n = r), (s < i || i != i) && (i = s), h >= 0 ? (a = (t.min.z - u.z) * h, o = (t.max.z - u.z) * h) : (a = (t.max.z - u.z) * h, o = (t.min.z - u.z) * h), n > o || a > i ? null : ((a > n || n != n) && (n = a), (o < i || i != i) && (i = o), i < 0 ? null : this.at(n >= 0 ? n : i, e)))
		}
		intersectsBox(t) {
			return null !== this.intersectBox(t, nc)
		}
		intersectTriangle(t, e, n, i, r) {
			ac.subVectors(e, t), oc.subVectors(n, t), lc.crossVectors(ac, oc);
			let s, a = this.direction.dot(lc);
			if (a > 0) {
				if (i) return null;
				s = 1
			} else {
				if (!(a < 0)) return null;
				s = -1, a = -a
			}
			sc.subVectors(this.origin, t);
			const o = s * this.direction.dot(oc.crossVectors(sc, oc));
			if (o < 0) return null;
			const l = s * this.direction.dot(ac.cross(sc));
			if (l < 0) return null;
			if (o + l > a) return null;
			const c = -s * sc.dot(lc);
			return c < 0 ? null : this.at(c / a, r)
		}
		applyMatrix4(t) {
			return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this
		}
		equals(t) {
			return t.origin.equals(this.origin) && t.direction.equals(this.direction)
		}
		clone() {
			return (new this.constructor).copy(this)
		}
	}
	class hc {
		constructor() {
			this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
		}
		set(t, e, n, i, r, s, a, o, l, c, h, u, d, p, m, f) {
			const g = this.elements;
			return g[0] = t, g[4] = e, g[8] = n, g[12] = i, g[1] = r, g[5] = s, g[9] = a, g[13] = o, g[2] = l, g[6] = c, g[10] = h, g[14] = u, g[3] = d, g[7] = p, g[11] = m, g[15] = f, this
		}
		identity() {
			return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		}
		clone() {
			return (new hc).fromArray(this.elements)
		}
		copy(t) {
			const e = this.elements,
				n = t.elements;
			return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this
		}
		copyPosition(t) {
			const e = this.elements,
				n = t.elements;
			return e[12] = n[12], e[13] = n[13], e[14] = n[14], this
		}
		setFromMatrix3(t) {
			const e = t.elements;
			return this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this
		}
		extractBasis(t, e, n) {
			return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this
		}
		makeBasis(t, e, n) {
			return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this
		}
		extractRotation(t) {
			const e = this.elements,
				n = t.elements,
				i = 1 / uc.setFromMatrixColumn(t, 0).length(),
				r = 1 / uc.setFromMatrixColumn(t, 1).length(),
				s = 1 / uc.setFromMatrixColumn(t, 2).length();
			return e[0] = n[0] * i, e[1] = n[1] * i, e[2] = n[2] * i, e[3] = 0, e[4] = n[4] * r, e[5] = n[5] * r, e[6] = n[6] * r, e[7] = 0, e[8] = n[8] * s, e[9] = n[9] * s, e[10] = n[10] * s, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
		}
		makeRotationFromEuler(t) {
			t && t.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
			const e = this.elements,
				n = t.x,
				i = t.y,
				r = t.z,
				s = Math.cos(n),
				a = Math.sin(n),
				o = Math.cos(i),
				l = Math.sin(i),
				c = Math.cos(r),
				h = Math.sin(r);
			if ("XYZ" === t.order) {
				const t = s * c,
					n = s * h,
					i = a * c,
					r = a * h;
				e[0] = o * c, e[4] = -o * h, e[8] = l, e[1] = n + i * l, e[5] = t - r * l, e[9] = -a * o, e[2] = r - t * l, e[6] = i + n * l, e[10] = s * o
			} else if ("YXZ" === t.order) {
				const t = o * c,
					n = o * h,
					i = l * c,
					r = l * h;
				e[0] = t + r * a, e[4] = i * a - n, e[8] = s * l, e[1] = s * h, e[5] = s * c, e[9] = -a, e[2] = n * a - i, e[6] = r + t * a, e[10] = s * o
			} else if ("ZXY" === t.order) {
				const t = o * c,
					n = o * h,
					i = l * c,
					r = l * h;
				e[0] = t - r * a, e[4] = -s * h, e[8] = i + n * a, e[1] = n + i * a, e[5] = s * c, e[9] = r - t * a, e[2] = -s * l, e[6] = a, e[10] = s * o
			} else if ("ZYX" === t.order) {
				const t = s * c,
					n = s * h,
					i = a * c,
					r = a * h;
				e[0] = o * c, e[4] = i * l - n, e[8] = t * l + r, e[1] = o * h, e[5] = r * l + t, e[9] = n * l - i, e[2] = -l, e[6] = a * o, e[10] = s * o
			} else if ("YZX" === t.order) {
				const t = s * o,
					n = s * l,
					i = a * o,
					r = a * l;
				e[0] = o * c, e[4] = r - t * h, e[8] = i * h + n, e[1] = h, e[5] = s * c, e[9] = -a * c, e[2] = -l * c, e[6] = n * h + i, e[10] = t - r * h
			} else if ("XZY" === t.order) {
				const t = s * o,
					n = s * l,
					i = a * o,
					r = a * l;
				e[0] = o * c, e[4] = -h, e[8] = l * c, e[1] = t * h + r, e[5] = s * c, e[9] = n * h - i, e[2] = i * h - n, e[6] = a * c, e[10] = r * h + t
			}
			return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
		}
		makeRotationFromQuaternion(t) {
			return this.compose(pc, t, mc)
		}
		lookAt(t, e, n) {
			const i = this.elements;
			return vc.subVectors(t, e), 0 === vc.lengthSq() && (vc.z = 1), vc.normalize(), fc.crossVectors(n, vc), 0 === fc.lengthSq() && (1 === Math.abs(n.z) ? vc.x += 1e-4 : vc.z += 1e-4, vc.normalize(), fc.crossVectors(n, vc)), fc.normalize(), gc.crossVectors(vc, fc), i[0] = fc.x, i[4] = gc.x, i[8] = vc.x, i[1] = fc.y, i[5] = gc.y, i[9] = vc.y, i[2] = fc.z, i[6] = gc.z, i[10] = vc.z, this
		}
		multiply(t, e) {
			return void 0 !== e ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(t, e)) : this.multiplyMatrices(this, t)
		}
		premultiply(t) {
			return this.multiplyMatrices(t, this)
		}
		multiplyMatrices(t, e) {
			const n = t.elements,
				i = e.elements,
				r = this.elements,
				s = n[0],
				a = n[4],
				o = n[8],
				l = n[12],
				c = n[1],
				h = n[5],
				u = n[9],
				d = n[13],
				p = n[2],
				m = n[6],
				f = n[10],
				g = n[14],
				v = n[3],
				y = n[7],
				_ = n[11],
				x = n[15],
				w = i[0],
				b = i[4],
				M = i[8],
				S = i[12],
				T = i[1],
				E = i[5],
				A = i[9],
				L = i[13],
				C = i[2],
				R = i[6],
				P = i[10],
				D = i[14],
				I = i[3],
				O = i[7],
				N = i[11],
				z = i[15];
			return r[0] = s * w + a * T + o * C + l * I, r[4] = s * b + a * E + o * R + l * O, r[8] = s * M + a * A + o * P + l * N, r[12] = s * S + a * L + o * D + l * z, r[1] = c * w + h * T + u * C + d * I, r[5] = c * b + h * E + u * R + d * O, r[9] = c * M + h * A + u * P + d * N, r[13] = c * S + h * L + u * D + d * z, r[2] = p * w + m * T + f * C + g * I, r[6] = p * b + m * E + f * R + g * O, r[10] = p * M + m * A + f * P + g * N, r[14] = p * S + m * L + f * D + g * z, r[3] = v * w + y * T + _ * C + x * I, r[7] = v * b + y * E + _ * R + x * O, r[11] = v * M + y * A + _ * P + x * N, r[15] = v * S + y * L + _ * D + x * z, this
		}
		multiplyScalar(t) {
			const e = this.elements;
			return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this
		}
		determinant() {
			const t = this.elements,
				e = t[0],
				n = t[4],
				i = t[8],
				r = t[12],
				s = t[1],
				a = t[5],
				o = t[9],
				l = t[13],
				c = t[2],
				h = t[6],
				u = t[10],
				d = t[14];
			return t[3] * (+r * o * h - i * l * h - r * a * u + n * l * u + i * a * d - n * o * d) + t[7] * (+e * o * d - e * l * u + r * s * u - i * s * d + i * l * c - r * o * c) + t[11] * (+e * l * h - e * a * d - r * s * h + n * s * d + r * a * c - n * l * c) + t[15] * (-i * a * c - e * o * h + e * a * u + i * s * h - n * s * u + n * o * c)
		}
		transpose() {
			const t = this.elements;
			let e;
			return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this
		}
		setPosition(t, e, n) {
			const i = this.elements;
			return t.isVector3 ? (i[12] = t.x, i[13] = t.y, i[14] = t.z) : (i[12] = t, i[13] = e, i[14] = n), this
		}
		invert() {
			const t = this.elements,
				e = t[0],
				n = t[1],
				i = t[2],
				r = t[3],
				s = t[4],
				a = t[5],
				o = t[6],
				l = t[7],
				c = t[8],
				h = t[9],
				u = t[10],
				d = t[11],
				p = t[12],
				m = t[13],
				f = t[14],
				g = t[15],
				v = h * f * l - m * u * l + m * o * d - a * f * d - h * o * g + a * u * g,
				y = p * u * l - c * f * l - p * o * d + s * f * d + c * o * g - s * u * g,
				_ = c * m * l - p * h * l + p * a * d - s * m * d - c * a * g + s * h * g,
				x = p * h * o - c * m * o - p * a * u + s * m * u + c * a * f - s * h * f,
				w = e * v + n * y + i * _ + r * x;
			if (0 === w) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
			const b = 1 / w;
			return t[0] = v * b, t[1] = (m * u * r - h * f * r - m * i * d + n * f * d + h * i * g - n * u * g) * b, t[2] = (a * f * r - m * o * r + m * i * l - n * f * l - a * i * g + n * o * g) * b, t[3] = (h * o * r - a * u * r - h * i * l + n * u * l + a * i * d - n * o * d) * b, t[4] = y * b, t[5] = (c * f * r - p * u * r + p * i * d - e * f * d - c * i * g + e * u * g) * b, t[6] = (p * o * r - s * f * r - p * i * l + e * f * l + s * i * g - e * o * g) * b, t[7] = (s * u * r - c * o * r + c * i * l - e * u * l - s * i * d + e * o * d) * b, t[8] = _ * b, t[9] = (p * h * r - c * m * r - p * n * d + e * m * d + c * n * g - e * h * g) * b, t[10] = (s * m * r - p * a * r + p * n * l - e * m * l - s * n * g + e * a * g) * b, t[11] = (c * a * r - s * h * r - c * n * l + e * h * l + s * n * d - e * a * d) * b, t[12] = x * b, t[13] = (c * m * i - p * h * i + p * n * u - e * m * u - c * n * f + e * h * f) * b, t[14] = (p * a * i - s * m * i - p * n * o + e * m * o + s * n * f - e * a * f) * b, t[15] = (s * h * i - c * a * i + c * n * o - e * h * o - s * n * u + e * a * u) * b, this
		}
		scale(t) {
			const e = this.elements,
				n = t.x,
				i = t.y,
				r = t.z;
			return e[0] *= n, e[4] *= i, e[8] *= r, e[1] *= n, e[5] *= i, e[9] *= r, e[2] *= n, e[6] *= i, e[10] *= r, e[3] *= n, e[7] *= i, e[11] *= r, this
		}
		getMaxScaleOnAxis() {
			const t = this.elements,
				e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
				n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
				i = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
			return Math.sqrt(Math.max(e, n, i))
		}
		makeTranslation(t, e, n) {
			return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this
		}
		makeRotationX(t) {
			const e = Math.cos(t),
				n = Math.sin(t);
			return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this
		}
		makeRotationY(t) {
			const e = Math.cos(t),
				n = Math.sin(t);
			return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this
		}
		makeRotationZ(t) {
			const e = Math.cos(t),
				n = Math.sin(t);
			return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
		}
		makeRotationAxis(t, e) {
			const n = Math.cos(e),
				i = Math.sin(e),
				r = 1 - n,
				s = t.x,
				a = t.y,
				o = t.z,
				l = r * s,
				c = r * a;
			return this.set(l * s + n, l * a - i * o, l * o + i * a, 0, l * a + i * o, c * a + n, c * o - i * s, 0, l * o - i * a, c * o + i * s, r * o * o + n, 0, 0, 0, 0, 1), this
		}
		makeScale(t, e, n) {
			return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this
		}
		makeShear(t, e, n, i, r, s) {
			return this.set(1, n, r, 0, t, 1, s, 0, e, i, 1, 0, 0, 0, 0, 1), this
		}
		compose(t, e, n) {
			const i = this.elements,
				r = e._x,
				s = e._y,
				a = e._z,
				o = e._w,
				l = r + r,
				c = s + s,
				h = a + a,
				u = r * l,
				d = r * c,
				p = r * h,
				m = s * c,
				f = s * h,
				g = a * h,
				v = o * l,
				y = o * c,
				_ = o * h,
				x = n.x,
				w = n.y,
				b = n.z;
			return i[0] = (1 - (m + g)) * x, i[1] = (d + _) * x, i[2] = (p - y) * x, i[3] = 0, i[4] = (d - _) * w, i[5] = (1 - (u + g)) * w, i[6] = (f + v) * w, i[7] = 0, i[8] = (p + y) * b, i[9] = (f - v) * b, i[10] = (1 - (u + m)) * b, i[11] = 0, i[12] = t.x, i[13] = t.y, i[14] = t.z, i[15] = 1, this
		}
		decompose(t, e, n) {
			const i = this.elements;
			let r = uc.set(i[0], i[1], i[2]).length();
			const s = uc.set(i[4], i[5], i[6]).length(),
				a = uc.set(i[8], i[9], i[10]).length();
			this.determinant() < 0 && (r = -r), t.x = i[12], t.y = i[13], t.z = i[14], dc.copy(this);
			const o = 1 / r,
				l = 1 / s,
				c = 1 / a;
			return dc.elements[0] *= o, dc.elements[1] *= o, dc.elements[2] *= o, dc.elements[4] *= l, dc.elements[5] *= l, dc.elements[6] *= l, dc.elements[8] *= c, dc.elements[9] *= c, dc.elements[10] *= c, e.setFromRotationMatrix(dc), n.x = r, n.y = s, n.z = a, this
		}
		makePerspective(t, e, n, i, r, s) {
			void 0 === s && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
			const a = this.elements,
				o = 2 * r / (e - t),
				l = 2 * r / (n - i),
				c = (e + t) / (e - t),
				h = (n + i) / (n - i),
				u = -(s + r) / (s - r),
				d = -2 * s * r / (s - r);
			return a[0] = o, a[4] = 0, a[8] = c, a[12] = 0, a[1] = 0, a[5] = l, a[9] = h, a[13] = 0, a[2] = 0, a[6] = 0, a[10] = u, a[14] = d, a[3] = 0, a[7] = 0, a[11] = -1, a[15] = 0, this
		}
		makeOrthographic(t, e, n, i, r, s) {
			const a = this.elements,
				o = 1 / (e - t),
				l = 1 / (n - i),
				c = 1 / (s - r),
				h = (e + t) * o,
				u = (n + i) * l,
				d = (s + r) * c;
			return a[0] = 2 * o, a[4] = 0, a[8] = 0, a[12] = -h, a[1] = 0, a[5] = 2 * l, a[9] = 0, a[13] = -u, a[2] = 0, a[6] = 0, a[10] = -2 * c, a[14] = -d, a[3] = 0, a[7] = 0, a[11] = 0, a[15] = 1, this
		}
		equals(t) {
			const e = this.elements,
				n = t.elements;
			for (let t = 0; t < 16; t++)
				if (e[t] !== n[t]) return !1;
			return !0
		}
		fromArray(t, e = 0) {
			for (let n = 0; n < 16; n++) this.elements[n] = t[n + e];
			return this
		}
		toArray(t = [], e = 0) {
			const n = this.elements;
			return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t
		}
	}
	hc.prototype.isMatrix4 = !0;
	const uc = new Il,
		dc = new hc,
		pc = new Il(0, 0, 0),
		mc = new Il(1, 1, 1),
		fc = new Il,
		gc = new Il,
		vc = new Il,
		yc = new hc,
		_c = new Dl;
	class xc {
		constructor(t = 0, e = 0, n = 0, i = xc.DefaultOrder) {
			this._x = t, this._y = e, this._z = n, this._order = i
		}
		get x() {
			return this._x
		}
		set x(t) {
			this._x = t, this._onChangeCallback()
		}
		get y() {
			return this._y
		}
		set y(t) {
			this._y = t, this._onChangeCallback()
		}
		get z() {
			return this._z
		}
		set z(t) {
			this._z = t, this._onChangeCallback()
		}
		get order() {
			return this._order
		}
		set order(t) {
			this._order = t, this._onChangeCallback()
		}
		set(t, e, n, i = this._order) {
			return this._x = t, this._y = e, this._z = n, this._order = i, this._onChangeCallback(), this
		}
		clone() {
			return new this.constructor(this._x, this._y, this._z, this._order)
		}
		copy(t) {
			return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this
		}
		setFromRotationMatrix(t, e = this._order, n = !0) {
			const i = t.elements,
				r = i[0],
				s = i[4],
				a = i[8],
				o = i[1],
				l = i[5],
				c = i[9],
				h = i[2],
				u = i[6],
				d = i[10];
			switch (e) {
				case "XYZ":
					this._y = Math.asin(fl(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(-c, d), this._z = Math.atan2(-s, r)) : (this._x = Math.atan2(u, l), this._z = 0);
					break;
				case "YXZ":
					this._x = Math.asin(-fl(c, -1, 1)), Math.abs(c) < .9999999 ? (this._y = Math.atan2(a, d), this._z = Math.atan2(o, l)) : (this._y = Math.atan2(-h, r), this._z = 0);
					break;
				case "ZXY":
					this._x = Math.asin(fl(u, -1, 1)), Math.abs(u) < .9999999 ? (this._y = Math.atan2(-h, d), this._z = Math.atan2(-s, l)) : (this._y = 0, this._z = Math.atan2(o, r));
					break;
				case "ZYX":
					this._y = Math.asin(-fl(h, -1, 1)), Math.abs(h) < .9999999 ? (this._x = Math.atan2(u, d), this._z = Math.atan2(o, r)) : (this._x = 0, this._z = Math.atan2(-s, l));
					break;
				case "YZX":
					this._z = Math.asin(fl(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-c, l), this._y = Math.atan2(-h, r)) : (this._x = 0, this._y = Math.atan2(a, d));
					break;
				case "XZY":
					this._z = Math.asin(-fl(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(u, l), this._y = Math.atan2(a, r)) : (this._x = Math.atan2(-c, d), this._y = 0);
					break;
				default:
					console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e)
			}
			return this._order = e, !0 === n && this._onChangeCallback(), this
		}
		setFromQuaternion(t, e, n) {
			return yc.makeRotationFromQuaternion(t), this.setFromRotationMatrix(yc, e, n)
		}
		setFromVector3(t, e = this._order) {
			return this.set(t.x, t.y, t.z, e)
		}
		reorder(t) {
			return _c.setFromEuler(this), this.setFromQuaternion(_c, t)
		}
		equals(t) {
			return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order
		}
		fromArray(t) {
			return this._x = t[0], this._y = t[1], this._z = t[2], void 0 !== t[3] && (this._order = t[3]), this._onChangeCallback(), this
		}
		toArray(t = [], e = 0) {
			return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t
		}
		toVector3(t) {
			return t ? t.set(this._x, this._y, this._z) : new Il(this._x, this._y, this._z)
		}
		_onChange(t) {
			return this._onChangeCallback = t, this
		}
		_onChangeCallback() {}
	}
	xc.prototype.isEuler = !0, xc.DefaultOrder = "XYZ", xc.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];
	class wc {
		constructor() {
			this.mask = 1
		}
		set(t) {
			this.mask = (1 << t | 0) >>> 0
		}
		enable(t) {
			this.mask |= 1 << t | 0
		}
		enableAll() {
			this.mask = -1
		}
		toggle(t) {
			this.mask ^= 1 << t | 0
		}
		disable(t) {
			this.mask &= ~(1 << t | 0)
		}
		disableAll() {
			this.mask = 0
		}
		test(t) {
			return 0 != (this.mask & t.mask)
		}
		isEnabled(t) {
			return 0 != (this.mask & (1 << t | 0))
		}
	}
	let bc = 0;
	const Mc = new Il,
		Sc = new Dl,
		Tc = new hc,
		Ec = new Il,
		Ac = new Il,
		Lc = new Il,
		Cc = new Dl,
		Rc = new Il(1, 0, 0),
		Pc = new Il(0, 1, 0),
		Dc = new Il(0, 0, 1),
		Ic = {
			type: "added"
		},
		Oc = {
			type: "removed"
		};
	class Nc extends hl {
		constructor() {
			super(), Object.defineProperty(this, "id", {
				value: bc++
			}), this.uuid = ml(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Nc.DefaultUp.clone();
			const t = new Il,
				e = new xc,
				n = new Dl,
				i = new Il(1, 1, 1);
			e._onChange((function () {
				n.setFromEuler(e, !1)
			})), n._onChange((function () {
				e.setFromQuaternion(n, void 0, !1)
			})), Object.defineProperties(this, {
				position: {
					configurable: !0,
					enumerable: !0,
					value: t
				},
				rotation: {
					configurable: !0,
					enumerable: !0,
					value: e
				},
				quaternion: {
					configurable: !0,
					enumerable: !0,
					value: n
				},
				scale: {
					configurable: !0,
					enumerable: !0,
					value: i
				},
				modelViewMatrix: {
					value: new hc
				},
				normalMatrix: {
					value: new xl
				}
			}), this.matrix = new hc, this.matrixWorld = new hc, this.matrixAutoUpdate = Nc.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.layers = new wc, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {}
		}
		onBeforeRender() {}
		onAfterRender() {}
		applyMatrix4(t) {
			this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale)
		}
		applyQuaternion(t) {
			return this.quaternion.premultiply(t), this
		}
		setRotationFromAxisAngle(t, e) {
			this.quaternion.setFromAxisAngle(t, e)
		}
		setRotationFromEuler(t) {
			this.quaternion.setFromEuler(t, !0)
		}
		setRotationFromMatrix(t) {
			this.quaternion.setFromRotationMatrix(t)
		}
		setRotationFromQuaternion(t) {
			this.quaternion.copy(t)
		}
		rotateOnAxis(t, e) {
			return Sc.setFromAxisAngle(t, e), this.quaternion.multiply(Sc), this
		}
		rotateOnWorldAxis(t, e) {
			return Sc.setFromAxisAngle(t, e), this.quaternion.premultiply(Sc), this
		}
		rotateX(t) {
			return this.rotateOnAxis(Rc, t)
		}
		rotateY(t) {
			return this.rotateOnAxis(Pc, t)
		}
		rotateZ(t) {
			return this.rotateOnAxis(Dc, t)
		}
		translateOnAxis(t, e) {
			return Mc.copy(t).applyQuaternion(this.quaternion), this.position.add(Mc.multiplyScalar(e)), this
		}
		translateX(t) {
			return this.translateOnAxis(Rc, t)
		}
		translateY(t) {
			return this.translateOnAxis(Pc, t)
		}
		translateZ(t) {
			return this.translateOnAxis(Dc, t)
		}
		localToWorld(t) {
			return t.applyMatrix4(this.matrixWorld)
		}
		worldToLocal(t) {
			return t.applyMatrix4(Tc.copy(this.matrixWorld).invert())
		}
		lookAt(t, e, n) {
			t.isVector3 ? Ec.copy(t) : Ec.set(t, e, n);
			const i = this.parent;
			this.updateWorldMatrix(!0, !1), Ac.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Tc.lookAt(Ac, Ec, this.up) : Tc.lookAt(Ec, Ac, this.up), this.quaternion.setFromRotationMatrix(Tc), i && (Tc.extractRotation(i.matrixWorld), Sc.setFromRotationMatrix(Tc), this.quaternion.premultiply(Sc.invert()))
		}
		add(t) {
			if (arguments.length > 1) {
				for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
				return this
			}
			return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (null !== t.parent && t.parent.remove(t), t.parent = this, this.children.push(t), t.dispatchEvent(Ic)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this)
		}
		remove(t) {
			if (arguments.length > 1) {
				for (let t = 0; t < arguments.length; t++) this.remove(arguments[t]);
				return this
			}
			const e = this.children.indexOf(t);
			return -1 !== e && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(Oc)), this
		}
		removeFromParent() {
			const t = this.parent;
			return null !== t && t.remove(this), this
		}
		clear() {
			for (let t = 0; t < this.children.length; t++) {
				const e = this.children[t];
				e.parent = null, e.dispatchEvent(Oc)
			}
			return this.children.length = 0, this
		}
		attach(t) {
			return this.updateWorldMatrix(!0, !1), Tc.copy(this.matrixWorld).invert(), null !== t.parent && (t.parent.updateWorldMatrix(!0, !1), Tc.multiply(t.parent.matrixWorld)), t.applyMatrix4(Tc), this.add(t), t.updateWorldMatrix(!1, !0), this
		}
		getObjectById(t) {
			return this.getObjectByProperty("id", t)
		}
		getObjectByName(t) {
			return this.getObjectByProperty("name", t)
		}
		getObjectByProperty(t, e) {
			if (this[t] === e) return this;
			for (let n = 0, i = this.children.length; n < i; n++) {
				const i = this.children[n].getObjectByProperty(t, e);
				if (void 0 !== i) return i
			}
		}
		getWorldPosition(t) {
			return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld)
		}
		getWorldQuaternion(t) {
			return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ac, t, Lc), t
		}
		getWorldScale(t) {
			return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ac, Cc, t), t
		}
		getWorldDirection(t) {
			this.updateWorldMatrix(!0, !1);
			const e = this.matrixWorld.elements;
			return t.set(e[8], e[9], e[10]).normalize()
		}
		raycast() {}
		traverse(t) {
			t(this);
			const e = this.children;
			for (let n = 0, i = e.length; n < i; n++) e[n].traverse(t)
		}
		traverseVisible(t) {
			if (!1 === this.visible) return;
			t(this);
			const e = this.children;
			for (let n = 0, i = e.length; n < i; n++) e[n].traverseVisible(t)
		}
		traverseAncestors(t) {
			const e = this.parent;
			null !== e && (t(e), e.traverseAncestors(t))
		}
		updateMatrix() {
			this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
		}
		updateMatrixWorld(t) {
			this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0);
			const e = this.children;
			for (let n = 0, i = e.length; n < i; n++) e[n].updateMatrixWorld(t)
		}
		updateWorldMatrix(t, e) {
			const n = this.parent;
			if (!0 === t && null !== n && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), !0 === e) {
				const t = this.children;
				for (let e = 0, n = t.length; e < n; e++) t[e].updateWorldMatrix(!1, !0)
			}
		}
		toJSON(t) {
			const e = void 0 === t || "string" == typeof t,
				n = {};
			e && (t = {
				geometries: {},
				materials: {},
				textures: {},
				images: {},
				shapes: {},
				skeletons: {},
				animations: {}
			}, n.metadata = {
				version: 4.5,
				type: "Object",
				generator: "Object3D.toJSON"
			});
			const i = {};

			function r(e, n) {
				return void 0 === e[n.uuid] && (e[n.uuid] = n.toJSON(t)), n.uuid
			}
			if (i.uuid = this.uuid, i.type = this.type, "" !== this.name && (i.name = this.name), !0 === this.castShadow && (i.castShadow = !0), !0 === this.receiveShadow && (i.receiveShadow = !0), !1 === this.visible && (i.visible = !1), !1 === this.frustumCulled && (i.frustumCulled = !1),
				0 !== this.renderOrder && (i.renderOrder = this.renderOrder), "{}" !== JSON.stringify(this.userData) && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), !1 === this.matrixAutoUpdate && (i.matrixAutoUpdate = !1), this.isInstancedMesh && (i.type = "InstancedMesh", i.count = this.count, i.instanceMatrix = this.instanceMatrix.toJSON(), null !== this.instanceColor && (i.instanceColor = this.instanceColor.toJSON())), this.isScene) this.background && (this.background.isColor ? i.background = this.background.toJSON() : this.background.isTexture && (i.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && (i.environment = this.environment.toJSON(t).uuid);
			else if (this.isMesh || this.isLine || this.isPoints) {
				i.geometry = r(t.geometries, this.geometry);
				const e = this.geometry.parameters;
				if (void 0 !== e && void 0 !== e.shapes) {
					const n = e.shapes;
					if (Array.isArray(n))
						for (let e = 0, i = n.length; e < i; e++) {
							const i = n[e];
							r(t.shapes, i)
						} else r(t.shapes, n)
				}
			}
			if (this.isSkinnedMesh && (i.bindMode = this.bindMode, i.bindMatrix = this.bindMatrix.toArray(), void 0 !== this.skeleton && (r(t.skeletons, this.skeleton), i.skeleton = this.skeleton.uuid)), void 0 !== this.material)
				if (Array.isArray(this.material)) {
					const e = [];
					for (let n = 0, i = this.material.length; n < i; n++) e.push(r(t.materials, this.material[n]));
					i.material = e
				} else i.material = r(t.materials, this.material);
			if (this.children.length > 0) {
				i.children = [];
				for (let e = 0; e < this.children.length; e++) i.children.push(this.children[e].toJSON(t).object)
			}
			if (this.animations.length > 0) {
				i.animations = [];
				for (let e = 0; e < this.animations.length; e++) {
					const n = this.animations[e];
					i.animations.push(r(t.animations, n))
				}
			}
			if (e) {
				const e = s(t.geometries),
					i = s(t.materials),
					r = s(t.textures),
					a = s(t.images),
					o = s(t.shapes),
					l = s(t.skeletons),
					c = s(t.animations);
				e.length > 0 && (n.geometries = e), i.length > 0 && (n.materials = i), r.length > 0 && (n.textures = r), a.length > 0 && (n.images = a), o.length > 0 && (n.shapes = o), l.length > 0 && (n.skeletons = l), c.length > 0 && (n.animations = c)
			}
			return n.object = i, n;

			function s(t) {
				const e = [];
				for (const n in t) {
					const i = t[n];
					delete i.metadata, e.push(i)
				}
				return e
			}
		}
		clone(t) {
			return (new this.constructor).copy(this, t)
		}
		copy(t, e = !0) {
			if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.userData = JSON.parse(JSON.stringify(t.userData)), !0 === e)
				for (let e = 0; e < t.children.length; e++) {
					const n = t.children[e];
					this.add(n.clone())
				}
			return this
		}
	}
	Nc.DefaultUp = new Il(0, 1, 0), Nc.DefaultMatrixAutoUpdate = !0, Nc.prototype.isObject3D = !0;
	const zc = new Il,
		Bc = new Il,
		Fc = new Il,
		kc = new Il,
		Uc = new Il,
		Hc = new Il,
		Gc = new Il,
		Vc = new Il,
		Wc = new Il,
		qc = new Il;
	class jc {
		constructor(t = new Il, e = new Il, n = new Il) {
			this.a = t, this.b = e, this.c = n
		}
		static getNormal(t, e, n, i) {
			i.subVectors(n, e), zc.subVectors(t, e), i.cross(zc);
			const r = i.lengthSq();
			return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0)
		}
		static getBarycoord(t, e, n, i, r) {
			zc.subVectors(i, e), Bc.subVectors(n, e), Fc.subVectors(t, e);
			const s = zc.dot(zc),
				a = zc.dot(Bc),
				o = zc.dot(Fc),
				l = Bc.dot(Bc),
				c = Bc.dot(Fc),
				h = s * l - a * a;
			if (0 === h) return r.set(-2, -1, -1);
			const u = 1 / h,
				d = (l * o - a * c) * u,
				p = (s * c - a * o) * u;
			return r.set(1 - d - p, p, d)
		}
		static containsPoint(t, e, n, i) {
			return this.getBarycoord(t, e, n, i, kc), kc.x >= 0 && kc.y >= 0 && kc.x + kc.y <= 1
		}
		static getUV(t, e, n, i, r, s, a, o) {
			return this.getBarycoord(t, e, n, i, kc), o.set(0, 0), o.addScaledVector(r, kc.x), o.addScaledVector(s, kc.y), o.addScaledVector(a, kc.z), o
		}
		static isFrontFacing(t, e, n, i) {
			return zc.subVectors(n, e), Bc.subVectors(t, e), zc.cross(Bc).dot(i) < 0
		}
		set(t, e, n) {
			return this.a.copy(t), this.b.copy(e), this.c.copy(n), this
		}
		setFromPointsAndIndices(t, e, n, i) {
			return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[i]), this
		}
		setFromAttributeAndIndices(t, e, n, i) {
			return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, i), this
		}
		clone() {
			return (new this.constructor).copy(this)
		}
		copy(t) {
			return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this
		}
		getArea() {
			return zc.subVectors(this.c, this.b), Bc.subVectors(this.a, this.b), .5 * zc.cross(Bc).length()
		}
		getMidpoint(t) {
			return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
		}
		getNormal(t) {
			return jc.getNormal(this.a, this.b, this.c, t)
		}
		getPlane(t) {
			return t.setFromCoplanarPoints(this.a, this.b, this.c)
		}
		getBarycoord(t, e) {
			return jc.getBarycoord(t, this.a, this.b, this.c, e)
		}
		getUV(t, e, n, i, r) {
			return jc.getUV(t, this.a, this.b, this.c, e, n, i, r)
		}
		containsPoint(t) {
			return jc.containsPoint(t, this.a, this.b, this.c)
		}
		isFrontFacing(t) {
			return jc.isFrontFacing(this.a, this.b, this.c, t)
		}
		intersectsBox(t) {
			return t.intersectsTriangle(this)
		}
		closestPointToPoint(t, e) {
			const n = this.a,
				i = this.b,
				r = this.c;
			let s, a;
			Uc.subVectors(i, n), Hc.subVectors(r, n), Vc.subVectors(t, n);
			const o = Uc.dot(Vc),
				l = Hc.dot(Vc);
			if (o <= 0 && l <= 0) return e.copy(n);
			Wc.subVectors(t, i);
			const c = Uc.dot(Wc),
				h = Hc.dot(Wc);
			if (c >= 0 && h <= c) return e.copy(i);
			const u = o * h - c * l;
			if (u <= 0 && o >= 0 && c <= 0) return s = o / (o - c), e.copy(n).addScaledVector(Uc, s);
			qc.subVectors(t, r);
			const d = Uc.dot(qc),
				p = Hc.dot(qc);
			if (p >= 0 && d <= p) return e.copy(r);
			const m = d * l - o * p;
			if (m <= 0 && l >= 0 && p <= 0) return a = l / (l - p), e.copy(n).addScaledVector(Hc, a);
			const f = c * p - d * h;
			if (f <= 0 && h - c >= 0 && d - p >= 0) return Gc.subVectors(r, i), a = (h - c) / (h - c + (d - p)), e.copy(i).addScaledVector(Gc, a);
			const g = 1 / (f + m + u);
			return s = m * g, a = u * g, e.copy(n).addScaledVector(Uc, s).addScaledVector(Hc, a)
		}
		equals(t) {
			return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c)
		}
	}
	let Xc = 0;
	class Yc extends hl {
		constructor() {
			super(), Object.defineProperty(this, "id", {
				value: Xc++
			}), this.uuid = ml(), this.name = "", this.type = "Material", this.fog = !0, this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.format = jo, this.transparent = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = Co, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = al, this.stencilZFail = al, this.stencilZPass = al, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0
		}
		get alphaTest() {
			return this._alphaTest
		}
		set alphaTest(t) {
			this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t
		}
		onBuild() {}
		onBeforeRender() {}
		onBeforeCompile() {}
		customProgramCacheKey() {
			return this.onBeforeCompile.toString()
		}
		setValues(t) {
			if (void 0 !== t)
				for (const e in t) {
					const n = t[e];
					if (void 0 === n) {
						console.warn("THREE.Material: '" + e + "' parameter is undefined.");
						continue
					}
					if ("shading" === e) {
						console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = 1 === n;
						continue
					}
					const i = this[e];
					void 0 !== i ? i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : this[e] = n : console.warn("THREE." + this.type + ": '" + e + "' is not a property of this material.")
				}
		}
		toJSON(t) {
			const e = void 0 === t || "string" == typeof t;
			e && (t = {
				textures: {},
				images: {}
			});
			const n = {
				metadata: {
					version: 4.5,
					type: "Material",
					generator: "Material.toJSON"
				}
			};

			function i(t) {
				const e = [];
				for (const n in t) {
					const i = t[n];
					delete i.metadata, e.push(i)
				}
				return e
			}
			if (n.uuid = this.uuid, n.type = this.type, "" !== this.name && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), void 0 !== this.roughness && (n.roughness = this.roughness), void 0 !== this.metalness && (n.metalness = this.metalness), void 0 !== this.sheen && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), void 0 !== this.sheenRoughness && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity && 1 !== this.emissiveIntensity && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), void 0 !== this.specularIntensity && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), void 0 !== this.shininess && (n.shininess = this.shininess), void 0 !== this.clearcoat && (n.clearcoat = this.clearcoat), void 0 !== this.clearcoatRoughness && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, void 0 !== this.combine && (n.combine = this.combine)), void 0 !== this.envMapIntensity && (n.envMapIntensity = this.envMapIntensity), void 0 !== this.reflectivity && (n.reflectivity = this.reflectivity), void 0 !== this.refractionRatio && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), void 0 !== this.transmission && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), void 0 !== this.thickness && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), void 0 !== this.attenuationDistance && (n.attenuationDistance = this.attenuationDistance), void 0 !== this.attenuationColor && (n.attenuationColor = this.attenuationColor.getHex()), void 0 !== this.size && (n.size = this.size), null !== this.shadowSide && (n.shadowSide = this.shadowSide), void 0 !== this.sizeAttenuation && (n.sizeAttenuation = this.sizeAttenuation), 1 !== this.blending && (n.blending = this.blending), 0 !== this.side && (n.side = this.side), this.vertexColors && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.format !== jo && (n.format = this.format), !0 === this.transparent && (n.transparent = this.transparent), n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.colorWrite = this.colorWrite, n.stencilWrite = this.stencilWrite, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, this.rotation && 0 !== this.rotation && (n.rotation = this.rotation), !0 === this.polygonOffset && (n.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (n.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth && 1 !== this.linewidth && (n.linewidth = this.linewidth), void 0 !== this.dashSize && (n.dashSize = this.dashSize), void 0 !== this.gapSize && (n.gapSize = this.gapSize), void 0 !== this.scale && (n.scale = this.scale), !0 === this.dithering && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), !0 === this.alphaToCoverage && (n.alphaToCoverage = this.alphaToCoverage), !0 === this.premultipliedAlpha && (n.premultipliedAlpha = this.premultipliedAlpha), !0 === this.wireframe && (n.wireframe = this.wireframe), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (n.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (n.wireframeLinejoin = this.wireframeLinejoin), !0 === this.flatShading && (n.flatShading = this.flatShading), !1 === this.visible && (n.visible = !1), !1 === this.toneMapped && (n.toneMapped = !1), "{}" !== JSON.stringify(this.userData) && (n.userData = this.userData), e) {
				const e = i(t.textures),
					r = i(t.images);
				e.length > 0 && (n.textures = e), r.length > 0 && (n.images = r)
			}
			return n
		}
		clone() {
			return (new this.constructor).copy(this)
		}
		copy(t) {
			this.name = t.name, this.fog = t.fog, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.format = t.format, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
			const e = t.clippingPlanes;
			let n = null;
			if (null !== e) {
				const t = e.length;
				n = new Array(t);
				for (let i = 0; i !== t; ++i) n[i] = e[i].clone()
			}
			return this.clippingPlanes = n, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this
		}
		dispose() {
			this.dispatchEvent({
				type: "dispose"
			})
		}
		set needsUpdate(t) {
			!0 === t && this.version++
		}
	}
	Yc.prototype.isMaterial = !0;
	const Jc = {
			aliceblue: 15792383,
			antiquewhite: 16444375,
			aqua: 65535,
			aquamarine: 8388564,
			azure: 15794175,
			beige: 16119260,
			bisque: 16770244,
			black: 0,
			blanchedalmond: 16772045,
			blue: 255,
			blueviolet: 9055202,
			brown: 10824234,
			burlywood: 14596231,
			cadetblue: 6266528,
			chartreuse: 8388352,
			chocolate: 13789470,
			coral: 16744272,
			cornflowerblue: 6591981,
			cornsilk: 16775388,
			crimson: 14423100,
			cyan: 65535,
			darkblue: 139,
			darkcyan: 35723,
			darkgoldenrod: 12092939,
			darkgray: 11119017,
			darkgreen: 25600,
			darkgrey: 11119017,
			darkkhaki: 12433259,
			darkmagenta: 9109643,
			darkolivegreen: 5597999,
			darkorange: 16747520,
			darkorchid: 10040012,
			darkred: 9109504,
			darksalmon: 15308410,
			darkseagreen: 9419919,
			darkslateblue: 4734347,
			darkslategray: 3100495,
			darkslategrey: 3100495,
			darkturquoise: 52945,
			darkviolet: 9699539,
			deeppink: 16716947,
			deepskyblue: 49151,
			dimgray: 6908265,
			dimgrey: 6908265,
			dodgerblue: 2003199,
			firebrick: 11674146,
			floralwhite: 16775920,
			forestgreen: 2263842,
			fuchsia: 16711935,
			gainsboro: 14474460,
			ghostwhite: 16316671,
			gold: 16766720,
			goldenrod: 14329120,
			gray: 8421504,
			green: 32768,
			greenyellow: 11403055,
			grey: 8421504,
			honeydew: 15794160,
			hotpink: 16738740,
			indianred: 13458524,
			indigo: 4915330,
			ivory: 16777200,
			khaki: 15787660,
			lavender: 15132410,
			lavenderblush: 16773365,
			lawngreen: 8190976,
			lemonchiffon: 16775885,
			lightblue: 11393254,
			lightcoral: 15761536,
			lightcyan: 14745599,
			lightgoldenrodyellow: 16448210,
			lightgray: 13882323,
			lightgreen: 9498256,
			lightgrey: 13882323,
			lightpink: 16758465,
			lightsalmon: 16752762,
			lightseagreen: 2142890,
			lightskyblue: 8900346,
			lightslategray: 7833753,
			lightslategrey: 7833753,
			lightsteelblue: 11584734,
			lightyellow: 16777184,
			lime: 65280,
			limegreen: 3329330,
			linen: 16445670,
			magenta: 16711935,
			maroon: 8388608,
			mediumaquamarine: 6737322,
			mediumblue: 205,
			mediumorchid: 12211667,
			mediumpurple: 9662683,
			mediumseagreen: 3978097,
			mediumslateblue: 8087790,
			mediumspringgreen: 64154,
			mediumturquoise: 4772300,
			mediumvioletred: 13047173,
			midnightblue: 1644912,
			mintcream: 16121850,
			mistyrose: 16770273,
			moccasin: 16770229,
			navajowhite: 16768685,
			navy: 128,
			oldlace: 16643558,
			olive: 8421376,
			olivedrab: 7048739,
			orange: 16753920,
			orangered: 16729344,
			orchid: 14315734,
			palegoldenrod: 15657130,
			palegreen: 10025880,
			paleturquoise: 11529966,
			palevioletred: 14381203,
			papayawhip: 16773077,
			peachpuff: 16767673,
			peru: 13468991,
			pink: 16761035,
			plum: 14524637,
			powderblue: 11591910,
			purple: 8388736,
			rebeccapurple: 6697881,
			red: 16711680,
			rosybrown: 12357519,
			royalblue: 4286945,
			saddlebrown: 9127187,
			salmon: 16416882,
			sandybrown: 16032864,
			seagreen: 3050327,
			seashell: 16774638,
			sienna: 10506797,
			silver: 12632256,
			skyblue: 8900331,
			slateblue: 6970061,
			slategray: 7372944,
			slategrey: 7372944,
			snow: 16775930,
			springgreen: 65407,
			steelblue: 4620980,
			tan: 13808780,
			teal: 32896,
			thistle: 14204888,
			tomato: 16737095,
			turquoise: 4251856,
			violet: 15631086,
			wheat: 16113331,
			white: 16777215,
			whitesmoke: 16119285,
			yellow: 16776960,
			yellowgreen: 10145074
		},
		Zc = {
			h: 0,
			s: 0,
			l: 0
		},
		Qc = {
			h: 0,
			s: 0,
			l: 0
		};

	function Kc(t, e, n) {
		return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - n) : t
	}

	function $c(t) {
		return t < .04045 ? .0773993808 * t : Math.pow(.9478672986 * t + .0521327014, 2.4)
	}

	function th(t) {
		return t < .0031308 ? 12.92 * t : 1.055 * Math.pow(t, .41666) - .055
	}
	class eh {
		constructor(t, e, n) {
			return void 0 === e && void 0 === n ? this.set(t) : this.setRGB(t, e, n)
		}
		set(t) {
			return t && t.isColor ? this.copy(t) : "number" == typeof t ? this.setHex(t) : "string" == typeof t && this.setStyle(t), this
		}
		setScalar(t) {
			return this.r = t, this.g = t, this.b = t, this
		}
		setHex(t) {
			return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (255 & t) / 255, this
		}
		setRGB(t, e, n) {
			return this.r = t, this.g = e, this.b = n, this
		}
		setHSL(t, e, n) {
			if (t = function (t, e) {
					return (t % e + e) % e
				}(t, 1), e = fl(e, 0, 1), n = fl(n, 0, 1), 0 === e) this.r = this.g = this.b = n;
			else {
				const i = n <= .5 ? n * (1 + e) : n + e - n * e,
					r = 2 * n - i;
				this.r = Kc(r, i, t + 1 / 3), this.g = Kc(r, i, t), this.b = Kc(r, i, t - 1 / 3)
			}
			return this
		}
		setStyle(t) {
			function e(e) {
				void 0 !== e && parseFloat(e) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.")
			}
			let n;
			if (n = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)) {
				let t;
				const i = n[1],
					r = n[2];
				switch (i) {
					case "rgb":
					case "rgba":
						if (t = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)) return this.r = Math.min(255, parseInt(t[1], 10)) / 255, this.g = Math.min(255, parseInt(t[2], 10)) / 255, this.b = Math.min(255, parseInt(t[3], 10)) / 255, e(t[4]), this;
						if (t = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)) return this.r = Math.min(100, parseInt(t[1], 10)) / 100, this.g = Math.min(100, parseInt(t[2], 10)) / 100, this.b = Math.min(100, parseInt(t[3], 10)) / 100, e(t[4]), this;
						break;
					case "hsl":
					case "hsla":
						if (t = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r)) {
							const n = parseFloat(t[1]) / 360,
								i = parseInt(t[2], 10) / 100,
								r = parseInt(t[3], 10) / 100;
							return e(t[4]), this.setHSL(n, i, r)
						}
				}
			} else if (n = /^\#([A-Fa-f\d]+)$/.exec(t)) {
				const t = n[1],
					e = t.length;
				if (3 === e) return this.r = parseInt(t.charAt(0) + t.charAt(0), 16) / 255, this.g = parseInt(t.charAt(1) + t.charAt(1), 16) / 255, this.b = parseInt(t.charAt(2) + t.charAt(2), 16) / 255, this;
				if (6 === e) return this.r = parseInt(t.charAt(0) + t.charAt(1), 16) / 255, this.g = parseInt(t.charAt(2) + t.charAt(3), 16) / 255, this.b = parseInt(t.charAt(4) + t.charAt(5), 16) / 255, this
			}
			return t && t.length > 0 ? this.setColorName(t) : this
		}
		setColorName(t) {
			const e = Jc[t.toLowerCase()];
			return void 0 !== e ? this.setHex(e) : console.warn("THREE.Color: Unknown color " + t), this
		}
		clone() {
			return new this.constructor(this.r, this.g, this.b)
		}
		copy(t) {
			return this.r = t.r, this.g = t.g, this.b = t.b, this
		}
		copyGammaToLinear(t, e = 2) {
			return this.r = Math.pow(t.r, e), this.g = Math.pow(t.g, e), this.b = Math.pow(t.b, e), this
		}
		copyLinearToGamma(t, e = 2) {
			const n = e > 0 ? 1 / e : 1;
			return this.r = Math.pow(t.r, n), this.g = Math.pow(t.g, n), this.b = Math.pow(t.b, n), this
		}
		convertGammaToLinear(t) {
			return this.copyGammaToLinear(this, t), this
		}
		convertLinearToGamma(t) {
			return this.copyLinearToGamma(this, t), this
		}
		copySRGBToLinear(t) {
			return this.r = $c(t.r), this.g = $c(t.g), this.b = $c(t.b), this
		}
		copyLinearToSRGB(t) {
			return this.r = th(t.r), this.g = th(t.g), this.b = th(t.b), this
		}
		convertSRGBToLinear() {
			return this.copySRGBToLinear(this), this
		}
		convertLinearToSRGB() {
			return this.copyLinearToSRGB(this), this
		}
		getHex() {
			return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
		}
		getHexString() {
			return ("000000" + this.getHex().toString(16)).slice(-6)
		}
		getHSL(t) {
			const e = this.r,
				n = this.g,
				i = this.b,
				r = Math.max(e, n, i),
				s = Math.min(e, n, i);
			let a, o;
			const l = (s + r) / 2;
			if (s === r) a = 0, o = 0;
			else {
				const t = r - s;
				switch (o = l <= .5 ? t / (r + s) : t / (2 - r - s), r) {
					case e:
						a = (n - i) / t + (n < i ? 6 : 0);
						break;
					case n:
						a = (i - e) / t + 2;
						break;
					case i:
						a = (e - n) / t + 4
				}
				a /= 6
			}
			return t.h = a, t.s = o, t.l = l, t
		}
		getStyle() {
			return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
		}
		offsetHSL(t, e, n) {
			return this.getHSL(Zc), Zc.h += t, Zc.s += e, Zc.l += n, this.setHSL(Zc.h, Zc.s, Zc.l), this
		}
		add(t) {
			return this.r += t.r, this.g += t.g, this.b += t.b, this
		}
		addColors(t, e) {
			return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this
		}
		addScalar(t) {
			return this.r += t, this.g += t, this.b += t, this
		}
		sub(t) {
			return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this
		}
		multiply(t) {
			return this.r *= t.r, this.g *= t.g, this.b *= t.b, this
		}
		multiplyScalar(t) {
			return this.r *= t, this.g *= t, this.b *= t, this
		}
		lerp(t, e) {
			return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this
		}
		lerpColors(t, e, n) {
			return this.r = t.r + (e.r - t.r) * n, this.g = t.g + (e.g - t.g) * n, this.b = t.b + (e.b - t.b) * n, this
		}
		lerpHSL(t, e) {
			this.getHSL(Zc), t.getHSL(Qc);
			const n = gl(Zc.h, Qc.h, e),
				i = gl(Zc.s, Qc.s, e),
				r = gl(Zc.l, Qc.l, e);
			return this.setHSL(n, i, r), this
		}
		equals(t) {
			return t.r === this.r && t.g === this.g && t.b === this.b
		}
		fromArray(t, e = 0) {
			return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this
		}
		toArray(t = [], e = 0) {
			return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t
		}
		fromBufferAttribute(t, e) {
			return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), !0 === t.normalized && (this.r /= 255, this.g /= 255, this.b /= 255), this
		}
		toJSON() {
			return this.getHex()
		}
	}
	eh.NAMES = Jc, eh.prototype.isColor = !0, eh.prototype.r = 1, eh.prototype.g = 1, eh.prototype.b = 1;
	class nh extends Yc {
		constructor(t) {
			super(), this.type = "MeshBasicMaterial", this.color = new eh(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this
		}
	}
	nh.prototype.isMeshBasicMaterial = !0;
	const ih = new Il,
		rh = new _l;
	class sh {
		constructor(t, e, n) {
			if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
			this.name = "", this.array = t, this.itemSize = e, this.count = void 0 !== t ? t.length / e : 0, this.normalized = !0 === n, this.usage = ol, this.updateRange = {
				offset: 0,
				count: -1
			}, this.version = 0
		}
		onUploadCallback() {}
		set needsUpdate(t) {
			!0 === t && this.version++
		}
		setUsage(t) {
			return this.usage = t, this
		}
		copy(t) {
			return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this
		}
		copyAt(t, e, n) {
			t *= this.itemSize, n *= e.itemSize;
			for (let i = 0, r = this.itemSize; i < r; i++) this.array[t + i] = e.array[n + i];
			return this
		}
		copyArray(t) {
			return this.array.set(t), this
		}
		copyColorsArray(t) {
			const e = this.array;
			let n = 0;
			for (let i = 0, r = t.length; i < r; i++) {
				let r = t[i];
				void 0 === r && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", i), r = new eh), e[n++] = r.r, e[n++] = r.g, e[n++] = r.b
			}
			return this
		}
		copyVector2sArray(t) {
			const e = this.array;
			let n = 0;
			for (let i = 0, r = t.length; i < r; i++) {
				let r = t[i];
				void 0 === r && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", i), r = new _l), e[n++] = r.x, e[n++] = r.y
			}
			return this
		}
		copyVector3sArray(t) {
			const e = this.array;
			let n = 0;
			for (let i = 0, r = t.length; i < r; i++) {
				let r = t[i];
				void 0 === r && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", i), r = new Il), e[n++] = r.x, e[n++] = r.y, e[n++] = r.z
			}
			return this
		}
		copyVector4sArray(t) {
			const e = this.array;
			let n = 0;
			for (let i = 0, r = t.length; i < r; i++) {
				let r = t[i];
				void 0 === r && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", i), r = new Cl), e[n++] = r.x, e[n++] = r.y, e[n++] = r.z, e[n++] = r.w
			}
			return this
		}
		applyMatrix3(t) {
			if (2 === this.itemSize)
				for (let e = 0, n = this.count; e < n; e++) rh.fromBufferAttribute(this, e), rh.applyMatrix3(t), this.setXY(e, rh.x, rh.y);
			else if (3 === this.itemSize)
				for (let e = 0, n = this.count; e < n; e++) ih.fromBufferAttribute(this, e), ih.applyMatrix3(t), this.setXYZ(e, ih.x, ih.y, ih.z);
			return this
		}
		applyMatrix4(t) {
			for (let e = 0, n = this.count; e < n; e++) ih.x = this.getX(e), ih.y = this.getY(e), ih.z = this.getZ(e), ih.applyMatrix4(t), this.setXYZ(e, ih.x, ih.y, ih.z);
			return this
		}
		applyNormalMatrix(t) {
			for (let e = 0, n = this.count; e < n; e++) ih.x = this.getX(e), ih.y = this.getY(e), ih.z = this.getZ(e), ih.applyNormalMatrix(t), this.setXYZ(e, ih.x, ih.y, ih.z);
			return this
		}
		transformDirection(t) {
			for (let e = 0, n = this.count; e < n; e++) ih.x = this.getX(e), ih.y = this.getY(e), ih.z = this.getZ(e), ih.transformDirection(t), this.setXYZ(e, ih.x, ih.y, ih.z);
			return this
		}
		set(t, e = 0) {
			return this.array.set(t, e), this
		}
		getX(t) {
			return this.array[t * this.itemSize]
		}
		setX(t, e) {
			return this.array[t * this.itemSize] = e, this
		}
		getY(t) {
			return this.array[t * this.itemSize + 1]
		}
		setY(t, e) {
			return this.array[t * this.itemSize + 1] = e, this
		}
		getZ(t) {
			return this.array[t * this.itemSize + 2]
		}
		setZ(t, e) {
			return this.array[t * this.itemSize + 2] = e, this
		}
		getW(t) {
			return this.array[t * this.itemSize + 3]
		}
		setW(t, e) {
			return this.array[t * this.itemSize + 3] = e, this
		}
		setXY(t, e, n) {
			return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = n, this
		}
		setXYZ(t, e, n, i) {
			return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = i, this
		}
		setXYZW(t, e, n, i, r) {
			return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = i, this.array[t + 3] = r, this
		}
		onUpload(t) {
			return this.onUploadCallback = t, this
		}
		clone() {
			return new this.constructor(this.array, this.itemSize).copy(this)
		}
		toJSON() {
			const t = {
				itemSize: this.itemSize,
				type: this.array.constructor.name,
				array: Array.prototype.slice.call(this.array),
				normalized: this.normalized
			};
			return "" !== this.name && (t.name = this.name), this.usage !== ol && (t.usage = this.usage), 0 === this.updateRange.offset && -1 === this.updateRange.count || (t.updateRange = this.updateRange), t
		}
	}
	sh.prototype.isBufferAttribute = !0;
	class ah extends sh {
		constructor(t, e, n) {
			super(new Uint16Array(t), e, n)
		}
	}
	class oh extends sh {
		constructor(t, e, n) {
			super(new Uint32Array(t), e, n)
		}
	}(class extends sh {
		constructor(t, e, n) {
			super(new Uint16Array(t), e, n)
		}
	}).prototype.isFloat16BufferAttribute = !0;
	class lh extends sh {
		constructor(t, e, n) {
			super(new Float32Array(t), e, n)
		}
	}
	let ch = 0;
	const hh = new hc,
		uh = new Nc,
		dh = new Il,
		ph = new zl,
		mh = new zl,
		fh = new Il;
	class gh extends hl {
		constructor() {
			super(), Object.defineProperty(this, "id", {
				value: ch++
			}), this.uuid = ml(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
				start: 0,
				count: 1 / 0
			}, this.userData = {}
		}
		getIndex() {
			return this.index
		}
		setIndex(t) {
			return Array.isArray(t) ? this.index = new(wl(t) > 65535 ? oh : ah)(t, 1) : this.index = t, this
		}
		getAttribute(t) {
			return this.attributes[t]
		}
		setAttribute(t, e) {
			return this.attributes[t] = e, this
		}
		deleteAttribute(t) {
			return delete this.attributes[t], this
		}
		hasAttribute(t) {
			return void 0 !== this.attributes[t]
		}
		addGroup(t, e, n = 0) {
			this.groups.push({
				start: t,
				count: e,
				materialIndex: n
			})
		}
		clearGroups() {
			this.groups = []
		}
		setDrawRange(t, e) {
			this.drawRange.start = t, this.drawRange.count = e
		}
		applyMatrix4(t) {
			const e = this.attributes.position;
			void 0 !== e && (e.applyMatrix4(t), e.needsUpdate = !0);
			const n = this.attributes.normal;
			if (void 0 !== n) {
				const e = (new xl).getNormalMatrix(t);
				n.applyNormalMatrix(e), n.needsUpdate = !0
			}
			const i = this.attributes.tangent;
			return void 0 !== i && (i.transformDirection(t), i.needsUpdate = !0), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this
		}
		applyQuaternion(t) {
			return hh.makeRotationFromQuaternion(t), this.applyMatrix4(hh), this
		}
		rotateX(t) {
			return hh.makeRotationX(t), this.applyMatrix4(hh), this
		}
		rotateY(t) {
			return hh.makeRotationY(t), this.applyMatrix4(hh), this
		}
		rotateZ(t) {
			return hh.makeRotationZ(t), this.applyMatrix4(hh), this
		}
		translate(t, e, n) {
			return hh.makeTranslation(t, e, n), this.applyMatrix4(hh), this
		}
		scale(t, e, n) {
			return hh.makeScale(t, e, n), this.applyMatrix4(hh), this
		}
		lookAt(t) {
			return uh.lookAt(t), uh.updateMatrix(), this.applyMatrix4(uh.matrix), this
		}
		center() {
			return this.computeBoundingBox(), this.boundingBox.getCenter(dh).negate(), this.translate(dh.x, dh.y, dh.z), this
		}
		setFromPoints(t) {
			const e = [];
			for (let n = 0, i = t.length; n < i; n++) {
				const i = t[n];
				e.push(i.x, i.y, i.z || 0)
			}
			return this.setAttribute("position", new lh(e, 3)), this
		}
		computeBoundingBox() {
			null === this.boundingBox && (this.boundingBox = new zl);
			const t = this.attributes.position,
				e = this.morphAttributes.position;
			if (t && t.isGLBufferAttribute) return console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), void this.boundingBox.set(new Il(-1 / 0, -1 / 0, -1 / 0), new Il(1 / 0, 1 / 0, 1 / 0));
			if (void 0 !== t) {
				if (this.boundingBox.setFromBufferAttribute(t), e)
					for (let t = 0, n = e.length; t < n; t++) {
						const n = e[t];
						ph.setFromBufferAttribute(n), this.morphTargetsRelative ? (fh.addVectors(this.boundingBox.min, ph.min), this.boundingBox.expandByPoint(fh), fh.addVectors(this.boundingBox.max, ph.max), this.boundingBox.expandByPoint(fh)) : (this.boundingBox.expandByPoint(ph.min), this.boundingBox.expandByPoint(ph.max))
					}
			} else this.boundingBox.makeEmpty();
			(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
		}
		computeBoundingSphere() {
			null === this.boundingSphere && (this.boundingSphere = new ec);
			const t = this.attributes.position,
				e = this.morphAttributes.position;
			if (t && t.isGLBufferAttribute) return console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), void this.boundingSphere.set(new Il, 1 / 0);
			if (t) {
				const n = this.boundingSphere.center;
				if (ph.setFromBufferAttribute(t), e)
					for (let t = 0, n = e.length; t < n; t++) {
						const n = e[t];
						mh.setFromBufferAttribute(n), this.morphTargetsRelative ? (fh.addVectors(ph.min, mh.min), ph.expandByPoint(fh), fh.addVectors(ph.max, mh.max), ph.expandByPoint(fh)) : (ph.expandByPoint(mh.min), ph.expandByPoint(mh.max))
					}
				ph.getCenter(n);
				let i = 0;
				for (let e = 0, r = t.count; e < r; e++) fh.fromBufferAttribute(t, e), i = Math.max(i, n.distanceToSquared(fh));
				if (e)
					for (let r = 0, s = e.length; r < s; r++) {
						const s = e[r],
							a = this.morphTargetsRelative;
						for (let e = 0, r = s.count; e < r; e++) fh.fromBufferAttribute(s, e), a && (dh.fromBufferAttribute(t, e), fh.add(dh)), i = Math.max(i, n.distanceToSquared(fh))
					}
				this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
			}
		}
		computeTangents() {
			const t = this.index,
				e = this.attributes;
			if (null === t || void 0 === e.position || void 0 === e.normal || void 0 === e.uv) return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
			const n = t.array,
				i = e.position.array,
				r = e.normal.array,
				s = e.uv.array,
				a = i.length / 3;
			void 0 === e.tangent && this.setAttribute("tangent", new sh(new Float32Array(4 * a), 4));
			const o = e.tangent.array,
				l = [],
				c = [];
			for (let t = 0; t < a; t++) l[t] = new Il, c[t] = new Il;
			const h = new Il,
				u = new Il,
				d = new Il,
				p = new _l,
				m = new _l,
				f = new _l,
				g = new Il,
				v = new Il;

			function y(t, e, n) {
				h.fromArray(i, 3 * t), u.fromArray(i, 3 * e), d.fromArray(i, 3 * n), p.fromArray(s, 2 * t), m.fromArray(s, 2 * e), f.fromArray(s, 2 * n), u.sub(h), d.sub(h), m.sub(p), f.sub(p);
				const r = 1 / (m.x * f.y - f.x * m.y);
				isFinite(r) && (g.copy(u).multiplyScalar(f.y).addScaledVector(d, -m.y).multiplyScalar(r), v.copy(d).multiplyScalar(m.x).addScaledVector(u, -f.x).multiplyScalar(r), l[t].add(g), l[e].add(g), l[n].add(g), c[t].add(v), c[e].add(v), c[n].add(v))
			}
			let _ = this.groups;
			0 === _.length && (_ = [{
				start: 0,
				count: n.length
			}]);
			for (let t = 0, e = _.length; t < e; ++t) {
				const e = _[t],
					i = e.start;
				for (let t = i, r = i + e.count; t < r; t += 3) y(n[t + 0], n[t + 1], n[t + 2])
			}
			const x = new Il,
				w = new Il,
				b = new Il,
				M = new Il;

			function S(t) {
				b.fromArray(r, 3 * t), M.copy(b);
				const e = l[t];
				x.copy(e), x.sub(b.multiplyScalar(b.dot(e))).normalize(), w.crossVectors(M, e);
				const n = w.dot(c[t]) < 0 ? -1 : 1;
				o[4 * t] = x.x, o[4 * t + 1] = x.y, o[4 * t + 2] = x.z, o[4 * t + 3] = n
			}
			for (let t = 0, e = _.length; t < e; ++t) {
				const e = _[t],
					i = e.start;
				for (let t = i, r = i + e.count; t < r; t += 3) S(n[t + 0]), S(n[t + 1]), S(n[t + 2])
			}
		}
		computeVertexNormals() {
			const t = this.index,
				e = this.getAttribute("position");
			if (void 0 !== e) {
				let n = this.getAttribute("normal");
				if (void 0 === n) n = new sh(new Float32Array(3 * e.count), 3), this.setAttribute("normal", n);
				else
					for (let t = 0, e = n.count; t < e; t++) n.setXYZ(t, 0, 0, 0);
				const i = new Il,
					r = new Il,
					s = new Il,
					a = new Il,
					o = new Il,
					l = new Il,
					c = new Il,
					h = new Il;
				if (t)
					for (let u = 0, d = t.count; u < d; u += 3) {
						const d = t.getX(u + 0),
							p = t.getX(u + 1),
							m = t.getX(u + 2);
						i.fromBufferAttribute(e, d), r.fromBufferAttribute(e, p), s.fromBufferAttribute(e, m), c.subVectors(s, r), h.subVectors(i, r), c.cross(h), a.fromBufferAttribute(n, d), o.fromBufferAttribute(n, p), l.fromBufferAttribute(n, m), a.add(c), o.add(c), l.add(c), n.setXYZ(d, a.x, a.y, a.z), n.setXYZ(p, o.x, o.y, o.z), n.setXYZ(m, l.x, l.y, l.z)
					} else
						for (let t = 0, a = e.count; t < a; t += 3) i.fromBufferAttribute(e, t + 0), r.fromBufferAttribute(e, t + 1), s.fromBufferAttribute(e, t + 2), c.subVectors(s, r), h.subVectors(i, r), c.cross(h), n.setXYZ(t + 0, c.x, c.y, c.z), n.setXYZ(t + 1, c.x, c.y, c.z), n.setXYZ(t + 2, c.x, c.y, c.z);
				this.normalizeNormals(), n.needsUpdate = !0
			}
		}
		merge(t, e) {
			if (!t || !t.isBufferGeometry) return void console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", t);
			void 0 === e && (e = 0, console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
			const n = this.attributes;
			for (const i in n) {
				if (void 0 === t.attributes[i]) continue;
				const r = n[i].array,
					s = t.attributes[i],
					a = s.array,
					o = s.itemSize * e,
					l = Math.min(a.length, r.length - o);
				for (let t = 0, e = o; t < l; t++, e++) r[e] = a[t]
			}
			return this
		}
		normalizeNormals() {
			const t = this.attributes.normal;
			for (let e = 0, n = t.count; e < n; e++) fh.fromBufferAttribute(t, e), fh.normalize(), t.setXYZ(e, fh.x, fh.y, fh.z)
		}
		toNonIndexed() {
			function t(t, e) {
				const n = t.array,
					i = t.itemSize,
					r = t.normalized,
					s = new n.constructor(e.length * i);
				let a = 0,
					o = 0;
				for (let r = 0, l = e.length; r < l; r++) {
					a = t.isInterleavedBufferAttribute ? e[r] * t.data.stride + t.offset : e[r] * i;
					for (let t = 0; t < i; t++) s[o++] = n[a++]
				}
				return new sh(s, i, r)
			}
			if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
			const e = new gh,
				n = this.index.array,
				i = this.attributes;
			for (const r in i) {
				const s = t(i[r], n);
				e.setAttribute(r, s)
			}
			const r = this.morphAttributes;
			for (const i in r) {
				const s = [],
					a = r[i];
				for (let e = 0, i = a.length; e < i; e++) {
					const i = t(a[e], n);
					s.push(i)
				}
				e.morphAttributes[i] = s
			}
			e.morphTargetsRelative = this.morphTargetsRelative;
			const s = this.groups;
			for (let t = 0, n = s.length; t < n; t++) {
				const n = s[t];
				e.addGroup(n.start, n.count, n.materialIndex)
			}
			return e
		}
		toJSON() {
			const t = {
				metadata: {
					version: 4.5,
					type: "BufferGeometry",
					generator: "BufferGeometry.toJSON"
				}
			};
			if (t.uuid = this.uuid, t.type = this.type, "" !== this.name && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), void 0 !== this.parameters) {
				const e = this.parameters;
				for (const n in e) void 0 !== e[n] && (t[n] = e[n]);
				return t
			}
			t.data = {
				attributes: {}
			};
			const e = this.index;
			null !== e && (t.data.index = {
				type: e.array.constructor.name,
				array: Array.prototype.slice.call(e.array)
			});
			const n = this.attributes;
			for (const e in n) {
				const i = n[e];
				t.data.attributes[e] = i.toJSON(t.data)
			}
			const i = {};
			let r = !1;
			for (const e in this.morphAttributes) {
				const n = this.morphAttributes[e],
					s = [];
				for (let e = 0, i = n.length; e < i; e++) {
					const i = n[e];
					s.push(i.toJSON(t.data))
				}
				s.length > 0 && (i[e] = s, r = !0)
			}
			r && (t.data.morphAttributes = i, t.data.morphTargetsRelative = this.morphTargetsRelative);
			const s = this.groups;
			s.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(s)));
			const a = this.boundingSphere;
			return null !== a && (t.data.boundingSphere = {
				center: a.center.toArray(),
				radius: a.radius
			}), t
		}
		clone() {
			return (new this.constructor).copy(this)
		}
		copy(t) {
			this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
			const e = {};
			this.name = t.name;
			const n = t.index;
			null !== n && this.setIndex(n.clone(e));
			const i = t.attributes;
			for (const t in i) {
				const n = i[t];
				this.setAttribute(t, n.clone(e))
			}
			const r = t.morphAttributes;
			for (const t in r) {
				const n = [],
					i = r[t];
				for (let t = 0, r = i.length; t < r; t++) n.push(i[t].clone(e));
				this.morphAttributes[t] = n
			}
			this.morphTargetsRelative = t.morphTargetsRelative;
			const s = t.groups;
			for (let t = 0, e = s.length; t < e; t++) {
				const e = s[t];
				this.addGroup(e.start, e.count, e.materialIndex)
			}
			const a = t.boundingBox;
			null !== a && (this.boundingBox = a.clone());
			const o = t.boundingSphere;
			return null !== o && (this.boundingSphere = o.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, void 0 !== t.parameters && (this.parameters = Object.assign({}, t.parameters)), this
		}
		dispose() {
			this.dispatchEvent({
				type: "dispose"
			})
		}
	}
	gh.prototype.isBufferGeometry = !0;
	const vh = new hc,
		yh = new cc,
		_h = new ec,
		xh = new Il,
		wh = new Il,
		bh = new Il,
		Mh = new Il,
		Sh = new Il,
		Th = new Il,
		Eh = new Il,
		Ah = new Il,
		Lh = new Il,
		Ch = new _l,
		Rh = new _l,
		Ph = new _l,
		Dh = new Il,
		Ih = new Il;
	class Oh extends Nc {
		constructor(t = new gh, e = new nh) {
			super(), this.type = "Mesh", this.geometry = t, this.material = e, this.updateMorphTargets()
		}
		copy(t) {
			return super.copy(t), void 0 !== t.morphTargetInfluences && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), void 0 !== t.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = t.material, this.geometry = t.geometry, this
		}
		updateMorphTargets() {
			const t = this.geometry;
			if (t.isBufferGeometry) {
				const e = t.morphAttributes,
					n = Object.keys(e);
				if (n.length > 0) {
					const t = e[n[0]];
					if (void 0 !== t) {
						this.morphTargetInfluences = [], this.morphTargetDictionary = {};
						for (let e = 0, n = t.length; e < n; e++) {
							const n = t[e].name || String(e);
							this.morphTargetInfluences.push(0), this.morphTargetDictionary[n] = e
						}
					}
				}
			} else {
				const e = t.morphTargets;
				void 0 !== e && e.length > 0 && console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
			}
		}
		raycast(t, e) {
			const n = this.geometry,
				i = this.material,
				r = this.matrixWorld;
			if (void 0 === i) return;
			if (null === n.boundingSphere && n.computeBoundingSphere(), _h.copy(n.boundingSphere), _h.applyMatrix4(r), !1 === t.ray.intersectsSphere(_h)) return;
			if (vh.copy(r).invert(), yh.copy(t.ray).applyMatrix4(vh), null !== n.boundingBox && !1 === yh.intersectsBox(n.boundingBox)) return;
			let s;
			if (n.isBufferGeometry) {
				const r = n.index,
					a = n.attributes.position,
					o = n.morphAttributes.position,
					l = n.morphTargetsRelative,
					c = n.attributes.uv,
					h = n.attributes.uv2,
					u = n.groups,
					d = n.drawRange;
				if (null !== r)
					if (Array.isArray(i))
						for (let n = 0, p = u.length; n < p; n++) {
							const p = u[n],
								m = i[p.materialIndex];
							for (let n = Math.max(p.start, d.start), i = Math.min(r.count, Math.min(p.start + p.count, d.start + d.count)); n < i; n += 3) {
								const i = r.getX(n),
									u = r.getX(n + 1),
									d = r.getX(n + 2);
								s = Nh(this, m, t, yh, a, o, l, c, h, i, u, d), s && (s.faceIndex = Math.floor(n / 3), s.face.materialIndex = p.materialIndex, e.push(s))
							}
						} else {
							for (let n = Math.max(0, d.start), u = Math.min(r.count, d.start + d.count); n < u; n += 3) {
								const u = r.getX(n),
									d = r.getX(n + 1),
									p = r.getX(n + 2);
								s = Nh(this, i, t, yh, a, o, l, c, h, u, d, p), s && (s.faceIndex = Math.floor(n / 3), e.push(s))
							}
						} else if (void 0 !== a)
							if (Array.isArray(i))
								for (let n = 0, r = u.length; n < r; n++) {
									const r = u[n],
										p = i[r.materialIndex];
									for (let n = Math.max(r.start, d.start), i = Math.min(a.count, Math.min(r.start + r.count, d.start + d.count)); n < i; n += 3) {
										s = Nh(this, p, t, yh, a, o, l, c, h, n, n + 1, n + 2), s && (s.faceIndex = Math.floor(n / 3), s.face.materialIndex = r.materialIndex, e.push(s))
									}
								} else {
									for (let n = Math.max(0, d.start), r = Math.min(a.count, d.start + d.count); n < r; n += 3) {
										s = Nh(this, i, t, yh, a, o, l, c, h, n, n + 1, n + 2), s && (s.faceIndex = Math.floor(n / 3), e.push(s))
									}
								}
			} else n.isGeometry && console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
		}
	}

	function Nh(t, e, n, i, r, s, a, o, l, c, h, u) {
		xh.fromBufferAttribute(r, c), wh.fromBufferAttribute(r, h), bh.fromBufferAttribute(r, u);
		const d = t.morphTargetInfluences;
		if (s && d) {
			Eh.set(0, 0, 0), Ah.set(0, 0, 0), Lh.set(0, 0, 0);
			for (let t = 0, e = s.length; t < e; t++) {
				const e = d[t],
					n = s[t];
				0 !== e && (Mh.fromBufferAttribute(n, c), Sh.fromBufferAttribute(n, h), Th.fromBufferAttribute(n, u), a ? (Eh.addScaledVector(Mh, e), Ah.addScaledVector(Sh, e), Lh.addScaledVector(Th, e)) : (Eh.addScaledVector(Mh.sub(xh), e), Ah.addScaledVector(Sh.sub(wh), e), Lh.addScaledVector(Th.sub(bh), e)))
			}
			xh.add(Eh), wh.add(Ah), bh.add(Lh)
		}
		t.isSkinnedMesh && (t.boneTransform(c, xh), t.boneTransform(h, wh), t.boneTransform(u, bh));
		const p = function (t, e, n, i, r, s, a, o) {
			let l;
			if (l = 1 === e.side ? i.intersectTriangle(a, s, r, !0, o) : i.intersectTriangle(r, s, a, 2 !== e.side, o), null === l) return null;
			Ih.copy(o), Ih.applyMatrix4(t.matrixWorld);
			const c = n.ray.origin.distanceTo(Ih);
			return c < n.near || c > n.far ? null : {
				distance: c,
				point: Ih.clone(),
				object: t
			}
		}(t, e, n, i, xh, wh, bh, Dh);
		if (p) {
			o && (Ch.fromBufferAttribute(o, c), Rh.fromBufferAttribute(o, h), Ph.fromBufferAttribute(o, u), p.uv = jc.getUV(Dh, xh, wh, bh, Ch, Rh, Ph, new _l)), l && (Ch.fromBufferAttribute(l, c), Rh.fromBufferAttribute(l, h), Ph.fromBufferAttribute(l, u), p.uv2 = jc.getUV(Dh, xh, wh, bh, Ch, Rh, Ph, new _l));
			const t = {
				a: c,
				b: h,
				c: u,
				normal: new Il,
				materialIndex: 0
			};
			jc.getNormal(xh, wh, bh, t.normal), p.face = t
		}
		return p
	}
	Oh.prototype.isMesh = !0;
	class zh extends gh {
		constructor(t = 1, e = 1, n = 1, i = 1, r = 1, s = 1) {
			super(), this.type = "BoxGeometry", this.parameters = {
				width: t,
				height: e,
				depth: n,
				widthSegments: i,
				heightSegments: r,
				depthSegments: s
			};
			const a = this;
			i = Math.floor(i), r = Math.floor(r), s = Math.floor(s);
			const o = [],
				l = [],
				c = [],
				h = [];
			let u = 0,
				d = 0;

			function p(t, e, n, i, r, s, p, m, f, g, v) {
				const y = s / f,
					_ = p / g,
					x = s / 2,
					w = p / 2,
					b = m / 2,
					M = f + 1,
					S = g + 1;
				let T = 0,
					E = 0;
				const A = new Il;
				for (let s = 0; s < S; s++) {
					const a = s * _ - w;
					for (let o = 0; o < M; o++) {
						const u = o * y - x;
						A[t] = u * i, A[e] = a * r, A[n] = b, l.push(A.x, A.y, A.z), A[t] = 0, A[e] = 0, A[n] = m > 0 ? 1 : -1, c.push(A.x, A.y, A.z), h.push(o / f), h.push(1 - s / g), T += 1
					}
				}
				for (let t = 0; t < g; t++)
					for (let e = 0; e < f; e++) {
						const n = u + e + M * t,
							i = u + e + M * (t + 1),
							r = u + (e + 1) + M * (t + 1),
							s = u + (e + 1) + M * t;
						o.push(n, i, s), o.push(i, r, s), E += 6
					}
				a.addGroup(d, E, v), d += E, u += T
			}
			p("z", "y", "x", -1, -1, n, e, t, s, r, 0), p("z", "y", "x", 1, -1, n, e, -t, s, r, 1), p("x", "z", "y", 1, 1, t, n, e, i, s, 2), p("x", "z", "y", 1, -1, t, n, -e, i, s, 3), p("x", "y", "z", 1, -1, t, e, n, i, r, 4), p("x", "y", "z", -1, -1, t, e, -n, i, r, 5), this.setIndex(o), this.setAttribute("position", new lh(l, 3)), this.setAttribute("normal", new lh(c, 3)), this.setAttribute("uv", new lh(h, 2))
		}
		static fromJSON(t) {
			return new zh(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments)
		}
	}

	function Bh(t) {
		const e = {};
		for (const n in t) {
			e[n] = {};
			for (const i in t[n]) {
				const r = t[n][i];
				r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? e[n][i] = r.clone() : Array.isArray(r) ? e[n][i] = r.slice() : e[n][i] = r
			}
		}
		return e
	}

	function Fh(t) {
		const e = {};
		for (let n = 0; n < t.length; n++) {
			const i = Bh(t[n]);
			for (const t in i) e[t] = i[t]
		}
		return e
	}
	const kh = {
		clone: Bh,
		merge: Fh
	};
	class Uh extends Yc {
		constructor(t) {
			super(), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.extensions = {
				derivatives: !1,
				fragDepth: !1,
				drawBuffers: !1,
				shaderTextureLOD: !1
			}, this.defaultAttributeValues = {
				color: [1, 1, 1],
				uv: [0, 0],
				uv2: [0, 0]
			}, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, void 0 !== t && (void 0 !== t.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(t))
		}
		copy(t) {
			return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = Bh(t.uniforms), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this
		}
		toJSON(t) {
			const e = super.toJSON(t);
			e.glslVersion = this.glslVersion, e.uniforms = {};
			for (const n in this.uniforms) {
				const i = this.uniforms[n].value;
				i && i.isTexture ? e.uniforms[n] = {
					type: "t",
					value: i.toJSON(t).uuid
				} : i && i.isColor ? e.uniforms[n] = {
					type: "c",
					value: i.getHex()
				} : i && i.isVector2 ? e.uniforms[n] = {
					type: "v2",
					value: i.toArray()
				} : i && i.isVector3 ? e.uniforms[n] = {
					type: "v3",
					value: i.toArray()
				} : i && i.isVector4 ? e.uniforms[n] = {
					type: "v4",
					value: i.toArray()
				} : i && i.isMatrix3 ? e.uniforms[n] = {
					type: "m3",
					value: i.toArray()
				} : i && i.isMatrix4 ? e.uniforms[n] = {
					type: "m4",
					value: i.toArray()
				} : e.uniforms[n] = {
					value: i
				}
			}
			Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader;
			const n = {};
			for (const t in this.extensions) !0 === this.extensions[t] && (n[t] = !0);
			return Object.keys(n).length > 0 && (e.extensions = n), e
		}
	}
	Uh.prototype.isShaderMaterial = !0;
	class Hh extends Nc {
		constructor() {
			super(), this.type = "Camera", this.matrixWorldInverse = new hc, this.projectionMatrix = new hc, this.projectionMatrixInverse = new hc
		}
		copy(t, e) {
			return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this
		}
		getWorldDirection(t) {
			this.updateWorldMatrix(!0, !1);
			const e = this.matrixWorld.elements;
			return t.set(-e[8], -e[9], -e[10]).normalize()
		}
		updateMatrixWorld(t) {
			super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert()
		}
		updateWorldMatrix(t, e) {
			super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert()
		}
		clone() {
			return (new this.constructor).copy(this)
		}
	}
	Hh.prototype.isCamera = !0;
	class Gh extends Hh {
		constructor(t = 50, e = 1, n = .1, i = 2e3) {
			super(), this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = i, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
		}
		copy(t, e) {
			return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = null === t.view ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this
		}
		setFocalLength(t) {
			const e = .5 * this.getFilmHeight() / t;
			this.fov = 2 * pl * Math.atan(e), this.updateProjectionMatrix()
		}
		getFocalLength() {
			const t = Math.tan(.5 * dl * this.fov);
			return .5 * this.getFilmHeight() / t
		}
		getEffectiveFOV() {
			return 2 * pl * Math.atan(Math.tan(.5 * dl * this.fov) / this.zoom)
		}
		getFilmWidth() {
			return this.filmGauge * Math.min(this.aspect, 1)
		}
		getFilmHeight() {
			return this.filmGauge / Math.max(this.aspect, 1)
		}
		setViewOffset(t, e, n, i, r, s) {
			this.aspect = t / e, null === this.view && (this.view = {
				enabled: !0,
				fullWidth: 1,
				fullHeight: 1,
				offsetX: 0,
				offsetY: 0,
				width: 1,
				height: 1
			}), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = s, this.updateProjectionMatrix()
		}
		clearViewOffset() {
			null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
		}
		updateProjectionMatrix() {
			const t = this.near;
			let e = t * Math.tan(.5 * dl * this.fov) / this.zoom,
				n = 2 * e,
				i = this.aspect * n,
				r = -.5 * i;
			const s = this.view;
			if (null !== this.view && this.view.enabled) {
				const t = s.fullWidth,
					a = s.fullHeight;
				r += s.offsetX * i / t, e -= s.offsetY * n / a, i *= s.width / t, n *= s.height / a
			}
			const a = this.filmOffset;
			0 !== a && (r += t * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + i, e, e - n, t, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
		}
		toJSON(t) {
			const e = super.toJSON(t);
			return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, null !== this.view && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e
		}
	}
	Gh.prototype.isPerspectiveCamera = !0;
	const Vh = 90;
	class Wh extends Nc {
		constructor(t, e, n) {
			if (super(), this.type = "CubeCamera", !0 !== n.isWebGLCubeRenderTarget) return void console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");
			this.renderTarget = n;
			const i = new Gh(Vh, 1, t, e);
			i.layers = this.layers, i.up.set(0, -1, 0), i.lookAt(new Il(1, 0, 0)), this.add(i);
			const r = new Gh(Vh, 1, t, e);
			r.layers = this.layers, r.up.set(0, -1, 0), r.lookAt(new Il(-1, 0, 0)), this.add(r);
			const s = new Gh(Vh, 1, t, e);
			s.layers = this.layers, s.up.set(0, 0, 1), s.lookAt(new Il(0, 1, 0)), this.add(s);
			const a = new Gh(Vh, 1, t, e);
			a.layers = this.layers, a.up.set(0, 0, -1), a.lookAt(new Il(0, -1, 0)), this.add(a);
			const o = new Gh(Vh, 1, t, e);
			o.layers = this.layers, o.up.set(0, -1, 0), o.lookAt(new Il(0, 0, 1)), this.add(o);
			const l = new Gh(Vh, 1, t, e);
			l.layers = this.layers, l.up.set(0, -1, 0), l.lookAt(new Il(0, 0, -1)), this.add(l)
		}
		update(t, e) {
			null === this.parent && this.updateMatrixWorld();
			const n = this.renderTarget,
				[i, r, s, a, o, l] = this.children,
				c = t.xr.enabled,
				h = t.getRenderTarget();
			t.xr.enabled = !1;
			const u = n.texture.generateMipmaps;
			n.texture.generateMipmaps = !1, t.setRenderTarget(n, 0), t.render(e, i), t.setRenderTarget(n, 1), t.render(e, r), t.setRenderTarget(n, 2), t.render(e, s), t.setRenderTarget(n, 3), t.render(e, a), t.setRenderTarget(n, 4), t.render(e, o), n.texture.generateMipmaps = u, t.setRenderTarget(n, 5), t.render(e, l), t.setRenderTarget(h), t.xr.enabled = c
		}
	}
	class qh extends Al {
		constructor(t, e, n, i, r, s, a, o, l, c) {
			super(t = void 0 !== t ? t : [], e = void 0 !== e ? e : Ro, n, i, r, s, a, o, l, c), this.flipY = !1
		}
		get images() {
			return this.image
		}
		set images(t) {
			this.image = t
		}
	}
	qh.prototype.isCubeTexture = !0;
	class jh extends Rl {
		constructor(t, e, n) {
			Number.isInteger(e) && (console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"), e = n), super(t, t, e), e = e || {}, this.texture = new qh(void 0, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.encoding), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = void 0 !== e.generateMipmaps && e.generateMipmaps, this.texture.minFilter = void 0 !== e.minFilter ? e.minFilter : Bo, this.texture._needsFlipEnvMap = !1
		}
		fromEquirectangularTexture(t, e) {
			this.texture.type = e.type, this.texture.format = jo, this.texture.encoding = e.encoding, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
			const n = {
					uniforms: {
						tEquirect: {
							value: null
						}
					},
					vertexShader: "\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t",
					fragmentShader: "\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t"
				},
				i = new zh(5, 5, 5),
				r = new Uh({
					name: "CubemapFromEquirect",
					uniforms: Bh(n.uniforms),
					vertexShader: n.vertexShader,
					fragmentShader: n.fragmentShader,
					side: 1,
					blending: 0
				});
			r.uniforms.tEquirect.value = e;
			const s = new Oh(i, r),
				a = e.minFilter;
			e.minFilter === Fo && (e.minFilter = Bo);
			return new Wh(1, 10, this).update(t, s), e.minFilter = a, s.geometry.dispose(), s.material.dispose(), this
		}
		clear(t, e, n, i) {
			const r = t.getRenderTarget();
			for (let r = 0; r < 6; r++) t.setRenderTarget(this, r), t.clear(e, n, i);
			t.setRenderTarget(r)
		}
	}
	jh.prototype.isWebGLCubeRenderTarget = !0;
	const Xh = new Il,
		Yh = new Il,
		Jh = new xl;
	class Zh {
		constructor(t = new Il(1, 0, 0), e = 0) {
			this.normal = t, this.constant = e
		}
		set(t, e) {
			return this.normal.copy(t), this.constant = e, this
		}
		setComponents(t, e, n, i) {
			return this.normal.set(t, e, n), this.constant = i, this
		}
		setFromNormalAndCoplanarPoint(t, e) {
			return this.normal.copy(t), this.constant = -e.dot(this.normal), this
		}
		setFromCoplanarPoints(t, e, n) {
			const i = Xh.subVectors(n, e).cross(Yh.subVectors(t, e)).normalize();
			return this.setFromNormalAndCoplanarPoint(i, t), this
		}
		copy(t) {
			return this.normal.copy(t.normal), this.constant = t.constant, this
		}
		normalize() {
			const t = 1 / this.normal.length();
			return this.normal.multiplyScalar(t), this.constant *= t, this
		}
		negate() {
			return this.constant *= -1, this.normal.negate(), this
		}
		distanceToPoint(t) {
			return this.normal.dot(t) + this.constant
		}
		distanceToSphere(t) {
			return this.distanceToPoint(t.center) - t.radius
		}
		projectPoint(t, e) {
			return e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)
		}
		intersectLine(t, e) {
			const n = t.delta(Xh),
				i = this.normal.dot(n);
			if (0 === i) return 0 === this.distanceToPoint(t.start) ? e.copy(t.start) : null;
			const r = -(t.start.dot(this.normal) + this.constant) / i;
			return r < 0 || r > 1 ? null : e.copy(n).multiplyScalar(r).add(t.start)
		}
		intersectsLine(t) {
			const e = this.distanceToPoint(t.start),
				n = this.distanceToPoint(t.end);
			return e < 0 && n > 0 || n < 0 && e > 0
		}
		intersectsBox(t) {
			return t.intersectsPlane(this)
		}
		intersectsSphere(t) {
			return t.intersectsPlane(this)
		}
		coplanarPoint(t) {
			return t.copy(this.normal).multiplyScalar(-this.constant)
		}
		applyMatrix4(t, e) {
			const n = e || Jh.getNormalMatrix(t),
				i = this.coplanarPoint(Xh).applyMatrix4(t),
				r = this.normal.applyMatrix3(n).normalize();
			return this.constant = -i.dot(r), this
		}
		translate(t) {
			return this.constant -= t.dot(this.normal), this
		}
		equals(t) {
			return t.normal.equals(this.normal) && t.constant === this.constant
		}
		clone() {
			return (new this.constructor).copy(this)
		}
	}
	Zh.prototype.isPlane = !0;
	const Qh = new ec,
		Kh = new Il;
	class $h {
		constructor(t = new Zh, e = new Zh, n = new Zh, i = new Zh, r = new Zh, s = new Zh) {
			this.planes = [t, e, n, i, r, s]
		}
		set(t, e, n, i, r, s) {
			const a = this.planes;
			return a[0].copy(t), a[1].copy(e), a[2].copy(n), a[3].copy(i), a[4].copy(r), a[5].copy(s), this
		}
		copy(t) {
			const e = this.planes;
			for (let n = 0; n < 6; n++) e[n].copy(t.planes[n]);
			return this
		}
		setFromProjectionMatrix(t) {
			const e = this.planes,
				n = t.elements,
				i = n[0],
				r = n[1],
				s = n[2],
				a = n[3],
				o = n[4],
				l = n[5],
				c = n[6],
				h = n[7],
				u = n[8],
				d = n[9],
				p = n[10],
				m = n[11],
				f = n[12],
				g = n[13],
				v = n[14],
				y = n[15];
			return e[0].setComponents(a - i, h - o, m - u, y - f).normalize(), e[1].setComponents(a + i, h + o, m + u, y + f).normalize(), e[2].setComponents(a + r, h + l, m + d, y + g).normalize(), e[3].setComponents(a - r, h - l, m - d, y - g).normalize(), e[4].setComponents(a - s, h - c, m - p, y - v).normalize(), e[5].setComponents(a + s, h + c, m + p, y + v).normalize(), this
		}
		intersectsObject(t) {
			const e = t.geometry;
			return null === e.boundingSphere && e.computeBoundingSphere(), Qh.copy(e.boundingSphere).applyMatrix4(t.matrixWorld), this.intersectsSphere(Qh)
		}
		intersectsSprite(t) {
			return Qh.center.set(0, 0, 0), Qh.radius = .7071067811865476, Qh.applyMatrix4(t.matrixWorld), this.intersectsSphere(Qh)
		}
		intersectsSphere(t) {
			const e = this.planes,
				n = t.center,
				i = -t.radius;
			for (let t = 0; t < 6; t++) {
				if (e[t].distanceToPoint(n) < i) return !1
			}
			return !0
		}
		intersectsBox(t) {
			const e = this.planes;
			for (let n = 0; n < 6; n++) {
				const i = e[n];
				if (Kh.x = i.normal.x > 0 ? t.max.x : t.min.x, Kh.y = i.normal.y > 0 ? t.max.y : t.min.y, Kh.z = i.normal.z > 0 ? t.max.z : t.min.z, i.distanceToPoint(Kh) < 0) return !1
			}
			return !0
		}
		containsPoint(t) {
			const e = this.planes;
			for (let n = 0; n < 6; n++)
				if (e[n].distanceToPoint(t) < 0) return !1;
			return !0
		}
		clone() {
			return (new this.constructor).copy(this)
		}
	}

	function tu() {
		let t = null,
			e = !1,
			n = null,
			i = null;

		function r(e, s) {
			n(e, s), i = t.requestAnimationFrame(r)
		}
		return {
			start: function () {
				!0 !== e && null !== n && (i = t.requestAnimationFrame(r), e = !0)
			},
			stop: function () {
				t.cancelAnimationFrame(i), e = !1
			},
			setAnimationLoop: function (t) {
				n = t
			},
			setContext: function (e) {
				t = e
			}
		}
	}

	function eu(t, e) {
		const n = e.isWebGL2,
			i = new WeakMap;
		return {
			get: function (t) {
				return t.isInterleavedBufferAttribute && (t = t.data), i.get(t)
			},
			remove: function (e) {
				e.isInterleavedBufferAttribute && (e = e.data);
				const n = i.get(e);
				n && (t.deleteBuffer(n.buffer), i.delete(e))
			},
			update: function (e, r) {
				if (e.isGLBufferAttribute) {
					const t = i.get(e);
					return void((!t || t.version < e.version) && i.set(e, {
						buffer: e.buffer,
						type: e.type,
						bytesPerElement: e.elementSize,
						version: e.version
					}))
				}
				e.isInterleavedBufferAttribute && (e = e.data);
				const s = i.get(e);
				void 0 === s ? i.set(e, function (e, i) {
					const r = e.array,
						s = e.usage,
						a = t.createBuffer();
					t.bindBuffer(i, a), t.bufferData(i, r, s), e.onUploadCallback();
					let o = 5126;
					return r instanceof Float32Array ? o = 5126 : r instanceof Float64Array ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.") : r instanceof Uint16Array ? e.isFloat16BufferAttribute ? n ? o = 5131 : console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.") : o = 5123 : r instanceof Int16Array ? o = 5122 : r instanceof Uint32Array ? o = 5125 : r instanceof Int32Array ? o = 5124 : r instanceof Int8Array ? o = 5120 : (r instanceof Uint8Array || r instanceof Uint8ClampedArray) && (o = 5121), {
						buffer: a,
						type: o,
						bytesPerElement: r.BYTES_PER_ELEMENT,
						version: e.version
					}
				}(e, r)) : s.version < e.version && (! function (e, i, r) {
					const s = i.array,
						a = i.updateRange;
					t.bindBuffer(r, e), -1 === a.count ? t.bufferSubData(r, 0, s) : (n ? t.bufferSubData(r, a.offset * s.BYTES_PER_ELEMENT, s, a.offset, a.count) : t.bufferSubData(r, a.offset * s.BYTES_PER_ELEMENT, s.subarray(a.offset, a.offset + a.count)), a.count = -1)
				}(s.buffer, e, r), s.version = e.version)
			}
		}
	}
	class nu extends gh {
		constructor(t = 1, e = 1, n = 1, i = 1) {
			super(), this.type = "PlaneGeometry", this.parameters = {
				width: t,
				height: e,
				widthSegments: n,
				heightSegments: i
			};
			const r = t / 2,
				s = e / 2,
				a = Math.floor(n),
				o = Math.floor(i),
				l = a + 1,
				c = o + 1,
				h = t / a,
				u = e / o,
				d = [],
				p = [],
				m = [],
				f = [];
			for (let t = 0; t < c; t++) {
				const e = t * u - s;
				for (let n = 0; n < l; n++) {
					const i = n * h - r;
					p.push(i, -e, 0), m.push(0, 0, 1), f.push(n / a), f.push(1 - t / o)
				}
			}
			for (let t = 0; t < o; t++)
				for (let e = 0; e < a; e++) {
					const n = e + l * t,
						i = e + l * (t + 1),
						r = e + 1 + l * (t + 1),
						s = e + 1 + l * t;
					d.push(n, i, s), d.push(i, r, s)
				}
			this.setIndex(d), this.setAttribute("position", new lh(p, 3)), this.setAttribute("normal", new lh(m, 3)), this.setAttribute("uv", new lh(f, 2))
		}
		static fromJSON(t) {
			return new nu(t.width, t.height, t.widthSegments, t.heightSegments)
		}
	}
	const iu = {
			alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif",
			alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
			alphatest_fragment: "#ifdef USE_ALPHATEST\n\tif ( diffuseColor.a < alphaTest ) discard;\n#endif",
			alphatest_pars_fragment: "#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif",
			aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n#endif",
			aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
			begin_vertex: "vec3 transformed = vec3( position );",
			beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",
			bsdfs: "vec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n\tfloat alpha = pow2( roughness );\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 );\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\treturn sheenColor * ( D * V );\n}\n#endif",
			bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",
			clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif",
			clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
			clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif",
			clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif",
			color_fragment: "#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif",
			color_pars_fragment: "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif",
			color_pars_vertex: "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif",
			color_vertex: "#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif",
			common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}",
			cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_maxMipLevel 8.0\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_maxTileSize 256.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\tfloat texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );\n\t\tvec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );\n\t\tvec2 f = fract( uv );\n\t\tuv += 0.5 - f;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tif ( mipInt < cubeUV_maxMipLevel ) {\n\t\t\tuv.y += 2.0 * cubeUV_maxTileSize;\n\t\t}\n\t\tuv.y += filterInt * 2.0 * cubeUV_minTileSize;\n\t\tuv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );\n\t\tuv *= texelSize;\n\t\tvec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x += texelSize;\n\t\tvec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.y += texelSize;\n\t\tvec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x -= texelSize;\n\t\tvec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tvec3 tm = mix( tl, tr, f.x );\n\t\tvec3 bm = mix( bl, br, f.x );\n\t\treturn mix( tm, bm, f.y );\n\t}\n\t#define r0 1.0\n\t#define v0 0.339\n\t#define m0 - 2.0\n\t#define r1 0.8\n\t#define v1 0.276\n\t#define m1 - 1.0\n\t#define r4 0.4\n\t#define v4 0.046\n\t#define m4 2.0\n\t#define r5 0.305\n\t#define v5 0.016\n\t#define m5 3.0\n\t#define r6 0.21\n\t#define v6 0.0038\n\t#define m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= r1 ) {\n\t\t\tmip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;\n\t\t} else if ( roughness >= r4 ) {\n\t\t\tmip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;\n\t\t} else if ( roughness >= r5 ) {\n\t\t\tmip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;\n\t\t} else if ( roughness >= r6 ) {\n\t\t\tmip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif",
			defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",
			displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",
			displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif",
			emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
			emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",
			encodings_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
			encodings_pars_fragment: "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}",
			envmap_fragment: "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t\tenvColor = envMapTexelToLinear( envColor );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",
			envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif",
			envmap_pars_fragment: "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",
			envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",
			envmap_physical_pars_fragment: "#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 reflectVec;\n\t\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\t\treflectVec = reflect( - viewDir, normal );\n\t\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t\t#else\n\t\t\t\treflectVec = refract( - viewDir, normal, refractionRatio );\n\t\t\t#endif\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n#endif",
			envmap_vertex: "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",
			fog_vertex: "#ifdef USE_FOG\n\tvFogDepth = - mvPosition.z;\n#endif",
			fog_pars_vertex: "#ifdef USE_FOG\n\tvarying float vFogDepth;\n#endif",
			fog_fragment: "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
			fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
			gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn texture2D( gradientMap, coord ).rgb;\n\t#else\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t#endif\n}",
			lightmap_fragment: "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel = texture2D( lightMap, vUv2 );\n\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tlightMapIrradiance *= PI;\n\t#endif\n\treflectedLight.indirectDiffuse += lightMapIrradiance;\n#endif",
			lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
			lights_lambert_vertex: "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\nvIndirectFront += getAmbientLightIrradiance( ambientLightColor );\nvIndirectFront += getLightProbeIrradiance( lightProbe, geometry.normal );\n#ifdef DOUBLE_SIDED\n\tvIndirectBack += getAmbientLightIrradiance( ambientLightColor );\n\tvIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry.normal );\n#endif\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointLightInfo( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( - dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotLightInfo( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( - dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalLightInfo( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( - dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry.normal );\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif",
			lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tif ( cutoffDistance > 0.0 ) {\n\t\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t}\n\t\treturn distanceFalloff;\n\t#else\n\t\tif ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\t\treturn pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t\t}\n\t\treturn 1.0;\n\t#endif\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\tif ( spotAttenuation > 0.0 ) {\n\t\t\tfloat lightDistance = length( lVector );\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t\t} else {\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\treturn irradiance;\n\t}\n#endif",
			lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
			lights_toon_pars_fragment: "varying vec3 vViewPosition;\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD( material )\t(0)",
			lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
			lights_phong_pars_fragment: "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)",
			lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n\t#ifdef SPECULAR\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\t\t#ifdef USE_SPECULARINTENSITYMAP\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;\n\t\t#endif\n\t\t#ifdef USE_SPECULARCOLORMAP\n\t\t\tspecularColorFactor *= specularColorMapTexelToLinear( texture2D( specularColorMap, vUv ) ).rgb;\n\t\t#endif\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\t#else\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\t#endif\n\tmaterial.specularColor = mix( min( pow2( ( ior - 1.0 ) / ( ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheenColor;\n\t#ifdef USE_SHEENCOLORMAP\n\t\tmaterial.sheenColor *= sheenColorMapTexelToLinear( texture2D( sheenColorMap, vUv ) ).rgb;\n\t#endif\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n\t#ifdef USE_SHEENROUGHNESSMAP\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;\n\t#endif\n#endif",
			lights_physical_pars_fragment: "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n};\nvec3 clearcoatSpecular = vec3( 0.0 );\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\treturn fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\treturn specularColor * fab.x + specularF90 * fab.y;\n}\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\tvec3 FssEss = specularColor * fab.x + specularF90 * fab.y;\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\t\tclearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );\n\t#endif\n\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tcomputeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
			lights_fragment_begin: "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef USE_CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointLightInfo( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotLightInfo( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalLightInfo( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry.normal );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
			lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getIBLIrradiance( geometry.normal );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );\n\t#endif\n#endif",
			lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif",
			logdepthbuf_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
			logdepthbuf_pars_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",
			logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif",
			logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif",
			map_fragment: "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif",
			map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",
			map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
			map_particle_pars_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
			metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",
			metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
			morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] > 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1, 2 ) * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\t\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\t\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\t\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n\t#endif\n#endif",
			morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\t\tuniform sampler2DArray morphTargetsTexture;\n\t\tuniform vec2 morphTargetsTextureSize;\n\t\tvec3 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset, const in int stride ) {\n\t\t\tfloat texelIndex = float( vertexIndex * stride + offset );\n\t\t\tfloat y = floor( texelIndex / morphTargetsTextureSize.x );\n\t\t\tfloat x = texelIndex - y * morphTargetsTextureSize.x;\n\t\t\tvec3 morphUV = vec3( ( x + 0.5 ) / morphTargetsTextureSize.x, y / morphTargetsTextureSize.y, morphTargetIndex );\n\t\t\treturn texture( morphTargetsTexture, morphUV ).xyz;\n\t\t}\n\t#else\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\tuniform float morphTargetInfluences[ 8 ];\n\t\t#else\n\t\t\tuniform float morphTargetInfluences[ 4 ];\n\t\t#endif\n\t#endif\n#endif",
			morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\t#ifndef USE_MORPHNORMALS\n\t\t\t\tif ( morphTargetInfluences[ i ] > 0.0 ) transformed += getMorph( gl_VertexID, i, 0, 1 ) * morphTargetInfluences[ i ];\n\t\t\t#else\n\t\t\t\tif ( morphTargetInfluences[ i ] > 0.0 ) transformed += getMorph( gl_VertexID, i, 0, 2 ) * morphTargetInfluences[ i ];\n\t\t\t#endif\n\t\t}\n\t#else\n\t\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\t\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\t\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\t\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t\t#endif\n\t#endif\n#endif",
			normal_fragment_begin: "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * faceDirection;\n\t\t\tbitangent = bitangent * faceDirection;\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;",
			normal_fragment_maps: "#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
			normal_pars_fragment: "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",
			normal_pars_vertex: "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",
			normal_vertex: "#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif",
			normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\t\treturn normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\t}\n#endif",
			clearcoat_normal_fragment_begin: "#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif",
			clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );\n\t#endif\n#endif",
			clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif",
			output_fragment: "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= transmissionAlpha + 0.1;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",
			packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}",
			premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",
			project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
			dithering_fragment: "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
			dithering_pars_fragment: "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",
			roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",
			roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
			shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif",
			shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",
			shadowmap_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\t#endif\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif",
			shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}",
			skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
			skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif",
			skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
			skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",
			specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
			specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
			tonemapping_fragment: "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
			tonemapping_pars_fragment: "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
			transmission_fragment: "#ifdef USE_TRANSMISSION\n\tfloat transmissionAlpha = 1.0;\n\tfloat transmissionFactor = transmission;\n\tfloat thicknessFactor = thickness;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\ttransmissionFactor *= texture2D( transmissionMap, vUv ).r;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tthicknessFactor *= texture2D( thicknessMap, vUv ).g;\n\t#endif\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\tvec4 transmission = getIBLVolumeRefraction(\n\t\tn, v, roughnessFactor, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, ior, thicknessFactor,\n\t\tattenuationColor, attenuationDistance );\n\ttotalDiffuse = mix( totalDiffuse, transmission.rgb, transmissionFactor );\n\ttransmissionAlpha = mix( transmissionAlpha, transmission.a, transmissionFactor );\n#endif",
			transmission_pars_fragment: "#ifdef USE_TRANSMISSION\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tuniform sampler2D transmissionMap;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tuniform sampler2D thicknessMap;\n\t#endif\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec3 vWorldPosition;\n\tvec3 getVolumeTransmissionRay( vec3 n, vec3 v, float thickness, float ior, mat4 modelMatrix ) {\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\t}\n\tfloat applyIorToRoughness( float roughness, float ior ) {\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\t}\n\tvec4 getTransmissionSample( vec2 fragCoord, float roughness, float ior ) {\n\t\tfloat framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\treturn texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );\n\t\t#else\n\t\t\treturn texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );\n\t\t#endif\n\t}\n\tvec3 applyVolumeAttenuation( vec3 radiance, float transmissionDistance, vec3 attenuationColor, float attenuationDistance ) {\n\t\tif ( attenuationDistance == 0.0 ) {\n\t\t\treturn radiance;\n\t\t} else {\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );\t\t\treturn transmittance * radiance;\n\t\t}\n\t}\n\tvec4 getIBLVolumeRefraction( vec3 n, vec3 v, float roughness, vec3 diffuseColor, vec3 specularColor, float specularF90,\n\t\tvec3 position, mat4 modelMatrix, mat4 viewMatrix, mat4 projMatrix, float ior, float thickness,\n\t\tvec3 attenuationColor, float attenuationDistance ) {\n\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\trefractionCoords += 1.0;\n\t\trefractionCoords /= 2.0;\n\t\tvec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\tvec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );\n\t}\n#endif",
			uv_pars_fragment: "#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif",
			uv_pars_vertex: "#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif",
			uv_vertex: "#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",
			uv2_pars_fragment: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
			uv2_pars_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif",
			uv2_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif",
			worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif",
			background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
			background_frag: "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
			cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
			cube_frag: "#include <envmap_common_pars_fragment>\nuniform float opacity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
			depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}",
			depth_frag: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}",
			distanceRGBA_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",
			distanceRGBA_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}",
			equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",
			equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
			linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
			linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
			meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",
			meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
			meshlambert_vert: "#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
			meshlambert_frag: "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
			meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",
			meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
			meshnormal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",
			meshnormal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}",
			meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
			meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
			meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n#endif\n}",
			meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\t#ifdef USE_SPECULARINTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n\t#ifdef USE_SPECULARCOLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\t#ifdef USE_SHEENCOLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\t#ifdef USE_SHEENROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;\n\t#endif\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
			meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
			meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
			points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",
			points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
			shadow_vert: "#include <common>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
			shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
			sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
			sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}"
		},
		ru = {
			common: {
				diffuse: {
					value: new eh(16777215)
				},
				opacity: {
					value: 1
				},
				map: {
					value: null
				},
				uvTransform: {
					value: new xl
				},
				uv2Transform: {
					value: new xl
				},
				alphaMap: {
					value: null
				},
				alphaTest: {
					value: 0
				}
			},
			specularmap: {
				specularMap: {
					value: null
				}
			},
			envmap: {
				envMap: {
					value: null
				},
				flipEnvMap: {
					value: -1
				},
				reflectivity: {
					value: 1
				},
				ior: {
					value: 1.5
				},
				refractionRatio: {
					value: .98
				}
			},
			aomap: {
				aoMap: {
					value: null
				},
				aoMapIntensity: {
					value: 1
				}
			},
			lightmap: {
				lightMap: {
					value: null
				},
				lightMapIntensity: {
					value: 1
				}
			},
			emissivemap: {
				emissiveMap: {
					value: null
				}
			},
			bumpmap: {
				bumpMap: {
					value: null
				},
				bumpScale: {
					value: 1
				}
			},
			normalmap: {
				normalMap: {
					value: null
				},
				normalScale: {
					value: new _l(1, 1)
				}
			},
			displacementmap: {
				displacementMap: {
					value: null
				},
				displacementScale: {
					value: 1
				},
				displacementBias: {
					value: 0
				}
			},
			roughnessmap: {
				roughnessMap: {
					value: null
				}
			},
			metalnessmap: {
				metalnessMap: {
					value: null
				}
			},
			gradientmap: {
				gradientMap: {
					value: null
				}
			},
			fog: {
				fogDensity: {
					value: 25e-5
				},
				fogNear: {
					value: 1
				},
				fogFar: {
					value: 2e3
				},
				fogColor: {
					value: new eh(16777215)
				}
			},
			lights: {
				ambientLightColor: {
					value: []
				},
				lightProbe: {
					value: []
				},
				directionalLights: {
					value: [],
					properties: {
						direction: {},
						color: {}
					}
				},
				directionalLightShadows: {
					value: [],
					properties: {
						shadowBias: {},
						shadowNormalBias: {},
						shadowRadius: {},
						shadowMapSize: {}
					}
				},
				directionalShadowMap: {
					value: []
				},
				directionalShadowMatrix: {
					value: []
				},
				spotLights: {
					value: [],
					properties: {
						color: {},
						position: {},
						direction: {},
						distance: {},
						coneCos: {},
						penumbraCos: {},
						decay: {}
					}
				},
				spotLightShadows: {
					value: [],
					properties: {
						shadowBias: {},
						shadowNormalBias: {},
						shadowRadius: {},
						shadowMapSize: {}
					}
				},
				spotShadowMap: {
					value: []
				},
				spotShadowMatrix: {
					value: []
				},
				pointLights: {
					value: [],
					properties: {
						color: {},
						position: {},
						decay: {},
						distance: {}
					}
				},
				pointLightShadows: {
					value: [],
					properties: {
						shadowBias: {},
						shadowNormalBias: {},
						shadowRadius: {},
						shadowMapSize: {},
						shadowCameraNear: {},
						shadowCameraFar: {}
					}
				},
				pointShadowMap: {
					value: []
				},
				pointShadowMatrix: {
					value: []
				},
				hemisphereLights: {
					value: [],
					properties: {
						direction: {},
						skyColor: {},
						groundColor: {}
					}
				},
				rectAreaLights: {
					value: [],
					properties: {
						color: {},
						position: {},
						width: {},
						height: {}
					}
				},
				ltc_1: {
					value: null
				},
				ltc_2: {
					value: null
				}
			},
			points: {
				diffuse: {
					value: new eh(16777215)
				},
				opacity: {
					value: 1
				},
				size: {
					value: 1
				},
				scale: {
					value: 1
				},
				map: {
					value: null
				},
				alphaMap: {
					value: null
				},
				alphaTest: {
					value: 0
				},
				uvTransform: {
					value: new xl
				}
			},
			sprite: {
				diffuse: {
					value: new eh(16777215)
				},
				opacity: {
					value: 1
				},
				center: {
					value: new _l(.5, .5)
				},
				rotation: {
					value: 0
				},
				map: {
					value: null
				},
				alphaMap: {
					value: null
				},
				alphaTest: {
					value: 0
				},
				uvTransform: {
					value: new xl
				}
			}
		},
		su = {
			basic: {
				uniforms: Fh([ru.common, ru.specularmap, ru.envmap, ru.aomap, ru.lightmap, ru.fog]),
				vertexShader: iu.meshbasic_vert,
				fragmentShader: iu.meshbasic_frag
			},
			lambert: {
				uniforms: Fh([ru.common, ru.specularmap, ru.envmap, ru.aomap, ru.lightmap, ru.emissivemap, ru.fog, ru.lights, {
					emissive: {
						value: new eh(0)
					}
				}]),
				vertexShader: iu.meshlambert_vert,
				fragmentShader: iu.meshlambert_frag
			},
			phong: {
				uniforms: Fh([ru.common, ru.specularmap, ru.envmap, ru.aomap, ru.lightmap, ru.emissivemap, ru.bumpmap, ru.normalmap, ru.displacementmap, ru.fog, ru.lights, {
					emissive: {
						value: new eh(0)
					},
					specular: {
						value: new eh(1118481)
					},
					shininess: {
						value: 30
					}
				}]),
				vertexShader: iu.meshphong_vert,
				fragmentShader: iu.meshphong_frag
			},
			standard: {
				uniforms: Fh([ru.common, ru.envmap, ru.aomap, ru.lightmap, ru.emissivemap, ru.bumpmap, ru.normalmap, ru.displacementmap, ru.roughnessmap, ru.metalnessmap, ru.fog, ru.lights, {
					emissive: {
						value: new eh(0)
					},
					roughness: {
						value: 1
					},
					metalness: {
						value: 0
					},
					envMapIntensity: {
						value: 1
					}
				}]),
				vertexShader: iu.meshphysical_vert,
				fragmentShader: iu.meshphysical_frag
			},
			toon: {
				uniforms: Fh([ru.common, ru.aomap, ru.lightmap, ru.emissivemap, ru.bumpmap, ru.normalmap, ru.displacementmap, ru.gradientmap, ru.fog, ru.lights, {
					emissive: {
						value: new eh(0)
					}
				}]),
				vertexShader: iu.meshtoon_vert,
				fragmentShader: iu.meshtoon_frag
			},
			matcap: {
				uniforms: Fh([ru.common, ru.bumpmap, ru.normalmap, ru.displacementmap, ru.fog, {
					matcap: {
						value: null
					}
				}]),
				vertexShader: iu.meshmatcap_vert,
				fragmentShader: iu.meshmatcap_frag
			},
			points: {
				uniforms: Fh([ru.points, ru.fog]),
				vertexShader: iu.points_vert,
				fragmentShader: iu.points_frag
			},
			dashed: {
				uniforms: Fh([ru.common, ru.fog, {
					scale: {
						value: 1
					},
					dashSize: {
						value: 1
					},
					totalSize: {
						value: 2
					}
				}]),
				vertexShader: iu.linedashed_vert,
				fragmentShader: iu.linedashed_frag
			},
			depth: {
				uniforms: Fh([ru.common, ru.displacementmap]),
				vertexShader: iu.depth_vert,
				fragmentShader: iu.depth_frag
			},
			normal: {
				uniforms: Fh([ru.common, ru.bumpmap, ru.normalmap, ru.displacementmap, {
					opacity: {
						value: 1
					}
				}]),
				vertexShader: iu.meshnormal_vert,
				fragmentShader: iu.meshnormal_frag
			},
			sprite: {
				uniforms: Fh([ru.sprite, ru.fog]),
				vertexShader: iu.sprite_vert,
				fragmentShader: iu.sprite_frag
			},
			background: {
				uniforms: {
					uvTransform: {
						value: new xl
					},
					t2D: {
						value: null
					}
				},
				vertexShader: iu.background_vert,
				fragmentShader: iu.background_frag
			},
			cube: {
				uniforms: Fh([ru.envmap, {
					opacity: {
						value: 1
					}
				}]),
				vertexShader: iu.cube_vert,
				fragmentShader: iu.cube_frag
			},
			equirect: {
				uniforms: {
					tEquirect: {
						value: null
					}
				},
				vertexShader: iu.equirect_vert,
				fragmentShader: iu.equirect_frag
			},
			distanceRGBA: {
				uniforms: Fh([ru.common, ru.displacementmap, {
					referencePosition: {
						value: new Il
					},
					nearDistance: {
						value: 1
					},
					farDistance: {
						value: 1e3
					}
				}]),
				vertexShader: iu.distanceRGBA_vert,
				fragmentShader: iu.distanceRGBA_frag
			},
			shadow: {
				uniforms: Fh([ru.lights, ru.fog, {
					color: {
						value: new eh(0)
					},
					opacity: {
						value: 1
					}
				}]),
				vertexShader: iu.shadow_vert,
				fragmentShader: iu.shadow_frag
			}
		};

	function au(t, e, n, i, r) {
		const s = new eh(0);
		let a, o, l = 0,
			c = null,
			h = 0,
			u = null;

		function d(t, e) {
			n.buffers.color.setClear(t.r, t.g, t.b, e, r)
		}
		return {
			getClearColor: function () {
				return s
			},
			setClearColor: function (t, e = 1) {
				s.set(t), l = e, d(s, l)
			},
			getClearAlpha: function () {
				return l
			},
			setClearAlpha: function (t) {
				l = t, d(s, l)
			},
			render: function (n, r) {
				let p = !1,
					m = !0 === r.isScene ? r.background : null;
				m && m.isTexture && (m = e.get(m));
				const f = t.xr,
					g = f.getSession && f.getSession();
				g && "additive" === g.environmentBlendMode && (m = null), null === m ? d(s, l) : m && m.isColor && (d(m, 1), p = !0), (t.autoClear || p) && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil), m && (m.isCubeTexture || m.mapping === Do) ? (void 0 === o && (o = new Oh(new zh(1, 1, 1), new Uh({
					name: "BackgroundCubeMaterial",
					uniforms: Bh(su.cube.uniforms),
					vertexShader: su.cube.vertexShader,
					fragmentShader: su.cube.fragmentShader,
					side: 1,
					depthTest: !1,
					depthWrite: !1,
					fog: !1
				})), o.geometry.deleteAttribute("normal"), o.geometry.deleteAttribute("uv"), o.onBeforeRender = function (t, e, n) {
					this.matrixWorld.copyPosition(n.matrixWorld)
				}, Object.defineProperty(o.material, "envMap", {
					get: function () {
						return this.uniforms.envMap.value
					}
				}), i.update(o)), o.material.uniforms.envMap.value = m, o.material.uniforms.flipEnvMap.value = m.isCubeTexture && !1 === m.isRenderTargetTexture ? -1 : 1, c === m && h === m.version && u === t.toneMapping || (o.material.needsUpdate = !0, c = m, h = m.version, u = t.toneMapping), n.unshift(o, o.geometry, o.material, 0, 0, null)) : m && m.isTexture && (void 0 === a && (a = new Oh(new nu(2, 2), new Uh({
					name: "BackgroundMaterial",
					uniforms: Bh(su.background.uniforms),
					vertexShader: su.background.vertexShader,
					fragmentShader: su.background.fragmentShader,
					side: 0,
					depthTest: !1,
					depthWrite: !1,
					fog: !1
				})), a.geometry.deleteAttribute("normal"), Object.defineProperty(a.material, "map", {
					get: function () {
						return this.uniforms.t2D.value
					}
				}), i.update(a)), a.material.uniforms.t2D.value = m, !0 === m.matrixAutoUpdate && m.updateMatrix(), a.material.uniforms.uvTransform.value.copy(m.matrix), c === m && h === m.version && u === t.toneMapping || (a.material.needsUpdate = !0, c = m, h = m.version, u = t.toneMapping), n.unshift(a, a.geometry, a.material, 0, 0, null))
			}
		}
	}

	function ou(t, e, n, i) {
		const r = t.getParameter(34921),
			s = i.isWebGL2 ? null : e.get("OES_vertex_array_object"),
			a = i.isWebGL2 || null !== s,
			o = {},
			l = d(null);
		let c = l;

		function h(e) {
			return i.isWebGL2 ? t.bindVertexArray(e) : s.bindVertexArrayOES(e)
		}

		function u(e) {
			return i.isWebGL2 ? t.deleteVertexArray(e) : s.deleteVertexArrayOES(e)
		}

		function d(t) {
			const e = [],
				n = [],
				i = [];
			for (let t = 0; t < r; t++) e[t] = 0, n[t] = 0, i[t] = 0;
			return {
				geometry: null,
				program: null,
				wireframe: !1,
				newAttributes: e,
				enabledAttributes: n,
				attributeDivisors: i,
				object: t,
				attributes: {},
				index: null
			}
		}

		function p() {
			const t = c.newAttributes;
			for (let e = 0, n = t.length; e < n; e++) t[e] = 0
		}

		function m(t) {
			f(t, 0)
		}

		function f(n, r) {
			const s = c.newAttributes,
				a = c.enabledAttributes,
				o = c.attributeDivisors;
			if (s[n] = 1, 0 === a[n] && (t.enableVertexAttribArray(n), a[n] = 1), o[n] !== r) {
				(i.isWebGL2 ? t : e.get("ANGLE_instanced_arrays"))[i.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](n, r), o[n] = r
			}
		}

		function g() {
			const e = c.newAttributes,
				n = c.enabledAttributes;
			for (let i = 0, r = n.length; i < r; i++) n[i] !== e[i] && (t.disableVertexAttribArray(i), n[i] = 0)
		}

		function v(e, n, r, s, a, o) {
			!0 !== i.isWebGL2 || 5124 !== r && 5125 !== r ? t.vertexAttribPointer(e, n, r, s, a, o) : t.vertexAttribIPointer(e, n, r, a, o)
		}

		function y() {
			_(), c !== l && (c = l, h(c.object))
		}

		function _() {
			l.geometry = null, l.program = null, l.wireframe = !1
		}
		return {
			setup: function (r, l, u, y, _) {
				let x = !1;
				if (a) {
					const e = function (e, n, r) {
						const a = !0 === r.wireframe;
						let l = o[e.id];
						void 0 === l && (l = {}, o[e.id] = l);
						let c = l[n.id];
						void 0 === c && (c = {}, l[n.id] = c);
						let h = c[a];
						void 0 === h && (h = d(i.isWebGL2 ? t.createVertexArray() : s.createVertexArrayOES()), c[a] = h);
						return h
					}(y, u, l);
					c !== e && (c = e, h(c.object)), x = function (t, e) {
							const n = c.attributes,
								i = t.attributes;
							let r = 0;
							for (const t in i) {
								const e = n[t],
									s = i[t];
								if (void 0 === e) return !0;
								if (e.attribute !== s) return !0;
								if (e.data !== s.data) return !0;
								r++
							}
							return c.attributesNum !== r || c.index !== e
						}(y, _),
						x && function (t, e) {
							const n = {},
								i = t.attributes;
							let r = 0;
							for (const t in i) {
								const e = i[t],
									s = {};
								s.attribute = e, e.data && (s.data = e.data), n[t] = s, r++
							}
							c.attributes = n, c.attributesNum = r, c.index = e
						}(y, _)
				} else {
					const t = !0 === l.wireframe;
					c.geometry === y.id && c.program === u.id && c.wireframe === t || (c.geometry = y.id, c.program = u.id, c.wireframe = t, x = !0)
				}!0 === r.isInstancedMesh && (x = !0), null !== _ && n.update(_, 34963), x && (! function (r, s, a, o) {
					if (!1 === i.isWebGL2 && (r.isInstancedMesh || o.isInstancedBufferGeometry) && null === e.get("ANGLE_instanced_arrays")) return;
					p();
					const l = o.attributes,
						c = a.getAttributes(),
						h = s.defaultAttributeValues;
					for (const e in c) {
						const i = c[e];
						if (i.location >= 0) {
							let s = l[e];
							if (void 0 === s && ("instanceMatrix" === e && r.instanceMatrix && (s = r.instanceMatrix), "instanceColor" === e && r.instanceColor && (s = r.instanceColor)), void 0 !== s) {
								const e = s.normalized,
									a = s.itemSize,
									l = n.get(s);
								if (void 0 === l) continue;
								const c = l.buffer,
									h = l.type,
									u = l.bytesPerElement;
								if (s.isInterleavedBufferAttribute) {
									const n = s.data,
										l = n.stride,
										d = s.offset;
									if (n && n.isInstancedInterleavedBuffer) {
										for (let t = 0; t < i.locationSize; t++) f(i.location + t, n.meshPerAttribute);
										!0 !== r.isInstancedMesh && void 0 === o._maxInstanceCount && (o._maxInstanceCount = n.meshPerAttribute * n.count)
									} else
										for (let t = 0; t < i.locationSize; t++) m(i.location + t);
									t.bindBuffer(34962, c);
									for (let t = 0; t < i.locationSize; t++) v(i.location + t, a / i.locationSize, h, e, l * u, (d + a / i.locationSize * t) * u)
								} else {
									if (s.isInstancedBufferAttribute) {
										for (let t = 0; t < i.locationSize; t++) f(i.location + t, s.meshPerAttribute);
										!0 !== r.isInstancedMesh && void 0 === o._maxInstanceCount && (o._maxInstanceCount = s.meshPerAttribute * s.count)
									} else
										for (let t = 0; t < i.locationSize; t++) m(i.location + t);
									t.bindBuffer(34962, c);
									for (let t = 0; t < i.locationSize; t++) v(i.location + t, a / i.locationSize, h, e, a * u, a / i.locationSize * t * u)
								}
							} else if (void 0 !== h) {
								const n = h[e];
								if (void 0 !== n) switch (n.length) {
									case 2:
										t.vertexAttrib2fv(i.location, n);
										break;
									case 3:
										t.vertexAttrib3fv(i.location, n);
										break;
									case 4:
										t.vertexAttrib4fv(i.location, n);
										break;
									default:
										t.vertexAttrib1fv(i.location, n)
								}
							}
						}
					}
					g()
				}(r, l, u, y), null !== _ && t.bindBuffer(34963, n.get(_).buffer))
			},
			reset: y,
			resetDefaultState: _,
			dispose: function () {
				y();
				for (const t in o) {
					const e = o[t];
					for (const t in e) {
						const n = e[t];
						for (const t in n) u(n[t].object), delete n[t];
						delete e[t]
					}
					delete o[t]
				}
			},
			releaseStatesOfGeometry: function (t) {
				if (void 0 === o[t.id]) return;
				const e = o[t.id];
				for (const t in e) {
					const n = e[t];
					for (const t in n) u(n[t].object), delete n[t];
					delete e[t]
				}
				delete o[t.id]
			},
			releaseStatesOfProgram: function (t) {
				for (const e in o) {
					const n = o[e];
					if (void 0 === n[t.id]) continue;
					const i = n[t.id];
					for (const t in i) u(i[t].object), delete i[t];
					delete n[t.id]
				}
			},
			initAttributes: p,
			enableAttribute: m,
			disableUnusedAttributes: g
		}
	}

	function lu(t, e, n, i) {
		const r = i.isWebGL2;
		let s;
		this.setMode = function (t) {
			s = t
		}, this.render = function (e, i) {
			t.drawArrays(s, e, i), n.update(i, s, 1)
		}, this.renderInstances = function (i, a, o) {
			if (0 === o) return;
			let l, c;
			if (r) l = t, c = "drawArraysInstanced";
			else if (l = e.get("ANGLE_instanced_arrays"), c = "drawArraysInstancedANGLE", null === l) return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
			l[c](s, i, a, o), n.update(a, s, o)
		}
	}

	function cu(t, e, n) {
		let i;

		function r(e) {
			if ("highp" === e) {
				if (t.getShaderPrecisionFormat(35633, 36338).precision > 0 && t.getShaderPrecisionFormat(35632, 36338).precision > 0) return "highp";
				e = "mediump"
			}
			return "mediump" === e && t.getShaderPrecisionFormat(35633, 36337).precision > 0 && t.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp"
		}
		const s = "undefined" != typeof WebGL2RenderingContext && t instanceof WebGL2RenderingContext || "undefined" != typeof WebGL2ComputeRenderingContext && t instanceof WebGL2ComputeRenderingContext;
		let a = void 0 !== n.precision ? n.precision : "highp";
		const o = r(a);
		o !== a && (console.warn("THREE.WebGLRenderer:", a, "not supported, using", o, "instead."), a = o);
		const l = s || e.has("WEBGL_draw_buffers"),
			c = !0 === n.logarithmicDepthBuffer,
			h = t.getParameter(34930),
			u = t.getParameter(35660),
			d = t.getParameter(3379),
			p = t.getParameter(34076),
			m = t.getParameter(34921),
			f = t.getParameter(36347),
			g = t.getParameter(36348),
			v = t.getParameter(36349),
			y = u > 0,
			_ = s || e.has("OES_texture_float");
		return {
			isWebGL2: s,
			drawBuffers: l,
			getMaxAnisotropy: function () {
				if (void 0 !== i) return i;
				if (!0 === e.has("EXT_texture_filter_anisotropic")) {
					const n = e.get("EXT_texture_filter_anisotropic");
					i = t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
				} else i = 0;
				return i
			},
			getMaxPrecision: r,
			precision: a,
			logarithmicDepthBuffer: c,
			maxTextures: h,
			maxVertexTextures: u,
			maxTextureSize: d,
			maxCubemapSize: p,
			maxAttributes: m,
			maxVertexUniforms: f,
			maxVaryings: g,
			maxFragmentUniforms: v,
			vertexTextures: y,
			floatFragmentTextures: _,
			floatVertexTextures: y && _,
			maxSamples: s ? t.getParameter(36183) : 0
		}
	}

	function hu(t) {
		const e = this;
		let n = null,
			i = 0,
			r = !1,
			s = !1;
		const a = new Zh,
			o = new xl,
			l = {
				value: null,
				needsUpdate: !1
			};

		function c() {
			l.value !== n && (l.value = n, l.needsUpdate = i > 0), e.numPlanes = i, e.numIntersection = 0
		}

		function h(t, n, i, r) {
			const s = null !== t ? t.length : 0;
			let c = null;
			if (0 !== s) {
				if (c = l.value, !0 !== r || null === c) {
					const e = i + 4 * s,
						r = n.matrixWorldInverse;
					o.getNormalMatrix(r), (null === c || c.length < e) && (c = new Float32Array(e));
					for (let e = 0, n = i; e !== s; ++e, n += 4) a.copy(t[e]).applyMatrix4(r, o), a.normal.toArray(c, n), c[n + 3] = a.constant
				}
				l.value = c, l.needsUpdate = !0
			}
			return e.numPlanes = s, e.numIntersection = 0, c
		}
		this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function (t, e, s) {
			const a = 0 !== t.length || e || 0 !== i || r;
			return r = e, n = h(t, s, 0), i = t.length, a
		}, this.beginShadows = function () {
			s = !0, h(null)
		}, this.endShadows = function () {
			s = !1, c()
		}, this.setState = function (e, a, o) {
			const u = e.clippingPlanes,
				d = e.clipIntersection,
				p = e.clipShadows,
				m = t.get(e);
			if (!r || null === u || 0 === u.length || s && !p) s ? h(null) : c();
			else {
				const t = s ? 0 : i,
					e = 4 * t;
				let r = m.clippingState || null;
				l.value = r, r = h(u, a, e, o);
				for (let t = 0; t !== e; ++t) r[t] = n[t];
				m.clippingState = r, this.numIntersection = d ? this.numPlanes : 0, this.numPlanes += t
			}
		}
	}

	function uu(t) {
		let e = new WeakMap;

		function n(t, e) {
			return 303 === e ? t.mapping = Ro : 304 === e && (t.mapping = Po), t
		}

		function i(t) {
			const n = t.target;
			n.removeEventListener("dispose", i);
			const r = e.get(n);
			void 0 !== r && (e.delete(n), r.dispose())
		}
		return {
			get: function (r) {
				if (r && r.isTexture && !1 === r.isRenderTargetTexture) {
					const s = r.mapping;
					if (303 === s || 304 === s) {
						if (e.has(r)) {
							return n(e.get(r).texture, r.mapping)
						} {
							const s = r.image;
							if (s && s.height > 0) {
								const a = t.getRenderTarget(),
									o = new jh(s.height / 2);
								return o.fromEquirectangularTexture(t, r), e.set(r, o), t.setRenderTarget(a), r.addEventListener("dispose", i), n(o.texture, r.mapping)
							}
							return null
						}
					}
				}
				return r
			},
			dispose: function () {
				e = new WeakMap
			}
		}
	}
	su.physical = {
		uniforms: Fh([su.standard.uniforms, {
			clearcoat: {
				value: 0
			},
			clearcoatMap: {
				value: null
			},
			clearcoatRoughness: {
				value: 0
			},
			clearcoatRoughnessMap: {
				value: null
			},
			clearcoatNormalScale: {
				value: new _l(1, 1)
			},
			clearcoatNormalMap: {
				value: null
			},
			sheen: {
				value: 0
			},
			sheenColor: {
				value: new eh(0)
			},
			sheenColorMap: {
				value: null
			},
			sheenRoughness: {
				value: 0
			},
			sheenRoughnessMap: {
				value: null
			},
			transmission: {
				value: 0
			},
			transmissionMap: {
				value: null
			},
			transmissionSamplerSize: {
				value: new _l
			},
			transmissionSamplerMap: {
				value: null
			},
			thickness: {
				value: 0
			},
			thicknessMap: {
				value: null
			},
			attenuationDistance: {
				value: 0
			},
			attenuationColor: {
				value: new eh(0)
			},
			specularIntensity: {
				value: 0
			},
			specularIntensityMap: {
				value: null
			},
			specularColor: {
				value: new eh(1, 1, 1)
			},
			specularColorMap: {
				value: null
			}
		}]),
		vertexShader: iu.meshphysical_vert,
		fragmentShader: iu.meshphysical_frag
	};
	class du extends Hh {
		constructor(t = -1, e = 1, n = 1, i = -1, r = .1, s = 2e3) {
			super(), this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = i, this.near = r, this.far = s, this.updateProjectionMatrix()
		}
		copy(t, e) {
			return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = null === t.view ? null : Object.assign({}, t.view), this
		}
		setViewOffset(t, e, n, i, r, s) {
			null === this.view && (this.view = {
				enabled: !0,
				fullWidth: 1,
				fullHeight: 1,
				offsetX: 0,
				offsetY: 0,
				width: 1,
				height: 1
			}), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = s, this.updateProjectionMatrix()
		}
		clearViewOffset() {
			null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
		}
		updateProjectionMatrix() {
			const t = (this.right - this.left) / (2 * this.zoom),
				e = (this.top - this.bottom) / (2 * this.zoom),
				n = (this.right + this.left) / 2,
				i = (this.top + this.bottom) / 2;
			let r = n - t,
				s = n + t,
				a = i + e,
				o = i - e;
			if (null !== this.view && this.view.enabled) {
				const t = (this.right - this.left) / this.view.fullWidth / this.zoom,
					e = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
				r += t * this.view.offsetX, s = r + t * this.view.width, a -= e * this.view.offsetY, o = a - e * this.view.height
			}
			this.projectionMatrix.makeOrthographic(r, s, a, o, this.near, this.far), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
		}
		toJSON(t) {
			const e = super.toJSON(t);
			return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, null !== this.view && (e.object.view = Object.assign({}, this.view)), e
		}
	}
	du.prototype.isOrthographicCamera = !0;
	class pu extends Uh {
		constructor(t) {
			super(t), this.type = "RawShaderMaterial"
		}
	}
	pu.prototype.isRawShaderMaterial = !0;
	const mu = Math.pow(2, 8),
		fu = [.125, .215, .35, .446, .526, .582],
		gu = 5 + fu.length,
		vu = 20,
		yu = {
			[nl]: 0,
			[il]: 1,
			[sl]: 2,
			3004: 3,
			3005: 4,
			3006: 5,
			[rl]: 6
		},
		_u = new du,
		{
			_lodPlanes: xu,
			_sizeLods: wu,
			_sigmas: bu
		} = Ru(),
		Mu = new eh;
	let Su = null;
	const Tu = (1 + Math.sqrt(5)) / 2,
		Eu = 1 / Tu,
		Au = [new Il(1, 1, 1), new Il(-1, 1, 1), new Il(1, 1, -1), new Il(-1, 1, -1), new Il(0, Tu, Eu), new Il(0, Tu, -Eu), new Il(Eu, 0, Tu), new Il(-Eu, 0, Tu), new Il(Tu, Eu, 0), new Il(-Tu, Eu, 0)];
	class Lu {
		constructor(t) {
			this._renderer = t, this._pingPongRenderTarget = null, this._blurMaterial = function (t) {
				const e = new Float32Array(t),
					n = new Il(0, 1, 0);
				return new pu({
					name: "SphericalGaussianBlur",
					defines: {
						n: t
					},
					uniforms: {
						envMap: {
							value: null
						},
						samples: {
							value: 1
						},
						weights: {
							value: e
						},
						latitudinal: {
							value: !1
						},
						dTheta: {
							value: 0
						},
						mipInt: {
							value: 0
						},
						poleAxis: {
							value: n
						},
						inputEncoding: {
							value: yu[3e3]
						},
						outputEncoding: {
							value: yu[3e3]
						}
					},
					vertexShader: Nu(),
					fragmentShader: `\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform int samples;\n\t\t\tuniform float weights[ n ];\n\t\t\tuniform bool latitudinal;\n\t\t\tuniform float dTheta;\n\t\t\tuniform float mipInt;\n\t\t\tuniform vec3 poleAxis;\n\n\t\t\t${zu()}\n\n\t\t\t#define ENVMAP_TYPE_CUBE_UV\n\t\t\t#include <cube_uv_reflection_fragment>\n\n\t\t\tvec3 getSample( float theta, vec3 axis ) {\n\n\t\t\t\tfloat cosTheta = cos( theta );\n\t\t\t\t// Rodrigues' axis-angle rotation\n\t\t\t\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t\t\t\t+ cross( axis, vOutputDirection ) * sin( theta )\n\t\t\t\t\t+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n\t\t\t\treturn bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n\t\t\t}\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n\t\t\t\tif ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n\t\t\t\t\taxis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n\t\t\t\t}\n\n\t\t\t\taxis = normalize( axis );\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\tgl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n\t\t\t\tfor ( int i = 1; i < n; i++ ) {\n\n\t\t\t\t\tif ( i >= samples ) {\n\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tfloat theta = dTheta * float( i );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n\t\t\t\t}\n\n\t\t\t\tgl_FragColor = linearToOutputTexel( gl_FragColor );\n\n\t\t\t}\n\t\t`,
					blending: 0,
					depthTest: !1,
					depthWrite: !1
				})
			}(vu), this._equirectShader = null, this._cubemapShader = null, this._compileMaterial(this._blurMaterial)
		}
		fromScene(t, e = 0, n = .1, i = 100) {
			Su = this._renderer.getRenderTarget();
			const r = this._allocateTargets();
			return this._sceneToCubeUV(t, n, i, r), e > 0 && this._blur(r, 0, 0, e), this._applyPMREM(r), this._cleanup(r), r
		}
		fromEquirectangular(t) {
			return this._fromTexture(t)
		}
		fromCubemap(t) {
			return this._fromTexture(t)
		}
		compileCubemapShader() {
			null === this._cubemapShader && (this._cubemapShader = Ou(), this._compileMaterial(this._cubemapShader))
		}
		compileEquirectangularShader() {
			null === this._equirectShader && (this._equirectShader = Iu(), this._compileMaterial(this._equirectShader))
		}
		dispose() {
			this._blurMaterial.dispose(), null !== this._cubemapShader && this._cubemapShader.dispose(), null !== this._equirectShader && this._equirectShader.dispose();
			for (let t = 0; t < xu.length; t++) xu[t].dispose()
		}
		_cleanup(t) {
			this._pingPongRenderTarget.dispose(), this._renderer.setRenderTarget(Su), t.scissorTest = !1, Du(t, 0, 0, t.width, t.height)
		}
		_fromTexture(t) {
			Su = this._renderer.getRenderTarget();
			const e = this._allocateTargets(t);
			return this._textureToCubeUV(t, e), this._applyPMREM(e), this._cleanup(e), e
		}
		_allocateTargets(t) {
			const e = {
					magFilter: zo,
					minFilter: zo,
					generateMipmaps: !1,
					type: ko,
					format: 1023,
					encoding: Cu(t) ? t.encoding : sl,
					depthBuffer: !1
				},
				n = Pu(e);
			return n.depthBuffer = !t, this._pingPongRenderTarget = Pu(e), n
		}
		_compileMaterial(t) {
			const e = new Oh(xu[0], t);
			this._renderer.compile(e, _u)
		}
		_sceneToCubeUV(t, e, n, i) {
			const r = new Gh(90, 1, e, n),
				s = [1, -1, 1, 1, 1, 1],
				a = [1, 1, 1, -1, -1, -1],
				o = this._renderer,
				l = o.autoClear,
				c = o.outputEncoding,
				h = o.toneMapping;
			o.getClearColor(Mu), o.toneMapping = 0, o.outputEncoding = nl, o.autoClear = !1;
			const u = new nh({
					name: "PMREM.Background",
					side: 1,
					depthWrite: !1,
					depthTest: !1
				}),
				d = new Oh(new zh, u);
			let p = !1;
			const m = t.background;
			m ? m.isColor && (u.color.copy(m), t.background = null, p = !0) : (u.color.copy(Mu), p = !0);
			for (let e = 0; e < 6; e++) {
				const n = e % 3;
				0 == n ? (r.up.set(0, s[e], 0), r.lookAt(a[e], 0, 0)) : 1 == n ? (r.up.set(0, 0, s[e]), r.lookAt(0, a[e], 0)) : (r.up.set(0, s[e], 0), r.lookAt(0, 0, a[e])), Du(i, n * mu, e > 2 ? mu : 0, mu, mu), o.setRenderTarget(i), p && o.render(d, r), o.render(t, r)
			}
			d.geometry.dispose(), d.material.dispose(), o.toneMapping = h, o.outputEncoding = c, o.autoClear = l, t.background = m
		}
		_setEncoding(t, e) {
			t.value = yu[e.encoding]
		}
		_textureToCubeUV(t, e) {
			const n = this._renderer,
				i = t.mapping === Ro || t.mapping === Po;
			i ? null == this._cubemapShader && (this._cubemapShader = Ou()) : null == this._equirectShader && (this._equirectShader = Iu());
			const r = i ? this._cubemapShader : this._equirectShader,
				s = new Oh(xu[0], r),
				a = r.uniforms;
			a.envMap.value = t, i || a.texelSize.value.set(1 / t.image.width, 1 / t.image.height), this._setEncoding(a.inputEncoding, t), this._setEncoding(a.outputEncoding, e.texture), Du(e, 0, 0, 3 * mu, 2 * mu), n.setRenderTarget(e), n.render(s, _u)
		}
		_applyPMREM(t) {
			const e = this._renderer,
				n = e.autoClear;
			e.autoClear = !1;
			for (let e = 1; e < gu; e++) {
				const n = Math.sqrt(bu[e] * bu[e] - bu[e - 1] * bu[e - 1]),
					i = Au[(e - 1) % Au.length];
				this._blur(t, e - 1, e, n, i)
			}
			e.autoClear = n
		}
		_blur(t, e, n, i, r) {
			const s = this._pingPongRenderTarget;
			this._halfBlur(t, s, e, n, i, "latitudinal", r), this._halfBlur(s, t, n, n, i, "longitudinal", r)
		}
		_halfBlur(t, e, n, i, r, s, a) {
			const o = this._renderer,
				l = this._blurMaterial;
			"latitudinal" !== s && "longitudinal" !== s && console.error("blur direction must be either latitudinal or longitudinal!");
			const c = new Oh(xu[i], l),
				h = l.uniforms,
				u = wu[n] - 1,
				d = isFinite(r) ? Math.PI / (2 * u) : 2 * Math.PI / 39,
				p = r / d,
				m = isFinite(r) ? 1 + Math.floor(3 * p) : vu;
			m > vu && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`);
			const f = [];
			let g = 0;
			for (let t = 0; t < vu; ++t) {
				const e = t / p,
					n = Math.exp(-e * e / 2);
				f.push(n), 0 == t ? g += n : t < m && (g += 2 * n)
			}
			for (let t = 0; t < f.length; t++) f[t] = f[t] / g;
			h.envMap.value = t.texture, h.samples.value = m, h.weights.value = f, h.latitudinal.value = "latitudinal" === s, a && (h.poleAxis.value = a), h.dTheta.value = d, h.mipInt.value = 8 - n, this._setEncoding(h.inputEncoding, t.texture), this._setEncoding(h.outputEncoding, t.texture);
			const v = wu[i];
			Du(e, 3 * Math.max(0, mu - 2 * v), (0 === i ? 0 : 2 * mu) + 2 * v * (i > 4 ? i - 8 + 4 : 0), 3 * v, 2 * v), o.setRenderTarget(e), o.render(c, _u)
		}
	}

	function Cu(t) {
		return void 0 !== t && t.type === ko && (t.encoding === nl || t.encoding === il || t.encoding === rl)
	}

	function Ru() {
		const t = [],
			e = [],
			n = [];
		let i = 8;
		for (let r = 0; r < gu; r++) {
			const s = Math.pow(2, i);
			e.push(s);
			let a = 1 / s;
			r > 4 ? a = fu[r - 8 + 4 - 1] : 0 == r && (a = 0), n.push(a);
			const o = 1 / (s - 1),
				l = -o / 2,
				c = 1 + o / 2,
				h = [l, l, c, l, c, c, l, l, c, c, l, c],
				u = 6,
				d = 6,
				p = 3,
				m = 2,
				f = 1,
				g = new Float32Array(p * d * u),
				v = new Float32Array(m * d * u),
				y = new Float32Array(f * d * u);
			for (let t = 0; t < u; t++) {
				const e = t % 3 * 2 / 3 - 1,
					n = t > 2 ? 0 : -1,
					i = [e, n, 0, e + 2 / 3, n, 0, e + 2 / 3, n + 1, 0, e, n, 0, e + 2 / 3, n + 1, 0, e, n + 1, 0];
				g.set(i, p * d * t), v.set(h, m * d * t);
				const r = [t, t, t, t, t, t];
				y.set(r, f * d * t)
			}
			const _ = new gh;
			_.setAttribute("position", new sh(g, p)), _.setAttribute("uv", new sh(v, m)), _.setAttribute("faceIndex", new sh(y, f)), t.push(_), i > 4 && i--
		}
		return {
			_lodPlanes: t,
			_sizeLods: e,
			_sigmas: n
		}
	}

	function Pu(t) {
		const e = new Rl(3 * mu, 3 * mu, t);
		return e.texture.mapping = Do, e.texture.name = "PMREM.cubeUv", e.scissorTest = !0, e
	}

	function Du(t, e, n, i, r) {
		t.viewport.set(e, n, i, r), t.scissor.set(e, n, i, r)
	}

	function Iu() {
		const t = new _l(1, 1);
		return new pu({
			name: "EquirectangularToCubeUV",
			uniforms: {
				envMap: {
					value: null
				},
				texelSize: {
					value: t
				},
				inputEncoding: {
					value: yu[3e3]
				},
				outputEncoding: {
					value: yu[3e3]
				}
			},
			vertexShader: Nu(),
			fragmentShader: `\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform vec2 texelSize;\n\n\t\t\t${zu()}\n\n\t\t\t#include <common>\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\n\t\t\t\tvec3 outputDirection = normalize( vOutputDirection );\n\t\t\t\tvec2 uv = equirectUv( outputDirection );\n\n\t\t\t\tvec2 f = fract( uv / texelSize - 0.5 );\n\t\t\t\tuv -= f * texelSize;\n\t\t\t\tvec3 tl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;\n\t\t\t\tuv.x += texelSize.x;\n\t\t\t\tvec3 tr = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;\n\t\t\t\tuv.y += texelSize.y;\n\t\t\t\tvec3 br = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;\n\t\t\t\tuv.x -= texelSize.x;\n\t\t\t\tvec3 bl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;\n\n\t\t\t\tvec3 tm = mix( tl, tr, f.x );\n\t\t\t\tvec3 bm = mix( bl, br, f.x );\n\t\t\t\tgl_FragColor.rgb = mix( tm, bm, f.y );\n\n\t\t\t\tgl_FragColor = linearToOutputTexel( gl_FragColor );\n\n\t\t\t}\n\t\t`,
			blending: 0,
			depthTest: !1,
			depthWrite: !1
		})
	}

	function Ou() {
		return new pu({
			name: "CubemapToCubeUV",
			uniforms: {
				envMap: {
					value: null
				},
				inputEncoding: {
					value: yu[3e3]
				},
				outputEncoding: {
					value: yu[3e3]
				}
			},
			vertexShader: Nu(),
			fragmentShader: `\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform samplerCube envMap;\n\n\t\t\t${zu()}\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\tgl_FragColor.rgb = envMapTexelToLinear( textureCube( envMap, vec3( - vOutputDirection.x, vOutputDirection.yz ) ) ).rgb;\n\t\t\t\tgl_FragColor = linearToOutputTexel( gl_FragColor );\n\n\t\t\t}\n\t\t`,
			blending: 0,
			depthTest: !1,
			depthWrite: !1
		})
	}

	function Nu() {
		return "\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute vec3 position;\n\t\tattribute vec2 uv;\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t"
	}

	function zu() {
		return "\n\n\t\tuniform int inputEncoding;\n\t\tuniform int outputEncoding;\n\n\t\t#include <encodings_pars_fragment>\n\n\t\tvec4 inputTexelToLinear( vec4 value ) {\n\n\t\t\tif ( inputEncoding == 0 ) {\n\n\t\t\t\treturn value;\n\n\t\t\t} else if ( inputEncoding == 1 ) {\n\n\t\t\t\treturn sRGBToLinear( value );\n\n\t\t\t} else if ( inputEncoding == 2 ) {\n\n\t\t\t\treturn RGBEToLinear( value );\n\n\t\t\t} else if ( inputEncoding == 3 ) {\n\n\t\t\t\treturn RGBMToLinear( value, 7.0 );\n\n\t\t\t} else if ( inputEncoding == 4 ) {\n\n\t\t\t\treturn RGBMToLinear( value, 16.0 );\n\n\t\t\t} else if ( inputEncoding == 5 ) {\n\n\t\t\t\treturn RGBDToLinear( value, 256.0 );\n\n\t\t\t} else {\n\n\t\t\t\treturn GammaToLinear( value, 2.2 );\n\n\t\t\t}\n\n\t\t}\n\n\t\tvec4 linearToOutputTexel( vec4 value ) {\n\n\t\t\tif ( outputEncoding == 0 ) {\n\n\t\t\t\treturn value;\n\n\t\t\t} else if ( outputEncoding == 1 ) {\n\n\t\t\t\treturn LinearTosRGB( value );\n\n\t\t\t} else if ( outputEncoding == 2 ) {\n\n\t\t\t\treturn LinearToRGBE( value );\n\n\t\t\t} else if ( outputEncoding == 3 ) {\n\n\t\t\t\treturn LinearToRGBM( value, 7.0 );\n\n\t\t\t} else if ( outputEncoding == 4 ) {\n\n\t\t\t\treturn LinearToRGBM( value, 16.0 );\n\n\t\t\t} else if ( outputEncoding == 5 ) {\n\n\t\t\t\treturn LinearToRGBD( value, 256.0 );\n\n\t\t\t} else {\n\n\t\t\t\treturn LinearToGamma( value, 2.2 );\n\n\t\t\t}\n\n\t\t}\n\n\t\tvec4 envMapTexelToLinear( vec4 color ) {\n\n\t\t\treturn inputTexelToLinear( color );\n\n\t\t}\n\t"
	}

	function Bu(t) {
		let e = new WeakMap,
			n = null;

		function i(t) {
			const n = t.target;
			n.removeEventListener("dispose", i);
			const r = e.get(n);
			void 0 !== r && (e.delete(n), r.dispose())
		}
		return {
			get: function (r) {
				if (r && r.isTexture && !1 === r.isRenderTargetTexture) {
					const s = r.mapping,
						a = 303 === s || 304 === s,
						o = s === Ro || s === Po;
					if (a || o) {
						if (e.has(r)) return e.get(r).texture; {
							const s = r.image;
							if (a && s && s.height > 0 || o && s && function (t) {
									let e = 0;
									const n = 6;
									for (let i = 0; i < n; i++) void 0 !== t[i] && e++;
									return e === n
								}(s)) {
								const s = t.getRenderTarget();
								null === n && (n = new Lu(t));
								const o = a ? n.fromEquirectangular(r) : n.fromCubemap(r);
								return e.set(r, o), t.setRenderTarget(s), r.addEventListener("dispose", i), o.texture
							}
							return null
						}
					}
				}
				return r
			},
			dispose: function () {
				e = new WeakMap, null !== n && (n.dispose(), n = null)
			}
		}
	}

	function Fu(t) {
		const e = {};

		function n(n) {
			if (void 0 !== e[n]) return e[n];
			let i;
			switch (n) {
				case "WEBGL_depth_texture":
					i = t.getExtension("WEBGL_depth_texture") || t.getExtension("MOZ_WEBGL_depth_texture") || t.getExtension("WEBKIT_WEBGL_depth_texture");
					break;
				case "EXT_texture_filter_anisotropic":
					i = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
					break;
				case "WEBGL_compressed_texture_s3tc":
					i = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
					break;
				case "WEBGL_compressed_texture_pvrtc":
					i = t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
					break;
				default:
					i = t.getExtension(n)
			}
			return e[n] = i, i
		}
		return {
			has: function (t) {
				return null !== n(t)
			},
			init: function (t) {
				t.isWebGL2 ? n("EXT_color_buffer_float") : (n("WEBGL_depth_texture"), n("OES_texture_float"), n("OES_texture_half_float"), n("OES_texture_half_float_linear"), n("OES_standard_derivatives"), n("OES_element_index_uint"), n("OES_vertex_array_object"), n("ANGLE_instanced_arrays")), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture")
			},
			get: function (t) {
				const e = n(t);
				return null === e && console.warn("THREE.WebGLRenderer: " + t + " extension not supported."), e
			}
		}
	}

	function ku(t, e, n, i) {
		const r = {},
			s = new WeakMap;

		function a(t) {
			const o = t.target;
			null !== o.index && e.remove(o.index);
			for (const t in o.attributes) e.remove(o.attributes[t]);
			o.removeEventListener("dispose", a), delete r[o.id];
			const l = s.get(o);
			l && (e.remove(l), s.delete(o)), i.releaseStatesOfGeometry(o), !0 === o.isInstancedBufferGeometry && delete o._maxInstanceCount, n.memory.geometries--
		}

		function o(t) {
			const n = [],
				i = t.index,
				r = t.attributes.position;
			let a = 0;
			if (null !== i) {
				const t = i.array;
				a = i.version;
				for (let e = 0, i = t.length; e < i; e += 3) {
					const i = t[e + 0],
						r = t[e + 1],
						s = t[e + 2];
					n.push(i, r, r, s, s, i)
				}
			} else {
				const t = r.array;
				a = r.version;
				for (let e = 0, i = t.length / 3 - 1; e < i; e += 3) {
					const t = e + 0,
						i = e + 1,
						r = e + 2;
					n.push(t, i, i, r, r, t)
				}
			}
			const o = new(wl(n) > 65535 ? oh : ah)(n, 1);
			o.version = a;
			const l = s.get(t);
			l && e.remove(l), s.set(t, o)
		}
		return {
			get: function (t, e) {
				return !0 === r[e.id] || (e.addEventListener("dispose", a), r[e.id] = !0, n.memory.geometries++), e
			},
			update: function (t) {
				const n = t.attributes;
				for (const t in n) e.update(n[t], 34962);
				const i = t.morphAttributes;
				for (const t in i) {
					const n = i[t];
					for (let t = 0, i = n.length; t < i; t++) e.update(n[t], 34962)
				}
			},
			getWireframeAttribute: function (t) {
				const e = s.get(t);
				if (e) {
					const n = t.index;
					null !== n && e.version < n.version && o(t)
				} else o(t);
				return s.get(t)
			}
		}
	}

	function Uu(t, e, n, i) {
		const r = i.isWebGL2;
		let s, a, o;
		this.setMode = function (t) {
			s = t
		}, this.setIndex = function (t) {
			a = t.type, o = t.bytesPerElement
		}, this.render = function (e, i) {
			t.drawElements(s, i, a, e * o), n.update(i, s, 1)
		}, this.renderInstances = function (i, l, c) {
			if (0 === c) return;
			let h, u;
			if (r) h = t, u = "drawElementsInstanced";
			else if (h = e.get("ANGLE_instanced_arrays"), u = "drawElementsInstancedANGLE", null === h) return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
			h[u](s, l, a, i * o, c), n.update(l, s, c)
		}
	}

	function Hu(t) {
		const e = {
			frame: 0,
			calls: 0,
			triangles: 0,
			points: 0,
			lines: 0
		};
		return {
			memory: {
				geometries: 0,
				textures: 0
			},
			render: e,
			programs: null,
			autoReset: !0,
			reset: function () {
				e.frame++, e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0
			},
			update: function (t, n, i) {
				switch (e.calls++, n) {
					case 4:
						e.triangles += i * (t / 3);
						break;
					case 1:
						e.lines += i * (t / 2);
						break;
					case 3:
						e.lines += i * (t - 1);
						break;
					case 2:
						e.lines += i * t;
						break;
					case 0:
						e.points += i * t;
						break;
					default:
						console.error("THREE.WebGLInfo: Unknown draw mode:", n)
				}
			}
		}
	}
	class Gu extends Al {
		constructor(t = null, e = 1, n = 1, i = 1) {
			super(null), this.image = {
				data: t,
				width: e,
				height: n,
				depth: i
			}, this.magFilter = zo, this.minFilter = zo, this.wrapR = Oo, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0
		}
	}

	function Vu(t, e) {
		return t[0] - e[0]
	}

	function Wu(t, e) {
		return Math.abs(e[1]) - Math.abs(t[1])
	}

	function qu(t, e) {
		let n = 1;
		const i = e.isInterleavedBufferAttribute ? e.data.array : e.array;
		i instanceof Int8Array ? n = 127 : i instanceof Int16Array ? n = 32767 : i instanceof Int32Array ? n = 2147483647 : console.error("THREE.WebGLMorphtargets: Unsupported morph attribute data type: ", i), t.divideScalar(n)
	}

	function ju(t, e, n) {
		const i = {},
			r = new Float32Array(8),
			s = new WeakMap,
			a = new Il,
			o = [];
		for (let t = 0; t < 8; t++) o[t] = [t, 0];
		return {
			update: function (l, c, h, u) {
				const d = l.morphTargetInfluences;
				if (!0 === e.isWebGL2) {
					const i = c.morphAttributes.position.length;
					let r = s.get(c);
					if (void 0 === r || r.count !== i) {
						void 0 !== r && r.texture.dispose();
						const t = void 0 !== c.morphAttributes.normal,
							n = c.morphAttributes.position,
							o = c.morphAttributes.normal || [],
							l = !0 === t ? 2 : 1;
						let h = c.attributes.position.count * l,
							u = 1;
						h > e.maxTextureSize && (u = Math.ceil(h / e.maxTextureSize), h = e.maxTextureSize);
						const d = new Float32Array(h * u * 4 * i),
							p = new Gu(d, h, u, i);
						p.format = jo, p.type = Go;
						const m = 4 * l;
						for (let e = 0; e < i; e++) {
							const i = n[e],
								r = o[e],
								s = h * u * 4 * e;
							for (let e = 0; e < i.count; e++) {
								a.fromBufferAttribute(i, e), !0 === i.normalized && qu(a, i);
								const n = e * m;
								d[s + n + 0] = a.x, d[s + n + 1] = a.y, d[s + n + 2] = a.z, d[s + n + 3] = 0, !0 === t && (a.fromBufferAttribute(r, e), !0 === r.normalized && qu(a, r), d[s + n + 4] = a.x, d[s + n + 5] = a.y, d[s + n + 6] = a.z, d[s + n + 7] = 0)
							}
						}
						r = {
							count: i,
							texture: p,
							size: new _l(h, u)
						}, s.set(c, r)
					}
					let o = 0;
					for (let t = 0; t < d.length; t++) o += d[t];
					const l = c.morphTargetsRelative ? 1 : 1 - o;
					u.getUniforms().setValue(t, "morphTargetBaseInfluence", l), u.getUniforms().setValue(t, "morphTargetInfluences", d), u.getUniforms().setValue(t, "morphTargetsTexture", r.texture, n), u.getUniforms().setValue(t, "morphTargetsTextureSize", r.size)
				} else {
					const e = void 0 === d ? 0 : d.length;
					let n = i[c.id];
					if (void 0 === n || n.length !== e) {
						n = [];
						for (let t = 0; t < e; t++) n[t] = [t, 0];
						i[c.id] = n
					}
					for (let t = 0; t < e; t++) {
						const e = n[t];
						e[0] = t, e[1] = d[t]
					}
					n.sort(Wu);
					for (let t = 0; t < 8; t++) t < e && n[t][1] ? (o[t][0] = n[t][0], o[t][1] = n[t][1]) : (o[t][0] = Number.MAX_SAFE_INTEGER, o[t][1] = 0);
					o.sort(Vu);
					const s = c.morphAttributes.position,
						a = c.morphAttributes.normal;
					let l = 0;
					for (let t = 0; t < 8; t++) {
						const e = o[t],
							n = e[0],
							i = e[1];
						n !== Number.MAX_SAFE_INTEGER && i ? (s && c.getAttribute("morphTarget" + t) !== s[n] && c.setAttribute("morphTarget" + t, s[n]), a && c.getAttribute("morphNormal" + t) !== a[n] && c.setAttribute("morphNormal" + t, a[n]), r[t] = i, l += i) : (s && !0 === c.hasAttribute("morphTarget" + t) && c.deleteAttribute("morphTarget" + t), a && !0 === c.hasAttribute("morphNormal" + t) && c.deleteAttribute("morphNormal" + t), r[t] = 0)
					}
					const h = c.morphTargetsRelative ? 1 : 1 - l;
					u.getUniforms().setValue(t, "morphTargetBaseInfluence", h), u.getUniforms().setValue(t, "morphTargetInfluences", r)
				}
			}
		}
	}

	function Xu(t, e, n, i) {
		let r = new WeakMap;

		function s(t) {
			const e = t.target;
			e.removeEventListener("dispose", s), n.remove(e.instanceMatrix), null !== e.instanceColor && n.remove(e.instanceColor)
		}
		return {
			update: function (t) {
				const a = i.render.frame,
					o = t.geometry,
					l = e.get(t, o);
				return r.get(l) !== a && (e.update(l), r.set(l, a)), t.isInstancedMesh && (!1 === t.hasEventListener("dispose", s) && t.addEventListener("dispose", s), n.update(t.instanceMatrix, 34962), null !== t.instanceColor && n.update(t.instanceColor, 34962)), l
			},
			dispose: function () {
				r = new WeakMap
			}
		}
	}
	Gu.prototype.isDataTexture2DArray = !0;
	class Yu extends Al {
		constructor(t = null, e = 1, n = 1, i = 1) {
			super(null), this.image = {
				data: t,
				width: e,
				height: n,
				depth: i
			}, this.magFilter = zo, this.minFilter = zo, this.wrapR = Oo, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0
		}
	}
	Yu.prototype.isDataTexture3D = !0;
	const Ju = new Al,
		Zu = new Gu,
		Qu = new Yu,
		Ku = new qh,
		$u = [],
		td = [],
		ed = new Float32Array(16),
		nd = new Float32Array(9),
		id = new Float32Array(4);

	function rd(t, e, n) {
		const i = t[0];
		if (i <= 0 || i > 0) return t;
		const r = e * n;
		let s = $u[r];
		if (void 0 === s && (s = new Float32Array(r), $u[r] = s), 0 !== e) {
			i.toArray(s, 0);
			for (let i = 1, r = 0; i !== e; ++i) r += n, t[i].toArray(s, r)
		}
		return s
	}

	function sd(t, e) {
		if (t.length !== e.length) return !1;
		for (let n = 0, i = t.length; n < i; n++)
			if (t[n] !== e[n]) return !1;
		return !0
	}

	function ad(t, e) {
		for (let n = 0, i = e.length; n < i; n++) t[n] = e[n]
	}

	function od(t, e) {
		let n = td[e];
		void 0 === n && (n = new Int32Array(e), td[e] = n);
		for (let i = 0; i !== e; ++i) n[i] = t.allocateTextureUnit();
		return n
	}

	function ld(t, e) {
		const n = this.cache;
		n[0] !== e && (t.uniform1f(this.addr, e), n[0] = e)
	}

	function cd(t, e) {
		const n = this.cache;
		if (void 0 !== e.x) n[0] === e.x && n[1] === e.y || (t.uniform2f(this.addr, e.x, e.y), n[0] = e.x, n[1] = e.y);
		else {
			if (sd(n, e)) return;
			t.uniform2fv(this.addr, e), ad(n, e)
		}
	}

	function hd(t, e) {
		const n = this.cache;
		if (void 0 !== e.x) n[0] === e.x && n[1] === e.y && n[2] === e.z || (t.uniform3f(this.addr, e.x, e.y, e.z), n[0] = e.x, n[1] = e.y, n[2] = e.z);
		else if (void 0 !== e.r) n[0] === e.r && n[1] === e.g && n[2] === e.b || (t.uniform3f(this.addr, e.r, e.g, e.b), n[0] = e.r, n[1] = e.g, n[2] = e.b);
		else {
			if (sd(n, e)) return;
			t.uniform3fv(this.addr, e), ad(n, e)
		}
	}

	function ud(t, e) {
		const n = this.cache;
		if (void 0 !== e.x) n[0] === e.x && n[1] === e.y && n[2] === e.z && n[3] === e.w || (t.uniform4f(this.addr, e.x, e.y, e.z, e.w), n[0] = e.x, n[1] = e.y, n[2] = e.z, n[3] = e.w);
		else {
			if (sd(n, e)) return;
			t.uniform4fv(this.addr, e), ad(n, e)
		}
	}

	function dd(t, e) {
		const n = this.cache,
			i = e.elements;
		if (void 0 === i) {
			if (sd(n, e)) return;
			t.uniformMatrix2fv(this.addr, !1, e), ad(n, e)
		} else {
			if (sd(n, i)) return;
			id.set(i), t.uniformMatrix2fv(this.addr, !1, id), ad(n, i)
		}
	}

	function pd(t, e) {
		const n = this.cache,
			i = e.elements;
		if (void 0 === i) {
			if (sd(n, e)) return;
			t.uniformMatrix3fv(this.addr, !1, e), ad(n, e)
		} else {
			if (sd(n, i)) return;
			nd.set(i), t.uniformMatrix3fv(this.addr, !1, nd), ad(n, i)
		}
	}

	function md(t, e) {
		const n = this.cache,
			i = e.elements;
		if (void 0 === i) {
			if (sd(n, e)) return;
			t.uniformMatrix4fv(this.addr, !1, e), ad(n, e)
		} else {
			if (sd(n, i)) return;
			ed.set(i), t.uniformMatrix4fv(this.addr, !1, ed), ad(n, i)
		}
	}

	function fd(t, e) {
		const n = this.cache;
		n[0] !== e && (t.uniform1i(this.addr, e), n[0] = e)
	}

	function gd(t, e) {
		const n = this.cache;
		sd(n, e) || (t.uniform2iv(this.addr, e), ad(n, e))
	}

	function vd(t, e) {
		const n = this.cache;
		sd(n, e) || (t.uniform3iv(this.addr, e), ad(n, e))
	}

	function yd(t, e) {
		const n = this.cache;
		sd(n, e) || (t.uniform4iv(this.addr, e), ad(n, e))
	}

	function _d(t, e) {
		const n = this.cache;
		n[0] !== e && (t.uniform1ui(this.addr, e), n[0] = e)
	}

	function xd(t, e) {
		const n = this.cache;
		sd(n, e) || (t.uniform2uiv(this.addr, e),
			ad(n, e))
	}

	function wd(t, e) {
		const n = this.cache;
		sd(n, e) || (t.uniform3uiv(this.addr, e), ad(n, e))
	}

	function bd(t, e) {
		const n = this.cache;
		sd(n, e) || (t.uniform4uiv(this.addr, e), ad(n, e))
	}

	function Md(t, e, n) {
		const i = this.cache,
			r = n.allocateTextureUnit();
		i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.safeSetTexture2D(e || Ju, r)
	}

	function Sd(t, e, n) {
		const i = this.cache,
			r = n.allocateTextureUnit();
		i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTexture3D(e || Qu, r)
	}

	function Td(t, e, n) {
		const i = this.cache,
			r = n.allocateTextureUnit();
		i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.safeSetTextureCube(e || Ku, r)
	}

	function Ed(t, e, n) {
		const i = this.cache,
			r = n.allocateTextureUnit();
		i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTexture2DArray(e || Zu, r)
	}

	function Ad(t, e) {
		t.uniform1fv(this.addr, e)
	}

	function Ld(t, e) {
		const n = rd(e, this.size, 2);
		t.uniform2fv(this.addr, n)
	}

	function Cd(t, e) {
		const n = rd(e, this.size, 3);
		t.uniform3fv(this.addr, n)
	}

	function Rd(t, e) {
		const n = rd(e, this.size, 4);
		t.uniform4fv(this.addr, n)
	}

	function Pd(t, e) {
		const n = rd(e, this.size, 4);
		t.uniformMatrix2fv(this.addr, !1, n)
	}

	function Dd(t, e) {
		const n = rd(e, this.size, 9);
		t.uniformMatrix3fv(this.addr, !1, n)
	}

	function Id(t, e) {
		const n = rd(e, this.size, 16);
		t.uniformMatrix4fv(this.addr, !1, n)
	}

	function Od(t, e) {
		t.uniform1iv(this.addr, e)
	}

	function Nd(t, e) {
		t.uniform2iv(this.addr, e)
	}

	function zd(t, e) {
		t.uniform3iv(this.addr, e)
	}

	function Bd(t, e) {
		t.uniform4iv(this.addr, e)
	}

	function Fd(t, e) {
		t.uniform1uiv(this.addr, e)
	}

	function kd(t, e) {
		t.uniform2uiv(this.addr, e)
	}

	function Ud(t, e) {
		t.uniform3uiv(this.addr, e)
	}

	function Hd(t, e) {
		t.uniform4uiv(this.addr, e)
	}

	function Gd(t, e, n) {
		const i = e.length,
			r = od(n, i);
		t.uniform1iv(this.addr, r);
		for (let t = 0; t !== i; ++t) n.safeSetTexture2D(e[t] || Ju, r[t])
	}

	function Vd(t, e, n) {
		const i = e.length,
			r = od(n, i);
		t.uniform1iv(this.addr, r);
		for (let t = 0; t !== i; ++t) n.setTexture3D(e[t] || Qu, r[t])
	}

	function Wd(t, e, n) {
		const i = e.length,
			r = od(n, i);
		t.uniform1iv(this.addr, r);
		for (let t = 0; t !== i; ++t) n.safeSetTextureCube(e[t] || Ku, r[t])
	}

	function qd(t, e, n) {
		const i = e.length,
			r = od(n, i);
		t.uniform1iv(this.addr, r);
		for (let t = 0; t !== i; ++t) n.setTexture2DArray(e[t] || Zu, r[t])
	}

	function jd(t, e, n) {
		this.id = t, this.addr = n, this.cache = [], this.setValue = function (t) {
			switch (t) {
				case 5126:
					return ld;
				case 35664:
					return cd;
				case 35665:
					return hd;
				case 35666:
					return ud;
				case 35674:
					return dd;
				case 35675:
					return pd;
				case 35676:
					return md;
				case 5124:
				case 35670:
					return fd;
				case 35667:
				case 35671:
					return gd;
				case 35668:
				case 35672:
					return vd;
				case 35669:
				case 35673:
					return yd;
				case 5125:
					return _d;
				case 36294:
					return xd;
				case 36295:
					return wd;
				case 36296:
					return bd;
				case 35678:
				case 36198:
				case 36298:
				case 36306:
				case 35682:
					return Md;
				case 35679:
				case 36299:
				case 36307:
					return Sd;
				case 35680:
				case 36300:
				case 36308:
				case 36293:
					return Td;
				case 36289:
				case 36303:
				case 36311:
				case 36292:
					return Ed
			}
		}(e.type)
	}

	function Xd(t, e, n) {
		this.id = t, this.addr = n, this.cache = [], this.size = e.size, this.setValue = function (t) {
			switch (t) {
				case 5126:
					return Ad;
				case 35664:
					return Ld;
				case 35665:
					return Cd;
				case 35666:
					return Rd;
				case 35674:
					return Pd;
				case 35675:
					return Dd;
				case 35676:
					return Id;
				case 5124:
				case 35670:
					return Od;
				case 35667:
				case 35671:
					return Nd;
				case 35668:
				case 35672:
					return zd;
				case 35669:
				case 35673:
					return Bd;
				case 5125:
					return Fd;
				case 36294:
					return kd;
				case 36295:
					return Ud;
				case 36296:
					return Hd;
				case 35678:
				case 36198:
				case 36298:
				case 36306:
				case 35682:
					return Gd;
				case 35679:
				case 36299:
				case 36307:
					return Vd;
				case 35680:
				case 36300:
				case 36308:
				case 36293:
					return Wd;
				case 36289:
				case 36303:
				case 36311:
				case 36292:
					return qd
			}
		}(e.type)
	}

	function Yd(t) {
		this.id = t, this.seq = [], this.map = {}
	}
	Xd.prototype.updateCache = function (t) {
		const e = this.cache;
		t instanceof Float32Array && e.length !== t.length && (this.cache = new Float32Array(t.length)), ad(e, t)
	}, Yd.prototype.setValue = function (t, e, n) {
		const i = this.seq;
		for (let r = 0, s = i.length; r !== s; ++r) {
			const s = i[r];
			s.setValue(t, e[s.id], n)
		}
	};
	const Jd = /(\w+)(\])?(\[|\.)?/g;

	function Zd(t, e) {
		t.seq.push(e), t.map[e.id] = e
	}

	function Qd(t, e, n) {
		const i = t.name,
			r = i.length;
		for (Jd.lastIndex = 0;;) {
			const s = Jd.exec(i),
				a = Jd.lastIndex;
			let o = s[1];
			const l = "]" === s[2],
				c = s[3];
			if (l && (o |= 0), void 0 === c || "[" === c && a + 2 === r) {
				Zd(n, void 0 === c ? new jd(o, t, e) : new Xd(o, t, e));
				break
			} {
				let t = n.map[o];
				void 0 === t && (t = new Yd(o), Zd(n, t)), n = t
			}
		}
	}

	function Kd(t, e) {
		this.seq = [], this.map = {};
		const n = t.getProgramParameter(e, 35718);
		for (let i = 0; i < n; ++i) {
			const n = t.getActiveUniform(e, i);
			Qd(n, t.getUniformLocation(e, n.name), this)
		}
	}

	function $d(t, e, n) {
		const i = t.createShader(e);
		return t.shaderSource(i, n), t.compileShader(i), i
	}
	Kd.prototype.setValue = function (t, e, n, i) {
		const r = this.map[e];
		void 0 !== r && r.setValue(t, n, i)
	}, Kd.prototype.setOptional = function (t, e, n) {
		const i = e[n];
		void 0 !== i && this.setValue(t, n, i)
	}, Kd.upload = function (t, e, n, i) {
		for (let r = 0, s = e.length; r !== s; ++r) {
			const s = e[r],
				a = n[s.id];
			!1 !== a.needsUpdate && s.setValue(t, a.value, i)
		}
	}, Kd.seqWithValue = function (t, e) {
		const n = [];
		for (let i = 0, r = t.length; i !== r; ++i) {
			const r = t[i];
			r.id in e && n.push(r)
		}
		return n
	};
	let tp = 0;

	function ep(t) {
		switch (t) {
			case nl:
				return ["Linear", "( value )"];
			case il:
				return ["sRGB", "( value )"];
			case sl:
				return ["RGBE", "( value )"];
			case 3004:
				return ["RGBM", "( value, 7.0 )"];
			case 3005:
				return ["RGBM", "( value, 16.0 )"];
			case 3006:
				return ["RGBD", "( value, 256.0 )"];
			case rl:
				return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
			default:
				return console.warn("THREE.WebGLProgram: Unsupported encoding:", t), ["Linear", "( value )"]
		}
	}

	function np(t, e, n) {
		const i = t.getShaderParameter(e, 35713),
			r = t.getShaderInfoLog(e).trim();
		return i && "" === r ? "" : n.toUpperCase() + "\n\n" + r + "\n\n" + function (t) {
			const e = t.split("\n");
			for (let t = 0; t < e.length; t++) e[t] = t + 1 + ": " + e[t];
			return e.join("\n")
		}(t.getShaderSource(e))
	}

	function ip(t, e) {
		const n = ep(e);
		return "vec4 " + t + "( vec4 value ) { return " + n[0] + "ToLinear" + n[1] + "; }"
	}

	function rp(t, e) {
		const n = ep(e);
		return "vec4 " + t + "( vec4 value ) { return LinearTo" + n[0] + n[1] + "; }"
	}

	function sp(t, e) {
		let n;
		switch (e) {
			case 1:
				n = "Linear";
				break;
			case 2:
				n = "Reinhard";
				break;
			case 3:
				n = "OptimizedCineon";
				break;
			case 4:
				n = "ACESFilmic";
				break;
			case 5:
				n = "Custom";
				break;
			default:
				console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), n = "Linear"
		}
		return "vec3 " + t + "( vec3 color ) { return " + n + "ToneMapping( color ); }"
	}

	function ap(t) {
		return "" !== t
	}

	function op(t, e) {
		return t.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows)
	}

	function lp(t, e) {
		return t.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection)
	}
	const cp = /^[ \t]*#include +<([\w\d./]+)>/gm;

	function hp(t) {
		return t.replace(cp, up)
	}

	function up(t, e) {
		const n = iu[e];
		if (void 0 === n) throw new Error("Can not resolve #include <" + e + ">");
		return hp(n)
	}
	const dp = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
		pp = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

	function mp(t) {
		return t.replace(pp, gp).replace(dp, fp)
	}

	function fp(t, e, n, i) {
		return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."), gp(t, e, n, i)
	}

	function gp(t, e, n, i) {
		let r = "";
		for (let t = parseInt(e); t < parseInt(n); t++) r += i.replace(/\[\s*i\s*\]/g, "[ " + t + " ]").replace(/UNROLLED_LOOP_INDEX/g, t);
		return r
	}

	function vp(t) {
		let e = "precision " + t.precision + " float;\nprecision " + t.precision + " int;";
		return "highp" === t.precision ? e += "\n#define HIGH_PRECISION" : "mediump" === t.precision ? e += "\n#define MEDIUM_PRECISION" : "lowp" === t.precision && (e += "\n#define LOW_PRECISION"), e
	}

	function yp(t, e, n, i) {
		const r = t.getContext(),
			s = n.defines;
		let a = n.vertexShader,
			o = n.fragmentShader;
		const l = function (t) {
				let e = "SHADOWMAP_TYPE_BASIC";
				return 1 === t.shadowMapType ? e = "SHADOWMAP_TYPE_PCF" : 2 === t.shadowMapType ? e = "SHADOWMAP_TYPE_PCF_SOFT" : 3 === t.shadowMapType && (e = "SHADOWMAP_TYPE_VSM"), e
			}(n),
			c = function (t) {
				let e = "ENVMAP_TYPE_CUBE";
				if (t.envMap) switch (t.envMapMode) {
					case Ro:
					case Po:
						e = "ENVMAP_TYPE_CUBE";
						break;
					case Do:
					case 307:
						e = "ENVMAP_TYPE_CUBE_UV"
				}
				return e
			}(n),
			h = function (t) {
				let e = "ENVMAP_MODE_REFLECTION";
				if (t.envMap) switch (t.envMapMode) {
					case Po:
					case 307:
						e = "ENVMAP_MODE_REFRACTION"
				}
				return e
			}(n),
			u = function (t) {
				let e = "ENVMAP_BLENDING_NONE";
				if (t.envMap) switch (t.combine) {
					case 0:
						e = "ENVMAP_BLENDING_MULTIPLY";
						break;
					case 1:
						e = "ENVMAP_BLENDING_MIX";
						break;
					case 2:
						e = "ENVMAP_BLENDING_ADD"
				}
				return e
			}(n),
			d = t.gammaFactor > 0 ? t.gammaFactor : 1,
			p = n.isWebGL2 ? "" : function (t) {
				return [t.extensionDerivatives || t.envMapCubeUV || t.bumpMap || t.tangentSpaceNormalMap || t.clearcoatNormalMap || t.flatShading || "physical" === t.shaderID ? "#extension GL_OES_standard_derivatives : enable" : "", (t.extensionFragDepth || t.logarithmicDepthBuffer) && t.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", t.extensionDrawBuffers && t.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (t.extensionShaderTextureLOD || t.envMap || t.transmission) && t.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(ap).join("\n")
			}(n),
			m = function (t) {
				const e = [];
				for (const n in t) {
					const i = t[n];
					!1 !== i && e.push("#define " + n + " " + i)
				}
				return e.join("\n")
			}(s),
			f = r.createProgram();
		let g, v, y = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
		n.isRawShaderMaterial ? (g = [m].filter(ap).join("\n"), g.length > 0 && (g += "\n"), v = [p, m].filter(ap).join("\n"), v.length > 0 && (v += "\n")) : (g = [vp(n), "#define SHADER_NAME " + n.shaderName, m, n.instancing ? "#define USE_INSTANCING" : "", n.instancingColor ? "#define USE_INSTANCING_COLOR" : "", n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + d, "#define MAX_BONES " + n.maxBones, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + h : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", n.normalMap && n.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.displacementMap && n.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", n.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.transmission ? "#define USE_TRANSMISSION" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.thicknessMap ? "#define USE_THICKNESSMAP" : "", n.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "", n.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "", n.vertexTangents ? "#define USE_TANGENT" : "", n.vertexColors ? "#define USE_COLOR" : "", n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", n.vertexUvs ? "#define USE_UV" : "", n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.useVertexTexture ? "#define BONE_TEXTURE" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals && !1 === n.flatShading ? "#define USE_MORPHNORMALS" : "", n.morphTargets && n.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "", n.morphTargets && n.isWebGL2 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + l : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && n.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "\tattribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "\tattribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_TANGENT", "\tattribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "\tattribute vec4 color;", "#elif defined( USE_COLOR )", "\tattribute vec3 color;", "#endif", "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(ap).join("\n"), v = [p, vp(n), "#define SHADER_NAME " + n.shaderName, m, "#define GAMMA_FACTOR " + d, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.matcap ? "#define USE_MATCAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + c : "", n.envMap ? "#define " + h : "", n.envMap ? "#define " + u : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", n.normalMap && n.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", n.clearcoat ? "#define USE_CLEARCOAT" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", n.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.alphaTest ? "#define USE_ALPHATEST" : "", n.sheen ? "#define USE_SHEEN" : "", n.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "", n.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "", n.transmission ? "#define USE_TRANSMISSION" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.thicknessMap ? "#define USE_THICKNESSMAP" : "", n.vertexTangents ? "#define USE_TANGENT" : "", n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "", n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", n.vertexUvs ? "#define USE_UV" : "", n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", n.gradientMap ? "#define USE_GRADIENTMAP" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + l : "", n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", n.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.logarithmicDepthBuffer && n.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", (n.extensionShaderTextureLOD || n.envMap) && n.rendererExtensionShaderTextureLod ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", 0 !== n.toneMapping ? "#define TONE_MAPPING" : "", 0 !== n.toneMapping ? iu.tonemapping_pars_fragment : "", 0 !== n.toneMapping ? sp("toneMapping", n.toneMapping) : "", n.dithering ? "#define DITHERING" : "", n.format === qo ? "#define OPAQUE" : "", iu.encodings_pars_fragment, n.map ? ip("mapTexelToLinear", n.mapEncoding) : "", n.matcap ? ip("matcapTexelToLinear", n.matcapEncoding) : "", n.envMap ? ip("envMapTexelToLinear", n.envMapEncoding) : "", n.emissiveMap ? ip("emissiveMapTexelToLinear", n.emissiveMapEncoding) : "", n.specularColorMap ? ip("specularColorMapTexelToLinear", n.specularColorMapEncoding) : "", n.sheenColorMap ? ip("sheenColorMapTexelToLinear", n.sheenColorMapEncoding) : "", n.lightMap ? ip("lightMapTexelToLinear", n.lightMapEncoding) : "", rp("linearToOutputTexel", n.outputEncoding), n.depthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "", "\n"].filter(ap).join("\n")), a = hp(a), a = op(a, n), a = lp(a, n), o = hp(o), o = op(o, n), o = lp(o, n), a = mp(a), o = mp(o), n.isWebGL2 && !0 !== n.isRawShaderMaterial && (y = "#version 300 es\n", g = ["precision mediump sampler2DArray;", "#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + g, v = ["#define varying in", n.glslVersion === cl ? "" : "out highp vec4 pc_fragColor;", n.glslVersion === cl ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + v);
		const _ = y + v + o,
			x = $d(r, 35633, y + g + a),
			w = $d(r, 35632, _);
		if (r.attachShader(f, x), r.attachShader(f, w), void 0 !== n.index0AttributeName ? r.bindAttribLocation(f, 0, n.index0AttributeName) : !0 === n.morphTargets && r.bindAttribLocation(f, 0, "position"), r.linkProgram(f), t.debug.checkShaderErrors) {
			const t = r.getProgramInfoLog(f).trim(),
				e = r.getShaderInfoLog(x).trim(),
				n = r.getShaderInfoLog(w).trim();
			let i = !0,
				s = !0;
			if (!1 === r.getProgramParameter(f, 35714)) {
				i = !1;
				const e = np(r, x, "vertex"),
					n = np(r, w, "fragment");
				console.error("THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(f, 35715) + "\n\nProgram Info Log: " + t + "\n" + e + "\n" + n)
			} else "" !== t ? console.warn("THREE.WebGLProgram: Program Info Log:", t) : "" !== e && "" !== n || (s = !1);
			s && (this.diagnostics = {
				runnable: i,
				programLog: t,
				vertexShader: {
					log: e,
					prefix: g
				},
				fragmentShader: {
					log: n,
					prefix: v
				}
			})
		}
		let b, M;
		return r.deleteShader(x), r.deleteShader(w), this.getUniforms = function () {
			return void 0 === b && (b = new Kd(r, f)), b
		}, this.getAttributes = function () {
			return void 0 === M && (M = function (t, e) {
				const n = {},
					i = t.getProgramParameter(e, 35721);
				for (let r = 0; r < i; r++) {
					const i = t.getActiveAttrib(e, r),
						s = i.name;
					let a = 1;
					35674 === i.type && (a = 2), 35675 === i.type && (a = 3), 35676 === i.type && (a = 4), n[s] = {
						type: i.type,
						location: t.getAttribLocation(e, s),
						locationSize: a
					}
				}
				return n
			}(r, f)), M
		}, this.destroy = function () {
			i.releaseStatesOfProgram(this), r.deleteProgram(f), this.program = void 0
		}, this.name = n.shaderName, this.id = tp++, this.cacheKey = e, this.usedTimes = 1, this.program = f, this.vertexShader = x, this.fragmentShader = w, this
	}

	function _p(t, e, n, i, r, s, a) {
		const o = [],
			l = r.isWebGL2,
			c = r.logarithmicDepthBuffer,
			h = r.floatVertexTextures,
			u = r.maxVertexUniforms,
			d = r.vertexTextures;
		let p = r.precision;
		const m = {
				MeshDepthMaterial: "depth",
				MeshDistanceMaterial: "distanceRGBA",
				MeshNormalMaterial: "normal",
				MeshBasicMaterial: "basic",
				MeshLambertMaterial: "lambert",
				MeshPhongMaterial: "phong",
				MeshToonMaterial: "toon",
				MeshStandardMaterial: "physical",
				MeshPhysicalMaterial: "physical",
				MeshMatcapMaterial: "matcap",
				LineBasicMaterial: "basic",
				LineDashedMaterial: "dashed",
				PointsMaterial: "points",
				ShadowMaterial: "shadow",
				SpriteMaterial: "sprite"
			},
			f = ["precision", "isWebGL2", "supportsVertexTextures", "outputEncoding", "instancing", "instancingColor", "map", "mapEncoding", "matcap", "matcapEncoding", "envMap", "envMapMode", "envMapEncoding", "envMapCubeUV", "lightMap", "lightMapEncoding", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "objectSpaceNormalMap", "tangentSpaceNormalMap", "clearcoat", "clearcoatMap", "clearcoatRoughnessMap", "clearcoatNormalMap", "displacementMap", "specularMap", , "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "alphaTest", "combine", "vertexColors", "vertexAlphas", "vertexTangents", "vertexUvs", "uvsVertexOnly", "fog", "useFog", "fogExp2", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "morphTargetsCount", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "numDirLightShadows", "numPointLightShadows", "numSpotLightShadows", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking", "dithering", "format", "specularIntensityMap", "specularColorMap", "specularColorMapEncoding", "transmission", "transmissionMap", "thicknessMap", "sheen", "sheenColorMap", "sheenColorMapEncoding", "sheenRoughnessMap"];

		function g(t) {
			let e;
			return t && t.isTexture ? e = t.encoding : t && t.isWebGLRenderTarget ? (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), e = t.texture.encoding) : e = nl, e
		}
		return {
			getParameters: function (s, o, f, v, y) {
				const _ = v.fog,
					x = s.isMeshStandardMaterial ? v.environment : null,
					w = (s.isMeshStandardMaterial ? n : e).get(s.envMap || x),
					b = m[s.type],
					M = y.isSkinnedMesh ? function (t) {
						const e = t.skeleton.bones;
						if (h) return 1024; {
							const t = u,
								n = Math.floor((t - 20) / 4),
								i = Math.min(n, e.length);
							return i < e.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + e.length + " bones. This GPU supports " + i + "."), 0) : i
						}
					}(y) : 0;
				let S, T;
				if (null !== s.precision && (p = r.getMaxPrecision(s.precision), p !== s.precision && console.warn("THREE.WebGLProgram.getParameters:", s.precision, "not supported, using", p, "instead.")), b) {
					const t = su[b];
					S = t.vertexShader, T = t.fragmentShader
				} else S = s.vertexShader, T = s.fragmentShader;
				const E = t.getRenderTarget(),
					A = s.alphaTest > 0,
					L = s.clearcoat > 0;
				return {
					isWebGL2: l,
					shaderID: b,
					shaderName: s.type,
					vertexShader: S,
					fragmentShader: T,
					defines: s.defines,
					isRawShaderMaterial: !0 === s.isRawShaderMaterial,
					glslVersion: s.glslVersion,
					precision: p,
					instancing: !0 === y.isInstancedMesh,
					instancingColor: !0 === y.isInstancedMesh && null !== y.instanceColor,
					supportsVertexTextures: d,
					outputEncoding: null !== E ? g(E.texture) : t.outputEncoding,
					map: !!s.map,
					mapEncoding: g(s.map),
					matcap: !!s.matcap,
					matcapEncoding: g(s.matcap),
					envMap: !!w,
					envMapMode: w && w.mapping,
					envMapEncoding: g(w),
					envMapCubeUV: !!w && (w.mapping === Do || 307 === w.mapping),
					lightMap: !!s.lightMap,
					lightMapEncoding: g(s.lightMap),
					aoMap: !!s.aoMap,
					emissiveMap: !!s.emissiveMap,
					emissiveMapEncoding: g(s.emissiveMap),
					bumpMap: !!s.bumpMap,
					normalMap: !!s.normalMap,
					objectSpaceNormalMap: 1 === s.normalMapType,
					tangentSpaceNormalMap: 0 === s.normalMapType,
					clearcoat: L,
					clearcoatMap: L && !!s.clearcoatMap,
					clearcoatRoughnessMap: L && !!s.clearcoatRoughnessMap,
					clearcoatNormalMap: L && !!s.clearcoatNormalMap,
					displacementMap: !!s.displacementMap,
					roughnessMap: !!s.roughnessMap,
					metalnessMap: !!s.metalnessMap,
					specularMap: !!s.specularMap,
					specularIntensityMap: !!s.specularIntensityMap,
					specularColorMap: !!s.specularColorMap,
					specularColorMapEncoding: g(s.specularColorMap),
					alphaMap: !!s.alphaMap,
					alphaTest: A,
					gradientMap: !!s.gradientMap,
					sheen: s.sheen > 0,
					sheenColorMap: !!s.sheenColorMap,
					sheenColorMapEncoding: g(s.sheenColorMap),
					sheenRoughnessMap: !!s.sheenRoughnessMap,
					transmission: s.transmission > 0,
					transmissionMap: !!s.transmissionMap,
					thicknessMap: !!s.thicknessMap,
					combine: s.combine,
					vertexTangents: !!s.normalMap && !!y.geometry && !!y.geometry.attributes.tangent,
					vertexColors: s.vertexColors,
					vertexAlphas: !0 === s.vertexColors && !!y.geometry && !!y.geometry.attributes.color && 4 === y.geometry.attributes.color.itemSize,
					vertexUvs: !!s.map || !!s.bumpMap || !!s.normalMap || !!s.specularMap || !!s.alphaMap || !!s.emissiveMap || !!s.roughnessMap || !!s.metalnessMap || !!s.clearcoatMap || !!s.clearcoatRoughnessMap || !!s.clearcoatNormalMap || !!s.displacementMap || !!s.transmissionMap || !!s.thicknessMap || !!s.specularIntensityMap || !!s.specularColorMap || !!s.sheenColorMap || s.sheenRoughnessMap,
					uvsVertexOnly: !(s.map || s.bumpMap || s.normalMap || s.specularMap || s.alphaMap || s.emissiveMap || s.roughnessMap || s.metalnessMap || s.clearcoatNormalMap || s.transmission > 0 || s.transmissionMap || s.thicknessMap || s.specularIntensityMap || s.specularColorMap || s.sheen > 0 || s.sheenColorMap || s.sheenRoughnessMap || !s.displacementMap),
					fog: !!_,
					useFog: s.fog,
					fogExp2: _ && _.isFogExp2,
					flatShading: !!s.flatShading,
					sizeAttenuation: s.sizeAttenuation,
					logarithmicDepthBuffer: c,
					skinning: !0 === y.isSkinnedMesh && M > 0,
					maxBones: M,
					useVertexTexture: h,
					morphTargets: !!y.geometry && !!y.geometry.morphAttributes.position,
					morphNormals: !!y.geometry && !!y.geometry.morphAttributes.normal,
					morphTargetsCount: y.geometry && y.geometry.morphAttributes.position ? y.geometry.morphAttributes.position.length : 0,
					numDirLights: o.directional.length,
					numPointLights: o.point.length,
					numSpotLights: o.spot.length,
					numRectAreaLights: o.rectArea.length,
					numHemiLights: o.hemi.length,
					numDirLightShadows: o.directionalShadowMap.length,
					numPointLightShadows: o.pointShadowMap.length,
					numSpotLightShadows: o.spotShadowMap.length,
					numClippingPlanes: a.numPlanes,
					numClipIntersection: a.numIntersection,
					format: s.format,
					dithering: s.dithering,
					shadowMapEnabled: t.shadowMap.enabled && f.length > 0,
					shadowMapType: t.shadowMap.type,
					toneMapping: s.toneMapped ? t.toneMapping : 0,
					physicallyCorrectLights: t.physicallyCorrectLights,
					premultipliedAlpha: s.premultipliedAlpha,
					doubleSided: 2 === s.side,
					flipSided: 1 === s.side,
					depthPacking: void 0 !== s.depthPacking && s.depthPacking,
					index0AttributeName: s.index0AttributeName,
					extensionDerivatives: s.extensions && s.extensions.derivatives,
					extensionFragDepth: s.extensions && s.extensions.fragDepth,
					extensionDrawBuffers: s.extensions && s.extensions.drawBuffers,
					extensionShaderTextureLOD: s.extensions && s.extensions.shaderTextureLOD,
					rendererExtensionFragDepth: l || i.has("EXT_frag_depth"),
					rendererExtensionDrawBuffers: l || i.has("WEBGL_draw_buffers"),
					rendererExtensionShaderTextureLod: l || i.has("EXT_shader_texture_lod"),
					customProgramCacheKey: s.customProgramCacheKey()
				}
			},
			getProgramCacheKey: function (e) {
				const n = [];
				if (e.shaderID ? n.push(e.shaderID) : (n.push(Ml(e.fragmentShader)), n.push(Ml(e.vertexShader))), void 0 !== e.defines)
					for (const t in e.defines) n.push(t), n.push(e.defines[t]);
				if (!1 === e.isRawShaderMaterial) {
					for (let t = 0; t < f.length; t++) n.push(e[f[t]]);
					n.push(t.outputEncoding), n.push(t.gammaFactor)
				}
				return n.push(e.customProgramCacheKey), n.join()
			},
			getUniforms: function (t) {
				const e = m[t.type];
				let n;
				if (e) {
					const t = su[e];
					n = kh.clone(t.uniforms)
				} else n = t.uniforms;
				return n
			},
			acquireProgram: function (e, n) {
				let i;
				for (let t = 0, e = o.length; t < e; t++) {
					const e = o[t];
					if (e.cacheKey === n) {
						i = e, ++i.usedTimes;
						break
					}
				}
				return void 0 === i && (i = new yp(t, n, e, s), o.push(i)), i
			},
			releaseProgram: function (t) {
				if (0 == --t.usedTimes) {
					const e = o.indexOf(t);
					o[e] = o[o.length - 1], o.pop(), t.destroy()
				}
			},
			programs: o
		}
	}

	function xp() {
		let t = new WeakMap;
		return {
			get: function (e) {
				let n = t.get(e);
				return void 0 === n && (n = {}, t.set(e, n)), n
			},
			remove: function (e) {
				t.delete(e)
			},
			update: function (e, n, i) {
				t.get(e)[n] = i
			},
			dispose: function () {
				t = new WeakMap
			}
		}
	}

	function wp(t, e) {
		return t.groupOrder !== e.groupOrder ? t.groupOrder - e.groupOrder : t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.program !== e.program ? t.program.id - e.program.id : t.material.id !== e.material.id ? t.material.id - e.material.id : t.z !== e.z ? t.z - e.z : t.id - e.id
	}

	function bp(t, e) {
		return t.groupOrder !== e.groupOrder ? t.groupOrder - e.groupOrder : t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.z !== e.z ? e.z - t.z : t.id - e.id
	}

	function Mp(t) {
		const e = [];
		let n = 0;
		const i = [],
			r = [],
			s = [],
			a = {
				id: -1
			};

		function o(i, r, s, o, l, c) {
			let h = e[n];
			const u = t.get(s);
			return void 0 === h ? (h = {
				id: i.id,
				object: i,
				geometry: r,
				material: s,
				program: u.program || a,
				groupOrder: o,
				renderOrder: i.renderOrder,
				z: l,
				group: c
			}, e[n] = h) : (h.id = i.id, h.object = i, h.geometry = r, h.material = s, h.program = u.program || a, h.groupOrder = o, h.renderOrder = i.renderOrder, h.z = l, h.group = c), n++, h
		}
		return {
			opaque: i,
			transmissive: r,
			transparent: s,
			init: function () {
				n = 0, i.length = 0, r.length = 0, s.length = 0
			},
			push: function (t, e, n, a, l, c) {
				const h = o(t, e, n, a, l, c);
				n.transmission > 0 ? r.push(h) : !0 === n.transparent ? s.push(h) : i.push(h)
			},
			unshift: function (t, e, n, a, l, c) {
				const h = o(t, e, n, a, l, c);
				n.transmission > 0 ? r.unshift(h) : !0 === n.transparent ? s.unshift(h) : i.unshift(h)
			},
			finish: function () {
				for (let t = n, i = e.length; t < i; t++) {
					const n = e[t];
					if (null === n.id) break;
					n.id = null, n.object = null, n.geometry = null, n.material = null, n.program = null, n.group = null
				}
			},
			sort: function (t, e) {
				i.length > 1 && i.sort(t || wp), r.length > 1 && r.sort(e || bp), s.length > 1 && s.sort(e || bp)
			}
		}
	}

	function Sp(t) {
		let e = new WeakMap;
		return {
			get: function (n, i) {
				let r;
				return !1 === e.has(n) ? (r = new Mp(t), e.set(n, [r])) : i >= e.get(n).length ? (r = new Mp(t), e.get(n).push(r)) : r = e.get(n)[i], r
			},
			dispose: function () {
				e = new WeakMap
			}
		}
	}

	function Tp() {
		const t = {};
		return {
			get: function (e) {
				if (void 0 !== t[e.id]) return t[e.id];
				let n;
				switch (e.type) {
					case "DirectionalLight":
						n = {
							direction: new Il,
							color: new eh
						};
						break;
					case "SpotLight":
						n = {
							position: new Il,
							direction: new Il,
							color: new eh,
							distance: 0,
							coneCos: 0,
							penumbraCos: 0,
							decay: 0
						};
						break;
					case "PointLight":
						n = {
							position: new Il,
							color: new eh,
							distance: 0,
							decay: 0
						};
						break;
					case "HemisphereLight":
						n = {
							direction: new Il,
							skyColor: new eh,
							groundColor: new eh
						};
						break;
					case "RectAreaLight":
						n = {
							color: new eh,
							position: new Il,
							halfWidth: new Il,
							halfHeight: new Il
						}
				}
				return t[e.id] = n, n
			}
		}
	}
	let Ep = 0;

	function Ap(t, e) {
		return (e.castShadow ? 1 : 0) - (t.castShadow ? 1 : 0)
	}

	function Lp(t, e) {
		const n = new Tp,
			i = function () {
				const t = {};
				return {
					get: function (e) {
						if (void 0 !== t[e.id]) return t[e.id];
						let n;
						switch (e.type) {
							case "DirectionalLight":
							case "SpotLight":
								n = {
									shadowBias: 0,
									shadowNormalBias: 0,
									shadowRadius: 1,
									shadowMapSize: new _l
								};
								break;
							case "PointLight":
								n = {
									shadowBias: 0,
									shadowNormalBias: 0,
									shadowRadius: 1,
									shadowMapSize: new _l,
									shadowCameraNear: 1,
									shadowCameraFar: 1e3
								}
						}
						return t[e.id] = n, n
					}
				}
			}(),
			r = {
				version: 0,
				hash: {
					directionalLength: -1,
					pointLength: -1,
					spotLength: -1,
					rectAreaLength: -1,
					hemiLength: -1,
					numDirectionalShadows: -1,
					numPointShadows: -1,
					numSpotShadows: -1
				},
				ambient: [0, 0, 0],
				probe: [],
				directional: [],
				directionalShadow: [],
				directionalShadowMap: [],
				directionalShadowMatrix: [],
				spot: [],
				spotShadow: [],
				spotShadowMap: [],
				spotShadowMatrix: [],
				rectArea: [],
				rectAreaLTC1: null,
				rectAreaLTC2: null,
				point: [],
				pointShadow: [],
				pointShadowMap: [],
				pointShadowMatrix: [],
				hemi: []
			};
		for (let t = 0; t < 9; t++) r.probe.push(new Il);
		const s = new Il,
			a = new hc,
			o = new hc;
		return {
			setup: function (s, a) {
				let o = 0,
					l = 0,
					c = 0;
				for (let t = 0; t < 9; t++) r.probe[t].set(0, 0, 0);
				let h = 0,
					u = 0,
					d = 0,
					p = 0,
					m = 0,
					f = 0,
					g = 0,
					v = 0;
				s.sort(Ap);
				const y = !0 !== a ? Math.PI : 1;
				for (let t = 0, e = s.length; t < e; t++) {
					const e = s[t],
						a = e.color,
						_ = e.intensity,
						x = e.distance,
						w = e.shadow && e.shadow.map ? e.shadow.map.texture : null;
					if (e.isAmbientLight) o += a.r * _ * y, l += a.g * _ * y, c += a.b * _ * y;
					else if (e.isLightProbe)
						for (let t = 0; t < 9; t++) r.probe[t].addScaledVector(e.sh.coefficients[t], _);
					else if (e.isDirectionalLight) {
						const t = n.get(e);
						if (t.color.copy(e.color).multiplyScalar(e.intensity * y), e.castShadow) {
							const t = e.shadow,
								n = i.get(e);
							n.shadowBias = t.bias, n.shadowNormalBias = t.normalBias, n.shadowRadius = t.radius, n.shadowMapSize = t.mapSize, r.directionalShadow[h] = n, r.directionalShadowMap[h] = w, r.directionalShadowMatrix[h] = e.shadow.matrix, f++
						}
						r.directional[h] = t, h++
					} else if (e.isSpotLight) {
						const t = n.get(e);
						if (t.position.setFromMatrixPosition(e.matrixWorld), t.color.copy(a).multiplyScalar(_ * y), t.distance = x, t.coneCos = Math.cos(e.angle), t.penumbraCos = Math.cos(e.angle * (1 - e.penumbra)), t.decay = e.decay, e.castShadow) {
							const t = e.shadow,
								n = i.get(e);
							n.shadowBias = t.bias, n.shadowNormalBias = t.normalBias, n.shadowRadius = t.radius, n.shadowMapSize = t.mapSize, r.spotShadow[d] = n, r.spotShadowMap[d] = w, r.spotShadowMatrix[d] = e.shadow.matrix, v++
						}
						r.spot[d] = t, d++
					} else if (e.isRectAreaLight) {
						const t = n.get(e);
						t.color.copy(a).multiplyScalar(_), t.halfWidth.set(.5 * e.width, 0, 0), t.halfHeight.set(0, .5 * e.height, 0), r.rectArea[p] = t, p++
					} else if (e.isPointLight) {
						const t = n.get(e);
						if (t.color.copy(e.color).multiplyScalar(e.intensity * y), t.distance = e.distance, t.decay = e.decay, e.castShadow) {
							const t = e.shadow,
								n = i.get(e);
							n.shadowBias = t.bias, n.shadowNormalBias = t.normalBias, n.shadowRadius = t.radius, n.shadowMapSize = t.mapSize, n.shadowCameraNear = t.camera.near, n.shadowCameraFar = t.camera.far, r.pointShadow[u] = n, r.pointShadowMap[u] = w, r.pointShadowMatrix[u] = e.shadow.matrix, g++
						}
						r.point[u] = t, u++
					} else if (e.isHemisphereLight) {
						const t = n.get(e);
						t.skyColor.copy(e.color).multiplyScalar(_ * y), t.groundColor.copy(e.groundColor).multiplyScalar(_ * y), r.hemi[m] = t, m++
					}
				}
				p > 0 && (e.isWebGL2 || !0 === t.has("OES_texture_float_linear") ? (r.rectAreaLTC1 = ru.LTC_FLOAT_1,
					r.rectAreaLTC2 = ru.LTC_FLOAT_2) : !0 === t.has("OES_texture_half_float_linear") ? (r.rectAreaLTC1 = ru.LTC_HALF_1, r.rectAreaLTC2 = ru.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), r.ambient[0] = o, r.ambient[1] = l, r.ambient[2] = c;
				const _ = r.hash;
				_.directionalLength === h && _.pointLength === u && _.spotLength === d && _.rectAreaLength === p && _.hemiLength === m && _.numDirectionalShadows === f && _.numPointShadows === g && _.numSpotShadows === v || (r.directional.length = h, r.spot.length = d, r.rectArea.length = p, r.point.length = u, r.hemi.length = m, r.directionalShadow.length = f, r.directionalShadowMap.length = f, r.pointShadow.length = g, r.pointShadowMap.length = g, r.spotShadow.length = v, r.spotShadowMap.length = v, r.directionalShadowMatrix.length = f, r.pointShadowMatrix.length = g, r.spotShadowMatrix.length = v, _.directionalLength = h, _.pointLength = u, _.spotLength = d, _.rectAreaLength = p, _.hemiLength = m, _.numDirectionalShadows = f, _.numPointShadows = g, _.numSpotShadows = v, r.version = Ep++)
			},
			setupView: function (t, e) {
				let n = 0,
					i = 0,
					l = 0,
					c = 0,
					h = 0;
				const u = e.matrixWorldInverse;
				for (let e = 0, d = t.length; e < d; e++) {
					const d = t[e];
					if (d.isDirectionalLight) {
						const t = r.directional[n];
						t.direction.setFromMatrixPosition(d.matrixWorld), s.setFromMatrixPosition(d.target.matrixWorld), t.direction.sub(s), t.direction.transformDirection(u), n++
					} else if (d.isSpotLight) {
						const t = r.spot[l];
						t.position.setFromMatrixPosition(d.matrixWorld), t.position.applyMatrix4(u), t.direction.setFromMatrixPosition(d.matrixWorld), s.setFromMatrixPosition(d.target.matrixWorld), t.direction.sub(s), t.direction.transformDirection(u), l++
					} else if (d.isRectAreaLight) {
						const t = r.rectArea[c];
						t.position.setFromMatrixPosition(d.matrixWorld), t.position.applyMatrix4(u), o.identity(), a.copy(d.matrixWorld), a.premultiply(u), o.extractRotation(a), t.halfWidth.set(.5 * d.width, 0, 0), t.halfHeight.set(0, .5 * d.height, 0), t.halfWidth.applyMatrix4(o), t.halfHeight.applyMatrix4(o), c++
					} else if (d.isPointLight) {
						const t = r.point[i];
						t.position.setFromMatrixPosition(d.matrixWorld), t.position.applyMatrix4(u), i++
					} else if (d.isHemisphereLight) {
						const t = r.hemi[h];
						t.direction.setFromMatrixPosition(d.matrixWorld), t.direction.transformDirection(u), t.direction.normalize(), h++
					}
				}
			},
			state: r
		}
	}

	function Cp(t, e) {
		const n = new Lp(t, e),
			i = [],
			r = [];
		return {
			init: function () {
				i.length = 0, r.length = 0
			},
			state: {
				lightsArray: i,
				shadowsArray: r,
				lights: n
			},
			setupLights: function (t) {
				n.setup(i, t)
			},
			setupLightsView: function (t) {
				n.setupView(i, t)
			},
			pushLight: function (t) {
				i.push(t)
			},
			pushShadow: function (t) {
				r.push(t)
			}
		}
	}

	function Rp(t, e) {
		let n = new WeakMap;
		return {
			get: function (i, r = 0) {
				let s;
				return !1 === n.has(i) ? (s = new Cp(t, e), n.set(i, [s])) : r >= n.get(i).length ? (s = new Cp(t, e), n.get(i).push(s)) : s = n.get(i)[r], s
			},
			dispose: function () {
				n = new WeakMap
			}
		}
	}
	class Pp extends Yc {
		constructor(t) {
			super(), this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this
		}
	}
	Pp.prototype.isMeshDepthMaterial = !0;
	class Dp extends Yc {
		constructor(t) {
			super(), this.type = "MeshDistanceMaterial", this.referencePosition = new Il, this.nearDistance = 1, this.farDistance = 1e3, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.fog = !1, this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.referencePosition.copy(t.referencePosition), this.nearDistance = t.nearDistance, this.farDistance = t.farDistance, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this
		}
	}
	Dp.prototype.isMeshDistanceMaterial = !0;

	function Ip(t, e, n) {
		let i = new $h;
		const r = new _l,
			s = new _l,
			a = new Cl,
			o = new Pp({
				depthPacking: 3201
			}),
			l = new Dp,
			c = {},
			h = n.maxTextureSize,
			u = {
				0: 1,
				1: 0,
				2: 2
			},
			d = new Uh({
				defines: {
					VSM_SAMPLES: 8
				},
				uniforms: {
					shadow_pass: {
						value: null
					},
					resolution: {
						value: new _l
					},
					radius: {
						value: 4
					}
				},
				vertexShader: "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}",
				fragmentShader: "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n\tconst float samples = float( VSM_SAMPLES );\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}"
			}),
			p = d.clone();
		p.defines.HORIZONTAL_PASS = 1;
		const m = new gh;
		m.setAttribute("position", new sh(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3));
		const f = new Oh(m, d),
			g = this;

		function v(n, i) {
			const r = e.update(f);
			d.defines.VSM_SAMPLES !== n.blurSamples && (d.defines.VSM_SAMPLES = n.blurSamples, p.defines.VSM_SAMPLES = n.blurSamples, d.needsUpdate = !0, p.needsUpdate = !0), d.uniforms.shadow_pass.value = n.map.texture, d.uniforms.resolution.value = n.mapSize, d.uniforms.radius.value = n.radius, t.setRenderTarget(n.mapPass), t.clear(), t.renderBufferDirect(i, null, r, d, f, null), p.uniforms.shadow_pass.value = n.mapPass.texture, p.uniforms.resolution.value = n.mapSize, p.uniforms.radius.value = n.radius, t.setRenderTarget(n.map), t.clear(), t.renderBufferDirect(i, null, r, p, f, null)
		}

		function y(e, n, i, r, s, a, h) {
			let d = null;
			const p = !0 === r.isPointLight ? e.customDistanceMaterial : e.customDepthMaterial;
			if (d = void 0 !== p ? p : !0 === r.isPointLight ? l : o, t.localClippingEnabled && !0 === i.clipShadows && 0 !== i.clippingPlanes.length || i.displacementMap && 0 !== i.displacementScale || i.alphaMap && i.alphaTest > 0) {
				const t = d.uuid,
					e = i.uuid;
				let n = c[t];
				void 0 === n && (n = {}, c[t] = n);
				let r = n[e];
				void 0 === r && (r = d.clone(), n[e] = r), d = r
			}
			return d.visible = i.visible, d.wireframe = i.wireframe, d.side = 3 === h ? null !== i.shadowSide ? i.shadowSide : i.side : null !== i.shadowSide ? i.shadowSide : u[i.side], d.alphaMap = i.alphaMap, d.alphaTest = i.alphaTest, d.clipShadows = i.clipShadows, d.clippingPlanes = i.clippingPlanes, d.clipIntersection = i.clipIntersection, d.displacementMap = i.displacementMap, d.displacementScale = i.displacementScale, d.displacementBias = i.displacementBias, d.wireframeLinewidth = i.wireframeLinewidth, d.linewidth = i.linewidth, !0 === r.isPointLight && !0 === d.isMeshDistanceMaterial && (d.referencePosition.setFromMatrixPosition(r.matrixWorld), d.nearDistance = s, d.farDistance = a), d
		}

		function _(n, r, s, a, o) {
			if (!1 === n.visible) return;
			if (n.layers.test(r.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && 3 === o) && (!n.frustumCulled || i.intersectsObject(n))) {
				n.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse, n.matrixWorld);
				const i = e.update(n),
					r = n.material;
				if (Array.isArray(r)) {
					const e = i.groups;
					for (let l = 0, c = e.length; l < c; l++) {
						const c = e[l],
							h = r[c.materialIndex];
						if (h && h.visible) {
							const e = y(n, 0, h, a, s.near, s.far, o);
							t.renderBufferDirect(s, null, i, e, n, c)
						}
					}
				} else if (r.visible) {
					const e = y(n, 0, r, a, s.near, s.far, o);
					t.renderBufferDirect(s, null, i, e, n, null)
				}
			}
			const l = n.children;
			for (let t = 0, e = l.length; t < e; t++) _(l[t], r, s, a, o)
		}
		this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1, this.render = function (e, n, o) {
			if (!1 === g.enabled) return;
			if (!1 === g.autoUpdate && !1 === g.needsUpdate) return;
			if (0 === e.length) return;
			const l = t.getRenderTarget(),
				c = t.getActiveCubeFace(),
				u = t.getActiveMipmapLevel(),
				d = t.state;
			d.setBlending(0), d.buffers.color.setClear(1, 1, 1, 1), d.buffers.depth.setTest(!0), d.setScissorTest(!1);
			for (let l = 0, c = e.length; l < c; l++) {
				const c = e[l],
					u = c.shadow;
				if (void 0 === u) {
					console.warn("THREE.WebGLShadowMap:", c, "has no shadow.");
					continue
				}
				if (!1 === u.autoUpdate && !1 === u.needsUpdate) continue;
				r.copy(u.mapSize);
				const p = u.getFrameExtents();
				if (r.multiply(p), s.copy(u.mapSize), (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / p.x), r.x = s.x * p.x, u.mapSize.x = s.x), r.y > h && (s.y = Math.floor(h / p.y), r.y = s.y * p.y, u.mapSize.y = s.y)), null === u.map && !u.isPointLightShadow && 3 === this.type) {
					const t = {
						minFilter: Bo,
						magFilter: Bo,
						format: jo
					};
					u.map = new Rl(r.x, r.y, t), u.map.texture.name = c.name + ".shadowMap", u.mapPass = new Rl(r.x, r.y, t), u.camera.updateProjectionMatrix()
				}
				if (null === u.map) {
					const t = {
						minFilter: zo,
						magFilter: zo,
						format: jo
					};
					u.map = new Rl(r.x, r.y, t), u.map.texture.name = c.name + ".shadowMap", u.camera.updateProjectionMatrix()
				}
				t.setRenderTarget(u.map), t.clear();
				const m = u.getViewportCount();
				for (let t = 0; t < m; t++) {
					const e = u.getViewport(t);
					a.set(s.x * e.x, s.y * e.y, s.x * e.z, s.y * e.w), d.viewport(a), u.updateMatrices(c, t), i = u.getFrustum(), _(n, o, u.camera, c, this.type)
				}
				u.isPointLightShadow || 3 !== this.type || v(u, o), u.needsUpdate = !1
			}
			g.needsUpdate = !1, t.setRenderTarget(l, c, u)
		}
	}

	function Op(t, e, n) {
		const i = n.isWebGL2;
		const r = new function () {
				let e = !1;
				const n = new Cl;
				let i = null;
				const r = new Cl(0, 0, 0, 0);
				return {
					setMask: function (n) {
						i === n || e || (t.colorMask(n, n, n, n), i = n)
					},
					setLocked: function (t) {
						e = t
					},
					setClear: function (e, i, s, a, o) {
						!0 === o && (e *= a, i *= a, s *= a), n.set(e, i, s, a), !1 === r.equals(n) && (t.clearColor(e, i, s, a), r.copy(n))
					},
					reset: function () {
						e = !1, i = null, r.set(-1, 0, 0, 0)
					}
				}
			},
			s = new function () {
				let e = !1,
					n = null,
					i = null,
					r = null;
				return {
					setTest: function (t) {
						t ? z(2929) : B(2929)
					},
					setMask: function (i) {
						n === i || e || (t.depthMask(i), n = i)
					},
					setFunc: function (e) {
						if (i !== e) {
							if (e) switch (e) {
								case 0:
									t.depthFunc(512);
									break;
								case 1:
									t.depthFunc(519);
									break;
								case 2:
									t.depthFunc(513);
									break;
								case 3:
								default:
									t.depthFunc(515);
									break;
								case 4:
									t.depthFunc(514);
									break;
								case 5:
									t.depthFunc(518);
									break;
								case 6:
									t.depthFunc(516);
									break;
								case 7:
									t.depthFunc(517)
							} else t.depthFunc(515);
							i = e
						}
					},
					setLocked: function (t) {
						e = t
					},
					setClear: function (e) {
						r !== e && (t.clearDepth(e), r = e)
					},
					reset: function () {
						e = !1, n = null, i = null, r = null
					}
				}
			},
			a = new function () {
				let e = !1,
					n = null,
					i = null,
					r = null,
					s = null,
					a = null,
					o = null,
					l = null,
					c = null;
				return {
					setTest: function (t) {
						e || (t ? z(2960) : B(2960))
					},
					setMask: function (i) {
						n === i || e || (t.stencilMask(i), n = i)
					},
					setFunc: function (e, n, a) {
						i === e && r === n && s === a || (t.stencilFunc(e, n, a), i = e, r = n, s = a)
					},
					setOp: function (e, n, i) {
						a === e && o === n && l === i || (t.stencilOp(e, n, i), a = e, o = n, l = i)
					},
					setLocked: function (t) {
						e = t
					},
					setClear: function (e) {
						c !== e && (t.clearStencil(e), c = e)
					},
					reset: function () {
						e = !1, n = null, i = null, r = null, s = null, a = null, o = null, l = null, c = null
					}
				}
			};
		let o = {},
			l = {},
			c = null,
			h = !1,
			u = null,
			d = null,
			p = null,
			m = null,
			f = null,
			g = null,
			v = null,
			y = !1,
			_ = null,
			x = null,
			w = null,
			b = null,
			M = null;
		const S = t.getParameter(35661);
		let T = !1,
			E = 0;
		const A = t.getParameter(7938); - 1 !== A.indexOf("WebGL") ? (E = parseFloat(/^WebGL (\d)/.exec(A)[1]), T = E >= 1) : -1 !== A.indexOf("OpenGL ES") && (E = parseFloat(/^OpenGL ES (\d)/.exec(A)[1]), T = E >= 2);
		let L = null,
			C = {};
		const R = t.getParameter(3088),
			P = t.getParameter(2978),
			D = (new Cl).fromArray(R),
			I = (new Cl).fromArray(P);

		function O(e, n, i) {
			const r = new Uint8Array(4),
				s = t.createTexture();
			t.bindTexture(e, s), t.texParameteri(e, 10241, 9728), t.texParameteri(e, 10240, 9728);
			for (let e = 0; e < i; e++) t.texImage2D(n + e, 0, 6408, 1, 1, 0, 6408, 5121, r);
			return s
		}
		const N = {};

		function z(e) {
			!0 !== o[e] && (t.enable(e), o[e] = !0)
		}

		function B(e) {
			!1 !== o[e] && (t.disable(e), o[e] = !1)
		}
		N[3553] = O(3553, 3553, 1), N[34067] = O(34067, 34069, 6), r.setClear(0, 0, 0, 1), s.setClear(1), a.setClear(0), z(2929), s.setFunc(3), H(!1), G(1), z(2884), U(0);
		const F = {
			[Co]: 32774,
			101: 32778,
			102: 32779
		};
		if (i) F[103] = 32775, F[104] = 32776;
		else {
			const t = e.get("EXT_blend_minmax");
			null !== t && (F[103] = t.MIN_EXT, F[104] = t.MAX_EXT)
		}
		const k = {
			200: 0,
			201: 1,
			202: 768,
			204: 770,
			210: 776,
			208: 774,
			206: 772,
			203: 769,
			205: 771,
			209: 775,
			207: 773
		};

		function U(e, n, i, r, s, a, o, l) {
			if (0 !== e) {
				if (!1 === h && (z(3042), h = !0), 5 === e) s = s || n, a = a || i, o = o || r, n === d && s === f || (t.blendEquationSeparate(F[n], F[s]), d = n, f = s), i === p && r === m && a === g && o === v || (t.blendFuncSeparate(k[i], k[r], k[a], k[o]), p = i, m = r, g = a, v = o), u = e, y = null;
				else if (e !== u || l !== y) {
					if (d === Co && f === Co || (t.blendEquation(32774), d = Co, f = Co), l) switch (e) {
						case 1:
							t.blendFuncSeparate(1, 771, 1, 771);
							break;
						case 2:
							t.blendFunc(1, 1);
							break;
						case 3:
							t.blendFuncSeparate(0, 0, 769, 771);
							break;
						case 4:
							t.blendFuncSeparate(0, 768, 0, 770);
							break;
						default:
							console.error("THREE.WebGLState: Invalid blending: ", e)
					} else switch (e) {
						case 1:
							t.blendFuncSeparate(770, 771, 1, 771);
							break;
						case 2:
							t.blendFunc(770, 1);
							break;
						case 3:
							t.blendFunc(0, 769);
							break;
						case 4:
							t.blendFunc(0, 768);
							break;
						default:
							console.error("THREE.WebGLState: Invalid blending: ", e)
					}
					p = null, m = null, g = null, v = null, u = e, y = l
				}
			} else !0 === h && (B(3042), h = !1)
		}

		function H(e) {
			_ !== e && (e ? t.frontFace(2304) : t.frontFace(2305), _ = e)
		}

		function G(e) {
			0 !== e ? (z(2884), e !== x && (1 === e ? t.cullFace(1029) : 2 === e ? t.cullFace(1028) : t.cullFace(1032))) : B(2884), x = e
		}

		function V(e, n, i) {
			e ? (z(32823), b === n && M === i || (t.polygonOffset(n, i), b = n, M = i)) : B(32823)
		}

		function W(e) {
			void 0 === e && (e = 33984 + S - 1), L !== e && (t.activeTexture(e), L = e)
		}
		return {
			buffers: {
				color: r,
				depth: s,
				stencil: a
			},
			enable: z,
			disable: B,
			bindFramebuffer: function (e, n) {
				return l[e] !== n && (t.bindFramebuffer(e, n), l[e] = n, i && (36009 === e && (l[36160] = n), 36160 === e && (l[36009] = n)), !0)
			},
			useProgram: function (e) {
				return c !== e && (t.useProgram(e), c = e, !0)
			},
			setBlending: U,
			setMaterial: function (t, e) {
				2 === t.side ? B(2884) : z(2884);
				let n = 1 === t.side;
				e && (n = !n), H(n), 1 === t.blending && !1 === t.transparent ? U(0) : U(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.premultipliedAlpha), s.setFunc(t.depthFunc), s.setTest(t.depthTest), s.setMask(t.depthWrite), r.setMask(t.colorWrite);
				const i = t.stencilWrite;
				a.setTest(i), i && (a.setMask(t.stencilWriteMask), a.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask), a.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)), V(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits), !0 === t.alphaToCoverage ? z(32926) : B(32926)
			},
			setFlipSided: H,
			setCullFace: G,
			setLineWidth: function (e) {
				e !== w && (T && t.lineWidth(e), w = e)
			},
			setPolygonOffset: V,
			setScissorTest: function (t) {
				t ? z(3089) : B(3089)
			},
			activeTexture: W,
			bindTexture: function (e, n) {
				null === L && W();
				let i = C[L];
				void 0 === i && (i = {
					type: void 0,
					texture: void 0
				}, C[L] = i), i.type === e && i.texture === n || (t.bindTexture(e, n || N[e]), i.type = e, i.texture = n)
			},
			unbindTexture: function () {
				const e = C[L];
				void 0 !== e && void 0 !== e.type && (t.bindTexture(e.type, null), e.type = void 0, e.texture = void 0)
			},
			compressedTexImage2D: function () {
				try {
					t.compressedTexImage2D.apply(t, arguments)
				} catch (t) {
					console.error("THREE.WebGLState:", t)
				}
			},
			texImage2D: function () {
				try {
					t.texImage2D.apply(t, arguments)
				} catch (t) {
					console.error("THREE.WebGLState:", t)
				}
			},
			texImage3D: function () {
				try {
					t.texImage3D.apply(t, arguments)
				} catch (t) {
					console.error("THREE.WebGLState:", t)
				}
			},
			texStorage2D: function () {
				try {
					t.texStorage2D.apply(t, arguments)
				} catch (t) {
					console.error("THREE.WebGLState:", t)
				}
			},
			texSubImage2D: function () {
				try {
					t.texSubImage2D.apply(t, arguments)
				} catch (t) {
					console.error("THREE.WebGLState:", t)
				}
			},
			scissor: function (e) {
				!1 === D.equals(e) && (t.scissor(e.x, e.y, e.z, e.w), D.copy(e))
			},
			viewport: function (e) {
				!1 === I.equals(e) && (t.viewport(e.x, e.y, e.z, e.w), I.copy(e))
			},
			reset: function () {
				t.disable(3042), t.disable(2884), t.disable(2929), t.disable(32823), t.disable(3089), t.disable(2960), t.disable(32926), t.blendEquation(32774), t.blendFunc(1, 0), t.blendFuncSeparate(1, 0, 1, 0), t.colorMask(!0, !0, !0, !0), t.clearColor(0, 0, 0, 0), t.depthMask(!0), t.depthFunc(513), t.clearDepth(1), t.stencilMask(4294967295), t.stencilFunc(519, 0, 4294967295), t.stencilOp(7680, 7680, 7680), t.clearStencil(0), t.cullFace(1029), t.frontFace(2305), t.polygonOffset(0, 0), t.activeTexture(33984), t.bindFramebuffer(36160, null), !0 === i && (t.bindFramebuffer(36009, null), t.bindFramebuffer(36008, null)), t.useProgram(null), t.lineWidth(1), t.scissor(0, 0, t.canvas.width, t.canvas.height), t.viewport(0, 0, t.canvas.width, t.canvas.height), o = {}, L = null, C = {}, l = {}, c = null, h = !1, u = null, d = null, p = null, m = null, f = null, g = null, v = null, y = !1, _ = null, x = null, w = null, b = null, M = null, D.set(0, 0, t.canvas.width, t.canvas.height), I.set(0, 0, t.canvas.width, t.canvas.height), r.reset(), s.reset(), a.reset()
			}
		}
	}

	function Np(t, e, n, i, r, s, a) {
		const o = r.isWebGL2,
			l = r.maxTextures,
			c = r.maxCubemapSize,
			h = r.maxTextureSize,
			u = r.maxSamples,
			d = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : void 0,
			p = new WeakMap;
		let m, f = !1;
		try {
			f = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext("2d")
		} catch (t) {}

		function g(t, e) {
			return f ? new OffscreenCanvas(t, e) : bl("canvas")
		}

		function v(t, e, n, i) {
			let r = 1;
			if ((t.width > i || t.height > i) && (r = i / Math.max(t.width, t.height)), r < 1 || !0 === e) {
				if ("undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && t instanceof ImageBitmap) {
					const i = e ? yl : Math.floor,
						s = i(r * t.width),
						a = i(r * t.height);
					void 0 === m && (m = g(s, a));
					const o = n ? g(s, a) : m;
					o.width = s, o.height = a;
					return o.getContext("2d").drawImage(t, 0, 0, s, a), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + t.width + "x" + t.height + ") to (" + s + "x" + a + ")."), o
				}
				return "data" in t && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + t.width + "x" + t.height + ")."), t
			}
			return t
		}

		function y(t) {
			return vl(t.width) && vl(t.height)
		}

		function _(t, e) {
			return t.generateMipmaps && e && t.minFilter !== zo && t.minFilter !== Bo
		}

		function x(e) {
			t.generateMipmap(e)
		}

		function w(n, i, r) {
			if (!1 === o) return i;
			if (null !== n) {
				if (void 0 !== t[n]) return t[n];
				console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n + "'")
			}
			let s = i;
			return 6403 === i && (5126 === r && (s = 33326), 5131 === r && (s = 33325), 5121 === r && (s = 33321)), 6407 === i && (5126 === r && (s = 34837), 5131 === r && (s = 34843), 5121 === r && (s = 32849)), 6408 === i && (5126 === r && (s = 34836), 5131 === r && (s = 34842), 5121 === r && (s = 32856)), 33325 !== s && 33326 !== s && 34842 !== s && 34836 !== s || e.get("EXT_color_buffer_float"), s
		}

		function b(t) {
			return t === zo || 1004 === t || 1005 === t ? 9728 : 9729
		}

		function M(e) {
			const n = e.target;
			n.removeEventListener("dispose", M),
				function (e) {
					const n = i.get(e);
					if (void 0 === n.__webglInit) return;
					t.deleteTexture(n.__webglTexture), i.remove(e)
				}(n), n.isVideoTexture && p.delete(n), a.memory.textures--
		}

		function S(e) {
			const n = e.target;
			n.removeEventListener("dispose", S),
				function (e) {
					const n = e.texture,
						r = i.get(e),
						s = i.get(n);
					if (!e) return;
					void 0 !== s.__webglTexture && (t.deleteTexture(s.__webglTexture), a.memory.textures--);
					e.depthTexture && e.depthTexture.dispose();
					if (e.isWebGLCubeRenderTarget)
						for (let e = 0; e < 6; e++) t.deleteFramebuffer(r.__webglFramebuffer[e]), r.__webglDepthbuffer && t.deleteRenderbuffer(r.__webglDepthbuffer[e]);
					else t.deleteFramebuffer(r.__webglFramebuffer), r.__webglDepthbuffer && t.deleteRenderbuffer(r.__webglDepthbuffer), r.__webglMultisampledFramebuffer && t.deleteFramebuffer(r.__webglMultisampledFramebuffer), r.__webglColorRenderbuffer && t.deleteRenderbuffer(r.__webglColorRenderbuffer), r.__webglDepthRenderbuffer && t.deleteRenderbuffer(r.__webglDepthRenderbuffer);
					if (e.isWebGLMultipleRenderTargets)
						for (let e = 0, r = n.length; e < r; e++) {
							const r = i.get(n[e]);
							r.__webglTexture && (t.deleteTexture(r.__webglTexture), a.memory.textures--), i.remove(n[e])
						}
					i.remove(n), i.remove(e)
				}(n)
		}
		let T = 0;

		function E(t, e) {
			const r = i.get(t);
			if (t.isVideoTexture && function (t) {
					const e = a.render.frame;
					p.get(t) !== e && (p.set(t, e), t.update())
				}(t), t.version > 0 && r.__version !== t.version) {
				const n = t.image;
				if (void 0 === n) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");
				else {
					if (!1 !== n.complete) return void D(r, t, e);
					console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")
				}
			}
			n.activeTexture(33984 + e), n.bindTexture(3553, r.__webglTexture)
		}

		function A(e, r) {
			const a = i.get(e);
			e.version > 0 && a.__version !== e.version ? function (e, i, r) {
				if (6 !== i.image.length) return;
				P(e, i), n.activeTexture(33984 + r), n.bindTexture(34067, e.__webglTexture), t.pixelStorei(37440, i.flipY), t.pixelStorei(37441, i.premultiplyAlpha), t.pixelStorei(3317, i.unpackAlignment), t.pixelStorei(37443, 0);
				const a = i && (i.isCompressedTexture || i.image[0].isCompressedTexture),
					l = i.image[0] && i.image[0].isDataTexture,
					h = [];
				for (let t = 0; t < 6; t++) h[t] = a || l ? l ? i.image[t].image : i.image[t] : v(i.image[t], !1, !0, c);
				const u = y(h[0]) || o,
					d = s.convert(i.format),
					p = s.convert(i.type),
					m = w(i.internalFormat, d, p, i.encoding);
				let f;
				if (R(34067, i, u), a)
					for (let t = 0; t < 6; t++) {
						f = h[t].mipmaps;
						for (let e = 0; e < f.length; e++) {
							const r = f[e];
							i.format !== jo && i.format !== qo ? null !== d ? n.compressedTexImage2D(34069 + t, e, m, r.width, r.height, 0, r.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : n.texImage2D(34069 + t, e, m, r.width, r.height, 0, d, p, r.data)
						}
					} else {
						f = i.mipmaps;
						for (let t = 0; t < 6; t++)
							if (l) {
								n.texImage2D(34069 + t, 0, m, h[t].width, h[t].height, 0, d, p, h[t].data);
								for (let e = 0; e < f.length; e++) {
									const i = f[e].image[t].image;
									n.texImage2D(34069 + t, e + 1, m, i.width, i.height, 0, d, p, i.data)
								}
							} else {
								n.texImage2D(34069 + t, 0, m, d, p, h[t]);
								for (let e = 0; e < f.length; e++) {
									const i = f[e];
									n.texImage2D(34069 + t, e + 1, m, d, p, i.image[t])
								}
							}
					}
				_(i, u) && x(34067);
				e.__version = i.version, i.onUpdate && i.onUpdate(i)
			}(a, e, r) : (n.activeTexture(33984 + r), n.bindTexture(34067, a.__webglTexture))
		}
		const L = {
				[Io]: 10497,
				[Oo]: 33071,
				[No]: 33648
			},
			C = {
				[zo]: 9728,
				1004: 9984,
				1005: 9986,
				[Bo]: 9729,
				1007: 9985,
				[Fo]: 9987
			};

		function R(n, s, a) {
			if (a ? (t.texParameteri(n, 10242, L[s.wrapS]), t.texParameteri(n, 10243, L[s.wrapT]), 32879 !== n && 35866 !== n || t.texParameteri(n, 32882, L[s.wrapR]), t.texParameteri(n, 10240, C[s.magFilter]), t.texParameteri(n, 10241, C[s.minFilter])) : (t.texParameteri(n, 10242, 33071), t.texParameteri(n, 10243, 33071), 32879 !== n && 35866 !== n || t.texParameteri(n, 32882, 33071), s.wrapS === Oo && s.wrapT === Oo || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), t.texParameteri(n, 10240, b(s.magFilter)), t.texParameteri(n, 10241, b(s.minFilter)), s.minFilter !== zo && s.minFilter !== Bo && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), !0 === e.has("EXT_texture_filter_anisotropic")) {
				const a = e.get("EXT_texture_filter_anisotropic");
				if (s.type === Go && !1 === e.has("OES_texture_float_linear")) return;
				if (!1 === o && s.type === Vo && !1 === e.has("OES_texture_half_float_linear")) return;
				(s.anisotropy > 1 || i.get(s).__currentAnisotropy) && (t.texParameterf(n, a.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(s.anisotropy, r.getMaxAnisotropy())), i.get(s).__currentAnisotropy = s.anisotropy)
			}
		}

		function P(e, n) {
			void 0 === e.__webglInit && (e.__webglInit = !0, n.addEventListener("dispose", M), e.__webglTexture = t.createTexture(), a.memory.textures++)
		}

		function D(e, i, r) {
			let a = 3553;
			i.isDataTexture2DArray && (a = 35866), i.isDataTexture3D && (a = 32879), P(e, i), n.activeTexture(33984 + r), n.bindTexture(a, e.__webglTexture), t.pixelStorei(37440, i.flipY), t.pixelStorei(37441, i.premultiplyAlpha), t.pixelStorei(3317, i.unpackAlignment), t.pixelStorei(37443, 0);
			const l = function (t) {
					return !o && (t.wrapS !== Oo || t.wrapT !== Oo || t.minFilter !== zo && t.minFilter !== Bo)
				}(i) && !1 === y(i.image),
				c = v(i.image, l, !1, h),
				u = y(c) || o,
				d = s.convert(i.format);
			let p, m = s.convert(i.type),
				f = w(i.internalFormat, d, m, i.encoding);
			R(a, i, u);
			const g = i.mipmaps;
			if (i.isDepthTexture) f = 6402, o ? f = i.type === Go ? 36012 : i.type === Ho ? 33190 : i.type === Wo ? 35056 : 33189 : i.type === Go && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), i.format === Xo && 6402 === f && i.type !== Uo && i.type !== Ho && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), i.type = Uo, m = s.convert(i.type)), i.format === Yo && 6402 === f && (f = 34041, i.type !== Wo && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), i.type = Wo, m = s.convert(i.type))), n.texImage2D(3553, 0, f, c.width, c.height, 0, d, m, null);
			else if (i.isDataTexture)
				if (g.length > 0 && u) {
					for (let t = 0, e = g.length; t < e; t++) p = g[t], n.texImage2D(3553, t, f, p.width, p.height, 0, d, m, p.data);
					i.generateMipmaps = !1
				} else n.texImage2D(3553, 0, f, c.width, c.height, 0, d, m, c.data);
			else if (i.isCompressedTexture)
				for (let t = 0, e = g.length; t < e; t++) p = g[t], i.format !== jo && i.format !== qo ? null !== d ? n.compressedTexImage2D(3553, t, f, p.width, p.height, 0, p.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : n.texImage2D(3553, t, f, p.width, p.height, 0, d, m, p.data);
			else if (i.isDataTexture2DArray) n.texImage3D(35866, 0, f, c.width, c.height, c.depth, 0, d, m, c.data);
			else if (i.isDataTexture3D) n.texImage3D(32879, 0, f, c.width, c.height, c.depth, 0, d, m, c.data);
			else {
				const t = function (t, e, n) {
						return !0 === _(t, n) ? Math.log2(Math.max(e.width, e.height)) + 1 : t.mipmaps.length > 0 ? t.mipmaps.length : 1
					}(i, c, u),
					r = o && !0 !== i.isVideoTexture,
					s = void 0 === e.__version;
				if (g.length > 0 && u) {
					r && s && n.texStorage2D(3553, t, f, g[0].width, g[0].height);
					for (let t = 0, e = g.length; t < e; t++) p = g[t], r ? n.texSubImage2D(3553, t, 0, 0, d, m, p) : n.texImage2D(3553, t, f, d, m, p);
					i.generateMipmaps = !1
				} else r ? (s && n.texStorage2D(3553, t, f, c.width, c.height), n.texSubImage2D(3553, 0, 0, 0, d, m, c)) : n.texImage2D(3553, 0, f, d, m, c)
			}
			_(i, u) && x(a), e.__version = i.version, i.onUpdate && i.onUpdate(i)
		}

		function I(e, r, a, o, l) {
			const c = s.convert(a.format),
				h = s.convert(a.type),
				u = w(a.internalFormat, c, h, a.encoding);
			i.get(r).__hasExternalTextures || (32879 === l || 35866 === l ? n.texImage3D(l, 0, u, r.width, r.height, r.depth, 0, c, h, null) : n.texImage2D(l, 0, u, r.width, r.height, 0, c, h, null)), n.bindFramebuffer(36160, e), r.useRenderToTexture ? d.framebufferTexture2DMultisampleEXT(36160, o, l, i.get(a).__webglTexture, 0, z(r)) : t.framebufferTexture2D(36160, o, l, i.get(a).__webglTexture, 0), n.bindFramebuffer(36160, null)
		}

		function O(e, n, i) {
			if (t.bindRenderbuffer(36161, e), n.depthBuffer && !n.stencilBuffer) {
				let r = 33189;
				if (i || n.useRenderToTexture) {
					const e = n.depthTexture;
					e && e.isDepthTexture && (e.type === Go ? r = 36012 : e.type === Ho && (r = 33190));
					const i = z(n);
					n.useRenderToTexture ? d.renderbufferStorageMultisampleEXT(36161, i, r, n.width, n.height) : t.renderbufferStorageMultisample(36161, i, r, n.width, n.height)
				} else t.renderbufferStorage(36161, r, n.width, n.height);
				t.framebufferRenderbuffer(36160, 36096, 36161, e)
			} else if (n.depthBuffer && n.stencilBuffer) {
				const r = z(n);
				i && n.useRenderbuffer ? t.renderbufferStorageMultisample(36161, r, 35056, n.width, n.height) : n.useRenderToTexture ? d.renderbufferStorageMultisampleEXT(36161, r, 35056, n.width, n.height) : t.renderbufferStorage(36161, 34041, n.width, n.height), t.framebufferRenderbuffer(36160, 33306, 36161, e)
			} else {
				const e = !0 === n.isWebGLMultipleRenderTargets ? n.texture[0] : n.texture,
					r = s.convert(e.format),
					a = s.convert(e.type),
					o = w(e.internalFormat, r, a, e.encoding),
					l = z(n);
				i && n.useRenderbuffer ? t.renderbufferStorageMultisample(36161, l, o, n.width, n.height) : n.useRenderToTexture ? d.renderbufferStorageMultisampleEXT(36161, l, o, n.width, n.height) : t.renderbufferStorage(36161, o, n.width, n.height)
			}
			t.bindRenderbuffer(36161, null)
		}

		function N(e) {
			const r = i.get(e),
				s = !0 === e.isWebGLCubeRenderTarget;
			if (e.depthTexture && !r.__autoAllocateDepthBuffer) {
				if (s) throw new Error("target.depthTexture not supported in Cube render targets");
				! function (e, r) {
					if (r && r.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
					if (n.bindFramebuffer(36160, e), !r.depthTexture || !r.depthTexture.isDepthTexture) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
					i.get(r.depthTexture).__webglTexture && r.depthTexture.image.width === r.width && r.depthTexture.image.height === r.height || (r.depthTexture.image.width = r.width, r.depthTexture.image.height = r.height, r.depthTexture.needsUpdate = !0), E(r.depthTexture, 0);
					const s = i.get(r.depthTexture).__webglTexture,
						a = z(r);
					if (r.depthTexture.format === Xo) r.useRenderToTexture ? d.framebufferTexture2DMultisampleEXT(36160, 36096, 3553, s, 0, a) : t.framebufferTexture2D(36160, 36096, 3553, s, 0);
					else {
						if (r.depthTexture.format !== Yo) throw new Error("Unknown depthTexture format");
						r.useRenderToTexture ? d.framebufferTexture2DMultisampleEXT(36160, 33306, 3553, s, 0, a) : t.framebufferTexture2D(36160, 33306, 3553, s, 0)
					}
				}(r.__webglFramebuffer, e)
			} else if (s) {
				r.__webglDepthbuffer = [];
				for (let i = 0; i < 6; i++) n.bindFramebuffer(36160, r.__webglFramebuffer[i]), r.__webglDepthbuffer[i] = t.createRenderbuffer(), O(r.__webglDepthbuffer[i], e, !1)
			} else n.bindFramebuffer(36160, r.__webglFramebuffer), r.__webglDepthbuffer = t.createRenderbuffer(), O(r.__webglDepthbuffer, e, !1);
			n.bindFramebuffer(36160, null)
		}

		function z(t) {
			return o && (t.useRenderbuffer || t.useRenderToTexture) ? Math.min(u, t.samples) : 0
		}
		let B = !1,
			F = !1;
		this.allocateTextureUnit = function () {
			const t = T;
			return t >= l && console.warn("THREE.WebGLTextures: Trying to use " + t + " texture units while this GPU supports only " + l), T += 1, t
		}, this.resetTextureUnits = function () {
			T = 0
		}, this.setTexture2D = E, this.setTexture2DArray = function (t, e) {
			const r = i.get(t);
			t.version > 0 && r.__version !== t.version ? D(r, t, e) : (n.activeTexture(33984 + e), n.bindTexture(35866, r.__webglTexture))
		}, this.setTexture3D = function (t, e) {
			const r = i.get(t);
			t.version > 0 && r.__version !== t.version ? D(r, t, e) : (n.activeTexture(33984 + e), n.bindTexture(32879, r.__webglTexture))
		}, this.setTextureCube = A, this.rebindTextures = function (t, e, n) {
			const r = i.get(t);
			void 0 !== e && I(r.__webglFramebuffer, t, t.texture, 36064, 3553), void 0 !== n && N(t)
		}, this.setupRenderTarget = function (e) {
			const l = e.texture,
				c = i.get(e),
				h = i.get(l);
			e.addEventListener("dispose", S), !0 !== e.isWebGLMultipleRenderTargets && (void 0 === h.__webglTexture && (h.__webglTexture = t.createTexture()), h.__version = l.version, a.memory.textures++);
			const u = !0 === e.isWebGLCubeRenderTarget,
				d = !0 === e.isWebGLMultipleRenderTargets,
				p = l.isDataTexture3D || l.isDataTexture2DArray,
				m = y(e) || o;
			if (!o || l.format !== qo || l.type !== Go && l.type !== Vo || (l.format = jo, console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")), u) {
				c.__webglFramebuffer = [];
				for (let e = 0; e < 6; e++) c.__webglFramebuffer[e] = t.createFramebuffer()
			} else if (c.__webglFramebuffer = t.createFramebuffer(), d)
				if (r.drawBuffers) {
					const n = e.texture;
					for (let e = 0, r = n.length; e < r; e++) {
						const r = i.get(n[e]);
						void 0 === r.__webglTexture && (r.__webglTexture = t.createTexture(), a.memory.textures++)
					}
				} else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
			else if (e.useRenderbuffer)
				if (o) {
					c.__webglMultisampledFramebuffer = t.createFramebuffer(), c.__webglColorRenderbuffer = t.createRenderbuffer(), t.bindRenderbuffer(36161, c.__webglColorRenderbuffer);
					const i = s.convert(l.format),
						r = s.convert(l.type),
						a = w(l.internalFormat, i, r, l.encoding),
						o = z(e);
					t.renderbufferStorageMultisample(36161, o, a, e.width, e.height), n.bindFramebuffer(36160, c.__webglMultisampledFramebuffer), t.framebufferRenderbuffer(36160, 36064, 36161, c.__webglColorRenderbuffer), t.bindRenderbuffer(36161, null), e.depthBuffer && (c.__webglDepthRenderbuffer = t.createRenderbuffer(), O(c.__webglDepthRenderbuffer, e, !0)), n.bindFramebuffer(36160, null)
				} else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
			if (u) {
				n.bindTexture(34067, h.__webglTexture), R(34067, l, m);
				for (let t = 0; t < 6; t++) I(c.__webglFramebuffer[t], e, l, 36064, 34069 + t);
				_(l, m) && x(34067), n.unbindTexture()
			} else if (d) {
				const t = e.texture;
				for (let r = 0, s = t.length; r < s; r++) {
					const s = t[r],
						a = i.get(s);
					n.bindTexture(3553, a.__webglTexture), R(3553, s, m), I(c.__webglFramebuffer, e, s, 36064 + r, 3553), _(s, m) && x(3553)
				}
				n.unbindTexture()
			} else {
				let t = 3553;
				if (p)
					if (o) {
						t = l.isDataTexture3D ? 32879 : 35866
					} else console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.");
				n.bindTexture(t, h.__webglTexture), R(t, l, m), I(c.__webglFramebuffer, e, l, 36064, t), _(l, m) && x(t), n.unbindTexture()
			}
			e.depthBuffer && N(e)
		}, this.updateRenderTargetMipmap = function (t) {
			const e = y(t) || o,
				r = !0 === t.isWebGLMultipleRenderTargets ? t.texture : [t.texture];
			for (let s = 0, a = r.length; s < a; s++) {
				const a = r[s];
				if (_(a, e)) {
					const e = t.isWebGLCubeRenderTarget ? 34067 : 3553,
						r = i.get(a).__webglTexture;
					n.bindTexture(e, r), x(e), n.unbindTexture()
				}
			}
		}, this.updateMultisampleRenderTarget = function (e) {
			if (e.useRenderbuffer)
				if (o) {
					const r = e.width,
						s = e.height;
					let a = 16384;
					const o = [36064],
						l = e.stencilBuffer ? 33306 : 36096;
					e.depthBuffer && o.push(l), e.ignoreDepthForMultisampleCopy || (e.depthBuffer && (a |= 256),
						e.stencilBuffer && (a |= 1024));
					const c = i.get(e);
					n.bindFramebuffer(36008, c.__webglMultisampledFramebuffer), n.bindFramebuffer(36009, c.__webglFramebuffer), e.ignoreDepthForMultisampleCopy && (t.invalidateFramebuffer(36008, [l]), t.invalidateFramebuffer(36009, [l])), t.blitFramebuffer(0, 0, r, s, 0, 0, r, s, a, 9728), t.invalidateFramebuffer(36008, o), n.bindFramebuffer(36008, null), n.bindFramebuffer(36009, c.__webglMultisampledFramebuffer)
				} else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")
		}, this.setupDepthRenderbuffer = N, this.setupFrameBufferTexture = I, this.safeSetTexture2D = function (t, e) {
			t && t.isWebGLRenderTarget && (!1 === B && (console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."), B = !0), t = t.texture), E(t, e)
		}, this.safeSetTextureCube = function (t, e) {
			t && t.isWebGLCubeRenderTarget && (!1 === F && (console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."), F = !0), t = t.texture), A(t, e)
		}
	}

	function zp(t, e, n) {
		const i = n.isWebGL2;
		return {
			convert: function (t) {
				let n;
				if (t === ko) return 5121;
				if (1017 === t) return 32819;
				if (1018 === t) return 32820;
				if (1019 === t) return 33635;
				if (1010 === t) return 5120;
				if (1011 === t) return 5122;
				if (t === Uo) return 5123;
				if (1013 === t) return 5124;
				if (t === Ho) return 5125;
				if (t === Go) return 5126;
				if (t === Vo) return i ? 5131 : (n = e.get("OES_texture_half_float"), null !== n ? n.HALF_FLOAT_OES : null);
				if (1021 === t) return 6406;
				if (t === qo) return 6407;
				if (t === jo) return 6408;
				if (1024 === t) return 6409;
				if (1025 === t) return 6410;
				if (t === Xo) return 6402;
				if (t === Yo) return 34041;
				if (1028 === t) return 6403;
				if (1029 === t) return 36244;
				if (1030 === t) return 33319;
				if (1031 === t) return 33320;
				if (1032 === t) return 36248;
				if (1033 === t) return 36249;
				if (33776 === t || 33777 === t || 33778 === t || 33779 === t) {
					if (n = e.get("WEBGL_compressed_texture_s3tc"), null === n) return null;
					if (33776 === t) return n.COMPRESSED_RGB_S3TC_DXT1_EXT;
					if (33777 === t) return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;
					if (33778 === t) return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;
					if (33779 === t) return n.COMPRESSED_RGBA_S3TC_DXT5_EXT
				}
				if (35840 === t || 35841 === t || 35842 === t || 35843 === t) {
					if (n = e.get("WEBGL_compressed_texture_pvrtc"), null === n) return null;
					if (35840 === t) return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
					if (35841 === t) return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
					if (35842 === t) return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
					if (35843 === t) return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
				}
				if (36196 === t) return n = e.get("WEBGL_compressed_texture_etc1"), null !== n ? n.COMPRESSED_RGB_ETC1_WEBGL : null;
				if ((37492 === t || 37496 === t) && (n = e.get("WEBGL_compressed_texture_etc"), null !== n)) {
					if (37492 === t) return n.COMPRESSED_RGB8_ETC2;
					if (37496 === t) return n.COMPRESSED_RGBA8_ETC2_EAC
				}
				return 37808 === t || 37809 === t || 37810 === t || 37811 === t || 37812 === t || 37813 === t || 37814 === t || 37815 === t || 37816 === t || 37817 === t || 37818 === t || 37819 === t || 37820 === t || 37821 === t || 37840 === t || 37841 === t || 37842 === t || 37843 === t || 37844 === t || 37845 === t || 37846 === t || 37847 === t || 37848 === t || 37849 === t || 37850 === t || 37851 === t || 37852 === t || 37853 === t ? (n = e.get("WEBGL_compressed_texture_astc"), null !== n ? t : null) : 36492 === t ? (n = e.get("EXT_texture_compression_bptc"), null !== n ? t : null) : t === Wo ? i ? 34042 : (n = e.get("WEBGL_depth_texture"), null !== n ? n.UNSIGNED_INT_24_8_WEBGL : null) : void 0
			}
		}
	}
	class Bp extends Gh {
		constructor(t = []) {
			super(), this.cameras = t
		}
	}
	Bp.prototype.isArrayCamera = !0;
	class Fp extends Nc {
		constructor() {
			super(), this.type = "Group"
		}
	}
	Fp.prototype.isGroup = !0;
	const kp = {
		type: "move"
	};
	class Up {
		constructor() {
			this._targetRay = null, this._grip = null, this._hand = null
		}
		getHandSpace() {
			return null === this._hand && (this._hand = new Fp, this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = {
				pinching: !1
			}), this._hand
		}
		getTargetRaySpace() {
			return null === this._targetRay && (this._targetRay = new Fp, this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new Il, this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new Il), this._targetRay
		}
		getGripSpace() {
			return null === this._grip && (this._grip = new Fp, this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new Il, this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new Il), this._grip
		}
		dispatchEvent(t) {
			return null !== this._targetRay && this._targetRay.dispatchEvent(t), null !== this._grip && this._grip.dispatchEvent(t), null !== this._hand && this._hand.dispatchEvent(t), this
		}
		disconnect(t) {
			return this.dispatchEvent({
				type: "disconnected",
				data: t
			}), null !== this._targetRay && (this._targetRay.visible = !1), null !== this._grip && (this._grip.visible = !1), null !== this._hand && (this._hand.visible = !1), this
		}
		update(t, e, n) {
			let i = null,
				r = null,
				s = null;
			const a = this._targetRay,
				o = this._grip,
				l = this._hand;
			if (t && "visible-blurred" !== e.session.visibilityState)
				if (null !== a && (i = e.getPose(t.targetRaySpace, n), null !== i && (a.matrix.fromArray(i.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), i.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(i.linearVelocity)) : a.hasLinearVelocity = !1, i.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(i.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(kp))), l && t.hand) {
					s = !0;
					for (const i of t.hand.values()) {
						const t = e.getJointPose(i, n);
						if (void 0 === l.joints[i.jointName]) {
							const t = new Fp;
							t.matrixAutoUpdate = !1, t.visible = !1, l.joints[i.jointName] = t, l.add(t)
						}
						const r = l.joints[i.jointName];
						null !== t && (r.matrix.fromArray(t.transform.matrix), r.matrix.decompose(r.position, r.rotation, r.scale), r.jointRadius = t.radius), r.visible = null !== t
					}
					const i = l.joints["index-finger-tip"],
						r = l.joints["thumb-tip"],
						a = i.position.distanceTo(r.position),
						o = .02,
						c = .005;
					l.inputState.pinching && a > o + c ? (l.inputState.pinching = !1, this.dispatchEvent({
						type: "pinchend",
						handedness: t.handedness,
						target: this
					})) : !l.inputState.pinching && a <= o - c && (l.inputState.pinching = !0, this.dispatchEvent({
						type: "pinchstart",
						handedness: t.handedness,
						target: this
					}))
				} else null !== o && t.gripSpace && (r = e.getPose(t.gripSpace, n), null !== r && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1));
			return null !== a && (a.visible = null !== i), null !== o && (o.visible = null !== r), null !== l && (l.visible = null !== s), this
		}
	}
	class Hp extends Al {
		constructor(t, e, n, i, r, s, a, o, l, c) {
			if ((c = void 0 !== c ? c : Xo) !== Xo && c !== Yo) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
			void 0 === n && c === Xo && (n = Uo), void 0 === n && c === Yo && (n = Wo), super(null, i, r, s, a, o, c, n, l), this.image = {
				width: t,
				height: e
			}, this.magFilter = void 0 !== a ? a : zo, this.minFilter = void 0 !== o ? o : zo, this.flipY = !1, this.generateMipmaps = !1
		}
	}
	Hp.prototype.isDepthTexture = !0;
	class Gp extends hl {
		constructor(t, e) {
			super();
			const n = this;
			let i = null,
				r = 1,
				s = null,
				a = "local-floor";
			const o = t.extensions.has("WEBGL_multisampled_render_to_texture");
			let l = null,
				c = null,
				h = null,
				u = null,
				d = !1,
				p = null;
			const m = e.getContextAttributes();
			let f = null,
				g = null;
			const v = [],
				y = new Map,
				_ = new Gh;
			_.layers.enable(1), _.viewport = new Cl;
			const x = new Gh;
			x.layers.enable(2), x.viewport = new Cl;
			const w = [_, x],
				b = new Bp;
			b.layers.enable(1), b.layers.enable(2);
			let M = null,
				S = null;

			function T(t) {
				const e = y.get(t.inputSource);
				e && e.dispatchEvent({
					type: t.type,
					data: t.inputSource
				})
			}

			function E() {
				y.forEach((function (t, e) {
					t.disconnect(e)
				})), y.clear(), M = null, S = null, t.setRenderTarget(f), u = null, h = null, c = null, i = null, g = null, D.stop(), n.isPresenting = !1, n.dispatchEvent({
					type: "sessionend"
				})
			}

			function A(t) {
				const e = i.inputSources;
				for (let t = 0; t < v.length; t++) y.set(e[t], v[t]);
				for (let e = 0; e < t.removed.length; e++) {
					const n = t.removed[e],
						i = y.get(n);
					i && (i.dispatchEvent({
						type: "disconnected",
						data: n
					}), y.delete(n))
				}
				for (let e = 0; e < t.added.length; e++) {
					const n = t.added[e],
						i = y.get(n);
					i && i.dispatchEvent({
						type: "connected",
						data: n
					})
				}
			}
			this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function (t) {
				let e = v[t];
				return void 0 === e && (e = new Up, v[t] = e), e.getTargetRaySpace()
			}, this.getControllerGrip = function (t) {
				let e = v[t];
				return void 0 === e && (e = new Up, v[t] = e), e.getGripSpace()
			}, this.getHand = function (t) {
				let e = v[t];
				return void 0 === e && (e = new Up, v[t] = e), e.getHandSpace()
			}, this.setFramebufferScaleFactor = function (t) {
				r = t, !0 === n.isPresenting && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")
			}, this.setReferenceSpaceType = function (t) {
				a = t, !0 === n.isPresenting && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")
			}, this.getReferenceSpace = function () {
				return s
			}, this.getBaseLayer = function () {
				return null !== h ? h : u
			}, this.getBinding = function () {
				return c
			}, this.getFrame = function () {
				return p
			}, this.getSession = function () {
				return i
			}, this.setSession = async function (l) {
				if (i = l, null !== i) {
					if (f = t.getRenderTarget(), i.addEventListener("select", T), i.addEventListener("selectstart", T), i.addEventListener("selectend", T), i.addEventListener("squeeze", T), i.addEventListener("squeezestart", T), i.addEventListener("squeezeend", T), i.addEventListener("end", E), i.addEventListener("inputsourceschange", A), !0 !== m.xrCompatible && await e.makeXRCompatible(), void 0 === i.renderState.layers || !1 === t.capabilities.isWebGL2) {
						const t = {
							antialias: void 0 !== i.renderState.layers || m.antialias,
							alpha: m.alpha,
							depth: m.depth,
							stencil: m.stencil,
							framebufferScaleFactor: r
						};
						u = new XRWebGLLayer(i, e, t), i.updateRenderState({
							baseLayer: u
						}), g = new Rl(u.framebufferWidth, u.framebufferHeight)
					} else {
						d = m.antialias;
						let t = null,
							n = null,
							s = null;
						m.depth && (s = m.stencil ? 35056 : 33189, t = m.stencil ? Yo : Xo, n = m.stencil ? Wo : Uo);
						const a = {
							colorFormat: m.alpha || d ? 32856 : 32849,
							depthFormat: s,
							scaleFactor: r
						};
						c = new XRWebGLBinding(i, e), h = c.createProjectionLayer(a), i.updateRenderState({
							layers: [h]
						}), g = d ? new Pl(h.textureWidth, h.textureHeight, {
							format: jo,
							type: ko,
							depthTexture: new Hp(h.textureWidth, h.textureHeight, n, void 0, void 0, void 0, void 0, void 0, void 0, t),
							stencilBuffer: m.stencil,
							ignoreDepth: h.ignoreDepthValues,
							useRenderToTexture: o
						}) : new Rl(h.textureWidth, h.textureHeight, {
							format: m.alpha ? jo : qo,
							type: ko,
							depthTexture: new Hp(h.textureWidth, h.textureHeight, n, void 0, void 0, void 0, void 0, void 0, void 0, t),
							stencilBuffer: m.stencil,
							ignoreDepth: h.ignoreDepthValues
						})
					}
					this.setFoveation(0), s = await i.requestReferenceSpace(a), D.setContext(i), D.start(), n.isPresenting = !0, n.dispatchEvent({
						type: "sessionstart"
					})
				}
			};
			const L = new Il,
				C = new Il;

			function R(t, e) {
				null === e ? t.matrixWorld.copy(t.matrix) : t.matrixWorld.multiplyMatrices(e.matrixWorld, t.matrix), t.matrixWorldInverse.copy(t.matrixWorld).invert()
			}
			this.updateCamera = function (t) {
				if (null === i) return;
				b.near = x.near = _.near = t.near, b.far = x.far = _.far = t.far, M === b.near && S === b.far || (i.updateRenderState({
					depthNear: b.near,
					depthFar: b.far
				}), M = b.near, S = b.far);
				const e = t.parent,
					n = b.cameras;
				R(b, e);
				for (let t = 0; t < n.length; t++) R(n[t], e);
				b.matrixWorld.decompose(b.position, b.quaternion, b.scale), t.position.copy(b.position), t.quaternion.copy(b.quaternion), t.scale.copy(b.scale), t.matrix.copy(b.matrix), t.matrixWorld.copy(b.matrixWorld);
				const r = t.children;
				for (let t = 0, e = r.length; t < e; t++) r[t].updateMatrixWorld(!0);
				2 === n.length ? function (t, e, n) {
					L.setFromMatrixPosition(e.matrixWorld), C.setFromMatrixPosition(n.matrixWorld);
					const i = L.distanceTo(C),
						r = e.projectionMatrix.elements,
						s = n.projectionMatrix.elements,
						a = r[14] / (r[10] - 1),
						o = r[14] / (r[10] + 1),
						l = (r[9] + 1) / r[5],
						c = (r[9] - 1) / r[5],
						h = (r[8] - 1) / r[0],
						u = (s[8] + 1) / s[0],
						d = a * h,
						p = a * u,
						m = i / (-h + u),
						f = m * -h;
					e.matrixWorld.decompose(t.position, t.quaternion, t.scale), t.translateX(f), t.translateZ(m), t.matrixWorld.compose(t.position, t.quaternion, t.scale), t.matrixWorldInverse.copy(t.matrixWorld).invert();
					const g = a + m,
						v = o + m,
						y = d - f,
						_ = p + (i - f),
						x = l * o / v * g,
						w = c * o / v * g;
					t.projectionMatrix.makePerspective(y, _, x, w, g, v)
				}(b, _, x) : b.projectionMatrix.copy(_.projectionMatrix)
			}, this.getCamera = function () {
				return b
			}, this.getFoveation = function () {
				return null !== h ? h.fixedFoveation : null !== u ? u.fixedFoveation : void 0
			}, this.setFoveation = function (t) {
				null !== h && (h.fixedFoveation = t), null !== u && void 0 !== u.fixedFoveation && (u.fixedFoveation = t)
			};
			let P = null;
			const D = new tu;
			D.setAnimationLoop((function (e, n) {
				if (l = n.getViewerPose(s), p = n, null !== l) {
					const e = l.views;
					null !== u && (t.setRenderTargetFramebuffer(g, u.framebuffer), t.setRenderTarget(g));
					let n = !1;
					e.length !== b.cameras.length && (b.cameras.length = 0, n = !0);
					for (let i = 0; i < e.length; i++) {
						const r = e[i];
						let s = null;
						if (null !== u) s = u.getViewport(r);
						else {
							const e = c.getViewSubImage(h, r);
							s = e.viewport, 0 === i && (t.setRenderTargetTextures(g, e.colorTexture, h.ignoreDepthValues ? void 0 : e.depthStencilTexture), t.setRenderTarget(g))
						}
						const a = w[i];
						a.matrix.fromArray(r.transform.matrix), a.projectionMatrix.fromArray(r.projectionMatrix), a.viewport.set(s.x, s.y, s.width, s.height), 0 === i && b.matrix.copy(a.matrix), !0 === n && b.cameras.push(a)
					}
				}
				const r = i.inputSources;
				for (let t = 0; t < v.length; t++) {
					const e = v[t],
						i = r[t];
					e.update(i, n, s)
				}
				P && P(e, n), p = null
			})), this.setAnimationLoop = function (t) {
				P = t
			}, this.dispose = function () {}
		}
	}

	function Vp(t) {
		function e(e, n) {
			e.opacity.value = n.opacity, n.color && e.diffuse.value.copy(n.color), n.emissive && e.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity), n.map && (e.map.value = n.map), n.alphaMap && (e.alphaMap.value = n.alphaMap), n.specularMap && (e.specularMap.value = n.specularMap), n.alphaTest > 0 && (e.alphaTest.value = n.alphaTest);
			const i = t.get(n).envMap;
			let r, s;
			i && (e.envMap.value = i, e.flipEnvMap.value = i.isCubeTexture && !1 === i.isRenderTargetTexture ? -1 : 1, e.reflectivity.value = n.reflectivity, e.ior.value = n.ior, e.refractionRatio.value = n.refractionRatio), n.lightMap && (e.lightMap.value = n.lightMap, e.lightMapIntensity.value = n.lightMapIntensity), n.aoMap && (e.aoMap.value = n.aoMap, e.aoMapIntensity.value = n.aoMapIntensity), n.map ? r = n.map : n.specularMap ? r = n.specularMap : n.displacementMap ? r = n.displacementMap : n.normalMap ? r = n.normalMap : n.bumpMap ? r = n.bumpMap : n.roughnessMap ? r = n.roughnessMap : n.metalnessMap ? r = n.metalnessMap : n.alphaMap ? r = n.alphaMap : n.emissiveMap ? r = n.emissiveMap : n.clearcoatMap ? r = n.clearcoatMap : n.clearcoatNormalMap ? r = n.clearcoatNormalMap : n.clearcoatRoughnessMap ? r = n.clearcoatRoughnessMap : n.specularIntensityMap ? r = n.specularIntensityMap : n.specularColorMap ? r = n.specularColorMap : n.transmissionMap ? r = n.transmissionMap : n.thicknessMap ? r = n.thicknessMap : n.sheenColorMap ? r = n.sheenColorMap : n.sheenRoughnessMap && (r = n.sheenRoughnessMap), void 0 !== r && (r.isWebGLRenderTarget && (r = r.texture), !0 === r.matrixAutoUpdate && r.updateMatrix(), e.uvTransform.value.copy(r.matrix)), n.aoMap ? s = n.aoMap : n.lightMap && (s = n.lightMap), void 0 !== s && (s.isWebGLRenderTarget && (s = s.texture), !0 === s.matrixAutoUpdate && s.updateMatrix(), e.uv2Transform.value.copy(s.matrix))
		}

		function n(e, n) {
			e.roughness.value = n.roughness, e.metalness.value = n.metalness, n.roughnessMap && (e.roughnessMap.value = n.roughnessMap), n.metalnessMap && (e.metalnessMap.value = n.metalnessMap), n.emissiveMap && (e.emissiveMap.value = n.emissiveMap), n.bumpMap && (e.bumpMap.value = n.bumpMap, e.bumpScale.value = n.bumpScale, 1 === n.side && (e.bumpScale.value *= -1)), n.normalMap && (e.normalMap.value = n.normalMap, e.normalScale.value.copy(n.normalScale), 1 === n.side && e.normalScale.value.negate()), n.displacementMap && (e.displacementMap.value = n.displacementMap, e.displacementScale.value = n.displacementScale, e.displacementBias.value = n.displacementBias);
			t.get(n).envMap && (e.envMapIntensity.value = n.envMapIntensity)
		}
		return {
			refreshFogUniforms: function (t, e) {
				t.fogColor.value.copy(e.color), e.isFog ? (t.fogNear.value = e.near, t.fogFar.value = e.far) : e.isFogExp2 && (t.fogDensity.value = e.density)
			},
			refreshMaterialUniforms: function (t, i, r, s, a) {
				i.isMeshBasicMaterial ? e(t, i) : i.isMeshLambertMaterial ? (e(t, i), function (t, e) {
					e.emissiveMap && (t.emissiveMap.value = e.emissiveMap)
				}(t, i)) : i.isMeshToonMaterial ? (e(t, i), function (t, e) {
					e.gradientMap && (t.gradientMap.value = e.gradientMap);
					e.emissiveMap && (t.emissiveMap.value = e.emissiveMap);
					e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale, 1 === e.side && (t.bumpScale.value *= -1));
					e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale), 1 === e.side && t.normalScale.value.negate());
					e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
				}(t, i)) : i.isMeshPhongMaterial ? (e(t, i), function (t, e) {
					t.specular.value.copy(e.specular), t.shininess.value = Math.max(e.shininess, 1e-4), e.emissiveMap && (t.emissiveMap.value = e.emissiveMap);
					e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale, 1 === e.side && (t.bumpScale.value *= -1));
					e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale), 1 === e.side && t.normalScale.value.negate());
					e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
				}(t, i)) : i.isMeshStandardMaterial ? (e(t, i), i.isMeshPhysicalMaterial ? function (t, e, i) {
					n(t, e), t.ior.value = e.ior, e.sheen > 0 && (t.sheenColor.value.copy(e.sheenColor).multiplyScalar(e.sheen), t.sheenRoughness.value = e.sheenRoughness, e.sheenColorMap && (t.sheenColorMap.value = e.sheenColorMap), e.sheenRoughnessMap && (t.sheenRoughnessMap.value = e.sheenRoughnessMap));
					e.clearcoat > 0 && (t.clearcoat.value = e.clearcoat, t.clearcoatRoughness.value = e.clearcoatRoughness, e.clearcoatMap && (t.clearcoatMap.value = e.clearcoatMap), e.clearcoatRoughnessMap && (t.clearcoatRoughnessMap.value = e.clearcoatRoughnessMap), e.clearcoatNormalMap && (t.clearcoatNormalScale.value.copy(e.clearcoatNormalScale), t.clearcoatNormalMap.value = e.clearcoatNormalMap, 1 === e.side && t.clearcoatNormalScale.value.negate()));
					e.transmission > 0 && (t.transmission.value = e.transmission, t.transmissionSamplerMap.value = i.texture, t.transmissionSamplerSize.value.set(i.width, i.height), e.transmissionMap && (t.transmissionMap.value = e.transmissionMap), t.thickness.value = e.thickness, e.thicknessMap && (t.thicknessMap.value = e.thicknessMap), t.attenuationDistance.value = e.attenuationDistance, t.attenuationColor.value.copy(e.attenuationColor));
					t.specularIntensity.value = e.specularIntensity, t.specularColor.value.copy(e.specularColor), e.specularIntensityMap && (t.specularIntensityMap.value = e.specularIntensityMap);
					e.specularColorMap && (t.specularColorMap.value = e.specularColorMap)
				}(t, i, a) : n(t, i)) : i.isMeshMatcapMaterial ? (e(t, i), function (t, e) {
					e.matcap && (t.matcap.value = e.matcap);
					e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale, 1 === e.side && (t.bumpScale.value *= -1));
					e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale), 1 === e.side && t.normalScale.value.negate());
					e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
				}(t, i)) : i.isMeshDepthMaterial ? (e(t, i), function (t, e) {
					e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
				}(t, i)) : i.isMeshDistanceMaterial ? (e(t, i), function (t, e) {
					e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias);
					t.referencePosition.value.copy(e.referencePosition), t.nearDistance.value = e.nearDistance, t.farDistance.value = e.farDistance
				}(t, i)) : i.isMeshNormalMaterial ? (e(t, i), function (t, e) {
					e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale, 1 === e.side && (t.bumpScale.value *= -1));
					e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale), 1 === e.side && t.normalScale.value.negate());
					e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
				}(t, i)) : i.isLineBasicMaterial ? (function (t, e) {
					t.diffuse.value.copy(e.color), t.opacity.value = e.opacity
				}(t, i), i.isLineDashedMaterial && function (t, e) {
					t.dashSize.value = e.dashSize, t.totalSize.value = e.dashSize + e.gapSize, t.scale.value = e.scale
				}(t, i)) : i.isPointsMaterial ? function (t, e, n, i) {
					t.diffuse.value.copy(e.color), t.opacity.value = e.opacity, t.size.value = e.size * n, t.scale.value = .5 * i, e.map && (t.map.value = e.map);
					e.alphaMap && (t.alphaMap.value = e.alphaMap);
					e.alphaTest > 0 && (t.alphaTest.value = e.alphaTest);
					let r;
					e.map ? r = e.map : e.alphaMap && (r = e.alphaMap);
					void 0 !== r && (!0 === r.matrixAutoUpdate && r.updateMatrix(), t.uvTransform.value.copy(r.matrix))
				}(t, i, r, s) : i.isSpriteMaterial ? function (t, e) {
					t.diffuse.value.copy(e.color), t.opacity.value = e.opacity, t.rotation.value = e.rotation, e.map && (t.map.value = e.map);
					e.alphaMap && (t.alphaMap.value = e.alphaMap);
					e.alphaTest > 0 && (t.alphaTest.value = e.alphaTest);
					let n;
					e.map ? n = e.map : e.alphaMap && (n = e.alphaMap);
					void 0 !== n && (!0 === n.matrixAutoUpdate && n.updateMatrix(), t.uvTransform.value.copy(n.matrix))
				}(t, i) : i.isShadowMaterial ? (t.color.value.copy(i.color), t.opacity.value = i.opacity) : i.isShaderMaterial && (i.uniformsNeedUpdate = !1)
			}
		}
	}

	function Wp(t = {}) {
		const e = void 0 !== t.canvas ? t.canvas : function () {
				const t = bl("canvas");
				return t.style.display = "none", t
			}(),
			n = void 0 !== t.context ? t.context : null,
			i = void 0 !== t.alpha && t.alpha,
			r = void 0 === t.depth || t.depth,
			s = void 0 === t.stencil || t.stencil,
			a = void 0 !== t.antialias && t.antialias,
			o = void 0 === t.premultipliedAlpha || t.premultipliedAlpha,
			l = void 0 !== t.preserveDrawingBuffer && t.preserveDrawingBuffer,
			c = void 0 !== t.powerPreference ? t.powerPreference : "default",
			h = void 0 !== t.failIfMajorPerformanceCaveat && t.failIfMajorPerformanceCaveat;
		let u = null,
			d = null;
		const p = [],
			m = [];
		this.domElement = e, this.debug = {
			checkShaderErrors: !0
		}, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.gammaFactor = 2, this.outputEncoding = nl, this.physicallyCorrectLights = !1, this.toneMapping = 0, this.toneMappingExposure = 1;
		const f = this;
		let g = !1,
			v = 0,
			y = 0,
			_ = null,
			x = -1,
			w = null;
		const b = new Cl,
			M = new Cl;
		let S = null,
			T = e.width,
			E = e.height,
			A = 1,
			L = null,
			C = null;
		const R = new Cl(0, 0, T, E),
			P = new Cl(0, 0, T, E);
		let D = !1;
		const I = [],
			O = new $h;
		let N = !1,
			z = !1,
			B = null;
		const F = new hc,
			k = new Il,
			U = {
				background: null,
				fog: null,
				environment: null,
				overrideMaterial: null,
				isScene: !0
			};

		function H() {
			return null === _ ? A : 1
		}
		let G, V, W, q, j, X, Y, J, Z, Q, K, tt, et, nt, it, rt, st, at, ot, lt, ct, ht, ut, dt = n;

		function pt(t, n) {
			for (let i = 0; i < t.length; i++) {
				const r = t[i],
					s = e.getContext(r, n);
				if (null !== s) return s
			}
			return null
		}
		try {
			const t = {
				alpha: i,
				depth: r,
				stencil: s,
				antialias: a,
				premultipliedAlpha: o,
				preserveDrawingBuffer: l,
				powerPreference: c,
				failIfMajorPerformanceCaveat: h
			};
			if ("setAttribute" in e && e.setAttribute("data-engine", "three.js r135"), e.addEventListener("webglcontextlost", gt, !1), e.addEventListener("webglcontextrestored", vt, !1), null === dt) {
				const e = ["webgl2", "webgl", "experimental-webgl"];
				if (!0 === f.isWebGL1Renderer && e.shift(), dt = pt(e, t), null === dt) throw pt(e) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.")
			}
			void 0 === dt.getShaderPrecisionFormat && (dt.getShaderPrecisionFormat = function () {
				return {
					rangeMin: 1,
					rangeMax: 1,
					precision: 1
				}
			})
		} catch (t) {
			throw console.error("THREE.WebGLRenderer: " + t.message), t
		}

		function mt() {
			G = new Fu(dt), V = new cu(dt, G, t), G.init(V), ht = new zp(dt, G, V), W = new Op(dt, G, V), I[0] = 1029, q = new Hu(dt), j = new xp, X = new Np(dt, G, W, j, V, ht, q), Y = new uu(f), J = new Bu(f), Z = new eu(dt, V), ut = new ou(dt, G, Z, V), Q = new ku(dt, Z, q, ut), K = new Xu(dt, Q, Z, q), ot = new ju(dt, V, X), rt = new hu(j), tt = new _p(f, Y, J, G, V, ut, rt), et = new Vp(j), nt = new Sp(j), it = new Rp(G, V), at = new au(f, Y, W, K, o), st = new Ip(f, K, V), lt = new lu(dt, G, q, V), ct = new Uu(dt, G, q, V), q.programs = tt.programs, f.capabilities = V, f.extensions = G, f.properties = j, f.renderLists = nt, f.shadowMap = st, f.state = W, f.info = q
		}
		mt();
		const ft = new Gp(f, dt);

		function gt(t) {
			t.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), g = !0
		}

		function vt() {
			console.log("THREE.WebGLRenderer: Context Restored."), g = !1;
			const t = q.autoReset,
				e = st.enabled,
				n = st.autoUpdate,
				i = st.needsUpdate,
				r = st.type;
			mt(), q.autoReset = t, st.enabled = e, st.autoUpdate = n, st.needsUpdate = i, st.type = r
		}

		function yt(t) {
			const e = t.target;
			e.removeEventListener("dispose", yt),
				function (t) {
					(function (t) {
						const e = j.get(t).programs;
						void 0 !== e && e.forEach((function (t) {
							tt.releaseProgram(t)
						}))
					})(t), j.remove(t)
				}(e)
		}
		this.xr = ft, this.getContext = function () {
			return dt
		}, this.getContextAttributes = function () {
			return dt.getContextAttributes()
		}, this.forceContextLoss = function () {
			const t = G.get("WEBGL_lose_context");
			t && t.loseContext()
		}, this.forceContextRestore = function () {
			const t = G.get("WEBGL_lose_context");
			t && t.restoreContext()
		}, this.getPixelRatio = function () {
			return A
		}, this.setPixelRatio = function (t) {
			void 0 !== t && (A = t, this.setSize(T, E, !1))
		}, this.getSize = function (t) {
			return t.set(T, E)
		}, this.setSize = function (t, n, i) {
			ft.isPresenting ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (T = t, E = n, e.width = Math.floor(t * A), e.height = Math.floor(n * A), !1 !== i && (e.style.width = t + "px", e.style.height = n + "px"), this.setViewport(0, 0, t, n))
		}, this.getDrawingBufferSize = function (t) {
			return t.set(T * A, E * A).floor()
		}, this.setDrawingBufferSize = function (t, n, i) {
			T = t, E = n, A = i, e.width = Math.floor(t * i), e.height = Math.floor(n * i), this.setViewport(0, 0, t, n)
		}, this.getCurrentViewport = function (t) {
			return t.copy(b)
		}, this.getViewport = function (t) {
			return t.copy(R)
		}, this.setViewport = function (t, e, n, i) {
			t.isVector4 ? R.set(t.x, t.y, t.z, t.w) : R.set(t, e, n, i), W.viewport(b.copy(R).multiplyScalar(A).floor())
		}, this.getScissor = function (t) {
			return t.copy(P)
		}, this.setScissor = function (t, e, n, i) {
			t.isVector4 ? P.set(t.x, t.y, t.z, t.w) : P.set(t, e, n, i), W.scissor(M.copy(P).multiplyScalar(A).floor())
		}, this.getScissorTest = function () {
			return D
		}, this.setScissorTest = function (t) {
			W.setScissorTest(D = t)
		}, this.setOpaqueSort = function (t) {
			L = t
		}, this.setTransparentSort = function (t) {
			C = t
		}, this.getClearColor = function (t) {
			return t.copy(at.getClearColor())
		}, this.setClearColor = function () {
			at.setClearColor.apply(at, arguments)
		}, this.getClearAlpha = function () {
			return at.getClearAlpha()
		}, this.setClearAlpha = function () {
			at.setClearAlpha.apply(at, arguments)
		}, this.clear = function (t, e, n) {
			let i = 0;
			(void 0 === t || t) && (i |= 16384), (void 0 === e || e) && (i |= 256), (void 0 === n || n) && (i |= 1024), dt.clear(i)
		}, this.clearColor = function () {
			this.clear(!0, !1, !1)
		}, this.clearDepth = function () {
			this.clear(!1, !0, !1)
		}, this.clearStencil = function () {
			this.clear(!1, !1, !0)
		}, this.dispose = function () {
			e.removeEventListener("webglcontextlost", gt, !1), e.removeEventListener("webglcontextrestored", vt, !1), nt.dispose(), it.dispose(), j.dispose(), Y.dispose(), J.dispose(), K.dispose(), ut.dispose(), ft.dispose(), ft.removeEventListener("sessionstart", xt), ft.removeEventListener("sessionend", wt), B && (B.dispose(), B = null), bt.stop()
		}, this.renderBufferDirect = function (t, e, n, i, r, s) {
			null === e && (e = U);
			const a = r.isMesh && r.matrixWorld.determinant() < 0,
				o = function (t, e, n, i, r) {
					!0 !== e.isScene && (e = U);
					X.resetTextureUnits();
					const s = e.fog,
						a = i.isMeshStandardMaterial ? e.environment : null,
						o = null === _ ? f.outputEncoding : _.texture.encoding,
						l = (i.isMeshStandardMaterial ? J : Y).get(i.envMap || a),
						c = !0 === i.vertexColors && !!n.attributes.color && 4 === n.attributes.color.itemSize,
						h = !!i.normalMap && !!n.attributes.tangent,
						u = !!n.morphAttributes.position,
						p = !!n.morphAttributes.normal,
						m = n.morphAttributes.position ? n.morphAttributes.position.length : 0,
						g = j.get(i),
						v = d.state.lights;
					if (!0 === N && (!0 === z || t !== w)) {
						const e = t === w && i.id === x;
						rt.setState(i, t, e)
					}
					let y = !1;
					i.version === g.__version ? g.needsLights && g.lightsStateVersion !== v.state.version || g.outputEncoding !== o || r.isInstancedMesh && !1 === g.instancing ? y = !0 : r.isInstancedMesh || !0 !== g.instancing ? r.isSkinnedMesh && !1 === g.skinning ? y = !0 : r.isSkinnedMesh || !0 !== g.skinning ? g.envMap !== l || i.fog && g.fog !== s ? y = !0 : void 0 === g.numClippingPlanes || g.numClippingPlanes === rt.numPlanes && g.numIntersection === rt.numIntersection ? (g.vertexAlphas !== c || g.vertexTangents !== h || g.morphTargets !== u || g.morphNormals !== p || !0 === V.isWebGL2 && g.morphTargetsCount !== m) && (y = !0) : y = !0 : y = !0 : y = !0 : (y = !0, g.__version = i.version);
					let b = g.currentProgram;
					!0 === y && (b = At(i, e, r));
					let M = !1,
						S = !1,
						T = !1;
					const L = b.getUniforms(),
						C = g.uniforms;
					W.useProgram(b.program) && (M = !0, S = !0, T = !0);
					i.id !== x && (x = i.id, S = !0);
					if (M || w !== t) {
						if (L.setValue(dt, "projectionMatrix", t.projectionMatrix), V.logarithmicDepthBuffer && L.setValue(dt, "logDepthBufFC", 2 / (Math.log(t.far + 1) / Math.LN2)), w !== t && (w = t, S = !0, T = !0), i.isShaderMaterial || i.isMeshPhongMaterial || i.isMeshToonMaterial || i.isMeshStandardMaterial || i.envMap) {
							const e = L.map.cameraPosition;
							void 0 !== e && e.setValue(dt, k.setFromMatrixPosition(t.matrixWorld))
						}(i.isMeshPhongMaterial || i.isMeshToonMaterial || i.isMeshLambertMaterial || i.isMeshBasicMaterial || i.isMeshStandardMaterial || i.isShaderMaterial) && L.setValue(dt, "isOrthographic", !0 === t.isOrthographicCamera), (i.isMeshPhongMaterial || i.isMeshToonMaterial || i.isMeshLambertMaterial || i.isMeshBasicMaterial || i.isMeshStandardMaterial || i.isShaderMaterial || i.isShadowMaterial || r.isSkinnedMesh) && L.setValue(dt, "viewMatrix", t.matrixWorldInverse)
					}
					if (r.isSkinnedMesh) {
						L.setOptional(dt, r, "bindMatrix"), L.setOptional(dt, r, "bindMatrixInverse");
						const t = r.skeleton;
						t && (V.floatVertexTextures ? (null === t.boneTexture && t.computeBoneTexture(), L.setValue(dt, "boneTexture", t.boneTexture, X), L.setValue(dt, "boneTextureSize", t.boneTextureSize)) : L.setOptional(dt, t, "boneMatrices"))
					}!n || void 0 === n.morphAttributes.position && void 0 === n.morphAttributes.normal || ot.update(r, n, i, b);
					(S || g.receiveShadow !== r.receiveShadow) && (g.receiveShadow = r.receiveShadow, L.setValue(dt, "receiveShadow", r.receiveShadow));
					S && (L.setValue(dt, "toneMappingExposure", f.toneMappingExposure), g.needsLights && (P = T, (R = C).ambientLightColor.needsUpdate = P, R.lightProbe.needsUpdate = P, R.directionalLights.needsUpdate = P, R.directionalLightShadows.needsUpdate = P, R.pointLights.needsUpdate = P, R.pointLightShadows.needsUpdate = P, R.spotLights.needsUpdate = P, R.spotLightShadows.needsUpdate = P, R.rectAreaLights.needsUpdate = P, R.hemisphereLights.needsUpdate = P), s && i.fog && et.refreshFogUniforms(C, s), et.refreshMaterialUniforms(C, i, A, E, B), Kd.upload(dt, g.uniformsList, C, X));
					var R, P;
					i.isShaderMaterial && !0 === i.uniformsNeedUpdate && (Kd.upload(dt, g.uniformsList, C, X), i.uniformsNeedUpdate = !1);
					i.isSpriteMaterial && L.setValue(dt, "center", r.center);
					return L.setValue(dt, "modelViewMatrix", r.modelViewMatrix), L.setValue(dt, "normalMatrix", r.normalMatrix), L.setValue(dt, "modelMatrix", r.matrixWorld), b
				}(t, e, n, i, r);
			W.setMaterial(i, a);
			let l = n.index;
			const c = n.attributes.position;
			if (null === l) {
				if (void 0 === c || 0 === c.count) return
			} else if (0 === l.count) return;
			let h, u = 1;
			!0 === i.wireframe && (l = Q.getWireframeAttribute(n), u = 2), ut.setup(r, i, o, n, l);
			let p = lt;
			null !== l && (h = Z.get(l), p = ct, p.setIndex(h));
			const m = null !== l ? l.count : c.count,
				g = n.drawRange.start * u,
				v = n.drawRange.count * u,
				y = null !== s ? s.start * u : 0,
				b = null !== s ? s.count * u : 1 / 0,
				M = Math.max(g, y),
				S = Math.min(m, g + v, y + b) - 1,
				T = Math.max(0, S - M + 1);
			if (0 !== T) {
				if (r.isMesh) !0 === i.wireframe ? (W.setLineWidth(i.wireframeLinewidth * H()), p.setMode(1)) : p.setMode(4);
				else if (r.isLine) {
					let t = i.linewidth;
					void 0 === t && (t = 1), W.setLineWidth(t * H()), r.isLineSegments ? p.setMode(1) : r.isLineLoop ? p.setMode(2) : p.setMode(3)
				} else r.isPoints ? p.setMode(0) : r.isSprite && p.setMode(4);
				if (r.isInstancedMesh) p.renderInstances(M, T, r.count);
				else if (n.isInstancedBufferGeometry) {
					const t = Math.min(n.instanceCount, n._maxInstanceCount);
					p.renderInstances(M, T, t)
				} else p.render(M, T)
			}
		}, this.compile = function (t, e) {
			d = it.get(t), d.init(), m.push(d), t.traverseVisible((function (t) {
				t.isLight && t.layers.test(e.layers) && (d.pushLight(t), t.castShadow && d.pushShadow(t))
			})), d.setupLights(f.physicallyCorrectLights), t.traverse((function (e) {
				const n = e.material;
				if (n)
					if (Array.isArray(n))
						for (let i = 0; i < n.length; i++) {
							At(n[i], t, e)
						} else At(n, t, e)
			})), m.pop(), d = null
		};
		let _t = null;

		function xt() {
			bt.stop()
		}

		function wt() {
			bt.start()
		}
		const bt = new tu;

		function Mt(t, e, n, i) {
			if (!1 === t.visible) return;
			if (t.layers.test(e.layers))
				if (t.isGroup) n = t.renderOrder;
				else if (t.isLOD) !0 === t.autoUpdate && t.update(e);
			else if (t.isLight) d.pushLight(t), t.castShadow && d.pushShadow(t);
			else if (t.isSprite) {
				if (!t.frustumCulled || O.intersectsSprite(t)) {
					i && k.setFromMatrixPosition(t.matrixWorld).applyMatrix4(F);
					const e = K.update(t),
						r = t.material;
					r.visible && u.push(t, e, r, n, k.z, null)
				}
			} else if ((t.isMesh || t.isLine || t.isPoints) && (t.isSkinnedMesh && t.skeleton.frame !== q.render.frame && (t.skeleton.update(), t.skeleton.frame = q.render.frame), !t.frustumCulled || O.intersectsObject(t))) {
				i && k.setFromMatrixPosition(t.matrixWorld).applyMatrix4(F);
				const e = K.update(t),
					r = t.material;
				if (Array.isArray(r)) {
					const i = e.groups;
					for (let s = 0, a = i.length; s < a; s++) {
						const a = i[s],
							o = r[a.materialIndex];
						o && o.visible && u.push(t, e, o, n, k.z, a)
					}
				} else r.visible && u.push(t, e, r, n, k.z, null)
			}
			const r = t.children;
			for (let t = 0, s = r.length; t < s; t++) Mt(r[t], e, n, i)
		}

		function St(t, e, n, i) {
			const r = t.opaque,
				s = t.transmissive,
				o = t.transparent;
			d.setupLightsView(n), s.length > 0 && function (t, e, n) {
				if (null === B) {
					const t = !0 === a && !0 === V.isWebGL2;
					B = new(t ? Pl : Rl)(1024, 1024, {
						generateMipmaps: !0,
						type: null !== ht.convert(Vo) ? Vo : ko,
						minFilter: Fo,
						magFilter: zo,
						wrapS: Oo,
						wrapT: Oo,
						useRenderToTexture: G.has("WEBGL_multisampled_render_to_texture")
					})
				}
				const i = f.getRenderTarget();
				f.setRenderTarget(B), f.clear();
				const r = f.toneMapping;
				f.toneMapping = 0, Tt(t, e, n), f.toneMapping = r, X.updateMultisampleRenderTarget(B), X.updateRenderTargetMipmap(B), f.setRenderTarget(i)
			}(r, e, n), i && W.viewport(b.copy(i)), r.length > 0 && Tt(r, e, n), s.length > 0 && Tt(s, e, n), o.length > 0 && Tt(o, e, n)
		}

		function Tt(t, e, n) {
			const i = !0 === e.isScene ? e.overrideMaterial : null;
			for (let r = 0, s = t.length; r < s; r++) {
				const s = t[r],
					a = s.object,
					o = s.geometry,
					l = null === i ? s.material : i,
					c = s.group;
				a.layers.test(n.layers) && Et(a, e, n, o, l, c)
			}
		}

		function Et(t, e, n, i, r, s) {
			t.onBeforeRender(f, e, n, i, r, s), t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, t.matrixWorld), t.normalMatrix.getNormalMatrix(t.modelViewMatrix), r.onBeforeRender(f, e, n, i, t, s), !0 === r.transparent && 2 === r.side ? (r.side = 1, r.needsUpdate = !0, f.renderBufferDirect(n, e, i, r, t, s), r.side = 0, r.needsUpdate = !0, f.renderBufferDirect(n, e, i, r, t, s), r.side = 2) : f.renderBufferDirect(n, e, i, r, t, s), t.onAfterRender(f, e, n, i, r, s)
		}

		function At(t, e, n) {
			!0 !== e.isScene && (e = U);
			const i = j.get(t),
				r = d.state.lights,
				s = d.state.shadowsArray,
				a = r.state.version,
				o = tt.getParameters(t, r.state, s, e, n),
				l = tt.getProgramCacheKey(o);
			let c = i.programs;
			i.environment = t.isMeshStandardMaterial ? e.environment : null, i.fog = e.fog, i.envMap = (t.isMeshStandardMaterial ? J : Y).get(t.envMap || i.environment), void 0 === c && (t.addEventListener("dispose", yt), c = new Map, i.programs = c);
			let h = c.get(l);
			if (void 0 !== h) {
				if (i.currentProgram === h && i.lightsStateVersion === a) return Lt(t, o), h
			} else o.uniforms = tt.getUniforms(t), t.onBuild(n, o, f), t.onBeforeCompile(o, f), h = tt.acquireProgram(o, l), c.set(l, h), i.uniforms = o.uniforms;
			const u = i.uniforms;
			(t.isShaderMaterial || t.isRawShaderMaterial) && !0 !== t.clipping || (u.clippingPlanes = rt.uniform), Lt(t, o), i.needsLights = function (t) {
				return t.isMeshLambertMaterial || t.isMeshToonMaterial || t.isMeshPhongMaterial || t.isMeshStandardMaterial || t.isShadowMaterial || t.isShaderMaterial && !0 === t.lights
			}(t), i.lightsStateVersion = a, i.needsLights && (u.ambientLightColor.value = r.state.ambient, u.lightProbe.value = r.state.probe, u.directionalLights.value = r.state.directional, u.directionalLightShadows.value = r.state.directionalShadow, u.spotLights.value = r.state.spot, u.spotLightShadows.value = r.state.spotShadow, u.rectAreaLights.value = r.state.rectArea, u.ltc_1.value = r.state.rectAreaLTC1, u.ltc_2.value = r.state.rectAreaLTC2, u.pointLights.value = r.state.point, u.pointLightShadows.value = r.state.pointShadow, u.hemisphereLights.value = r.state.hemi, u.directionalShadowMap.value = r.state.directionalShadowMap, u.directionalShadowMatrix.value = r.state.directionalShadowMatrix, u.spotShadowMap.value = r.state.spotShadowMap, u.spotShadowMatrix.value = r.state.spotShadowMatrix, u.pointShadowMap.value = r.state.pointShadowMap, u.pointShadowMatrix.value = r.state.pointShadowMatrix);
			const p = h.getUniforms(),
				m = Kd.seqWithValue(p.seq, u);
			return i.currentProgram = h, i.uniformsList = m, h
		}

		function Lt(t, e) {
			const n = j.get(t);
			n.outputEncoding = e.outputEncoding, n.instancing = e.instancing, n.skinning = e.skinning, n.morphTargets = e.morphTargets, n.morphNormals = e.morphNormals, n.morphTargetsCount = e.morphTargetsCount, n.numClippingPlanes = e.numClippingPlanes, n.numIntersection = e.numClipIntersection, n.vertexAlphas = e.vertexAlphas, n.vertexTangents = e.vertexTangents
		}
		bt.setAnimationLoop((function (t) {
			_t && _t(t)
		})), "undefined" != typeof window && bt.setContext(window), this.setAnimationLoop = function (t) {
			_t = t, ft.setAnimationLoop(t), null === t ? bt.stop() : bt.start()
		}, ft.addEventListener("sessionstart", xt), ft.addEventListener("sessionend", wt), this.render = function (t, e) {
			if (void 0 !== e && !0 !== e.isCamera) return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
			if (!0 === g) return;
			!0 === t.autoUpdate && t.updateMatrixWorld(), null === e.parent && e.updateMatrixWorld(), !0 === ft.enabled && !0 === ft.isPresenting && (!0 === ft.cameraAutoUpdate && ft.updateCamera(e), e = ft.getCamera()), !0 === t.isScene && t.onBeforeRender(f, t, e, _), d = it.get(t, m.length), d.init(), m.push(d), F.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), O.setFromProjectionMatrix(F), z = this.localClippingEnabled, N = rt.init(this.clippingPlanes, z, e), u = nt.get(t, p.length), u.init(), p.push(u), Mt(t, e, 0, f.sortObjects), u.finish(), !0 === f.sortObjects && u.sort(L, C), !0 === N && rt.beginShadows();
			const n = d.state.shadowsArray;
			if (st.render(n, t, e), !0 === N && rt.endShadows(), !0 === this.info.autoReset && this.info.reset(), at.render(u, t), d.setupLights(f.physicallyCorrectLights), e.isArrayCamera) {
				const n = e.cameras;
				for (let e = 0, i = n.length; e < i; e++) {
					const i = n[e];
					St(u, t, i, i.viewport)
				}
			} else St(u, t, e);
			null !== _ && (X.updateMultisampleRenderTarget(_), X.updateRenderTargetMipmap(_)), !0 === t.isScene && t.onAfterRender(f, t, e), W.buffers.depth.setTest(!0), W.buffers.depth.setMask(!0), W.buffers.color.setMask(!0), W.setPolygonOffset(!1), ut.resetDefaultState(), x = -1, w = null, m.pop(), d = m.length > 0 ? m[m.length - 1] : null, p.pop(), u = p.length > 0 ? p[p.length - 1] : null
		}, this.getActiveCubeFace = function () {
			return v
		}, this.getActiveMipmapLevel = function () {
			return y
		}, this.getRenderTarget = function () {
			return _
		}, this.setRenderTargetTextures = function (t, e, n) {
			j.get(t.texture).__webglTexture = e, j.get(t.depthTexture).__webglTexture = n;
			const i = j.get(t);
			i.__hasExternalTextures = !0, i.__hasExternalTextures && (i.__autoAllocateDepthBuffer = void 0 === n, i.__autoAllocateDepthBuffer || t.useRenderToTexture && (console.warn("render-to-texture extension was disabled because an external texture was provided"), t.useRenderToTexture = !1, t.useRenderbuffer = !0))
		}, this.setRenderTargetFramebuffer = function (t, e) {
			const n = j.get(t);
			n.__webglFramebuffer = e, n.__useDefaultFramebuffer = void 0 === e
		}, this.setRenderTarget = function (t, e = 0, n = 0) {
			_ = t, v = e, y = n;
			let i = !0;
			if (t) {
				const e = j.get(t);
				void 0 !== e.__useDefaultFramebuffer ? (W.bindFramebuffer(36160, null), i = !1) : void 0 === e.__webglFramebuffer ? X.setupRenderTarget(t) : e.__hasExternalTextures && X.rebindTextures(t, j.get(t.texture).__webglTexture, j.get(t.depthTexture).__webglTexture)
			}
			let r = null,
				s = !1,
				a = !1;
			if (t) {
				const n = t.texture;
				(n.isDataTexture3D || n.isDataTexture2DArray) && (a = !0);
				const i = j.get(t).__webglFramebuffer;
				t.isWebGLCubeRenderTarget ? (r = i[e], s = !0) : r = t.useRenderbuffer ? j.get(t).__webglMultisampledFramebuffer : i, b.copy(t.viewport), M.copy(t.scissor), S = t.scissorTest
			} else b.copy(R).multiplyScalar(A).floor(), M.copy(P).multiplyScalar(A).floor(), S = D;
			if (W.bindFramebuffer(36160, r) && V.drawBuffers && i) {
				let e = !1;
				if (t)
					if (t.isWebGLMultipleRenderTargets) {
						const n = t.texture;
						if (I.length !== n.length || 36064 !== I[0]) {
							for (let t = 0, e = n.length; t < e; t++) I[t] = 36064 + t;
							I.length = n.length, e = !0
						}
					} else 1 === I.length && 36064 === I[0] || (I[0] = 36064, I.length = 1, e = !0);
				else 1 === I.length && 1029 === I[0] || (I[0] = 1029, I.length = 1, e = !0);
				e && (V.isWebGL2 ? dt.drawBuffers(I) : G.get("WEBGL_draw_buffers").drawBuffersWEBGL(I))
			}
			if (W.viewport(b), W.scissor(M), W.setScissorTest(S), s) {
				const i = j.get(t.texture);
				dt.framebufferTexture2D(36160, 36064, 34069 + e, i.__webglTexture, n)
			} else if (a) {
				const i = j.get(t.texture),
					r = e || 0;
				dt.framebufferTextureLayer(36160, 36064, i.__webglTexture, n || 0, r)
			}
			x = -1
		}, this.readRenderTargetPixels = function (t, e, n, i, r, s, a) {
			if (!t || !t.isWebGLRenderTarget) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
			let o = j.get(t).__webglFramebuffer;
			if (t.isWebGLCubeRenderTarget && void 0 !== a && (o = o[a]), o) {
				W.bindFramebuffer(36160, o);
				try {
					const a = t.texture,
						o = a.format,
						l = a.type;
					if (o !== jo && ht.convert(o) !== dt.getParameter(35739)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
					const c = l === Vo && (G.has("EXT_color_buffer_half_float") || V.isWebGL2 && G.has("EXT_color_buffer_float"));
					if (!(l === ko || ht.convert(l) === dt.getParameter(35738) || l === Go && (V.isWebGL2 || G.has("OES_texture_float") || G.has("WEBGL_color_buffer_float")) || c)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
					36053 === dt.checkFramebufferStatus(36160) ? e >= 0 && e <= t.width - i && n >= 0 && n <= t.height - r && dt.readPixels(e, n, i, r, ht.convert(o), ht.convert(l), s) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")
				} finally {
					const t = null !== _ ? j.get(_).__webglFramebuffer : null;
					W.bindFramebuffer(36160, t)
				}
			}
		}, this.copyFramebufferToTexture = function (t, e, n = 0) {
			const i = Math.pow(2, -n),
				r = Math.floor(e.image.width * i),
				s = Math.floor(e.image.height * i);
			let a = ht.convert(e.format);
			V.isWebGL2 && (6407 === a && (a = 32849), 6408 === a && (a = 32856)), X.setTexture2D(e, 0), dt.copyTexImage2D(3553, n, a, t.x, t.y, r, s, 0), W.unbindTexture()
		}, this.copyTextureToTexture = function (t, e, n, i = 0) {
			const r = e.image.width,
				s = e.image.height,
				a = ht.convert(n.format),
				o = ht.convert(n.type);
			X.setTexture2D(n, 0), dt.pixelStorei(37440, n.flipY), dt.pixelStorei(37441, n.premultiplyAlpha), dt.pixelStorei(3317, n.unpackAlignment), e.isDataTexture ? dt.texSubImage2D(3553, i, t.x, t.y, r, s, a, o, e.image.data) : e.isCompressedTexture ? dt.compressedTexSubImage2D(3553, i, t.x, t.y, e.mipmaps[0].width, e.mipmaps[0].height, a, e.mipmaps[0].data) : dt.texSubImage2D(3553, i, t.x, t.y, a, o, e.image), 0 === i && n.generateMipmaps && dt.generateMipmap(3553), W.unbindTexture()
		}, this.copyTextureToTexture3D = function (t, e, n, i, r = 0) {
			if (f.isWebGL1Renderer) return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
			const s = t.max.x - t.min.x + 1,
				a = t.max.y - t.min.y + 1,
				o = t.max.z - t.min.z + 1,
				l = ht.convert(i.format),
				c = ht.convert(i.type);
			let h;
			if (i.isDataTexture3D) X.setTexture3D(i, 0), h = 32879;
			else {
				if (!i.isDataTexture2DArray) return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
				X.setTexture2DArray(i, 0), h = 35866
			}
			dt.pixelStorei(37440, i.flipY), dt.pixelStorei(37441, i.premultiplyAlpha), dt.pixelStorei(3317, i.unpackAlignment);
			const u = dt.getParameter(3314),
				d = dt.getParameter(32878),
				p = dt.getParameter(3316),
				m = dt.getParameter(3315),
				g = dt.getParameter(32877),
				v = n.isCompressedTexture ? n.mipmaps[0] : n.image;
			dt.pixelStorei(3314, v.width), dt.pixelStorei(32878, v.height), dt.pixelStorei(3316, t.min.x), dt.pixelStorei(3315, t.min.y), dt.pixelStorei(32877, t.min.z), n.isDataTexture || n.isDataTexture3D ? dt.texSubImage3D(h, r, e.x, e.y, e.z, s, a, o, l, c, v.data) : n.isCompressedTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."), dt.compressedTexSubImage3D(h, r, e.x, e.y, e.z, s, a, o, l, v.data)) : dt.texSubImage3D(h, r, e.x, e.y, e.z, s, a, o, l, c, v), dt.pixelStorei(3314, u), dt.pixelStorei(32878, d), dt.pixelStorei(3316, p), dt.pixelStorei(3315, m), dt.pixelStorei(32877, g), 0 === r && i.generateMipmaps && dt.generateMipmap(h), W.unbindTexture()
		}, this.initTexture = function (t) {
			X.setTexture2D(t, 0), W.unbindTexture()
		}, this.resetState = function () {
			v = 0, y = 0, _ = null, W.reset(), ut.reset()
		}, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
			detail: this
		}))
	}
	Wp.prototype.isWebGLRenderer = !0;
	(class extends Wp {}).prototype.isWebGL1Renderer = !0;
	class qp extends Nc {
		constructor() {
			super(), this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
				detail: this
			}))
		}
		copy(t, e) {
			return super.copy(t, e), null !== t.background && (this.background = t.background.clone()), null !== t.environment && (this.environment = t.environment.clone()), null !== t.fog && (this.fog = t.fog.clone()), null !== t.overrideMaterial && (this.overrideMaterial = t.overrideMaterial.clone()), this.autoUpdate = t.autoUpdate, this.matrixAutoUpdate = t.matrixAutoUpdate, this
		}
		toJSON(t) {
			const e = super.toJSON(t);
			return null !== this.fog && (e.object.fog = this.fog.toJSON()), e
		}
	}
	qp.prototype.isScene = !0;
	class jp {
		constructor(t, e) {
			this.array = t, this.stride = e, this.count = void 0 !== t ? t.length / e : 0, this.usage = ol, this.updateRange = {
				offset: 0,
				count: -1
			}, this.version = 0, this.uuid = ml()
		}
		onUploadCallback() {}
		set needsUpdate(t) {
			!0 === t && this.version++
		}
		setUsage(t) {
			return this.usage = t, this
		}
		copy(t) {
			return this.array = new t.array.constructor(t.array), this.count = t.count, this.stride = t.stride, this.usage = t.usage, this
		}
		copyAt(t, e, n) {
			t *= this.stride, n *= e.stride;
			for (let i = 0, r = this.stride; i < r; i++) this.array[t + i] = e.array[n + i];
			return this
		}
		set(t, e = 0) {
			return this.array.set(t, e), this
		}
		clone(t) {
			void 0 === t.arrayBuffers && (t.arrayBuffers = {}), void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = ml()), void 0 === t.arrayBuffers[this.array.buffer._uuid] && (t.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
			const e = new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),
				n = new this.constructor(e, this.stride);
			return n.setUsage(this.usage), n
		}
		onUpload(t) {
			return this.onUploadCallback = t, this
		}
		toJSON(t) {
			return void 0 === t.arrayBuffers && (t.arrayBuffers = {}), void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = ml()), void 0 === t.arrayBuffers[this.array.buffer._uuid] && (t.arrayBuffers[this.array.buffer._uuid] = Array.prototype.slice.call(new Uint32Array(this.array.buffer))), {
				uuid: this.uuid,
				buffer: this.array.buffer._uuid,
				type: this.array.constructor.name,
				stride: this.stride
			}
		}
	}
	jp.prototype.isInterleavedBuffer = !0;
	const Xp = new Il;
	class Yp {
		constructor(t, e, n, i = !1) {
			this.name = "", this.data = t, this.itemSize = e, this.offset = n, this.normalized = !0 === i
		}
		get count() {
			return this.data.count
		}
		get array() {
			return this.data.array
		}
		set needsUpdate(t) {
			this.data.needsUpdate = t
		}
		applyMatrix4(t) {
			for (let e = 0, n = this.data.count; e < n; e++) Xp.x = this.getX(e), Xp.y = this.getY(e), Xp.z = this.getZ(e), Xp.applyMatrix4(t), this.setXYZ(e, Xp.x, Xp.y, Xp.z);
			return this
		}
		applyNormalMatrix(t) {
			for (let e = 0, n = this.count; e < n; e++) Xp.x = this.getX(e), Xp.y = this.getY(e), Xp.z = this.getZ(e), Xp.applyNormalMatrix(t), this.setXYZ(e, Xp.x, Xp.y, Xp.z);
			return this
		}
		transformDirection(t) {
			for (let e = 0, n = this.count; e < n; e++) Xp.x = this.getX(e), Xp.y = this.getY(e), Xp.z = this.getZ(e), Xp.transformDirection(t), this.setXYZ(e, Xp.x, Xp.y, Xp.z);
			return this
		}
		setX(t, e) {
			return this.data.array[t * this.data.stride + this.offset] = e, this
		}
		setY(t, e) {
			return this.data.array[t * this.data.stride + this.offset + 1] = e, this
		}
		setZ(t, e) {
			return this.data.array[t * this.data.stride + this.offset + 2] = e, this
		}
		setW(t, e) {
			return this.data.array[t * this.data.stride + this.offset + 3] = e, this
		}
		getX(t) {
			return this.data.array[t * this.data.stride + this.offset]
		}
		getY(t) {
			return this.data.array[t * this.data.stride + this.offset + 1]
		}
		getZ(t) {
			return this.data.array[t * this.data.stride + this.offset + 2]
		}
		getW(t) {
			return this.data.array[t * this.data.stride + this.offset + 3]
		}
		setXY(t, e, n) {
			return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = n, this
		}
		setXYZ(t, e, n, i) {
			return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = i, this
		}
		setXYZW(t, e, n, i, r) {
			return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = i, this.data.array[t + 3] = r, this
		}
		clone(t) {
			if (void 0 === t) {
				console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.");
				const t = [];
				for (let e = 0; e < this.count; e++) {
					const n = e * this.data.stride + this.offset;
					for (let e = 0; e < this.itemSize; e++) t.push(this.data.array[n + e])
				}
				return new sh(new this.array.constructor(t), this.itemSize, this.normalized)
			}
			return void 0 === t.interleavedBuffers && (t.interleavedBuffers = {}), void 0 === t.interleavedBuffers[this.data.uuid] && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)), new Yp(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized)
		}
		toJSON(t) {
			if (void 0 === t) {
				console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.");
				const t = [];
				for (let e = 0; e < this.count; e++) {
					const n = e * this.data.stride + this.offset;
					for (let e = 0; e < this.itemSize; e++) t.push(this.data.array[n + e])
				}
				return {
					itemSize: this.itemSize,
					type: this.array.constructor.name,
					array: t,
					normalized: this.normalized
				}
			}
			return void 0 === t.interleavedBuffers && (t.interleavedBuffers = {}), void 0 === t.interleavedBuffers[this.data.uuid] && (t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t)), {
				isInterleavedBufferAttribute: !0,
				itemSize: this.itemSize,
				data: this.data.uuid,
				offset: this.offset,
				normalized: this.normalized
			}
		}
	}
	Yp.prototype.isInterleavedBufferAttribute = !0;
	class Jp extends Yc {
		constructor(t) {
			super(), this.type = "SpriteMaterial", this.color = new eh(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.rotation = t.rotation, this.sizeAttenuation = t.sizeAttenuation, this
		}
	}
	let Zp;
	Jp.prototype.isSpriteMaterial = !0;
	const Qp = new Il,
		Kp = new Il,
		$p = new Il,
		tm = new _l,
		em = new _l,
		nm = new hc,
		im = new Il,
		rm = new Il,
		sm = new Il,
		am = new _l,
		om = new _l,
		lm = new _l;

	function cm(t, e, n, i, r, s) {
		tm.subVectors(t, n).addScalar(.5).multiply(i), void 0 !== r ? (em.x = s * tm.x - r * tm.y, em.y = r * tm.x + s * tm.y) : em.copy(tm), t.copy(e), t.x += em.x, t.y += em.y, t.applyMatrix4(nm)
	}(class extends Nc {
		constructor(t) {
			if (super(), this.type = "Sprite", void 0 === Zp) {
				Zp = new gh;
				const t = new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1]),
					e = new jp(t, 5);
				Zp.setIndex([0, 1, 2, 0, 2, 3]), Zp.setAttribute("position", new Yp(e, 3, 0, !1)), Zp.setAttribute("uv", new Yp(e, 2, 3, !1))
			}
			this.geometry = Zp, this.material = void 0 !== t ? t : new Jp, this.center = new _l(.5, .5)
		}
		raycast(t, e) {
			null === t.camera && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), Kp.setFromMatrixScale(this.matrixWorld), nm.copy(t.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse, this.matrixWorld), $p.setFromMatrixPosition(this.modelViewMatrix), t.camera.isPerspectiveCamera && !1 === this.material.sizeAttenuation && Kp.multiplyScalar(-$p.z);
			const n = this.material.rotation;
			let i, r;
			0 !== n && (r = Math.cos(n), i = Math.sin(n));
			const s = this.center;
			cm(im.set(-.5, -.5, 0), $p, s, Kp, i, r), cm(rm.set(.5, -.5, 0), $p, s, Kp, i, r), cm(sm.set(.5, .5, 0), $p, s, Kp, i, r), am.set(0, 0), om.set(1, 0), lm.set(1, 1);
			let a = t.ray.intersectTriangle(im, rm, sm, !1, Qp);
			if (null === a && (cm(rm.set(-.5, .5, 0), $p, s, Kp, i, r), om.set(0, 1), a = t.ray.intersectTriangle(im, sm, rm, !1, Qp), null === a)) return;
			const o = t.ray.origin.distanceTo(Qp);
			o < t.near || o > t.far || e.push({
				distance: o,
				point: Qp.clone(),
				uv: jc.getUV(Qp, im, rm, sm, am, om, lm, new _l),
				face: null,
				object: this
			})
		}
		copy(t) {
			return super.copy(t), void 0 !== t.center && this.center.copy(t.center), this.material = t.material, this
		}
	}).prototype.isSprite = !0;
	const hm = new Il,
		um = new Cl,
		dm = new Cl,
		pm = new Il,
		mm = new hc;
	class fm extends Oh {
		constructor(t, e) {
			super(t, e), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new hc, this.bindMatrixInverse = new hc
		}
		copy(t) {
			return super.copy(t), this.bindMode = t.bindMode, this.bindMatrix.copy(t.bindMatrix), this.bindMatrixInverse.copy(t.bindMatrixInverse), this.skeleton = t.skeleton, this
		}
		bind(t, e) {
			this.skeleton = t, void 0 === e && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), e = this.matrixWorld), this.bindMatrix.copy(e), this.bindMatrixInverse.copy(e).invert()
		}
		pose() {
			this.skeleton.pose()
		}
		normalizeSkinWeights() {
			const t = new Cl,
				e = this.geometry.attributes.skinWeight;
			for (let n = 0, i = e.count; n < i; n++) {
				t.x = e.getX(n), t.y = e.getY(n), t.z = e.getZ(n), t.w = e.getW(n);
				const i = 1 / t.manhattanLength();
				i !== 1 / 0 ? t.multiplyScalar(i) : t.set(1, 0, 0, 0), e.setXYZW(n, t.x, t.y, t.z, t.w)
			}
		}
		updateMatrixWorld(t) {
			super.updateMatrixWorld(t), "attached" === this.bindMode ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : "detached" === this.bindMode ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode)
		}
		boneTransform(t, e) {
			const n = this.skeleton,
				i = this.geometry;
			um.fromBufferAttribute(i.attributes.skinIndex, t), dm.fromBufferAttribute(i.attributes.skinWeight, t), hm.copy(e).applyMatrix4(this.bindMatrix), e.set(0, 0, 0);
			for (let t = 0; t < 4; t++) {
				const i = dm.getComponent(t);
				if (0 !== i) {
					const r = um.getComponent(t);
					mm.multiplyMatrices(n.bones[r].matrixWorld, n.boneInverses[r]), e.addScaledVector(pm.copy(hm).applyMatrix4(mm), i)
				}
			}
			return e.applyMatrix4(this.bindMatrixInverse)
		}
	}
	fm.prototype.isSkinnedMesh = !0;
	(class extends Nc {
		constructor() {
			super(), this.type = "Bone"
		}
	}).prototype.isBone = !0;
	(class extends Al {
		constructor(t = null, e = 1, n = 1, i, r, s, a, o, l = 1003, c = 1003, h, u) {
			super(null, s, a, o, l, c, i, r, h, u), this.image = {
				data: t,
				width: e,
				height: n
			}, this.magFilter = l, this.minFilter = c, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.needsUpdate = !0
		}
	}).prototype.isDataTexture = !0;
	class gm extends sh {
		constructor(t, e, n, i = 1) {
			"number" == typeof n && (i = n, n = !1, console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")), super(t, e, n), this.meshPerAttribute = i
		}
		copy(t) {
			return super.copy(t), this.meshPerAttribute = t.meshPerAttribute, this
		}
		toJSON() {
			const t = super.toJSON();
			return t.meshPerAttribute = this.meshPerAttribute, t.isInstancedBufferAttribute = !0, t
		}
	}
	gm.prototype.isInstancedBufferAttribute = !0;
	const vm = new hc,
		ym = new hc,
		_m = [],
		xm = new Oh;
	(class extends Oh {
		constructor(t, e, n) {
			super(t, e), this.instanceMatrix = new gm(new Float32Array(16 * n), 16), this.instanceColor = null, this.count = n, this.frustumCulled = !1
		}
		copy(t) {
			return super.copy(t), this.instanceMatrix.copy(t.instanceMatrix), null !== t.instanceColor && (this.instanceColor = t.instanceColor.clone()), this.count = t.count, this
		}
		getColorAt(t, e) {
			e.fromArray(this.instanceColor.array, 3 * t)
		}
		getMatrixAt(t, e) {
			e.fromArray(this.instanceMatrix.array, 16 * t)
		}
		raycast(t, e) {
			const n = this.matrixWorld,
				i = this.count;
			if (xm.geometry = this.geometry, xm.material = this.material, void 0 !== xm.material)
				for (let r = 0; r < i; r++) {
					this.getMatrixAt(r, vm), ym.multiplyMatrices(n, vm), xm.matrixWorld = ym, xm.raycast(t, _m);
					for (let t = 0, n = _m.length; t < n; t++) {
						const n = _m[t];
						n.instanceId = r, n.object = this, e.push(n)
					}
					_m.length = 0
				}
		}
		setColorAt(t, e) {
			null === this.instanceColor && (this.instanceColor = new gm(new Float32Array(3 * this.instanceMatrix.count), 3)), e.toArray(this.instanceColor.array, 3 * t)
		}
		setMatrixAt(t, e) {
			e.toArray(this.instanceMatrix.array, 16 * t)
		}
		updateMorphTargets() {}
		dispose() {
			this.dispatchEvent({
				type: "dispose"
			})
		}
	}).prototype.isInstancedMesh = !0;
	class wm extends Yc {
		constructor(t) {
			super(), this.type = "LineBasicMaterial", this.color = new eh(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.color.copy(t.color), this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this
		}
	}
	wm.prototype.isLineBasicMaterial = !0;
	const bm = new Il,
		Mm = new Il,
		Sm = new hc,
		Tm = new cc,
		Em = new ec;
	class Am extends Nc {
		constructor(t = new gh, e = new wm) {
			super(), this.type = "Line", this.geometry = t, this.material = e, this.updateMorphTargets()
		}
		copy(t) {
			return super.copy(t), this.material = t.material, this.geometry = t.geometry, this
		}
		computeLineDistances() {
			const t = this.geometry;
			if (t.isBufferGeometry)
				if (null === t.index) {
					const e = t.attributes.position,
						n = [0];
					for (let t = 1, i = e.count; t < i; t++) bm.fromBufferAttribute(e, t - 1), Mm.fromBufferAttribute(e, t), n[t] = n[t - 1], n[t] += bm.distanceTo(Mm);
					t.setAttribute("lineDistance", new lh(n, 1))
				} else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
			else t.isGeometry && console.error("THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
			return this
		}
		raycast(t, e) {
			const n = this.geometry,
				i = this.matrixWorld,
				r = t.params.Line.threshold,
				s = n.drawRange;
			if (null === n.boundingSphere && n.computeBoundingSphere(), Em.copy(n.boundingSphere), Em.applyMatrix4(i), Em.radius += r, !1 === t.ray.intersectsSphere(Em)) return;
			Sm.copy(i).invert(), Tm.copy(t.ray).applyMatrix4(Sm);
			const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
				o = a * a,
				l = new Il,
				c = new Il,
				h = new Il,
				u = new Il,
				d = this.isLineSegments ? 2 : 1;
			if (n.isBufferGeometry) {
				const i = n.index,
					r = n.attributes.position;
				if (null !== i) {
					for (let n = Math.max(0, s.start), a = Math.min(i.count, s.start + s.count) - 1; n < a; n += d) {
						const s = i.getX(n),
							a = i.getX(n + 1);
						l.fromBufferAttribute(r, s), c.fromBufferAttribute(r, a);
						if (Tm.distanceSqToSegment(l, c, u, h) > o) continue;
						u.applyMatrix4(this.matrixWorld);
						const d = t.ray.origin.distanceTo(u);
						d < t.near || d > t.far || e.push({
							distance: d,
							point: h.clone().applyMatrix4(this.matrixWorld),
							index: n,
							face: null,
							faceIndex: null,
							object: this
						})
					}
				} else {
					for (let n = Math.max(0, s.start), i = Math.min(r.count, s.start + s.count) - 1; n < i; n += d) {
						l.fromBufferAttribute(r, n), c.fromBufferAttribute(r, n + 1);
						if (Tm.distanceSqToSegment(l, c, u, h) > o) continue;
						u.applyMatrix4(this.matrixWorld);
						const i = t.ray.origin.distanceTo(u);
						i < t.near || i > t.far || e.push({
							distance: i,
							point: h.clone().applyMatrix4(this.matrixWorld),
							index: n,
							face: null,
							faceIndex: null,
							object: this
						})
					}
				}
			} else n.isGeometry && console.error("THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
		}
		updateMorphTargets() {
			const t = this.geometry;
			if (t.isBufferGeometry) {
				const e = t.morphAttributes,
					n = Object.keys(e);
				if (n.length > 0) {
					const t = e[n[0]];
					if (void 0 !== t) {
						this.morphTargetInfluences = [], this.morphTargetDictionary = {};
						for (let e = 0, n = t.length; e < n; e++) {
							const n = t[e].name || String(e);
							this.morphTargetInfluences.push(0), this.morphTargetDictionary[n] = e
						}
					}
				}
			} else {
				const e = t.morphTargets;
				void 0 !== e && e.length > 0 && console.error("THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")
			}
		}
	}
	Am.prototype.isLine = !0;
	const Lm = new Il,
		Cm = new Il;
	class Rm extends Am {
		constructor(t, e) {
			super(t, e), this.type = "LineSegments"
		}
		computeLineDistances() {
			const t = this.geometry;
			if (t.isBufferGeometry)
				if (null === t.index) {
					const e = t.attributes.position,
						n = [];
					for (let t = 0, i = e.count; t < i; t += 2) Lm.fromBufferAttribute(e, t), Cm.fromBufferAttribute(e, t + 1), n[t] = 0 === t ? 0 : n[t - 1], n[t + 1] = n[t] + Lm.distanceTo(Cm);
					t.setAttribute("lineDistance", new lh(n, 1))
				} else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
			else t.isGeometry && console.error("THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
			return this
		}
	}
	Rm.prototype.isLineSegments = !0;
	(class extends Am {
		constructor(t, e) {
			super(t, e), this.type = "LineLoop"
		}
	}).prototype.isLineLoop = !0;
	class Pm extends Yc {
		constructor(t) {
			super(), this.type = "PointsMaterial", this.color = new eh(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this
		}
	}
	Pm.prototype.isPointsMaterial = !0;
	const Dm = new hc,
		Im = new cc,
		Om = new ec,
		Nm = new Il;

	function zm(t, e, n, i, r, s, a) {
		const o = Im.distanceSqToPoint(t);
		if (o < n) {
			const n = new Il;
			Im.closestPointToPoint(t, n), n.applyMatrix4(i);
			const l = r.ray.origin.distanceTo(n);
			if (l < r.near || l > r.far) return;
			s.push({
				distance: l,
				distanceToRay: Math.sqrt(o),
				point: n,
				index: e,
				face: null,
				object: a
			})
		}
	}(class extends Nc {
		constructor(t = new gh, e = new Pm) {
			super(), this.type = "Points", this.geometry = t, this.material = e, this.updateMorphTargets()
		}
		copy(t) {
			return super.copy(t), this.material = t.material, this.geometry = t.geometry, this
		}
		raycast(t, e) {
			const n = this.geometry,
				i = this.matrixWorld,
				r = t.params.Points.threshold,
				s = n.drawRange;
			if (null === n.boundingSphere && n.computeBoundingSphere(), Om.copy(n.boundingSphere), Om.applyMatrix4(i), Om.radius += r, !1 === t.ray.intersectsSphere(Om)) return;
			Dm.copy(i).invert(), Im.copy(t.ray).applyMatrix4(Dm);
			const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
				o = a * a;
			if (n.isBufferGeometry) {
				const r = n.index,
					a = n.attributes.position;
				if (null !== r) {
					for (let n = Math.max(0, s.start), l = Math.min(r.count, s.start + s.count); n < l; n++) {
						const s = r.getX(n);
						Nm.fromBufferAttribute(a, s), zm(Nm, s, o, i, t, e, this)
					}
				} else {
					for (let n = Math.max(0, s.start), r = Math.min(a.count, s.start + s.count); n < r; n++) Nm.fromBufferAttribute(a, n), zm(Nm, n, o, i, t, e, this)
				}
			} else console.error("THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")
		}
		updateMorphTargets() {
			const t = this.geometry;
			if (t.isBufferGeometry) {
				const e = t.morphAttributes,
					n = Object.keys(e);
				if (n.length > 0) {
					const t = e[n[0]];
					if (void 0 !== t) {
						this.morphTargetInfluences = [], this.morphTargetDictionary = {};
						for (let e = 0, n = t.length; e < n; e++) {
							const n = t[e].name || String(e);
							this.morphTargetInfluences.push(0), this.morphTargetDictionary[n] = e
						}
					}
				}
			} else {
				const e = t.morphTargets;
				void 0 !== e && e.length > 0 && console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")
			}
		}
	}).prototype.isPoints = !0;
	class Bm extends Al {
		constructor(t, e, n, i, r, s, a, o, l) {
			super(t, e, n, i, r, s, a, o, l), this.format = void 0 !== a ? a : qo, this.minFilter = void 0 !== s ? s : Bo, this.magFilter = void 0 !== r ? r : Bo, this.generateMipmaps = !1;
			const c = this;
			"requestVideoFrameCallback" in t && t.requestVideoFrameCallback((function e() {
				c.needsUpdate = !0, t.requestVideoFrameCallback(e)
			}))
		}
		clone() {
			return new this.constructor(this.image).copy(this)
		}
		update() {
			const t = this.image;
			!1 === "requestVideoFrameCallback" in t && t.readyState >= t.HAVE_CURRENT_DATA && (this.needsUpdate = !0)
		}
	}
	Bm.prototype.isVideoTexture = !0;
	(class extends Al {
		constructor(t, e, n, i, r, s, a, o, l, c, h, u) {
			super(null, s, a, o, l, c, i, r, h, u), this.image = {
				width: e,
				height: n
			}, this.mipmaps = t, this.flipY = !1, this.generateMipmaps = !1
		}
	}).prototype.isCompressedTexture = !0;
	(class extends Al {
		constructor(t, e, n, i, r, s, a, o, l) {
			super(t, e, n, i, r, s, a, o, l), this.needsUpdate = !0
		}
	}).prototype.isCanvasTexture = !0, new Il, new Il, new Il, new jc;
	class Fm {
		constructor() {
			this.type = "Curve", this.arcLengthDivisions = 200
		}
		getPoint() {
			return console.warn("THREE.Curve: .getPoint() not implemented."), null
		}
		getPointAt(t, e) {
			const n = this.getUtoTmapping(t);
			return this.getPoint(n, e)
		}
		getPoints(t = 5) {
			const e = [];
			for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
			return e
		}
		getSpacedPoints(t = 5) {
			const e = [];
			for (let n = 0; n <= t; n++) e.push(this.getPointAt(n / t));
			return e
		}
		getLength() {
			const t = this.getLengths();
			return t[t.length - 1]
		}
		getLengths(t = this.arcLengthDivisions) {
			if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate) return this.cacheArcLengths;
			this.needsUpdate = !1;
			const e = [];
			let n, i = this.getPoint(0),
				r = 0;
			e.push(0);
			for (let s = 1; s <= t; s++) n = this.getPoint(s / t), r += n.distanceTo(i), e.push(r), i = n;
			return this.cacheArcLengths = e, e
		}
		updateArcLengths() {
			this.needsUpdate = !0, this.getLengths()
		}
		getUtoTmapping(t, e) {
			const n = this.getLengths();
			let i = 0;
			const r = n.length;
			let s;
			s = e || t * n[r - 1];
			let a, o = 0,
				l = r - 1;
			for (; o <= l;)
				if (i = Math.floor(o + (l - o) / 2), a = n[i] - s, a < 0) o = i + 1;
				else {
					if (!(a > 0)) {
						l = i;
						break
					}
					l = i - 1
				} if (i = l, n[i] === s) return i / (r - 1);
			const c = n[i];
			return (i + (s - c) / (n[i + 1] - c)) / (r - 1)
		}
		getTangent(t, e) {
			const n = 1e-4;
			let i = t - n,
				r = t + n;
			i < 0 && (i = 0), r > 1 && (r = 1);
			const s = this.getPoint(i),
				a = this.getPoint(r),
				o = e || (s.isVector2 ? new _l : new Il);
			return o.copy(a).sub(s).normalize(), o
		}
		getTangentAt(t, e) {
			const n = this.getUtoTmapping(t);
			return this.getTangent(n, e)
		}
		computeFrenetFrames(t, e) {
			const n = new Il,
				i = [],
				r = [],
				s = [],
				a = new Il,
				o = new hc;
			for (let e = 0; e <= t; e++) {
				const n = e / t;
				i[e] = this.getTangentAt(n, new Il)
			}
			r[0] = new Il, s[0] = new Il;
			let l = Number.MAX_VALUE;
			const c = Math.abs(i[0].x),
				h = Math.abs(i[0].y),
				u = Math.abs(i[0].z);
			c <= l && (l = c, n.set(1, 0, 0)), h <= l && (l = h, n.set(0, 1, 0)), u <= l && n.set(0, 0, 1), a.crossVectors(i[0], n).normalize(), r[0].crossVectors(i[0], a), s[0].crossVectors(i[0], r[0]);
			for (let e = 1; e <= t; e++) {
				if (r[e] = r[e - 1].clone(), s[e] = s[e - 1].clone(), a.crossVectors(i[e - 1], i[e]), a.length() > Number.EPSILON) {
					a.normalize();
					const t = Math.acos(fl(i[e - 1].dot(i[e]), -1, 1));
					r[e].applyMatrix4(o.makeRotationAxis(a, t))
				}
				s[e].crossVectors(i[e], r[e])
			}
			if (!0 === e) {
				let e = Math.acos(fl(r[0].dot(r[t]), -1, 1));
				e /= t, i[0].dot(a.crossVectors(r[0], r[t])) > 0 && (e = -e);
				for (let n = 1; n <= t; n++) r[n].applyMatrix4(o.makeRotationAxis(i[n], e * n)), s[n].crossVectors(i[n], r[n])
			}
			return {
				tangents: i,
				normals: r,
				binormals: s
			}
		}
		clone() {
			return (new this.constructor).copy(this)
		}
		copy(t) {
			return this.arcLengthDivisions = t.arcLengthDivisions, this
		}
		toJSON() {
			const t = {
				metadata: {
					version: 4.5,
					type: "Curve",
					generator: "Curve.toJSON"
				}
			};
			return t.arcLengthDivisions = this.arcLengthDivisions, t.type = this.type, t
		}
		fromJSON(t) {
			return this.arcLengthDivisions = t.arcLengthDivisions, this
		}
	}
	class km extends Fm {
		constructor(t = 0, e = 0, n = 1, i = 1, r = 0, s = 2 * Math.PI, a = !1, o = 0) {
			super(), this.type = "EllipseCurve", this.aX = t, this.aY = e, this.xRadius = n, this.yRadius = i, this.aStartAngle = r, this.aEndAngle = s, this.aClockwise = a, this.aRotation = o
		}
		getPoint(t, e) {
			const n = e || new _l,
				i = 2 * Math.PI;
			let r = this.aEndAngle - this.aStartAngle;
			const s = Math.abs(r) < Number.EPSILON;
			for (; r < 0;) r += i;
			for (; r > i;) r -= i;
			r < Number.EPSILON && (r = s ? 0 : i), !0 !== this.aClockwise || s || (r === i ? r = -i : r -= i);
			const a = this.aStartAngle + t * r;
			let o = this.aX + this.xRadius * Math.cos(a),
				l = this.aY + this.yRadius * Math.sin(a);
			if (0 !== this.aRotation) {
				const t = Math.cos(this.aRotation),
					e = Math.sin(this.aRotation),
					n = o - this.aX,
					i = l - this.aY;
				o = n * t - i * e + this.aX, l = n * e + i * t + this.aY
			}
			return n.set(o, l)
		}
		copy(t) {
			return super.copy(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this
		}
		toJSON() {
			const t = super.toJSON();
			return t.aX = this.aX, t.aY = this.aY, t.xRadius = this.xRadius, t.yRadius = this.yRadius, t.aStartAngle = this.aStartAngle, t.aEndAngle = this.aEndAngle, t.aClockwise = this.aClockwise, t.aRotation = this.aRotation, t
		}
		fromJSON(t) {
			return super.fromJSON(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this
		}
	}
	km.prototype.isEllipseCurve = !0;
	class Um extends km {
		constructor(t, e, n, i, r, s) {
			super(t, e, n, n, i, r, s), this.type = "ArcCurve"
		}
	}

	function Hm() {
		let t = 0,
			e = 0,
			n = 0,
			i = 0;

		function r(r, s, a, o) {
			t = r, e = a, n = -3 * r + 3 * s - 2 * a - o, i = 2 * r - 2 * s + a + o
		}
		return {
			initCatmullRom: function (t, e, n, i, s) {
				r(e, n, s * (n - t), s * (i - e))
			},
			initNonuniformCatmullRom: function (t, e, n, i, s, a, o) {
				let l = (e - t) / s - (n - t) / (s + a) + (n - e) / a,
					c = (n - e) / a - (i - e) / (a + o) + (i - n) / o;
				l *= a, c *= a, r(e, n, l, c)
			},
			calc: function (r) {
				const s = r * r;
				return t + e * r + n * s + i * (s * r)
			}
		}
	}
	Um.prototype.isArcCurve = !0;
	const Gm = new Il,
		Vm = new Hm,
		Wm = new Hm,
		qm = new Hm;
	class jm extends Fm {
		constructor(t = [], e = !1, n = "centripetal", i = .5) {
			super(), this.type = "CatmullRomCurve3", this.points = t, this.closed = e, this.curveType = n, this.tension = i
		}
		getPoint(t, e = new Il) {
			const n = e,
				i = this.points,
				r = i.length,
				s = (r - (this.closed ? 0 : 1)) * t;
			let a, o, l = Math.floor(s),
				c = s - l;
			this.closed ? l += l > 0 ? 0 : (Math.floor(Math.abs(l) / r) + 1) * r : 0 === c && l === r - 1 && (l = r - 2, c = 1), this.closed || l > 0 ? a = i[(l - 1) % r] : (Gm.subVectors(i[0], i[1]).add(i[0]), a = Gm);
			const h = i[l % r],
				u = i[(l + 1) % r];
			if (this.closed || l + 2 < r ? o = i[(l + 2) % r] : (Gm.subVectors(i[r - 1], i[r - 2]).add(i[r - 1]), o = Gm), "centripetal" === this.curveType || "chordal" === this.curveType) {
				const t = "chordal" === this.curveType ? .5 : .25;
				let e = Math.pow(a.distanceToSquared(h), t),
					n = Math.pow(h.distanceToSquared(u), t),
					i = Math.pow(u.distanceToSquared(o), t);
				n < 1e-4 && (n = 1), e < 1e-4 && (e = n), i < 1e-4 && (i = n), Vm.initNonuniformCatmullRom(a.x, h.x, u.x, o.x, e, n, i), Wm.initNonuniformCatmullRom(a.y, h.y, u.y, o.y, e, n, i), qm.initNonuniformCatmullRom(a.z, h.z, u.z, o.z, e, n, i)
			} else "catmullrom" === this.curveType && (Vm.initCatmullRom(a.x, h.x, u.x, o.x, this.tension), Wm.initCatmullRom(a.y, h.y, u.y, o.y, this.tension), qm.initCatmullRom(a.z, h.z, u.z, o.z, this.tension));
			return n.set(Vm.calc(c), Wm.calc(c), qm.calc(c)), n
		}
		copy(t) {
			super.copy(t), this.points = [];
			for (let e = 0, n = t.points.length; e < n; e++) {
				const n = t.points[e];
				this.points.push(n.clone())
			}
			return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this
		}
		toJSON() {
			const t = super.toJSON();
			t.points = [];
			for (let e = 0, n = this.points.length; e < n; e++) {
				const n = this.points[e];
				t.points.push(n.toArray())
			}
			return t.closed = this.closed, t.curveType = this.curveType, t.tension = this.tension, t
		}
		fromJSON(t) {
			super.fromJSON(t), this.points = [];
			for (let e = 0, n = t.points.length; e < n; e++) {
				const n = t.points[e];
				this.points.push((new Il).fromArray(n))
			}
			return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this
		}
	}

	function Xm(t, e, n, i, r) {
		const s = .5 * (i - e),
			a = .5 * (r - n),
			o = t * t;
		return (2 * n - 2 * i + s + a) * (t * o) + (-3 * n + 3 * i - 2 * s - a) * o + s * t + n
	}

	function Ym(t, e, n, i) {
		return function (t, e) {
			const n = 1 - t;
			return n * n * e
		}(t, e) + function (t, e) {
			return 2 * (1 - t) * t * e
		}(t, n) + function (t, e) {
			return t * t * e
		}(t, i)
	}

	function Jm(t, e, n, i, r) {
		return function (t, e) {
			const n = 1 - t;
			return n * n * n * e
		}(t, e) + function (t, e) {
			const n = 1 - t;
			return 3 * n * n * t * e
		}(t, n) + function (t, e) {
			return 3 * (1 - t) * t * t * e
		}(t, i) + function (t, e) {
			return t * t * t * e
		}(t, r)
	}
	jm.prototype.isCatmullRomCurve3 = !0;
	class Zm extends Fm {
		constructor(t = new _l, e = new _l, n = new _l, i = new _l) {
			super(), this.type = "CubicBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = i
		}
		getPoint(t, e = new _l) {
			const n = e,
				i = this.v0,
				r = this.v1,
				s = this.v2,
				a = this.v3;
			return n.set(Jm(t, i.x, r.x, s.x, a.x), Jm(t, i.y, r.y, s.y, a.y)), n
		}
		copy(t) {
			return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this
		}
		toJSON() {
			const t = super.toJSON();
			return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t
		}
		fromJSON(t) {
			return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this
		}
	}
	Zm.prototype.isCubicBezierCurve = !0;
	class Qm extends Fm {
		constructor(t = new Il, e = new Il, n = new Il, i = new Il) {
			super(), this.type = "CubicBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = i
		}
		getPoint(t, e = new Il) {
			const n = e,
				i = this.v0,
				r = this.v1,
				s = this.v2,
				a = this.v3;
			return n.set(Jm(t, i.x, r.x, s.x, a.x), Jm(t, i.y, r.y, s.y, a.y), Jm(t, i.z, r.z, s.z, a.z)), n
		}
		copy(t) {
			return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this
		}
		toJSON() {
			const t = super.toJSON();
			return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t
		}
		fromJSON(t) {
			return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this
		}
	}
	Qm.prototype.isCubicBezierCurve3 = !0;
	class Km extends Fm {
		constructor(t = new _l, e = new _l) {
			super(), this.type = "LineCurve", this.v1 = t, this.v2 = e
		}
		getPoint(t, e = new _l) {
			const n = e;
			return 1 === t ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n
		}
		getPointAt(t, e) {
			return this.getPoint(t, e)
		}
		getTangent(t, e) {
			const n = e || new _l;
			return n.copy(this.v2).sub(this.v1).normalize(), n
		}
		copy(t) {
			return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this
		}
		toJSON() {
			const t = super.toJSON();
			return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t
		}
		fromJSON(t) {
			return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this
		}
	}
	Km.prototype.isLineCurve = !0;
	class $m extends Fm {
		constructor(t = new _l, e = new _l, n = new _l) {
			super(), this.type = "QuadraticBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n
		}
		getPoint(t, e = new _l) {
			const n = e,
				i = this.v0,
				r = this.v1,
				s = this.v2;
			return n.set(Ym(t, i.x, r.x, s.x), Ym(t, i.y, r.y, s.y)), n
		}
		copy(t) {
			return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this
		}
		toJSON() {
			const t = super.toJSON();
			return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t
		}
		fromJSON(t) {
			return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this
		}
	}
	$m.prototype.isQuadraticBezierCurve = !0;
	class tf extends Fm {
		constructor(t = new Il, e = new Il, n = new Il) {
			super(), this.type = "QuadraticBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n
		}
		getPoint(t, e = new Il) {
			const n = e,
				i = this.v0,
				r = this.v1,
				s = this.v2;
			return n.set(Ym(t, i.x, r.x, s.x), Ym(t, i.y, r.y, s.y), Ym(t, i.z, r.z, s.z)), n
		}
		copy(t) {
			return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this
		}
		toJSON() {
			const t = super.toJSON();
			return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t
		}
		fromJSON(t) {
			return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this
		}
	}
	tf.prototype.isQuadraticBezierCurve3 = !0;
	class ef extends Fm {
		constructor(t = []) {
			super(), this.type = "SplineCurve", this.points = t
		}
		getPoint(t, e = new _l) {
			const n = e,
				i = this.points,
				r = (i.length - 1) * t,
				s = Math.floor(r),
				a = r - s,
				o = i[0 === s ? s : s - 1],
				l = i[s],
				c = i[s > i.length - 2 ? i.length - 1 : s + 1],
				h = i[s > i.length - 3 ? i.length - 1 : s + 2];
			return n.set(Xm(a, o.x, l.x, c.x, h.x), Xm(a, o.y, l.y, c.y, h.y)), n
		}
		copy(t) {
			super.copy(t), this.points = [];
			for (let e = 0, n = t.points.length; e < n; e++) {
				const n = t.points[e];
				this.points.push(n.clone())
			}
			return this
		}
		toJSON() {
			const t = super.toJSON();
			t.points = [];
			for (let e = 0, n = this.points.length; e < n; e++) {
				const n = this.points[e];
				t.points.push(n.toArray())
			}
			return t
		}
		fromJSON(t) {
			super.fromJSON(t), this.points = [];
			for (let e = 0, n = t.points.length; e < n; e++) {
				const n = t.points[e];
				this.points.push((new _l).fromArray(n))
			}
			return this
		}
	}
	ef.prototype.isSplineCurve = !0;
	var nf = Object.freeze({
		__proto__: null,
		ArcCurve: Um,
		CatmullRomCurve3: jm,
		CubicBezierCurve: Zm,
		CubicBezierCurve3: Qm,
		EllipseCurve: km,
		LineCurve: Km,
		LineCurve3: class extends Fm {
			constructor(t = new Il, e = new Il) {
				super(), this.type = "LineCurve3", this.isLineCurve3 = !0, this.v1 = t, this.v2 = e
			}
			getPoint(t, e = new Il) {
				const n = e;
				return 1 === t ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n
			}
			getPointAt(t, e) {
				return this.getPoint(t, e)
			}
			copy(t) {
				return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this
			}
			toJSON() {
				const t = super.toJSON();
				return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t
			}
			fromJSON(t) {
				return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this
			}
		},
		QuadraticBezierCurve: $m,
		QuadraticBezierCurve3: tf,
		SplineCurve: ef
	});
	class rf extends Fm {
		constructor() {
			super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1
		}
		add(t) {
			this.curves.push(t)
		}
		closePath() {
			const t = this.curves[0].getPoint(0),
				e = this.curves[this.curves.length - 1].getPoint(1);
			t.equals(e) || this.curves.push(new Km(e, t))
		}
		getPoint(t, e) {
			const n = t * this.getLength(),
				i = this.getCurveLengths();
			let r = 0;
			for (; r < i.length;) {
				if (i[r] >= n) {
					const t = i[r] - n,
						s = this.curves[r],
						a = s.getLength(),
						o = 0 === a ? 0 : 1 - t / a;
					return s.getPointAt(o, e)
				}
				r++
			}
			return null
		}
		getLength() {
			const t = this.getCurveLengths();
			return t[t.length - 1]
		}
		updateArcLengths() {
			this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths()
		}
		getCurveLengths() {
			if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
			const t = [];
			let e = 0;
			for (let n = 0, i = this.curves.length; n < i; n++) e += this.curves[n].getLength(), t.push(e);
			return this.cacheLengths = t, t
		}
		getSpacedPoints(t = 40) {
			const e = [];
			for (let n = 0; n <= t; n++) e.push(this.getPoint(n / t));
			return this.autoClose && e.push(e[0]), e
		}
		getPoints(t = 12) {
			const e = [];
			let n;
			for (let i = 0, r = this.curves; i < r.length; i++) {
				const s = r[i],
					a = s && s.isEllipseCurve ? 2 * t : s && (s.isLineCurve || s.isLineCurve3) ? 1 : s && s.isSplineCurve ? t * s.points.length : t,
					o = s.getPoints(a);
				for (let t = 0; t < o.length; t++) {
					const i = o[t];
					n && n.equals(i) || (e.push(i), n = i)
				}
			}
			return this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0]) && e.push(e[0]), e
		}
		copy(t) {
			super.copy(t), this.curves = [];
			for (let e = 0, n = t.curves.length; e < n; e++) {
				const n = t.curves[e];
				this.curves.push(n.clone())
			}
			return this.autoClose = t.autoClose, this
		}
		toJSON() {
			const t = super.toJSON();
			t.autoClose = this.autoClose, t.curves = [];
			for (let e = 0, n = this.curves.length; e < n; e++) {
				const n = this.curves[e];
				t.curves.push(n.toJSON())
			}
			return t
		}
		fromJSON(t) {
			super.fromJSON(t), this.autoClose = t.autoClose, this.curves = [];
			for (let e = 0, n = t.curves.length; e < n; e++) {
				const n = t.curves[e];
				this.curves.push((new nf[n.type]).fromJSON(n))
			}
			return this
		}
	}
	class sf extends rf {
		constructor(t) {
			super(), this.type = "Path", this.currentPoint = new _l, t && this.setFromPoints(t)
		}
		setFromPoints(t) {
			this.moveTo(t[0].x, t[0].y);
			for (let e = 1, n = t.length; e < n; e++) this.lineTo(t[e].x, t[e].y);
			return this
		}
		moveTo(t, e) {
			return this.currentPoint.set(t, e), this
		}
		lineTo(t, e) {
			const n = new Km(this.currentPoint.clone(), new _l(t, e));
			return this.curves.push(n), this.currentPoint.set(t, e), this
		}
		quadraticCurveTo(t, e, n, i) {
			const r = new $m(this.currentPoint.clone(), new _l(t, e), new _l(n, i));
			return this.curves.push(r), this.currentPoint.set(n, i), this
		}
		bezierCurveTo(t, e, n, i, r, s) {
			const a = new Zm(this.currentPoint.clone(), new _l(t, e), new _l(n, i), new _l(r, s));
			return this.curves.push(a), this.currentPoint.set(r, s), this
		}
		splineThru(t) {
			const e = [this.currentPoint.clone()].concat(t),
				n = new ef(e);
			return this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this
		}
		arc(t, e, n, i, r, s) {
			const a = this.currentPoint.x,
				o = this.currentPoint.y;
			return this.absarc(t + a, e + o, n, i, r, s), this
		}
		absarc(t, e, n, i, r, s) {
			return this.absellipse(t, e, n, n, i, r, s), this
		}
		ellipse(t, e, n, i, r, s, a, o) {
			const l = this.currentPoint.x,
				c = this.currentPoint.y;
			return this.absellipse(t + l, e + c, n, i, r, s, a, o), this
		}
		absellipse(t, e, n, i, r, s, a, o) {
			const l = new km(t, e, n, i, r, s, a, o);
			if (this.curves.length > 0) {
				const t = l.getPoint(0);
				t.equals(this.currentPoint) || this.lineTo(t.x, t.y)
			}
			this.curves.push(l);
			const c = l.getPoint(1);
			return this.currentPoint.copy(c), this
		}
		copy(t) {
			return super.copy(t), this.currentPoint.copy(t.currentPoint), this
		}
		toJSON() {
			const t = super.toJSON();
			return t.currentPoint = this.currentPoint.toArray(), t
		}
		fromJSON(t) {
			return super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this
		}
	}
	class af extends sf {
		constructor(t) {
			super(t), this.uuid = ml(), this.type = "Shape", this.holes = []
		}
		getPointsHoles(t) {
			const e = [];
			for (let n = 0, i = this.holes.length; n < i; n++) e[n] = this.holes[n].getPoints(t);
			return e
		}
		extractPoints(t) {
			return {
				shape: this.getPoints(t),
				holes: this.getPointsHoles(t)
			}
		}
		copy(t) {
			super.copy(t), this.holes = [];
			for (let e = 0, n = t.holes.length; e < n; e++) {
				const n = t.holes[e];
				this.holes.push(n.clone())
			}
			return this
		}
		toJSON() {
			const t = super.toJSON();
			t.uuid = this.uuid, t.holes = [];
			for (let e = 0, n = this.holes.length; e < n; e++) {
				const n = this.holes[e];
				t.holes.push(n.toJSON())
			}
			return t
		}
		fromJSON(t) {
			super.fromJSON(t), this.uuid = t.uuid, this.holes = [];
			for (let e = 0, n = t.holes.length; e < n; e++) {
				const n = t.holes[e];
				this.holes.push((new sf).fromJSON(n))
			}
			return this
		}
	}
	const of = function (t, e, n = 2) {
		const i = e && e.length,
			r = i ? e[0] * n : t.length;
		let s = lf(t, 0, r, n, !0);
		const a = [];
		if (!s || s.next === s.prev) return a;
		let o, l, c, h, u, d, p;
		if (i && (s = function (t, e, n, i) {
				const r = [];
				let s, a, o, l, c;
				for (s = 0, a = e.length; s < a; s++) o = e[s] * i, l = s < a - 1 ? e[s + 1] * i : t.length, c = lf(t, o, l, i, !1), c === c.next && (c.steiner = !0), r.push(_f(c));
				for (r.sort(ff), s = 0; s < r.length; s++) gf(r[s], n), n = cf(n, n.next);
				return n
			}(t, e, s, n)), t.length > 80 * n) {
			o = c = t[0], l = h = t[1];
			for (let e = n; e < r; e += n) u = t[e], d = t[e + 1], u < o && (o = u), d < l && (l = d), u > c && (c = u), d > h && (h = d);
			p = Math.max(c - o, h - l), p = 0 !== p ? 1 / p : 0
		}
		return hf(s, a, n, o, l, p), a
	};

	function lf(t, e, n, i, r) {
		let s, a;
		if (r === function (t, e, n, i) {
				let r = 0;
				for (let s = e, a = n - i; s < n; s += i) r += (t[a] - t[s]) * (t[s + 1] + t[a + 1]), a = s;
				return r
			}(t, e, n, i) > 0)
			for (s = e; s < n; s += i) a = Cf(s, t[s], t[s + 1], a);
		else
			for (s = n - i; s >= e; s -= i) a = Cf(s, t[s], t[s + 1], a);
		return a && Mf(a, a.next) && (Rf(a), a = a.next), a
	}

	function cf(t, e) {
		if (!t) return t;
		e || (e = t);
		let n, i = t;
		do {
			if (n = !1, i.steiner || !Mf(i, i.next) && 0 !== bf(i.prev, i, i.next)) i = i.next;
			else {
				if (Rf(i), i = e = i.prev, i === i.next) break;
				n = !0
			}
		} while (n || i !== e);
		return e
	}

	function hf(t, e, n, i, r, s, a) {
		if (!t) return;
		!a && s && function (t, e, n, i) {
			let r = t;
			do {
				null === r.z && (r.z = yf(r.x, r.y, e, n, i)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next
			} while (r !== t);
			r.prevZ.nextZ = null, r.prevZ = null,
				function (t) {
					let e, n, i, r, s, a, o, l, c = 1;
					do {
						for (n = t, t = null, s = null, a = 0; n;) {
							for (a++, i = n, o = 0, e = 0; e < c && (o++, i = i.nextZ, i); e++);
							for (l = c; o > 0 || l > 0 && i;) 0 !== o && (0 === l || !i || n.z <= i.z) ? (r = n, n = n.nextZ, o--) : (r = i, i = i.nextZ, l--), s ? s.nextZ = r : t = r, r.prevZ = s, s = r;
							n = i
						}
						s.nextZ = null, c *= 2
					} while (a > 1)
				}(r)
		}(t, i, r, s);
		let o, l, c = t;
		for (; t.prev !== t.next;)
			if (o = t.prev, l = t.next, s ? df(t, i, r, s) : uf(t)) e.push(o.i / n), e.push(t.i / n), e.push(l.i / n), Rf(t), t = l.next, c = l.next;
			else if ((t = l) === c) {
			a ? 1 === a ? hf(t = pf(cf(t), e, n), e, n, i, r, s, 2) : 2 === a && mf(t, e, n, i, r, s) : hf(cf(t), e, n, i, r, s, 1);
			break
		}
	}

	function uf(t) {
		const e = t.prev,
			n = t,
			i = t.next;
		if (bf(e, n, i) >= 0) return !1;
		let r = t.next.next;
		for (; r !== t.prev;) {
			if (xf(e.x, e.y, n.x, n.y, i.x, i.y, r.x, r.y) && bf(r.prev, r, r.next) >= 0) return !1;
			r = r.next
		}
		return !0
	}

	function df(t, e, n, i) {
		const r = t.prev,
			s = t,
			a = t.next;
		if (bf(r, s, a) >= 0) return !1;
		const o = r.x < s.x ? r.x < a.x ? r.x : a.x : s.x < a.x ? s.x : a.x,
			l = r.y < s.y ? r.y < a.y ? r.y : a.y : s.y < a.y ? s.y : a.y,
			c = r.x > s.x ? r.x > a.x ? r.x : a.x : s.x > a.x ? s.x : a.x,
			h = r.y > s.y ? r.y > a.y ? r.y : a.y : s.y > a.y ? s.y : a.y,
			u = yf(o, l, e, n, i),
			d = yf(c, h, e, n, i);
		let p = t.prevZ,
			m = t.nextZ;
		for (; p && p.z >= u && m && m.z <= d;) {
			if (p !== t.prev && p !== t.next && xf(r.x, r.y, s.x, s.y, a.x, a.y, p.x, p.y) && bf(p.prev, p, p.next) >= 0) return !1;
			if (p = p.prevZ, m !== t.prev && m !== t.next && xf(r.x, r.y, s.x, s.y, a.x, a.y, m.x, m.y) && bf(m.prev, m, m.next) >= 0) return !1;
			m = m.nextZ
		}
		for (; p && p.z >= u;) {
			if (p !== t.prev && p !== t.next && xf(r.x, r.y, s.x, s.y, a.x, a.y, p.x, p.y) && bf(p.prev, p, p.next) >= 0) return !1;
			p = p.prevZ
		}
		for (; m && m.z <= d;) {
			if (m !== t.prev && m !== t.next && xf(r.x, r.y, s.x, s.y, a.x, a.y, m.x, m.y) && bf(m.prev, m, m.next) >= 0) return !1;
			m = m.nextZ
		}
		return !0
	}

	function pf(t, e, n) {
		let i = t;
		do {
			const r = i.prev,
				s = i.next.next;
			!Mf(r, s) && Sf(r, i, i.next, s) && Af(r, s) && Af(s, r) && (e.push(r.i / n), e.push(i.i / n), e.push(s.i / n), Rf(i), Rf(i.next), i = t = s), i = i.next
		} while (i !== t);
		return cf(i)
	}

	function mf(t, e, n, i, r, s) {
		let a = t;
		do {
			let t = a.next.next;
			for (; t !== a.prev;) {
				if (a.i !== t.i && wf(a, t)) {
					let o = Lf(a, t);
					return a = cf(a, a.next), o = cf(o, o.next), hf(a, e, n, i, r, s), void hf(o, e, n, i, r, s)
				}
				t = t.next
			}
			a = a.next
		} while (a !== t)
	}

	function ff(t, e) {
		return t.x - e.x
	}

	function gf(t, e) {
		if (e = function (t, e) {
				let n = e;
				const i = t.x,
					r = t.y;
				let s, a = -1 / 0;
				do {
					if (r <= n.y && r >= n.next.y && n.next.y !== n.y) {
						const t = n.x + (r - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
						if (t <= i && t > a) {
							if (a = t, t === i) {
								if (r === n.y) return n;
								if (r === n.next.y) return n.next
							}
							s = n.x < n.next.x ? n : n.next
						}
					}
					n = n.next
				} while (n !== e);
				if (!s) return null;
				if (i === a) return s;
				const o = s,
					l = s.x,
					c = s.y;
				let h, u = 1 / 0;
				n = s;
				do {
					i >= n.x && n.x >= l && i !== n.x && xf(r < c ? i : a, r, l, c, r < c ? a : i, r, n.x, n.y) && (h = Math.abs(r - n.y) / (i - n.x), Af(n, t) && (h < u || h === u && (n.x > s.x || n.x === s.x && vf(s, n))) && (s = n, u = h)), n = n.next
				} while (n !== o);
				return s
			}(t, e), e) {
			const n = Lf(e, t);
			cf(e, e.next), cf(n, n.next)
		}
	}

	function vf(t, e) {
		return bf(t.prev, t, e.prev) < 0 && bf(e.next, t, t.next) < 0
	}

	function yf(t, e, n, i, r) {
		return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - n) * r) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - i) * r) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
	}

	function _f(t) {
		let e = t,
			n = t;
		do {
			(e.x < n.x || e.x === n.x && e.y < n.y) && (n = e), e = e.next
		} while (e !== t);
		return n
	}

	function xf(t, e, n, i, r, s, a, o) {
		return (r - a) * (e - o) - (t - a) * (s - o) >= 0 && (t - a) * (i - o) - (n - a) * (e - o) >= 0 && (n - a) * (s - o) - (r - a) * (i - o) >= 0
	}

	function wf(t, e) {
		return t.next.i !== e.i && t.prev.i !== e.i && ! function (t, e) {
			let n = t;
			do {
				if (n.i !== t.i && n.next.i !== t.i && n.i !== e.i && n.next.i !== e.i && Sf(n, n.next, t, e)) return !0;
				n = n.next
			} while (n !== t);
			return !1
		}(t, e) && (Af(t, e) && Af(e, t) && function (t, e) {
			let n = t,
				i = !1;
			const r = (t.x + e.x) / 2,
				s = (t.y + e.y) / 2;
			do {
				n.y > s != n.next.y > s && n.next.y !== n.y && r < (n.next.x - n.x) * (s - n.y) / (n.next.y - n.y) + n.x && (i = !i), n = n.next
			} while (n !== t);
			return i
		}(t, e) && (bf(t.prev, t, e.prev) || bf(t, e.prev, e)) || Mf(t, e) && bf(t.prev, t, t.next) > 0 && bf(e.prev, e, e.next) > 0)
	}

	function bf(t, e, n) {
		return (e.y - t.y) * (n.x - e.x) - (e.x - t.x) * (n.y - e.y)
	}

	function Mf(t, e) {
		return t.x === e.x && t.y === e.y
	}

	function Sf(t, e, n, i) {
		const r = Ef(bf(t, e, n)),
			s = Ef(bf(t, e, i)),
			a = Ef(bf(n, i, t)),
			o = Ef(bf(n, i, e));
		return r !== s && a !== o || (!(0 !== r || !Tf(t, n, e)) || (!(0 !== s || !Tf(t, i, e)) || (!(0 !== a || !Tf(n, t, i)) || !(0 !== o || !Tf(n, e, i)))))
	}

	function Tf(t, e, n) {
		return e.x <= Math.max(t.x, n.x) && e.x >= Math.min(t.x, n.x) && e.y <= Math.max(t.y, n.y) && e.y >= Math.min(t.y, n.y)
	}

	function Ef(t) {
		return t > 0 ? 1 : t < 0 ? -1 : 0
	}

	function Af(t, e) {
		return bf(t.prev, t, t.next) < 0 ? bf(t, e, t.next) >= 0 && bf(t, t.prev, e) >= 0 : bf(t, e, t.prev) < 0 || bf(t, t.next, e) < 0
	}

	function Lf(t, e) {
		const n = new Pf(t.i, t.x, t.y),
			i = new Pf(e.i, e.x, e.y),
			r = t.next,
			s = e.prev;
		return t.next = e, e.prev = t, n.next = r, r.prev = n, i.next = n, n.prev = i, s.next = i, i.prev = s, i
	}

	function Cf(t, e, n, i) {
		const r = new Pf(t, e, n);
		return i ? (r.next = i.next, r.prev = i, i.next.prev = r, i.next = r) : (r.prev = r, r.next = r), r
	}

	function Rf(t) {
		t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ)
	}

	function Pf(t, e, n) {
		this.i = t, this.x = e, this.y = n, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
	}
	class Df {
		static area(t) {
			const e = t.length;
			let n = 0;
			for (let i = e - 1, r = 0; r < e; i = r++) n += t[i].x * t[r].y - t[r].x * t[i].y;
			return .5 * n
		}
		static isClockWise(t) {
			return Df.area(t) < 0
		}
		static triangulateShape(t, e) {
			const n = [],
				i = [],
				r = [];
			If(t), Of(n, t);
			let s = t.length;
			e.forEach(If);
			for (let t = 0; t < e.length; t++) i.push(s), s += e[t].length, Of(n, e[t]);
			const a = of (n, i);
			for (let t = 0; t < a.length; t += 3) r.push(a.slice(t, t + 3));
			return r
		}
	}

	function If(t) {
		const e = t.length;
		e > 2 && t[e - 1].equals(t[0]) && t.pop()
	}

	function Of(t, e) {
		for (let n = 0; n < e.length; n++) t.push(e[n].x), t.push(e[n].y)
	}
	class Nf extends gh {
		constructor(t = new af([new _l(.5, .5), new _l(-.5, .5), new _l(-.5, -.5), new _l(.5, -.5)]), e = {}) {
			super(), this.type = "ExtrudeGeometry", this.parameters = {
				shapes: t,
				options: e
			}, t = Array.isArray(t) ? t : [t];
			const n = this,
				i = [],
				r = [];
			for (let e = 0, n = t.length; e < n; e++) {
				s(t[e])
			}

			function s(t) {
				const s = [],
					a = void 0 !== e.curveSegments ? e.curveSegments : 12,
					o = void 0 !== e.steps ? e.steps : 1;
				let l = void 0 !== e.depth ? e.depth : 1,
					c = void 0 === e.bevelEnabled || e.bevelEnabled,
					h = void 0 !== e.bevelThickness ? e.bevelThickness : .2,
					u = void 0 !== e.bevelSize ? e.bevelSize : h - .1,
					d = void 0 !== e.bevelOffset ? e.bevelOffset : 0,
					p = void 0 !== e.bevelSegments ? e.bevelSegments : 3;
				const m = e.extrudePath,
					f = void 0 !== e.UVGenerator ? e.UVGenerator : zf;
				void 0 !== e.amount && (console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."), l = e.amount);
				let g, v, y, _, x, w = !1;
				m && (g = m.getSpacedPoints(o), w = !0, c = !1, v = m.computeFrenetFrames(o, !1), y = new Il, _ = new Il, x = new Il), c || (p = 0, h = 0, u = 0, d = 0);
				const b = t.extractPoints(a);
				let M = b.shape;
				const S = b.holes;
				if (!Df.isClockWise(M)) {
					M = M.reverse();
					for (let t = 0, e = S.length; t < e; t++) {
						const e = S[t];
						Df.isClockWise(e) && (S[t] = e.reverse())
					}
				}
				const T = Df.triangulateShape(M, S),
					E = M;
				for (let t = 0, e = S.length; t < e; t++) {
					const e = S[t];
					M = M.concat(e)
				}

				function A(t, e, n) {
					return e || console.error("THREE.ExtrudeGeometry: vec does not exist"), e.clone().multiplyScalar(n).add(t)
				}
				const L = M.length,
					C = T.length;

				function R(t, e, n) {
					let i, r, s;
					const a = t.x - e.x,
						o = t.y - e.y,
						l = n.x - t.x,
						c = n.y - t.y,
						h = a * a + o * o,
						u = a * c - o * l;
					if (Math.abs(u) > Number.EPSILON) {
						const u = Math.sqrt(h),
							d = Math.sqrt(l * l + c * c),
							p = e.x - o / u,
							m = e.y + a / u,
							f = ((n.x - c / d - p) * c - (n.y + l / d - m) * l) / (a * c - o * l);
						i = p + a * f - t.x, r = m + o * f - t.y;
						const g = i * i + r * r;
						if (g <= 2) return new _l(i, r);
						s = Math.sqrt(g / 2)
					} else {
						let t = !1;
						a > Number.EPSILON ? l > Number.EPSILON && (t = !0) : a < -Number.EPSILON ? l < -Number.EPSILON && (t = !0) : Math.sign(o) === Math.sign(c) && (t = !0), t ? (i = -o, r = a, s = Math.sqrt(h)) : (i = a, r = o, s = Math.sqrt(h / 2))
					}
					return new _l(i / s, r / s)
				}
				const P = [];
				for (let t = 0, e = E.length, n = e - 1, i = t + 1; t < e; t++, n++, i++) n === e && (n = 0), i === e && (i = 0), P[t] = R(E[t], E[n], E[i]);
				const D = [];
				let I, O = P.concat();
				for (let t = 0, e = S.length; t < e; t++) {
					const e = S[t];
					I = [];
					for (let t = 0, n = e.length, i = n - 1, r = t + 1; t < n; t++, i++, r++) i === n && (i = 0), r === n && (r = 0), I[t] = R(e[t], e[i], e[r]);
					D.push(I), O = O.concat(I)
				}
				for (let t = 0; t < p; t++) {
					const e = t / p,
						n = h * Math.cos(e * Math.PI / 2),
						i = u * Math.sin(e * Math.PI / 2) + d;
					for (let t = 0, e = E.length; t < e; t++) {
						const e = A(E[t], P[t], i);
						B(e.x, e.y, -n)
					}
					for (let t = 0, e = S.length; t < e; t++) {
						const e = S[t];
						I = D[t];
						for (let t = 0, r = e.length; t < r; t++) {
							const r = A(e[t], I[t], i);
							B(r.x, r.y, -n)
						}
					}
				}
				const N = u + d;
				for (let t = 0; t < L; t++) {
					const e = c ? A(M[t], O[t], N) : M[t];
					w ? (_.copy(v.normals[0]).multiplyScalar(e.x), y.copy(v.binormals[0]).multiplyScalar(e.y), x.copy(g[0]).add(_).add(y), B(x.x, x.y, x.z)) : B(e.x, e.y, 0)
				}
				for (let t = 1; t <= o; t++)
					for (let e = 0; e < L; e++) {
						const n = c ? A(M[e], O[e], N) : M[e];
						w ? (_.copy(v.normals[t]).multiplyScalar(n.x), y.copy(v.binormals[t]).multiplyScalar(n.y), x.copy(g[t]).add(_).add(y), B(x.x, x.y, x.z)) : B(n.x, n.y, l / o * t)
					}
				for (let t = p - 1; t >= 0; t--) {
					const e = t / p,
						n = h * Math.cos(e * Math.PI / 2),
						i = u * Math.sin(e * Math.PI / 2) + d;
					for (let t = 0, e = E.length; t < e; t++) {
						const e = A(E[t], P[t], i);
						B(e.x, e.y, l + n)
					}
					for (let t = 0, e = S.length; t < e; t++) {
						const e = S[t];
						I = D[t];
						for (let t = 0, r = e.length; t < r; t++) {
							const r = A(e[t], I[t], i);
							w ? B(r.x, r.y + g[o - 1].y, g[o - 1].x + n) : B(r.x, r.y, l + n)
						}
					}
				}

				function z(t, e) {
					let n = t.length;
					for (; --n >= 0;) {
						const i = n;
						let r = n - 1;
						r < 0 && (r = t.length - 1);
						for (let t = 0, n = o + 2 * p; t < n; t++) {
							const n = L * t,
								s = L * (t + 1);
							k(e + i + n, e + r + n, e + r + s, e + i + s)
						}
					}
				}

				function B(t, e, n) {
					s.push(t), s.push(e), s.push(n)
				}

				function F(t, e, r) {
					U(t), U(e), U(r);
					const s = i.length / 3,
						a = f.generateTopUV(n, i, s - 3, s - 2, s - 1);
					H(a[0]), H(a[1]), H(a[2])
				}

				function k(t, e, r, s) {
					U(t), U(e), U(s), U(e), U(r), U(s);
					const a = i.length / 3,
						o = f.generateSideWallUV(n, i, a - 6, a - 3, a - 2, a - 1);
					H(o[0]), H(o[1]), H(o[3]), H(o[1]), H(o[2]), H(o[3])
				}

				function U(t) {
					i.push(s[3 * t + 0]), i.push(s[3 * t + 1]), i.push(s[3 * t + 2])
				}

				function H(t) {
					r.push(t.x), r.push(t.y)
				}! function () {
					const t = i.length / 3;
					if (c) {
						let t = 0,
							e = L * t;
						for (let t = 0; t < C; t++) {
							const n = T[t];
							F(n[2] + e, n[1] + e, n[0] + e)
						}
						t = o + 2 * p, e = L * t;
						for (let t = 0; t < C; t++) {
							const n = T[t];
							F(n[0] + e, n[1] + e, n[2] + e)
						}
					} else {
						for (let t = 0; t < C; t++) {
							const e = T[t];
							F(e[2], e[1], e[0])
						}
						for (let t = 0; t < C; t++) {
							const e = T[t];
							F(e[0] + L * o, e[1] + L * o, e[2] + L * o)
						}
					}
					n.addGroup(t, i.length / 3 - t, 0)
				}(),
				function () {
					const t = i.length / 3;
					let e = 0;
					z(E, e), e += E.length;
					for (let t = 0, n = S.length; t < n; t++) {
						const n = S[t];
						z(n, e), e += n.length
					}
					n.addGroup(t, i.length / 3 - t, 1)
				}()
			}
			this.setAttribute("position", new lh(i, 3)), this.setAttribute("uv", new lh(r, 2)), this.computeVertexNormals()
		}
		toJSON() {
			const t = super.toJSON();
			return function (t, e, n) {
				if (n.shapes = [], Array.isArray(t))
					for (let e = 0, i = t.length; e < i; e++) {
						const i = t[e];
						n.shapes.push(i.uuid)
					} else n.shapes.push(t.uuid);
				void 0 !== e.extrudePath && (n.options.extrudePath = e.extrudePath.toJSON());
				return n
			}(this.parameters.shapes, this.parameters.options, t)
		}
		static fromJSON(t, e) {
			const n = [];
			for (let i = 0, r = t.shapes.length; i < r; i++) {
				const r = e[t.shapes[i]];
				n.push(r)
			}
			const i = t.options.extrudePath;
			return void 0 !== i && (t.options.extrudePath = (new nf[i.type]).fromJSON(i)), new Nf(n, t.options)
		}
	}
	const zf = {
		generateTopUV: function (t, e, n, i, r) {
			const s = e[3 * n],
				a = e[3 * n + 1],
				o = e[3 * i],
				l = e[3 * i + 1],
				c = e[3 * r],
				h = e[3 * r + 1];
			return [new _l(s, a), new _l(o, l), new _l(c, h)]
		},
		generateSideWallUV: function (t, e, n, i, r, s) {
			const a = e[3 * n],
				o = e[3 * n + 1],
				l = e[3 * n + 2],
				c = e[3 * i],
				h = e[3 * i + 1],
				u = e[3 * i + 2],
				d = e[3 * r],
				p = e[3 * r + 1],
				m = e[3 * r + 2],
				f = e[3 * s],
				g = e[3 * s + 1],
				v = e[3 * s + 2];
			return Math.abs(o - h) < Math.abs(a - c) ? [new _l(a, 1 - l), new _l(c, 1 - u), new _l(d, 1 - m), new _l(f, 1 - v)] : [new _l(o, 1 - l), new _l(h, 1 - u), new _l(p, 1 - m), new _l(g, 1 - v)]
		}
	};
	class Bf extends gh {
		constructor(t = new af([new _l(0, .5), new _l(-.5, -.5), new _l(.5, -.5)]), e = 12) {
			super(), this.type = "ShapeGeometry", this.parameters = {
				shapes: t,
				curveSegments: e
			};
			const n = [],
				i = [],
				r = [],
				s = [];
			let a = 0,
				o = 0;
			if (!1 === Array.isArray(t)) l(t);
			else
				for (let e = 0; e < t.length; e++) l(t[e]), this.addGroup(a, o, e), a += o, o = 0;

			function l(t) {
				const a = i.length / 3,
					l = t.extractPoints(e);
				let c = l.shape;
				const h = l.holes;
				!1 === Df.isClockWise(c) && (c = c.reverse());
				for (let t = 0, e = h.length; t < e; t++) {
					const e = h[t];
					!0 === Df.isClockWise(e) && (h[t] = e.reverse())
				}
				const u = Df.triangulateShape(c, h);
				for (let t = 0, e = h.length; t < e; t++) {
					const e = h[t];
					c = c.concat(e)
				}
				for (let t = 0, e = c.length; t < e; t++) {
					const e = c[t];
					i.push(e.x, e.y, 0), r.push(0, 0, 1), s.push(e.x, e.y)
				}
				for (let t = 0, e = u.length; t < e; t++) {
					const e = u[t],
						i = e[0] + a,
						r = e[1] + a,
						s = e[2] + a;
					n.push(i, r, s), o += 3
				}
			}
			this.setIndex(n), this.setAttribute("position", new lh(i, 3)), this.setAttribute("normal", new lh(r, 3)), this.setAttribute("uv", new lh(s, 2))
		}
		toJSON() {
			const t = super.toJSON();
			return function (t, e) {
				if (e.shapes = [], Array.isArray(t))
					for (let n = 0, i = t.length; n < i; n++) {
						const i = t[n];
						e.shapes.push(i.uuid)
					} else e.shapes.push(t.uuid);
				return e
			}(this.parameters.shapes, t)
		}
		static fromJSON(t, e) {
			const n = [];
			for (let i = 0, r = t.shapes.length; i < r; i++) {
				const r = e[t.shapes[i]];
				n.push(r)
			}
			return new Bf(n, t.curveSegments)
		}
	}(class extends Yc {
		constructor(t) {
			super(), this.type = "ShadowMaterial", this.color = new eh(0), this.transparent = !0, this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.color.copy(t.color), this
		}
	}).prototype.isShadowMaterial = !0;
	class Ff extends Yc {
		constructor(t) {
			super(), this.defines = {
				STANDARD: ""
			}, this.type = "MeshStandardMaterial", this.color = new eh(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new eh(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new _l(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.defines = {
				STANDARD: ""
			}, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapIntensity = t.envMapIntensity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this
		}
	}
	Ff.prototype.isMeshStandardMaterial = !0;
	(class extends Ff {
		constructor(t) {
			super(), this.defines = {
				STANDARD: "",
				PHYSICAL: ""
			}, this.type = "MeshPhysicalMaterial", this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new _l(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
				get: function () {
					return fl(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1)
				},
				set: function (t) {
					this.ior = (1 + .4 * t) / (1 - .4 * t)
				}
			}), this.sheenColor = new eh(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 0, this.attenuationColor = new eh(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new eh(1, 1, 1), this.specularColorMap = null, this._sheen = 0, this._clearcoat = 0, this._transmission = 0, this.setValues(t)
		}
		get sheen() {
			return this._sheen
		}
		set sheen(t) {
			this._sheen > 0 != t > 0 && this.version++, this._sheen = t
		}
		get clearcoat() {
			return this._clearcoat
		}
		set clearcoat(t) {
			this._clearcoat > 0 != t > 0 && this.version++, this._clearcoat = t
		}
		get transmission() {
			return this._transmission
		}
		set transmission(t) {
			this._transmission > 0 != t > 0 && this.version++, this._transmission = t
		}
		copy(t) {
			return super.copy(t), this.defines = {
				STANDARD: "",
				PHYSICAL: ""
			}, this.clearcoat = t.clearcoat, this.clearcoatMap = t.clearcoatMap, this.clearcoatRoughness = t.clearcoatRoughness, this.clearcoatRoughnessMap = t.clearcoatRoughnessMap, this.clearcoatNormalMap = t.clearcoatNormalMap, this.clearcoatNormalScale.copy(t.clearcoatNormalScale), this.ior = t.ior, this.sheen = t.sheen, this.sheenColor.copy(t.sheenColor), this.sheenColorMap = t.sheenColorMap, this.sheenRoughness = t.sheenRoughness, this.sheenRoughnessMap = t.sheenRoughnessMap, this.transmission = t.transmission, this.transmissionMap = t.transmissionMap, this.thickness = t.thickness, this.thicknessMap = t.thicknessMap, this.attenuationDistance = t.attenuationDistance, this.attenuationColor.copy(t.attenuationColor), this.specularIntensity = t.specularIntensity, this.specularIntensityMap = t.specularIntensityMap, this.specularColor.copy(t.specularColor), this.specularColorMap = t.specularColorMap, this
		}
	}).prototype.isMeshPhysicalMaterial = !0;
	(class extends Yc {
		constructor(t) {
			super(), this.type = "MeshPhongMaterial", this.color = new eh(16777215), this.specular = new eh(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new eh(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new _l(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.color.copy(t.color), this.specular.copy(t.specular), this.shininess = t.shininess, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType,
				this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this
		}
	}).prototype.isMeshPhongMaterial = !0;
	(class extends Yc {
		constructor(t) {
			super(), this.defines = {
				TOON: ""
			}, this.type = "MeshToonMaterial", this.color = new eh(16777215), this.map = null, this.gradientMap = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new eh(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new _l(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.color.copy(t.color), this.map = t.map, this.gradientMap = t.gradientMap, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.alphaMap = t.alphaMap, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this
		}
	}).prototype.isMeshToonMaterial = !0;
	(class extends Yc {
		constructor(t) {
			super(), this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new _l(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.flatShading = !1, this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.flatShading = t.flatShading, this
		}
	}).prototype.isMeshNormalMaterial = !0;
	(class extends Yc {
		constructor(t) {
			super(), this.type = "MeshLambertMaterial", this.color = new eh(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new eh(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this
		}
	}).prototype.isMeshLambertMaterial = !0;
	(class extends Yc {
		constructor(t) {
			super(), this.defines = {
				MATCAP: ""
			}, this.type = "MeshMatcapMaterial", this.color = new eh(16777215), this.matcap = null, this.map = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new _l(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.flatShading = !1, this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.defines = {
				MATCAP: ""
			}, this.color.copy(t.color), this.matcap = t.matcap, this.map = t.map, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.alphaMap = t.alphaMap, this.flatShading = t.flatShading, this
		}
	}).prototype.isMeshMatcapMaterial = !0;
	(class extends wm {
		constructor(t) {
			super(), this.type = "LineDashedMaterial", this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.setValues(t)
		}
		copy(t) {
			return super.copy(t), this.scale = t.scale, this.dashSize = t.dashSize, this.gapSize = t.gapSize, this
		}
	}).prototype.isLineDashedMaterial = !0;
	const kf = {
		arraySlice: function (t, e, n) {
			return kf.isTypedArray(t) ? new t.constructor(t.subarray(e, void 0 !== n ? n : t.length)) : t.slice(e, n)
		},
		convertArray: function (t, e, n) {
			return !t || !n && t.constructor === e ? t : "number" == typeof e.BYTES_PER_ELEMENT ? new e(t) : Array.prototype.slice.call(t)
		},
		isTypedArray: function (t) {
			return ArrayBuffer.isView(t) && !(t instanceof DataView)
		},
		getKeyframeOrder: function (t) {
			const e = t.length,
				n = new Array(e);
			for (let t = 0; t !== e; ++t) n[t] = t;
			return n.sort((function (e, n) {
				return t[e] - t[n]
			})), n
		},
		sortedArray: function (t, e, n) {
			const i = t.length,
				r = new t.constructor(i);
			for (let s = 0, a = 0; a !== i; ++s) {
				const i = n[s] * e;
				for (let n = 0; n !== e; ++n) r[a++] = t[i + n]
			}
			return r
		},
		flattenJSON: function (t, e, n, i) {
			let r = 1,
				s = t[0];
			for (; void 0 !== s && void 0 === s[i];) s = t[r++];
			if (void 0 === s) return;
			let a = s[i];
			if (void 0 !== a)
				if (Array.isArray(a))
					do {
						a = s[i], void 0 !== a && (e.push(s.time), n.push.apply(n, a)), s = t[r++]
					} while (void 0 !== s);
				else if (void 0 !== a.toArray)
				do {
					a = s[i], void 0 !== a && (e.push(s.time), a.toArray(n, n.length)), s = t[r++]
				} while (void 0 !== s);
			else
				do {
					a = s[i], void 0 !== a && (e.push(s.time), n.push(a)), s = t[r++]
				} while (void 0 !== s)
		},
		subclip: function (t, e, n, i, r = 30) {
			const s = t.clone();
			s.name = e;
			const a = [];
			for (let t = 0; t < s.tracks.length; ++t) {
				const e = s.tracks[t],
					o = e.getValueSize(),
					l = [],
					c = [];
				for (let t = 0; t < e.times.length; ++t) {
					const s = e.times[t] * r;
					if (!(s < n || s >= i)) {
						l.push(e.times[t]);
						for (let n = 0; n < o; ++n) c.push(e.values[t * o + n])
					}
				}
				0 !== l.length && (e.times = kf.convertArray(l, e.times.constructor), e.values = kf.convertArray(c, e.values.constructor), a.push(e))
			}
			s.tracks = a;
			let o = 1 / 0;
			for (let t = 0; t < s.tracks.length; ++t) o > s.tracks[t].times[0] && (o = s.tracks[t].times[0]);
			for (let t = 0; t < s.tracks.length; ++t) s.tracks[t].shift(-1 * o);
			return s.resetDuration(), s
		},
		makeClipAdditive: function (t, e = 0, n = t, i = 30) {
			i <= 0 && (i = 30);
			const r = n.tracks.length,
				s = e / i;
			for (let e = 0; e < r; ++e) {
				const i = n.tracks[e],
					r = i.ValueTypeName;
				if ("bool" === r || "string" === r) continue;
				const a = t.tracks.find((function (t) {
					return t.name === i.name && t.ValueTypeName === r
				}));
				if (void 0 === a) continue;
				let o = 0;
				const l = i.getValueSize();
				i.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (o = l / 3);
				let c = 0;
				const h = a.getValueSize();
				a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (c = h / 3);
				const u = i.times.length - 1;
				let d;
				if (s <= i.times[0]) {
					const t = o,
						e = l - o;
					d = kf.arraySlice(i.values, t, e)
				} else if (s >= i.times[u]) {
					const t = u * l + o,
						e = t + l - o;
					d = kf.arraySlice(i.values, t, e)
				} else {
					const t = i.createInterpolant(),
						e = o,
						n = l - o;
					t.evaluate(s), d = kf.arraySlice(t.resultBuffer, e, n)
				}
				if ("quaternion" === r) {
					(new Dl).fromArray(d).normalize().conjugate().toArray(d)
				}
				const p = a.times.length;
				for (let t = 0; t < p; ++t) {
					const e = t * h + c;
					if ("quaternion" === r) Dl.multiplyQuaternionsFlat(a.values, e, d, 0, a.values, e);
					else {
						const t = h - 2 * c;
						for (let n = 0; n < t; ++n) a.values[e + n] -= d[n]
					}
				}
			}
			return t.blendMode = 2501, t
		}
	};
	class Uf {
		constructor(t, e, n, i) {
			this.parameterPositions = t, this._cachedIndex = 0, this.resultBuffer = void 0 !== i ? i : new e.constructor(n), this.sampleValues = e, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {}
		}
		evaluate(t) {
			const e = this.parameterPositions;
			let n = this._cachedIndex,
				i = e[n],
				r = e[n - 1];
			t: {
				e: {
					let s;n: {
						i: if (!(t < i)) {
							for (let s = n + 2;;) {
								if (void 0 === i) {
									if (t < r) break i;
									return n = e.length, this._cachedIndex = n, this.afterEnd_(n - 1, t, r)
								}
								if (n === s) break;
								if (r = i, i = e[++n], t < i) break e
							}
							s = e.length;
							break n
						}if (t >= r) break t; {
							const a = e[1];
							t < a && (n = 2, r = a);
							for (let s = n - 2;;) {
								if (void 0 === r) return this._cachedIndex = 0, this.beforeStart_(0, t, i);
								if (n === s) break;
								if (i = r, r = e[--n - 1], t >= r) break e
							}
							s = n, n = 0
						}
					}
					for (; n < s;) {
						const i = n + s >>> 1;
						t < e[i] ? s = i : n = i + 1
					}
					if (i = e[n], r = e[n - 1], void 0 === r) return this._cachedIndex = 0,
					this.beforeStart_(0, t, i);
					if (void 0 === i) return n = e.length,
					this._cachedIndex = n,
					this.afterEnd_(n - 1, r, t)
				}
				this._cachedIndex = n,
				this.intervalChanged_(n, r, i)
			}
			return this.interpolate_(n, r, t, i)
		}
		getSettings_() {
			return this.settings || this.DefaultSettings_
		}
		copySampleValue_(t) {
			const e = this.resultBuffer,
				n = this.sampleValues,
				i = this.valueSize,
				r = t * i;
			for (let t = 0; t !== i; ++t) e[t] = n[r + t];
			return e
		}
		interpolate_() {
			throw new Error("call to abstract method")
		}
		intervalChanged_() {}
	}
	Uf.prototype.beforeStart_ = Uf.prototype.copySampleValue_, Uf.prototype.afterEnd_ = Uf.prototype.copySampleValue_;
	class Hf extends Uf {
		constructor(t, e, n, i) {
			super(t, e, n, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
				endingStart: Ko,
				endingEnd: Ko
			}
		}
		intervalChanged_(t, e, n) {
			const i = this.parameterPositions;
			let r = t - 2,
				s = t + 1,
				a = i[r],
				o = i[s];
			if (void 0 === a) switch (this.getSettings_().endingStart) {
				case $o:
					r = t, a = 2 * e - n;
					break;
				case tl:
					r = i.length - 2, a = e + i[r] - i[r + 1];
					break;
				default:
					r = t, a = n
			}
			if (void 0 === o) switch (this.getSettings_().endingEnd) {
				case $o:
					s = t, o = 2 * n - e;
					break;
				case tl:
					s = 1, o = n + i[1] - i[0];
					break;
				default:
					s = t - 1, o = e
			}
			const l = .5 * (n - e),
				c = this.valueSize;
			this._weightPrev = l / (e - a), this._weightNext = l / (o - n), this._offsetPrev = r * c, this._offsetNext = s * c
		}
		interpolate_(t, e, n, i) {
			const r = this.resultBuffer,
				s = this.sampleValues,
				a = this.valueSize,
				o = t * a,
				l = o - a,
				c = this._offsetPrev,
				h = this._offsetNext,
				u = this._weightPrev,
				d = this._weightNext,
				p = (n - e) / (i - e),
				m = p * p,
				f = m * p,
				g = -u * f + 2 * u * m - u * p,
				v = (1 + u) * f + (-1.5 - 2 * u) * m + (-.5 + u) * p + 1,
				y = (-1 - d) * f + (1.5 + d) * m + .5 * p,
				_ = d * f - d * m;
			for (let t = 0; t !== a; ++t) r[t] = g * s[c + t] + v * s[l + t] + y * s[o + t] + _ * s[h + t];
			return r
		}
	}
	class Gf extends Uf {
		constructor(t, e, n, i) {
			super(t, e, n, i)
		}
		interpolate_(t, e, n, i) {
			const r = this.resultBuffer,
				s = this.sampleValues,
				a = this.valueSize,
				o = t * a,
				l = o - a,
				c = (n - e) / (i - e),
				h = 1 - c;
			for (let t = 0; t !== a; ++t) r[t] = s[l + t] * h + s[o + t] * c;
			return r
		}
	}
	class Vf extends Uf {
		constructor(t, e, n, i) {
			super(t, e, n, i)
		}
		interpolate_(t) {
			return this.copySampleValue_(t - 1)
		}
	}
	class Wf {
		constructor(t, e, n, i) {
			if (void 0 === t) throw new Error("THREE.KeyframeTrack: track name is undefined");
			if (void 0 === e || 0 === e.length) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + t);
			this.name = t, this.times = kf.convertArray(e, this.TimeBufferType), this.values = kf.convertArray(n, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation)
		}
		static toJSON(t) {
			const e = t.constructor;
			let n;
			if (e.toJSON !== this.toJSON) n = e.toJSON(t);
			else {
				n = {
					name: t.name,
					times: kf.convertArray(t.times, Array),
					values: kf.convertArray(t.values, Array)
				};
				const e = t.getInterpolation();
				e !== t.DefaultInterpolation && (n.interpolation = e)
			}
			return n.type = t.ValueTypeName, n
		}
		InterpolantFactoryMethodDiscrete(t) {
			return new Vf(this.times, this.values, this.getValueSize(), t)
		}
		InterpolantFactoryMethodLinear(t) {
			return new Gf(this.times, this.values, this.getValueSize(), t)
		}
		InterpolantFactoryMethodSmooth(t) {
			return new Hf(this.times, this.values, this.getValueSize(), t)
		}
		setInterpolation(t) {
			let e;
			switch (t) {
				case Jo:
					e = this.InterpolantFactoryMethodDiscrete;
					break;
				case Zo:
					e = this.InterpolantFactoryMethodLinear;
					break;
				case Qo:
					e = this.InterpolantFactoryMethodSmooth
			}
			if (void 0 === e) {
				const e = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
				if (void 0 === this.createInterpolant) {
					if (t === this.DefaultInterpolation) throw new Error(e);
					this.setInterpolation(this.DefaultInterpolation)
				}
				return console.warn("THREE.KeyframeTrack:", e), this
			}
			return this.createInterpolant = e, this
		}
		getInterpolation() {
			switch (this.createInterpolant) {
				case this.InterpolantFactoryMethodDiscrete:
					return Jo;
				case this.InterpolantFactoryMethodLinear:
					return Zo;
				case this.InterpolantFactoryMethodSmooth:
					return Qo
			}
		}
		getValueSize() {
			return this.values.length / this.times.length
		}
		shift(t) {
			if (0 !== t) {
				const e = this.times;
				for (let n = 0, i = e.length; n !== i; ++n) e[n] += t
			}
			return this
		}
		scale(t) {
			if (1 !== t) {
				const e = this.times;
				for (let n = 0, i = e.length; n !== i; ++n) e[n] *= t
			}
			return this
		}
		trim(t, e) {
			const n = this.times,
				i = n.length;
			let r = 0,
				s = i - 1;
			for (; r !== i && n[r] < t;) ++r;
			for (; - 1 !== s && n[s] > e;) --s;
			if (++s, 0 !== r || s !== i) {
				r >= s && (s = Math.max(s, 1), r = s - 1);
				const t = this.getValueSize();
				this.times = kf.arraySlice(n, r, s), this.values = kf.arraySlice(this.values, r * t, s * t)
			}
			return this
		}
		validate() {
			let t = !0;
			const e = this.getValueSize();
			e - Math.floor(e) != 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), t = !1);
			const n = this.times,
				i = this.values,
				r = n.length;
			0 === r && (console.error("THREE.KeyframeTrack: Track is empty.", this), t = !1);
			let s = null;
			for (let e = 0; e !== r; e++) {
				const i = n[e];
				if ("number" == typeof i && isNaN(i)) {
					console.error("THREE.KeyframeTrack: Time is not a valid number.", this, e, i), t = !1;
					break
				}
				if (null !== s && s > i) {
					console.error("THREE.KeyframeTrack: Out of order keys.", this, e, i, s), t = !1;
					break
				}
				s = i
			}
			if (void 0 !== i && kf.isTypedArray(i))
				for (let e = 0, n = i.length; e !== n; ++e) {
					const n = i[e];
					if (isNaN(n)) {
						console.error("THREE.KeyframeTrack: Value is not a valid number.", this, e, n), t = !1;
						break
					}
				}
			return t
		}
		optimize() {
			const t = kf.arraySlice(this.times),
				e = kf.arraySlice(this.values),
				n = this.getValueSize(),
				i = this.getInterpolation() === Qo,
				r = t.length - 1;
			let s = 1;
			for (let a = 1; a < r; ++a) {
				let r = !1;
				const o = t[a];
				if (o !== t[a + 1] && (1 !== a || o !== t[0]))
					if (i) r = !0;
					else {
						const t = a * n,
							i = t - n,
							s = t + n;
						for (let a = 0; a !== n; ++a) {
							const n = e[t + a];
							if (n !== e[i + a] || n !== e[s + a]) {
								r = !0;
								break
							}
						}
					} if (r) {
					if (a !== s) {
						t[s] = t[a];
						const i = a * n,
							r = s * n;
						for (let t = 0; t !== n; ++t) e[r + t] = e[i + t]
					}++s
				}
			}
			if (r > 0) {
				t[s] = t[r];
				for (let t = r * n, i = s * n, a = 0; a !== n; ++a) e[i + a] = e[t + a];
				++s
			}
			return s !== t.length ? (this.times = kf.arraySlice(t, 0, s), this.values = kf.arraySlice(e, 0, s * n)) : (this.times = t, this.values = e), this
		}
		clone() {
			const t = kf.arraySlice(this.times, 0),
				e = kf.arraySlice(this.values, 0),
				n = new(0, this.constructor)(this.name, t, e);
			return n.createInterpolant = this.createInterpolant, n
		}
	}
	Wf.prototype.TimeBufferType = Float32Array, Wf.prototype.ValueBufferType = Float32Array, Wf.prototype.DefaultInterpolation = Zo;
	class qf extends Wf {}
	qf.prototype.ValueTypeName = "bool", qf.prototype.ValueBufferType = Array, qf.prototype.DefaultInterpolation = Jo, qf.prototype.InterpolantFactoryMethodLinear = void 0, qf.prototype.InterpolantFactoryMethodSmooth = void 0;
	class jf extends Wf {}
	jf.prototype.ValueTypeName = "color";
	class Xf extends Wf {}
	Xf.prototype.ValueTypeName = "number";
	class Yf extends Uf {
		constructor(t, e, n, i) {
			super(t, e, n, i)
		}
		interpolate_(t, e, n, i) {
			const r = this.resultBuffer,
				s = this.sampleValues,
				a = this.valueSize,
				o = (n - e) / (i - e);
			let l = t * a;
			for (let t = l + a; l !== t; l += 4) Dl.slerpFlat(r, 0, s, l - a, s, l, o);
			return r
		}
	}
	class Jf extends Wf {
		InterpolantFactoryMethodLinear(t) {
			return new Yf(this.times, this.values, this.getValueSize(), t)
		}
	}
	Jf.prototype.ValueTypeName = "quaternion", Jf.prototype.DefaultInterpolation = Zo, Jf.prototype.InterpolantFactoryMethodSmooth = void 0;
	class Zf extends Wf {}
	Zf.prototype.ValueTypeName = "string", Zf.prototype.ValueBufferType = Array, Zf.prototype.DefaultInterpolation = Jo, Zf.prototype.InterpolantFactoryMethodLinear = void 0, Zf.prototype.InterpolantFactoryMethodSmooth = void 0;
	class Qf extends Wf {}
	Qf.prototype.ValueTypeName = "vector";
	class Kf {
		constructor(t, e = -1, n, i = 2500) {
			this.name = t, this.tracks = n, this.duration = e, this.blendMode = i, this.uuid = ml(), this.duration < 0 && this.resetDuration()
		}
		static parse(t) {
			const e = [],
				n = t.tracks,
				i = 1 / (t.fps || 1);
			for (let t = 0, r = n.length; t !== r; ++t) e.push($f(n[t]).scale(i));
			const r = new this(t.name, t.duration, e, t.blendMode);
			return r.uuid = t.uuid, r
		}
		static toJSON(t) {
			const e = [],
				n = t.tracks,
				i = {
					name: t.name,
					duration: t.duration,
					tracks: e,
					uuid: t.uuid,
					blendMode: t.blendMode
				};
			for (let t = 0, i = n.length; t !== i; ++t) e.push(Wf.toJSON(n[t]));
			return i
		}
		static CreateFromMorphTargetSequence(t, e, n, i) {
			const r = e.length,
				s = [];
			for (let t = 0; t < r; t++) {
				let a = [],
					o = [];
				a.push((t + r - 1) % r, t, (t + 1) % r), o.push(0, 1, 0);
				const l = kf.getKeyframeOrder(a);
				a = kf.sortedArray(a, 1, l), o = kf.sortedArray(o, 1, l), i || 0 !== a[0] || (a.push(r), o.push(o[0])), s.push(new Xf(".morphTargetInfluences[" + e[t].name + "]", a, o).scale(1 / n))
			}
			return new this(t, -1, s)
		}
		static findByName(t, e) {
			let n = t;
			if (!Array.isArray(t)) {
				const e = t;
				n = e.geometry && e.geometry.animations || e.animations
			}
			for (let t = 0; t < n.length; t++)
				if (n[t].name === e) return n[t];
			return null
		}
		static CreateClipsFromMorphTargetSequences(t, e, n) {
			const i = {},
				r = /^([\w-]*?)([\d]+)$/;
			for (let e = 0, n = t.length; e < n; e++) {
				const n = t[e],
					s = n.name.match(r);
				if (s && s.length > 1) {
					const t = s[1];
					let e = i[t];
					e || (i[t] = e = []), e.push(n)
				}
			}
			const s = [];
			for (const t in i) s.push(this.CreateFromMorphTargetSequence(t, i[t], e, n));
			return s
		}
		static parseAnimation(t, e) {
			if (!t) return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;
			const n = function (t, e, n, i, r) {
					if (0 !== n.length) {
						const s = [],
							a = [];
						kf.flattenJSON(n, s, a, i), 0 !== s.length && r.push(new t(e, s, a))
					}
				},
				i = [],
				r = t.name || "default",
				s = t.fps || 30,
				a = t.blendMode;
			let o = t.length || -1;
			const l = t.hierarchy || [];
			for (let t = 0; t < l.length; t++) {
				const r = l[t].keys;
				if (r && 0 !== r.length)
					if (r[0].morphTargets) {
						const t = {};
						let e;
						for (e = 0; e < r.length; e++)
							if (r[e].morphTargets)
								for (let n = 0; n < r[e].morphTargets.length; n++) t[r[e].morphTargets[n]] = -1;
						for (const n in t) {
							const t = [],
								s = [];
							for (let i = 0; i !== r[e].morphTargets.length; ++i) {
								const i = r[e];
								t.push(i.time), s.push(i.morphTarget === n ? 1 : 0)
							}
							i.push(new Xf(".morphTargetInfluence[" + n + "]", t, s))
						}
						o = t.length * (s || 1)
					} else {
						const s = ".bones[" + e[t].name + "]";
						n(Qf, s + ".position", r, "pos", i), n(Jf, s + ".quaternion", r, "rot", i), n(Qf, s + ".scale", r, "scl", i)
					}
			}
			if (0 === i.length) return null;
			return new this(r, o, i, a)
		}
		resetDuration() {
			let t = 0;
			for (let e = 0, n = this.tracks.length; e !== n; ++e) {
				const n = this.tracks[e];
				t = Math.max(t, n.times[n.times.length - 1])
			}
			return this.duration = t, this
		}
		trim() {
			for (let t = 0; t < this.tracks.length; t++) this.tracks[t].trim(0, this.duration);
			return this
		}
		validate() {
			let t = !0;
			for (let e = 0; e < this.tracks.length; e++) t = t && this.tracks[e].validate();
			return t
		}
		optimize() {
			for (let t = 0; t < this.tracks.length; t++) this.tracks[t].optimize();
			return this
		}
		clone() {
			const t = [];
			for (let e = 0; e < this.tracks.length; e++) t.push(this.tracks[e].clone());
			return new this.constructor(this.name, this.duration, t, this.blendMode)
		}
		toJSON() {
			return this.constructor.toJSON(this)
		}
	}

	function $f(t) {
		if (void 0 === t.type) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
		const e = function (t) {
			switch (t.toLowerCase()) {
				case "scalar":
				case "double":
				case "float":
				case "number":
				case "integer":
					return Xf;
				case "vector":
				case "vector2":
				case "vector3":
				case "vector4":
					return Qf;
				case "color":
					return jf;
				case "quaternion":
					return Jf;
				case "bool":
				case "boolean":
					return qf;
				case "string":
					return Zf
			}
			throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + t)
		}(t.type);
		if (void 0 === t.times) {
			const e = [],
				n = [];
			kf.flattenJSON(t.keys, e, n, "value"), t.times = e, t.values = n
		}
		return void 0 !== e.parse ? e.parse(t) : new e(t.name, t.times, t.values, t.interpolation)
	}
	const tg = {
		enabled: !1,
		files: {},
		add: function (t, e) {
			!1 !== this.enabled && (this.files[t] = e)
		},
		get: function (t) {
			if (!1 !== this.enabled) return this.files[t]
		},
		remove: function (t) {
			delete this.files[t]
		},
		clear: function () {
			this.files = {}
		}
	};
	const eg = new class {
		constructor(t, e, n) {
			const i = this;
			let r, s = !1,
				a = 0,
				o = 0;
			const l = [];
			this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = n, this.itemStart = function (t) {
				o++, !1 === s && void 0 !== i.onStart && i.onStart(t, a, o), s = !0
			}, this.itemEnd = function (t) {
				a++, void 0 !== i.onProgress && i.onProgress(t, a, o), a === o && (s = !1, void 0 !== i.onLoad && i.onLoad())
			}, this.itemError = function (t) {
				void 0 !== i.onError && i.onError(t)
			}, this.resolveURL = function (t) {
				return r ? r(t) : t
			}, this.setURLModifier = function (t) {
				return r = t, this
			}, this.addHandler = function (t, e) {
				return l.push(t, e), this
			}, this.removeHandler = function (t) {
				const e = l.indexOf(t);
				return -1 !== e && l.splice(e, 2), this
			}, this.getHandler = function (t) {
				for (let e = 0, n = l.length; e < n; e += 2) {
					const n = l[e],
						i = l[e + 1];
					if (n.global && (n.lastIndex = 0), n.test(t)) return i
				}
				return null
			}
		}
	};
	class ng {
		constructor(t) {
			this.manager = void 0 !== t ? t : eg, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}
		}
		load() {}
		loadAsync(t, e) {
			const n = this;
			return new Promise((function (i, r) {
				n.load(t, i, e, r)
			}))
		}
		parse() {}
		setCrossOrigin(t) {
			return this.crossOrigin = t, this
		}
		setWithCredentials(t) {
			return this.withCredentials = t, this
		}
		setPath(t) {
			return this.path = t, this
		}
		setResourcePath(t) {
			return this.resourcePath = t, this
		}
		setRequestHeader(t) {
			return this.requestHeader = t, this
		}
	}
	const ig = {};
	class rg extends ng {
		constructor(t) {
			super(t)
		}
		load(t, e, n, i) {
			void 0 === t && (t = ""), void 0 !== this.path && (t = this.path + t), t = this.manager.resolveURL(t);
			const r = tg.get(t);
			if (void 0 !== r) return this.manager.itemStart(t), setTimeout((() => {
				e && e(r), this.manager.itemEnd(t)
			}), 0), r;
			if (void 0 !== ig[t]) return void ig[t].push({
				onLoad: e,
				onProgress: n,
				onError: i
			});
			ig[t] = [], ig[t].push({
				onLoad: e,
				onProgress: n,
				onError: i
			});
			const s = new Request(t, {
				headers: new Headers(this.requestHeader),
				credentials: this.withCredentials ? "include" : "same-origin"
			});
			fetch(s).then((e => {
				if (200 === e.status || 0 === e.status) {
					0 === e.status && console.warn("THREE.FileLoader: HTTP Status 0 received.");
					const n = ig[t],
						i = e.body.getReader(),
						r = e.headers.get("Content-Length"),
						s = r ? parseInt(r) : 0,
						a = 0 !== s;
					let o = 0;
					return new ReadableStream({
						start(t) {
							! function e() {
								i.read().then((({
									done: i,
									value: r
								}) => {
									if (i) t.close();
									else {
										o += r.byteLength;
										const i = new ProgressEvent("progress", {
											lengthComputable: a,
											loaded: o,
											total: s
										});
										for (let t = 0, e = n.length; t < e; t++) {
											const e = n[t];
											e.onProgress && e.onProgress(i)
										}
										t.enqueue(r), e()
									}
								}))
							}()
						}
					})
				}
				throw Error(`fetch for "${e.url}" responded with ${e.status}: ${e.statusText}`)
			})).then((t => {
				const e = new Response(t);
				switch (this.responseType) {
					case "arraybuffer":
						return e.arrayBuffer();
					case "blob":
						return e.blob();
					case "document":
						return e.text().then((t => (new DOMParser).parseFromString(t, this.mimeType)));
					case "json":
						return e.json();
					default:
						return e.text()
				}
			})).then((e => {
				tg.add(t, e);
				const n = ig[t];
				delete ig[t];
				for (let t = 0, i = n.length; t < i; t++) {
					const i = n[t];
					i.onLoad && i.onLoad(e)
				}
				this.manager.itemEnd(t)
			})).catch((e => {
				const n = ig[t];
				delete ig[t];
				for (let t = 0, i = n.length; t < i; t++) {
					const i = n[t];
					i.onError && i.onError(e)
				}
				this.manager.itemError(t), this.manager.itemEnd(t)
			})), this.manager.itemStart(t)
		}
		setResponseType(t) {
			return this.responseType = t, this
		}
		setMimeType(t) {
			return this.mimeType = t, this
		}
	}
	class sg extends ng {
		constructor(t) {
			super(t)
		}
		load(t, e, n, i) {
			void 0 !== this.path && (t = this.path + t), t = this.manager.resolveURL(t);
			const r = this,
				s = tg.get(t);
			if (void 0 !== s) return r.manager.itemStart(t), setTimeout((function () {
				e && e(s), r.manager.itemEnd(t)
			}), 0), s;
			const a = bl("img");

			function o() {
				c(), tg.add(t, this), e && e(this), r.manager.itemEnd(t)
			}

			function l(e) {
				c(), i && i(e), r.manager.itemError(t), r.manager.itemEnd(t)
			}

			function c() {
				a.removeEventListener("load", o, !1), a.removeEventListener("error", l, !1)
			}
			return a.addEventListener("load", o, !1), a.addEventListener("error", l, !1), "data:" !== t.substr(0, 5) && void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin), r.manager.itemStart(t), a.src = t, a
		}
	}
	class ag extends ng {
		constructor(t) {
			super(t)
		}
		load(t, e, n, i) {
			const r = new qh,
				s = new sg(this.manager);
			s.setCrossOrigin(this.crossOrigin), s.setPath(this.path);
			let a = 0;

			function o(n) {
				s.load(t[n], (function (t) {
					r.images[n] = t, a++, 6 === a && (r.needsUpdate = !0, e && e(r))
				}), void 0, i)
			}
			for (let e = 0; e < t.length; ++e) o(e);
			return r
		}
	}
	class og extends ng {
		constructor(t) {
			super(t)
		}
		load(t, e, n, i) {
			const r = new Al,
				s = new sg(this.manager);
			return s.setCrossOrigin(this.crossOrigin), s.setPath(this.path), s.load(t, (function (t) {
				r.image = t, r.needsUpdate = !0, void 0 !== e && e(r)
			}), n, i), r
		}
	}
	class lg extends Nc {
		constructor(t, e = 1) {
			super(), this.type = "Light", this.color = new eh(t), this.intensity = e
		}
		dispose() {}
		copy(t) {
			return super.copy(t), this.color.copy(t.color), this.intensity = t.intensity, this
		}
		toJSON(t) {
			const e = super.toJSON(t);
			return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, void 0 !== this.groundColor && (e.object.groundColor = this.groundColor.getHex()), void 0 !== this.distance && (e.object.distance = this.distance), void 0 !== this.angle && (e.object.angle = this.angle), void 0 !== this.decay && (e.object.decay = this.decay), void 0 !== this.penumbra && (e.object.penumbra = this.penumbra), void 0 !== this.shadow && (e.object.shadow = this.shadow.toJSON()), e
		}
	}
	lg.prototype.isLight = !0;
	(class extends lg {
		constructor(t, e, n) {
			super(t, n), this.type = "HemisphereLight", this.position.copy(Nc.DefaultUp), this.updateMatrix(), this.groundColor = new eh(e)
		}
		copy(t) {
			return lg.prototype.copy.call(this, t), this.groundColor.copy(t.groundColor), this
		}
	}).prototype.isHemisphereLight = !0;
	const cg = new hc,
		hg = new Il,
		ug = new Il;
	class dg {
		constructor(t) {
			this.camera = t, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new _l(512, 512), this.map = null, this.mapPass = null, this.matrix = new hc, this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new $h, this._frameExtents = new _l(1, 1), this._viewportCount = 1, this._viewports = [new Cl(0, 0, 1, 1)]
		}
		getViewportCount() {
			return this._viewportCount
		}
		getFrustum() {
			return this._frustum
		}
		updateMatrices(t) {
			const e = this.camera,
				n = this.matrix;
			hg.setFromMatrixPosition(t.matrixWorld), e.position.copy(hg), ug.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(ug), e.updateMatrixWorld(), cg.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(cg), n.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), n.multiply(e.projectionMatrix), n.multiply(e.matrixWorldInverse)
		}
		getViewport(t) {
			return this._viewports[t]
		}
		getFrameExtents() {
			return this._frameExtents
		}
		dispose() {
			this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose()
		}
		copy(t) {
			return this.camera = t.camera.clone(), this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this
		}
		clone() {
			return (new this.constructor).copy(this)
		}
		toJSON() {
			const t = {};
			return 0 !== this.bias && (t.bias = this.bias), 0 !== this.normalBias && (t.normalBias = this.normalBias), 1 !== this.radius && (t.radius = this.radius), 512 === this.mapSize.x && 512 === this.mapSize.y || (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(!1).object, delete t.camera.matrix, t
		}
	}
	class pg extends dg {
		constructor() {
			super(new Gh(50, 1, .5, 500)), this.focus = 1
		}
		updateMatrices(t) {
			const e = this.camera,
				n = 2 * pl * t.angle * this.focus,
				i = this.mapSize.width / this.mapSize.height,
				r = t.distance || e.far;
			n === e.fov && i === e.aspect && r === e.far || (e.fov = n, e.aspect = i, e.far = r, e.updateProjectionMatrix()), super.updateMatrices(t)
		}
		copy(t) {
			return super.copy(t), this.focus = t.focus, this
		}
	}
	pg.prototype.isSpotLightShadow = !0;
	(class extends lg {
		constructor(t, e, n = 0, i = Math.PI / 3, r = 0, s = 1) {
			super(t, e), this.type = "SpotLight", this.position.copy(Nc.DefaultUp), this.updateMatrix(), this.target = new Nc, this.distance = n, this.angle = i, this.penumbra = r, this.decay = s, this.shadow = new pg
		}
		get power() {
			return this.intensity * Math.PI
		}
		set power(t) {
			this.intensity = t / Math.PI
		}
		dispose() {
			this.shadow.dispose()
		}
		copy(t) {
			return super.copy(t), this.distance = t.distance, this.angle = t.angle, this.penumbra = t.penumbra, this.decay = t.decay, this.target = t.target.clone(), this.shadow = t.shadow.clone(), this
		}
	}).prototype.isSpotLight = !0;
	const mg = new hc,
		fg = new Il,
		gg = new Il;
	class vg extends dg {
		constructor() {
			super(new Gh(90, 1, .5, 500)), this._frameExtents = new _l(4, 2), this._viewportCount = 6, this._viewports = [new Cl(2, 1, 1, 1), new Cl(0, 1, 1, 1), new Cl(3, 1, 1, 1), new Cl(1, 1, 1, 1), new Cl(3, 0, 1, 1), new Cl(1, 0, 1, 1)], this._cubeDirections = [new Il(1, 0, 0), new Il(-1, 0, 0), new Il(0, 0, 1), new Il(0, 0, -1), new Il(0, 1, 0), new Il(0, -1, 0)], this._cubeUps = [new Il(0, 1, 0), new Il(0, 1, 0), new Il(0, 1, 0), new Il(0, 1, 0), new Il(0, 0, 1), new Il(0, 0, -1)]
		}
		updateMatrices(t, e = 0) {
			const n = this.camera,
				i = this.matrix,
				r = t.distance || n.far;
			r !== n.far && (n.far = r, n.updateProjectionMatrix()), fg.setFromMatrixPosition(t.matrixWorld), n.position.copy(fg), gg.copy(n.position), gg.add(this._cubeDirections[e]), n.up.copy(this._cubeUps[e]), n.lookAt(gg), n.updateMatrixWorld(), i.makeTranslation(-fg.x, -fg.y, -fg.z), mg.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(mg)
		}
	}
	vg.prototype.isPointLightShadow = !0;
	(class extends lg {
		constructor(t, e, n = 0, i = 1) {
			super(t, e), this.type = "PointLight", this.distance = n, this.decay = i, this.shadow = new vg
		}
		get power() {
			return 4 * this.intensity * Math.PI
		}
		set power(t) {
			this.intensity = t / (4 * Math.PI)
		}
		dispose() {
			this.shadow.dispose()
		}
		copy(t) {
			return super.copy(t), this.distance = t.distance, this.decay = t.decay, this.shadow = t.shadow.clone(), this
		}
	}).prototype.isPointLight = !0;
	class yg extends dg {
		constructor() {
			super(new du(-5, 5, 5, -5, .5, 500))
		}
	}
	yg.prototype.isDirectionalLightShadow = !0;
	(class extends lg {
		constructor(t, e) {
			super(t, e), this.type = "DirectionalLight", this.position.copy(Nc.DefaultUp), this.updateMatrix(), this.target = new Nc, this.shadow = new yg
		}
		dispose() {
			this.shadow.dispose()
		}
		copy(t) {
			return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this
		}
	}).prototype.isDirectionalLight = !0;
	(class extends lg {
		constructor(t, e) {
			super(t, e), this.type = "AmbientLight"
		}
	}).prototype.isAmbientLight = !0;
	(class extends lg {
		constructor(t, e, n = 10, i = 10) {
			super(t, e), this.type = "RectAreaLight", this.width = n, this.height = i
		}
		get power() {
			return this.intensity * this.width * this.height * Math.PI
		}
		set power(t) {
			this.intensity = t / (this.width * this.height * Math.PI)
		}
		copy(t) {
			return super.copy(t), this.width = t.width, this.height = t.height, this
		}
		toJSON(t) {
			const e = super.toJSON(t);
			return e.object.width = this.width, e.object.height = this.height, e
		}
	}).prototype.isRectAreaLight = !0;
	class _g {
		constructor() {
			this.coefficients = [];
			for (let t = 0; t < 9; t++) this.coefficients.push(new Il)
		}
		set(t) {
			for (let e = 0; e < 9; e++) this.coefficients[e].copy(t[e]);
			return this
		}
		zero() {
			for (let t = 0; t < 9; t++) this.coefficients[t].set(0, 0, 0);
			return this
		}
		getAt(t, e) {
			const n = t.x,
				i = t.y,
				r = t.z,
				s = this.coefficients;
			return e.copy(s[0]).multiplyScalar(.282095), e.addScaledVector(s[1], .488603 * i), e.addScaledVector(s[2], .488603 * r), e.addScaledVector(s[3], .488603 * n), e.addScaledVector(s[4], n * i * 1.092548), e.addScaledVector(s[5], i * r * 1.092548), e.addScaledVector(s[6], .315392 * (3 * r * r - 1)), e.addScaledVector(s[7], n * r * 1.092548), e.addScaledVector(s[8], .546274 * (n * n - i * i)), e
		}
		getIrradianceAt(t, e) {
			const n = t.x,
				i = t.y,
				r = t.z,
				s = this.coefficients;
			return e.copy(s[0]).multiplyScalar(.886227), e.addScaledVector(s[1], 1.023328 * i), e.addScaledVector(s[2], 1.023328 * r), e.addScaledVector(s[3], 1.023328 * n), e.addScaledVector(s[4], .858086 * n * i), e.addScaledVector(s[5], .858086 * i * r), e.addScaledVector(s[6], .743125 * r * r - .247708), e.addScaledVector(s[7], .858086 * n * r), e.addScaledVector(s[8], .429043 * (n * n - i * i)), e
		}
		add(t) {
			for (let e = 0; e < 9; e++) this.coefficients[e].add(t.coefficients[e]);
			return this
		}
		addScaledSH(t, e) {
			for (let n = 0; n < 9; n++) this.coefficients[n].addScaledVector(t.coefficients[n], e);
			return this
		}
		scale(t) {
			for (let e = 0; e < 9; e++) this.coefficients[e].multiplyScalar(t);
			return this
		}
		lerp(t, e) {
			for (let n = 0; n < 9; n++) this.coefficients[n].lerp(t.coefficients[n], e);
			return this
		}
		equals(t) {
			for (let e = 0; e < 9; e++)
				if (!this.coefficients[e].equals(t.coefficients[e])) return !1;
			return !0
		}
		copy(t) {
			return this.set(t.coefficients)
		}
		clone() {
			return (new this.constructor).copy(this)
		}
		fromArray(t, e = 0) {
			const n = this.coefficients;
			for (let i = 0; i < 9; i++) n[i].fromArray(t, e + 3 * i);
			return this
		}
		toArray(t = [], e = 0) {
			const n = this.coefficients;
			for (let i = 0; i < 9; i++) n[i].toArray(t, e + 3 * i);
			return t
		}
		static getBasisAt(t, e) {
			const n = t.x,
				i = t.y,
				r = t.z;
			e[0] = .282095, e[1] = .488603 * i, e[2] = .488603 * r, e[3] = .488603 * n, e[4] = 1.092548 * n * i, e[5] = 1.092548 * i * r, e[6] = .315392 * (3 * r * r - 1), e[7] = 1.092548 * n * r, e[8] = .546274 * (n * n - i * i)
		}
	}
	_g.prototype.isSphericalHarmonics3 = !0;
	class xg extends lg {
		constructor(t = new _g, e = 1) {
			super(void 0, e), this.sh = t
		}
		copy(t) {
			return super.copy(t), this.sh.copy(t.sh), this
		}
		fromJSON(t) {
			return this.intensity = t.intensity, this.sh.fromArray(t.sh), this
		}
		toJSON(t) {
			const e = super.toJSON(t);
			return e.object.sh = this.sh.toArray(), e
		}
	}
	xg.prototype.isLightProbe = !0;
	(class extends gh {
		constructor() {
			super(), this.type = "InstancedBufferGeometry", this.instanceCount = 1 / 0
		}
		copy(t) {
			return super.copy(t), this.instanceCount = t.instanceCount, this
		}
		clone() {
			return (new this.constructor).copy(this)
		}
		toJSON() {
			const t = super.toJSON(this);
			return t.instanceCount = this.instanceCount,
				t.isInstancedBufferGeometry = !0, t
		}
	}).prototype.isInstancedBufferGeometry = !0;
	let wg;
	(class extends ng {
		constructor(t) {
			super(t), "undefined" == typeof createImageBitmap && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), "undefined" == typeof fetch && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), this.options = {
				premultiplyAlpha: "none"
			}
		}
		setOptions(t) {
			return this.options = t, this
		}
		load(t, e, n, i) {
			void 0 === t && (t = ""), void 0 !== this.path && (t = this.path + t), t = this.manager.resolveURL(t);
			const r = this,
				s = tg.get(t);
			if (void 0 !== s) return r.manager.itemStart(t), setTimeout((function () {
				e && e(s), r.manager.itemEnd(t)
			}), 0), s;
			const a = {};
			a.credentials = "anonymous" === this.crossOrigin ? "same-origin" : "include", a.headers = this.requestHeader, fetch(t, a).then((function (t) {
				return t.blob()
			})).then((function (t) {
				return createImageBitmap(t, Object.assign(r.options, {
					colorSpaceConversion: "none"
				}))
			})).then((function (n) {
				tg.add(t, n), e && e(n), r.manager.itemEnd(t)
			})).catch((function (e) {
				i && i(e), r.manager.itemError(t), r.manager.itemEnd(t)
			})), r.manager.itemStart(t)
		}
	}).prototype.isImageBitmapLoader = !0;
	const bg = function () {
		return void 0 === wg && (wg = new(window.AudioContext || window.webkitAudioContext)), wg
	};
	class Mg extends ng {
		constructor(t) {
			super(t)
		}
		load(t, e, n, i) {
			const r = this,
				s = new rg(this.manager);
			s.setResponseType("arraybuffer"), s.setPath(this.path), s.setRequestHeader(this.requestHeader), s.setWithCredentials(this.withCredentials), s.load(t, (function (n) {
				try {
					const t = n.slice(0);
					bg().decodeAudioData(t, (function (t) {
						e(t)
					}))
				} catch (e) {
					i ? i(e) : console.error(e), r.manager.itemError(t)
				}
			}), n, i)
		}
	}(class extends xg {
		constructor(t, e, n = 1) {
			super(void 0, n);
			const i = (new eh).set(t),
				r = (new eh).set(e),
				s = new Il(i.r, i.g, i.b),
				a = new Il(r.r, r.g, r.b),
				o = Math.sqrt(Math.PI),
				l = o * Math.sqrt(.75);
			this.sh.coefficients[0].copy(s).add(a).multiplyScalar(o), this.sh.coefficients[1].copy(s).sub(a).multiplyScalar(l)
		}
	}).prototype.isHemisphereLightProbe = !0;
	(class extends xg {
		constructor(t, e = 1) {
			super(void 0, e);
			const n = (new eh).set(t);
			this.sh.coefficients[0].set(n.r, n.g, n.b).multiplyScalar(2 * Math.sqrt(Math.PI))
		}
	}).prototype.isAmbientLightProbe = !0;
	class Sg {
		constructor(t = !0) {
			this.autoStart = t, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
		}
		start() {
			this.startTime = Tg(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0
		}
		stop() {
			this.getElapsedTime(), this.running = !1, this.autoStart = !1
		}
		getElapsedTime() {
			return this.getDelta(), this.elapsedTime
		}
		getDelta() {
			let t = 0;
			if (this.autoStart && !this.running) return this.start(), 0;
			if (this.running) {
				const e = Tg();
				t = (e - this.oldTime) / 1e3, this.oldTime = e, this.elapsedTime += t
			}
			return t
		}
	}

	function Tg() {
		return ("undefined" == typeof performance ? Date : performance).now()
	}
	class Eg {
		constructor(t, e, n) {
			let i, r, s;
			switch (this.binding = t, this.valueSize = n, e) {
				case "quaternion":
					i = this._slerp, r = this._slerpAdditive, s = this._setAdditiveIdentityQuaternion, this.buffer = new Float64Array(6 * n), this._workIndex = 5;
					break;
				case "string":
				case "bool":
					i = this._select, r = this._select, s = this._setAdditiveIdentityOther, this.buffer = new Array(5 * n);
					break;
				default:
					i = this._lerp, r = this._lerpAdditive, s = this._setAdditiveIdentityNumeric, this.buffer = new Float64Array(5 * n)
			}
			this._mixBufferRegion = i, this._mixBufferRegionAdditive = r, this._setIdentity = s, this._origIndex = 3, this._addIndex = 4, this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, this.useCount = 0, this.referenceCount = 0
		}
		accumulate(t, e) {
			const n = this.buffer,
				i = this.valueSize,
				r = t * i + i;
			let s = this.cumulativeWeight;
			if (0 === s) {
				for (let t = 0; t !== i; ++t) n[r + t] = n[t];
				s = e
			} else {
				s += e;
				const t = e / s;
				this._mixBufferRegion(n, r, 0, t, i)
			}
			this.cumulativeWeight = s
		}
		accumulateAdditive(t) {
			const e = this.buffer,
				n = this.valueSize,
				i = n * this._addIndex;
			0 === this.cumulativeWeightAdditive && this._setIdentity(), this._mixBufferRegionAdditive(e, i, 0, t, n), this.cumulativeWeightAdditive += t
		}
		apply(t) {
			const e = this.valueSize,
				n = this.buffer,
				i = t * e + e,
				r = this.cumulativeWeight,
				s = this.cumulativeWeightAdditive,
				a = this.binding;
			if (this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, r < 1) {
				const t = e * this._origIndex;
				this._mixBufferRegion(n, i, t, 1 - r, e)
			}
			s > 0 && this._mixBufferRegionAdditive(n, i, this._addIndex * e, 1, e);
			for (let t = e, r = e + e; t !== r; ++t)
				if (n[t] !== n[t + e]) {
					a.setValue(n, i);
					break
				}
		}
		saveOriginalState() {
			const t = this.binding,
				e = this.buffer,
				n = this.valueSize,
				i = n * this._origIndex;
			t.getValue(e, i);
			for (let t = n, r = i; t !== r; ++t) e[t] = e[i + t % n];
			this._setIdentity(), this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0
		}
		restoreOriginalState() {
			const t = 3 * this.valueSize;
			this.binding.setValue(this.buffer, t)
		}
		_setAdditiveIdentityNumeric() {
			const t = this._addIndex * this.valueSize,
				e = t + this.valueSize;
			for (let n = t; n < e; n++) this.buffer[n] = 0
		}
		_setAdditiveIdentityQuaternion() {
			this._setAdditiveIdentityNumeric(), this.buffer[this._addIndex * this.valueSize + 3] = 1
		}
		_setAdditiveIdentityOther() {
			const t = this._origIndex * this.valueSize,
				e = this._addIndex * this.valueSize;
			for (let n = 0; n < this.valueSize; n++) this.buffer[e + n] = this.buffer[t + n]
		}
		_select(t, e, n, i, r) {
			if (i >= .5)
				for (let i = 0; i !== r; ++i) t[e + i] = t[n + i]
		}
		_slerp(t, e, n, i) {
			Dl.slerpFlat(t, e, t, e, t, n, i)
		}
		_slerpAdditive(t, e, n, i, r) {
			const s = this._workIndex * r;
			Dl.multiplyQuaternionsFlat(t, s, t, e, t, n), Dl.slerpFlat(t, e, t, e, t, s, i)
		}
		_lerp(t, e, n, i, r) {
			const s = 1 - i;
			for (let a = 0; a !== r; ++a) {
				const r = e + a;
				t[r] = t[r] * s + t[n + a] * i
			}
		}
		_lerpAdditive(t, e, n, i, r) {
			for (let s = 0; s !== r; ++s) {
				const r = e + s;
				t[r] = t[r] + t[n + s] * i
			}
		}
	}
	const Ag = "\\[\\]\\.:\\/",
		Lg = new RegExp("[\\[\\]\\.:\\/]", "g"),
		Cg = "[^\\[\\]\\.:\\/]",
		Rg = "[^" + Ag.replace("\\.", "") + "]",
		Pg = /((?:WC+[\/:])*)/.source.replace("WC", Cg),
		Dg = /(WCOD+)?/.source.replace("WCOD", Rg),
		Ig = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Cg),
		Og = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Cg),
		Ng = new RegExp("^" + Pg + Dg + Ig + Og + "$"),
		zg = ["material", "materials", "bones"];
	class Bg {
		constructor(t, e, n) {
			this.path = e, this.parsedPath = n || Bg.parseTrackName(e), this.node = Bg.findNode(t, this.parsedPath.nodeName) || t, this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound
		}
		static create(t, e, n) {
			return t && t.isAnimationObjectGroup ? new Bg.Composite(t, e, n) : new Bg(t, e, n)
		}
		static sanitizeNodeName(t) {
			return t.replace(/\s/g, "_").replace(Lg, "")
		}
		static parseTrackName(t) {
			const e = Ng.exec(t);
			if (!e) throw new Error("PropertyBinding: Cannot parse trackName: " + t);
			const n = {
					nodeName: e[2],
					objectName: e[3],
					objectIndex: e[4],
					propertyName: e[5],
					propertyIndex: e[6]
				},
				i = n.nodeName && n.nodeName.lastIndexOf(".");
			if (void 0 !== i && -1 !== i) {
				const t = n.nodeName.substring(i + 1); - 1 !== zg.indexOf(t) && (n.nodeName = n.nodeName.substring(0, i), n.objectName = t)
			}
			if (null === n.propertyName || 0 === n.propertyName.length) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + t);
			return n
		}
		static findNode(t, e) {
			if (!e || "" === e || "." === e || -1 === e || e === t.name || e === t.uuid) return t;
			if (t.skeleton) {
				const n = t.skeleton.getBoneByName(e);
				if (void 0 !== n) return n
			}
			if (t.children) {
				const n = function (t) {
						for (let i = 0; i < t.length; i++) {
							const r = t[i];
							if (r.name === e || r.uuid === e) return r;
							const s = n(r.children);
							if (s) return s
						}
						return null
					},
					i = n(t.children);
				if (i) return i
			}
			return null
		}
		_getValue_unavailable() {}
		_setValue_unavailable() {}
		_getValue_direct(t, e) {
			t[e] = this.targetObject[this.propertyName]
		}
		_getValue_array(t, e) {
			const n = this.resolvedProperty;
			for (let i = 0, r = n.length; i !== r; ++i) t[e++] = n[i]
		}
		_getValue_arrayElement(t, e) {
			t[e] = this.resolvedProperty[this.propertyIndex]
		}
		_getValue_toArray(t, e) {
			this.resolvedProperty.toArray(t, e)
		}
		_setValue_direct(t, e) {
			this.targetObject[this.propertyName] = t[e]
		}
		_setValue_direct_setNeedsUpdate(t, e) {
			this.targetObject[this.propertyName] = t[e], this.targetObject.needsUpdate = !0
		}
		_setValue_direct_setMatrixWorldNeedsUpdate(t, e) {
			this.targetObject[this.propertyName] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0
		}
		_setValue_array(t, e) {
			const n = this.resolvedProperty;
			for (let i = 0, r = n.length; i !== r; ++i) n[i] = t[e++]
		}
		_setValue_array_setNeedsUpdate(t, e) {
			const n = this.resolvedProperty;
			for (let i = 0, r = n.length; i !== r; ++i) n[i] = t[e++];
			this.targetObject.needsUpdate = !0
		}
		_setValue_array_setMatrixWorldNeedsUpdate(t, e) {
			const n = this.resolvedProperty;
			for (let i = 0, r = n.length; i !== r; ++i) n[i] = t[e++];
			this.targetObject.matrixWorldNeedsUpdate = !0
		}
		_setValue_arrayElement(t, e) {
			this.resolvedProperty[this.propertyIndex] = t[e]
		}
		_setValue_arrayElement_setNeedsUpdate(t, e) {
			this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.needsUpdate = !0
		}
		_setValue_arrayElement_setMatrixWorldNeedsUpdate(t, e) {
			this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0
		}
		_setValue_fromArray(t, e) {
			this.resolvedProperty.fromArray(t, e)
		}
		_setValue_fromArray_setNeedsUpdate(t, e) {
			this.resolvedProperty.fromArray(t, e), this.targetObject.needsUpdate = !0
		}
		_setValue_fromArray_setMatrixWorldNeedsUpdate(t, e) {
			this.resolvedProperty.fromArray(t, e), this.targetObject.matrixWorldNeedsUpdate = !0
		}
		_getValue_unbound(t, e) {
			this.bind(), this.getValue(t, e)
		}
		_setValue_unbound(t, e) {
			this.bind(), this.setValue(t, e)
		}
		bind() {
			let t = this.node;
			const e = this.parsedPath,
				n = e.objectName,
				i = e.propertyName;
			let r = e.propertyIndex;
			if (t || (t = Bg.findNode(this.rootNode, e.nodeName) || this.rootNode, this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) return void console.error("THREE.PropertyBinding: Trying to update node for track: " + this.path + " but it wasn't found.");
			if (n) {
				let i = e.objectIndex;
				switch (n) {
					case "materials":
						if (!t.material) return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
						if (!t.material.materials) return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
						t = t.material.materials;
						break;
					case "bones":
						if (!t.skeleton) return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
						t = t.skeleton.bones;
						for (let e = 0; e < t.length; e++)
							if (t[e].name === i) {
								i = e;
								break
							} break;
					default:
						if (void 0 === t[n]) return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
						t = t[n]
				}
				if (void 0 !== i) {
					if (void 0 === t[i]) return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
					t = t[i]
				}
			}
			const s = t[i];
			if (void 0 === s) {
				const n = e.nodeName;
				return void console.error("THREE.PropertyBinding: Trying to update property for track: " + n + "." + i + " but it wasn't found.", t)
			}
			let a = this.Versioning.None;
			this.targetObject = t, void 0 !== t.needsUpdate ? a = this.Versioning.NeedsUpdate : void 0 !== t.matrixWorldNeedsUpdate && (a = this.Versioning.MatrixWorldNeedsUpdate);
			let o = this.BindingType.Direct;
			if (void 0 !== r) {
				if ("morphTargetInfluences" === i) {
					if (!t.geometry) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
					if (!t.geometry.isBufferGeometry) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.", this);
					if (!t.geometry.morphAttributes) return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
					void 0 !== t.morphTargetDictionary[r] && (r = t.morphTargetDictionary[r])
				}
				o = this.BindingType.ArrayElement, this.resolvedProperty = s, this.propertyIndex = r
			} else void 0 !== s.fromArray && void 0 !== s.toArray ? (o = this.BindingType.HasFromToArray, this.resolvedProperty = s) : Array.isArray(s) ? (o = this.BindingType.EntireArray, this.resolvedProperty = s) : this.propertyName = i;
			this.getValue = this.GetterByBindingType[o], this.setValue = this.SetterByBindingTypeAndVersioning[o][a]
		}
		unbind() {
			this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound
		}
	}
	Bg.Composite = class {
		constructor(t, e, n) {
			const i = n || Bg.parseTrackName(e);
			this._targetGroup = t, this._bindings = t.subscribe_(e, i)
		}
		getValue(t, e) {
			this.bind();
			const n = this._targetGroup.nCachedObjects_,
				i = this._bindings[n];
			void 0 !== i && i.getValue(t, e)
		}
		setValue(t, e) {
			const n = this._bindings;
			for (let i = this._targetGroup.nCachedObjects_, r = n.length; i !== r; ++i) n[i].setValue(t, e)
		}
		bind() {
			const t = this._bindings;
			for (let e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) t[e].bind()
		}
		unbind() {
			const t = this._bindings;
			for (let e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) t[e].unbind()
		}
	}, Bg.prototype.BindingType = {
		Direct: 0,
		EntireArray: 1,
		ArrayElement: 2,
		HasFromToArray: 3
	}, Bg.prototype.Versioning = {
		None: 0,
		NeedsUpdate: 1,
		MatrixWorldNeedsUpdate: 2
	}, Bg.prototype.GetterByBindingType = [Bg.prototype._getValue_direct, Bg.prototype._getValue_array, Bg.prototype._getValue_arrayElement, Bg.prototype._getValue_toArray], Bg.prototype.SetterByBindingTypeAndVersioning = [
		[Bg.prototype._setValue_direct, Bg.prototype._setValue_direct_setNeedsUpdate, Bg.prototype._setValue_direct_setMatrixWorldNeedsUpdate],
		[Bg.prototype._setValue_array, Bg.prototype._setValue_array_setNeedsUpdate, Bg.prototype._setValue_array_setMatrixWorldNeedsUpdate],
		[Bg.prototype._setValue_arrayElement, Bg.prototype._setValue_arrayElement_setNeedsUpdate, Bg.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],
		[Bg.prototype._setValue_fromArray, Bg.prototype._setValue_fromArray_setNeedsUpdate, Bg.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]
	];
	class Fg {
		constructor(t, e, n = null, i = e.blendMode) {
			this._mixer = t, this._clip = e, this._localRoot = n, this.blendMode = i;
			const r = e.tracks,
				s = r.length,
				a = new Array(s),
				o = {
					endingStart: Ko,
					endingEnd: Ko
				};
			for (let t = 0; t !== s; ++t) {
				const e = r[t].createInterpolant(null);
				a[t] = e, e.settings = o
			}
			this._interpolantSettings = o, this._interpolants = a, this._propertyBindings = new Array(s), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._weightInterpolant = null, this.loop = 2201, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0
		}
		play() {
			return this._mixer._activateAction(this), this
		}
		stop() {
			return this._mixer._deactivateAction(this), this.reset()
		}
		reset() {
			return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping()
		}
		isRunning() {
			return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this)
		}
		isScheduled() {
			return this._mixer._isActiveAction(this)
		}
		startAt(t) {
			return this._startTime = t, this
		}
		setLoop(t, e) {
			return this.loop = t, this.repetitions = e, this
		}
		setEffectiveWeight(t) {
			return this.weight = t, this._effectiveWeight = this.enabled ? t : 0, this.stopFading()
		}
		getEffectiveWeight() {
			return this._effectiveWeight
		}
		fadeIn(t) {
			return this._scheduleFading(t, 0, 1)
		}
		fadeOut(t) {
			return this._scheduleFading(t, 1, 0)
		}
		crossFadeFrom(t, e, n) {
			if (t.fadeOut(e), this.fadeIn(e), n) {
				const n = this._clip.duration,
					i = t._clip.duration,
					r = i / n,
					s = n / i;
				t.warp(1, r, e), this.warp(s, 1, e)
			}
			return this
		}
		crossFadeTo(t, e, n) {
			return t.crossFadeFrom(this, e, n)
		}
		stopFading() {
			const t = this._weightInterpolant;
			return null !== t && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(t)), this
		}
		setEffectiveTimeScale(t) {
			return this.timeScale = t, this._effectiveTimeScale = this.paused ? 0 : t, this.stopWarping()
		}
		getEffectiveTimeScale() {
			return this._effectiveTimeScale
		}
		setDuration(t) {
			return this.timeScale = this._clip.duration / t, this.stopWarping()
		}
		syncWith(t) {
			return this.time = t.time, this.timeScale = t.timeScale, this.stopWarping()
		}
		halt(t) {
			return this.warp(this._effectiveTimeScale, 0, t)
		}
		warp(t, e, n) {
			const i = this._mixer,
				r = i.time,
				s = this.timeScale;
			let a = this._timeScaleInterpolant;
			null === a && (a = i._lendControlInterpolant(), this._timeScaleInterpolant = a);
			const o = a.parameterPositions,
				l = a.sampleValues;
			return o[0] = r, o[1] = r + n, l[0] = t / s, l[1] = e / s, this
		}
		stopWarping() {
			const t = this._timeScaleInterpolant;
			return null !== t && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(t)), this
		}
		getMixer() {
			return this._mixer
		}
		getClip() {
			return this._clip
		}
		getRoot() {
			return this._localRoot || this._mixer._root
		}
		_update(t, e, n, i) {
			if (!this.enabled) return void this._updateWeight(t);
			const r = this._startTime;
			if (null !== r) {
				const i = (t - r) * n;
				if (i < 0 || 0 === n) return;
				this._startTime = null, e = n * i
			}
			e *= this._updateTimeScale(t);
			const s = this._updateTime(e),
				a = this._updateWeight(t);
			if (a > 0) {
				const t = this._interpolants,
					e = this._propertyBindings;
				if (2501 === this.blendMode)
					for (let n = 0, i = t.length; n !== i; ++n) t[n].evaluate(s), e[n].accumulateAdditive(a);
				else
					for (let n = 0, r = t.length; n !== r; ++n) t[n].evaluate(s), e[n].accumulate(i, a)
			}
		}
		_updateWeight(t) {
			let e = 0;
			if (this.enabled) {
				e = this.weight;
				const n = this._weightInterpolant;
				if (null !== n) {
					const i = n.evaluate(t)[0];
					e *= i, t > n.parameterPositions[1] && (this.stopFading(), 0 === i && (this.enabled = !1))
				}
			}
			return this._effectiveWeight = e, e
		}
		_updateTimeScale(t) {
			let e = 0;
			if (!this.paused) {
				e = this.timeScale;
				const n = this._timeScaleInterpolant;
				if (null !== n) {
					e *= n.evaluate(t)[0], t > n.parameterPositions[1] && (this.stopWarping(), 0 === e ? this.paused = !0 : this.timeScale = e)
				}
			}
			return this._effectiveTimeScale = e, e
		}
		_updateTime(t) {
			const e = this._clip.duration,
				n = this.loop;
			let i = this.time + t,
				r = this._loopCount;
			const s = 2202 === n;
			if (0 === t) return -1 === r ? i : s && 1 == (1 & r) ? e - i : i;
			if (2200 === n) {
				-1 === r && (this._loopCount = 0, this._setEndings(!0, !0, !1));
				t: {
					if (i >= e) i = e;
					else {
						if (!(i < 0)) {
							this.time = i;
							break t
						}
						i = 0
					}
					this.clampWhenFinished ? this.paused = !0 : this.enabled = !1,
					this.time = i,
					this._mixer.dispatchEvent({
						type: "finished",
						action: this,
						direction: t < 0 ? -1 : 1
					})
				}
			} else {
				if (-1 === r && (t >= 0 ? (r = 0, this._setEndings(!0, 0 === this.repetitions, s)) : this._setEndings(0 === this.repetitions, !0, s)), i >= e || i < 0) {
					const n = Math.floor(i / e);
					i -= e * n, r += Math.abs(n);
					const a = this.repetitions - r;
					if (a <= 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, i = t > 0 ? e : 0, this.time = i, this._mixer.dispatchEvent({
						type: "finished",
						action: this,
						direction: t > 0 ? 1 : -1
					});
					else {
						if (1 === a) {
							const e = t < 0;
							this._setEndings(e, !e, s)
						} else this._setEndings(!1, !1, s);
						this._loopCount = r, this.time = i, this._mixer.dispatchEvent({
							type: "loop",
							action: this,
							loopDelta: n
						})
					}
				} else this.time = i;
				if (s && 1 == (1 & r)) return e - i
			}
			return i
		}
		_setEndings(t, e, n) {
			const i = this._interpolantSettings;
			n ? (i.endingStart = $o, i.endingEnd = $o) : (i.endingStart = t ? this.zeroSlopeAtStart ? $o : Ko : tl, i.endingEnd = e ? this.zeroSlopeAtEnd ? $o : Ko : tl)
		}
		_scheduleFading(t, e, n) {
			const i = this._mixer,
				r = i.time;
			let s = this._weightInterpolant;
			null === s && (s = i._lendControlInterpolant(), this._weightInterpolant = s);
			const a = s.parameterPositions,
				o = s.sampleValues;
			return a[0] = r, o[0] = e, a[1] = r + t, o[1] = n, this
		}
	}(class extends hl {
		constructor(t) {
			super(), this._root = t, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1
		}
		_bindAction(t, e) {
			const n = t._localRoot || this._root,
				i = t._clip.tracks,
				r = i.length,
				s = t._propertyBindings,
				a = t._interpolants,
				o = n.uuid,
				l = this._bindingsByRootAndName;
			let c = l[o];
			void 0 === c && (c = {}, l[o] = c);
			for (let t = 0; t !== r; ++t) {
				const r = i[t],
					l = r.name;
				let h = c[l];
				if (void 0 !== h) s[t] = h;
				else {
					if (h = s[t], void 0 !== h) {
						null === h._cacheIndex && (++h.referenceCount, this._addInactiveBinding(h, o, l));
						continue
					}
					const i = e && e._propertyBindings[t].binding.parsedPath;
					h = new Eg(Bg.create(n, l, i), r.ValueTypeName, r.getValueSize()), ++h.referenceCount, this._addInactiveBinding(h, o, l), s[t] = h
				}
				a[t].resultBuffer = h.buffer
			}
		}
		_activateAction(t) {
			if (!this._isActiveAction(t)) {
				if (null === t._cacheIndex) {
					const e = (t._localRoot || this._root).uuid,
						n = t._clip.uuid,
						i = this._actionsByClip[n];
					this._bindAction(t, i && i.knownActions[0]), this._addInactiveAction(t, n, e)
				}
				const e = t._propertyBindings;
				for (let t = 0, n = e.length; t !== n; ++t) {
					const n = e[t];
					0 == n.useCount++ && (this._lendBinding(n), n.saveOriginalState())
				}
				this._lendAction(t)
			}
		}
		_deactivateAction(t) {
			if (this._isActiveAction(t)) {
				const e = t._propertyBindings;
				for (let t = 0, n = e.length; t !== n; ++t) {
					const n = e[t];
					0 == --n.useCount && (n.restoreOriginalState(), this._takeBackBinding(n))
				}
				this._takeBackAction(t)
			}
		}
		_initMemoryManager() {
			this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
			const t = this;
			this.stats = {
				actions: {
					get total() {
						return t._actions.length
					},
					get inUse() {
						return t._nActiveActions
					}
				},
				bindings: {
					get total() {
						return t._bindings.length
					},
					get inUse() {
						return t._nActiveBindings
					}
				},
				controlInterpolants: {
					get total() {
						return t._controlInterpolants.length
					},
					get inUse() {
						return t._nActiveControlInterpolants
					}
				}
			}
		}
		_isActiveAction(t) {
			const e = t._cacheIndex;
			return null !== e && e < this._nActiveActions
		}
		_addInactiveAction(t, e, n) {
			const i = this._actions,
				r = this._actionsByClip;
			let s = r[e];
			if (void 0 === s) s = {
				knownActions: [t],
				actionByRoot: {}
			}, t._byClipCacheIndex = 0, r[e] = s;
			else {
				const e = s.knownActions;
				t._byClipCacheIndex = e.length, e.push(t)
			}
			t._cacheIndex = i.length, i.push(t), s.actionByRoot[n] = t
		}
		_removeInactiveAction(t) {
			const e = this._actions,
				n = e[e.length - 1],
				i = t._cacheIndex;
			n._cacheIndex = i, e[i] = n, e.pop(), t._cacheIndex = null;
			const r = t._clip.uuid,
				s = this._actionsByClip,
				a = s[r],
				o = a.knownActions,
				l = o[o.length - 1],
				c = t._byClipCacheIndex;
			l._byClipCacheIndex = c, o[c] = l, o.pop(), t._byClipCacheIndex = null;
			delete a.actionByRoot[(t._localRoot || this._root).uuid], 0 === o.length && delete s[r], this._removeInactiveBindingsForAction(t)
		}
		_removeInactiveBindingsForAction(t) {
			const e = t._propertyBindings;
			for (let t = 0, n = e.length; t !== n; ++t) {
				const n = e[t];
				0 == --n.referenceCount && this._removeInactiveBinding(n)
			}
		}
		_lendAction(t) {
			const e = this._actions,
				n = t._cacheIndex,
				i = this._nActiveActions++,
				r = e[i];
			t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
		}
		_takeBackAction(t) {
			const e = this._actions,
				n = t._cacheIndex,
				i = --this._nActiveActions,
				r = e[i];
			t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
		}
		_addInactiveBinding(t, e, n) {
			const i = this._bindingsByRootAndName,
				r = this._bindings;
			let s = i[e];
			void 0 === s && (s = {}, i[e] = s), s[n] = t, t._cacheIndex = r.length, r.push(t)
		}
		_removeInactiveBinding(t) {
			const e = this._bindings,
				n = t.binding,
				i = n.rootNode.uuid,
				r = n.path,
				s = this._bindingsByRootAndName,
				a = s[i],
				o = e[e.length - 1],
				l = t._cacheIndex;
			o._cacheIndex = l, e[l] = o, e.pop(), delete a[r], 0 === Object.keys(a).length && delete s[i]
		}
		_lendBinding(t) {
			const e = this._bindings,
				n = t._cacheIndex,
				i = this._nActiveBindings++,
				r = e[i];
			t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
		}
		_takeBackBinding(t) {
			const e = this._bindings,
				n = t._cacheIndex,
				i = --this._nActiveBindings,
				r = e[i];
			t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
		}
		_lendControlInterpolant() {
			const t = this._controlInterpolants,
				e = this._nActiveControlInterpolants++;
			let n = t[e];
			return void 0 === n && (n = new Gf(new Float32Array(2), new Float32Array(2), 1, this._controlInterpolantsResultBuffer), n.__cacheIndex = e, t[e] = n), n
		}
		_takeBackControlInterpolant(t) {
			const e = this._controlInterpolants,
				n = t.__cacheIndex,
				i = --this._nActiveControlInterpolants,
				r = e[i];
			t.__cacheIndex = i, e[i] = t, r.__cacheIndex = n, e[n] = r
		}
		clipAction(t, e, n) {
			const i = e || this._root,
				r = i.uuid;
			let s = "string" == typeof t ? Kf.findByName(i, t) : t;
			const a = null !== s ? s.uuid : t,
				o = this._actionsByClip[a];
			let l = null;
			if (void 0 === n && (n = null !== s ? s.blendMode : el), void 0 !== o) {
				const t = o.actionByRoot[r];
				if (void 0 !== t && t.blendMode === n) return t;
				l = o.knownActions[0], null === s && (s = l._clip)
			}
			if (null === s) return null;
			const c = new Fg(this, s, e, n);
			return this._bindAction(c, l), this._addInactiveAction(c, a, r), c
		}
		existingAction(t, e) {
			const n = e || this._root,
				i = n.uuid,
				r = "string" == typeof t ? Kf.findByName(n, t) : t,
				s = r ? r.uuid : t,
				a = this._actionsByClip[s];
			return void 0 !== a && a.actionByRoot[i] || null
		}
		stopAllAction() {
			const t = this._actions;
			for (let e = this._nActiveActions - 1; e >= 0; --e) t[e].stop();
			return this
		}
		update(t) {
			t *= this.timeScale;
			const e = this._actions,
				n = this._nActiveActions,
				i = this.time += t,
				r = Math.sign(t),
				s = this._accuIndex ^= 1;
			for (let a = 0; a !== n; ++a) {
				e[a]._update(i, t, r, s)
			}
			const a = this._bindings,
				o = this._nActiveBindings;
			for (let t = 0; t !== o; ++t) a[t].apply(s);
			return this
		}
		setTime(t) {
			this.time = 0;
			for (let t = 0; t < this._actions.length; t++) this._actions[t].time = 0;
			return this.update(t)
		}
		getRoot() {
			return this._root
		}
		uncacheClip(t) {
			const e = this._actions,
				n = t.uuid,
				i = this._actionsByClip,
				r = i[n];
			if (void 0 !== r) {
				const t = r.knownActions;
				for (let n = 0, i = t.length; n !== i; ++n) {
					const i = t[n];
					this._deactivateAction(i);
					const r = i._cacheIndex,
						s = e[e.length - 1];
					i._cacheIndex = null, i._byClipCacheIndex = null, s._cacheIndex = r, e[r] = s, e.pop(), this._removeInactiveBindingsForAction(i)
				}
				delete i[n]
			}
		}
		uncacheRoot(t) {
			const e = t.uuid,
				n = this._actionsByClip;
			for (const t in n) {
				const i = n[t].actionByRoot[e];
				void 0 !== i && (this._deactivateAction(i), this._removeInactiveAction(i))
			}
			const i = this._bindingsByRootAndName[e];
			if (void 0 !== i)
				for (const t in i) {
					const e = i[t];
					e.restoreOriginalState(), this._removeInactiveBinding(e)
				}
		}
		uncacheAction(t, e) {
			const n = this.existingAction(t, e);
			null !== n && (this._deactivateAction(n), this._removeInactiveAction(n))
		}
	}).prototype._controlInterpolantsResultBuffer = new Float32Array(1);
	(class extends jp {
		constructor(t, e, n = 1) {
			super(t, e), this.meshPerAttribute = n
		}
		copy(t) {
			return super.copy(t), this.meshPerAttribute = t.meshPerAttribute, this
		}
		clone(t) {
			const e = super.clone(t);
			return e.meshPerAttribute = this.meshPerAttribute, e
		}
		toJSON(t) {
			const e = super.toJSON(t);
			return e.isInstancedInterleavedBuffer = !0, e.meshPerAttribute = this.meshPerAttribute, e
		}
	}).prototype.isInstancedInterleavedBuffer = !0;
	const kg = new Il,
		Ug = new hc,
		Hg = new hc;

	function Gg(t) {
		const e = [];
		t && t.isBone && e.push(t);
		for (let n = 0; n < t.children.length; n++) e.push.apply(e, Gg(t.children[n]));
		return e
	}
	const Vg = new Float32Array(1);
	new Int32Array(Vg.buffer), Fm.create = function (t, e) {
			return console.log("THREE.Curve.create() has been deprecated"), t.prototype = Object.create(Fm.prototype), t.prototype.constructor = t, t.prototype.getPoint = e, t
		}, sf.prototype.fromPoints = function (t) {
			return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."), this.setFromPoints(t)
		}, class extends Rm {
			constructor(t = 10, e = 10, n = 4473924, i = 8947848) {
				n = new eh(n), i = new eh(i);
				const r = e / 2,
					s = t / e,
					a = t / 2,
					o = [],
					l = [];
				for (let t = 0, c = 0, h = -a; t <= e; t++, h += s) {
					o.push(-a, 0, h, a, 0, h), o.push(h, 0, -a, h, 0, a);
					const e = t === r ? n : i;
					e.toArray(l, c), c += 3, e.toArray(l, c), c += 3, e.toArray(l, c), c += 3, e.toArray(l, c), c += 3
				}
				const c = new gh;
				c.setAttribute("position", new lh(o, 3)), c.setAttribute("color", new lh(l, 3));
				super(c, new wm({
					vertexColors: !0,
					toneMapped: !1
				})), this.type = "GridHelper"
			}
		}.prototype.setColors = function () {
			console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")
		}, class extends Rm {
			constructor(t) {
				const e = Gg(t),
					n = new gh,
					i = [],
					r = [],
					s = new eh(0, 0, 1),
					a = new eh(0, 1, 0);
				for (let t = 0; t < e.length; t++) {
					const n = e[t];
					n.parent && n.parent.isBone && (i.push(0, 0, 0), i.push(0, 0, 0), r.push(s.r, s.g, s.b), r.push(a.r, a.g, a.b))
				}
				n.setAttribute("position", new lh(i, 3)), n.setAttribute("color", new lh(r, 3));
				super(n, new wm({
					vertexColors: !0,
					depthTest: !1,
					depthWrite: !1,
					toneMapped: !1,
					transparent: !0
				})), this.type = "SkeletonHelper", this.isSkeletonHelper = !0, this.root = t, this.bones = e, this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1
			}
			updateMatrixWorld(t) {
				const e = this.bones,
					n = this.geometry,
					i = n.getAttribute("position");
				Hg.copy(this.root.matrixWorld).invert();
				for (let t = 0, n = 0; t < e.length; t++) {
					const r = e[t];
					r.parent && r.parent.isBone && (Ug.multiplyMatrices(Hg, r.matrixWorld), kg.setFromMatrixPosition(Ug), i.setXYZ(n, kg.x, kg.y, kg.z), Ug.multiplyMatrices(Hg, r.parent.matrixWorld), kg.setFromMatrixPosition(Ug), i.setXYZ(n + 1, kg.x, kg.y, kg.z), n += 2)
				}
				n.getAttribute("position").needsUpdate = !0, super.updateMatrixWorld(t)
			}
		}.prototype.update = function () {
			console.error("THREE.SkeletonHelper: update() no longer needs to be called.")
		}, ng.prototype.extractUrlBase = function (t) {
			return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."), class {
				static decodeText(t) {
					if ("undefined" != typeof TextDecoder) return (new TextDecoder).decode(t);
					let e = "";
					for (let n = 0, i = t.length; n < i; n++) e += String.fromCharCode(t[n]);
					try {
						return decodeURIComponent(escape(e))
					} catch (t) {
						return e
					}
				}
				static extractUrlBase(t) {
					const e = t.lastIndexOf("/");
					return -1 === e ? "./" : t.substr(0, e + 1)
				}
				static resolveURL(t, e) {
					return "string" != typeof t || "" === t ? "" : (/^https?:\/\//i.test(e) && /^\//.test(t) && (e = e.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(t) || /^data:.*,.*$/i.test(t) || /^blob:.*$/i.test(t) ? t : e + t)
				}
			}.extractUrlBase(t)
		}, ng.Handlers = {
			add: function () {
				console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.")
			},
			get: function () {
				console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.")
			}
		}, zl.prototype.center = function (t) {
			return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."), this.getCenter(t)
		}, zl.prototype.empty = function () {
			return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."), this.isEmpty()
		}, zl.prototype.isIntersectionBox = function (t) {
			return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t)
		}, zl.prototype.isIntersectionSphere = function (t) {
			return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(t)
		}, zl.prototype.size = function (t) {
			return console.warn("THREE.Box3: .size() has been renamed to .getSize()."), this.getSize(t)
		}, ec.prototype.empty = function () {
			return console.warn("THREE.Sphere: .empty() has been renamed to .isEmpty()."), this.isEmpty()
		}, $h.prototype.setFromMatrix = function (t) {
			return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."), this.setFromProjectionMatrix(t)
		}, xl.prototype.flattenToArrayOffset = function (t, e) {
			return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(t, e)
		}, xl.prototype.multiplyVector3 = function (t) {
			return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), t.applyMatrix3(this)
		}, xl.prototype.multiplyVector3Array = function () {
			console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")
		}, xl.prototype.applyToBufferAttribute = function (t) {
			return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."), t.applyMatrix3(this)
		}, xl.prototype.applyToVector3Array = function () {
			console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")
		}, xl.prototype.getInverse = function (t) {
			return console.warn("THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."), this.copy(t).invert()
		}, hc.prototype.extractPosition = function (t) {
			return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(t)
		}, hc.prototype.flattenToArrayOffset = function (t, e) {
			return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(t, e)
		}, hc.prototype.getPosition = function () {
			return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."), (new Il).setFromMatrixColumn(this, 3)
		}, hc.prototype.setRotationFromQuaternion = function (t) {
			return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(t)
		}, hc.prototype.multiplyToArray = function () {
			console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")
		}, hc.prototype.multiplyVector3 = function (t) {
			return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
		}, hc.prototype.multiplyVector4 = function (t) {
			return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
		}, hc.prototype.multiplyVector3Array = function () {
			console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")
		}, hc.prototype.rotateAxis = function (t) {
			console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), t.transformDirection(this)
		}, hc.prototype.crossVector = function (t) {
			return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
		}, hc.prototype.translate = function () {
			console.error("THREE.Matrix4: .translate() has been removed.")
		}, hc.prototype.rotateX = function () {
			console.error("THREE.Matrix4: .rotateX() has been removed.")
		}, hc.prototype.rotateY = function () {
			console.error("THREE.Matrix4: .rotateY() has been removed.")
		}, hc.prototype.rotateZ = function () {
			console.error("THREE.Matrix4: .rotateZ() has been removed.")
		}, hc.prototype.rotateByAxis = function () {
			console.error("THREE.Matrix4: .rotateByAxis() has been removed.")
		},
		hc.prototype.applyToBufferAttribute = function (t) {
			return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
		}, hc.prototype.applyToVector3Array = function () {
			console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")
		}, hc.prototype.makeFrustum = function (t, e, n, i, r, s) {
			return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."), this.makePerspective(t, e, i, n, r, s)
		}, hc.prototype.getInverse = function (t) {
			return console.warn("THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."), this.copy(t).invert()
		}, Zh.prototype.isIntersectionLine = function (t) {
			return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."), this.intersectsLine(t)
		}, Dl.prototype.multiplyVector3 = function (t) {
			return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), t.applyQuaternion(this)
		}, Dl.prototype.inverse = function () {
			return console.warn("THREE.Quaternion: .inverse() has been renamed to invert()."), this.invert()
		}, cc.prototype.isIntersectionBox = function (t) {
			return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t)
		}, cc.prototype.isIntersectionPlane = function (t) {
			return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."), this.intersectsPlane(t)
		}, cc.prototype.isIntersectionSphere = function (t) {
			return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(t)
		}, jc.prototype.area = function () {
			return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."), this.getArea()
		}, jc.prototype.barycoordFromPoint = function (t, e) {
			return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."), this.getBarycoord(t, e)
		}, jc.prototype.midpoint = function (t) {
			return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."), this.getMidpoint(t)
		}, jc.prototypenormal = function (t) {
			return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."), this.getNormal(t)
		}, jc.prototype.plane = function (t) {
			return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."), this.getPlane(t)
		}, jc.barycoordFromPoint = function (t, e, n, i, r) {
			return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."), jc.getBarycoord(t, e, n, i, r)
		}, jc.normal = function (t, e, n, i) {
			return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."), jc.getNormal(t, e, n, i)
		}, af.prototype.extractAllPoints = function (t) {
			return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."), this.extractPoints(t)
		}, af.prototype.extrude = function (t) {
			return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."), new Nf(this, t)
		}, af.prototype.makeGeometry = function (t) {
			return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."), new Bf(this, t)
		}, _l.prototype.fromAttribute = function (t, e, n) {
			return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(t, e, n)
		}, _l.prototype.distanceToManhattan = function (t) {
			return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."), this.manhattanDistanceTo(t)
		}, _l.prototype.lengthManhattan = function () {
			return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength()
		}, Il.prototype.setEulerFromRotationMatrix = function () {
			console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
		}, Il.prototype.setEulerFromQuaternion = function () {
			console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
		}, Il.prototype.getPositionFromMatrix = function (t) {
			return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(t)
		}, Il.prototype.getScaleFromMatrix = function (t) {
			return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(t)
		}, Il.prototype.getColumnFromMatrix = function (t, e) {
			return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(e, t)
		}, Il.prototype.applyProjection = function (t) {
			return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."), this.applyMatrix4(t)
		}, Il.prototype.fromAttribute = function (t, e, n) {
			return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(t, e, n)
		}, Il.prototype.distanceToManhattan = function (t) {
			return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."), this.manhattanDistanceTo(t)
		}, Il.prototype.lengthManhattan = function () {
			return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength()
		}, Cl.prototype.fromAttribute = function (t, e, n) {
			return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."), this.fromBufferAttribute(t, e, n)
		}, Cl.prototype.lengthManhattan = function () {
			return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."), this.manhattanLength()
		}, Nc.prototype.getChildByName = function (t) {
			return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(t)
		}, Nc.prototype.renderDepth = function () {
			console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")
		}, Nc.prototype.translate = function (t, e) {
			return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(e, t)
		}, Nc.prototype.getWorldRotation = function () {
			console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")
		}, Nc.prototype.applyMatrix = function (t) {
			return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."), this.applyMatrix4(t)
		}, Object.defineProperties(Nc.prototype, {
			eulerOrder: {
				get: function () {
					return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order
				},
				set: function (t) {
					console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order = t
				}
			},
			useQuaternion: {
				get: function () {
					console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
				},
				set: function () {
					console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
				}
			}
		}), Oh.prototype.setDrawMode = function () {
			console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")
		}, Object.defineProperties(Oh.prototype, {
			drawMode: {
				get: function () {
					return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."), 0
				},
				set: function () {
					console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")
				}
			}
		}), fm.prototype.initBones = function () {
			console.error("THREE.SkinnedMesh: initBones() has been removed.")
		}, Gh.prototype.setLens = function (t, e) {
			console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."), void 0 !== e && (this.filmGauge = e), this.setFocalLength(t)
		}, Object.defineProperties(lg.prototype, {
			onlyShadow: {
				set: function () {
					console.warn("THREE.Light: .onlyShadow has been removed.")
				}
			},
			shadowCameraFov: {
				set: function (t) {
					console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."), this.shadow.camera.fov = t
				}
			},
			shadowCameraLeft: {
				set: function (t) {
					console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."), this.shadow.camera.left = t
				}
			},
			shadowCameraRight: {
				set: function (t) {
					console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."), this.shadow.camera.right = t
				}
			},
			shadowCameraTop: {
				set: function (t) {
					console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."), this.shadow.camera.top = t
				}
			},
			shadowCameraBottom: {
				set: function (t) {
					console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."), this.shadow.camera.bottom = t
				}
			},
			shadowCameraNear: {
				set: function (t) {
					console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."), this.shadow.camera.near = t
				}
			},
			shadowCameraFar: {
				set: function (t) {
					console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."), this.shadow.camera.far = t
				}
			},
			shadowCameraVisible: {
				set: function () {
					console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")
				}
			},
			shadowBias: {
				set: function (t) {
					console.warn("THREE.Light: .shadowBias is now .shadow.bias."), this.shadow.bias = t
				}
			},
			shadowDarkness: {
				set: function () {
					console.warn("THREE.Light: .shadowDarkness has been removed.")
				}
			},
			shadowMapWidth: {
				set: function (t) {
					console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."), this.shadow.mapSize.width = t
				}
			},
			shadowMapHeight: {
				set: function (t) {
					console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."), this.shadow.mapSize.height = t
				}
			}
		}), Object.defineProperties(sh.prototype, {
			length: {
				get: function () {
					return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."), this.array.length
				}
			},
			dynamic: {
				get: function () {
					return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."), this.usage === ll
				},
				set: function () {
					console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."), this.setUsage(ll)
				}
			}
		}), sh.prototype.setDynamic = function (t) {
			return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."), this.setUsage(!0 === t ? ll : ol), this
		}, sh.prototype.copyIndicesArray = function () {
			console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")
		}, sh.prototype.setArray = function () {
			console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")
		}, gh.prototype.addIndex = function (t) {
			console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."), this.setIndex(t)
		}, gh.prototype.addAttribute = function (t, e) {
			return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."), e && e.isBufferAttribute || e && e.isInterleavedBufferAttribute ? "index" === t ? (console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), this.setIndex(e), this) : this.setAttribute(t, e) : (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), this.setAttribute(t, new sh(e, arguments[2])))
		}, gh.prototype.addDrawCall = function (t, e, n) {
			void 0 !== n && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."), console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."), this.addGroup(t, e)
		}, gh.prototype.clearDrawCalls = function () {
			console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."), this.clearGroups()
		}, gh.prototype.computeOffsets = function () {
			console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")
		}, gh.prototype.removeAttribute = function (t) {
			return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."), this.deleteAttribute(t)
		}, gh.prototype.applyMatrix = function (t) {
			return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."), this.applyMatrix4(t)
		}, Object.defineProperties(gh.prototype, {
			drawcalls: {
				get: function () {
					return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."), this.groups
				}
			},
			offsets: {
				get: function () {
					return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."), this.groups
				}
			}
		}), jp.prototype.setDynamic = function (t) {
			return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."), this.setUsage(!0 === t ? ll : ol), this
		}, jp.prototype.setArray = function () {
			console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")
		}, Nf.prototype.getArrays = function () {
			console.error("THREE.ExtrudeGeometry: .getArrays() has been removed.")
		}, Nf.prototype.addShapeList = function () {
			console.error("THREE.ExtrudeGeometry: .addShapeList() has been removed.")
		}, Nf.prototype.addShape = function () {
			console.error("THREE.ExtrudeGeometry: .addShape() has been removed.")
		}, qp.prototype.dispose = function () {
			console.error("THREE.Scene: .dispose() has been removed.")
		}, Object.defineProperties(Yc.prototype, {
			wrapAround: {
				get: function () {
					console.warn("THREE.Material: .wrapAround has been removed.")
				},
				set: function () {
					console.warn("THREE.Material: .wrapAround has been removed.")
				}
			},
			overdraw: {
				get: function () {
					console.warn("THREE.Material: .overdraw has been removed.")
				},
				set: function () {
					console.warn("THREE.Material: .overdraw has been removed.")
				}
			},
			wrapRGB: {
				get: function () {
					return console.warn("THREE.Material: .wrapRGB has been removed."), new eh
				}
			},
			shading: {
				get: function () {
					console.error("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead.")
				},
				set: function (t) {
					console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = 1 === t
				}
			},
			stencilMask: {
				get: function () {
					return console.warn("THREE." + this.type + ": .stencilMask has been removed. Use .stencilFuncMask instead."), this.stencilFuncMask
				},
				set: function (t) {
					console.warn("THREE." + this.type + ": .stencilMask has been removed. Use .stencilFuncMask instead."), this.stencilFuncMask = t
				}
			},
			vertexTangents: {
				get: function () {
					console.warn("THREE." + this.type + ": .vertexTangents has been removed.")
				},
				set: function () {
					console.warn("THREE." + this.type + ": .vertexTangents has been removed.")
				}
			}
		}), Object.defineProperties(Uh.prototype, {
			derivatives: {
				get: function () {
					return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives
				},
				set: function (t) {
					console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives = t
				}
			}
		}), Wp.prototype.clearTarget = function (t, e, n, i) {
			console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."), this.setRenderTarget(t), this.clear(e, n, i)
		}, Wp.prototype.animate = function (t) {
			console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."), this.setAnimationLoop(t)
		}, Wp.prototype.getCurrentRenderTarget = function () {
			return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."), this.getRenderTarget()
		}, Wp.prototype.getMaxAnisotropy = function () {
			return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."), this.capabilities.getMaxAnisotropy()
		}, Wp.prototype.getPrecision = function () {
			return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."), this.capabilities.precision
		}, Wp.prototype.resetGLState = function () {
			return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."), this.state.reset()
		}, Wp.prototype.supportsFloatTextures = function () {
			return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."), this.extensions.get("OES_texture_float")
		}, Wp.prototype.supportsHalfFloatTextures = function () {
			return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."), this.extensions.get("OES_texture_half_float")
		}, Wp.prototype.supportsStandardDerivatives = function () {
			return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."), this.extensions.get("OES_standard_derivatives")
		}, Wp.prototype.supportsCompressedTextureS3TC = function () {
			return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."), this.extensions.get("WEBGL_compressed_texture_s3tc")
		}, Wp.prototype.supportsCompressedTexturePVRTC = function () {
			return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."), this.extensions.get("WEBGL_compressed_texture_pvrtc")
		}, Wp.prototype.supportsBlendMinMax = function () {
			return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."), this.extensions.get("EXT_blend_minmax")
		}, Wp.prototype.supportsVertexTextures = function () {
			return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."), this.capabilities.vertexTextures
		}, Wp.prototype.supportsInstancedArrays = function () {
			return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."), this.extensions.get("ANGLE_instanced_arrays")
		}, Wp.prototype.enableScissorTest = function (t) {
			console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."), this.setScissorTest(t)
		}, Wp.prototype.initMaterial = function () {
			console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
		}, Wp.prototype.addPrePlugin = function () {
			console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
		}, Wp.prototype.addPostPlugin = function () {
			console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
		}, Wp.prototype.updateShadowMap = function () {
			console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
		}, Wp.prototype.setFaceCulling = function () {
			console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")
		}, Wp.prototype.allocTextureUnit = function () {
			console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.")
		}, Wp.prototype.setTexture = function () {
			console.warn("THREE.WebGLRenderer: .setTexture() has been removed.")
		}, Wp.prototype.setTexture2D = function () {
			console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.")
		}, Wp.prototype.setTextureCube = function () {
			console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.")
		}, Wp.prototype.getActiveMipMapLevel = function () {
			return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."), this.getActiveMipmapLevel()
		}, Object.defineProperties(Wp.prototype, {
			shadowMapEnabled: {
				get: function () {
					return this.shadowMap.enabled
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."), this.shadowMap.enabled = t
				}
			},
			shadowMapType: {
				get: function () {
					return this.shadowMap.type
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."), this.shadowMap.type = t
				}
			},
			shadowMapCullFace: {
				get: function () {
					console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")
				},
				set: function () {
					console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")
				}
			},
			context: {
				get: function () {
					return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."), this.getContext()
				}
			},
			vr: {
				get: function () {
					return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"), this.xr
				}
			},
			gammaInput: {
				get: function () {
					return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."), !1
				},
				set: function () {
					console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.")
				}
			},
			gammaOutput: {
				get: function () {
					return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."), !1
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."), this.outputEncoding = !0 === t ? il : nl
				}
			},
			toneMappingWhitePoint: {
				get: function () {
					return console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."), 1
				},
				set: function () {
					console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.")
				}
			}
		}), Object.defineProperties(Ip.prototype, {
			cullFace: {
				get: function () {
					console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")
				},
				set: function () {
					console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")
				}
			},
			renderReverseSided: {
				get: function () {
					console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")
				},
				set: function () {
					console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")
				}
			},
			renderSingleSided: {
				get: function () {
					console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")
				},
				set: function () {
					console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")
				}
			}
		}), Object.defineProperties(Rl.prototype, {
			wrapS: {
				get: function () {
					return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS = t
				}
			},
			wrapT: {
				get: function () {
					return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT = t
				}
			},
			magFilter: {
				get: function () {
					return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter = t
				}
			},
			minFilter: {
				get: function () {
					return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter = t
				}
			},
			anisotropy: {
				get: function () {
					return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy = t
				}
			},
			offset: {
				get: function () {
					return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset = t
				}
			},
			repeat: {
				get: function () {
					return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat = t
				}
			},
			format: {
				get: function () {
					return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format = t
				}
			},
			type: {
				get: function () {
					return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type = t
				}
			},
			generateMipmaps: {
				get: function () {
					return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps
				},
				set: function (t) {
					console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps = t
				}
			}
		}), class extends Nc {
			constructor(t) {
				super(), this.type = "Audio", this.listener = t, this.context = t.context, this.gain = this.context.createGain(), this.gain.connect(t.getInput()), this.autoplay = !1, this.buffer = null, this.detune = 0, this.loop = !1, this.loopStart = 0, this.loopEnd = 0, this.offset = 0, this.duration = void 0, this.playbackRate = 1, this.isPlaying = !1, this.hasPlaybackControl = !0, this.source = null, this.sourceType = "empty", this._startedAt = 0, this._progress = 0, this._connected = !1, this.filters = []
			}
			getOutput() {
				return this.gain
			}
			setNodeSource(t) {
				return this.hasPlaybackControl = !1, this.sourceType = "audioNode", this.source = t, this.connect(), this
			}
			setMediaElementSource(t) {
				return this.hasPlaybackControl = !1, this.sourceType = "mediaNode", this.source = this.context.createMediaElementSource(t), this.connect(), this
			}
			setMediaStreamSource(t) {
				return this.hasPlaybackControl = !1, this.sourceType = "mediaStreamNode", this.source = this.context.createMediaStreamSource(t), this.connect(), this
			}
			setBuffer(t) {
				return this.buffer = t, this.sourceType = "buffer", this.autoplay && this.play(), this
			}
			play(t = 0) {
				if (!0 === this.isPlaying) return void console.warn("THREE.Audio: Audio is already playing.");
				if (!1 === this.hasPlaybackControl) return void console.warn("THREE.Audio: this Audio has no playback control.");
				this._startedAt = this.context.currentTime + t;
				const e = this.context.createBufferSource();
				return e.buffer = this.buffer, e.loop = this.loop, e.loopStart = this.loopStart, e.loopEnd = this.loopEnd, e.onended = this.onEnded.bind(this), e.start(this._startedAt, this._progress + this.offset, this.duration), this.isPlaying = !0, this.source = e, this.setDetune(this.detune), this.setPlaybackRate(this.playbackRate), this.connect()
			}
			pause() {
				if (!1 !== this.hasPlaybackControl) return !0 === this.isPlaying && (this._progress += Math.max(this.context.currentTime - this._startedAt, 0) * this.playbackRate, !0 === this.loop && (this._progress = this._progress % (this.duration || this.buffer.duration)), this.source.stop(), this.source.onended = null, this.isPlaying = !1), this;
				console.warn("THREE.Audio: this Audio has no playback control.")
			}
			stop() {
				if (!1 !== this.hasPlaybackControl) return this._progress = 0, this.source.stop(), this.source.onended = null, this.isPlaying = !1, this;
				console.warn("THREE.Audio: this Audio has no playback control.")
			}
			connect() {
				if (this.filters.length > 0) {
					this.source.connect(this.filters[0]);
					for (let t = 1, e = this.filters.length; t < e; t++) this.filters[t - 1].connect(this.filters[t]);
					this.filters[this.filters.length - 1].connect(this.getOutput())
				} else this.source.connect(this.getOutput());
				return this._connected = !0, this
			}
			disconnect() {
				if (this.filters.length > 0) {
					this.source.disconnect(this.filters[0]);
					for (let t = 1, e = this.filters.length; t < e; t++) this.filters[t - 1].disconnect(this.filters[t]);
					this.filters[this.filters.length - 1].disconnect(this.getOutput())
				} else this.source.disconnect(this.getOutput());
				return this._connected = !1, this
			}
			getFilters() {
				return this.filters
			}
			setFilters(t) {
				return t || (t = []), !0 === this._connected ? (this.disconnect(), this.filters = t.slice(), this.connect()) : this.filters = t.slice(), this
			}
			setDetune(t) {
				if (this.detune = t, void 0 !== this.source.detune) return !0 === this.isPlaying && this.source.detune.setTargetAtTime(this.detune, this.context.currentTime, .01), this
			}
			getDetune() {
				return this.detune
			}
			getFilter() {
				return this.getFilters()[0]
			}
			setFilter(t) {
				return this.setFilters(t ? [t] : [])
			}
			setPlaybackRate(t) {
				if (!1 !== this.hasPlaybackControl) return this.playbackRate = t, !0 === this.isPlaying && this.source.playbackRate.setTargetAtTime(this.playbackRate, this.context.currentTime, .01), this;
				console.warn("THREE.Audio: this Audio has no playback control.")
			}
			getPlaybackRate() {
				return this.playbackRate
			}
			onEnded() {
				this.isPlaying = !1
			}
			getLoop() {
				return !1 === this.hasPlaybackControl ? (console.warn("THREE.Audio: this Audio has no playback control."), !1) : this.loop
			}
			setLoop(t) {
				if (!1 !== this.hasPlaybackControl) return this.loop = t, !0 === this.isPlaying && (this.source.loop = this.loop), this;
				console.warn("THREE.Audio: this Audio has no playback control.")
			}
			setLoopStart(t) {
				return this.loopStart = t, this
			}
			setLoopEnd(t) {
				return this.loopEnd = t, this
			}
			getVolume() {
				return this.gain.gain.value
			}
			setVolume(t) {
				return this.gain.gain.setTargetAtTime(t, this.context.currentTime, .01), this
			}
		}.prototype.load = function (t) {
			console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");
			const e = this;
			return (new Mg).load(t, (function (t) {
				e.setBuffer(t)
			})), this
		}, Wh.prototype.updateCubeMap = function (t, e) {
			return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."), this.update(t, e)
		}, Wh.prototype.clear = function (t, e, n, i) {
			return console.warn("THREE.CubeCamera: .clear() is now .renderTarget.clear()."), this.renderTarget.clear(t, e, n, i)
		}, Tl.crossOrigin = void 0, Tl.loadTexture = function (t, e, n, i) {
			console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
			const r = new og;
			r.setCrossOrigin(this.crossOrigin);
			const s = r.load(t, n, void 0, i);
			return e && (s.mapping = e), s
		}, Tl.loadTextureCube = function (t, e, n, i) {
			console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
			const r = new ag;
			r.setCrossOrigin(this.crossOrigin);
			const s = r.load(t, n, void 0, i);
			return e && (s.mapping = e), s
		}, Tl.loadCompressedTexture = function () {
			console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
		}, Tl.loadCompressedTextureCube = function () {
			console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
		}, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", {
			detail: {
				revision: Lo
			}
		})), "undefined" != typeof window && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = Lo);
	var Wg = function () {
			function t() {
				var e = this;
				fo(this, t), this.width = window.innerWidth, Mo() ? this.height = window.innerHeight + 100 : this.height = window.innerHeight, this.actif = !1, this.scene = new qp, this.scene1 = new qp, this.clock = new Sg, this.mouse = new _l(0, 0), this.prevMouse = new _l(0, 0), this.currentWave = 0, this.sens = !1, this.currentScr = 0, this.baseTexture = new Rl(this.width, this.height, {
					minFilter: Bo,
					magFilter: Bo,
					format: jo
				}), this.renderer = new Wp, this.renderer.setPixelRatio(.5), Mo() && this.renderer.setPixelRatio(2), this.renderer.setSize(this.width, this.height);
				var n = this.height,
					i = this.width / this.height;
				this.camera = new du(n * i / -2, n * i / 2, n / 2, n / -2, -1e3, 1e3), this.renderer.setClearColor(0, 1), document.body.appendChild(this.renderer.domElement), this.video = document.getElementById("video"), this.video.play(), this.video.loop = this.video.muted = !0, this.texture = new Bm(video), this.material = new Uh({
					extensions: {
						derivatives: "#extension GL_OES_standard_derivatives : enable"
					},
					side: 2,
					uniforms: {
						time: {
							value: 0
						},
						uDisplacement: {
							value: null
						},
						uTexture: {
							value: this.texture
						},
						resolution: {
							value: new Cl
						}
					},
					vertexShader: "varying vec2 vUv;\n    void main()\n    {\n        vUv = uv;\n        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);\n    }",
					fragmentShader: "uniform float time;\n\n    uniform sampler2D uTexture;\n    uniform sampler2D uDisplacement;\n    \n    varying vec2 vUv;\n\n    float PI = 3.141592653589793238;\n    void main() {\n        \n        vec4 displacement = texture2D(uDisplacement, vUv);\n        float theta = displacement.r*2.*PI;\n\n        vec2 dir = vec2(sin(theta), cos(theta));\n\n        vec2 uv = vUv + dir*displacement.r*0.2; //1.\n\n        vec4 color = texture2D(uTexture, uv);\n\n        gl_FragColor = color;\n    }"
				}), this.plane = new Oh(this.geometry, this.material1), this.scene.add(this.plane), this.max = 100, window.innerWidth < 768 ? this.geometry = new nu(350, 350, 1, 1) : this.geometry = new nu(450, 450, 1, 1), this.geometryFullScreen = new nu(this.width, this.height, 1, 1), this.meshes = [], this.meshes2 = [], this.meshesMouse = [], this.textureEau = (new og).load(document.body.getAttribute("data-eau"));
				for (var r = 0; r < this.max; r++) {
					var s = new nh({
							map: (new og).load(document.body.getAttribute("data-brush")),
							transparent: !0
						}),
						a = new Oh(this.geometry, s);
					a.visible = !1, this.scene.add(a), this.meshes.push(a)
				}
				for (var o = 0; o < this.max; o++) {
					var l = new nh({
							map: (new og).load(document.body.getAttribute("data-eau")),
							transparent: !0
						}),
						c = new Oh(this.geometry, l);
					c.visible = !1, this.scene.add(c), this.meshes2.push(c)
				}
				for (var h = 0; h < this.max; h++) {
					var u = new nh({
							map: (new og).load(document.body.getAttribute("data-mouse")),
							transparent: !0
						}),
						d = new Oh(this.geometry, u);
					d.visible = !1, this.scene.add(d), this.meshesMouse.push(d)
				}
				this.quad = new Oh(this.geometryFullScreen, this.material), this.scene1.add(this.quad), window.addEventListener("resize", (function () {
					e.width = window.innerWidth, Mo() ? e.height = window.innerHeight + 100 : e.height = window.innerHeight, e.camera.aspect = e.width / e.height, e.camera.updateProjectionMatrix(), e.renderer.setSize(e.width, e.height)
				}))
			}
			return vo(t, [{
				key: "setNewWave",
				value: function (t, e, n, i, r, s) {
					var a = i[n];
					a.blocClassic = a.click = !1, a.visible = !0, a.position.x = t, a.position.y = e, a.scale.x = a.scale.y = 1, i == this.meshes ? (a.material.opacity = .5, a.scale.x = a.scale.y = 1.2) : i == this.meshes2 ? (a.material.opacity = .2, a.rotation.z = 2 * Math.random() * Math.PI) : i == this.meshesMouse && (a.material.opacity = .55, a.scale.x = a.scale.y = .7, a.rotation.z = 2 * Math.random() * Math.PI), null == r || r.el.classList.contains("bloc1") || (a.scale.x = r.el.clientWidth / 300, a.blocClassic = !0), null != s && (a.click = !0, a.material.opacity = .4, a.scale.x = a.scale.y = s, a.rotation.z = 0)
				}
			}, {
				key: "trackMousePos",
				value: function () {
					Math.abs(this.mouse.x - this.prevMouse.x) < 4 && Math.abs(this.mouse.y - this.prevMouse.y) < 4 || (this.setNewWave(this.mouse.x, this.mouse.y, this.currentWave, this.meshesMouse), this.currentWave = (this.currentWave + 1) % this.max), this.prevMouse.x = this.mouse.x, this.prevMouse.y = this.mouse.y;
					var t, e = _o(this.blocks);
					try {
						for (e.s(); !(t = e.n()).done;) {
							var n = t.value;
							if (n.el.classList.contains("bloc1")) n.y = -n.el.getBoundingClientRect().top + this.height / 2 - n.el.clientHeight / 2;
							else {
								var i = n.el.clientHeight - 210;
								this.sens || (i = 210), n.y = -n.el.getBoundingClientRect().top + this.height / 2 - i
							}
							n.y + this.height / 2 < this.height && n.y + this.height / 2 > 0 && (n.el.classList.contains("blocHaut") && !this.sens || n.el.classList.contains("blocBas") && this.sens) && (n.x = n.el.getBoundingClientRect().left - window.innerWidth / 2 + n.el.clientWidth / 2, Math.abs(n.y - n.prevY) < 4 || (this.setNewWave(n.x, n.y, this.currentWave, this.meshes, n), this.setNewWave(n.x, n.y, this.currentWave, this.meshes2, n), this.currentWave = (this.currentWave + 1) % this.max), n.prevY = n.y)
						}
					} catch (t) {
						e.e(t)
					} finally {
						e.f()
					}
				}
			}, {
				key: "animate",
				value: function () {
					this.trackMousePos(), this.rafWebgl = requestAnimationFrame(this.animate.bind(this)), this.renderer.setRenderTarget(this.baseTexture), this.renderer.render(this.scene, this.camera), this.material.uniforms.uDisplacement.value = this.baseTexture.texture, this.renderer.setRenderTarget(null), this.renderer.clear(), this.renderer.render(this.scene1, this.camera);
					var t = this.clock.getDelta();
					this.meshes.forEach((function (t) {
						t.visible && (t.material.opacity *= .92, t.scale.x = .982 * t.scale.x + .02, t.blocClassic || (t.scale.y = t.scale.x), t.material.opacity < .002 && (t.visible = !1))
					})), this.meshes2.forEach((function (e) {
						e.visible && (e.rotation.z += t / 2, e.material.opacity *= .98, e.scale.x = .982 * e.scale.x + .04, e.blocClassic || (e.scale.y = e.scale.x), e.material.opacity < .002 && (e.visible = !1))
					})), this.meshesMouse.forEach((function (e) {
						e.visible && (e.click ? e.material.opacity *= .95 : (e.rotation.z += t / 2, e.material.opacity *= .98), e.scale.x = .982 * e.scale.x + .03, e.scale.y = e.scale.x, e.material.opacity < .002 && (e.visible = !1))
					})), window.pageYOffset < this.currentScr ? this.sens = !1 : window.pageYOffset > this.currentScr && (this.sens = !0), this.currentScr = window.pageYOffset
				}
			}, {
				key: "init",
				value: function () {
					this.blocks = [], this.mouseE = this.mouseMove.bind(this), window.addEventListener("mousemove", this.mouseE), this.mouseC = this.mouseClick.bind(this), document.body.addEventListener("click", this.mouseC)
				}
			}, {
				key: "updateBlocs",
				value: function () {
					var t = this;
					this.blocks = [], document.querySelectorAll(".bloc").forEach((function (e) {
						var n = {};
						n.el = e, n.prevY = 0, t.blocks.push(n)
					}))
				}
			}, {
				key: "mouseMove",
				value: function (t) {
					this.mouse.x = t.clientX - this.width / 2, this.mouse.y = this.height / 2 - t.clientY
				}
			}, {
				key: "mouseClick",
				value: function (t) {
					for (var e = this, n = 0, i = 0; i < 10; i++) ! function (t) {
						vi.delayedCall(n, (function () {
							e.setNewWave(e.mouse.x, e.mouse.y, e.currentWave, e.meshesMouse, void 0, .2 + .1 * t), e.currentWave = (e.currentWave + 1) % e.max
						}))
					}(i), n += .02
				}
			}, {
				key: "killWebgl",
				value: function () {
					cancelAnimationFrame(this.rafWebgl), window.removeEventListener("mousemove", this.mouseE), document.body.removeEventListener("click", this.mouseC)
				}
			}]), t
		}(),
		qg = function () {
			function t() {
				fo(this, t)
			}
			return vo(t, [{
				key: "init",
				value: function () {
					var t = this;
					if (document.querySelectorAll(".overlay .gauche").forEach((function (e) {
							e.classList.contains("deja-declare") || (e.classList.add("deja-declare"), e.addEventListener("mouseenter", (function () {
								e.classList.add("oHovered")
							})), e.addEventListener("mouseleave", (function () {
								t.deltaX = document.querySelector(".oHovered").clientWidth - 50, e.classList.remove("oHovered")
							})))
						})), !Mo || window.innerWidth > 767) {
						this.mouseE = this.mouseMove.bind(this), window.addEventListener("mousemove", this.mouseE);
						var e = document.querySelector(".overlay.actif .innerCloseBtn");
						this.xSet = vi.quickSetter(e, "x", "px"), this.deltaX = this.deplacementX = document.querySelector(".overlay.actif .gauche").clientWidth - 50, vi.set(e, {
							x: this.deltaX
						}), this.addTicker = function () {
							t.monTicker()
						}, vi.ticker.add(this.addTicker), this.deltaX = window.innerWidth / 2 - 52.5
					}
				}
			}, {
				key: "monTicker",
				value: function () {
					var t = 1 - Math.pow(.8, vi.ticker.deltaRatio());
					this.deplacementX += (this.deltaX - this.deplacementX) * t, this.xSet(this.deplacementX)
				}
			}, {
				key: "mouseMove",
				value: function (t) {
					document.querySelector(".oHovered") && (t.clientX <= 30 ? this.deltaX = 5 : t.clientX >= document.querySelector(".oHovered").clientWidth - 25 ? this.deltaX = document.querySelector(".oHovered").clientWidth - 50 : this.deltaX = t.clientX - 25)
				}
			}, {
				key: "killOverlay",
				value: function () {
					window.removeEventListener("mousemove", this.mouseE), vi.ticker.remove(this.addTicker)
				}
			}]), t
		}();

	function jg(t, e, n) {
		return Math.max(t, Math.min(e, n))
	}
	class Xg {
		advance(t) {
			var e;
			if (!this.isRunning) return;
			let n = !1;
			if (this.lerp) this.value = (1 - (i = this.lerp)) * this.value + i * this.to, Math.round(this.value) === this.to && (this.value = this.to, n = !0);
			else {
				this.currentTime += t;
				const e = jg(0, this.currentTime / this.duration, 1);
				n = e >= 1;
				const i = n ? 1 : this.easing(e);
				this.value = this.from + (this.to - this.from) * i
			}
			var i;
			null == (e = this.onUpdate) || e.call(this, this.value, {
				completed: n
			}), n && this.stop()
		}
		stop() {
			this.isRunning = !1
		}
		fromTo(t, e, {
			lerp: n = .1,
			duration: i = 1,
			easing: r = (t => t),
			onUpdate: s
		}) {
			this.from = this.value = t, this.to = e, this.lerp = n, this.duration = i, this.easing = r, this.currentTime = 0, this.isRunning = !0, this.onUpdate = s
		}
	}

	function Yg(t, e) {
		let n;
		return function () {
			let i = arguments,
				r = this;
			clearTimeout(n), n = setTimeout((function () {
				t.apply(r, i)
			}), e)
		}
	}
	class Jg {
		constructor(t, e) {
			this.onWindowResize = () => {
				this.width = window.innerWidth, this.height = window.innerHeight
			}, this.onWrapperResize = () => {
				this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight
			}, this.onContentResize = () => {
				const t = this.wrapper === window ? document.documentElement : this.wrapper;
				this.scrollHeight = t.scrollHeight, this.scrollWidth = t.scrollWidth
			}, this.wrapper = t, this.content = e, this.wrapper === window ? (window.addEventListener("resize", this.onWindowResize, !1), this.onWindowResize()) : (this.wrapperResizeObserver = new ResizeObserver(Yg(this.onWrapperResize, 100)), this.wrapperResizeObserver.observe(this.wrapper), this.onWrapperResize()), this.contentResizeObserver = new ResizeObserver(Yg(this.onContentResize, 100)), this.contentResizeObserver.observe(this.content), this.onContentResize()
		}
		destroy() {
			var t, e;
			window.removeEventListener("resize", this.onWindowResize, !1), null == (t = this.wrapperResizeObserver) || t.disconnect(), null == (e = this.contentResizeObserver) || e.disconnect()
		}
		get limit() {
			return {
				x: this.scrollWidth - this.width,
				y: this.scrollHeight - this.height
			}
		}
	}
	let Zg = () => ({
		events: {},
		emit(t, ...e) {
			let n = this.events[t] || [];
			for (let t = 0, i = n.length; t < i; t++) n[t](...e)
		},
		on(t, e) {
			var n;
			return (null == (n = this.events[t]) ? void 0 : n.push(e)) || (this.events[t] = [e]), () => {
				var n;
				this.events[t] = null == (n = this.events[t]) ? void 0 : n.filter((t => e !== t))
			}
		}
	});
	class Qg {
		constructor(t, {
			wheelMultiplier: e = 1,
			touchMultiplier: n = 2,
			normalizeWheel: i = !1
		}) {
			this.onTouchStart = t => {
				const {
					pageX: e,
					pageY: n
				} = t.targetTouches ? t.targetTouches[0] : t;
				this.touchStart.x = e, this.touchStart.y = n
			}, this.onTouchMove = t => {
				const {
					pageX: e,
					pageY: n
				} = t.targetTouches ? t.targetTouches[0] : t, i = -(e - this.touchStart.x) * this.touchMultiplier, r = -(n - this.touchStart.y) * this.touchMultiplier;
				this.touchStart.x = e, this.touchStart.y = n, this.emitter.emit("scroll", {
					type: "touch",
					deltaX: i,
					deltaY: r,
					event: t
				})
			}, this.onWheel = t => {
				let {
					deltaX: e,
					deltaY: n
				} = t;
				this.normalizeWheel && (e = jg(-100, e, 100), n = jg(-100, n, 100)), e *= this.wheelMultiplier, n *= this.wheelMultiplier, this.emitter.emit("scroll", {
					type: "wheel",
					deltaX: e,
					deltaY: n,
					event: t
				})
			}, this.element = t, this.wheelMultiplier = e, this.touchMultiplier = n, this.normalizeWheel = i, this.touchStart = {
				x: null,
				y: null
			}, this.emitter = Zg(), this.element.addEventListener("wheel", this.onWheel, {
				passive: !1
			}), this.element.addEventListener("touchstart", this.onTouchStart, {
				passive: !1
			}), this.element.addEventListener("touchmove", this.onTouchMove, {
				passive: !1
			})
		}
		on(t, e) {
			return this.emitter.on(t, e)
		}
		destroy() {
			this.emitter.events = {}, this.element.removeEventListener("wheel", this.onWheel, {
				passive: !1
			}), this.element.removeEventListener("touchstart", this.onTouchStart, {
				passive: !1
			}), this.element.removeEventListener("touchmove", this.onTouchMove, {
				passive: !1
			})
		}
	}
	class Kg {
		constructor({
			direction: t,
			gestureDirection: e,
			mouseMultiplier: n,
			smooth: i,
			wrapper: r = window,
			content: s = document.documentElement,
			wheelEventsTarget: a = r,
			smoothWheel: o = null == i || i,
			smoothTouch: l = !1,
			duration: c,
			easing: h = (t => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
			lerp: u = (c ? null : .1),
			infinite: d = !1,
			orientation: p = (null != t ? t : "vertical"),
			gestureOrientation: m = (null != e ? e : "vertical"),
			touchMultiplier: f = 2,
			wheelMultiplier: g = (null != n ? n : 1),
			normalizeWheel: v = !1
		} = {}) {
			this.onVirtualScroll = ({
				type: t,
				deltaX: e,
				deltaY: n,
				event: i
			}) => {
				if (i.ctrlKey) return;
				if ("vertical" === this.options.gestureOrientation && 0 === n || "horizontal" === this.options.gestureOrientation && 0 === e) return;
				if (i.composedPath().find((t => null == t || null == t.hasAttribute ? void 0 : t.hasAttribute("data-lenis-prevent")))) return;
				if (this.isStopped || this.isLocked) return void i.preventDefault();
				if (this.isSmooth = this.options.smoothTouch && "touch" === t || this.options.smoothWheel && "wheel" === t, !this.isSmooth) return this.isScrolling = !1, void this.animate.stop();
				i.preventDefault();
				let r = n;
				"both" === this.options.gestureOrientation ? r = Math.abs(n) > Math.abs(e) ? n : e : "horizontal" === this.options.gestureOrientation && (r = e), this.scrollTo(this.targetScroll + r, {
					programmatic: !1
				})
			}, this.onScroll = () => {
				if (!this.isScrolling) {
					const t = this.animatedScroll;
					this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - t), this.emit()
				}
			}, t && console.warn("Lenis: `direction` option is deprecated, use `orientation` instead"), e && console.warn("Lenis: `gestureDirection` option is deprecated, use `gestureOrientation` instead"), n && console.warn("Lenis: `mouseMultiplier` option is deprecated, use `wheelMultiplier` instead"), i && console.warn("Lenis: `smooth` option is deprecated, use `smoothWheel` instead"), window.lenisVersion = "1.0.5", r !== document.documentElement && r !== document.body || (r = window), this.options = {
				wrapper: r,
				content: s,
				wheelEventsTarget: a,
				smoothWheel: o,
				smoothTouch: l,
				duration: c,
				easing: h,
				lerp: u,
				infinite: d,
				gestureOrientation: m,
				orientation: p,
				touchMultiplier: f,
				wheelMultiplier: g,
				normalizeWheel: v
			}, this.dimensions = new Jg(r, s), this.rootElement.classList.add("lenis"), this.velocity = 0, this.isStopped = !1, this.isSmooth = o || l, this.isScrolling = !1, this.targetScroll = this.animatedScroll = this.actualScroll, this.animate = new Xg, this.emitter = Zg(), this.options.wrapper.addEventListener("scroll", this.onScroll, {
				passive: !1
			}), this.virtualScroll = new Qg(a, {
				touchMultiplier: f,
				wheelMultiplier: g,
				normalizeWheel: v
			}), this.virtualScroll.on("scroll", this.onVirtualScroll)
		}
		destroy() {
			this.emitter.events = {}, this.options.wrapper.removeEventListener("scroll", this.onScroll, {
				passive: !1
			}), this.virtualScroll.destroy()
		}
		on(t, e) {
			return this.emitter.on(t, e)
		}
		off(t, e) {
			var n;
			this.emitter.events[t] = null == (n = this.emitter.events[t]) ? void 0 : n.filter((t => e !== t))
		}
		setScroll(t) {
			this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t
		}
		emit() {
			this.emitter.emit("scroll", this)
		}
		reset() {
			this.isLocked = !1, this.isScrolling = !1, this.velocity = 0, this.animate.stop()
		}
		start() {
			this.isStopped = !1, this.reset()
		}
		stop() {
			this.isStopped = !0, this.animate.stop(), this.reset()
		}
		raf(t) {
			const e = t - (this.time || t);
			this.time = t, this.animate.advance(.001 * e)
		}
		scrollTo(t, {
			offset: e = 0,
			immediate: n = !1,
			lock: i = !1,
			duration: r = this.options.duration,
			easing: s = this.options.easing,
			lerp: a = !r && this.options.lerp,
			onComplete: o = null,
			force: l = !1,
			programmatic: c = !0
		} = {}) {
			if (!this.isStopped || l) {
				if (["top", "left", "start"].includes(t)) t = 0;
				else if (["bottom", "right", "end"].includes(t)) t = this.limit;
				else {
					var h;
					let n;
					if ("string" == typeof t ? n = document.querySelector(t) : null != (h = t) && h.nodeType && (n = t), n) {
						if (this.options.wrapper !== window) {
							const t = this.options.wrapper.getBoundingClientRect();
							e -= this.isHorizontal ? t.left : t.top
						}
						const i = n.getBoundingClientRect();
						t = (this.isHorizontal ? i.left : i.top) + this.animatedScroll
					}
				}
				if ("number" == typeof t) {
					if (t += e, t = Math.round(t), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : t = jg(0, t, this.limit), n) return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.reset(), this.emit(), void(null == o || o());
					if (!c) {
						if (t === this.targetScroll) return;
						this.targetScroll = t
					}
					this.animate.fromTo(this.animatedScroll, t, {
						duration: r,
						easing: s,
						lerp: a,
						onUpdate: (t, {
							completed: e
						}) => {
							i && (this.isLocked = !0), this.isScrolling = !0, this.velocity = t - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t, this.setScroll(this.scroll), c && (this.targetScroll = t), e && (i && (this.isLocked = !1), requestAnimationFrame((() => {
								this.isScrolling = !1
							})), this.velocity = 0, null == o || o()), this.emit()
						}
					})
				}
			}
		}
		get rootElement() {
			return this.options.wrapper === window ? this.options.content : this.options.wrapper
		}
		get limit() {
			return this.isHorizontal ? this.dimensions.limit.x : this.dimensions.limit.y
		}
		get isHorizontal() {
			return "horizontal" === this.options.orientation
		}
		get actualScroll() {
			return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop
		}
		get scroll() {
			return this.options.infinite ? function (t, e) {
				let n = t % e;
				return (e > 0 && n < 0 || e < 0 && n > 0) && (n += e), n
			}(this.animatedScroll, this.limit) : this.animatedScroll
		}
		get progress() {
			return 0 === this.limit ? 1 : this.scroll / this.limit
		}
		get isSmooth() {
			return this.__isSmooth
		}
		set isSmooth(t) {
			this.__isSmooth !== t && (this.rootElement.classList.toggle("lenis-smooth", t), this.__isSmooth = t)
		}
		get isScrolling() {
			return this.__isScrolling
		}
		set isScrolling(t) {
			this.__isScrolling !== t && (this.rootElement.classList.toggle("lenis-scrolling", t), this.__isScrolling = t)
		}
		get isStopped() {
			return this.__isStopped
		}
		set isStopped(t) {
			this.__isStopped !== t && (this.rootElement.classList.toggle("lenis-stopped", t), this.__isStopped = t)
		}
	}
	var $g = new Wg,
		tv = new qg,
		ev = Mo() ? null : new Kg;
	if (ev) {
		ev.stop(), requestAnimationFrame((function t(e) {
			ev.raf(e), requestAnimationFrame(t)
		}))
	}
	var nv, iv = function () {
			function t() {
				var e = this;
				fo(this, t), this.rafEnPause = !1, vi.to(".h1 .l > span", {
					y: "0",
					opacity: 1,
					stagger: .09,
					ease: "power4.out",
					duration: 2
				}), vi.to(".m-duo", {
					y: "0",
					opacity: 1,
					ease: "power4.out",
					duration: 2,
					delay: 1
				}), vi.to(".m-innerP", {
					opacity: 1,
					ease: "power4.out",
					duration: 1,
					delay: 1
				}), vi.to(".m-duo .ast", {
					rotation: 250,
					ease: "none",
					scrollTrigger: {
						trigger: ".m-duo .ast",
						start: "top bottom",
						end: "bottom top",
						scrub: !0
					}
				}), this.totalBoutons = document.querySelectorAll(".btnSpe").length, this.currentBouton = 0, (!Mo || window.innerWidth > 767) && (this.mouseEnter = this.eventMouseEnter.bind(this), document.querySelector(".m-members").addEventListener("mouseenter", this.mouseEnter), this.mouseLeave = this.eventMouseLeave.bind(this), document.querySelector(".m-members").addEventListener("mouseleave", this.mouseLeave), this.mouseMove = this.eventMouseMove.bind(this), window.addEventListener("mousemove", this.mouseMove), this.pos = {
					x: window.innerWidth / 2,
					y: window.innerHeight / 2
				}, this.mouse = {
					x: this.pos.x,
					y: this.pos.y
				}, this.speed = .2, this.btn = document.getElementById("toBio"), vi.set(this.btn, {
					xPercent: -50,
					yPercent: -50
				}), this.xBtnSet = vi.quickSetter(this.btn, "x", "px"), this.yBtnSet = vi.quickSetter(this.btn, "y", "px"), this.addTicker = function () {
					e.monTicker()
				}, vi.delayedCall(1, (function () {
					ia.create({
						trigger: ".m-members",
						start: "top bottom",
						end: "bottom top",
						immediateRender: !1,
						onEnter: function () {
							vi.ticker.add(e.addTicker)
						},
						onEnterBack: function () {
							vi.ticker.add(e.addTicker)
						},
						onLeave: function () {
							vi.ticker.remove(e.addTicker)
						},
						onLeaveBack: function () {
							vi.ticker.remove(e.addTicker)
						}
					})
				}))), vi.delayedCall(1, (function () {
					ia.create({
						trigger: ".m-members",
						start: "top top",
						end: "bottom bottom",
						immediateRender: !1,
						onEnter: function () {
							e.rafEnPause = !0, cancelAnimationFrame($g.rafWebgl)
						},
						onEnterBack: function () {
							e.rafEnPause = !0, cancelAnimationFrame($g.rafWebgl)
						},
						onLeave: function () {
							e.rafEnPause = !1, $g.animate()
						},
						onLeaveBack: function () {
							e.rafEnPause = !1, $g.animate()
						}
					})
				})), this.currentShape = 0, this.totalShapes = 7, document.querySelectorAll(".btnSpe").forEach((function (t) {
					t.addEventListener("mouseenter", (function () {
						e.currentBouton = bo(t), window.clearTimeout(e.monInter), document.querySelector(".btnSpe.current").classList.remove("current"), t.classList.add("current")
					}))
				})), vi.delayedCall(.4, (function () {
					document.querySelectorAll(".m-member img.a").forEach((function (t) {
						vi.to(t, {
							y: "0px",
							ease: "none",
							scrollTrigger: {
								trigger: t.parentNode,
								start: "top bottom",
								end: "top top",
								scrub: !0
							}
						}), vi.to(t, {
							y: "150px",
							ease: "none",
							immediateRender: !1,
							scrollTrigger: {
								trigger: t.parentNode,
								start: "top top",
								end: "bottom top",
								scrub: !0
							}
						})
					}))
				})), tv.constructor()
			}
			return vo(t, [{
				key: "animationShape",
				value: function () {
					var t = document.querySelector(".lesImgs image").cloneNode(!0);
					t.setAttribute("xlink:href", document.querySelector(".btnSpe.current").getAttribute("data-img")), document.querySelector(".lesImgs").append(t), vi.fromTo(t, {
						opacity: 0
					}, {
						opacity: 1,
						duration: .6,
						ease: "power4.inOut"
					}), this.currentShape = (this.currentShape + 1) % this.totalShapes, vi.to("#forme1", {
						morphSVG: "#forme" + (this.currentShape + 1),
						duration: .6,
						ease: "power4.inOut"
					})
				}
			}, {
				key: "monTicker",
				value: function () {
					var t = 1 - Math.pow(1 - this.speed, vi.ticker.deltaRatio());
					this.pos.x += (this.mouse.x - this.pos.x) * t, this.pos.y += (this.mouse.y - this.pos.y) * t, this.xBtnSet(this.pos.x), this.yBtnSet(this.pos.y), this.XOld = this.pos.x
				}
			}, {
				key: "eventMouseMove",
				value: function (t) {
					this.mouse.x = t.x, this.mouse.y = t.y
				}
			}, {
				key: "eventMouseEnter",
				value: function (t) {
					vi.to("#toBio", {
						autoAlpha: 1,
						ease: "power2.inOut",
						duration: .3
					})
				}
			}, {
				key: "eventMouseLeave",
				value: function (t) {
					vi.to("#toBio", {
						autoAlpha: 0,
						ease: "power2.inOut",
						duration: .3
					})
				}
			}, {
				key: "kill",
				value: function () {
					window.removeEventListener("mousemove", this.mouseMove), document.querySelector(".m-members").removeEventListener("mouseenter", this.mouseEnter), document.querySelector(".m-members").removeEventListener("mouseleave", this.mouseLeave), window.clearInterval(this.monInter), vi.ticker.remove(this.addTicker)
				}
			}]), t
		}(),
		rv = function () {
			function t() {
				var e = this;
				fo(this, t), this.animEnCours = !1, vi.to(".h1 .l > span", {
					y: "0",
					opacity: 1,
					stagger: .09,
					ease: "power4.out",
					duration: 2
				}), vi.to(".d-flex, .h-moduleDebut", {
					autoAlpha: 1,
					ease: "power4.inOut",
					duration: 1,
					delay: .7
				}), vi.delayedCall(.3, (function () {
					document.querySelectorAll(".innerDroite .droite").forEach((function (t) {
						ia.create({
							trigger: t,
							start: "top top+=5",
							onEnter: function () {
								e.updateSidebar(t)
							},
							onEnterBack: function () {
								e.updateSidebar(t)
							}
						})
					}))
				})), document.querySelectorAll(".innerGauche .btn").forEach((function (t) {
					t.addEventListener("click", (function () {
						var n = bo(t.parentNode);
						e.animEnCours = !0, document.querySelector(".innerGauche.current").classList.remove("current"), document.querySelectorAll(".innerGauche")[n].classList.add("current");
						var i = {};
						i.scroll = window.pageYOffset, vi.to(i, {
							scroll: document.querySelectorAll(".innerDroite .droite")[n].getBoundingClientRect().top + window.pageYOffset - 4,
							duration: 1,
							ease: "power3.inOut",
							onUpdate: function () {
								window.scrollTo(0, i.scroll)
							},
							onComplete: function () {
								e.animEnCours = !1
							}
						})
					}))
				}))
			}
			return vo(t, [{
				key: "updateSidebar",
				value: function (t) {
					var e = bo(t),
						n = 0;
					document.querySelectorAll(".innerGauche .btn").forEach((function (t) {
						n != e && (t.querySelector("svg").classList.remove("fHaut", "fBas"), n < e ? t.querySelector("svg").classList.add("fHaut") : t.querySelector("svg").classList.add("fBas")), n++
					})), this.animEnCours || (document.querySelectorAll(".innerGauche").forEach((function (t) {
						t.classList.remove("current")
					})), document.querySelectorAll(".innerGauche")[e].classList.add("current"))
				}
			}]), t
		}(),
		sv = vo((function t() {
			fo(this, t), vi.to("h1 .l > span", {
				y: "0",
				opacity: 1,
				stagger: .09,
				ease: "power4.out",
				duration: 2
			}), vi.to(".f-module .gauche, .f-module .droite", {
				opacity: 1,
				y: "0px",
				stagger: .09,
				ease: "power4.out",
				duration: 2,
				delay: .5
			});
			var e = 75;
			window.innerWidth < 768 && (e = 102);
			var n = document.querySelectorAll(".f-module .droite")[0];
			n.classList.toggle("actif"), vi.set(n, {
				height: e + n.querySelector(".reponse").clientHeight + "px"
			}), document.querySelectorAll(".f-module .droite").forEach((function (t) {
				t.addEventListener("click", (function () {
					t.classList.toggle("actif"), t.classList.contains("actif") ? vi.to(t, {
						height: e + t.querySelector(".reponse").clientHeight + "px",
						ease: "power4.inOut",
						duration: .6
					}) : vi.to(t, {
						height: e + "px",
						ease: "power4.inOut",
						duration: .6
					}), document.querySelectorAll(".f-module .droite").forEach((function (n) {
						n != t && n.classList.contains("actif") && (n.classList.remove("actif"), vi.to(n, {
							height: e + "px",
							ease: "power4.inOut",
							duration: .6
						}))
					}))
				}))
			}))
		})),
		av = function () {
			function t(e) {
				fo(this, t), this.currentStep = 0, this.allSteps = 2, this.newClass, this.newTitle, this.newDOM, this.newHeader, this.newFooter, this.newVoirCriteres, this.newOverlay, this.animEnCours = !1, this.first = !0
			}
			return vo(t, [{
				key: "start",
				value: function (t, e) {
					this.animEnCours = !0, this.changementDOM(t), this.animationSortie(e)
				}
			}, {
				key: "animationSortie",
				value: function (t) {
					var e = this;
					if (null !== ev && ev.stop(), null != this.mission && document.body.classList.contains("page-template-mission") && this.mission.rafEnPause && $g.animate(), document.querySelector(".inner-nav .droite").classList.contains("actif") && (vi.to(".toMenuMob .a", {
							duration: .4,
							opacity: 0
						}), vi.to(".toMenuMob .r", {
							duration: .4,
							opacity: 1,
							delay: .6
						}), vi.to(".toMenuMob", {
							width: document.body.getAttribute("data-width-btn") + "px",
							ease: "power4.inOut",
							duration: 1,
							onComplete: function () {
								document.querySelector(".inner-nav .droite").classList.remove("actif"), document.querySelector(".navMob .toK").style.display = "flex", vi.to(".navMob .toK", {
									autoAlpha: 1,
									duration: .2
								}), document.querySelector(".toMenuMob").classList.remove("closeMob")
							}
						}), vi.to(".inner-nav", {
							"clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
							ease: "power4.inOut",
							duration: 1
						}), vi.to(".poly", {
							opacity: 0,
							duration: .2
						})), null != this.global && this.global.killGlobal(), this.first) this.killAllSTrigger(), this.incrementStep();
					else if (document.body.classList.contains("toSingleTransition")) {
						t.closest("#main").classList.add("hidden");
						var n = t.closest(".h-module").querySelector(".gauche");
						t.closest(".droite").getBoundingClientRect().top < 0 && (vi.set(n, {
							y: 5 - t.closest(".droite").getBoundingClientRect().top
						}), n.classList.remove("elDom")), vi.set(t.closest(".wrap.flex"), {
							width: window.innerWidth + t.closest(".droite").getBoundingClientRect().left + "px"
						}), vi.to(t.closest(".wrap.flex"), {
							x: -1 * t.closest(".droite").getBoundingClientRect().left + 5,
							ease: "power4.inOut",
							duration: 1
						}), vi.to(t.closest(".droite"), {
							width: window.innerWidth - 10 - Math.max(window.innerWidth - document.documentElement.clientWidth, 0) + "px",
							ease: "power4.inOut",
							duration: 1
						});
						var i = window.innerHeight - t.closest(".droite").getBoundingClientRect().top - 270;
						window.innerWidth < 768 && (i = window.innerHeight - t.closest(".droite").getBoundingClientRect().top - 140), vi.to(t.closest(".droite"), {
							y: i + "px",
							ease: "power4.inOut",
							duration: 1,
							delay: .3
						}), document.querySelector(".fondAnim img").setAttribute("src", t.closest(".droite").querySelector(".innerMask .media").getAttribute("src")), document.querySelector(".tempToSingle > img").setAttribute("src", t.closest(".droite").querySelector(".innerMask .media").getAttribute("src")), document.querySelector(".tempToSingle .lettres").innerHTML = t.closest(".droite").querySelector(".lettres").innerHTML, document.querySelector(".tempToSingle p.h2").innerHTML = t.closest(".droite").querySelector(".title").innerHTML, vi.to(".fondAnim", {
							y: "0%",
							ease: "power4.inOut",
							duration: 1,
							delay: .3
						}), vi.to(".fondAnim img", {
							y: "0%",
							ease: "power4.inOut",
							duration: 1,
							delay: .3,
							onComplete: function () {
								document.querySelector(".tempToSingle").classList.add("actif"), e.killAllSTrigger(), e.incrementStep()
							}
						}), document.querySelectorAll(".elDom").forEach((function (e) {
							var n;
							wo(e) && e != t.closest(".elDom") && (e.getBoundingClientRect().bottom > 0 && e.getBoundingClientRect().top < 0 ? n = e.getBoundingClientRect().bottom : e.getBoundingClientRect().bottom > window.innerHeight && e.getBoundingClientRect().top < window.innerHeight && (n = e.getBoundingClientRect().top - window.innerHeight), vi.to(e, {
								y: -1 * n + "px",
								ease: "power4.inOut",
								duration: 1
							}))
						}))
					} else {
						console.log("debut", document.querySelectorAll(".elDom")), document.querySelectorAll(".elDom").forEach((function (e) {
							if (wo(e) && e != t.closest(".elDom") || wo(e) && e == t.closest("footer")) {
								var n;
								if (e.getBoundingClientRect().bottom > 0 && e.getBoundingClientRect().top < 0) n = e.getBoundingClientRect().bottom;
								else if (e.getBoundingClientRect().bottom > window.innerHeight && e.getBoundingClientRect().top < window.innerHeight) n = e.getBoundingClientRect().top - window.innerHeight;
								else {
									n = (e.getBoundingClientRect().bottom - e.getBoundingClientRect().top) / 2 + e.getBoundingClientRect().top <= window.innerHeight / 2 ? e.clientHeight + e.getBoundingClientRect().top : -1 * (e.clientHeight + window.innerHeight - (e.clientHeight + e.getBoundingClientRect().top))
								}
								vi.to(e, {
									y: -1 * n + "px",
									ease: "power4.inOut",
									duration: 1
								})
							}
						}));
						var r = 1;
						document.body.classList.contains("single-projets") ? (r = 1.4, document.body.classList.contains("toSingle") ? (document.querySelector(".tempToSingle > img").setAttribute("src", document.querySelector(".fondSingle img").getAttribute("src")), vi.to(".blurNoise", {
							opacity: 0,
							ease: "power4.inOut",
							duration: 1,
							delay: .4,
							onComplete: function () {
								document.querySelector(".tempToSingle").classList.add("actif2")
							}
						})) : (vi.fromTo(".fondSingle", {
							"clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
						}, {
							"clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
							ease: "power4.inOut",
							duration: 1,
							delay: .4
						}), vi.to(".fondSingle > div", {
							y: "-10%",
							ease: "power4.inOut",
							duration: 1,
							delay: .4
						}), vi.fromTo("canvas", {
							y: "10%"
						}, {
							y: "0%",
							ease: "power4.inOut",
							duration: 1,
							delay: .4
						}))) : document.body.classList.contains("home") && vi.to(".textsIntro", {
							opacity: 0,
							duration: .5
						}), vi.delayedCall(r, (function () {
							e.killAllSTrigger(), e.incrementStep()
						}))
					}
					$g.actif || (document.querySelector("canvas").classList.remove("off"), $g.init(), $g.animate(), $g.actif = !0), null != this.mission && document.body.classList.contains("page-template-mission") && this.mission.kill(), null != this.t404 && document.body.classList.contains("error404") && this.t404.kill()
				}
			}, {
				key: "killAllSTrigger",
				value: function () {
					ia.getAll().forEach((function (t) {
						t.kill()
					}))
				}
			}, {
				key: "changementDOM",
				value: function (t) {
					var e = this;
					this.ajaxPromise(t).then((function (t) {
						var n = (new DOMParser).parseFromString(t, "text/html");
						n.body.getAttribute("class"), e.newTitle = n.querySelector("title").innerHTML, e.newClass = n.body.getAttribute("class"), e.newHeader = n.querySelector(".inner-nav").innerHTML, e.newVoirCriteres = n.querySelector(".voirCriteres").innerHTML, e.newFooter = n.querySelector("footer").innerHTML, e.newDOM = n.getElementById("main").innerHTML, e.newOverlay = n.querySelector(".allOverlays").innerHTML, e.incrementStep()
					}))
				}
			}, {
				key: "animationEntree",
				value: function (t, e, n) {
					var i, r = this;
					(window.scrollTo(0, 0), this.currentStep = 0, document.getElementById("main").classList.remove("hidden"), document.title = this.newTitle, document.querySelector(".inner-nav").innerHTML = this.newHeader, document.body.setAttribute("class", this.newClass), document.querySelector("footer").innerHTML = this.newFooter, document.getElementById("main").innerHTML = this.newDOM, document.querySelector(".voirCriteres").innerHTML = this.newVoirCriteres, document.querySelector(".allOverlays").innerHTML = this.newOverlay, vi.set("footer", {
						clearProps: "all"
					}), this.animEnCours = !1, document.body.classList.contains("single") ? (document.querySelector("canvas").classList.add("off"), $g.killWebgl(), $g.actif = !1) : $g.updateBlocs(), this.first) ? (this.disparitionIntro(), document.body.classList.contains("single-projets") ? (vi.to(".fondSingle", {
						opacity: 1,
						delay: 1,
						onComplete: function () {
							r.lancements(), vi.set("canvas", {
								opacity: 1
							})
						}
					}), vi.delayedCall(3, (function () {
						null !== ev && ev.start()
					}))) : vi.delayedCall(3, (function () {
						r.lancements(), null !== ev && ev.start()
					})), vi.to(".inner-nav", {
						y: "0px",
						ease: "power4.out",
						duration: 1,
						delay: 2.5
					}), this.first = !1) : (null !== ev && (ev.scrollTo(0, {
						immediate: !0
					}), vi.delayedCall(1.6, (function () {
						ev.start()
					}))), null === (i = document.querySelector(".fondSingle")) || void 0 === i || i.classList.add("on"), this.lancements())
				}
			}, {
				key: "lancements",
				value: function () {
					this.global = new So, document.querySelector(".home") ? this.home = new To : document.querySelector(".single") ? this.single = new Ao : document.querySelector(".page-template-mission") ? this.mission = new iv : document.querySelector(".page-template-demarche") ? this.demarche = new rv : document.querySelector(".page-template-faq") ? this.faq = new sv : document.querySelector(".error404") && (this.t404 = new Eo)
				}
			}, {
				key: "disparitionIntro",
				value: function () {
					vi.fromTo("#intro .col2", {
						y: "60%",
						opacity: 0
					}, {
						y: "0%",
						stagger: .2,
						duration: 1.2,
						delay: .5,
						opacity: 1,
						ease: "power2.out"
					}), vi.to("#intro .transform, .introRond", {
						opacity: 1,
						delay: .5,
						duration: .5
					}), vi.to(".introRond", {
						rotate: 90,
						duration: 4,
						ease: "power1.inOut"
					}), vi.to(".introRond svg", {
						rotate: 360,
						repeat: 1,
						duration: 2,
						ease: "power2.inOut"
					}), vi.delayedCall(2.5, (function () {
						vi.to("#intro", {
							y: "-100%",
							ease: "power4.inOut",
							duration: 1.5
						}), vi.to("#introChild", {
							y: "100%",
							ease: "power4.inOut",
							duration: 1.5
						}), vi.to("#intro .transform", {
							y: 0,
							ease: "power4.inOut",
							duration: 1.5,
							onComplete: function () {
								document.getElementById("intro").classList.add("off")
							}
						}), document.querySelector(".textsIntro") && (vi.set(".textsIntro .col2", {
							opacity: 1
						}), vi.from(".textsIntro", {
							y: .5 * window.innerHeight - 30 + "px",
							ease: "power4.inOut",
							duration: 1.5
						}))
					}))
				}
			}, {
				key: "incrementStep",
				value: function () {
					this.currentStep++, this.currentStep == this.allSteps && this.animationEntree()
				}
			}, {
				key: "ajaxPromise",
				value: function (t) {
					return new Promise((function (e) {
						var n = new XMLHttpRequest;
						n.open("GET", t), n.onload = function () {
							return e(n.responseText)
						}, n.send()
					}))
				}
			}]), t
		}();
	vi.registerPlugin(ia, mo);
	var ov = new av;

	function lv() {
		document.body.classList.remove("hidden"), document.body.style.height = "auto", vi.to(".toMenuMob .a", {
			duration: .4,
			opacity: 0
		}), vi.to(".toMenuMob .r", {
			duration: .4,
			opacity: 1,
			delay: .6
		}), vi.to(".toMenuMob", {
			width: document.body.getAttribute("data-width-btn") + "px",
			ease: "power4.inOut",
			duration: 1,
			onComplete: function () {
				document.querySelector(".inner-nav .droite").classList.remove("actif"), document.querySelector(".navMob .toK").style.display = "flex", vi.to(".navMob .toK", {
					autoAlpha: 1,
					duration: .2
				}), document.querySelector(".toMenuMob").classList.remove("closeMob")
			}
		}), vi.to(".inner-nav", {
			"clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
			ease: "power4.inOut",
			duration: 1
		}), vi.to(".poly", {
			opacity: 0,
			duration: .2
		})
	}

	function cv() {
		document.querySelector(".overlay.actif .droite").classList.add("off"), vi.to(".overlay.actif .content", {
			x: "-100%",
			ease: "power4.inOut",
			duration: 1
		}), vi.to(".overlay.actif .merci", {
			x: "0%",
			ease: "power4.inOut",
			duration: 1
		}), nv = setInterval((function () {
			var t = document.createElement("img");
			t.src = document.body.getAttribute("data-directory") + "/img/star.svg";
			var e = document.querySelector(".overlay.actif .gauche");
			e.appendChild(t);
			var n = Math.random() * e.clientWidth,
				i = Math.random() * e.clientHeight;
			vi.fromTo(t, {
				rotate: 360 * Math.random() * (2 * Math.round(Math.random()) - 1),
				x: n + "px",
				y: i - 200 + "px",
				scale: .5
			}, {
				rotate: 0,
				y: i + "px",
				duration: 1.5,
				scale: 1,
				ease: "elastic.out(0.8, 0.35)",
				onComplete: function () {
					vi.to(t, {
						opacity: 0,
						duration: .2,
						delay: .4,
						onComplete: function () {
							t.remove()
						}
					})
				}
			})
		}), 150)
	}

	function hv() {
		var t;
		document.querySelector(".overlay.actif .droite").scrollTo(0, 0), document.querySelector(".overlay.actif .droite").classList.remove("off"), null === (t = document.querySelector(".overlay.actif form")) || void 0 === t || t.reset(),
			document.querySelector(".innerSelect2") && document.querySelector(".innerSelect2").classList.add("off")
	}
	window.addEventListener("DOMContentLoaded", (function () {
		var t, e, n = document.body.dataset.themeurl,
			i = 0;
		setInterval((function () {
			var t = n + "/img/favicons/favicon" + (i = (i + 1) % 65) + ".png";
			document.querySelector("link[rel=icon]").setAttribute("href", t)
		}), 150), window.addEventListener("resize", (t = window.innerWidth, e = Math.max(t - document.documentElement.clientWidth, 0), void document.documentElement.style.setProperty("--scrollbar-width", "".concat(e, "px")))), ov.start(window.location.href), document.addEventListener("click", (function (t) {
			if (!t.target.closest("a") || t.target.closest('a[target="_blank"]') || t.target.closest("a").classList.contains("mailTo"))
				if (t.target.closest(".toMenu")) vi.to(".inner-nav", {
					x: "0px",
					ease: "power4.inOut",
					duration: .5
				}), vi.to(".innerK", {
					x: "100%",
					ease: "power4.inOut",
					duration: .5
				}), vi.to(".toMenu", {
					autoAlpha: 0,
					duration: .5,
					ease: "power4.inOut"
				});
				else if (t.target.closest(".toOverlay") && !document.querySelector(".overlay.actif")) null !== ev && (ev.stop(), ev.destroy()), window.innerWidth <= 900 && document.body.classList.contains("hidden") && lv(), t.target.closest(".toPartager") ? document.querySelector(".o-share").classList.add("actif") : t.target.closest(".toIdea") ? document.querySelector(".o-idea").classList.add("actif") : t.target.closest(".toHelp") ? document.querySelector(".o-help").classList.add("actif") : t.target.closest(".toDonation") ? document.querySelector(".o-donation").classList.add("actif") : t.target.closest(".toContact") ? document.querySelector(".o-contact").classList.add("actif") : t.target.closest(".toMember") ? document.querySelectorAll(".o-member")[t.target.closest(".toMember").getAttribute("data-num")].classList.add("actif") : t.target.closest(".toManifesto") && document.querySelector(".o-manifesto").classList.add("actif"), vi.set(".overlay.actif .content", {
				x: "0%"
			}), document.querySelector(".overlay.actif .merci") && vi.set(".overlay.actif .merci", {
				x: "100%"
			}), tv.init(), hv(), document.body.classList.add("hidden"), vi.to(".overlay.actif, .overlay.actif .innerOver, .overlayBlur", {
				y: "0%",
				ease: "power4.inOut",
				duration: 1,
				onComplete: function () {}
			});
			else if (t.target.closest(".toBack")) hv(), vi.to(".overlay.actif .content", {
				x: "0%",
				ease: "power4.inOut",
				duration: 1
			}), vi.to(".overlay.actif .merci", {
				x: "100%",
				ease: "power4.inOut",
				duration: 1
			}), clearInterval(nv);
			else if (t.target.closest(".toMenuMob") && !t.target.closest(".toMenuMob").classList.contains("closeMob")) vi.to(".toMenuMob .r", {
				duration: .4,
				opacity: 0
			}), vi.to(".toMenuMob .a", {
				duration: .4,
				opacity: 1,
				delay: .6
			}), document.body.classList.add("hidden"), document.body.style.height = window.innerHeight + "px", document.body.setAttribute("data-width-btn", document.querySelector(".toMenuMob").clientWidth), document.querySelector(".inner-nav .droite").classList.add("actif"), vi.to(".navMob .toK", {
				autoAlpha: 0,
				duration: .2,
				onComplete: function () {
					document.querySelector(".navMob .toK").style.display = "none"
				}
			}), vi.fromTo(".poly", {
				opacity: 0
			}, {
				opacity: 1,
				delay: .8,
				duration: .2
			}), vi.to(".toMenuMob", {
				width: window.innerWidth - (document.querySelector(".lang-item:not(.current-lang) a").clientWidth + 10 + 10 + 5) + "px",
				ease: "power4.inOut",
				duration: 1,
				onComplete: function () {
					document.querySelector(".toMenuMob").classList.add("closeMob")
				}
			}), vi.to(".inner-nav", {
				"clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				ease: "power4.inOut",
				duration: 1
			});
			else if (t.target.closest(".closeMob")) lv(), vi.to(".toMenuMob .a", {
				duration: .4,
				opacity: 0
			}), vi.to(".toMenuMob .r", {
				duration: .4,
				opacity: 1,
				delay: .6
			});
			else if (t.target.closest(".toCA")) {
				var e = {};
				e.scroll = window.pageYOffset, vi.to(e, {
					scroll: document.querySelector(".m-champsMorph").getBoundingClientRect().top + window.pageYOffset - 58,
					ease: "power4.inOut",
					duration: 1.4,
					onUpdate: function () {
						window.scrollTo(0, e.scroll)
					}
				})
			} else if (t.target.closest(".toMani")) {
				var n = {};
				n.scroll = window.pageYOffset, vi.to(n, {
					scroll: document.querySelector(".m-manifesto").getBoundingClientRect().top + window.pageYOffset - 5,
					ease: "power4.inOut",
					duration: 1.4,
					onUpdate: function () {
						window.scrollTo(0, n.scroll)
					}
				})
			} else if (t.target.closest(".toBoard")) {
				var i = {};
				i.scroll = window.pageYOffset, vi.to(i, {
					scroll: document.querySelector(".h-more").getBoundingClientRect().top + window.pageYOffset,
					ease: "power4.inOut",
					duration: 1.4,
					onUpdate: function () {
						window.scrollTo(0, i.scroll)
					}
				})
			} else t.target.closest(".toPaypal") && document.querySelector("form[target=_blank]").submit();
			else {
				document.querySelector("nav").classList.add("off"), vi.delayedCall(.1, (function () {
					document.querySelector("nav").classList.remove("off")
				})), t.target.closest("a[hreflang]") && document.body.classList.add("changeLang"), t.target.closest("a").classList.contains("toSingle") ? document.body.classList.add("toSingleTransition") : t.target.closest("a").getAttribute("href").indexOf("projets") > -1 && document.body.classList.add("toSingle");
				var r = t.target.closest("a");
				if (t.preventDefault(), t.target.closest("a").classList.contains("toK") && document.body.classList.contains("home")) {
					var s = {};
					s.dist = window.pageYOffset, vi.to(s, {
						dist: 0,
						ease: "power3.inOut",
						duration: 1.6,
						onUpdate: function () {
							window.scrollTo(0, s.dist)
						}
					})
				} else if (t.target.closest("a").classList.contains("toActivePro") && document.body.classList.contains("home")) {
					var a = {};
					a.dist = window.pageYOffset, vi.to(a, {
						dist: document.querySelector(".premiersBlocs").getBoundingClientRect().top - 5 + window.pageYOffset,
						ease: "power3.inOut",
						duration: 1.6,
						onUpdate: function () {
							window.scrollTo(0, a.dist)
						}
					}), window.innerWidth <= 900 && lv()
				} else if (t.target.closest("a").classList.contains("toPastPro") && document.body.classList.contains("home")) {
					var o = {};
					o.dist = window.pageYOffset, vi.to(o, {
						dist: document.querySelector(".pastPro").getBoundingClientRect().top - 5 + window.pageYOffset,
						ease: "power3.inOut",
						duration: 1.6,
						onUpdate: function () {
							window.scrollTo(0, o.dist)
						}
					}), window.innerWidth <= 900 && lv()
				} else ov.animEnCours || (t.target.closest("a").classList.contains("toActivePro") ? document.querySelector("html").classList.add("toActivePro") : t.target.closest("a").classList.contains("toPastPro") && document.querySelector("html").classList.add("toPastPro"), ov.start(r.getAttribute("href"), t.target), history.pushState({}, "", r.getAttribute("href")))
			}
			t.target.closest(".innerSelect") && !Mo() && (document.querySelectorAll(".innerSelect").forEach((function (t) {
				t.classList.remove("devant")
			})), t.target.closest(".innerSelect").classList.add("devant"), document.querySelectorAll(".fauxSelect").forEach((function (t) {
				t.classList.remove("actif")
			})), t.target.closest(".innerSelect").querySelector(".fauxSelect").classList.add("actif")), t.target.closest(".uneOption") && (t.target.closest(".uneOption").parentElement.classList.remove("actif"), document.querySelectorAll(".innerSelect").forEach((function (t) {
				t.classList.remove("devant")
			})), t.target.closest(".uneOption").parentElement.parentElement.querySelector("select").value = t.target.closest(".uneOption").getAttribute("data-value")), !t.target.closest(".innerSelect") && document.querySelector(".fauxSelect.actif") && (document.querySelectorAll(".fauxSelect").forEach((function (t) {
				t.classList.remove("actif")
			})), document.querySelectorAll(".innerSelect").forEach((function (t) {
				t.classList.remove("devant")
			}))), t.target.closest(".closeBtn") && (clearInterval(nv), null !== ev && (ev = Mo() ? null : new Kg), vi.to(".overlay.actif, .overlayBlur", {
				y: "100%",
				ease: "power4.inOut",
				duration: 1,
				onComplete: function () {
					document.body.classList.remove("hidden")
				}
			}), vi.to(".overlay.actif .innerOver", {
				y: "-90%",
				ease: "power4.inOut",
				duration: 1,
				onComplete: function () {
					tv.killOverlay(), document.querySelector(".overlay.actif").classList.remove("actif")
				}
			}))
		})), document.addEventListener("submit", (function (t) {
			if (t.target.closest("form")) {
				if (t.target.closest("form").classList.contains("formIdea")) {
					t.preventDefault();
					var e, n = t.target;
					e = "c_name=" + encodeURIComponent(n.querySelector('input[name="name"]').value), e += "&c_email=" + encodeURIComponent(n.querySelector('input[name="email"]').value), e += "&c_foundation=" + encodeURIComponent(n.querySelector('input[name="foundation"]').value), e += "&c_message=" + encodeURIComponent(n.querySelector("textarea").value);
					var i = new XMLHttpRequest;
					return i.open("GET", "?alrightIdea&" + e, !0), i.onload = function () {
						i.status >= 200 && i.status < 400 && cv()
					}, i.send(), !1
				}
				if (t.target.closest("form").classList.contains("formHelp")) {
					t.preventDefault();
					var r, s = t.target;
					r = "c_name=" + encodeURIComponent(s.querySelector('input[name="name"]').value), r += "&c_email=" + encodeURIComponent(s.querySelector('input[name="email"]').value), r += "&c_project=" + encodeURIComponent(s.querySelector('select[name="choisirProjet"]').options[s.querySelector('select[name="choisirProjet"]').selectedIndex].text), r += "&c_message=" + encodeURIComponent(s.querySelector("textarea").value);
					var a = new XMLHttpRequest;
					return a.open("GET", "?alrightHelp&" + r, !0), a.onload = function () {
						a.status >= 200 && a.status < 400 && cv()
					}, a.send(), !1
				}
				if (t.target.closest("form").classList.contains("formContact")) {
					t.preventDefault();
					var o, l = t.target;
					o = "c_name=" + encodeURIComponent(l.querySelector('input[name="name"]').value), o += "&c_email=" + encodeURIComponent(l.querySelector('input[name="email"]').value), o += "&c_message=" + encodeURIComponent(l.querySelector("textarea").value);
					var c = new XMLHttpRequest;
					return c.open("GET", "?alrightContact&" + o, !0), c.onload = function () {
						c.status >= 200 && c.status < 400 && cv()
					}, c.send(), !1
				}
			}
		})), new IntersectionObserver((function (t) {
			t.forEach((function (t) {
				window.innerWidth > 900 && (t.isIntersecting ? (vi.to(".inner-nav", {
					x: "0px",
					ease: "power4.inOut",
					duration: .5
				}), vi.to(".innerK", {
					x: "100%",
					ease: "power4.inOut",
					duration: .5
				}), vi.to(".toMenu", {
					autoAlpha: 0,
					duration: .5,
					ease: "power4.inOut"
				})) : (vi.to(".inner-nav", {
					x: document.querySelector(".inner-nav .droite").clientWidth + "px",
					ease: "power4.inOut",
					duration: .5
				}), vi.to(".innerK", {
					x: "0%",
					ease: "power4.inOut",
					duration: .5
				}), vi.to(".toMenu", {
					autoAlpha: 1,
					duration: .5,
					ease: "power4.inOut"
				})))
			}))
		})).observe(document.querySelector(".intersectionOb"))
	})), window.addEventListener("popstate", (function (t) {
		window.location.href.indexOf("projets") > -1 && document.body.classList.add("toSingle"), ov.start(location.href, document.body)
	}), !1), history.scrollRestoration && (history.scrollRestoration = "manual")
}();
//# sourceMappingURL=app.js.map