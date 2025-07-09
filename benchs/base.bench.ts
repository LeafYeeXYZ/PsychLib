import * as base from '../lib/base.ts'
import * as dist from '../lib/distribution/index.ts'
import { sort } from '../lib/sort.ts'
import * as tools from '../utils/tools.ts'

const N = 1000
const DF_T = 30
const DF_F = [5, 30]
const DF_C = 5
const ROWS = 50
const COLS = 50

Deno.bench(`sum() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.sum(data)
	b.end()
})
Deno.bench(`mean() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.mean(data)
	b.end()
})
Deno.bench(`max() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.max(data)
	b.end()
})
Deno.bench(`min() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.min(data)
	b.end()
})
Deno.bench(`median() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.median(data)
	b.end()
})
Deno.bench(`mode() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.mode(data)
	b.end()
})
Deno.bench(`quantile() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.quantile(data, 0.25)
	b.end()
})
Deno.bench(`range() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.range(data)
	b.end()
})
Deno.bench(`vari() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.vari(data)
	b.end()
})
Deno.bench(`std() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.std(data)
	b.end()
})
Deno.bench(`cov() - n=${N}`, (b) => {
	const data1 = tools.normalArray(N, 0, 1)
	const data2 = tools.normalArray(N, 1, 1)
	b.start()
	base.cov(data1, data2)
	b.end()
})
Deno.bench(`corr() - n=${N}`, (b) => {
	const data1 = tools.normalArray(N, 0, 1)
	const data2 = tools.normalArray(N, 1, 1)
	b.start()
	base.corr(data1, data2)
	b.end()
})
Deno.bench(`kurtosis() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.kurtosis(data)
	b.end()
})
Deno.bench(`skewness() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.skewness(data)
	b.end()
})
Deno.bench(`ss() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.ss(data)
	b.end()
})
Deno.bench(`ssDiff() - n=${N}`, (b) => {
	const data1 = tools.normalArray(N, 0, 1)
	const data2 = tools.normalArray(N, 1, 1)
	b.start()
	base.ssDiff(data1, data2)
	b.end()
})
Deno.bench(`sem() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	base.sem(data)
	b.end()
})
Deno.bench(`array.sort() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	data.sort()
	b.end()
})
Deno.bench(`array.toSorted() - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	data.toSorted((a, b) => a - b)
	b.end()
})
Deno.bench(`sort() - quickSort (iter) - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	sort(data, true, 'iterativeQuickSort', false)
	b.end()
})
Deno.bench(`sort() - quickSort (recur) - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	sort(data, true, 'recursiveQuickSort', false)
	b.end()
})
Deno.bench(`sort() - mergeSort - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	sort(data, true, 'mergeSort', false)
	b.end()
})
Deno.bench(`sort() - heapSort - n=${N}`, (b) => {
	const data = tools.normalArray(N, 0, 1)
	b.start()
	sort(data, true, 'heapSort', false)
	b.end()
})
Deno.bench('z2p()', () => {
	const z = (Math.random() - 0.5) * 8
	dist.z2p(z)
})
Deno.bench('p2z()', () => {
	const p = Math.random()
	dist.p2z(p)
})
Deno.bench(`t2p() - df=${DF_T}`, () => {
	const t = (Math.random() - 0.5) * 12
	dist.t2p(t, DF_T)
})
Deno.bench(`p2t() - df=${DF_T}`, () => {
	const p = Math.random()
	dist.p2t(p, DF_T)
})
Deno.bench(`f2p() - df=${DF_F[0]},${DF_F[1]}`, () => {
	const f = Math.random() * 12
	dist.f2p(f, DF_F[0], DF_F[1])
})
Deno.bench(`p2f() - df=${DF_F[0]},${DF_F[1]}`, () => {
	const p = Math.random()
	dist.p2f(p, DF_F[0], DF_F[1])
})
Deno.bench(`c2p() - df=${DF_C}`, () => {
	const c = Math.random() * 12
	dist.c2p(c, DF_C)
})
Deno.bench(`p2c() - df=${DF_C}`, () => {
	const p = Math.random()
	dist.p2c(p, DF_C)
})
Deno.bench('randomNormal()', () => {
	dist.randomNormal()
})
Deno.bench(`randomT() - df=${DF_T}`, () => {
	dist.randomT(DF_T)
})
Deno.bench(`randomF() - df=${DF_F[0]},${DF_F[1]}`, () => {
	dist.randomF(DF_F[0], DF_F[1])
})
Deno.bench(`randomChi2() - df=${DF_C}`, () => {
	dist.randomChi2(DF_C)
})
Deno.bench(`matrix.add() - ${ROWS}x${COLS}`, (b) => {
	const mA = new base.Matrix(tools.randomMatrix(ROWS, COLS, 0, 1))
	const mB = new base.Matrix(tools.randomMatrix(ROWS, COLS, 0, 1))
	b.start()
	mA.add(mB)
	b.end()
})
Deno.bench(`matrix.transpose() - ${ROWS}x${COLS}`, (b) => {
	const m = new base.Matrix(tools.randomMatrix(ROWS, COLS, 0, 1))
	b.start()
	m.transpose()
	b.end()
})
Deno.bench(`matrix.multiply() - ${ROWS}x${COLS}`, (b) => {
	const mA = new base.Matrix(tools.randomMatrix(ROWS, COLS, 0, 1))
	const mB = new base.Matrix(tools.randomMatrix(COLS, ROWS, 0, 1))
	b.start()
	mA.multiply(mB)
	b.end()
})
Deno.bench(`matrix.inverse() - ${ROWS}x${ROWS}`, (b) => {
	const m = new base.Matrix(tools.randomMatrix(ROWS, ROWS, 0, 1))
	b.start()
	m.inverse()
	b.end()
})
