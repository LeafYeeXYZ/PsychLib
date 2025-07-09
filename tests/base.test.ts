import { assertAlmostEquals, assertEquals } from 'jsr:@std/assert'
import { inverse, Matrix } from 'npm:ml-matrix@6.12.1'
import * as ss from 'npm:simple-statistics@7.8.8'
import * as m from '../lib/base.ts'
import { randomArray, randomMatrix } from '../utils/tools.ts'

Deno.test('Basic Functions', () => {
	assertEquals(m.factorial(10), ss.factorial(10))
	const x: number[] = randomArray(1000, 0, 100)
	const y: number[] = randomArray(1000, 0, 100)
	assertAlmostEquals(m.sum(x), ss.sum(x), 1e-6)
	const meanXActual = m.mean(x)
	const meanXExpected = ss.mean(x)
	assertAlmostEquals(meanXActual, meanXExpected, 1e-6)
	assertAlmostEquals(m.max(x), ss.max(x), 1e-6)
	assertAlmostEquals(m.min(x), ss.min(x), 1e-6)
	assertAlmostEquals(m.median(x), ss.median(x), 1e-6)
	assertAlmostEquals(m.quantile(x, 0.25), ss.quantile(x, 0.25), 1)
	assertAlmostEquals(m.quantile(x, 0.75), ss.quantile(x, 0.75), 1)
	assertAlmostEquals(m.vari(x), ss.sampleVariance(x), 1e-6)
	const sampleStdXActual = m.std(x)
	const sampleStdXExpected = ss.sampleStandardDeviation(x)
	assertAlmostEquals(sampleStdXActual, sampleStdXExpected, 1e-6)
	assertAlmostEquals(m.corr(x, y), ss.sampleCorrelation(x, y), 1e-6)
	assertAlmostEquals(m.cov(x, y), ss.sampleCovariance(x, y), 1e-6)
	assertAlmostEquals(m.kurtosis(x), ss.sampleKurtosis(x), 1e-3)
	assertAlmostEquals(m.skewness(x), ss.sampleSkewness(x), 1e-3)
	assertAlmostEquals(m.mode(x), 3 * ss.median(x) - 2 * meanXExpected, 1e-6)
	assertAlmostEquals(m.range(x), ss.max(x) - ss.min(x), 1e-6)
	assertAlmostEquals(
		m.ss(x),
		ss.sum(x.map((v) => (v - meanXExpected) ** 2)),
		1e-6,
	)
	assertAlmostEquals(
		m.ssDiff(x, y),
		ss.sum(x.map((v, i) => (v - y[i]) ** 2)),
		1e-6,
	)
	const meanYExpected = ss.mean(y)
	assertAlmostEquals(
		m.sp(x, y),
		ss.sum(x.map((v, i) => (v - meanXExpected) * (y[i] - meanYExpected))),
		1e-6,
	)
	assertAlmostEquals(
		m.sem(x),
		ss.sampleStandardDeviation(x) / Math.sqrt(x.length),
		1e-6,
	)
	const centeredXActual = m.centralize(x)
	const centeredXExpected = x.map((v) => v - meanXExpected)
	for (let i = 0; i < x.length; i++) {
		assertAlmostEquals(centeredXActual[i], centeredXExpected[i], 1e-6)
	}
	const standardizedXActual = m.standardize(x)
	const standardizedXExpected = x.map(
		(v) => (v - meanXExpected) / sampleStdXExpected,
	)
	for (let i = 0; i < x.length; i++) {
		assertAlmostEquals(standardizedXActual[i], standardizedXExpected[i], 1e-6)
	}
})

Deno.test('Matrix', () => {
	const m1 = randomMatrix(10, 10, 0, 10)
	const m2 = randomMatrix(10, 10, 0, 10)
	const m1_pl = new m.Matrix(m1)
	const m2_pl = new m.Matrix(m2)
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
		new m.Matrix(m1).add(new m.Matrix(m1)).data,
	)
	assertEquals(
		new Matrix(m2).add(new Matrix(m2)).to2DArray(),
		new m.Matrix(m2).add(new m.Matrix(m2)).data,
	)
	// Matrix Multiply
	const m1_ml_mmul_m2_ml = new Matrix(m1)
		.mmul(new Matrix(m2))
		.to2DArray()
		.flat()
	const m1_pl_mmul_m2_pl = new m.Matrix(m1)
		.multiply(new m.Matrix(m2))
		.data.flat()
	for (let i = 0; i < m1_ml_mmul_m2_ml.length; i++) {
		assertAlmostEquals(m1_ml_mmul_m2_ml[i], m1_pl_mmul_m2_pl[i], 1e-6)
	}
	// Matrix Inverse
	const matrxi_to_inverse = randomMatrix(10, 10, 0, 10)
	const m3_pl = new m.Matrix(matrxi_to_inverse).inverse().data.flat()
	const m3_ml = inverse(new Matrix(matrxi_to_inverse)).to2DArray().flat()
	for (let i = 0; i < m3_pl.length; i++) {
		assertAlmostEquals(m3_pl[i], m3_ml[i], 1e-6)
	}
})
