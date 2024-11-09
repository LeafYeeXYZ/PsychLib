import { corr } from '../base.ts'
import { Matrix, inverse } from 'npm:ml-matrix@6.12.0'

/**
 * Partial Correlation Matrix (corralation between two variables after removing the effect of other variables)
 * 
 * 偏相关系数矩阵 (去除其他变量影响后两个变量之间的相关性)
 */
export class PartialCorrMatrix {
  /**
   * Partial Correlation Matrix (corralation between two variables after removing the effect of other variables)
   * 
   * 偏相关系数矩阵 (去除其他变量影响后两个变量之间的相关性)
   * @param data variables data
   * @returns Correlation and Partial Correlation Matrix
   * @example
   * ```typescript
   * const variable1 = [1, 2, 3, 4, 5]
   * const variable2 = [2, 3, 4, 5, 6]
   * const variable3 = [3, 4, 5, 6, 7]
   * const { r: partialCorrMatrix } = new PartialCorrMatrix(variable1, variable2, variable3)
   * console.log(r[0][1]) // partial correlation between variable1 and variable2
   * ```
   * @throws {Error} variables data length should be the same
   */
  constructor(...data: number[][]) {
    const length = data[0].length
    if (data.some((d) => d.length !== length)) {
      throw new Error('variables data length should be the same')
    }
    this.corrMatrix = Array.from({ length: data.length }, () => Array.from({ length: data.length }, () => 0))
    for (let i = 0; i < data.length; i++) {
      for (let j = i; j < data.length; j++) {
        this.corrMatrix[i][j] = corr(data[i], data[j])
        this.corrMatrix[j][i] = this.corrMatrix[i][j]
      }
    }
    const invMatrix = inverse(new Matrix(this.corrMatrix))
    this.partialCorrMatrix = Array.from({ length: data.length }, (_, i) => Array.from({ length: data.length }, (_, j) => -invMatrix.get(i, j) / Math.sqrt(invMatrix.get(i, i) * invMatrix.get(j, j))))
  }
  /**
   * Correlation Matrix
   *
   * 相关系数矩阵
   */
  corrMatrix: number[][]
  /**
   * Partial Correlation Matrix
   *
   * 偏相关系数矩阵
   */
  partialCorrMatrix: number[][]
}
