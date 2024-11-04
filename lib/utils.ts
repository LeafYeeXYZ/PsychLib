import { kurtosis, skewness } from './base.ts'
import { z2p } from './distribution/index.ts'

/**
 * Calculate the sample kurtosis and its z value and significance
 *
 * 计算样本峰度及其 z 值和显著性
 * @param data data to be calculated
 * @returns kurtosis, z value, and significance
 * @throws {Error} the length of data must be greater than 3
 * @example
 * ```typescript
 * import { kurtosis } from '@psych/lib'
 * kurtosis([5, 5, 6, 8, 5])
 * ```
 */
export function kurtosisTest(data: number[]): {
  kurtosis: number
  z: number
  p: number
} {
  const n = data.length
  if (n < 4) {
    throw new Error('the length of data must be greater than 3')
  }
  const k = kurtosis(data)
  const z = k / Math.sqrt(24 / n)
  const p = (1 - z2p(Math.abs(z))) * 2
  return { kurtosis: k, z, p }
}

/**
 * Calculate the sample skewness and its z value and significance
 *
 * 计算样本偏度及其 z 值和显著性
 * @param data data to be calculated
 * @returns skewness, z value, and significance
 * @throws {Error} the length of data must be greater than 3
 * @example
 * ```typescript
 * import { skewness } from '@psych/lib'
 * skewness([1, 2, 3, 4, 5])
 * ```
 */
export function skewnessTest(data: number[]): {
  skewness: number
  z: number
  p: number
} {
  const n = data.length
  if (n < 4) {
    throw new Error('the length of data must be greater than 3')
  }
  const s = skewness(data)
  const z = s / Math.sqrt(6 / n)
  const p = (1 - z2p(Math.abs(z))) * 2
  return { skewness: s, z, p }
}
