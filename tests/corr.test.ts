import { assertAlmostEquals } from 'jsr:@std/assert'
import * as m from '../lib/correlation/index.ts'
import { R } from '../utils/r.ts'
import { normalArray } from '../utils/tools.ts'

Deno.test('Pearson Correlation Test', async () => {
	for (let i = 0; i < 100; i++) {
		const x = normalArray(1000, 10, 3)
		const y = normalArray(1000, 12, 2)
		const pcorrActual = new m.PearsonCorrTest(x, y)
		const pcorrExpected = await R(
			`
			library(stats)
			x <- c(${x.join(',')})
			y <- c(${y.join(',')})
			pcorr <- cor.test(x, y, method = "pearson")
			list(r = pcorr$estimate, t = pcorr$statistic, p = pcorr$p.value, ci = pcorr$conf.int)
		`,
			['stats'],
		)
		assertAlmostEquals(pcorrActual.r, pcorrExpected.r, 1e-4)
		assertAlmostEquals(pcorrActual.t, pcorrExpected.t, 1e-4)
		assertAlmostEquals(pcorrActual.p, pcorrExpected.p, 1e-4)
		assertAlmostEquals(pcorrActual.ci[0], pcorrExpected.ci[0], 1e-4)
		assertAlmostEquals(pcorrActual.ci[1], pcorrExpected.ci[1], 1e-4)
	}
})
