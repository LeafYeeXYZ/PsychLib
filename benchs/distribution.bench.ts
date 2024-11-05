import * as pl from '../lib/index.ts'
import * as jt from 'npm:jstat-esm@^2.0.0'

const z2p: (z: number) => number = (z) => jt.normal.cdf(z, 0, 1)
const p2z: (p: number) => number = (p) => jt.normal.inv(p, 0, 1)
const t2p: (t: number, df: number) => number = (t, df) => 2 * (1 - jt.studentt.cdf(Math.abs(t), df))
const p2t: (p: number, df: number) => number = (p, df) => jt.studentt.inv(1 - p / 2, df)
const f2p: (f: number, df1: number, df2: number) => number = (f, df1, df2) => 1 - jt.centralF.cdf(f, df1, df2)
const p2f: (p: number, df1: number, df2: number) => number = (p, df1, df2) => jt.centralF.inv(1 - p, df1, df2)

Deno.bench('Distribution Bench - z2p - @psych/lib', () => { pl.z2p((Math.random() - 0.5) * 5) })
Deno.bench('Distribution Bench - z2p - jstat-esm', () => { z2p((Math.random() - 0.5) * 5) })
Deno.bench('Distribution Bench - p2z - @psych/lib', () => { pl.p2z(Math.random()) })
Deno.bench('Distribution Bench - p2z - jstat-esm', () => { p2z(Math.random()) })
Deno.bench('Distribution Bench - t2p - @psych/lib', () => { pl.t2p((Math.random() - 0.5) * 10, (Math.random() + 1) * 100) })
Deno.bench('Distribution Bench - t2p - jstat-esm', () => { t2p((Math.random() - 0.5) * 10, (Math.random() + 1) * 100) })
Deno.bench('Distribution Bench - p2t - @psych/lib', () => { pl.p2t(Math.random(), (Math.random() + 1) * 100) })
Deno.bench('Distribution Bench - p2t - jstat-esm', () => { p2t(Math.random(), (Math.random() + 1) * 100) })
Deno.bench('Distribution Bench - f2p - @psych/lib', () => { pl.f2p(Math.random() * 10, (Math.random() + 1) * 5, (Math.random() + 1) * 100, false) })
Deno.bench('Distribution Bench - f2p - jstat-esm', () => { f2p(Math.random() * 10, (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
Deno.bench('Distribution Bench - p2f - @psych/lib', () => { pl.p2f(Math.random(), (Math.random() + 1) * 5, (Math.random() + 1) * 100, false) })
Deno.bench('Distribution Bench - p2f - jstat-esm', () => { p2f(Math.random(), (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
