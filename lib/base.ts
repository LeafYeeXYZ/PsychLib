import { sort } from './sort.ts'

/**
 * Matrix class
 *
 * 矩阵类
 */
export class Matrix {
	/**
	 * Matrix class
	 *
	 * 矩阵类
	 * @param data matrix data
	 * @throws {TypeError} the matrix must be a 2D array
	 * @throws {TypeError} each row of the matrix must have the same length
	 * @example
	 * ```typescript
	 * import { Matrix } from '@psych/lib'
	 * const m = new Matrix([[1, 2], [3, 4]])
	 * ```
	 */
	constructor(data: number[][]) {
		if (!Array.isArray(data) || !Array.isArray(data[0])) {
			throw new TypeError('the matrix must be a 2D array')
		}
		if (data.some((v) => v.length !== data[0].length)) {
			throw new TypeError('each row of the matrix must have the same length')
		}
		this.#data = data
	}
	/**
	 * Matrix data
	 *
	 * 矩阵数据
	 */
	get data(): number[][] {
		return this.#data
	}
	/**
	 * Matrix data
	 *
	 * 矩阵数据
	 */
	#data: number[][]
	/**
	 * Matrix rows
	 *
	 * 矩阵行数
	 */
	get rows(): number {
		return this.#data.length
	}
	/**
	 * Matrix columns
	 *
	 * 矩阵列数
	 */
	get cols(): number {
		return this.#data[0].length
	}
	/**
	 * Matrix transpose (this method does not change the original matrix)
	 *
	 * 矩阵转置 (此方法不改变原矩阵)
	 * @returns transposed matrix (new matrix)
	 * @example
	 * ```typescript
	 * import { Matrix } from '@psych/lib'
	 * const m = new Matrix([[1, 2, 3], [4, 5, 6]])
	 * console.log(m.transpose().data) // [[1, 4], [2, 5], [3, 6]]
	 * ```
	 */
	transpose(): Matrix {
		return Matrix.transpose(this)
	}
	/**
	 * Matrix transpose (this method does not change the original matrix)
	 *
	 * 矩阵转置 (此方法不改变原矩阵)
	 * @param matrix matrix to transpose
	 * @returns transposed matrix (new matrix)
	 * @example
	 * ```typescript
	 * import { Matrix } from '@psych/lib'
	 * const m = new Matrix([[1, 2, 3], [4, 5, 6]])
	 * console.log(Matrix.transpose(m).data) // [[1, 4], [2, 5], [3, 6]]
	 * ```
	 */
	static transpose(matrix: Matrix): Matrix {
		const result: number[][] = new Array(matrix.cols)
			.fill(0)
			.map(() => new Array(matrix.rows).fill(0))
		for (let i = 0; i < matrix.rows; i++) {
			for (let j = 0; j < matrix.cols; j++) {
				result[j][i] = matrix.data[i][j]
			}
		}
		return new Matrix(result)
	}
	/**
	 * Matrix addition (this method does not change the original matrix)
	 *
	 * 矩阵加法 (此方法不改变原矩阵)
	 * @param matrix matrix to add to current matrix
	 * @returns matrix addition (new matrix)
	 * @throws {Error} the rows and columns of the two matrices must be the same
	 * @example
	 * ```typescript
	 * import { Matrix } from '@psych/lib'
	 * const a = new Matrix([[1, 2], [3, 4]])
	 * const b = new Matrix([[5, 6], [7, 8]])
	 * console.log(a.add(b).data) // [[6, 8], [10, 12]]
	 * ```
	 */
	add(matrix: Matrix): Matrix {
		return Matrix.add(this, matrix)
	}
	/**
	 * Matrix addition
	 *
	 * 矩阵加法
	 * @param a matrix a
	 * @param b matrix b
	 * @returns matrix addition
	 * @throws {Error} the rows and columns of the two matrices must be the same
	 * @example
	 * ```typescript
	 * import { Matrix } from '@psych/lib'
	 * const a = new Matrix([[1, 2], [3, 4]])
	 * const b = new Matrix([[5, 6], [7, 8]])
	 * console.log(Matrix.add(a, b).data) // [[6, 8], [10, 12]]
	 * ```
	 */
	static add(a: Matrix, b: Matrix): Matrix {
		if (a.rows !== b.rows || a.cols !== b.cols) {
			throw new Error(
				'the rows and columns of the two matrices must be the same',
			)
		}
		const result: number[][] = new Array(a.rows)
			.fill(0)
			.map(() => new Array(a.cols).fill(0))
		for (let i = 0; i < a.rows; i++) {
			for (let j = 0; j < a.cols; j++) {
				result[i][j] = a.data[i][j] + b.data[i][j]
			}
		}
		return new Matrix(result)
	}
	/**
	 * Matrix multiplication (this method does not change the original matrix)
	 *
	 * 矩阵乘法 (此方法不改变原矩阵)
	 * @param matrix matrix to multiply with current matrix
	 * @returns matrix multiplication (new matrix)
	 * @throws {Error} the columns of the first matrix (current matrix) must be the same as the rows of the second matrix (given matrix)
	 * @example
	 * ```typescript
	 * import { Matrix } from '@psych/lib'
	 * const a = new Matrix([[1, 2], [3, 4]])
	 * const b = new Matrix([[5, 6], [7, 8]])
	 * console.log(a.multiply(b).data) // [[19, 22], [43, 50]]
	 * ```
	 */
	multiply(matrix: Matrix): Matrix {
		return Matrix.multiply(this, matrix)
	}
	/**
	 * Matrix multiplication
	 *
	 * 矩阵乘法
	 * @param a matrix a
	 * @param b matrix b
	 * @returns matrix multiplication
	 * @throws {Error} the columns of the first matrix must be the same as the rows of the second matrix
	 * @example
	 * ```typescript
	 * import { Matrix } from '@psych/lib'
	 * const a = new Matrix([[1, 2], [3, 4]])
	 * const b = new Matrix([[5, 6], [7, 8]])
	 * console.log(Matrix.multiply(a, b).data) // [[19, 22], [43, 50]]
	 * ```
	 */
	static multiply(a: Matrix, b: Matrix): Matrix {
		if (a.cols !== b.rows) {
			throw new Error(
				'the columns of the first matrix must be the same as the rows of the second matrix',
			)
		}
		const result: number[][] = new Array(a.rows)
			.fill(0)
			.map(() => new Array(b.cols).fill(0))
		for (let i = 0; i < a.rows; i++) {
			for (let j = 0; j < b.cols; j++) {
				for (let k = 0; k < a.cols; k++) {
					result[i][j] += a.data[i][k] * b.data[k][j]
				}
			}
		}
		return new Matrix(result)
	}
	/**
	 * Matrix inversion (Gauss-Jordan elimination) (this method does not change the original matrix)
	 *
	 * 矩阵求逆 (高斯-约旦消元法) (此方法不改变原矩阵)
	 * @returns inverted matrix (new matrix)
	 * @throws {Error} the matrix must be a square matrix
	 * @throws {Error} the matrix must be a non-singular matrix
	 * @example
	 * ```typescript
	 * import { Matrix } from '@psych/lib'
	 * const m = new Matrix([[1, 2], [3, 4]])
	 * console.log(m.inverse().data) // [[-2, 1], [1.5, -0.5]]
	 * ```
	 */
	inverse(): Matrix {
		return Matrix.inverse(this)
	}
	/**
	 * Matrix inversion (Gauss-Jordan elimination)
	 *
	 * 矩阵求逆 (高斯-约旦消元法)
	 * @param matrix matrix to invert
	 * @returns inverted matrix
	 * @throws {Error} the matrix must be a square matrix (rows must be equal to columns)
	 * @throws {Error} the matrix must be a non-singular matrix (determinant should not be zero)
	 * @example
	 * ```typescript
	 * import { Matrix } from '@psych/lib'
	 * const m = new Matrix([[1, 2], [3, 4]])
	 * console.log(Matrix.inverse(m).data) // [[-2, 1], [1.5, -0.5]]
	 * ```
	 */
	static inverse(matrix: Matrix): Matrix {
		if (matrix.rows !== matrix.cols) {
			throw new Error(
				'the matrix must be a square matrix (rows must be equal to columns)',
			)
		}
		const n = matrix.rows
		// 创建增广矩阵 [A|I]
		const augMatrix: number[][] = new Array(n)
			.fill(0)
			.map(() => new Array(2 * n).fill(0))
		// 填充增广矩阵的左半部分为原矩阵
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				augMatrix[i][j] = matrix.data[i][j]
			}
		}
		// 填充增广矩阵的右半部分为单位矩阵
		for (let i = 0; i < n; i++) {
			augMatrix[i][i + n] = 1
		}
		// 高斯-约旦消元
		for (let i = 0; i < n; i++) {
			// 查找当前列中绝对值最大的元素的行索引
			let maxRow = i
			let maxVal = Math.abs(augMatrix[i][i])
			for (let j = i + 1; j < n; j++) {
				if (Math.abs(augMatrix[j][i]) > maxVal) {
					maxRow = j
					maxVal = Math.abs(augMatrix[j][i])
				}
			}
			// 如果对角线上的元素接近于零，则矩阵不可逆
			if (Math.abs(maxVal) < 1e-10) {
				throw new Error(
					'the matrix must be a non-singular matrix (determinant should not be zero)',
				)
			}
			// 交换行
			if (maxRow !== i) {
				for (let j = 0; j < 2 * n; j++) {
					;[augMatrix[i][j], augMatrix[maxRow][j]] = [
						augMatrix[maxRow][j],
						augMatrix[i][j],
					]
				}
			}
			// 将对角线元素缩放为1
			const pivot = augMatrix[i][i]
			for (let j = 0; j < 2 * n; j++) {
				augMatrix[i][j] /= pivot
			}
			// 使当前列的其他行元素为0
			for (let j = 0; j < n; j++) {
				if (j !== i) {
					const factor = augMatrix[j][i]
					for (let k = 0; k < 2 * n; k++) {
						augMatrix[j][k] -= factor * augMatrix[i][k]
					}
				}
			}
		}
		// 从增广矩阵的右半部分提取逆矩阵
		const result: number[][] = new Array(n)
			.fill(0)
			.map(() => new Array(n).fill(0))
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				result[i][j] = augMatrix[i][j + n]
			}
		}

		return new Matrix(result)
	}
}

