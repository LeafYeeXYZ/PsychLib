import { Matrix, corr, mean, ss, ssDiff, std } from '../base.ts'
import { f2p, t2p } from '../distribution/index.ts'

/**
 * Standard Linear regression with stepwise selection
 *
 * 标准多元线性回归 (逐步回归)
 */
export class LinearRegressionStepwise {
	/**
	 * Standard Linear regression with stepwise selection
	 *
	 * 标准多元线性回归 (逐步回归)
	 * @param iv independent variables
	 * @param dv dependent variable
	 * @param method stepwise selection method
	 * @param threshold threshold for adding or removing variables
	 * @throws {TypeError} At least one independent variable is required
	 * @throws {TypeError} The x and y data of linear regression must be equal
	 * @throws {TypeError} The dimension of independent variables must be equal
	 * @throws {TypeError} The number of data points should be greater than the number of independent variables
	 * @example
	 * ```typescript
	 * import { LinearRegressionStepwise } from '@psych/lib'
	 * const iv = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
	 * const dv = [10, 20, 30, 40, 50]
	 * const lr = new LinearRegressionStepwise(iv, dv)
	 * console.log(lr.coefficients)
	 * console.log(lr.calc([6, 7]))
	 * ```
	 */
	constructor(
		iv: number[][],
		dv: number[],
		method: 'forward' | 'backward' | 'both' = 'both',
		threshold = 0.05,
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
			throw new TypeError(
				'The dimension of independent variables must be equal',
			)
		}
		if (n <= k) {
			throw new TypeError(
				'The number of data points should be greater than the number of independent variables',
			)
		}

		this.#dv = dv
		this.#iv = iv
		this.#n = n
		this.#k = k
		this.#method = method
		this.#threshold = threshold

		// 计算平均值和标准差
		this.dvMean = mean(dv)
		this.dvStd = std(dv, true, this.dvMean)
		this.ivMeans = Array(k)
			.fill(0)
			.map((_, i) => mean(iv.map((row) => row[i])))
		this.ivStds = Array(k)
			.fill(0)
			.map((_, i) =>
				std(
					iv.map((row) => row[i]),
					true,
					this.ivMeans[i],
				),
			)

