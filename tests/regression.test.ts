import * as pl from '../lib/index.ts'
import { linearRegression } from 'npm:simple-statistics@^7.0.0'
import { assertAlmostEquals, assertEquals } from 'jsr:@std/assert'

const x = new Array(1000).fill(0).map((_, i) => Math.random() * 100 + 4 * i)
const m = new Array(1000).fill(0).map((_, i) => Math.random() * 100 + 6 * i)
const y = new Array(1000).fill(0).map((_, i) => Math.random() * 100 + 10 * i)

Deno.test('Regression Test', () => {
  const lr1_pl = new pl.LinearRegressionOne(x, y)
  const lr1_ss = linearRegression(x.map((v, i) => [v, y[i]]))
  assertAlmostEquals(lr1_pl.b0, lr1_ss.b, 1e-6)
  assertAlmostEquals(lr1_pl.b1, lr1_ss.m, 1e-6)
  assertEquals(typeof lr1_pl.p, 'number')
  const lr2_standard = new pl.LinearRegressionTwo(x, m, y)
  const lr2_sequntial = new pl.LinearRegressionTwo(x, m, y, 'sequential')
  assertEquals(typeof lr2_standard.p, 'number')
  assertEquals(typeof lr2_sequntial.p, 'number')
  assertEquals(typeof lr2_standard.b1p, 'number')
  assertEquals(typeof lr2_sequntial.b1p, 'number')
  assertEquals(typeof lr2_standard.b2p, 'number')
  assertEquals(typeof lr2_sequntial.b2p, 'number')
  assertEquals(lr2_sequntial.b1 >= lr2_standard.b1, true)
  assertEquals(lr2_sequntial.b2 === lr2_standard.b2, true)
})
