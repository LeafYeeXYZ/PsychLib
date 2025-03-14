import sl from 'npm:@stdlib/stats-anova1'
import { assertAlmostEquals, assertEquals } from 'jsr:@std/assert'
import * as pl from '../lib/index.ts'

Deno.test('One Way Anova Test', () => {
	for (let i = 0; i < 10; i++) {
		const levels = Math.floor(Math.random() * 8) + 3
		const group: number[] = new Array(1000)
			.fill(0)
			.map(() => Math.floor(Math.random() * levels))
		const value: number[] = group.map((v) => Math.random() * 10 + v)
		const pl_res = new pl.OneWayAnova(value, group)
		const sl_res = sl(value, group)
		assertAlmostEquals(pl_res.f, sl_res.statistic, 1e-6)
		assertAlmostEquals(pl_res.p, sl_res.pValue, 1e-6)
		pl_res.scheffe()
		pl_res.bonferroni()
	}
})

Deno.test('Peer Anova Test', () => {
	for (let i = 0; i < 10; i++) {
		const levels = Math.floor(Math.random() * 8) + 3
		const value: number[][] = new Array(levels)
			.fill(0)
			.map(() => new Array(1000).fill(0).map(() => Math.random() * 10))
		const pl_res = new pl.PeerAnova(value)
		assertEquals(typeof pl_res.p, 'number')
		assertEquals(typeof pl_res.f, 'number')
		pl_res.scheffe()
		pl_res.bonferroni()
	}
})
