export * from './levene.ts'
export * from './ks.ts'

import { kurtosis, skewness } from '../base.ts'
import { z2p } from '../distribution/index.ts'

/**
 * Calculate the sample kurtosis and its z value and significance
 *
 * 计算样本峰度及其 z 值和显著性
 */
export class KurtosisTest {
	/**
	 * Calculate the sample kurtosis and its z value and significance
	 *
	 * 计算样本峰度及其 z 值和显著性
	 * @param data data to be calculated
	 * @example
	 * ```typescript
	 * import { KurtosisTest } from '@psych/lib'
	 * const result = new KurtosisTest([5, 5, 6, 8, 5])
	 * console.log(result)
	 * ```
	 * @throws {Error} the length of data must be greater than 3
	 */
	constructor(public data: number[]) {
		const n = data.length
		if (n < 4) {
			throw new Error('the length of data must be greater than 3')
		}
		this.kurtosis = kurtosis(data)
		this.z = this.kurtosis / Math.sqrt(24 / n)
		this.p = (1 - z2p(Math.abs(this.z))) * 2
	}
	kurtosis: number
	z: number
	p: number
}

/**
 * Calculate the sample skewness and its z value and significance
 *
 * 计算样本偏度及其 z 值和显著性
 */
export class SkewnessTest {
	/**
	 * Calculate the sample skewness and its z value and significance
	 *
	 * 计算样本偏度及其 z 值和显著性
	 * @param data data to be calculated
	 * @example
	 * ```typescript
	 * import { SkewnessTest } from '@psych/lib'
	 * const result = new SkewnessTest([1, 2, 3, 4, 5])
	 * console.log(result)
	 * ```
	 * @throws {Error} the length of data must be greater than 3
	 */
	constructor(public data: number[]) {
		const n = data.length
		if (n < 4) {
			throw new Error('the length of data must be greater than 3')
		}
		this.skewness = skewness(data)
		this.z = this.skewness / Math.sqrt(6 / n)
		this.p = (1 - z2p(Math.abs(this.z))) * 2
	}
	skewness: number
	z: number
	p: number
}
