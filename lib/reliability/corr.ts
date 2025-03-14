import { corr } from '../base.ts'

/**
 * Corralation between two variables
 *
 * 重测信度/复本信度
 */
export class CorrRealiability {
	/**
	 * Corralation between two variables
	 *
	 * 重测信度/复本信度
	 * @param x1 data set 1
	 * @param x2 data set 2
	 * @param group if provided, calculate the correlation between the two variables in each group
	 * @example
	 * ```typescript
	 * const x1 = new Array(100).fill(0).map(() => Math.random())
	 * const x2 = new Array(100).fill(0).map(() => Math.random())
	 * const group = new Array(100).fill(0).map(() => Math.random() > 0.5 ? 1 : 0)
	 * const result = new CorrRealiability(x1, x2, group)
	 * console.log(result)
	 * ```
	 * @throws {Error} x1, x2 and group must have the same length
	 */
	constructor(x1: number[], x2: number[], group?: (number | string)[]) {
		if (x1.length !== x2.length || (group && x1.length !== group.length)) {
			throw new Error('x1, x2 and group must have the same length')
		}
		if (group) {
			this.group = Array.from(new Set(group)).sort(
				(a, b) => Number(a) - Number(b),
			)
			for (const g of this.group) {
				const _x1 = x1.filter((_, i) => group[i] === g)
				const _x2 = x2.filter((_, i) => group[i] === g)
				const result = corr(_x1, _x2)
				this.r.push(result)
				this.r2.push(result ** 2)
			}
		} else {
			const result = corr(x1, x2)
			this.r.push(result)
			this.r2.push(result ** 2)
		}
	}
	/**
	 * Groups
	 *
	 * 分组
	 */
	group: (number | string)[] = ['-']
	/**
	 * Correlation coefficient
	 *
	 * 相关系数
	 */
	r: number[] = []
	/**
	 * Coefficient of determination
	 *
	 * 决定系数
	 */
	r2: number[] = []
}
