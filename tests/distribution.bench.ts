import * as pl from '../lib/index.ts'
import * as jt from 'npm:jstat-esm@^2.0.0'

const z2p: (z: number) => number = (z) => jt.normal.cdf(z, 0, 1)
const p2z: (p: number) => number = (p) => jt.normal.inv(p, 0, 1)
const t2p: (t: number, df: number) => number = (t, df) => 2 * (1 - jt.studentt.cdf(Math.abs(t), df))
const p2t: (p: number, df: number) => number = (p, df) => jt.studentt.inv(1 - p / 2, df)
const f2p: (f: number, df1: number, df2: number) => number = (f, df1, df2) => 1 - jt.centralF.cdf(f, df1, df2)
const p2f: (p: number, df1: number, df2: number) => number = (p, df1, df2) => jt.centralF.inv(1 - p, df1, df2)

const stats = [
  (Math.random() - 0.5) * 2,
  (Math.random() - 0.5) * 10,
  Math.random() * 10,
]

const sigs = [
  Math.random(),
  Math.random(),
  Math.random(),
]

Deno.bench('Distribution Bench - @psych/lib', () => {
  pl.z2p(stats[0])
  pl.p2z(sigs[0])
  pl.t2p(stats[1], 30)
  pl.p2t(sigs[1], 30)
  pl.f2p(stats[2], 3, 30, false)
  pl.p2f(sigs[2], 3, 30, false)
})

Deno.bench('Distribution Bench - jstat-esm', () => {
  z2p(stats[0])
  p2z(sigs[0])
  t2p(stats[1], 30)
  p2t(sigs[1], 30)
  f2p(stats[2], 3, 30)
  p2f(sigs[2], 3, 30)
})
