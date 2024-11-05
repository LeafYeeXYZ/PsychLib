import * as pl from '../lib/index.ts'
import * as _jt from 'npm:jstat-esm@^2.0.0'

const sl = {
  z2p: async (z: number): Promise<number> => {
    const fn = await import('npm:@stdlib/stats-base-dists-normal-cdf')
    return fn.default(z, 0, 1)
  },
  p2z: async (p: number): Promise<number> => {
    const fn = await import('npm:@stdlib/stats-base-dists-normal-quantile')
    return fn.default(p, 0, 1)
  },
  t2p: async (t: number, df: number): Promise<number> => {
    const fn = await import('npm:@stdlib/stats-base-dists-t-cdf')
    return 2 * (1 - fn.default(Math.abs(t), df))
  },
  p2t: async (p: number, df: number): Promise<number> => {
    const fn = await import('npm:@stdlib/stats-base-dists-t-quantile')
    return fn.default(1 - p / 2, df)
  },
  f2p: async (f: number, df1: number, df2: number): Promise<number> => {
    const fn = await import('npm:@stdlib/stats-base-dists-f-cdf')
    return 1 - fn.default(f, df1, df2)
  },
  p2f: async (p: number, df1: number, df2: number): Promise<number> => {
    const fn = await import('npm:@stdlib/stats-base-dists-f-quantile')
    return fn.default(1 - p, df1, df2)
  },
  c2p: async (c: number, df: number): Promise<number> => {
    const fn = await import('npm:@stdlib/stats-base-dists-chisquare-cdf')
    return 1 - fn.default(c, df)
  },
  p2c: async (p: number, df: number): Promise<number> => {
    const fn = await import('npm:@stdlib/stats-base-dists-chisquare-quantile')
    return fn.default(1 - p, df)
  },
}

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

// Deno.bench('Distribution Bench - z2p - @psych/lib', { group: 'z2p', baseline: true }, () => { pl.z2p((Math.random() - 0.5) * 5) })
// Deno.bench('Distribution Bench - z2p - @stdlib/stats', { group: 'z2p' }, async () => { await sl.z2p((Math.random() - 0.5) * 5) })
// Deno.bench('Distribution Bench - z2p - jstat-esm', { group: 'z2p' }, () => { jt.z2p((Math.random() - 0.5) * 5) })
// Deno.bench('Distribution Bench - p2z - @psych/lib', { group: 'p2z', baseline: true }, () => { pl.p2z(Math.random()) })
// Deno.bench('Distribution Bench - p2z - @stdlib/stats', { group: 'p2z' }, async () => { await sl.p2z(Math.random()) })
// Deno.bench('Distribution Bench - p2z - jstat-esm', { group: 'p2z' }, () => { jt.p2z(Math.random()) })
// Deno.bench('Distribution Bench - t2p - @psych/lib', { group: 't2p', baseline: true }, () => { pl.t2p((Math.random() - 0.5) * 10, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - t2p - @stdlib/stats', { group: 't2p' }, async () => { await sl.t2p((Math.random() - 0.5) * 10, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - t2p - jstat-esm', { group: 't2p' }, () => { jt.t2p((Math.random() - 0.5) * 10, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - p2t - @psych/lib', { group: 'p2t', baseline: true }, () => { pl.p2t(Math.random(), (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - p2t - @stdlib/stats', { group: 'p2t' }, async () => { await sl.p2t(Math.random(), (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - p2t - jstat-esm', { group: 'p2t' }, () => { jt.p2t(Math.random(), (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - f2p - @psych/lib', { group: 'f2p', baseline: true }, () => { pl.f2p(Math.random() * 10, (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - f2p - @stdlib/stats', { group: 'f2p' }, async () => { await sl.f2p(Math.random() * 10, (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - f2p - jstat-esm', { group: 'f2p' }, () => { jt.f2p(Math.random() * 10, (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - p2f - @psych/lib', { group: 'p2f', baseline: true }, () => { pl.p2f(Math.random(), (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - p2f - @stdlib/stats', { group: 'p2f' }, async () => { await sl.p2f(Math.random(), (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - p2f - jstat-esm', { group: 'p2f' }, () => { jt.p2f(Math.random(), (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - c2p - @psych/lib', { group: 'c2p', baseline: true }, () => { pl.c2p((Math.random() + 1) * 10, (Math.random() + 1) * 10) })
// Deno.bench('Distribution Bench - c2p - @stdlib/stats', { group: 'c2p' }, async () => { await sl.c2p((Math.random() + 1) * 10, (Math.random() + 1) * 10) })
// Deno.bench('Distribution Bench - c2p - jstat-esm', { group: 'c2p' }, () => { jt.c2p((Math.random() + 1) * 10, (Math.random() + 1) * 10) })
// Deno.bench('Distribution Bench - p2c - @psych/lib', { group: 'p2c', baseline: true }, () => { pl.p2c(Math.random(), (Math.random() + 1) * 10) })
// Deno.bench('Distribution Bench - p2c - @stdlib/stats', { group: 'p2c' }, async () => { await sl.p2c(Math.random(), (Math.random() + 1) * 10) })
// Deno.bench('Distribution Bench - p2c - jstat-esm', { group: 'p2c' }, () => { jt.p2c(Math.random(), (Math.random() + 1) * 10) })
// Deno.bench('Distribution Bench - randomNormal - @psych/lib', { group: 'randomNormal', baseline: true }, () => { pl.randomNormal() })
// Deno.bench('Distribution Bench - randomNormal - @stdlib/random', { group: 'randomNormal' }, () => { normal(0, 1) })

