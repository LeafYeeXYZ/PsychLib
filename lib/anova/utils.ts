import { ibeta } from '../distribution/utils.ts'

/**
 * Calculate Turkey post hoc test q statistic significance  
 * Using Lund's approximation
 * 
 * 计算 Turkey 事后检验中 q 统计量的显著性  
 * 使用 Lund's approximation
 * @param q Q statistic
 * @param k groups count
 * @param df degrees of freedom
 */
export function getQProb(q: number, k: number, df: number): number {
  if (q <= 0) return 1
  if (df < 2) return NaN
  // Lund's approximation
  const r = q / Math.sqrt(2)
  const f1 = 2 * k * (k - 1)
  const f2 = df - k + 1
  const f = f1 * ibeta(
    f2 / (f2 + f1 * r * r),
    f2 / 2,
    k - 1
  )
  return 1 - f
}
