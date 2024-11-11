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
   * The result indicates the proportion of shared variance among all observed variables
   * Before Factor Analysis, we need at least 0.6 (better 0.8-0.9) of this test
   *
   * 凯撒-迈尔-奥尔金（KMO）检验
   * 结果表示所有观察变量之间共享方差的比例
   * 在因子分析之前，我们需要至少 0.6（最好 0.8-0.9）的 KMO 值
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