/**
 * Calculate the sum of two numbers
 *
 * 计算数组所有元素的和
 * @param n numbers
 * @returns sum of numbers
 * @example
 * ```typescript
 * import { sum } from '@psych/lib'
 * console.log(sum([1, 2, 3, 4, 5])) // 15
 * ```
 */
export function sum(n: number[]): number {
	let r = 0
	for (let i = 0; i < n.length; i++) {
		r += n[i]
	}
	return r
}

/**
 * Calculate the mean of numbers
 *
 * 计算数组所有元素的平均值
 * @param data numbers
 * @returns mean of numbers
 * @example
 * ```typescript
 * import { mean } from '@psych/lib'
 * console.log(mean([1, 2, 3, 4, 5])) // 3
 * ```
 */
export function mean(data: number[]): number {
	return sum(data) / data.length
}

/**
 * Calculate the median of numbers
 * if the length of numbers is even, return the average of the two middle numbers
 *
 * 计算数组所有元素的中位数
 * 如果数组长度为偶数，则返回中间两个数的平均值
 * @param data numbers
 * @param sorted whether the numbers are sorted by ascending order (default is false)
 * @returns median of numbers
 * @example
 * ```typescript
 * import { median } from '@psych/lib'
 * console.log(median([1, 2, 3, 4, 5])) // 3
 * ```
 */
