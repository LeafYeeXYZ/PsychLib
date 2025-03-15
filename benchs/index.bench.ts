import * as pl from '../lib/index.ts'

const N = 500
const B = 5000
const MEAN = 10
const STD = 3

const a = new Array(N).fill(0).map(() => pl.randomNormal(MEAN, STD))
const b = new Array(N).fill(0).map(() => pl.randomNormal(MEAN + 2, STD + 1))
const c = new Array(N).fill(0).map(() => pl.randomNormal(MEAN + 4, STD + 2))
const g = new Array(N).fill(0).map(() => Math.floor(Math.random() * 3))
const s = new Array(N * 10).fill(0).map(() => pl.randomNormal(MEAN, STD))
const iv = a.map((_, i) => [a[i], b[i], c[i]])
const dv = iv.map(([a, b, c]) => a * 0.5 + b * 0.3 + c * 0.2 + Math.random())

const MATRIX_SIZE = [50, 100]
const mA = new pl.Matrix(new Array(MATRIX_SIZE[0]).fill(0).map(() => new Array(MATRIX_SIZE[1]).fill(0).map(() => pl.randomNormal(MEAN, STD))))
const mB = new pl.Matrix(new Array(MATRIX_SIZE[1]).fill(0).map(() => new Array(MATRIX_SIZE[0]).fill(0).map(() => pl.randomNormal(MEAN, STD))))
const mC = new pl.Matrix(new Array(MATRIX_SIZE[0]).fill(0).map(() => new Array(MATRIX_SIZE[0]).fill(0).map(() => pl.randomNormal(MEAN, STD))))

