import { standardize } from '../base.ts'
import { bootstrapSample } from '../mediation/index.ts'
import { LinearRegression, LinearRegressionOne } from '../regression/index.ts'
import { sort } from '../sort.ts'

/**
 * Simple mediation analysis
 *
 * 简单中介效应分析
 */
export class SimpleMediationModel {
	/**
	 * Simple mediation analysis
	 *
	 * 简单中介效应分析
	 * @param x independent variable
	 * @param m mediator variable
	 * @param y dependent variable
	 * @throws {TypeError} The length of x, m, and y must be equal
	 * @example
	 * ```typescript
	 * import { SimpleMediationModel } from '@psych/lib'
	 * const x = [1, 2, 3, 4, 5]
	 * const m = [2, 3, 4, 5, 6]
	 * const y = [3, 4, 5, 6, 7]
	 * const smm = new SimpleMediationModel(x, m, y)
	 * console.log(smm)
	 * ```
	 */
	constructor(x: number[], m: number[], y: number[]) {
		const n = x.length
		if (m.length !== n || y.length !== n) {
			throw new TypeError('The length of x, m, and y must be equal')
		}
		this.x = x
		this.m = m
		this.y = y
		const x2m = new LinearRegressionOne(x, m)
		const x2y = new LinearRegressionOne(m, y)
		const xm2y = new LinearRegression(
			x.map((_, i) => [x[i], m[i]]),
			y,
		)
		this.c = x2y.b1
		this.cT = x2y.t
		this.cP = x2y.p
		this.cPrime = xm2y.coefficients[1]
		this.cPrimeT = xm2y.tValues[1]
		this.cPrimeP = xm2y.pValues[1]
		this.a = x2m.b1
		this.aT = x2m.t
		this.aP = x2m.p
		this.b = xm2y.coefficients[2]
		this.bT = xm2y.tValues[2]
		this.bP = xm2y.pValues[2]
		this.ab = this.a * this.b
	}
	/**
	 * Bootstrap test for statistics
	 *
	 * 统计量的 Bootstrap 检验
	 * @param times The number of bootstrap times
	 * @returns [Lower bound, Upper bound] (95% confidence interval)
	 */
	bootstrap(
		times = 5000,
		alpha = 0.05,
	): {
		a: [number, number]
		b: [number, number]
		c: [number, number]
		cPrime: [number, number]
		ab: [number, number]
	} {
		const index = Array.from({ length: this.x.length }, (_, i) => i)
		const samples = bootstrapSample(index, times)
		const results: {
			a: number
			b: number
			c: number
			cPrime: number
			ab: number
		}[] = []
		for (const sample of samples) {
			const x = sample.map((i) => this.x[i])
			const m = sample.map((i) => this.m[i])
			const y = sample.map((i) => this.y[i])
			const smm = new SimpleMediationModel(x, m, y)
			results.push({
				a: smm.a,
				b: smm.b,
				c: smm.c,
				cPrime: smm.cPrime,
				ab: smm.ab,
			})
		}
		const a = sort(
			results.map((r) => r.a),
			true,
			'iterativeQuickSort',
			true,
		)
		const b = sort(
			results.map((r) => r.b),
			true,
			'iterativeQuickSort',
			true,
		)
		const c = sort(
			results.map((r) => r.c),
			true,
			'iterativeQuickSort',
			true,
		)
		const cPrime = sort(
			results.map((r) => r.cPrime),
			true,
			'iterativeQuickSort',
			true,
		)
		const ab = sort(
			results.map((r) => r.ab),
			true,
			'iterativeQuickSort',
			true,
		)
		return {
			a: [
				a[Math.floor((times * alpha) / 2)],
				a[Math.floor(times * (1 - alpha / 2))],
			],
			b: [
				b[Math.floor((times * alpha) / 2)],
				b[Math.floor(times * (1 - alpha / 2))],
			],
			c: [
				c[Math.floor((times * alpha) / 2)],
				c[Math.floor(times * (1 - alpha / 2))],
			],
			cPrime: [
				cPrime[Math.floor((times * alpha) / 2)],
				cPrime[Math.floor(times * (1 - alpha / 2))],
			],
			ab: [
				ab[Math.floor((times * alpha) / 2)],
				ab[Math.floor(times * (1 - alpha / 2))],
			],
		}
	}
	/**
	 * Effect size
	 *
	 * | Effect size | Formula | Description |
	 * | --- | --- | --- |
	 * | PM | ab / c | Proportion of the mediation effect in the total effect |
	 * | RM | ab / c' | Ratio of the mediation effect to the direct effect |
	 * | v<sup>2</sup> | a<sup>2</sup> * b<sup>2</sup> |  |
	 * | standarizedAB |  | Standardized ab |
	 *
	 * 效应量
	 *
	 * | 效应量 | 公式 | 描述 |
	 * | --- | --- | --- |
	 * | P<sub>M</sub> | ab / c | 中介效应占总效应的比例 |
	 * | R<sub>M</sub> | ab / c' | 中介效应与直接效应之比 |
	 * | v<sup>2</sup> | a<sup>2</sup> * b<sup>2</sup> |  |
	 * | standarizedAB |  | 标准化的 ab |
	 */
	get effectSize(): {
		PM: number
		RM: number
		v2: number
		standarizedAB: () => number
	} {
		return {
			PM: this.ab / this.c,
			RM: this.ab / this.cPrime,
			v2: this.a ** 2 * this.b ** 2,
			standarizedAB: () => {
				const x = standardize(this.x)
				const m = standardize(this.m)
				const y = standardize(this.y)
				const smm = new SimpleMediationModel(x, m, y)
				return smm.ab
			},
		}
	}
	/**
	 * Indirect effect / Mediation effect (x -> m -> y, ab)
	 *
	 * 间接效应 / 中介效应 (x -> m -> y, ab)
	 */
	ab: number
	/**
	 * Total effect (x -> y)
	 *
	 * 总效应 (x -> y)
	 */
	c: number
	/**
	 * T value of the total effect
	 *
	 * 总效应的 T 值
	 */
	cT: number
	/**
	 * Significant level of the total effect
	 *
	 * 总效应的显著性水平
	 */
	cP: number
	/**
	 * T value of the direct effect
	 *
	 * 直接效应的 T 值
	 */
	cPrimeT: number
	/**
	 * Significant level of the direct effect
	 *
	 * 直接效应的显著性水平
	 */
	cPrimeP: number
	/**
	 * Direct effect (x -> y, controlling for m)
	 *
	 * 直接效应 (x -> y, 控制 m)
	 */
	cPrime: number
	/**
	 * T value of a (x -> m)
	 *
	 * a (x -> m) 的 T 值
	 */
	aT: number
	/**
	 * Significant level of a (x -> m)
	 *
	 * a (x -> m) 的显著性水平
	 */
	aP: number
	/**
	 * x -> m
	 *
	 * x -> m
	 */
	a: number
	/**
	 * T value of b (m -> y, controlling for x)
	 *
	 * b (m -> y, 控制 x) 的 T 值
	 */
	bT: number
	/**
	 * Significant level of b (m -> y, controlling for x)
	 *
	 * b (m -> y, 控制 x) 的显著性水平
	 */
	bP: number
	/**
	 * m -> y (controlling for x)
	 *
	 * m -> y (控制 x)
	 */
	b: number
	/**
	 * Indepedent variable
	 *
	 * 自变量
	 */
	x: number[]
	/**
	 * Mediator variable
	 *
	 * 中介变量
	 */
	m: number[]
	/**
	 * Dependent variable
	 *
	 * 因变量
	 */
	y: number[]
}
