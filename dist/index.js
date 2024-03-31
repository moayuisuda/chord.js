let N = {
  0: ["C"],
  1: ["C#", "Db"],
  2: ["D"],
  3: ["D#", "Eb"],
  4: ["E"],
  5: ["F"],
  6: ["F#", "Gb"],
  7: ["G"],
  8: ["G#", "Ab"],
  9: ["A"],
  10: ["A#", "Bb"],
  11: ["B"]
}, S = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  "E#": 5,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11
}, I = {
  "#1": 1,
  b2: 1,
  "#2": 3,
  b3: 3,
  "#3": 5,
  b4: 4,
  "#4": 6,
  b5: 6,
  "#5": 8,
  b6: 8,
  "#6": 10,
  b7: 10,
  "#7": 12,
  b8: 11,
  "#8": 13,
  2: 2,
  3: 4,
  4: 5,
  5: 7,
  6: 9,
  7: 11,
  8: 12
}, p = /* @__PURE__ */ new Map([
  ["m", [3, 7]],
  ["m7", [3, 7, 10]],
  ["m9", [3, 7, 10, 14]],
  ["m11", [3, 7, 10, 14, 17]],
  ["M7", [4, 7, 11]],
  ["M9", [4, 7, 11, 14]],
  ["M11", [4, 7, 11, 14, 17]],
  ["M", [4, 7]],
  ["7", [4, 7, 10]],
  ["9", [4, 7, 10, 14]],
  ["11", [3, 7, 11, 14, 17]],
  ["sus2", [2, 7]],
  ["sus4", [5, 7]],
  ["aug", [4, 8]],
  ["dim", [3, 6]],
  // 如果正则是 ^[A-G](#|b)?(\d{0,2}) 那 CM7 中的 M7 无法被捕获，需要放在最后
  ["", [4, 7]]
]), T = {
  ionian: [2, 2, 1, 2, 2, 2, 1],
  major: [2, 2, 1, 2, 2, 2, 1],
  dorian: [2, 1, 2, 2, 2, 1, 2],
  phrygian: [1, 2, 2, 2, 1, 2, 2],
  lydian: [2, 2, 2, 1, 2, 2, 1],
  mixolydian: [2, 2, 1, 2, 2, 1, 2],
  aeolian: [2, 1, 2, 2, 1, 2, 2],
  minor: [2, 1, 2, 2, 1, 2, 2],
  locrian: [1, 2, 2, 1, 2, 2, 2],
  melodicMinor: [2, 1, 2, 2, 2, 2, 1],
  harmonicMinor: [2, 1, 2, 2, 1, 3, 1]
}, z = {
  ionian: ["1", "2", "3", "4", "5", "6", "7"],
  major: ["1", "2", "3", "4", "5", "6", "7"],
  dorian: ["1", "2", "b3", "4", "5", "6", "b7"],
  phrygian: ["1", "b2", "b3", "4", "5", "b6", "b7"],
  lydian: ["1", "2", "3", "#4", "5", "6", "7"],
  mixolydian: ["1", "2", "3", "4", "5", "6", "b7"],
  aeolian: ["1", "2", "b3", "4", "5", "b6", "b7"],
  minor: ["1", "2", "b3", "4", "5", "b6", "b7"],
  locrian: ["1", "b2", "b3", "4", "b5", "b6", "b7"],
  melodicMinor: ["1", "2", "b3", "4", "5", "b6", "7"],
  harmonicMinor: ["1", "2", "b3", "4", "5", "6", "7"]
};
function m(e, t) {
  let r = [e], n;
  for (let l of t)
    n = e + l, r.push(n);
  return r;
}
function M(e, t, r) {
  let n = [], l, o, i, a = g(r);
  for (let u of e) {
    for (l = t; u >= 12; )
      u -= 12, l++;
    o = d(u), i = o[a] ? o[a] : o[0], n.push(i + l);
  }
  return n;
}
function w(e, t) {
  let r = [], n, l, o = g(t);
  for (let i of e) {
    for (; i >= 12; )
      i -= 12;
    n = d(i), l = n[o] ? n[o] : n[0], r.push(l);
  }
  return r;
}
function x(e) {
  let t = [];
  for (let r = 0; r < e.length; r++)
    r ? t.push(t[r - 1] + e[r]) : t.push(e[r]);
  return t;
}
function D([e, t, r], n) {
  let l, o = g(n);
  l = [t - e, r - e].join("-");
  let a = O(p)[l];
  for (; e >= 12; )
    e -= 12;
  return d(e)[o] + a;
}
function h(e) {
  let t = S[e];
  if (Object.prototype.toString.call(t) !== "[object Undefined]")
    return t;
  throw `[Chord] Can't convert "${e}" into interval `;
}
function E(e) {
  let t = p.get(e);
  return v(t);
}
function j(e) {
  let t = T[e];
  if (t)
    return v(t);
  throw `[Chord] Can't find a scale matched "${e}"`;
}
function d(e) {
  return N[e];
}
function y(e) {
  let t = Number(e.match(/\d{1,2}/)[0]), r = e.match(/(b|#)/) && e.match(/(b|#)/)[0], n = 0;
  for (; t >= 9; )
    t -= 7, n++;
  return console.log(r, t, I[r ? r + t : t]), I[r ? r + t : t] + n * 12;
}
function s(e) {
  let t = e.match(/[A-G](#|b)?/);
  if (t)
    return t[0];
  throw `[Chord] Can't resolve the root note for "${e}"`;
}
function G(e) {
  return Number(e.match(/\d/)[0]);
}
function F(e) {
  let t = null;
  for (let [r] of p) {
    let n = new RegExp(`^[A-G](#|b)?(${r}\\d{0,2})`);
    if (t = e.match(n))
      return t[2];
  }
  throw `[Chord] Can't find a chord type matched "${e}"`;
}
function $(e) {
  let t = [], r = /add((#|b)?\d{1,2})/g, n;
  for (; n = r.exec(e); )
    t.push(n[1]);
  return t;
}
function B(e) {
  let t = [], r = /omit((#|b)?\d{1,2})/g, n;
  for (; n = r.exec(e); )
    t.push(n[1]);
  return t;
}
function k(e) {
  let t = e.match(/\/([A-G](#|b)?)/);
  if (t)
    return t[1];
}
function g(e) {
  return e == "#" ? 0 : 1;
}
function R(e) {
  return {
    root: s(e),
    type: F(e),
    add: $(e),
    omit: B(e),
    on: k(e)
  };
}
function K(e, t, r) {
  if (r) {
    let n = e[0], l = h(s(e[1])), o = h(t);
    if (l === o)
      return;
    l > o ? e.splice(0, 1, t + r) : e.splice(0, 1, t + (r - 1)), e.push(s(n) + (G(n) + 1));
  } else
    e.unshift(t);
}
function v(e) {
  if (!(e instanceof Object))
    return e;
  let t = Object.prototype.toString.call(e) === "[object Object]" ? {} : [];
  for (let r in e)
    t[r] = e instanceof Object ? v(e[r]) : e[r];
  return t;
}
function O(e) {
  let t = {};
  for (let [r, n] of e.entries())
    t[n.join("-")] = r;
  return t;
}
function H(e, t, r = "#") {
  const n = s(e);
  let l = G(e), i = h(n) + t;
  i >= 12 && (i -= 12, l++), i < 0 && (i += 12, l--);
  const a = d(i);
  return a[r] ? a[r] : a[0] + l;
}
function C({ root: e, type: t, add: r, omit: n, on: l }, o, i = "#") {
  let a = [], u = E(t), c = h(e);
  r.map((f) => {
    u.push(y(f));
  }), u.sort((f, b) => f - b);
  for (let f = 0; f < n.length; f++)
    for (let b = 0; b < u.length; b++)
      y(n[f]) == u[b] && u.splice(b, 1);
  let A = m(c, u);
  return o ? a = M(A, o, i) : a = w(A, i), l && K(a, l, o), a;
}
function U({ root: e, type: t }, r = 4, n = "#") {
  let l = h(e), o = j(t), i = x(o), a = m(l, i);
  return r ? M(a, r, n) : w(a, n);
}
function q({ root: e, type: t }, r = "#") {
  let n = [], l = [], o = h(e), i = x(j(t)), a = m(o, i);
  l = l.concat(a);
  let u = 5;
  for (let c = 1; c < u; c++)
    l.push(a[c] + 12);
  for (let c = 0; c < a.length - 1; c++)
    n.push(
      D(
        [
          l[c],
          l[c + 2],
          l[c + 4]
        ],
        r
      )
    );
  return n;
}
function J(e, t, r) {
  return Object.prototype.toString.call(e) === "[object Object]" ? C(e, t, r) : C(R(e), t, r);
}
function L(e, t, r) {
  return U(e, t, r);
}
function P(e) {
  return q(e);
}
export {
  m as absoluteIntervalArr,
  H as add,
  J as chord,
  v as copy,
  I as degreeMap,
  y as degreeToInterval,
  $ as getAdd,
  s as getRoot,
  g as getSignIndex,
  F as getType,
  D as intervalArrToChord,
  w as intervalArrToNotes,
  M as intervalArrToNotesO,
  N as intervalMap,
  d as intervalToNote,
  O as mapStringfy,
  S as noteMap,
  h as noteToInterval,
  K as replaceRoot,
  L as scale,
  P as scaleChords,
  T as scaleMap,
  x as scaleToIntervalArr,
  z as singNameMap,
  R as strToOptions,
  p as typeMap,
  E as typeToIntervalArr,
  j as typeToScale
};
