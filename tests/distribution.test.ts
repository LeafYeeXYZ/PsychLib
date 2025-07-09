import { assertAlmostEquals } from 'jsr:@std/assert'
import * as m from '../lib/distribution/index.ts'
import { R } from '../utils/r.ts'

Deno.test('Z Distribution', async () => {
	for (let i = 0; i < 100; i++) {
		const z = (Math.random() - 0.5) * 6
		const pActual = m.z2p(z)
		const pExpected = await R(
			`
			library(stats)
			pnorm(${z}, mean = 0, sd = 1)
		`,
			['stats'],
		)
		assertAlmostEquals(pActual, pExpected, 1e-4)
		const p = Math.random()
		const zActual = m.p2z(p)
		const zExpected = await R(
			`
			library(stats)
			qnorm(${p}, mean = 0, sd = 1)
		`,
			['stats'],
		)
		assertAlmostEquals(zActual, zExpected, 1e-4)
	}
})

Deno.test('T Distribution', async () => {
	const df = [5, 10, 20, 30, 50, 100]
	for (const d of df) {
		for (let i = 0; i < 100; i++) {
			const t = (Math.random() - 0.5) * 6
			const pActual = m.t2p(t, d)
			const pExpected = await R(
				`
				library(stats)
				2 * pt(-abs(${t}), df = ${d})
			`,
				['stats'],
			)
			assertAlmostEquals(pActual, pExpected, 1e-4)
			const p = Math.random()
			const tActual = m.p2t(p, d)
			const tExpected = await R(
				`
				library(stats)
				qt(1 - ${p} / 2, df = ${d})
			`,
				['stats'],
			)
			assertAlmostEquals(tActual, tExpected, 1e-4)
		}
	}
})

Deno.test('F Distribution', async () => {
	const df1 = [5, 10, 20, 30, 50, 100]
	const df2 = [5, 10, 20, 30, 50, 100]
	for (const d1 of df1) {
		for (const d2 of df2) {
			for (let i = 0; i < 100; i++) {
				const f = Math.random() * 10
				const pActual = m.f2p(f, d1, d2)
				const pExpected = await R(
					`
					library(stats)
					pf(${f}, df1 = ${d1}, df2 = ${d2}, lower.tail = FALSE)
				`,
					['stats'],
				)
				assertAlmostEquals(pActual, pExpected, 1e-4)
				const p = Math.random()
				const fActual = m.p2f(p, d1, d2)
				const fExpected = await R(
					`
					library(stats)
					qf(1 - ${p}, df1 = ${d1}, df2 = ${d2})
				`,
					['stats'],
				)
				assertAlmostEquals(fActual, fExpected, 1e-4)
			}
		}
	}
})

Deno.test('Chi-Squared Distribution', async () => {
	const df = [5, 10, 20, 30, 50, 100]
	for (const d of df) {
		for (let i = 0; i < 100; i++) {
			const c = Math.random() * 10
			const pActual = m.c2p(c, d)
			const pExpected = await R(
				`
				library(stats)
				pchisq(${c}, df = ${d}, lower.tail = FALSE)
			`,
				['stats'],
			)
			assertAlmostEquals(pActual, pExpected, 1e-4)
			const p = Math.random()
			const cActual = m.p2c(p, d)
			const cExpected = await R(
				`
				library(stats)
				qchisq(1 - ${p}, df = ${d})
			`,
				['stats'],
			)
			assertAlmostEquals(cActual, cExpected, 1e-4)
		}
	}
})