export function median(data: number[], sorted = false): number {
	const n = data.length
	const a = sorted ? data : sort(data)
	if (n % 2 === 0) {
		return (a[n >> 1] + a[(n >> 1) - 1]) / 2
	}
	return a[n >> 1]
}

/**
 * Calculate the quantile of numbers (interpolation method)
 *
 * 计算数组的分位数 (插值法)
 * @param data numbers
 * @param q quantile (0-1)
 * @param sorted whether the numbers are sorted by ascending order (default is false)
 * @returns quantile of numbers
 * @example
 * ```typescript
 * import { quantile } from '@psych/lib'
 * console.log(quantile([1, 2, 3, 4, 5], 0.5)) // 3
 * ```
 */
export function quantile(data: number[], q: number, sorted = false): number {
	const n = data.length
	const a = sorted ? data : sort(data)
	const i = Math.floor(q * (n - 1))
	const f = q * (n - 1) - i
	return a[i] + f * (a[i + 1] - a[i])
}

/**
 * Calculate the minimum value of numbers
 *
 * 计算数组所有元素的最小值
 * @param data numbers
 * @param sorted whether the numbers are sorted by ascending order (default is false)
 * @returns minimum value of numbers
 * @example
 * ```typescript
 * import { min } from '@psych/lib'
 * console.log(min([1, 2, 3, 4, 5])) // 1
 * ```
 */
