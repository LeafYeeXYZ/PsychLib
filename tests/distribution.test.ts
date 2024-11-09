import * as pl from '../lib/index.ts'
import * as _jt from 'npm:jstat-esm@^2.0.0'
import { assertAlmostEquals } from 'jsr:@std/assert'

const jt = {
  z2p: (z: number): number => _jt.normal.cdf(z, 0, 1),
  p2z: (p: number): number => _jt.normal.inv(p, 0, 1),
  t2p: (t: number, df: number): number => 2 * (1 - _jt.studentt.cdf(Math.abs(t), df)),
  p2t: (p: number, df: number): number => _jt.studentt.inv(1 - p / 2, df),
  f2p: (f: number, df1: number, df2: number): number => 1 - _jt.centralF.cdf(f, df1, df2),
  p2f: (p: number, df1: number, df2: number): number => _jt.centralF.inv(1 - p, df1, df2),
  c2p: (c: number, df: number): number => 1 - _jt.chisquare.cdf(c, df),
  p2c: (p: number, df: number): number => _jt.chisquare.inv(1 - p, df),
}

Deno.test('Distribution Test', () => {
  for (let i = 0; i < 1000; i++) {
    const stats = [
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 10,
      Math.random() * 20,
    ]
    const sig = Math.random()
    const df1 = (Math.random() + 1) * 10
    const df2 = (Math.random() + 1) * 100
    assertAlmostEquals(pl.z2p(stats[0]), jt.z2p(stats[0]), 1e-6)
    assertAlmostEquals(pl.p2z(sig), jt.p2z(sig), 1e-6)
    assertAlmostEquals(pl.t2p(stats[1], df2), jt.t2p(stats[1], df2), 1e-6)
    assertAlmostEquals(pl.p2t(sig, df2), jt.p2t(sig, df2), 1e-6)
    assertAlmostEquals(pl.f2p(stats[2], df1, df2), jt.f2p(stats[2], df1, df2), 1e-6)
    assertAlmostEquals(pl.p2f(sig, df1, df2), jt.p2f(sig, df1, df2), 1e-6)
    assertAlmostEquals(pl.c2p(stats[2], df1), jt.c2p(stats[2], df1), 1e-6)
    assertAlmostEquals(pl.p2c(sig, df1), jt.p2c(sig, df1), 1e-6)
  }
  const randomResult: number[] = []
  const randomMean = Math.random() * 10
  const randomStd = Math.random() * 5
  for (let i = 0; i < 100000; i++) {
    randomResult.push(pl.randomNormal(randomMean, randomStd))
  }
  assertAlmostEquals(pl.mean(randomResult), randomMean, 1e-1)
  assertAlmostEquals(pl.std(randomResult, false), randomStd, 1e-1)
})