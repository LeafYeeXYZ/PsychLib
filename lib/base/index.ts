import { mean } from 'mathjs'

/**
 * Calculate the sum of squares
 *
 * 计算平方和
 * @param data data to be calculated
 * @returns sum of squares
 * @example
 * ```typescript
 * import { ss } from '@leaf/psych-lib'
 * ss([[3, 1], [2, 1], [1, 1]]) // 5
 * ```
 */
export function ss(data: [number, number][]): number {
	return data.reduce((acc, [Xi, Yi]) => acc + (Yi - Xi) ** 2, 0)
}

/**
 * Calculate the sum of the products (covariance times sample size)
 *
 * 计算积和 (协方差乘样本量)
 * @param data data to be calculated
 * @returns sum of the products
 * @example
 * ```typescript
 * import { sp } from '@leaf/psych-lib'
 * sp([[3, 2], [2, -1], [1, 5]]) // -3
 * ```
 */
export function sp(data: [number, number][]): number {
	const m = [mean(data.map(([Xi]) => Xi)), mean(data.map(([, Yi]) => Yi))]
	return data.reduce((acc, [Xi, Yi]) => acc + (Xi - m[0]) * (Yi - m[1]), 0)
}

/**
 * Calculate the covariance
 *
 * 计算协方差
 * @param data data to be calculated
 * @returns covariance
 * @example
 * ```typescript
 * import { cov } from '@leaf/psych-lib'
 * cov([[3, 2], [2, -1], [1, 5]]) // -1
 * ```
 */
export function cov(data: [number, number][]): number {
	return sp(data) / data.length
}
