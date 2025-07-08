import { assertAlmostEquals, assertEquals } from 'jsr:@std/assert'
import * as m from '../lib/nonparam/index.ts'
import { R } from './r.ts'
import { normalArray } from './utils.ts'

Deno.test('One-sample Kolmogorov-Smirnov Test', async () => {
	const sizes = [1000, 500, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
	for (const size of sizes) {
		const data = normalArray(size, 1, 1)
		const resultActual = new m.OneSampleKSTest(data)
		const resultExpected = await R(
			`
			library(stats)
			data <- c(${data.join(',')})
			result <- ks.test(scale(data), 'pnorm', mean = 0, sd = 1)
			list(
				d = result$statistic,
				p = result$p.value,
				decide = result$p.value < 0.05
			)
		`,
			['stats'],
		)
		console.table([
			{
				size,
				source: 'PsychLib',
				d: resultActual.d,
				p: resultActual.p,
				rejected: resultActual.rejected,
			},
			{
				size,
				source: 'R',
				d: resultExpected.d,
				p: resultExpected.p,
				rejected: resultExpected.decide,
			},
			{
				source: 'Difference',
				d: resultActual.d - resultExpected.d,
				p: resultActual.p - resultExpected.p,
			},
		])
		assertAlmostEquals(resultActual.d, resultExpected.d, 1e-4)
		assertAlmostEquals(
			resultActual.p,
			resultExpected.p,
			size < 100 ? 0.2 : 1e-4,
		)
		assertEquals(resultActual.rejected, resultExpected.decide)
	}
})

Deno.test('Levene Test (center = mean)', async () => {
	const data = [
		normalArray(200, 1, 1),
		normalArray(200, 2, 0.95),
		normalArray(200, 3, 1.05),
		normalArray(200, 4, 1),
	].flat()
	const group = [
		...new Array(200).fill(0),
		...new Array(200).fill(1),
		...new Array(200).fill(2),
		...new Array(200).fill(3),
	]
	const resultActual = new m.LeveneTest(data, group, 'mean')
	const resultExpected = await R(
		`
		library(car)
		data <- c(${data.join(',')})
		group <- factor(c(${group.join(',')}))
		result <- leveneTest(data ~ group, center = mean)
		list(
			w = result$\`F value\`[1],
			p = result$\`Pr(>F)\`[1]
		)
	`,
		['car'],
	)
	assertAlmostEquals(resultActual.w, resultExpected.w, 1e-4)
	assertAlmostEquals(resultActual.p, resultExpected.p, 1e-4)
})

Deno.test('Levene Test (center = median)', async () => {
	const data = [
		normalArray(200, 1, 1),
		normalArray(200, 2, 0.95),
		normalArray(200, 3, 1.05),
		normalArray(200, 4, 1),
	].flat()
	const group = [
		...new Array(200).fill(0),
		...new Array(200).fill(1),
		...new Array(200).fill(2),
		...new Array(200).fill(3),
	]
	const resultActual = new m.LeveneTest(data, group, 'median')
	const resultExpected = await R(
		`
		library(car)
		data <- c(${data.join(',')})
		group <- factor(c(${group.join(',')}))
		result <- leveneTest(data ~ group, center = median)
		list(
			w = result$\`F value\`[1],
			p = result$\`Pr(>F)\`[1]
		)
	`,
		['car'],
	)
	assertAlmostEquals(resultActual.w, resultExpected.w, 1e-4)
	assertAlmostEquals(resultActual.p, resultExpected.p, 1e-4)
})
