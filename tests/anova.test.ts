import * as pl from '../lib/index.ts'
import sl from 'npm:@stdlib/stats-anova1'
import { assertAlmostEquals } from 'jsr:@std/assert'

Deno.test('Anova Test', () => {
  for (let i = 0; i < 10; i++) {
    const levels = Math.floor(Math.random() * 8) + 3
    const group: number[] = new Array(1000).fill(0).map(() => Math.floor(Math.random() * levels))
    const value: number[] = group.map((v) => Math.random() * 10 + v)
    const pl_res = new pl.OneWayAnova(value, group)
    const sl_res = sl(value, group)
    assertAlmostEquals(pl_res.f, sl_res.statistic, 1e-6)
    assertAlmostEquals(pl_res.p, sl_res.pValue, 1e-6)
    pl_res.tukey()
    pl_res.scheffe()
    pl_res.bonferroni()
  }
})
