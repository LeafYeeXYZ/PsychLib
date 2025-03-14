import { centralF } from 'npm:jstat-esm@2.0.2'
import { ibeta } from './utils.ts'

/**
 * F distribution f value to p value
 * P value is the probability of f value to the right tail if twoside is false
 * otherwise, it is the number above times 2
 *
 * f 分布的 f 值转 p 值
 * 如果是单尾检验，p 值是 f 值右尾的概率
 * 如果是双尾检验，p 值是 f 值右尾概率的两倍
 * @param f f value
 * @param df1 degree of freedom 1
 * @param df2 degree of freedom 2
 * @param twoside two side or not (default is false)
 * @returns p value
 * @throws {Error} df1 must be greater than 0
 * @throws {Error} df2 must be greater than 0
 * @throws {Error} f must be greater than or equal to 0
 */
export function f2p(
	f: number,
	df1: number,
	df2: number,
	twoside = false,
): number {
	if (df1 <= 0) {
		throw new Error('df1 must be greater than 0')
	}
	if (df2 <= 0) {
		throw new Error('df2 must be greater than 0')
	}
	if (f < 0) {
		throw new Error('f must be greater than or equal to 0')
	}
	if (f === 0) return 1
	if (f === Number.POSITIVE_INFINITY) return 0
	const x: number = df2 / (df2 + df1 * f)
	const p: number = ibeta(x, df2 / 2, df1 / 2)
	return twoside ? 2 * Math.min(p, 1 - p) : p
}

/**
 * F distribution p value to f value
 * P value is the probability of f value to the right tail if twoside is false
 * otherwise, it is the number above times 2
 *
 * f 分布的 p 值转 f 值
 * 如果是单尾检验，p 值是 f 值右尾的概率
 * 如果是双尾检验，p 值是 f 值右尾概率的两倍
 * @param p p value
 * @param df1 degree of freedom 1
 * @param df2 degree of freedom 2
 * @param twoside two side or not (default is false)
 * @returns f value
 * @throws {Error} df1 must be greater than 0
 * @throws {Error} df2 must be greater than 0
 */
export function p2f(
	p: number,
	df1: number,
	df2: number,
	twoside = false,
): number {
	// 参数验证
	if (df1 <= 0) {
		throw new Error('df1 must be greater than 0')
	}
	if (df2 <= 0) {
		throw new Error('df2 must be greater than 0')
	}
	// 特殊值快速处理
	if (p === 1) return 0
	if (p === 0) return Number.POSITIVE_INFINITY
	// 调整p值(单侧转换)
	const _p = twoside ? p / 2 : p
	return centralF.inv(1 - _p, df1, df2)
}

/**
 * Generate a random number from a f distribution
 *
 * 从 f 分布中生成一个随机数
 * @param df1 degree of freedom 1
 * @param df2 degree of freedom 2
 * @returns random number from a f distribution
 */
export function randomF(df1: number, df2: number): number {
	return centralF.sample(df1, df2)
}
