import { corr } from '../base.ts'
import { p2z, t2p } from '../distribution/index.ts'

/**
 * Pearson correlation test
 * Note: if you just want to calculate the correlation coefficient, use `corr` function directly
 *
 * Pearson 相关的显著性检验
 * 注意：如果只想计算相关系数，直接使用 `corr` 函数即可
 */
export class PearsonCorrTest {
	/**
	 * Pearson correlation test
	 * Note: if you just want to calculate the correlation coefficient, use `corr` function directly
	 *
	 * Pearson 相关的显著性检验
	 * 注意：如果只想计算相关系数，直接使用 `corr` 函数即可
	 * @param x numbers array x
	 * @param y numbers array y
	 * @param alpha significance level (default is 0.05) (only for confidence interval)
	 * @returns Pearson correlation test result
	 * @example
	 * ```typescript
	 * import { PearsonCorrTest } from '@psych/lib'
	 * const x = [1, 2, 3, 4, 5]
	 * const y = [6, 7, 8, 9, 10]
	 * const corr = new PearsonCorrTest(x, y)
	 * console.log(corr.r, corr.t, corr.p)
	 * ```
	 * @throws {Error} length of x and y should be equal
	 */
	constructor(x: number[], y: number[], alpha = 0.05) {
		if (x.length !== y.length) {
			throw new Error('length of x and y should be equal')
		}
		this.alpha = alpha
		this.df = x.length - 2
		this.r = corr(x, y)
		this.r2 = this.r ** 2
		this.t = this.r * Math.sqrt(this.df / (1 - this.r2))
		this.p = t2p(this.t, this.df)
		const fisherZ = 0.5 * Math.log((1 + this.r) / (1 - this.r))
		const sem = 1 / Math.sqrt(x.length - 3)
		const diffZ = p2z(1 - alpha / 2)
		const upperZ = fisherZ + diffZ * sem
		const lowerZ = fisherZ - diffZ * sem
		const upperR = (Math.exp(2 * upperZ) - 1) / (Math.exp(2 * upperZ) + 1)
		const lowerR = (Math.exp(2 * lowerZ) - 1) / (Math.exp(2 * lowerZ) + 1)
		this.ci = [lowerR, upperR]
	}
	/**
	 * Pearson correlation coefficient
	 *
	 * Pearson 相关系数
	 */
	r: number
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
	 * Degree of freedom
	 *
	 * 自由度
	 */
	df: number
	/**
	 * Coefficient of determination (R^2)
	 *
	 * 测定系数 (R^2)
	 */
	r2: number
}
