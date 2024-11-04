import { mean, std } from '../base.ts'
import { p2t, t2p } from '../distribution/index.ts'

/**
 * One sample Student's t-test
 *
 * 单样本 t 检验
 * @param data numbers
 * @param mu population mean
 * @param twoside two side or not (default is true)
 * @param alpha significance level (default is 0.05) (only for confidence interval)
 * @returns t test result
 * @example
 * ```typescript
 * import { OneSampleTTest } from '@psych/lib'
 * const data = [1, 2, 3, 4, 5]
 * const mu = 3
 * const ttest = new OneSampleTTest(data, mu)
 * console.log(ttest.p, ttest.t)
 * ```
 */
export class OneSampleTTest {
  constructor(
    data: number[],
    mu: number,
    twoside: boolean = true,
    alpha: number = 0.05,
  ) {
    const n = data.length
    this.alpha = alpha
    this.mu = mu
    this.twoside = twoside
    this.mean = mean(data)
    this.std = std(data, true, this.mean)
    this.sem = this.std / Math.sqrt(n)
    this.df = n - 1
    this.t = (this.mean - this.mu) / this.sem
    this.p = t2p(this.t, this.df, this.twoside)
    this.cohenD = (this.mean - this.mu) / this.std
    this.r2 = (this.t ** 2) / (this.t ** 2 + this.df)
    const ciT = p2t(this.alpha, this.df)
    this.ci = [this.mean - ciT * this.sem, this.mean + ciT * this.sem]
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
   * Two side or not
   *
   * 是否双侧检验
   */
  twoside: boolean
  /**
   * Population mean
   *
   * 总体均值/检验均值
   */
  mu: number
  /**
   * Sample mean
   *
   * 样本均值
   */
  mean: number
  /**
   * Sample standard deviation
   *
   * 样本标准差
   */
  std: number
  /**
   * Standard error of the mean
   *
   * 标准误
   */
  sem: number
  /**
   * Degree of freedom
   *
   * 自由度
   */
  df: number
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
