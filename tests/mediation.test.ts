import { assertAlmostEquals, assertEquals } from 'jsr:@std/assert'
import * as pl from '../lib/index.ts'
import { R } from '../utils/r.ts'

const N = 200
const B = 1000
const ALPHA = 0.05
const x: number[] = new Array(N).fill(0).map(() => pl.randomNormal(0, 1))
const m: number[] = new Array(N)
	.fill(0)
	.map((_, i) => 0.4 * x[i] + pl.randomNormal(0, 1))
const y: number[] = new Array(N)
	.fill(0)
	.map((_, i) => 0.2 * x[i] + 0.4 * m[i] + pl.randomNormal(0, 1))

Deno.test('Simple Mediation Test', async () => {
	const pl_smm = new pl.SimpleMediationModel(x, m, y)
	const r_smm = await R(
		`
		library(lavaan)
		# 定义数据
		X <- c(${x.join(', ')})
		M <- c(${m.join(', ')})
		Y <- c(${y.join(', ')})
		data <- data.frame(X, M, Y)
		model <- '
			M ~ a*X
			Y ~ b*M + c_prime*X
			ab := a*b
			total := c_prime + ab
		'
		fit <- sem(model, data = data, se = "bootstrap", bootstrap = 100)
		summary(fit, standardized = TRUE, fit.measures = TRUE)
	`,
		['lavaan'],
	)
	assertAlmostEquals(pl_smm.a, r_smm.pe[0].est, 1e-4)
	assertAlmostEquals(pl_smm.b, r_smm.pe[1].est, 1e-4)
	assertAlmostEquals(pl_smm.cPrime, r_smm.pe[2].est, 1e-4)
	assertAlmostEquals(pl_smm.ab, r_smm.pe[r_smm.pe.length - 2].est, 1e-4)
	assertAlmostEquals(
		pl_smm.ab + pl_smm.cPrime,
		r_smm.pe[r_smm.pe.length - 1].est,
		1e-4,
	)
	const pl_results = pl_smm.bootstrap(B, ALPHA)
	assertEquals(pl_results.a[0] < pl_smm.a, true)
	assertEquals(pl_results.a[1] > pl_smm.a, true)
	assertEquals(pl_results.b[0] < pl_smm.b, true)
	assertEquals(pl_results.b[1] > pl_smm.b, true)
	assertEquals(pl_results.cPrime[0] < pl_smm.cPrime, true)
	assertEquals(pl_results.cPrime[1] > pl_smm.cPrime, true)
	assertEquals(pl_results.ab[0] < pl_smm.ab, true)
	assertEquals(pl_results.ab[1] > pl_smm.ab, true)
})
