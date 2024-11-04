import { mean, std } from '../base.ts'
import { p2t, t2p } from '../distribution/index.ts'

/**
 * Peer sample Student's t-test
 *
 * 配对样本 t 检验
 * @param a numbers array a
 * @param b numbers array b
 * @param twoside two side or not (default is true)
 * @param mu population mean difference (default is 0)
 * @param alpha significance level (default is 0.05) (only for confidence interval)
 * @returns t test result
 * @example
 * ```typescript
 * import { PeerSampleTTest } from '@psych/lib'
 * const a = [1, 2, 3, 4, 5]
 * const b = [6, 7, 8, 9, 10]
 * const ttest = new PeerSampleTTest(a, b)
 * console.log(ttest.p, ttest.t)
 * ```
 * @throws {Error} length of a and b should be equal
 */
export class PeerSampleTTest {
  constructor(
    a: number[],
    b: number[],
    twoside: boolean = true,
    mu: number = 0,
    alpha: number = 0.05,
  ) {
    const n = a.length
    if (n !== b.length) {
      throw new Error('length of a and b should be equal')
    }
    this.alpha = alpha
    this.twoside = twoside
    this.mu = mu
    this.df = a.length - 1
    const diff: number[] = []
    for (let i = 0; i < n; i++) {
      diff.push(a[i] - b[i])
    }
    this.meanA = mean(a)
    this.meanB = mean(b)
    this.meanDiff = mean(diff)
    this.stdA = std(a, true, this.meanA)
    this.stdB = std(b, true, this.meanB)
    this.stdDiff = std(diff, true, this.meanDiff)
    this.sem = this.stdDiff / Math.sqrt(n)
    this.t = (this.meanDiff - this.mu) / this.sem
    this.p = t2p(this.t, this.df, this.twoside)
    this.cohenD = (this.meanDiff - this.mu) / this.stdDiff
    this.r2 = (this.t ** 2) / (this.t ** 2 + this.df)
    const ciT = p2t(this.alpha, this.df)
    this.ci = [this.meanDiff - ciT * this.sem, this.meanDiff + ciT * this.sem]
  }
  /**
   * Confidence interval (for given alpha)
   *
   * 置信区间 (给定显著性水平)
   */
  ci: [number, number]
  /**
   * alpha significance level
   *
   * 显著性水平
   */
  alpha: number
  /**
   * coefficient of determination (R^2)
   *
   * 测定系数 (R^2)
   */
  r2: number
  /**
   * Population mean difference
   *
   * 总体均值差异
   */
  mu: number
  /**
   * Two side or not
   *
   * 是否双侧检验
   */
  twoside: boolean
  /**
   * Sample mean a
   *
   * 样本均值 a
   */
  meanA: number
  /**
   * Sample mean b
   *
   * 样本均值 b
   */
  meanB: number
  /**
   * Mean of difference
   *
   * 差异的均值
   */
  meanDiff: number
  /**
   * Sample standard deviation a
   *
   * 样本标准差 a
   */
  stdA: number
  /**
   * Sample standard deviation b
   *
   * 样本标准差 b
   */
  stdB: number
  /**
   * Sample standard deviation of difference
   *
   * 差异的标准差
   */
  stdDiff: number
  /**
   * Degree of freedom
   *
   * 自由度
   */
  df: number
  /**
   * Standard error of the mean difference
   *
   * 标准误
   */
  sem: number
  /**
   * t value
   *
   * t 值
   */
  t: number
  /**
   * p value
   *
   * 显著性水平
   */
  p: number
  /**
   * Cohen's d
   *
   * 效应量 Cohen's d
   */
  cohenD: number
}
