import { sp, ss } from '../base/index.ts'
import { abs, corr, mean, sqrt, std } from 'mathjs'
import * as jstat from 'jstat'

/**
 * Linear regression
 *
 * 线性回归
 */
interface LinearRegression {
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
	dfR: number
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
 * One-variable linear regression
 *
 * 一元线性回归
 * @param x independent variable
 * @param y dependent variable
 * @throws {TypeError} The x and y data of linear regression must be equal
 * @example
 * ```typescript
 * import { LinearRegressionOne } from '@leaf/psych-lib'
 * const x = [1, 2, 3, 4, 5]
 * const y = [2, 3, 4, 5, 6]
 * const lr = new LinearRegressionOne(x, y)
 * console.log(lr.b0, lr.b1)
 * console.log(lr.calc(6))
 * ```
 */
export class LinearRegressionOne implements LinearRegression {
	/**
	 * Construct one-variable linear regression
	 *
	 * 构造一元线性回归
	 * @param x independent variable
	 * @param y dependent variable
	 * @throws {TypeError} The x and y data of linear regression must be equal
	 */
	constructor(x: number[], y: number[]) {
		if (x.length !== y.length) {
			throw new TypeError(
				'The x and y data of linear regression must be equal',
			)
		}
		this.xMean = mean(x)
		this.yMean = mean(y)
		this.xStd = Number(std(x))
		this.yStd = Number(std(y))
		this.dfE = x.length - 2
		this.dfT = x.length - 1
		this.b1 = Number(corr(x, y)) * this.yStd / this.xStd
		this.b0 = this.yMean - this.b1 * this.xMean
		this.SSt = ss(y.map((Yi) => [Yi, this.yMean]))
		this.SSr = ss(x.map((Xi) => [this.calc(Xi), this.yMean]))
		this.SSe = ss(y.map((Yi, i) => [Yi, this.calc(x[i])]))
		this.r2 = this.SSr / this.SSt
		this.F = (this.SSr / this.dfR) / (this.SSe / this.dfE)
		this.t = Number(sqrt(abs(this.F)))
		this.p = (1 - jstat.centralF.cdf(this.F, this.dfR, this.dfE)) * 2
	}

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
 * @param x1 first independent variable
 * @param x2 second independent variable
 * @param y dependent variable
 * @throws {TypeError} The x and y data of linear regression must be equal
 * @example
 * ```typescript
 * import { LinearRegressionTwo } from '@leaf/psych-lib'
 * const x1 = [1, 2, 3, 4, 10]
 * const x2 = [1, 3, 5, 7, 9]
 * const y = [6, 14, 22, 30, 48]
 * const lr = new LinearRegressionTwo(x1, x2, y)
 * console.log(lr.b0, lr.b1, lr.b2)
 * console.log(lr.calc(6, 7))
 * ```
 */
export class LinearRegressionTwo implements LinearRegression {
	/**
	 * Construct two-variable linear regression
	 *
	 * 构造二元线性回归
	 * @param x1 first independent variable
	 * @param x2 second independent variable
	 * @param y dependent variable
	 * @throws {TypeError} The x and y data of linear regression must be equal
	 */
	constructor(x1: number[], x2: number[], y: number[]) {
		if (x1.length !== x2.length || x1.length !== y.length) {
			throw new TypeError(
				'The x and y data of linear regression must be equal',
			)
		}
		this.x1Mean = mean(x1)
		this.x2Mean = mean(x2)
		this.yMean = mean(y)
		this.x1Std = Number(std(x1))
		this.x2Std = Number(std(x2))
		this.yStd = Number(std(y))
		this.SSx1 = ss(x1.map((Xi) => [Xi, this.x1Mean]))
		this.SSx2 = ss(x2.map((Xi) => [Xi, this.x2Mean]))
		this.SSy = ss(y.map((Yi) => [Yi, this.yMean]))
		this.SPx1x2 = sp(x1.map((Xi, i) => [Xi, x2[i]]))
		this.SPx1y = sp(x1.map((Xi, i) => [Xi, y[i]]))
		this.SPx2y = sp(x2.map((Xi, i) => [Xi, y[i]]))
		this.b1 = (this.SPx1y * this.SSx2 - this.SPx2y * this.SPx1x2) /
			(this.SSx1 * this.SSx2 - this.SPx1x2 ** 2)
		this.b2 = (this.SPx2y * this.SSx1 - this.SPx1y * this.SPx1x2) /
			(this.SSx1 * this.SSx2 - this.SPx1x2 ** 2)
		this.b0 = this.yMean - this.b1 * this.x1Mean - this.b2 * this.x2Mean
		this.dfE = x1.length - 1 - this.dfR
		this.dfT = x1.length - 1
		this.SSt = this.SSy
		this.SSr = ss(y.map((_, i) => [this.calc(x1[i], x2[i]), this.yMean]))
		this.SSe = ss(y.map((Yi, i) => [Yi, this.calc(x1[i], x2[i])]))
		this.r2 = this.SSr / this.SSt
		this.F = (this.SSr / this.dfR) / (this.SSe / this.dfE)
		this.t = Number(sqrt(abs(this.F)))
		this.p = (1 - jstat.centralF.cdf(this.F, this.dfR, this.dfE)) * 2
	}

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
	 * Slope of x1
	 *
	 * x1 的偏回归系数
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
}
