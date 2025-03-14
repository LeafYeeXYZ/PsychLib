import { Matrix, inverse } from 'npm:ml-matrix@6.12.0'
import * as ss from 'npm:simple-statistics@^7.0.0'
import { assertAlmostEquals, assertEquals } from 'jsr:@std/assert'
import * as pl from '../lib/index.ts'

const x: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)
const y: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)
const m1: number[][] = new Array(20)
	.fill(0)
	.map(() => new Array(30).fill(0).map(() => Math.random()))
const m2: number[][] = new Array(30)
	.fill(0)
	.map(() => new Array(20).fill(0).map(() => Math.random()))

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
	assertAlmostEquals(pl.mode(x), 3 * ss.median(x) - 2 * ss.mean(x), 1e-6)
	assertAlmostEquals(pl.range(x), ss.max(x) - ss.min(x), 1e-6)
	assertAlmostEquals(
		pl.ss(x),
		ss.sum(x.map((v) => (v - ss.mean(x)) ** 2)),
		1e-6,
	)
	assertAlmostEquals(
		pl.ssDiff(x, y),
		x.map((v, i) => (v - y[i]) ** 2).reduce((a, b) => a + b),
		1e-6,
	)
	assertAlmostEquals(
		pl.sp(x, y),
		x
			.map((v, i) => (v - ss.mean(x)) * (y[i] - ss.mean(y)))
			.reduce((a, b) => a + b),
		1e-6,
	)
	assertAlmostEquals(
		pl.sem(x),
		ss.sampleStandardDeviation(x) / Math.sqrt(x.length),
		1e-6,
	)
	assertAlmostEquals(pl.centralize(x)[0], x[0] - ss.mean(x), 1e-6)
	assertAlmostEquals(
		pl.standardize(x)[0],
		(x[0] - ss.mean(x)) / ss.sampleStandardDeviation(x),
		1e-6,
	)
	const m1_pl = new pl.Matrix(m1)
	const m2_pl = new pl.Matrix(m2)
	const m1_ml = new Matrix(m1)
	const m2_ml = new Matrix(m2)
	// Matrix Basic Info
	assertEquals(m1_ml.columns, m1_pl.cols)
	assertEquals(m1_ml.rows, m1_pl.rows)
	assertEquals(m2_ml.columns, m2_pl.cols)
	assertEquals(m2_ml.rows, m2_pl.rows)
	// Matrix Data
	assertEquals(m1_ml.to2DArray(), m1_pl.data)
	assertEquals(m2_ml.to2DArray(), m2_pl.data)
	// Matrix Transpose
	assertEquals(m1_ml.transpose().to2DArray(), m1_pl.transpose().data)
	assertEquals(m2_ml.transpose().to2DArray(), m2_pl.transpose().data)
	// Matrix Add
	assertEquals(
		new Matrix(m1).add(new Matrix(m1)).to2DArray(),
		new pl.Matrix(m1).add(new pl.Matrix(m1)).data,
	)
	assertEquals(
		new Matrix(m2).add(new Matrix(m2)).to2DArray(),
		new pl.Matrix(m2).add(new pl.Matrix(m2)).data,
	)
	// Matrix Multiply
	const m1_ml_mmul_m2_ml = new Matrix(m1)
		.mmul(new Matrix(m2))
		.to2DArray()
		.flat()
	const m1_pl_mmul_m2_pl = new pl.Matrix(m1)
		.multiply(new pl.Matrix(m2))
		.data.flat()
	for (let i = 0; i < m1_ml_mmul_m2_ml.length; i++) {
		assertAlmostEquals(m1_ml_mmul_m2_ml[i], m1_pl_mmul_m2_pl[i], 1e-6)
	}
	// Matrix Inverse
	const matrxi_to_inverse = [
		[1, 2, 3],
		[0, 1, 4],
		[5, 6, 0],
	]
	const m3_pl = new pl.Matrix(matrxi_to_inverse).inverse().data.flat()
	const m3_ml = inverse(new Matrix(matrxi_to_inverse)).to2DArray().flat()
	for (let i = 0; i < m3_pl.length; i++) {
		assertAlmostEquals(m3_pl[i], m3_ml[i], 1e-6)
	}
})
