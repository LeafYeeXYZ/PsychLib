import { ibeta } from './utils.ts'
import { studentt } from 'npm:jstat-esm@2.0.2'

/**
 * Student's t-distribution t value to p value
 * P value is the probability of the |t| to the right tail if twoside is false
 * otherwise, P value is the probability of the -|t| to the left tail and |t| to the right tail
 *
 * 把 t 分布的 t 值转换为显著性概率值 p
 * 即如果是单侧检验，p 值表示 |t| 的右尾概率
 * 如果是双侧检验，p 值表示 -|t| 的左尾概率和 |t| 的右尾概率
 * @param t t value
 * @param df degree of freedom
 * @param twoside two side or not (default is true)
 * @returns p value
 * @throws {Error} degree of freedom must be greater than 0
 */
export function t2p(t: number, df: number, twoside: boolean = true): number {
  if (df <= 0) {
    throw new Error('degree of freedom must be greater than 0')
  }
  const x: number = Math.abs(t)
  if (x === Infinity) return 0
  if (x === 0 && twoside) return 1
  if (x === 0 && !twoside) return 0.5
  const p: number = ibeta(
    (x + Math.sqrt(x * x + df)) / (2 * Math.sqrt(x * x + df)),
    df / 2,
    df / 2,
  )
  return twoside ? 2 * (1 - p) : 1 - p
}

/**
 * Student's t-distribution p value to t value
 * P value means the probability of the |t| to the right tail if twoside is false
 * otherwise, P value means the probability of the -|t| to the left tail and |t| to the right tail
 *
 * 把 t 分布的显著性概率值 p 转换为 t 值
 * 即如果是单侧检验，p 值表示 |t| 的右尾概率
 * 如果是双侧检验，p 值表示 -|t| 的左尾概率和 |t| 的右尾概率
 * @param p p value
 * @param df degree of freedom
 * @param twoside two side or not (default is true)
 * @returns t value
 * @throws {Error} degree of freedom must be greater than 0
 */
export function p2t(
  p: number,
  df: number,
  twoside: boolean = true,
): number {
  if (df <= 0) throw new Error('degree of freedom must be greater than 0')
  if (p === 0.5 && twoside) return 0
  if (p === 1) return 0
  if (p === 0) return Infinity
  // 调整p值(单侧转换)
  const _p = twoside ? p / 2 : p
  return studentt.inv(1 - _p, df)
}

/**
 * Generate a random number from a t distribution
 * 
 * 从 t 分布中生成一个随机数
 * @param df degree of freedom
 * @returns random number from a t distribution
 */
export function randomT(df: number): number {
  return studentt.sample(df)
}
