import * as ttest from '../lib/ttest/index.ts'
import { R } from '../utils/r.ts'
import * as tools from '../utils/tools.ts'
import { bench } from './tool.ts'

const N = 1000
const DATA = tools.normalArray(N, 0, 1)
const PEER = tools.normalArray(N, 1, 1)

const benchRServerOne = await bench({
	name: `R语言服务器基准测试 - n=${N}`,
	fn: async () => {
		const rScript = `
      data <- c(${DATA.join(',')})
      1 + 1
    `
		await R(rScript)
		return
	},
})
const benchRServerTwo = await bench({
	name: `R语言服务器基准测试 - n=${N}x2`,
	fn: async () => {
		const rScript = `
      data1 <- c(${DATA.join(',')})
      data2 <- c(${PEER.join(',')})
      1 + 1
    `
		await R(rScript)
		return
	},
})

const benchROneSampleTTest = await bench({
	name: `单样本T检验 - R - n=${N}`,
	fn: async () => {
		const rScript = `
      library(psych)
      data <- c(${DATA.join(',')})
      result <- t.test(data, mu = 0)
      1 + 1
    `
		await R(rScript, ['psych'])
		return
	},
	baselineMs: [benchRServerOne.单次运行时间_毫秒],
})
const benchRPeerSampleTTest = await bench({
	name: `配对样本T检验 - R - n=${N}`,
	fn: async () => {
		const rScript = `
      library(psych)
      data1 <- c(${DATA.join(',')})
      data2 <- c(${PEER.join(',')})
      result <- t.test(data1, data2, paired = TRUE)
      1 + 1
    `
		await R(rScript, ['psych'])
		return
	},
	baselineMs: [benchRServerTwo.单次运行时间_毫秒],
})
const benchRTwoSampleTTest = await bench({
	name: `独立样本T检验 - R - n=${N}`,
	fn: async () => {
		const rScript = `
      library(psych)
      data1 <- c(${DATA.join(',')})
      data2 <- c(${PEER.join(',')})
      result <- t.test(data1, data2, var.equal = TRUE)
      1 + 1
    `
		await R(rScript, ['psych'])
		return
	},
	baselineMs: [benchRServerTwo.单次运行时间_毫秒],
})
const benchRWelchTTest = await bench({
	name: `不等方差T检验 - R - n=${N}`,
	fn: async () => {
		const rScript = `
      library(psych)
      data1 <- c(${DATA.join(',')})
      data2 <- c(${PEER.join(',')})
      result <- t.test(data1, data2, var.equal = FALSE)
      1 + 1
    `
		await R(rScript, ['psych'])
		return
	},
	baselineMs: [benchRServerTwo.单次运行时间_毫秒],
})

const benchPsychLibOneSampleTTest = await bench({
	name: `单样本T检验 - PsychLib - n=${N}`,
	fn: () => {
		const _result = new ttest.OneSampleTTest(DATA, 0)
		return
	},
	relativeTo: benchROneSampleTTest,
})
const benchPsychLibPeerSampleTTest = await bench({
	name: `配对样本T检验 - PsychLib - n=${N}`,
	fn: () => {
		const _result = new ttest.PeerSampleTTest(DATA, PEER)
		return
	},
	relativeTo: benchRPeerSampleTTest,
})
const benchPsychLibTwoSampleTTest = await bench({
	name: `独立样本T检验 - PsychLib - n=${N}`,
	fn: () => {
		const _result = new ttest.TwoSampleTTest(DATA, PEER)
		return
	},
	relativeTo: benchRTwoSampleTTest,
})
const benchPsychLibWelchTTest = await bench({
	name: `不等方差T检验 - PsychLib - n=${N}`,
	fn: () => {
		const _result = new ttest.WelchTTest(DATA, PEER)
		return
	},
	relativeTo: benchRWelchTTest,
})

console.table([
	benchRServerOne,
	benchRServerTwo,
	benchPsychLibOneSampleTTest,
	benchROneSampleTTest,
	benchPsychLibPeerSampleTTest,
	benchRPeerSampleTTest,
	benchPsychLibTwoSampleTTest,
	benchRTwoSampleTTest,
	benchPsychLibWelchTTest,
	benchRWelchTTest,
])

// Deno.bench(`OneWayAnova - n=${N}`, () => {
// 	new pl.OneWayAnova(a, g)
// })
// Deno.bench(`PeerAnova - n=${N},3iv`, () => {
// 	new pl.PeerAnova([a, b, c])
// })
// Deno.bench(`LeveneTest - n=${N}`, () => {
// 	new pl.LeveneTest(a, g)
// })
// Deno.bench(`OneSampleKSTest - n=${N}`, () => {
// 	new pl.OneSampleKSTest(a)
// })
// Deno.bench(`OneSampleTTest - n=${N}`, () => {
// 	new pl.OneSampleTTest(a, 0)
// })
// Deno.bench(`TwoSampleTTest - n=${N}`, () => {
// 	new pl.TwoSampleTTest(a, b)
// })
// Deno.bench(`PeerSampleTTest - n=${N}`, () => {
// 	new pl.PeerSampleTTest(a, b)
// })
// Deno.bench(`WelchTTest - n=${N}`, () => {
// 	new pl.WelchTTest(a, b)
// })
// Deno.bench(`PearsonCorrTest - n=${N}`, () => {
// 	new pl.PearsonCorrTest(a, b)
// })
// Deno.bench(`bootstrapSample() - n=${N},B=${B}`, () => {
// 	pl.bootstrapSample(a, B)
// })
// Deno.bench(`bootstrapTest() - mean - n=${N},B=${B}`, () => {
// 	pl.bootstrapTest('mean', B, 0.05, a)
// })
// Deno.bench(`bootstrapTest() - median - n=${N},B=${B}`, () => {
// 	pl.bootstrapTest('median', B, 0.05, a)
// })
// Deno.bench(`bootstrapTest() - ab - n=${N},B=${B}`, () => {
// 	pl.bootstrapTest('ab', B, 0.05, a, b, c)
// })
// // Regression
// Deno.bench(`LinearRegressionOne - n=${N}`, () => {
// 	new pl.LinearRegressionOne(a, b)
// })
// Deno.bench(`LinearRegressionStandard - n=${N},3iv`, () => {
// 	new pl.LinearRegressionStandard(iv, dv)
// })
// Deno.bench(`LinearRegressionStepwise - n=${N},3iv`, () => {
// 	new pl.LinearRegressionStepwise(iv, dv)
// })
// Deno.bench(`LinearRegressionSequential - n=${N},3iv`, () => {
// 	new pl.LinearRegressionSequential(iv, dv)
// })
// // Mediation
// Deno.bench(`SimpleMediationModel - n=${N}`, () => {
// 	new pl.SimpleMediationModel(a, b, c)
// })
// Deno.bench(`SimpleMediationModel - n=${N} - bootstrap (B=${B})`, () => {
// 	const smm = new pl.SimpleMediationModel(a, b, c)
// 	smm.bootstrap(B)
// })
// // Reliability
// Deno.bench(`AlphaRealiability - n=${N},3iv`, () => {
// 	new pl.AlphaRealiability([a, b, c])
// })
