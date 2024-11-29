import { sum, vari } from '../base.ts'

/**
 * Homogeneity reliability (Cronbach's alpha)
 * 
 * 同质性信度 (克伦巴赫α系数)
 */
export class AlphaRealiability {
  /**
   * Homogeneity reliability (Cronbach's alpha)
   * 
   * 同质性信度 (克伦巴赫α系数)
   * @param items an 2D array of items, each element in the array is an item with scores
   * @param group if provided, calculate the reliability between the items in each group
   * @example
   * ```typescript
   * const items = [
   *   [1, 2, 3, 4, 5],
   *   [2, 3, 4, 5, 6],
   *   [3, 4, 5, 6, 7]
   * ]
   * const result = new AlphaRealiability(items)
   * console.log(result)
   * ```
   * @throws {Error} items must have at least two items
   * @throws {Error} items and group must have the same length
   */
  constructor(
    items: number[][],
    group?: (number | string)[],
  ) {
    const k = items.length
    if (k < 2) {
      throw new Error('items must have at least two items')
    }
    const n = items[0].length
    if (items.some((item) => item.length !== n) || (group && items.length !== group.length)) {
      throw new Error('items and group must have the same length')
    }
    if (group) {
      this.group = Array.from(new Set(group)).sort((a, b) => Number(a) - Number(b))
      for (const g of this.group) {
        const _items = items.filter((_, i) => group[i] === g)
        const total: number[] = []
        for (let i = 0; i < n; i++) {
          total.push(sum(_items.map((item) => item[i])))
        }
        const itemsVariance = sum(_items.map((item) => vari(item)))
        const totalVariance = vari(total)
        const alpha = (k / (k - 1)) * (1 - itemsVariance / totalVariance)
        this.alpha.push(alpha)
      }
    } else {
      const total: number[] = []
      for (let i = 0; i < n; i++) {
        total.push(sum(items.map((item) => item[i])))
      }
      const itemsVariance = sum(items.map((item) => vari(item)))
      const totalVariance = vari(total)
      const alpha = (k / (k - 1)) * (1 - itemsVariance / totalVariance)
      this.alpha.push(alpha)
    }
  }
  /**
   * Groups
   * 
   * 分组
   */
  group: (number | string)[] = ['-']
  /**
   * Cronbach's alpha
   * 
   * 克伦巴赫α系数
   */
  alpha: number[] = []
}
