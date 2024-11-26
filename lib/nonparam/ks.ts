import { max, mean, standardize, std } from '../base.ts'
import { sort } from '../sort.ts'
import { z2p } from '../distribution/index.ts'

/**
 * One-sample Kolmogorov-Smirnov test for Normal distribution
 * **For small sample size, the p-value may not be accurate, please refer to `rejected` and `decide` for decision making**
 *
 * 单样本 Kolmogorov-Smirnov 正态分布检验
 * **对于小样本量，p值可能不准确，请参考 `rejected` 和 `decide` 进行决策**
 * @see https://en.wikipedia.org/wiki/Kolmogorov–Smirnov_test
 */
export class OneSampleKSTest {
  /**
   * One-sample Kolmogorov-Smirnov test for Normal distribution
   * **For small sample size, the p-value may not be accurate, please refer to `rejected` and `decide` for decision making**
   *
   * 单样本 Kolmogorov-Smirnov 正态分布检验
   * **对于小样本量，p值可能不准确，请参考 `rejected` 和 `decide` 进行决策**
   * @param data sample data
   * @returns One-sample Kolmogorov-Smirnov test result
   * @example
   * ```typescript
   * import { OneSampleKSTest } from '@psych/lib'
   * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   * const ks = new OneSampleKSTest(data)
   * console.log(ks.p, ks.d)
   * ```
   */
  constructor(data: number[]) {
    this.count = data.length
    this.mean = mean(data)
    this.std = std(data, true, this.mean)
    // 标准化并排序数据
    const standard = sort(standardize(data, true, false, this.mean, this.std))
    // 计算理论分布函数(标准正态)
    const cdf = standard.map((x) => z2p(x))
    // 同时考虑左右极限的经验分布函数
    const edf1 = standard.map((_, i) => (i + 1) / this.count) // 右极限
    const edf0 = standard.map((_, i) => i / this.count) // 左极限
    // 计算四个差距
    const dplus1 = max(edf1.map((f, i) => f - cdf[i]))
    const dplus0 = max(edf0.map((f, i) => f - cdf[i]))
    const dminus1 = max(cdf.map((f, i) => f - edf1[i]))
    const dminus0 = max(cdf.map((f, i) => f - edf0[i]))
    // 取所有差距中的最大值
    this.d = Math.max(dplus1, dplus0, dminus1, dminus0)
    // 计算渐进p值
    this.p = 2 * Math.exp(-2 * ((Math.sqrt(this.count) * this.d) ** 2))
    // 拒绝原假设
    if (this.count > 50) {
      this.decide = 1.358 / Math.sqrt(this.count)
    } else {
      this.decide = OneSampleKSTest.DECIDE_TABLE.get(this.count)!
    }
    this.rejected = this.d > this.decide
  }
  /**
   * Decision table for small (<=50) sample size (alpha = 0.05)
   *
   * 小样本量 (<=50) 的决策表 (alpha = 0.05)
   */
  static DECIDE_TABLE: Map<number, number> = new Map([
    [1, 0.975],
    [2, 0.842],
    [3, 0.708],
    [4, 0.624],
    [5, 0.563],
    [6, 0.521],
    [7, 0.486],
    [8, 0.457],
    [9, 0.432],
    [10, 0.409],
    [11, 0.391],
    [12, 0.375],
    [13, 0.361],
    [14, 0.349],
    [15, 0.338],
    [16, 0.330],
    [17, 0.320],
    [18, 0.310],
    [19, 0.300],
    [20, 0.294],
    [21, 0.285],
    [22, 0.277],
    [23, 0.270],
    [24, 0.264],
    [25, 0.259],
    [26, 0.254],
    [27, 0.249],
    [28, 0.245],
    [29, 0.241],
    [30, 0.237],
    [31, 0.234],
    [32, 0.231],
    [33, 0.227],
    [34, 0.224],
    [35, 0.221],
    [36, 0.218],
    [37, 0.216],
    [38, 0.213],
    [39, 0.211],
    [40, 0.208],
    [41, 0.206],
    [42, 0.204],
    [43, 0.202],
    [44, 0.200],
    [45, 0.198],
    [46, 0.196],
    [47, 0.195],
    [48, 0.193],
    [49, 0.191],
    [50, 0.190],
  ])
  /**
   * Whether to reject the null hypothesis (p < 0.05)
   *
   * 是否拒绝原假设 (p < 0.05)
   */
  rejected: boolean
  /**
   * Kolmogorov-Smirnov statistic (Standardized)
   *
   * 标准化后的 Kolmogorov-Smirnov 统计量
   */
  d: number
  /**
   * Decision point (alpha = 0.05)
   *
   * 决策点 (alpha = 0.05)
   */
  decide: number
  /**
   * p-value
   *
   * p值
   */
  p: number
  /**
   * Sample size
   *
   * 样本量
   */
  count: number
  /**
   * Sample mean
   *
   * 样本均值
   */
  mean: number
  /**
   * Sample standard deviation
   *
   * 样本标准差
   */
  std: number
}
