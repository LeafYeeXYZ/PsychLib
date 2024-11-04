import * as ss from 'npm:simple-statistics@^7.0.0'
import * as pl from '../lib/index.ts'
import * as mt from 'npm:mathjs@^13.0.0'
import { assertAlmostEquals } from 'jsr:@std/assert'

const x: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)
const y: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)

Deno.test('Base Test', () => {
  assertAlmostEquals(pl.sum(x), ss.sum(x), 1e-6)
  assertAlmostEquals(pl.mean(x), ss.mean(x), 1e-6)
  assertAlmostEquals(pl.max(x), ss.max(x), 1e-6)
  assertAlmostEquals(pl.min(x), ss.min(x), 1e-6)
  assertAlmostEquals(pl.median(x), ss.median(x), 1e-6)
  assertAlmostEquals(pl.quantile(x, 0.25), ss.quantile(x, 0.25), 1)
  assertAlmostEquals(pl.quantile(x, 0.75), ss.quantile(x, 0.75), 1)
  assertAlmostEquals(pl.vari(x), ss.sampleVariance(x), 1e-6)
  assertAlmostEquals(pl.std(x), ss.sampleStandardDeviation(x), 1e-6)
  assertAlmostEquals(pl.corr(x, y), ss.sampleCorrelation(x, y), 1e-6)
  assertAlmostEquals(pl.cov(x, y), ss.sampleCovariance(x, y), 1e-6)
  assertAlmostEquals(pl.kurtosis(x), ss.sampleKurtosis(x), 1e-3)
  assertAlmostEquals(pl.skewness(x), ss.sampleSkewness(x), 1e-3)
  assertAlmostEquals(pl.sort(x)[0], mt.sort(x, 'asc')[0], 1e-6)
  assertAlmostEquals(pl.sort(x, false)[0], mt.sort(x, 'desc')[0], 1e-6)
  assertAlmostEquals(pl.mode(x), 3 * ss.median(x) - 2 * ss.mean(x), 1e-6)
  assertAlmostEquals(pl.range(x), ss.max(x) - ss.min(x), 1e-6)
  assertAlmostEquals(pl.ss(x), ss.sum(x.map((v) => (v - ss.mean(x)) ** 2)), 1e-6)
  assertAlmostEquals(pl.ssDiff(x, y), x.map((v, i) => (v - y[i]) ** 2).reduce((a, b) => a + b), 1e-6)
  assertAlmostEquals(pl.sp(x, y), x.map((v, i) => (v - ss.mean(x)) * (y[i] - ss.mean(y))).reduce((a, b) => a + b), 1e-6)
  assertAlmostEquals(pl.sem(x), ss.sampleStandardDeviation(x) / Math.sqrt(x.length), 1e-6)
})

