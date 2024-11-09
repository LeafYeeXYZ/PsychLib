import { PartialCorrMatrix } from './partial.ts'
import { ss } from '../base.ts'

/**
 * Kaiser-Meyer-Olkin (KMO) Test
 * 
 * 凯撒-迈尔-奥尔金（KMO）检验
 */
export class KMOTest {
  /**
   * Kaiser-Meyer-Olkin (KMO) Test
   * 
   * 凯撒-迈尔-奥尔金（KMO）检验
   * @param data variables data
   * @returns KMO Test Result
   * @example
   * ```typescript
   * const variable1 = [1, 2, 3, 4, 5]
   * const variable2 = [2, 3, 4, 5, 6]
   * const variable3 = [3, 4, 5, 6, 7]
   * const { kmo } = new KMO(variable1, variable2, variable3)
   * console.log(kmo) // KMO Test Result
   * ```
   * @throws {Error} variables data length should be the same
   */
  constructor(...data: number[][]) {
    const length = data[0].length
    if (data.some((d) => d.length !== length)) {
      throw new Error('variables data length should be the same')
    }
    const { partialCorrMatrix, corrMatrix } = new PartialCorrMatrix(...data)
    this.corrMatrix = corrMatrix
    this.partialCorrMatrix = partialCorrMatrix
    const sumRaw = ss(corrMatrix.flat(), 0)
    const sumPartial = ss(partialCorrMatrix.flat(), 0)
    this.kmo = sumRaw / (sumRaw + sumPartial)
  }
  /**
   * KMO Test Result
   * 
   * KMO 检验结果
   */
  kmo: number
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
