import { mean, standardize, std } from '../base.ts'
import { z2p } from '../distribution/index.ts'
import { sort } from '../sort.ts'

/**
 * One-sample Kolmogorov-Smirnov test for Normal distribution
 *
 * 单样本 Kolmogorov-Smirnov 正态分布检验
 *
 * For small sample sizes (n <= 50), p value may not be accurate, please refer to the decision value for significance judgment.
 *
 * 对于小样本量 (n <= 50)，p值可能不准确，请使用决策值进行显著性判断
 * @see https://en.wikipedia.org/wiki/Kolmogorov–Smirnov_test
 */
export class OneSampleKSTest {
	/**
	 * One-sample Kolmogorov-Smirnov test for Normal distribution
	 *
	 * 单样本 Kolmogorov-Smirnov 正态分布检验
	 * 
	 * For small sample sizes (n <= 50), p value may not be accurate, please refer to the decision value for significance judgment.
	 * 
	 * 对于小样本量 (n <= 50)，p值可能不准确，请使用决策值进行显著性判断
	 * @param data sample data
	 * @param alpha significance level (default: 0.05)
	 * @returns One-sample Kolmogorov-Smirnov test result
	 * @example
	 * ```typescript
	 * import { OneSampleKSTest } from '@psych/lib'
	 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	 * const ks = new OneSampleKSTest(data)
	 * console.log(ks.p, ks.d)
	 * ```
	 */
	constructor(data: number[], alpha: number = 0.05) {
		if (data.length === 0) {
			throw new Error('Data array cannot be empty')
		}
		if (data.some((x) => !Number.isFinite(x))) {
			throw new Error('Data contains non-finite values')
		}

		this.count = data.length
		this.alpha = alpha
		this.mean = mean(data)
		this.std = std(data, true, this.mean)

		if (this.std === 0) {
			this.d = 0
			this.p = 1
			this.decide = this.#getCriticalValue()
			this.rejected = false
			return
		}

		const standardized = standardize(
			sort(data),
			true,
			false,
			this.mean,
			this.std,
		)

		this.d = this.#computeKSStatistic(standardized)
		this.p = this.#computePValue()
		this.decide = this.#getCriticalValue()
		this.rejected = this.d > this.decide
	}

	/**
	 * 计算KS统计量
	 * @param standardized 标准化后的排序数据
	 * @returns KS统计量
	 */
	#computeKSStatistic(standardized: number[]): number {
		const n = standardized.length
		let maxDiff = 0

