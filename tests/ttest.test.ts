import * as pl from '../lib/index.ts'
import ttest from 'npm:@stdlib/stats-ttest'
import ttest2 from 'npm:@stdlib/stats-ttest2'
import { assertAlmostEquals, assertEquals } from 'jsr:@std/assert'

const x = new Array(1000).fill(0).map(() => Math.random() * 100)
const y = new Array(1000).fill(0).map(() => Math.random() * 101)

Deno.test('TTest Test', () => {
  const ttest_pl = new pl.OneSampleTTest(x, 0)
  const ttest_ss = ttest(x)
  assertAlmostEquals(ttest_pl.t, ttest_ss.statistic, 1e-6)
  assertAlmostEquals(ttest_pl.p, ttest_ss.pValue, 1e-6)
  const ttest2_pl = new pl.TwoSampleTTest(x, y)
  const ttest2_ss = ttest2(x, y)
  assertAlmostEquals(ttest2_pl.t, ttest2_ss.statistic, 1e-6)
  assertAlmostEquals(ttest2_pl.p, ttest2_ss.pValue, 1e-6)
  const ttestp_pl = new pl.PeerSampleTTest(x, y)
  const ttestp_ss = ttest(x, y)
  assertAlmostEquals(ttestp_pl.t, ttestp_ss.statistic, 1e-6)
  assertAlmostEquals(ttestp_pl.p, ttestp_ss.pValue, 1e-6)
  const ttestw_pl = new pl.WelchTTest(x, y)
  assertEquals(typeof ttestw_pl.t, 'number')
  assertEquals(typeof ttestw_pl.p, 'number')
  assertEquals(typeof ttestw_pl.df, 'number')
})
