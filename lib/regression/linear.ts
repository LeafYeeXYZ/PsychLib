import { corr, mean, sp, ss, ssDiff, std } from '../base.ts'
import { f2p, t2p } from '../distribution/index.ts'

/**
 * One-variable linear regression
 *
 * 一元线性回归
 */
export class LinearRegressionOne {
  /**
   * One-variable linear regression
   *
   * 一元线性回归
   * @param x independent variable
   * @param y dependent variable
   * @throws {Error} The x and y data of linear regression must be equal
   * @example
   * ```typescript
   * import { LinearRegressionOne } from '@psych/lib'
   * const x = [1, 2, 3, 4, 5]
   * const y = [2, 3, 4, 5, 6]
   * const lr = new LinearRegressionOne(x, y)
   * console.log(lr.b0, lr.b1)
   * console.log(lr.calc(6))
   * ```
   */
  constructor(x: number[], y: number[]) {
    if (x.length !== y.length) {
      throw new Error('The x and y data of linear regression must be equal')
    }
    this.xMean = mean(x)
    this.yMean = mean(y)
    this.SSx = ss(x, this.xMean)
    this.SSy = ss(y, this.yMean)
    this.xStd = std(x, true, this.xMean)
    this.yStd = std(y, true, this.yMean)
    this.dfE = x.length - 2
    this.dfT = x.length - 1
    this.b1 = corr(x, y, [this.xMean, this.yMean]) * this.yStd / this.xStd
    this.b0 = this.yMean - this.b1 * this.xMean
    this.SSt = this.SSy
    const predict = x.map((Xi) => this.calc(Xi))
    this.SSr = ssDiff(predict, new Array(x.length).fill(this.yMean))
    this.SSe = ssDiff(y, predict)
    this.r2 = this.SSr / this.SSt
    this.F = (this.SSr / this.dfR) / (this.SSe / this.dfE)
    this.t = Math.sqrt(Math.abs(this.F))
    this.p = f2p(this.F, this.dfR, this.dfE, false)
    this.SEb1 = Math.sqrt(this.SSe / (this.dfE * this.SSx))
  }
  /**
   * Standard error of the estimate of the regression coefficient b1
   *
   * SEb1 (b1 的估计标准误)
   */
  SEb1: number
  /**
   * SSx (sum of squares of x)
   *
   * SSx
   */
  SSx: number
  /**
   * SSy (sum of squares of y)
   *
   * SSy
   */
  SSy: number
  /**
   * Calculate the predicted value of y for the given x
   *
   * 计算给定 x 的 y 预测值
   * @param x x value
   * @returns y value
   */
  calc(x: number): number {
    return this.b0 + this.b1 * x
  }
  /**
   * Intercept
   *
   * 截距项
   */
  b0: number
  /**
   * Slope
   *
   * 斜率
   */
  b1: number
  /**
   * x mean
   *
   * x 均值
   */
  xMean: number
  /**
   * y mean
   *
   * y 均值
   */
  yMean: number
  /**
   * x standard deviation
   *
   * x 标准差
   */
  xStd: number
  /**
   * y standard deviation
   *
   * y 标准差
   */
  yStd: number
  /**
   * F statistic
   *
   * F 统计量
   */
  F: number
  /**
   * t statistic
   *
   * t 统计量
   */
  t: number
  /**
   * Significance
   *
   * 显著性
   */
  p: number
  /**
   * Determination coefficient
   *
   * 测定系数
   */
  r2: number
  /**
   * Regression degrees of freedom
   *
   * 回归自由度 (F 分布的分子自由度)
   */
  dfR: number = 1
  /**
   * Residual degrees of freedom
   *
   * 残差自由度 (F 分布的分母自由度)
   */
  dfE: number
  /**
   * Total degrees of freedom
   *
   * 总自由度
   */
  dfT: number
  /**
   * Total variation sum of squares
   *
   * 总变异平方和 (SST)
   */
  SSt: number
  /**
   * Regression sum of squares
   *
   * 回归平方和 (SSR)
   */
  SSr: number
  /**
   * Residual sum of squares
   *
   * 残差平方和 (SSE)
   */
  SSe: number
}

/**
 * Two-variable linear regression
 *
 * 二元线性回归
 */