export function min(data: number[], sorted = false): number {
	if (data.length === 0) {
		throw new Error('Cannot calculate min of an empty array')
	}
	if (sorted) {
		return data[0]
	}
	let r = data[0]
	for (let i = 1; i < data.length; i++) {
		if (data[i] < r) {
			r = data[i]
		}
	}
	return r
}

/**
 * Calculate the maximum value of numbers
 *
 * 计算数组所有元素的最大值
 * @param data numbers
 * @param sorted whether the numbers are sorted by ascending order (default is false)
 * @returns maximum value of numbers
 * @example
 * ```typescript
 * import { max } from '@psych/lib'
 * console.log(max([1, 2, 3, 4, 5])) // 5
 * ```
 */
export function max(data: number[], sorted = false): number {
	if (data.length === 0) {
		throw new Error('Cannot calculate max of an empty array')
	}
	if (sorted) {
		return data[data.length - 1]
	}
	let r = data[0]
	for (let i = 1; i < data.length; i++) {
		if (data[i] > r) {
			r = data[i]
		}
	}
	return r
}

/**
 * Calculate the range of numbers
 *
 * 计算数组所有元素的极差
 * @param data numbers
 * @param sorted whether the numbers are sorted by ascending order (default is false)
 * @returns range of numbers
 * @example
 * ```typescript
 * import { range } from '@psych/lib'
 * console.log(range([1, 2, 3, 4, 5])) // 4
 * ```
 */
export function range(data: number[], sorted = false): number {
	return max(data, sorted) - min(data, sorted)
}

/**
 * Calculate the sum of squares (SS) of numbers
 *
 * 计算数组所有元素的平方和 (SS)
 * @param data numbers
 * @param _mean mean if already calculated
 * @returns sum of squares
 * @example
 * ```typescript
 * import { ss } from '@psych/lib'
 * console.log(ss([1, 2, 3, 4, 5])) // 10
 * ```
 */
export function ss(data: number[], _mean?: number): number {
	const m = _mean ?? mean(data)
	let r = 0
	for (let i = 0; i < data.length; i++) {
		r += (data[i] - m) ** 2
	}
	return r
}

/**
 * Calculate the sum of squares of the array difference
 *
 * 计算数组差的平方和
 * @param a array a
 * @param b array b
 * @returns sum of squares of the array difference
 * @example
 * ```typescript
 * import { ssDiff } from '@psych/lib'
 * console.log(ssDiff([1, 2, 3], [4, 5, 6])) // 27
 * ```
 * @throws {Error} the length of a and b must be the same
 */
export function ssDiff(a: number[], b: number[]): number {
	const n = a.length
	if (n !== b.length) {
		throw new Error('the length of a and b must be the same')
	}
	let r = 0
	for (let i = 0; i < n; i++) {
		r += (a[i] - b[i]) ** 2
	}
	return r
}

/**
 * Calculate the sum of the product of two centered arrays (SP)
 *
 * 计算两个数组的的中心化乘积和 (SP)
 * @param a array a
 * @param b array b
 * @param _mean mean if already calculated
 * @returns sum of the product of two centered arrays
 * @example
 * ```typescript
 * import { sp } from '@psych/lib'
 * console.log(sp([1, 2, 3], [4, 5, 6])) // 2
 * ```
 * @throws {Error} the length of a and b must be the same
 */
export function sp(a: number[], b: number[], _mean?: [number, number]): number {
	const n = a.length
	if (n !== b.length) {
		throw new Error('the length of a and b must be the same')
	}
	const m = _mean ?? [mean(a), mean(b)]
	let r = 0
	for (let i = 0; i < n; i++) {
		r += (a[i] - m[0]) * (b[i] - m[1])
	}
	return r
}