// Bases
Deno.bench(`sum() - n=${N}`, () => { pl.sum(a) })
Deno.bench(`mean() - n=${N}`, () => { pl.mean(a) })
Deno.bench(`max() - n=${N}`, () => { pl.max(a) })
Deno.bench(`min() - n=${N}`, () => { pl.min(a) })
Deno.bench(`median() - n=${N}`, () => { pl.median(a) })
Deno.bench(`mode() - n=${N}`, () => { pl.mode(a) })
Deno.bench(`quantile() - n=${N}`, () => { pl.quantile(a, 0.25) })
Deno.bench(`range() - n=${N}`, () => { pl.range(a) })
Deno.bench(`vari() - n=${N}`, () => { pl.vari(a) })
Deno.bench(`std() - n=${N}`, () => { pl.std(a) })
Deno.bench(`cov() - n=${N}`, () => { pl.cov(a, b) })
Deno.bench(`corr() - n=${N}`, () => { pl.corr(a, b) })
Deno.bench(`kurtosis() - n=${N}`, () => { pl.kurtosis(a) })
Deno.bench(`skewness() - n=${N}`, () => { pl.skewness(a) })
Deno.bench(`ss() - n=${N}`, () => { pl.ss(a) })
Deno.bench(`ssDiff() - n=${N}`, () => { pl.ssDiff(a, b) })
Deno.bench(`sem() - n=${N}`, () => { pl.sem(a) })
// Sort
Deno.bench(`Array.prototype.sort() - n=${N*10}`, () => { s.slice().sort() })
Deno.bench(`sort() - iterativeQuickSort - n=${N*10}`, () => { pl.sort(s, true, 'iterativeQuickSort', false) })
Deno.bench(`sort() - recursiveQuickSort - n=${N*10}`, () => { pl.sort(s, true, 'recursiveQuickSort', false) })
Deno.bench(`sort() - mergeSort - n=${N*10}`, () => { pl.sort(s, true, 'mergeSort', false) })
Deno.bench(`sort() - heapSort - n=${N*10}`, () => { pl.sort(s, true, 'heapSort', false) })
// Distributions
Deno.bench('z2p()', () => { pl.z2p((Math.random() - 0.5) * 10) })
Deno.bench('p2z()', () => { pl.p2z(Math.random()) })
Deno.bench('t2p() - df=30', () => { pl.t2p((Math.random() - 0.5) * 10, 30) })
Deno.bench('p2t() - df=30', () => { pl.p2t(Math.random(), 30) })
Deno.bench('f2p() - df=5,30', () => { pl.f2p(Math.random() * 10, 5, 30) })
Deno.bench('p2f() - df=5,30', () => { pl.p2f(Math.random(), 5, 30) })
Deno.bench('c2p() - df=6', () => { pl.c2p(Math.random() * 10, 6) })
Deno.bench('p2c() - df=6', () => { pl.p2c(Math.random(), 6) })
Deno.bench('randomNormal()', () => { pl.randomNormal() })
Deno.bench('randomT() - df=30', () => { pl.randomT(30) })
Deno.bench('randomF() - df=5,30', () => { pl.randomF(5, 30) })
Deno.bench('randomChi2() - df=6', () => { pl.randomChi2(6) })
// Tests
Deno.bench(`KurtosisTest - n=${N}`, () => { new pl.KurtosisTest(a) })
Deno.bench(`SkewnessTest - n=${N}`, () => { new pl.SkewnessTest(a) })
Deno.bench(`OneWayAnova - n=${N}`, () => { new pl.OneWayAnova(a, g) })
Deno.bench(`PeerAnova - n=${N},3iv`, () => { new pl.PeerAnova([a, b, c]) })
Deno.bench(`LeveneTest - n=${N}`, () => { new pl.LeveneTest(a, g) })
Deno.bench(`OneSampleKSTest - n=${N}`, () => { new pl.OneSampleKSTest(a) })
Deno.bench(`OneSampleTTest - n=${N}`, () => { new pl.OneSampleTTest(a, 0) })
Deno.bench(`TwoSampleTTest - n=${N}`, () => { new pl.TwoSampleTTest(a, b) })
Deno.bench(`PeerSampleTTest - n=${N}`, () => { new pl.PeerSampleTTest(a, b) })
Deno.bench(`WelchTTest - n=${N}`, () => { new pl.WelchTTest(a, b) })
Deno.bench(`PearsonCorrTest - n=${N}`, () => { new pl.PearsonCorrTest(a, b) })
Deno.bench(`bootstrapSample() - n=${N},B=${B}`, () => { pl.bootstrapSample(a, B) })
Deno.bench(`bootstrapTest() - mean - n=${N},B=${B}`, () => { pl.bootstrapTest('mean', B, 0.05, a) })
Deno.bench(`bootstrapTest() - median - n=${N},B=${B}`, () => { pl.bootstrapTest('median', B, 0.05, a) })
Deno.bench(`bootstrapTest() - ab - n=${N},B=${B}`, () => { pl.bootstrapTest('ab', B, 0.05, a, b, c) })
// Regression
Deno.bench(`LinearRegressionOne - n=${N}`, () => { new pl.LinearRegressionOne(a, b) })
Deno.bench(`LinearRegression - n=${N},3iv`, () => { new pl.LinearRegression(iv, dv) })
Deno.bench(`LinearRegressionStepwise - n=${N},3iv`, () => { new pl.LinearRegressionStepwise(iv, dv) })
// Mediation
Deno.bench(`SimpleMediationModel - n=${N}`, () => { new pl.SimpleMediationModel(a, b, c) })
Deno.bench(`SimpleMediationModel - n=${N} - bootstrap (B=${B})`, () => {
	const smm = new pl.SimpleMediationModel(a, b, c)
	smm.bootstrap(B)
})
// Reliability
Deno.bench(`AlphaRealiability - n=${N},3iv`, () => { new pl.AlphaRealiability([a, b, c]) })
// Matrix
Deno.bench(`Matrix.prototype.add() - ${MATRIX_SIZE[0]}x${MATRIX_SIZE[1]}`, () => { mA.add(mA) })
Deno.bench(`Matrix.prototype.transpose() - ${MATRIX_SIZE[0]}x${MATRIX_SIZE[1]}`, () => { mA.transpose() })
Deno.bench(`Matrix.prototype.multiply() - ${MATRIX_SIZE[0]}x${MATRIX_SIZE[1]} * ${MATRIX_SIZE[1]}x${MATRIX_SIZE[0]}`, () => { mA.multiply(mB) })
Deno.bench(`Matrix.prototype.inverse() - ${MATRIX_SIZE[0]}x${MATRIX_SIZE[0]}`, () => { mC.inverse() })
