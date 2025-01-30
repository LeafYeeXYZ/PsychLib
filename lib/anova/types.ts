/**
 * ANOVA Post Hoc Test Result (Bonferroni)
 *
 * 方差分析事后检验结果 (Bonferroni)
 */
export type BonferroniResult = {
  /**
   * Significance level critical value (control total type I error rate to 0.05)
   *
   * 显著性水平临界值 (控制总一类错误率为 0.05)
   */
  sig: number
  /**
   * Group A
   *
   * A组
   */
  groupA: string | number
  /**
   * Group B
   *
   * B组
   */
  groupB: string | number
  /**
   * Difference of mean
   *
   * 均值差异
   */
  diff: number
  /**
   * t value
   *
   * t值
   */
  t: number
  /**
   * p value
   *
   * p值
   */
  p: number
}

/**
 * ANOVA Post Hoc Test Result (Scheffe)
 *
 * 方差分析事后检验结果 (Scheffe)
 */
export type ScheffeResult = {
  /**
   * Group A
   *
   * A组
   */
  groupA: string | number
  /**
   * Group B
   *
   * B组
   */
  groupB: string | number
  /**
   * Difference of mean
   *
   * 均值差异
   */
  diff: number
  /**
   * F value
   *
   * F值
   */
  f: number
  /**
   * p value
   *
   * p值
   */
  p: number
}

/**
 * ANOVA Post Hoc Test Result (Tukey's HSD)
 *
 * 方差分析事后检验结果 (Tukey's HSD)
 */
export type TukeyResult = {
  /**
   * Group A
   *
   * A组
   */
  groupA: string | number
  /**
   * Group B
   *
   * B组
   */
  groupB: string | number
  /**
   * Difference of mean
   *
   * 均值差异
   */
  diff: number
  /**
   * Tukey's HSD
   *
   * HSD 值
   */
  HSD: number
  /**
   * q value
   *
   * q值
   */
  q: number
  /**
   * p value
   *
   * p值
   */
  p: number
}
