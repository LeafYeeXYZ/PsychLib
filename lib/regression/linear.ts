import { corr, mean, sp, ss, ssDiff, std, Matrix } from '../base.ts'
import { f2p, t2p } from '../distribution/index.ts'

/**
 * Multiple independent variables linear regression (Standard Regression)
 * 
 * 多元线性回归 (标准多元回归)
 */
export class LinearRegression {
  /**
   * Multiple independent variables linear regression (Standard Regression)
   * 
   * 多元线性回归 (标准多元回归)
   * @param iv independent variables
   * @param dv dependent variable
   * @throws {TypeError} At least one independent variable is required
   * @throws {TypeError} The x and y data of linear regression must be equal
   * @throws {TypeError} The dimension of independent variables must be equal
   * @throws {TypeError} The number of data points should be greater than the number of independent variables
   * @example
   * ```typescript
   * import { LinearRegression } from '@psych/lib'
   * const iv = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
   * const dv = [10, 20, 30, 40, 50]
   * const lr = new LinearRegression(iv, dv)
   * console.log(lr.coefficients)
   * console.log(lr.calc([6, 7]))
   * ```
   */
  constructor(
    iv: number[][], 
    dv: number[],
  ) {
    const n = dv.length
    if (iv.length !== n) {
      throw new TypeError('The x and y data of linear regression must be equal')
    }
    const k = iv[0].length
    if (k === 0) {
      throw new TypeError('At least one independent variable is required')
    }
    if (!iv.every((v) => v.length === k)) {
      throw new TypeError('The dimension of independent variables must be equal')
    }
    if (n <= k) {
      throw new TypeError('The number of data points should be greater than the number of independent variables')
    }
    this.#dv = dv
    this.#iv = new Matrix(iv)
    this.#n = n
    this.#k = k
    
    // 计算平均值和标准差
    this.dvMean = mean(dv)
    this.dvStd = std(dv, true, this.dvMean)
    this.ivMeans = Array(k).fill(0).map((_, i) => 
      mean(iv.map(row => row[i]))
    )
    this.ivStds = Array(k).fill(0).map((_, i) => 
      std(iv.map(row => row[i]), true, this.ivMeans[i])
    )
    
    // 执行回归计算
    this.#fitRegression()
  }
  
  /**
   * Independent variables
   * 
   * 自变量
   */
  get iv(): number[][] {
    return this.#iv.data
  }
  
  /**
   * Dependent variable
   *
   * 因变量
   */
  get dv(): number[] {
    return this.#dv
  }
  
  /**
   * Independent variables matrix
   *
   * 自变量矩阵
   */
  #iv: Matrix

  /**
   * Dependent variable
   *
   * 因变量
   */
  #dv: number[]
  
  /**
   * Number of observations
   * 
   * 观测数
   */
  #n: number
  
  /**
   * Number of independent variables
   * 
   * 自变量数量
   */
  #k: number
  
  /**
   * Mean of dependent variable
   * 
   * 因变量均值
   */
  dvMean: number
  
  /**
   * Standard deviation of dependent variable
   * 
   * 因变量标准差
   */
  dvStd: number
  
  /**
   * Means of independent variables
   * 
   * 自变量均值
   */
  ivMeans: number[]
  
  /**
   * Standard deviations of independent variables
   * 
   * 自变量标准差
   */
  ivStds: number[]
  
  /**
   * Regression coefficients [b0, b1, b2, ...]
   * 
   * 回归系数 [b0, b1, b2, ...]
   */
  coefficients: number[] = []
  
  /**
   * Standard errors of regression coefficients
   * 
   * 回归系数的标准误
   */
  standardErrors: number[] = []
  
  /**
   * t-statistics for each coefficient
   * 
   * 每个系数的 t 统计量
   */
  tValues: number[] = []
  
  /**
   * p-values for each coefficient
   * 
   * 每个系数的 p 值
   */
  pValues: number[] = []
  
  /**
   * Determination coefficient (R²)
   * 
   * 判定系数
   */
  r2: number = 0
  