		for (let i = 0; i < n; i++) {
			const x = standardized[i]
			const theoreticalCDF = z2p(x)
			// 经验分布函数在x处的左极限和右极限
			const empiricalCDF_left = i / n
			const empiricalCDF_right = (i + 1) / n
			// 计算四种可能的差距
			const diff1 = Math.abs(empiricalCDF_right - theoreticalCDF)
			const diff2 = Math.abs(empiricalCDF_left - theoreticalCDF)

			maxDiff = Math.max(maxDiff, diff1, diff2)
		}
		return maxDiff
	}

	/**
	 * 计算p值
	 * @returns p值
	 */
	#computePValue(): number {
		const n = this.count
		const d = this.d
		if (d === 0) {
			return 1
		}
		if (d >= 1) {
			return 0
		}
		if (n <= 50) {
			return this.#computeExactPValue()
		}
		return this.#computeAsymptoticPValue()
	}

	/**
	 * 计算精确p值
	 * @returns 精确p值
	 */
	#computeExactPValue(): number {
		const n = this.count
		const d = this.d
		const sqrtN = Math.sqrt(n)
		const lambda = sqrtN * d
		let p = 2 * Math.exp(-2 * lambda * lambda)
		if (n < 100) {
			const correction = (2 * lambda * lambda - 1) / (6 * sqrtN)
			p *= 1 + correction
		}
		return Math.max(0, Math.min(1, p))
	}

	/**
	 * 计算渐近p值
	 * @returns 渐近p值
	 */
	#computeAsymptoticPValue(): number {
		const n = this.count
		const d = this.d
		const lambda = Math.sqrt(n) * d
		let sum = 0
		const maxTerms = 100
		for (let k = 1; k <= maxTerms; k++) {
			const term = Math.exp(-2 * k * k * lambda * lambda)
			if (term < 1e-15) {
				break
			}
			sum += (k % 2 === 1 ? 1 : -1) * term
		}
		const p = 2 * sum
		return Math.max(0, Math.min(1, p))
	}

	/**
	 * 获取渐近常数
	 * @param alpha 显著性水平
	 * @returns 渐近常数
	 */
	#getAsymptoticConstant(alpha: number): number {
		const constants = new Map([
			[0.1, 1.224],
			[0.05, 1.358],
			[0.01, 1.628],
			[0.001, 1.949],
		])
		const c_alpha = constants.get(alpha)
		if (c_alpha === undefined) {
			throw new Error(
				`Unsupported alpha level: ${alpha}. Supported levels are 0.1, 0.05, 0.01, and 0.001.`,
			)
		}
		return c_alpha
	}

	/**
	 * 获取临界值
	 * @returns 临界值
	 */
	#getCriticalValue(): number {
		if (this.count > 50) {
			const c_alpha = this.#getAsymptoticConstant(this.alpha)
			return c_alpha / Math.sqrt(this.count)
		} else {
			const table = this.#getCriticalValueTable(this.alpha)
			return table.get(this.count) || Number.NaN
		}
	}

	/**
	 * 获取临界值表
	 * @param alpha 显著性水平
	 * @returns 临界值表
	 */
	#getCriticalValueTable(alpha: number): Map<number, number> {
		if (alpha === 0.05) {
			return OneSampleKSTest.DECIDE_TABLE
		}
		throw new Error(
			`Unsupported alpha level: ${alpha}. Only 0.05 is supported for small sample sizes.`,
		)
	}

	/**
	 * Decision table for small (<=50) sample size (alpha = 0.05)
	 *
	 * 小样本量 (<=50) 的决策表 (alpha = 0.05)
	 */
	static DECIDE_TABLE: Map<number, number> = new Map([
		[1, 0.975],
		[2, 0.842],
		[3, 0.708],
		[4, 0.624],
		[5, 0.563],
		[6, 0.521],
		[7, 0.486],
		[8, 0.457],
		[9, 0.432],
		[10, 0.409],
		[11, 0.391],
		[12, 0.375],
		[13, 0.361],
		[14, 0.349],
		[15, 0.338],
		[16, 0.33],
		[17, 0.32],
		[18, 0.31],
		[19, 0.3],
		[20, 0.294],
		[21, 0.285],
		[22, 0.277],
		[23, 0.27],
		[24, 0.264],
		[25, 0.259],
		[26, 0.254],
		[27, 0.249],
		[28, 0.245],
		[29, 0.241],
		[30, 0.237],
		[31, 0.234],
		[32, 0.231],
		[33, 0.227],
		[34, 0.224],
		[35, 0.221],
		[36, 0.218],
		[37, 0.216],
		[38, 0.213],
		[39, 0.211],
		[40, 0.208],
		[41, 0.206],
		[42, 0.204],
		[43, 0.202],
		[44, 0.2],
		[45, 0.198],
		[46, 0.196],
		[47, 0.195],
		[48, 0.193],
		[49, 0.191],
		[50, 0.19],
	])

	/**
	 * Significance level
	 *
	 * 显著性水平
	 */
	alpha: number
	/**
	 * Whether to reject the null hypothesis
	 *
	 * 是否拒绝原假设
	 */
	rejected: boolean
	/**
	 * Kolmogorov-Smirnov statistic (Standardized)
	 *
	 * 标准化后的 Kolmogorov-Smirnov 统计量
	 */
	d: number
	/**
	 * Decision point
	 *
	 * 决策点
	 */
	decide: number
	/**
	 * p-value
	 *
	 * p值
	 */
	p: number
	/**
	 * Sample size
	 *
	 * 样本量
	 */
	count: number
	/**
	 * Sample mean
	 *
	 * 样本均值
	 */
	mean: number
	/**
	 * Sample standard deviation
	 *
	 * 样本标准差
	 */
	std: number
}