/**
 * Calculate the covariance of two arrays
 *
 * 计算两个数组的协方差
 * @param a array a
 * @param b array b
 * @param sample whether to calculate the sample covariance (default is true)
 * @param _mean mean if already calculated
 * @returns covariance of two arrays
 * @example
 * ```typescript
 * import { cov } from '@psych/lib'
 * console.log(cov([1, 2, 3], [4, 5, 6])) // 1
 * ```
 * @throws {Error} the length of a and b must be the same
 */
export function cov(
	a: number[],
	b: number[],
	sample = true,
	_mean?: [number, number],
): number {
	const n = a.length
	if (n !== b.length) {
		throw new Error('the length of a and b must be the same')
	}
	return sp(a, b, _mean) / (n - (sample ? 1 : 0))
}

/**
 * Calculate the kurtosis of numbers
 *
 * 计算数组所有元素的峰度
 * @param data numbers
 * @param sample whether to calculate the sample kurtosis (default is true)
 * @param _mean mean if already calculated
 * @returns kurtosis of numbers
 * @example
 * ```typescript
 * import { kurtosis } from '@psych/lib'
 * console.log(kurtosis([1, 2, 3, 4, 5]))
 * ```
 * @see https://en.wikipedia.org/wiki/Kurtosis
 */
export function kurtosis(
	data: number[],
	sample = true,
	_mean?: number,
): number {
	const n = data.length
	const m = _mean ?? mean(data)
	if (sample) {
		let rT = 0
		let rB = 0
		for (let i = 0; i < n; i++) {
			rT += (data[i] - m) ** 4
			rB += (data[i] - m) ** 2
		}
		rT /= n
		rB /= n
		return rT / rB ** 2 - 3
	}
	const s = std(data, false, m)
	let r = 0
	for (let i = 0; i < n; i++) {
		r += ((data[i] - m) / s) ** 4
	}
	return r / n
}

/**
 * Calculate the skewness of numbers
 *
 * 计算数组所有元素的偏度
 * @param data numbers
 * @param sample whether to calculate the sample skewness (default is true)
 * @param _mean mean if already calculated
 * @returns skewness of numbers
 * @example
 * ```typescript
 * import { skewness } from '@psych/lib'
 * console.log(skewness([1, 2, 3, 4, 5]))
 * ```
 * @see https://en.wikipedia.org/wiki/Skewness
 */
export function skewness(
	data: number[],
	sample = true,
	_mean?: number,
): number {
	const n = data.length
	const m = _mean ?? mean(data)
	if (sample) {
		let rT = 0
		let rB = 0
		for (let i = 0; i < n; i++) {
			rT += (data[i] - m) ** 3
			rB += (data[i] - m) ** 2
		}
		rT /= n
		rB /= n
		return rT / rB ** 1.5
	}
	const s = std(data, false, m)
	let r = 0
	for (let i = 0; i < n; i++) {
		r += ((data[i] - m) / s) ** 3
	}
	return r / n
}

/**
 * Calculate the variance of numbers
 *
 * 计算数组所有元素的方差
 * @param data numbers
 * @param sample whether to calculate the sample variance (default is true)
 * @param _mean mean if already calculated
 * @returns variance of numbers
 * @example
 * ```typescript
 * import { vari } from '@psych/lib'
 * console.log(vari([1, 2, 3, 4, 5])) // 2.5
 * ```
 */
export function vari(data: number[], sample = true, _mean?: number): number {
	return ss(data, _mean) / (data.length - (sample ? 1 : 0))
}

/**
 * Calculate the standard deviation of numbers
 *
 * 计算数组所有元素的标准差
 * @param data numbers
 * @param sample whether to calculate the sample standard deviation (default is true)
 * @param _mean mean if already calculated
 * @returns standard deviation of numbers
 * @example
 * ```typescript
 * import { std } from '@psych/lib'
 * console.log(std([1, 2, 3, 4, 5])) // 1.581...
 * ```
 */
export function std(data: number[], sample = true, _mean?: number): number {
	return Math.sqrt(vari(data, sample, _mean))
}