  /**
   * Adjusted determination coefficient
   * 
   * 调整后的判定系数
   */
  r2adj: number = 0
  
  /**
   * F statistic
   * 
   * F 统计量
   */
  F: number = 0
  
  /**
   * p-value for the F statistic
   * 
   * F 统计量的 p 值
   */
  p: number = 0
  
  /**
   * Total sum of squares
   * 
   * 总平方和
   */
  SSt: number = 0
  
  /**
   * Regression sum of squares
   * 
   * 回归平方和
   */
  SSr: number = 0
  
  /**
   * Residual sum of squares
   * 
   * 残差平方和
   */
  SSe: number = 0
  
  /**
   * Regression degrees of freedom
   * 
   * 回归自由度
   */
  dfR: number = 0
  
  /**
   * Residual degrees of freedom
   * 
   * 残差自由度
   */
  dfE: number = 0
  
  /**
   * Total degrees of freedom
   * 
   * 总自由度
   */
  dfT: number = 0
  
  /**
   * Calculate the predicted value for given independent variables
   * 
   * 计算给定自变量的预测值
   * @param x independent variables
   * @returns the predicted value
   * @throws {TypeError} The dimension of input must match the regression model
   */
  calc(x: number[]): number {
    if (x.length !== this.#k) {
      throw new TypeError(`The dimension of input must match the regression model (expected ${this.#k}, got ${x.length})`)
    }
    return this.coefficients[0] + x.reduce((sum, xi, i) => sum + this.coefficients[i + 1] * xi, 0)
  }
  
  /**
   * Fit the regression model
   * 
   * 拟合回归模型
   * @private
   */
  #fitRegression(): void {
    // 添加常数项列
    const X = new Matrix(this.#iv.data.map(row => [1, ...row]))
    const y = new Matrix([this.dv]).transpose()
    
    // 计算 (X'X)^(-1)X'y
    const Xt = X.transpose()
    const XtX = Xt.multiply(X)
    const XtXInv = XtX.inverse()
    const Xty = Xt.multiply(y)
    const beta = XtXInv.multiply(Xty)
    this.coefficients = beta.transpose().data[0]
    
    // 计算拟合值
    const predictions = this.iv.map(row => this.calc(row))
    
    // 计算 SSE, SSR, SST
    this.SSt = ss(this.dv, this.dvMean)
    this.SSe = ssDiff(this.dv, predictions)
    this.SSr = this.SSt - this.SSe
    
    // 计算自由度
    this.dfR = this.#k
    this.dfE = this.#n - this.#k - 1
    this.dfT = this.#n - 1
    
    // 计算 R²
    this.r2 = this.SSr / this.SSt
    this.r2adj = 1 - ((1 - this.r2) * this.dfT / this.dfE)
    
    // 计算 F 统计量及其 p 值
    this.F = (this.SSr / this.dfR) / (this.SSe / this.dfE)
    this.p = f2p(this.F, this.dfR, this.dfE, false)
    
    // 计算系数的标准误、t 值和 p 值
    const MSE = this.SSe / this.dfE
    // 手动缩放矩阵
    const varCovar = new Matrix(XtXInv.data.map(row => 
      row.map(val => val * MSE)
    ))
    
    this.standardErrors = Array(this.coefficients.length).fill(0).map((_, i) => 
      Math.sqrt(varCovar.data[i][i])
    )
    
    this.tValues = this.coefficients.map((b, i) => b / this.standardErrors[i])
    this.pValues = this.tValues.map(t => t2p(Math.abs(t), this.dfE))
  }
}

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
      this.r2increase = this.r2 - one.r2
      this.b1F = one.F
      this.b1p = one.p
      this.b2F = this.r2increase / ((1 - this.r2) / this.dfE)
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
   * The increase of r2 when adding x2 to the model (sequential regression only)
   *
   * 当将 x2 加入模型时 r2 的增加量 (仅序列回归)
   */
  r2increase?: number
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