// Deno.bench('Distribution Bench - z2p - @psych/lib', () => { pl.z2p((Math.random() - 0.5) * 5) })
// Deno.bench('Distribution Bench - z2p - @stdlib/stats', async () => { await sl.z2p((Math.random() - 0.5) * 5) })
// Deno.bench('Distribution Bench - z2p - jstat-esm', () => { jt.z2p((Math.random() - 0.5) * 5) })
// Deno.bench('Distribution Bench - p2z - @psych/lib', () => { pl.p2z(Math.random()) })
// Deno.bench('Distribution Bench - p2z - @stdlib/stats', async () => { await sl.p2z(Math.random()) })
// Deno.bench('Distribution Bench - p2z - jstat-esm', () => { jt.p2z(Math.random()) })
// Deno.bench('Distribution Bench - t2p - @psych/lib', () => { pl.t2p((Math.random() - 0.5) * 10, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - t2p - @stdlib/stats', async () => { await sl.t2p((Math.random() - 0.5) * 10, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - t2p - jstat-esm', () => { jt.t2p((Math.random() - 0.5) * 10, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - p2t - @psych/lib', () => { pl.p2t(Math.random(), (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - p2t - @stdlib/stats', async () => { await sl.p2t(Math.random(), (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - p2t - jstat-esm', () => { jt.p2t(Math.random(), (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - f2p - @psych/lib', () => { pl.f2p(Math.random() * 10, (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - f2p - @stdlib/stats', async () => { await sl.f2p(Math.random() * 10, (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - f2p - jstat-esm', () => { jt.f2p(Math.random() * 10, (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - p2f - @psych/lib', () => { pl.p2f(Math.random(), (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - p2f - @stdlib/stats', async () => { await sl.p2f(Math.random(), (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - p2f - jstat-esm', () => { jt.p2f(Math.random(), (Math.random() + 1) * 5, (Math.random() + 1) * 100) })
// Deno.bench('Distribution Bench - c2p - @psych/lib', () => { pl.c2p((Math.random() + 1) * 10, (Math.random() + 1) * 10) })
// Deno.bench('Distribution Bench - c2p - @stdlib/stats', async () => { await sl.c2p((Math.random() + 1) * 10, (Math.random() + 1) * 10) })
// Deno.bench('Distribution Bench - c2p - jstat-esm', () => { jt.c2p((Math.random() + 1) * 10, (Math.random() + 1) * 10) })
// Deno.bench('Distribution Bench - p2c - @psych/lib', () => { pl.p2c(Math.random(), (Math.random() + 1) * 10) })
// Deno.bench('Distribution Bench - p2c - @stdlib/stats', async () => { await sl.p2c(Math.random(), (Math.random() + 1) * 10) })
// Deno.bench('Distribution Bench - p2c - jstat-esm', () => { jt.p2c(Math.random(), (Math.random() + 1) * 10) })
// Deno.bench('Distribution Bench - randomNormal - @psych/lib', () => { pl.randomNormal() })
// Deno.bench('Distribution Bench - randomNormal - @stdlib/random', () => { normal(0, 1) })

Deno.bench('@psych/lib', { group: 'Statistics To P', baseline: true }, () => { 
  pl.z2p((Math.random() - 0.5) * 5)
  pl.t2p((Math.random() - 0.5) * 10, (Math.random() + 1) * 100)
  pl.f2p(Math.random() * 10, (Math.random() + 1) * 5, (Math.random() + 1) * 100)
  pl.c2p((Math.random() + 1) * 10, (Math.random() + 1) * 10)
})
Deno.bench('@stdlib/stats', { group: 'Statistics To P' }, async () => { 
  await sl.z2p((Math.random() - 0.5) * 5)
  await sl.t2p((Math.random() - 0.5) * 10, (Math.random() + 1) * 100)
  await sl.f2p(Math.random() * 10, (Math.random() + 1) * 5, (Math.random() + 1) * 100)
  await sl.c2p((Math.random() + 1) * 10, (Math.random() + 1) * 10)
})
Deno.bench('jstat-esm', { group: 'Statistics To P' }, () => { 
  jt.z2p((Math.random() - 0.5) * 5)
  jt.t2p((Math.random() - 0.5) * 10, (Math.random() + 1) * 100)
  jt.f2p(Math.random() * 10, (Math.random() + 1) * 5, (Math.random() + 1) * 100)
  jt.c2p((Math.random() + 1) * 10, (Math.random() + 1) * 10)
})
Deno.bench('@psych/lib', { group: 'P To Statistics', baseline: true }, () => {
  pl.p2z(Math.random())
  pl.p2t(Math.random(), (Math.random() + 1) * 100)
  pl.p2f(Math.random(), (Math.random() + 1) * 5, (Math.random() + 1) * 100)
  pl.p2c(Math.random(), (Math.random() + 1) * 10)
})
Deno.bench('@stdlib/stats', { group: 'P To Statistics' }, async () => {
  await sl.p2z(Math.random())
  await sl.p2t(Math.random(), (Math.random() + 1) * 100)
  await sl.p2f(Math.random(), (Math.random() + 1) * 5, (Math.random() + 1) * 100)
  await sl.p2c(Math.random(), (Math.random() + 1) * 10)
})
Deno.bench('jstat-esm', { group: 'P To Statistics' }, () => {
  jt.p2z(Math.random())
  jt.p2t(Math.random(), (Math.random() + 1) * 100)
  jt.p2f(Math.random(), (Math.random() + 1) * 5, (Math.random() + 1) * 100)
  jt.p2c(Math.random(), (Math.random() + 1) * 10)
})
