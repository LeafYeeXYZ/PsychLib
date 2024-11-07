import * as pl from '../lib/index.ts'
import sl_le from 'npm:@stdlib/stats-levene-test'
import sl_ks from 'npm:@stdlib/stats-kstest'
import { assertAlmostEquals, assertEquals } from 'jsr:@std/assert'

const x = () => new Array(50).fill(0).map(() => Math.random() * 100)

Deno.test('Non-param Test', () => {
  assertEquals(typeof pl.kurtosisTest(x()).p, 'number')
  assertEquals(typeof pl.skewnessTest(x()).p, 'number')
  assertEquals(typeof pl.kurtosisTest(x()).z, 'number')
  assertEquals(typeof pl.skewnessTest(x()).z, 'number')
  for (let i = 0; i < 20; i++) {
    const levels = Math.floor(Math.random() * 8) + 3
    const group: number[] = new Array(1000).fill(0).map(() => Math.floor(Math.random() * levels))
    const value: number[] = group.map((v) => Math.random() * 10 + v)
    const pl_res = new pl.LeveneTest(value, group)
    const sl_res = sl_le(value, { 'groups': group })
    assertAlmostEquals(pl_res.w, sl_res.statistic, 1e-6)
    assertAlmostEquals(pl_res.p, sl_res.pValue, 1e-6)
  }
  for (let i = 0; i < 20; i++) {
    const _x = x()
    const _mean = pl.mean(_x)
    const _std = pl.std(_x, true, _mean)
    const pl_res = new pl.OneSampleKSTest(_x)
    const sl_res = sl_ks(_x.map((v) => (v - _mean) / _std), 'normal', 0, 1)
    assertAlmostEquals(pl_res.d, sl_res.statistic, 1e-4)
    assertEquals(pl_res.rejected, sl_res.rejected)
  }
})
