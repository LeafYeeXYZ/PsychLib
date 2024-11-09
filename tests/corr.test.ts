import * as pl from '../lib/index.ts'
import pc from 'npm:@stdlib/stats-pcorrtest@^0.2.2'
import { assertAlmostEquals, assertEquals } from 'jsr:@std/assert'

Deno.test('Correlation Test', () => {
  const spheric: number[] = []
  for (let i = 0; i < 1000; i++) {
    const x: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)
    const y: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)
    const z: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)
    const pcorr_pl = new pl.PearsonCorrTest(x, y)
    const pcorr_stdlib = pc(x, y)
    const { kmo, partialCorrMatrix } = new pl.KMOTest(x, y, z)
    assertAlmostEquals(pcorr_pl.r, pcorr_stdlib.pcorr, 1e-6)
    assertAlmostEquals(pcorr_pl.t, pcorr_stdlib.statistic, 1e-6)
    assertAlmostEquals(pcorr_pl.p, pcorr_stdlib.pValue, 1e-6)
    assertAlmostEquals(pcorr_pl.ci[0], pcorr_stdlib.ci[0], 1e-6)
    assertAlmostEquals(pcorr_pl.ci[1], pcorr_stdlib.ci[1], 1e-6)
    assertEquals(partialCorrMatrix.length, 3)
    assertEquals(partialCorrMatrix.every((row) => row.length === 3), true)
    assertEquals(partialCorrMatrix[0][0], -1)
    assertAlmostEquals(kmo, 0.5, 1e-1)
    const bartlett_spheric = new pl.BartlettSphericityTest(x, y, z)
    assertEquals(bartlett_spheric.df, 3)
    assertEquals(bartlett_spheric.corrMatrix.length, 3)
    assertEquals(bartlett_spheric.corrMatrix.every((row) => row.length === 3), true)
    spheric.push(bartlett_spheric.p)
  }
  assertAlmostEquals(pl.mean(spheric), 0.5, 1e-1)
})
