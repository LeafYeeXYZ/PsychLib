import { assertAlmostEquals } from 'jsr:@std/assert'
import * as m from '../lib/reliability/index.ts'
import { R } from '../utils/r.ts'
import { normalArray } from '../utils/tools.ts'

Deno.test('Alpha Reliability', async () => {
	const items = new Array(5).fill(0).map(() => normalArray(100, 1, 1))
	const resultActual = new m.AlphaRealiability(items)
	const resultExpected = await R(
		`
    library(psych)
    items <- data.frame(${items.map((item) => `c(${item.join(',')})`).join(', ')})
    result <- alpha(items)
    result$total$raw_alpha
  `,
		['psych'],
	)
	assertAlmostEquals(resultActual.alpha[0], resultExpected, 1e-4)
})
