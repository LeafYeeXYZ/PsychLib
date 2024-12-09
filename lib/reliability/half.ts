import { corr, mean } from '../base.ts'

/**
 * Half reliability
 *
 * 分半信度
 */
export class HalfRealiability {
  /**
   * Half reliability
   *
   * 分半信度
   * @param firstHalf first half of the data set
   * @param lastHalf last half of the data set
   * @param group if provided, calculate the reliability between the two halves in each group
   * @example
   * ```typescript
   * const firstHalf = new Array(100).fill(0).map(() => Math.random())
   * const lastHalf = new Array(100).fill(0).map(() => Math.random())
   * const group = new Array(100).fill(0).map(() => Math.random() > 0.5 ? 1 : 0)
   * const result = new HalfRealiability(firstHalf, lastHalf, group)
   * console.log(result)
   * ```
   * @throws {Error} firstHalf, lastHalf and group must have the same length
   * @throws {Error} firstHalf items must have the same length
   * @throws {Error} lastHalf items must have the same length
   */
  constructor(
    firstHalf: number[] | number[][],
    lastHalf: number[] | number[][],
    group?: (number | string)[],
  ) {
    if (Array.isArray(firstHalf[0])) {
      const n = firstHalf[0].length
      if (firstHalf.some((item) => (item as number[]).length !== n)) {
        throw new Error('firstHalf items must have the same length')
      }
      const meanOfItems = new Array(n).fill(0).map((_, i) =>
        mean(firstHalf.map((item) => (item as number[])[i]))
      )
      firstHalf = meanOfItems
    }
    if (Array.isArray(lastHalf[0])) {
      const n = lastHalf[0].length
      if (lastHalf.some((item) => (item as number[]).length !== n)) {
        throw new Error('lastHalf items must have the same length')
      }
      const meanOfItems = new Array(n).fill(0).map((_, i) =>
        mean(lastHalf.map((item) => (item as number[])[i]))
      )
      lastHalf = meanOfItems
    }
    if (
      firstHalf.length !== lastHalf.length ||
      (group && firstHalf.length !== group.length)
    ) {
      throw new Error('firstHalf, lastHalf and group must have the same length')
    }
    if (group) {
      this.group = Array.from(new Set(group)).sort((a, b) =>
        Number(a) - Number(b)
      )
      for (const g of this.group) {
        const _firstHalf = firstHalf.filter((_, i) => group[i] === g)
        const _lastHalf = lastHalf.filter((_, i) => group[i] === g)
        const result = corr(_firstHalf as number[], _lastHalf as number[])
        const r = 2 * result / (1 + result)
        this.r.push(r)
        this.r2.push(r ** 2)
      }
    } else {
      const result = corr(firstHalf as number[], lastHalf as number[])
      const r = 2 * result / (1 + result)
      this.r.push(r)
      this.r2.push(r ** 2)
    }
  }
  /**
   * Groups
   *
   * 分组
   */
  group: (number | string)[] = ['-']
  /**
   * Adjusted correlation coefficient (2 * r / (1 + r))
   *
   * 调整后的相关系数 (2 * r / (1 + r))
   */
  r: number[] = []
  /**
   * Adjusted correlation coefficient squared
   *
   * 调整后的相关系数平方
   */
  r2: number[] = []
}