export class LinearRegressionTwo {
  /**
   * Two-variable linear regression
   *
   * 二元线性回归
   * @param x1 first independent variable
   * @param x2 second independent variable
   * @param y dependent variable
   * @param type use Standard Regression or Sequential Regression
   * @throws {TypeError} The x and y data of linear regression must be equal
   * @example
   * ```typescript
   * import { LinearRegressionTwoStd } from '@psych/lib'
   * const x1 = [1, 2, 3, 4, 10]
   * const x2 = [1, 3, 5, 7, 9]
   * const y = [6, 14, 22, 30, 48]
   * const lr = new LinearRegressionTwo(x1, x2, y)
   * console.log(lr.b0, lr.b1, lr.b2)
   * console.log(lr.calc(6, 7))
   * ```
   */
  constructor(
    x1: number[],
    x2: number[],
    y: number[],
    type: 'standard' | 'sequential' = 'standard',
  ) {
    if (x1.length !== x2.length || x1.length !== y.length) {
      throw new TypeError('The x and y data of linear regression must be equal')
    }
    // 基础
    this.dfE = x1.length - 1 - this.dfR
    this.dfT = x1.length - 1
    this.x1Mean = mean(x1)
    this.x2Mean = mean(x2)
    this.yMean = mean(y)
    this.x1Std = std(x1, true, this.x1Mean)
    this.x2Std = std(x2, true, this.x2Mean)
    this.yStd = std(y, true, this.yMean)
    this.rYX1 = corr(y, x1, [this.yMean, this.x1Mean])
    this.rYX2 = corr(y, x2, [this.yMean, this.x2Mean])
    this.rX1X2 = corr(x1, x2, [this.x1Mean, this.x2Mean])
    this.prYX1 = (this.rYX1 - this.rYX2 * this.rX1X2) /
      (Math.sqrt(1 - this.rYX2 ** 2) *
        Math.sqrt(1 - this.rX1X2 ** 2))
    this.prYX2 = (this.rYX2 - this.rYX1 * this.rX1X2) /
      (Math.sqrt(1 - this.rYX1 ** 2) *
        Math.sqrt(1 - this.rX1X2 ** 2))
    this.prX1X2 = (this.rX1X2 - this.rYX1 * this.rYX2) /
      (Math.sqrt(1 - this.rYX1 ** 2) *
        Math.sqrt(1 - this.rYX2 ** 2))
    // 计算单元
    this.SSx1 = ss(x1, this.x1Mean)
    this.SSx2 = ss(x2, this.x2Mean)
    this.SSy = ss(y, this.yMean)
    this.SPx1x2 = sp(x1, x2, [this.x1Mean, this.x2Mean])
    this.SPx1y = sp(x1, y, [this.x1Mean, this.yMean])
    this.SPx2y = sp(x2, y, [this.x2Mean, this.yMean])
    const one = new LinearRegressionOne(x1, y)
    // 回归系数
    if (type === 'standard') {
      this.b1 = (this.SPx1y * this.SSx2 - this.SPx2y * this.SPx1x2) /
        (this.SSx1 * this.SSx2 - this.SPx1x2 ** 2)
      this.b2 = (this.SPx2y * this.SSx1 - this.SPx1y * this.SPx1x2) /
        (this.SSx1 * this.SSx2 - this.SPx1x2 ** 2)
      this.b0 = this.yMean - this.b1 * this.x1Mean - this.b2 * this.x2Mean
    } else {
      this.b1 = one.b1
      this.b2 = (this.SPx2y * this.SSx1 - this.SPx1y * this.SPx1x2) /
        (this.SSx1 * this.SSx2 - this.SPx1x2 ** 2)
      this.b0 = this.yMean - this.b1 * this.x1Mean - this.b2 * this.x2Mean
    }
    // 统计量
    this.SSt = this.SSy
    const predict = y.map((_, i) => this.calc(x1[i], x2[i]))
    this.SSr = ssDiff(predict, new Array(y.length).fill(this.yMean))
    this.SSe = ssDiff(y, predict)
    this.r2 = this.SSr / this.SSt
    this.r2adj = 1 - (this.dfT / this.dfE) * (1 - this.r2)
    this.F = (this.SSr / this.dfR) / (this.SSe / this.dfE)
    this.p = f2p(this.F, this.dfR, this.dfE, false)

    if (type === 'standard') {
      this.SEb1 = Math.sqrt(this.SSe / (this.dfE * this.SSx1))
      this.SEb2 = Math.sqrt(this.SSe / (this.dfE * this.SSx2))
      const df = this.dfE
      this.b1t = this.b1 / this.SEb1
      this.b1p = t2p(this.b1t, df)
      this.b2t = this.b2 / this.SEb2
      this.b2p = t2p(this.b2t, df)
    } else {
      this.b1F = one.F
      this.b1p = one.p
      this.b2F = (this.r2 - one.r2) / ((1 - this.r2) / this.dfE)
      this.b2p = f2p(Math.abs(this.b2F), this.dfR, this.dfE, false)
    }
  }
  /**
   * Standard error of the estimate of the regression coefficient b1
   *
   * SEb1 (b1 的估计标准误)
   */
  SEb1?: number
  /**
   * Standard error of the estimate of the regression coefficient b2
   *
   * SEb2 (b2 的估计标准误)
   */
  SEb2?: number
  /**
   * Calculate the predicted value of y for the given x1, x2
   *
   * 计算给定 x1, x2 的 y 预测值
   * @param x1 first independent variable
   * @param x2 second independent variable
   * @returns y value
   */
  calc(x1: number, x2: number): number {
    return this.b0 + this.b1 * x1 + this.b2 * x2
  }
  /**
   * Intercept
   *
   * 截距项
   */
  b0: number
  /**
   * Slope of x1 (controlling x2 if it is a standard regression) or x1's regression coefficient (if it is a sequential regression)
   *
   * x1 的偏回归系数 (如果是标准回归) 或者 x1 的回归系数 (如果是序列回归)
   */
  b1: number
  /**
   * Slope of x2
   *
   * x2 的偏回归系数
   */
  b2: number
  /**
   * x1 mean
   *
   * x1 均值
   */
  x1Mean: number
  /**
   * x2 mean
   *
   * x2 均值
   */
  x2Mean: number
  /**
   * y mean
   *
   * y 均值
   */
  yMean: number
  /**
   * x1 standard deviation
   *
   * x1 标准差
   */
  x1Std: number
  /**
   * x2 standard deviation
   *
   * x2 标准差
   */
  x2Std: number
  /**
   * y standard deviation
   *
   * y 标准差
   */
  yStd: number
  /**
   * Correlation coefficient between x1 and y
   *
   * x1 和 y 之间的相关系数
   */
  rYX1: number
  /**
   * Correlation coefficient between x2 and y
   *
   * x2 和 y 之间的相关系数
   */
  rYX2: number
  /**
   * Correlation coefficient between x1 and x2
   *
   * x1 和 x2 之间的相关系数
   */
  rX1X2: number
  /**
   * Partial correlation coefficient between x1 and y controlling x2
   *
   * 控制 x2 后 x1 和 y 之间的偏相关系数
   */
  prYX1: number
  /**
   * Partial correlation coefficient between x2 and y controlling x1
   *
   * 控制 x1 后 x2 和 y 之间的偏相关系数
   */
  prYX2: number
  /**
   * Partial correlation coefficient between x1 and x2 controlling y
   *
   * 控制 y 后 x1 和 x2 之间的偏相关系数
   */
  prX1X2: number
  /**
   * SSx1
   *
   * SSx1
   */
  SSx1: number
  /**
   * SSx2
   *
   * SSx2
   */
  SSx2: number
  /**
   * SSy
   *
   * SSy
   */
  SSy: number
  /**
   * SPx1x2
   *
   * SPx1x2
   */
  SPx1x2: number
  /**
   * SPx1y
   *
   * SPx1y
   */
  SPx1y: number
  /**
   * SPx2y
   *
   * SPx2y
   */
  SPx2y: number
  /**
   * F statistic
   *
   * F 统计量
   */
  F: number
  /**
   * Significance
   *
   * 显著性
   */
  p: number
  /**
   * Determination coefficient
   *
   * 测定系数
   */
  r2: number
  /**
   * Adjusted determination coefficient
   *
   * 调整后的测定系数
   */
  r2adj: number
  /**
   * Regression degrees of freedom
   *
   * 回归自由度 (F 分布的分子自由度)
   */
  dfR: number = 2
  /**
   * Residual degrees of freedom
   *
   * 残差自由度 (F 分布的分母自由度)
   */
  dfE: number
  /**
   * Total degrees of freedom
   *
   * 总自由度
   */
  dfT: number
  /**
   * Total variation sum of squares
   *
   * 总变异平方和 (SST)
   */
  SSt: number
  /**
   * Regression sum of squares
   *
   * 回归平方和 (SSR)
   */
  SSr: number
  /**
   * Residual sum of squares
   *
   * 残差平方和 (SSE)
   */
  SSe: number
  /**
   * b1 t statistic
   *
   * b1 t 统计量
   */
  b1t?: number
  /**
   * b1 F statistic
   *
   * b1 F 统计量
   */
  b1F?: number
  /**
   * b1 significance
   *
   * b1 显著性
   */
  b1p: number
  /**
   * b2 t statistic
   *
   * b2 t 统计量
   */
  b2t?: number
  /**
   * b2 F statistic
   *
   * b2 F 统计量
   */
  b2F?: number
  /**
   * b2 significance
   *
   * b2 显著性
   */
  b2p: number
}
