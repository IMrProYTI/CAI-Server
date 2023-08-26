import translate from "@iamtraction/google-translate";
import log from "./log";

/*
	Translate Languages
	ab, aa, af, ak, sq,	am, ar, an, hy, as, av, ae, ay, az, bm, ba, eu, be, bn, bi, bs, br, bg, my, ca, ch, ce, ny, zh, cu, cv, kw, co, cr, hr, cs, da, dz, en, eo, et, ee, fo, fj, fi, fr, fy, gd, gl, lg, ka, de, gn, gu, ha, he, hz, hi, Motu, hu, is, io, ig, id, ia, iu, ik, ga, it, ja, jv, kn, kr, ks, kk, km, rw, kv, kg, ko, ku, lo, la, lv, ln, lt, lu, mk, mg, ms, ml, mt, gv, mi, mr, mh, mn, na, nd, nr, ng, ne, no, nb, nn, ii, oc, oj, or, om, pi, fa, pl, pt, qu, rm, rn, ru, se, sm, sg, sa, sc, sr, sn, sd, sk, sl, so, st, su, sw, ss, sv, tl, ty, tg, ta, tt, te, th, bo, ti, to, ts, tn, tr, tk, tw, uk, ur, uz, ve, vi, vo, wa, cy, wo, xh, yi, yo, za, zu
*/

/*
id, da, de, en-GB, en-US, es-ES, fr, hr, it, lt, hu, nl, no, pl, pt-BR, ro, fi, sv-SE, vi, tr, cs, el, bg, ru, uk, hi, th, zh-CN, ja, zh-TW, ko
*/

class Translate {
	private regex: RegExp = new RegExp(`^[\d\w\s\r~@#$^&*()\-_+=[\]{}|\\,.!?:<>'"\/;\` %]{1,}$`);

	constructor() {};

	public async en(input: string): Promise<string> {
		if (this.regex.test(input)) {
			return input;
		} else {
			const response = await translate(input, { to: 'en' });
			return response.text;
		};
	};

	public async locale(input: string, language?: string): Promise<string> {
		if (language) {
			const lang = this.Discord2ISO639(language);
			if (lang !== 'en') {
				const responce = await translate(input, { from: 'en', to: lang });
				return responce.text;
			} else {
				return input
			};
		} else {
			return input;
		};
	};

	private Discord2ISO639(language: string): string {
		switch (language) {
			case 'en-GB': return 'en';
			case 'en-US': return 'en';
			case 'es-ES': return 'es';
			case 'pt-BR': return 'pt';
			case 'sv-SE': return 'sv';
			case 'zh-CN': return 'zh';
			case 'zh-TW': return 'zh';
		
			default: return language;
		};
	};
};

export default Translate;