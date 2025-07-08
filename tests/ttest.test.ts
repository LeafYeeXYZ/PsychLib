import { assertAlmostEquals, assertEquals } from 'jsr:@std/assert'
import * as m from '../lib/ttest/index.ts'
import { R } from './r.ts'
import { normalArray } from './utils.ts'

Deno.test('One Sample T-Test', async () => {
	const data = normalArray(1000, 1, 1)
	const resultActual = new m.OneSampleTTest(data, 0)
	const resultExpected = await R(
		`
		library(psych)
		data <- c(${data.join(',')})
		result <- t.test(data, mu = 0)
		list(
			t = result$statistic,
			p = result$p.value,
			df = result$parameter,
			ci = result$conf.int,
			mean = result$estimate[1],
			sem = result$stderr,
			cohenD = mean(data) / sd(data),
			r2 = result$statistic^2 / (result$statistic^2 + result$parameter)
		)
	`,
		['psych'],
	)
	assertAlmostEquals(resultActual.ci[0], resultExpected.ci[0], 1e-4)
	assertAlmostEquals(resultActual.ci[1], resultExpected.ci[1], 1e-4)
	assertEquals(resultActual.df, resultExpected.df)
	assertAlmostEquals(resultActual.t, resultExpected.t, 1e-4)
	assertAlmostEquals(resultActual.p, resultExpected.p, 1e-4)
	assertAlmostEquals(resultActual.mean, resultExpected.mean, 1e-4)
	assertAlmostEquals(resultActual.sem, resultExpected.sem, 1e-4)
	assertAlmostEquals(resultActual.cohenD, resultExpected.cohenD, 1e-4)
	assertAlmostEquals(resultActual.r2, resultExpected.r2, 1e-4)
})

Deno.test('Paired T-Test', async () => {
	const dataA = normalArray(1000, 1, 1)
	const dataB = normalArray(1000, 2, 1)
	const resultActual = new m.PeerSampleTTest(dataA, dataB)
	const resultExpected = await R(
		`
		library(psych)
		data1 <- c(${dataA.join(',')})
		data2 <- c(${dataB.join(',')})
		result <- t.test(data1, data2, paired = TRUE)
		list(
			t = result$statistic,
			p = result$p.value,
			df = result$parameter,
			ci = result$conf.int,
			meanA = mean(data1),
			meanB = mean(data2),
			sem = sd(data1 - data2) / sqrt(length(data1)),
			cohenD = (mean(data1) - mean(data2)) / sd(data1 - data2),
			r2 = result$statistic^2 / (result$statistic^2 + result$parameter)
		)
	`,
		['psych'],
	)
	assertAlmostEquals(resultActual.ci[0], resultExpected.ci[0], 1e-4)
	assertAlmostEquals(resultActual.ci[1], resultExpected.ci[1], 1e-4)
	assertEquals(resultActual.df, resultExpected.df)
	assertAlmostEquals(resultActual.t, resultExpected.t, 1e-4)
	assertAlmostEquals(resultActual.p, resultExpected.p, 1e-4)
	assertAlmostEquals(resultActual.meanA, resultExpected.meanA, 1e-4)
	assertAlmostEquals(resultActual.meanB, resultExpected.meanB, 1e-4)
	assertAlmostEquals(resultActual.sem, resultExpected.sem, 1e-4)
	assertAlmostEquals(resultActual.cohenD, resultExpected.cohenD, 1e-4)
	assertAlmostEquals(resultActual.r2, resultExpected.r2, 1e-4)
})

Deno.test('Two Sample T-Test', async () => {
	const dataA = normalArray(1000, 1, 1)
	const dataB = normalArray(1000, 2, 1)
	const resultActual = new m.TwoSampleTTest(dataA, dataB)
	const resultExpected = await R(
		`
		library(psych)
		data1 <- c(${dataA.join(',')})
		data2 <- c(${dataB.join(',')})
		result <- t.test(data1, data2, var.equal = TRUE)
		list(
			t = result$statistic,
			p = result$p.value,
			df = result$parameter,
			ci = result$conf.int,
			meanA = result$estimate[1],
			meanB = result$estimate[2],
			sem = result$stderr,
			cohenD = (mean(data1) - mean(data2)) / sqrt((sd(data1)^2 + sd(data2)^2) / 2),
			r2 = result$statistic^2 / (result$statistic^2 + result$parameter)
		)
	`,
		['psych'],
	)
	assertAlmostEquals(resultActual.ci[0], resultExpected.ci[0], 1e-4)
	assertAlmostEquals(resultActual.ci[1], resultExpected.ci[1], 1e-4)
	assertEquals(resultActual.df, resultExpected.df)
	assertAlmostEquals(resultActual.t, resultExpected.t, 1e-4)
	assertAlmostEquals(resultActual.p, resultExpected.p, 1e-4)
	assertAlmostEquals(resultActual.meanA, resultExpected.meanA, 1e-4)
	assertAlmostEquals(resultActual.meanB, resultExpected.meanB, 1e-4)
	assertAlmostEquals(resultActual.sem, resultExpected.sem, 1e-4)
	assertAlmostEquals(resultActual.cohenD, resultExpected.cohenD, 1e-4)
	assertAlmostEquals(resultActual.r2, resultExpected.r2, 1e-4)
})

Deno.test('Welch T-Test', async () => {
	const dataA = normalArray(1000, 1, 1)
	const dataB = normalArray(1000, 2, 1)
	const resultActual = new m.WelchTTest(dataA, dataB)
	const resultExpected = await R(
		`
		library(psych)
		data1 <- c(${dataA.join(',')})
		data2 <- c(${dataB.join(',')})
		result <- t.test(data1, data2, var.equal = FALSE)
		list(
			t = result$statistic,
			p = result$p.value,
			df = result$parameter,
			ci = result$conf.int,
			meanA = result$estimate[1],
			meanB = result$estimate[2],
			sem = result$stderr,
			cohenD = (mean(data1) - mean(data2)) / sqrt((sd(data1)^2 + sd(data2)^2) / 2),
			r2 = result$statistic^2 / (result$statistic^2 + result$parameter)
		)
	`,
		['psych'],
	)
	assertAlmostEquals(resultActual.ci[0], resultExpected.ci[0], 1e-4)
	assertAlmostEquals(resultActual.ci[1], resultExpected.ci[1], 1e-4)
	assertAlmostEquals(resultActual.df, resultExpected.df, 1e-4)
	assertAlmostEquals(resultActual.t, resultExpected.t, 1e-4)
	assertAlmostEquals(resultActual.p, resultExpected.p, 1e-4)
	assertAlmostEquals(resultActual.meanA, resultExpected.meanA, 1e-4)
	assertAlmostEquals(resultActual.meanB, resultExpected.meanB, 1e-4)
	assertAlmostEquals(resultActual.sem, resultExpected.sem, 1e-4)
	assertAlmostEquals(resultActual.cohenD, resultExpected.cohenD, 1e-4)
	assertAlmostEquals(resultActual.r2, resultExpected.r2, 1e-4)
})
