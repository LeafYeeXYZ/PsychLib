import { corr } from '../base.ts'
import { c2p } from '../distribution/index.ts'
import { Matrix, determinant } from 'npm:ml-matrix@6.12.0'

/**
 * Bartlett's Test of Sphericity
 * 
 * 巴特利特球形检验
 */
export class BartlettSphericityTest {
  /**
   * Bartlett's Test of Sphericity  
   * H0: The variables are uncorrelated (The correlation matrix is an identity matrix)  
   * Before Factor Analysis, we need a significant result of this test
   * 
   * 巴特利特球形检验  
   * H0：变量不相关（相关矩阵为单位矩阵）  
   * 在因子分析之前，我们需要这个检验的显著结果  
   * @param data variables data
   * @returns Bartlett's Test Result
   * @example
   * ```typescript
   * const variable1 = [1, 2, 3, 4, 5]
   * const variable2 = [2, 3, 4, 5, 6]
   * const variable3 = [3, 4, 5, 6, 7]
   * const { c, df, p } = new BartlettTest(variable1, variable2, variable3)
   * ```
   * @throws {Error} variables data length should be the same
   */
  constructor(...data: number[][]) {
    const n = data[0].length
    if (data.some((d) => d.length !== n)) {
      throw new Error('variables data length should be the same')
    }
    const p = data.length
    this.df = p * (p - 1) / 2
    const partA = - (n - 1 - (2 * p + 5) / 6)
    this.corrMatrix = Array.from({ length: p }, () => new Array(p).fill(0))
    for (let i = 0; i < p; i++) {
      for (let j = i; j < p; j++) {
        this.corrMatrix[i][j] = (i === j) ? 1 : corr(data[i], data[j])
        this.corrMatrix[j][i] = this.corrMatrix[i][j]
      }
    }
    const partB = Math.log(determinant(new Matrix(this.corrMatrix)))
    this.c = partA * partB
    this.p = c2p(this.c, this.df)
  }
  /**
   * Correlation Matrix
   * 
   * 相关矩阵
   */
  corrMatrix: number[][]
  /**
   * Chi-Square Value
   * 
   * 卡方值
   */
  c: number
  /**
   * Degree of Freedom
   * 
   * 自由度
   */
  df: number
  /**
   * P Value
   * 
   * P 值
   */
  p: number
}
