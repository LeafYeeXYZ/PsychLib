/**
 * Convert p value to z value (the z value from the left tail to p)
 *
 * 把标准正态分布的累积概率值 p 转换为 z 值
 * @param p p value
 * @returns z value
 * @throws {Error} p must be between 0 and 1
 */
export function p2z(p: number): number {
	if (p < 0 || p > 1) {
		throw new Error('p must be between 0 and 1')
	}
	if (p === 0) {
		return Number.NEGATIVE_INFINITY
	}
	if (p === 1) {
		return Number.POSITIVE_INFINITY
	}
	// Coefficients for the approximation
	const a1 = -3.969683028665376e1
	const a2 = 2.209460984245205e2
	const a3 = -2.759285104469687e2
	const a4 = 1.38357751867269e2
	const a5 = -3.066479806614716e1
	const a6 = 2.506628277459239
	const b1 = -5.447609879822406e1
	const b2 = 1.615858368580409e2
	const b3 = -1.556989798598866e2
	const b4 = 6.680131188771972e1
	const b5 = -1.328068155288572e1
	const c1 = -7.784894002430293e-3
	const c2 = -3.223964580411365e-1
	const c3 = -2.400758277161838
	const c4 = -2.549732539343734
	const c5 = 4.374664141464968
	const c6 = 2.938163982698783
	const d1 = 7.784695709041462e-3
	const d2 = 3.224671290700398e-1
	const d3 = 2.445134137142996
	const d4 = 3.754408661907416
	// Define break-points
	const pLow: number = 0.02425
	const pHigh: number = 1 - pLow
	let q: number
	let r: number
	if (p < pLow) {
		// Rational approximation for lower region
		q = Math.sqrt(-2 * Math.log(p))
		return (
			(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
			((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
		)
	}
	if (p <= pHigh) {
		// Rational approximation for central region
		q = p - 0.5
		r = q * q
		return (
			((((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q) /
			(((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1)
		)
	}
	// Rational approximation for upper region
	q = Math.sqrt(-2 * Math.log(1 - p))
	return (
		-(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
		((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
	)
}

/**
 * Convert z value to p value (the probability from the left tail to z)
 *
 * 把标准正态分布的 z 值转换为累积概率值 p
 * @param z z value
 * @returns p value
 */
export function z2p(z: number): number {
	if (z === Number.POSITIVE_INFINITY) {
		return 1
	}
	if (z === Number.NEGATIVE_INFINITY) {
		return 0
	}
	const p = 0.3275911
	const a1 = 0.254829592
	const a2 = -0.284496736
	const a3 = 1.421413741
	const a4 = -1.453152027
	const a5 = 1.061405429
	const sign = z < 0 ? -1 : 1
	const absZ = Math.abs(z) / Math.sqrt(2.0)
	const t = 1.0 / (1.0 + p * absZ)
	const erf =
		1 -
		((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absZ * absZ)
	return 0.5 * (1 + sign * erf)
}

/**
 * Generate a random number from a normal distribution
 *
 * 从正态分布中生成一个随机数
 * @param mean mean value (default: 0)
 * @param std standard deviation (default: 1)
 * @returns random number from a normal distribution
 */
export function randomNormal(mean = 0, std = 1): number {
	return mean + Math.abs(std) * p2z(Math.random())
}
