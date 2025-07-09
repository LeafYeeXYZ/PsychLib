import { assertAlmostEquals } from 'jsr:@std/assert'
import * as m from '../lib/anova/index.ts'
import { R } from './r.ts'
import { normalArray } from './utils.ts'

Deno.test('One Way ANOVA', async () => {
	const dataA = [
		...normalArray(50, 0, 1),
		...normalArray(50, 0.1, 1),
		...normalArray(50, 0.2, 1),
		...normalArray(50, 0.3, 1),
	]
	const groupA = [
		...new Array(50).fill(0),
		...new Array(50).fill(1),
		...new Array(50).fill(2),
		...new Array(50).fill(3),
	]
	const resAActual = new m.OneWayAnova(dataA, groupA)
	resAActual.tukey()
	resAActual.scheffe()
	resAActual.bonferroni()
	const resAExpected = await R(
		`
		library(stats)
		dataA <- c(${dataA.join(',')})
		groupA <- factor(c(${groupA.join(',')}))
		resA <- aov(dataA ~ groupA)
		resultA <- summary(resA)
		list(
			f = resultA[[1]][["F value"]][1],
			p = resultA[[1]][["Pr(>F)"]][1],
			r2 = resultA[[1]][["Sum Sq"]][1] / sum(resultA[[1]][["Sum Sq"]]),
			cohenF = sqrt(resultA[[1]][["Sum Sq"]][1] / resultA[[1]][["Sum Sq"]][2])
		)
		`,
		['stats'],
	)
	assertAlmostEquals(resAActual.f, resAExpected.f, 1e-4)
	assertAlmostEquals(resAActual.p, resAExpected.p, 1e-4)
	assertAlmostEquals(resAActual.r2, resAExpected.r2, 1e-4)
	assertAlmostEquals(resAActual.cohenF, resAExpected.cohenF, 1e-4)

	const dataB = [
		...normalArray(50, 0, 1),
		...normalArray(40, 0.1, 1),
		...normalArray(30, 0.2, 1),
	]
	const groupB = [
		...new Array(50).fill(0),
		...new Array(40).fill(1),
		...new Array(30).fill(2),
	]
	const resBActual = new m.OneWayAnova(dataB, groupB)
	resBActual.scheffe()
	resBActual.bonferroni()
	const resBExpected = await R(
		`
		library(stats)
		dataB <- c(${dataB.join(',')})
		groupB <- factor(c(${groupB.join(',')}))
		resB <- aov(dataB ~ groupB)
		resultB <- summary(resB)
		list(
			f = resultB[[1]][["F value"]][1],
			p = resultB[[1]][["Pr(>F)"]][1],
			r2 = resultB[[1]][["Sum Sq"]][1] / sum(resultB[[1]][["Sum Sq"]]),
			cohenF = sqrt(resultB[[1]][["Sum Sq"]][1] / resultB[[1]][["Sum Sq"]][2])
		)
	  `,
		['stats'],
	)
	assertAlmostEquals(resBActual.f, resBExpected.f, 1e-4)
	assertAlmostEquals(resBActual.p, resBExpected.p, 1e-4)
	assertAlmostEquals(resBActual.r2, resBExpected.r2, 1e-4)
	assertAlmostEquals(resBActual.cohenF, resBExpected.cohenF, 1e-4)
})

Deno.test('Peer One Way ANOVA', async () => {
	const data = [
		normalArray(50, 0, 1),
		normalArray(50, 0.1, 1),
		normalArray(50, 0.2, 1),
		normalArray(50, 0.3, 1),
	]
	const group = [
		...new Array(50).fill(0),
		...new Array(50).fill(1),
		...new Array(50).fill(2),
		...new Array(50).fill(3),
	]
	const subject = [
		...new Array(50).fill(0).map((_, i) => i),
		...new Array(50).fill(1).map((_, i) => i),
		...new Array(50).fill(2).map((_, i) => i),
		...new Array(50).fill(3).map((_, i) => i),
	]
	const resActual = new m.PeerAnova(data)
	resActual.tukey()
	resActual.scheffe()
	resActual.bonferroni()
	const resExpected = await R(
		`
		library(stats)
		d <- data.frame(
			value = c(${data.flat().join(',')}),
			group = factor(c(${group.join(',')})),
			subject = factor(c(${subject.join(',')}))
		)
		model <- aov(value ~ group + Error(subject/group), data = d)
    anova_table <- summary(model)[[2]]
		F_value <- anova_table[[1]]$\`F value\`[1]
		p_value <- anova_table[[1]]$\`Pr(>F)\`[1]
		ss_condition <- anova_table[[1]]$"Sum Sq"[1]
		ss_error     <- anova_table[[1]]$"Sum Sq"[2]
		r_squared <- ss_condition / (ss_condition + ss_error)
		cohen_f <- sqrt(r_squared / (1 - r_squared))
		list(
			f = as.numeric(F_value),
			p = as.numeric(p_value),
			r2adj = as.numeric(r_squared),
			cohenF = as.numeric(cohen_f)
		)
	  `,
		['stats'],
	)
	assertAlmostEquals(resActual.f, resExpected.f, 1e-4)
	assertAlmostEquals(resActual.p, resExpected.p, 1e-4)
	assertAlmostEquals(resActual.r2adj, resExpected.r2adj, 1e-4)
	assertAlmostEquals(resActual.cohenF, resExpected.cohenF, 1e-4)
})
