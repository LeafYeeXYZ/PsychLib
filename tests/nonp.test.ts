import * as pl from '../lib/index.ts'
import sl from 'npm:@stdlib/stats-levene-test'
import { assertAlmostEquals } from 'jsr:@std/assert'

Deno.test('Non-param Test', () => {
  for (let i = 0; i < 10; i++) {
    const levels = Math.floor(Math.random() * 8) + 3
    const group: number[] = new Array(1000).fill(0).map(() => Math.floor(Math.random() * levels))
    const value: number[] = group.map((v) => Math.random() * 10 + v)
    const pl_res = new pl.LeveneTest(value, group)
    const sl_res = sl(value, { 'groups': group })
    assertAlmostEquals(pl_res.w, sl_res.statistic, 1e-6)
    assertAlmostEquals(pl_res.p, sl_res.pValue, 1e-6)
  }
})