/**
 * Calculate the standard error of the mean (SEM) of numbers
 *
 * 计算数组所有元素的均值标准误
 * @param data numbers
 * @param sample whether to calculate the sample standard error of the mean (default is true)
 * @param _mean mean if already calculated
 * @returns standard error of the mean of numbers
 * @example
 * ```typescript
 * import { sem } from '@psych/lib'
 * console.log(sem([1, 2, 3, 4, 5])) // 0.707...
 * ```
 */
export function sem(data: number[], sample = true, _mean?: number): number {
	return Math.sqrt(vari(data, sample, _mean) / data.length)
}

/**
 * Calculate the correlation coefficient of two arrays
 *
 * 计算两个数组的相关系数
 * @param a array a
 * @param b array b
 * @param _mean mean if already calculated
 * @returns correlation coefficient of two arrays
 * @example
 * ```typescript
 * import { corr } from '@psych/lib'
 * console.log(corr([1, 2, 3], [4, 5, 6])) // 1
 * ```
 * @throws {Error} the length of a and b must be the same
 */
export function corr(
	a: number[],
	b: number[],
	_mean?: [number, number],
): number {
	if (a.length !== b.length) {
		throw new Error('the length of a and b must be the same')
	}
	const m = _mean ?? [mean(a), mean(b)]
	return sp(a, b, m) / Math.sqrt(ss(a, m[0]) * ss(b, m[1]))
}

/**
 * Calculate the mode of numbers
 * If there are multiple modes, return 3 * median - 2 * mean
 *
 * 计算数字的众数
 * 如果有多个众数，则返回 3 * 中位数 - 2 * 平均数
 * @param data numbers
 * @returns mode of numbers
 * @example
 * ```typescript
 * import { mode } from '@psych/lib'
 * mode([1, 2, 3, 3, 4, 5]) // 3
 * mode([1, 2, 3, 4, 5, 6]) // 3.5
 * ```
 */
export function mode(data: number[]): number {
	const freq = new Map<number, number>()
	let max = 0
	for (let i = 0; i < data.length; i++) {
		// biome-ignore lint/style/noNonNullAssertion: 已经通过 .has 验证存在
		const f = (freq.has(data[i]) ? freq.get(data[i])! : 0) + 1
		freq.set(data[i], f)
		if (f > max) {
			max = f
		}
	}
	const modes: number[] = []
	for (const [k, v] of freq) {
		if (v === max) {
			modes.push(k)
		}
	}
	if (modes.length === 1) {
		return modes[0]
	}
	return 3 * median(data) - 2 * mean(data)
}

/**
 * Centralize the array
 *
 * 中心化数组
 * @param data numbers
 * @param stat statistics to refer to (default is mean)
 * @param abs whether to absolute the centralized array (default is false)
 * @param _stat statistics if already calculated
 * @returns centralized array
 * @example
 * ```typescript
 * import { centralize } from '@psych/lib'
 * console.log(centralize([1, 2, 3, 4, 5])) // [-2, -1, 0, 1, 2]
 * ```
 */
export function centralize(
	data: number[],
	stat: 'mean' | 'median' = 'mean',
	abs = false,
	_stat?: number,
): number[] {
	const r: number[] = []
	const c = _stat ?? (stat === 'mean' ? mean(data) : median(data))
	for (let i = 0; i < data.length; i++) {
		r.push(abs ? Math.abs(data[i] - c) : data[i] - c)
	}
	return r
}

/**
 * Standardize the array
 *
 * 标准化数组
 * @param data numbers
 * @param sample whether to calculate the sample standard deviation (default is true)
 * @param abs whether to absolute the standardized array (default is false)
 * @param _mean mean if already calculated
 * @param _std standard deviation if already calculated
 * @returns standardized array
 * @example
 * ```typescript
 * import { standardize } from '@psych/lib'
 * console.log(standardize([1, 2, 3, 4, 5], false, true)) // [1.264..., 0.632..., 0, 0.632..., 1.264...]
 * ```
 */
export function standardize(
	data: number[],
	sample = true,
	abs = false,
	_mean?: number,
	_std?: number,
): number[] {
	const r: number[] = []
	const m = _mean ?? mean(data)
	const s = _std ?? std(data, sample, m)
	for (let i = 0; i < data.length; i++) {
		r.push(abs ? Math.abs((data[i] - m) / s) : (data[i] - m) / s)
	}
	return r
}
