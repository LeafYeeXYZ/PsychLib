import { Matrix } from 'npm:ml-matrix@6.12.0'

type EFAOptions = {
  /**
   * The number of factors to extract.
   *
   * 要提取的因子数量 (手动指定、特征值大于某个阈值、平行分析(基于主成分分析或因子分析))
   */
  factorCount:
    | { type: 'manual'; count: number }
    | { type: 'eigenvalue'; minEigenvalue: number }
    | { type: 'parallel'; method: 'PCA' | 'FA' }
  /**
   * The method to use for factor extraction.
   *
   * 用于因子提取的方法 (最小残差、最大似然、主轴因子、普通最小二乘、加权最小二乘、广义最小二乘、最小卡方、最小秩)
   */
  method:
    | 'minimumResidual'
    | 'maximumLikelihood'
    | 'principalAxis'
    | 'ordinaryLeastSquares'
    | 'weightedLeastSquares'
    | 'generalizedLeastSquares'
    | 'minimumChisquare'
    | 'minimumRank'
  /**
   * The method to use for rotation.
   *
   * 用于旋转的方法
   */
  rotation:
    | {
      type: 'orthogonal'
      method: 'varimax' | 'quartimax' | 'bentlerT' | 'equamax' | 'geominT'
    }
    | {
      type: 'oblique'
      method:
        | 'promax'
        | 'oblimin'
        | 'simplimax'
        | 'bentlerQ'
        | 'cluster'
        | 'geominQ'
    }
  /**
   * Analysis based on correlation、covariance、multicollinearity/quadrupolarity correlation matrix.
   *
   * 分析是基于相关矩阵、协方差矩阵、多重性/四重性的相关矩阵
   */
  basedOn: 'correlation' | 'covariance' | 'multicollinearity'
  /**
   * Extra data to output.
   *
   * 额外输出的数据
   */
  output: ('KMOTest' | 'BartlettTest' | 'FactorCorrelation')[]
}

const DEFAULT: EFAOptions = {
  factorCount: { type: 'parallel', method: 'PCA' },
  method: 'minimumResidual',
  rotation: { type: 'oblique', method: 'promax' },
  basedOn: 'correlation',
  output: [],
}

export class ExploratoryFactorAnalysis {
  constructor(
    data: number[][],
    options: EFAOptions = DEFAULT,
  ) {
    const rows = data.length
    const cols = data[0].length
    if (rows < 2 || cols < 2) {
      throw new Error('Data too small')
    }
    if (data.some((row) => row.length !== cols)) {
      throw new Error('Data not rectangular')
    }
    const matrix = new Matrix(data)
  }
}
