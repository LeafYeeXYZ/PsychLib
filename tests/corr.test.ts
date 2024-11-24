import * as pl from '../lib/index.ts'
import pc from 'npm:@stdlib/stats-pcorrtest@^0.2.2'
import { assertAlmostEquals } from 'jsr:@std/assert'

Deno.test('Correlation Test', () => {
  for (let i = 0; i < 10; i++) {
    const x: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)
    const y: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)
    const pcorr_pl = new pl.PearsonCorrTest(x, y)
    const pcorr_stdlib = pc(x, y)
    assertAlmostEquals(pcorr_pl.r, pcorr_stdlib.pcorr, 1e-6)
    assertAlmostEquals(pcorr_pl.t, pcorr_stdlib.statistic, 1e-6)
    assertAlmostEquals(pcorr_pl.p, pcorr_stdlib.pValue, 1e-6)
    assertAlmostEquals(pcorr_pl.ci[0], pcorr_stdlib.ci[0], 1e-6)
    assertAlmostEquals(pcorr_pl.ci[1], pcorr_stdlib.ci[1], 1e-6)
  }
})
