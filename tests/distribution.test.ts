import * as pl from '../lib/index.ts'
import * as jt from 'npm:jstat-esm@^2.0.0'
import { assertAlmostEquals } from 'jsr:@std/assert'

const z2p: (z: number) => number = (z) => jt.normal.cdf(z, 0, 1)
const p2z: (p: number) => number = (p) => jt.normal.inv(p, 0, 1)
const t2p: (t: number, df: number) => number = (t, df) => 2 * (1 - jt.studentt.cdf(Math.abs(t), df))
const p2t: (p: number, df: number) => number = (p, df) => jt.studentt.inv(1 - p / 2, df)
const f2p: (f: number, df1: number, df2: number) => number = (f, df1, df2) => 1 - jt.centralF.cdf(f, df1, df2)
const p2f: (p: number, df1: number, df2: number) => number = (p, df1, df2) => jt.centralF.inv(1 - p, df1, df2)

const precision = 1e-6

Deno.test('Distribution Test', () => {
  for (let i = 0; i < 100; i++) {
    const stats = [
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 10,
      Math.random() * 20,
    ]
    const sigs = [
      Math.random(),
      Math.random(),
      Math.random(),
    ]
    const df1 = (Math.random() + 1) * 3
    const df2 = (Math.random() + 1) * 30
    assertAlmostEquals(pl.z2p(stats[0]), z2p(stats[0]), precision)
    assertAlmostEquals(pl.p2z(sigs[0]), p2z(sigs[0]), precision)
    assertAlmostEquals(pl.t2p(stats[1], df2), t2p(stats[1], df2), precision)
    assertAlmostEquals(pl.p2t(sigs[1], df2), p2t(sigs[1], df2), precision)
    assertAlmostEquals(pl.f2p(stats[2], df1, df2, false), f2p(stats[2], df1, df2), precision)
    assertAlmostEquals(pl.p2f(sigs[2], df1, df2, false), p2f(sigs[2], df1, df2), precision)
  }
})