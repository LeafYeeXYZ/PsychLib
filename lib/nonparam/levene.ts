import { f2p } from '../distribution/index.ts'
import { sum, median, ss, mean } from '../base.ts'

/**
 * Levene's test for homogeneity of variances
 * 
 * Levene 检验 (用于检验方差齐性)
 * @see https://en.wikipedia.org/wiki/Levene%27s_test
 */
export class LeveneTest {
  /**
   * Levene's test for homogeneity of variances
   * 
   * Levene 检验 (用于检验方差齐性)
   * @param value dependent variable
   * @param group independent variable
   * @param center center method, default is 'mean'
   * @returns Levene's test result
   * @example
   * ```typescript
   * import { LeveneTest } from '@psych/lib'
   * const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   * const group = ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'C']
   * const levene = new LeveneTest(value, group)
   * console.log(levene.p, levene.w)
   * ```
   * @throws {Error} length of value and group should be equal
   * @see https://en.wikipedia.org/wiki/Levene%27s_test
   */
  constructor(
    value: number[],
    group: (string | number)[],
    center: 'mean' | 'median' = 'mean',
  ) {
    const n = value.length
    if (n !== group.length) {
      throw new Error('length of value and group should be equal')
    }
    this.groups = Array.from(new Set(group)).sort((a, b) => a > b ? 1 : -1)
    const k = this.groups.length
    this.center = center
    this.dfT = n - 1
    this.dfB = k - 1
    this.dfW = this.dfT - this.dfB
    this.valuesR = Array.from({ length: k }, () => [])
    this.valuesC = Array.from({ length: k }, () => [])
    for (let i = 0; i < n; i++) {
      const _i = this.groups.indexOf(group[i])
      this.valuesR[_i].push(value[i])
    }
    let _mean = 0
    for (let i = 0; i < k; i++) {
      this.groupsCount.push(this.valuesR[i].length)
      this.groupsMeanR.push(mean(this.valuesR[i]))
      this.groupsMedianR.push(median(this.valuesR[i]))
      const centered = this.valuesR[i].map((v) => Math.abs(v - (center === 'mean' ? this.groupsMeanR[i] : this.groupsMedianR[i])))
      this.valuesC[i] = centered
      _mean += sum(centered)
      this.groupsMeanC.push(mean(centered))
      this.groupsMedianC.push(median(centered))
    }
    _mean /= n // Z..
    const _partA = this.dfW / this.dfB
    let _partBt = 0
    let _partBb = 0
    for (let i = 0; i < k; i++) {
      if (this.center === 'mean') {
        _partBt += this.groupsCount[i] * ((this.groupsMeanC[i] - _mean) ** 2)
        _partBb += ss(this.valuesC[i], this.groupsMeanC[i])
      } else {
        _partBt += this.groupsCount[i] * ((this.groupsMedianC[i] - _mean) ** 2)
        _partBb += ss(this.valuesC[i], this.groupsMedianC[i])
      }
    }
    this.w = _partA * _partBt / _partBb
    this.p = f2p(this.w, this.dfB, this.dfW)
  }
  /**
   * Raw values
   * 
   * 原始数据
   */
  valuesR: number[][]
  /**
   * Centered values
   * 
   * 中心化数据
   */
  valuesC: number[][]
  /**
   * Groups
   * 
   * 分组
   */
  groups: (string | number)[]
  /**
   * Elements count of each group
   * 
   * 每组的数量
   */
  groupsCount: number[] = []
  /**
   * Mean of each group (Raw values)
   * 
   * 每组的均值 (原始数据)
   */
  groupsMeanR: number[] = []
  /**
   * Median of each group (Raw values)
   * 
   * 每组的中位数 (原始数据)
   */
  groupsMedianR: number[] = []
  /**
   * Mean of each group (Centered values)
   * 
   * 每组的均值 (中心化数据)
   */
  groupsMeanC: number[] = []
  /**
   * Median of each group (Centered values)
   * 
   * 每组的中位数 (中心化数据)
   */
  groupsMedianC: number[] = []
  /**
   * Total degrees of freedom
   * 
   * 总自由度
   */
  dfT: number
  /**
   * Between-group degrees of freedom
   * 
   * 处理间自由度
   */
  dfB: number
  /**
   * Within-group degrees of freedom
   * 
   * 处理内自由度
   */
  dfW: number
  /**
   * Center method (default is 'mean')
   * 
   * 中心方法 (默认为 'mean')
   */
  center: 'mean' | 'median'
  /**
   * Levene's test statistic
   * 
   * Levene 检验统计量
   */
  w: number
  /**
   * P-value
   * 
   * P 值
   */
  p: number
}