		// 执行逐步回归
		this.#performStepwiseRegression()
	}

	/**
	 * Independent variables
	 *
	 * 自变量
	 */
	get iv(): number[][] {
		return this.#iv
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
	 * Independent variables
	 *
	 * 自变量
	 */
	#iv: number[][]

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
	 * Stepwise selection method
	 *
	 * 逐步选择方法
	 */
	#method: 'forward' | 'backward' | 'both'

	/**
	 * Threshold for adding or removing variables
	 *
	 * 添加或移除变量的阈值
	 */
	#threshold: number

	/**
	 * Selected variables indices
	 *
	 * 已选择的变量索引
	 */
	#selectedIndices: number[] = []

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
	 * b0 is intercept, others correspond to selected variables
	 *
	 * 回归系数 [b0, b1, b2, ...]
	 * b0是截距，其他对应选择的变量
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
	r2 = 0

	/**
	 * Adjusted determination coefficient
	 *
	 * 调整后的判定系数
	 */
	r2adj = 0

	/**
	 * F statistic
	 *
	 * F 统计量
	 */
	F = 0

	/**
	 * p-value for the F statistic
	 *
	 * F 统计量的 p 值
	 */
	p = 0

	/**
	 * Total sum of squares
	 *
	 * 总平方和
	 */
	SSt = 0

	/**
	 * Regression sum of squares
	 *
	 * 回归平方和
	 */
	SSr = 0

	/**
	 * Residual sum of squares
	 *
	 * 残差平方和
	 */
	SSe = 0

	/**
	 * Selected variables indices in order of selection
	 *
	 * 按选择顺序排列的已选择变量索引
	 */
	selectedVariables: number[] = []

	/**
	 * Degree of freedom for regression
	 *
	 * 回归自由度
	 */
	dfR = 0

	/**
	 * Degree of freedom for residuals
	 *
	 * 残差自由度
	 */
	dfE = 0

	/**
	 * Degree of freedom for total
	 *
	 * 总自由度
	 */
	dfT = 0

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
			throw new TypeError(
				`The dimension of input must match the regression model (expected ${this.#k}, got ${x.length})`,
			)
		}

		// 常数项 (截距)
		let result = this.coefficients[0]

		// 使用选择的变量计算结果
		for (let i = 0; i < this.selectedVariables.length; i++) {
			const varIndex = this.selectedVariables[i]
			const coefIndex = i + 1 // 系数索引从1开始 (0是截距)
			result += this.coefficients[coefIndex] * x[varIndex]
		}

		return result
	}

	/**
	 * 执行逐步回归
	 */
	#performStepwiseRegression() {
		// 初始化所有可能的变量索引
		const allIndices = Array.from({ length: this.#k }, (_, i) => i)

		switch (this.#method) {
			case 'forward':
				// 前向选择: 从空模型开始，逐步添加变量
				this.#selectedIndices = []
				this.#forwardSelection(allIndices)
				break

			case 'backward':
				// 后向消除: 从包含所有变量的模型开始，逐步移除变量
				this.#selectedIndices = [...allIndices]
				this.#backwardElimination()
				break

			case 'both':
				// 双向选择: 结合前向和后向，每步都考虑添加和移除变量
				this.#selectedIndices = []
				this.#bothSelection(allIndices)
				break
		}

		// 使用最终选择的变量构建回归模型
		this.#buildFinalModel()
	}

	/**
	 * 前向选择算法
	 */
	#forwardSelection(availableIndices: number[]) {
		let improved = true

		while (improved && this.#selectedIndices.length < this.#k) {
			improved = false
			let bestIndex = -1
			let bestPValue = Number.POSITIVE_INFINITY

			// 尝试添加每个可用变量
			for (const index of availableIndices) {
				if (this.#selectedIndices.includes(index)) continue

				// 创建尝试模型 (当前已选 + 新变量)
				const testIndices = [...this.#selectedIndices, index]
				const testIv = this.#extractSubsetIv(testIndices)

				try {
					const model = new LinearRegressionStandard(testIv, this.#dv)
					// 检查新添加变量的p值 (最后一个系数的p值)
					const pValue = model.pValues[model.pValues.length - 1]

					// 如果显著性更好，更新最佳选择
					if (pValue < bestPValue && pValue < this.#threshold) {
						bestPValue = pValue
						bestIndex = index
						improved = true
					}
				} catch {
					// 如果模型有问题，跳过
				}
			}

			// 如果找到了显著的变量，添加到已选列表
			if (improved && bestIndex !== -1) {
				this.#selectedIndices.push(bestIndex)
				// 从可用变量中移除
				const indexToRemove = availableIndices.indexOf(bestIndex)
				if (indexToRemove !== -1) {
					availableIndices.splice(indexToRemove, 1)
				}
			}
		}
	}

	/**
	 * 后向消除算法
	 */
	#backwardElimination() {
		// 先用所有变量尝试建立模型
		let fullIv = this.#extractSubsetIv(this.#selectedIndices)
		let currentModel: LinearRegressionStandard

		try {
			currentModel = new LinearRegressionStandard(fullIv, this.#dv)
		} catch {
			// 如果全模型有问题，回退到前向选择
			this.#selectedIndices = []
			this.#forwardSelection(Array.from({ length: this.#k }, (_, i) => i))
			return
		}

		let improved = true

		while (improved && this.#selectedIndices.length > 0) {
			improved = false
			let worstIndex = -1
			let worstPValue = 0
			let worstPosition = -1

			// 检查每个当前在模型中的变量
			for (let i = 0; i < this.#selectedIndices.length; i++) {
				// 系数索引: i+1 (跳过截距)
				const pValue = currentModel.pValues[i + 1]

				// 寻找最不显著的变量
				if (pValue > worstPValue && pValue > this.#threshold) {
					worstPValue = pValue
					worstIndex = this.#selectedIndices[i]
					worstPosition = i
					improved = true
				}
			}

			// 如果找到不显著的变量，从模型中移除
			if (improved && worstPosition !== -1) {
				this.#selectedIndices.splice(worstPosition, 1)

				// 使用剩余变量重新构建模型
				if (this.#selectedIndices.length > 0) {
					fullIv = this.#extractSubsetIv(this.#selectedIndices)
					try {
						currentModel = new LinearRegressionStandard(fullIv, this.#dv)
					} catch {
						// 如果新模型有问题，回滚并中断
						this.#selectedIndices.push(worstIndex)
						break
					}
				}
			}
		}
	}

	/**
	 * 双向选择算法 (结合前向和后向)
	 */
	#bothSelection(availableIndices: number[]) {
		let changed = true

		while (changed) {
			changed = false

			// 尝试前向添加
			const prevLength = this.#selectedIndices.length
			this.#forwardSelection([...availableIndices])

			// 如果有变量被添加
			if (this.#selectedIndices.length > prevLength) {
				changed = true

				// 更新可用变量
				for (const index of this.#selectedIndices) {
					const pos = availableIndices.indexOf(index)
					if (pos !== -1) {
						availableIndices.splice(pos, 1)
					}
				}

				// 尝试后向消除
				const beforeRemoval = [...this.#selectedIndices]
				this.#backwardElimination()

				// 如果有变量被移除
				if (this.#selectedIndices.length < beforeRemoval.length) {
					changed = true

					// 将被移除的变量添加回可用变量
					const removedIndices = beforeRemoval.filter(
						(index) => !this.#selectedIndices.includes(index),
					)
					availableIndices.push(...removedIndices)
				}
			}
		}
	}

	/**
	 * 提取选定变量的子集
	 */
	#extractSubsetIv(indices: number[]): number[][] {
		return this.#iv.map((row) => indices.map((index) => row[index]))
	}

	/**
	 * 构建最终模型
	 */
	#buildFinalModel() {
		// 保存选定变量的顺序
		this.selectedVariables = [...this.#selectedIndices]

		if (this.selectedVariables.length === 0) {
			// 如果没有变量被选中，创建一个仅有截距的模型
			this.coefficients = [this.dvMean]
			this.standardErrors = [this.dvStd / Math.sqrt(this.#n)]
			this.tValues = [this.coefficients[0] / this.standardErrors[0]]
			this.pValues = [t2p(Math.abs(this.tValues[0]), this.#n - 1)]
			this.r2 = 0
			this.r2adj = 0
			this.F = 0
			this.p = 1
			this.SSt = ss(this.#dv, this.dvMean)
			this.SSe = this.SSt
			this.SSr = 0
			this.dfR = 0
			this.dfE = this.#n - 1
			this.dfT = this.#n - 1
		} else {
			// 使用选定的变量创建最终回归模型
			const selectedIv = this.#extractSubsetIv(this.selectedVariables)
			const finalModel = new LinearRegressionStandard(selectedIv, this.#dv)

			// 复制最终模型的结果
			this.coefficients = finalModel.coefficients
			this.standardErrors = finalModel.standardErrors
			this.tValues = finalModel.tValues
			this.pValues = finalModel.pValues
			this.r2 = finalModel.r2
			this.r2adj = finalModel.r2adj
			this.F = finalModel.F
			this.p = finalModel.p
			this.SSt = finalModel.SSt
			this.SSr = finalModel.SSr
			this.SSe = finalModel.SSe
			this.dfR = finalModel.dfR
			this.dfE = finalModel.dfE
			this.dfT = finalModel.dfT
		}
	}
}

/**
 * Multiple independent variables linear regression (Standard Regression)
 *
 * 多元线性回归 (标准多元回归)
 */
export class LinearRegressionStandard {
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
	constructor(iv: number[][], dv: number[]) {
		const n = dv.length
		if (iv.length !== n) {
			throw new TypeError('The x and y data of linear regression must be equal')
		}
		const k = iv[0].length
		if (k === 0) {
			throw new TypeError('At least one independent variable is required')
		}
		if (!iv.every((v) => v.length === k)) {
			throw new TypeError(
				'The dimension of independent variables must be equal',
			)
		}
		if (n <= k) {
			throw new TypeError(
				'The number of data points should be greater than the number of independent variables',
			)
		}
		this.#dv = dv
		this.#iv = new Matrix(iv)
		this.#n = n
		this.#k = k

		// 计算平均值和标准差
		this.dvMean = mean(dv)
		this.dvStd = std(dv, true, this.dvMean)
		this.ivMeans = Array(k)
			.fill(0)
			.map((_, i) => mean(iv.map((row) => row[i])))
		this.ivStds = Array(k)
			.fill(0)
			.map((_, i) =>
				std(
					iv.map((row) => row[i]),
					true,
					this.ivMeans[i],
				),
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
	r2 = 0

	/**
	 * Adjusted determination coefficient
	 *
	 * 调整后的判定系数
	 */
	r2adj = 0

	/**
	 * F statistic
	 *
	 * F 统计量
	 */
	F = 0

	/**
	 * p-value for the F statistic
	 *
	 * F 统计量的 p 值
	 */
	p = 0

	/**
	 * Total sum of squares
	 *
	 * 总平方和
	 */
	SSt = 0

	/**
	 * Regression sum of squares
	 *
	 * 回归平方和
	 */
	SSr = 0

	/**
	 * Residual sum of squares
	 *
	 * 残差平方和
	 */
	SSe = 0

	/**
	 * Regression degrees of freedom
	 *
	 * 回归自由度
	 */
	dfR = 0

	/**
	 * Residual degrees of freedom
	 *
	 * 残差自由度
	 */
	dfE = 0

	/**
	 * Total degrees of freedom
	 *
	 * 总自由度
	 */
	dfT = 0

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
			throw new TypeError(
				`The dimension of input must match the regression model (expected ${this.#k}, got ${x.length})`,
			)
		}
		return (
			this.coefficients[0] +
			x.reduce((sum, xi, i) => sum + this.coefficients[i + 1] * xi, 0)
		)
	}

	/**
	 * Fit the regression model
	 *
	 * 拟合回归模型
	 * @private
	 */
	#fitRegression(): void {
		// 添加常数项列
		const X = new Matrix(this.#iv.data.map((row) => [1, ...row]))
		const y = new Matrix([this.dv]).transpose()

		// 计算 (X'X)^(-1)X'y
		const Xt = X.transpose()
		const XtX = Xt.multiply(X)
		const XtXInv = XtX.inverse()
		const Xty = Xt.multiply(y)
		const beta = XtXInv.multiply(Xty)
		this.coefficients = beta.transpose().data[0]

		// 计算拟合值
		const predictions = this.iv.map((row) => this.calc(row))

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
		this.r2adj = 1 - ((1 - this.r2) * this.dfT) / this.dfE

		// 计算 F 统计量及其 p 值
		this.F = this.SSr / this.dfR / (this.SSe / this.dfE)
		this.p = f2p(this.F, this.dfR, this.dfE, false)

		// 计算系数的标准误、t 值和 p 值
		const MSE = this.SSe / this.dfE
		// 手动缩放矩阵
		const varCovar = new Matrix(
			XtXInv.data.map((row) => row.map((val) => val * MSE)),
		)

		this.standardErrors = Array(this.coefficients.length)
			.fill(0)
			.map((_, i) => Math.sqrt(varCovar.data[i][i]))

		this.tValues = this.coefficients.map((b, i) => b / this.standardErrors[i])
		this.pValues = this.tValues.map((t) => t2p(Math.abs(t), this.dfE))
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
		this.b1 = (corr(x, y, [this.xMean, this.yMean]) * this.yStd) / this.xStd
		this.b0 = this.yMean - this.b1 * this.xMean
		this.SSt = this.SSy
		const predict = x.map((Xi) => this.calc(Xi))
		this.SSr = ssDiff(predict, new Array(x.length).fill(this.yMean))
		this.SSe = ssDiff(y, predict)
		this.r2 = this.SSr / this.SSt
		this.F = this.SSr / this.dfR / (this.SSe / this.dfE)
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
	dfR = 1
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
