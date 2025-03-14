import { mean, vari } from '../base.ts'
import { p2t, t2p } from '../distribution/index.ts'

/**
 * Welch's t-test
 *
 * 韦尔奇 t 检验 (不等方差 t 检验)
 * @see https://en.wikipedia.org/wiki/Welch%27s_t-test
 */
export class WelchTTest {
	/**
	 * Welch's t-test
	 *
	 * 韦尔奇 t 检验 (不等方差 t 检验)
	 * @param a numbers array a
	 * @param b numbers array b
	 * @param twoside two side or not (default is true)
	 * @param mu population mean difference (default is 0)
	 * @param alpha significance level (default is 0.05) (only for confidence interval)
	 * @returns t test result
	 * @example
	 * ```typescript
	 * import { WelchTTest } from '@psych/lib'
	 * const a = [1, 2, 3, 4, 5]
	 * const b = [6, 7, 8, 9, 10]
	 * const ttest = new WelchTTest(a, b)
	 * console.log(ttest.p, ttest.t)
	 * ```
	 * @see https://en.wikipedia.org/wiki/Welch%27s_t-test
	 */
	constructor(a: number[], b: number[], twoside = true, mu = 0, alpha = 0.05) {
		this.alpha = alpha
		this.twoside = twoside
		this.mu = mu
		this.meanA = mean(a)
		this.meanB = mean(b)
		this.dfA = a.length - 1
		this.dfB = b.length - 1
		this.meanDiff = this.meanA - this.meanB
		const variA = vari(a, true, this.meanA)
		const variB = vari(b, true, this.meanB)
		this.stdA = Math.sqrt(variA)
		this.stdB = Math.sqrt(variB)
		const semA = this.stdA / Math.sqrt(a.length)
		const semB = this.stdB / Math.sqrt(b.length)
		this.sem = Math.sqrt(semA ** 2 + semB ** 2)
		const up = (variA / a.length + variB / b.length) ** 2
		const down1 = variA ** 2 / (a.length ** 2 * this.dfA)
		const down2 = variB ** 2 / (b.length ** 2 * this.dfB)
		this.df = up / (down1 + down2)
		this.t = (this.meanDiff - this.mu) / this.sem
		this.p = t2p(this.t, this.df, this.twoside)
		const variance =
			(variA * this.dfA + variB * this.dfB) / (this.dfA + this.dfB)
		this.cohenD = (this.meanDiff - this.mu) / Math.sqrt(variance)
		this.r2 = this.t ** 2 / (this.t ** 2 + this.df)
		const ciT = p2t(this.alpha, this.df)
		this.ci = [this.meanDiff - ciT * this.sem, this.meanDiff + ciT * this.sem]
	}
	/**
	 * Degree of freedom of group a
	 *
	 * 组 a 的自由度
	 */
	dfA: number
	/**
	 * Degree of freedom of group b
	 *
	 * 组 b 的自由度
	 */
	dfB: number
	/**
	 * Confidence interval (for given alpha)
	 *
	 * 置信区间 (给定显著性水平)
	 */
	ci: [number, number]
	/**
	 * alpha significance level
	 *
	 * 显著性水平
	 */
	alpha: number
	/**
	 * coefficient of determination (R^2)
	 *
	 * 测定系数 (R^2)
	 */
	r2: number
	/**
	 * population mean difference
	 *
	 * 总体均值差异
	 */
	mu: number
	/**
	 * Two side or not
	 *
	 * 是否双侧检验
	 */
	twoside: boolean
	/**
	 * Mean difference
	 *
	 * 均值差异
	 */
	meanDiff: number
	/**
	 * Sample mean a
	 *
	 * 样本均值 a
	 */
	meanA: number
	/**
	 * Sample mean b
	 *
	 * 样本均值 b
	 */
	meanB: number
	/**
	 * Sample standard deviation a
	 *
	 * 样本标准差 a
	 */
	stdA: number
	/**
	 * Sample standard deviation b
	 *
	 * 样本标准差 b
	 */
	stdB: number
	/**
	 * Standard error of the mean difference
	 *
	 * 合并标准误
	 */
	sem: number
	/**
	 * Degree of freedom
	 *
	 * 自由度
	 */
	df: number
	/**
	 * t value
	 *
	 * t 值
	 */
	t: number
	/**
	 * p value
	 *
	 * p 值
	 */
	p: number
	/**
	 * Cohen's d
	 *
	 * 效应量 Cohen's d
	 */
	cohenD: number
}
