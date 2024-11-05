import { lowRegGamma } from './utils.ts'
import { p2z } from './z.ts'

/**
 * Chi-square distribution chi-square value to p value
 * The probability is from chi-square value to the right tail
 *
 * 把卡方分布的卡方值转换为显著性概率值 p
 * p 值表示卡方值右尾的概率
 * @param c chi-square value
 * @param df degree of freedom
 * @returns p value
 * @throws {Error} degree of freedom must be greater than or equal to 1
 * @throws {Error} chi-square value must be greater than or equal to 0
 */
export function c2p(c: number, df: number): number {
  if (df < 1) {
    throw new Error('degree of freedom must be greater than 0')
  }
  if (c < 0) {
    throw new Error('chi-square value must be greater than or equal to 0')
  }
  if (c === 0) return 1
  if (c === Infinity) return 0
  return 1 - lowRegGamma(df / 2, c / 2)
}

/**
 * Chi-square distribution p value to chi-square value
 * The probability is from chi-square value to the right tail
 *
 * 把卡方分布的显著性概率值 p 转换为卡方值
 * p 值表示卡方值右尾的概率
 * @param p p value
 * @param df degree of freedom
 * @param precision precision (default is 1e-4) (Note: too small precision may cause VERY slow calculation)
 * @returns chi-square value
 * @throws {Error} degree of freedom must be greater than or equal to 1
 * @throws {Error} p value must be between 0 and 1
 */
export function p2c(
  p: number,
  df: number,
  precision: number = 1e-4,
): number {
  if (df < 1) {
    throw new Error('degree of freedom must be greater than 0')
  }
  if (p < 0 || p > 1) {
    throw new Error('p value must be between 0 and 1')
  }
  if (p === 0) return Infinity
  if (p === 1) return 0
  const z = p2z(1 - p)
  const a = 2 / (9 * df)
  const b = 1 - a + z * Math.sqrt(a)
  let c = df * (b ** 3)
  let _p = c2p(c, df)
  while (Math.abs(_p - p) > precision) {
    if (_p < p) {
      c -= precision
    } else {
      c += precision
    }
    _p = c2p(c, df)
  }
  return c
}
