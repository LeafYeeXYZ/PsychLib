import { ibeta } from './utils.ts'

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
 * @param precision precision (default is 1e-8)
 * @returns t value
 * @throws {Error} degree of freedom must be greater than 0
 */
export function p2t(
  p: number,
  df: number,
  twoside: boolean = true,
  precision: number = 1e-8,
): number {
  if (df <= 0) throw new Error('degree of freedom must be greater than 0')
  if (p === 0.5 && twoside) return 0
  if (p === 1) return 0
  if (p === 0) return Infinity
  // 调整p值(单侧转换)
  const _p = twoside ? p / 2 : p
  // 初始搜索范围
  const maxIter = 100
  let min = 0
  let max = 1000
  let mid: number
  let pval: number
  // 扩展搜索范围直到找到合适的区间
  while (t2p(max, df, false) > _p) {
    min = max
    max *= 2
  }
  // 二分查找
  for (let i = 0; i < maxIter; i++) { // 最大迭代次数限制
    mid = (min + max) / 2
    pval = t2p(mid, df, false)
    if (Math.abs(pval - _p) < precision) {
      return mid
    }
    if (pval > _p) {
      min = mid
    } else {
      max = mid
    }
    // 额外的收敛检查
    if (Math.abs(max - min) < precision) {
      return (max + min) / 2
    }
  }
  return (max + min) / 2
}
