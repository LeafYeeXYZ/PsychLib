import { mean, median, sort, sp, ss, corr, std } from '../base.ts'

/**
 * Bootstrap sampling
 *
 * Bootstrap 抽样
 * @param args datas to be sampled
 * @returns a bootstrap sample
 * @example
 * ```typescript
 * import { bootstrapSample } from '@psych/lib'
 * bootstrapSample([1, 2, 3], [4, 5, 6], [7, 8, 9])
 * // maybe [[1, 2, 2], [4, 5, 5], [7, 8, 8]]
 */
export function bootstrapSample<T>(...args: T[][]): T[][] {
  const samples: T[][] = Array.from({ length: args[0].length }, () => [])
  for (let i = 0; i < args.length; i++) {
    for (let j = 0; j < args[i].length; j++) {
      const r = Math.floor(Math.random() * args[i].length)
      samples[i].push(args[i][r])
    }
  }
  return samples
}

/**
 * Bootstrap statistic
 * @description mean: mean
 * @description median: median
 * @description ab: mediation effect
 */
export type BootstrapStat = 'mean' | 'median' | 'ab'

/**
 * Bootstrap test (calculate the confidence interval of the statistic)
 *
 * 非参数 Bootstrap 检验 (计算统计量的置信区间)
 * @param stat statistic to be calculated or a function to calculate the statistic
 * @param B sampling times
 * @param a signifiance level
 * @param args datas to be sampled and calculated
 * @returns confidence interval
 * @example
 * ```typescript
 * import { bootstrapTest } from '@psych/lib'
 * bootstrapTest('ab', 1000, 0.05, [1, 2, 3], [4, 5, 6], [7, 8, 9])
 * ```
 * @throws {Error} at least one argument is needed
 * @throws {Error} calculate ab needs three arguments
 * @throws {Error} the length of x, m and y must be the same
 */
export function bootstrapTest(
  stat: BootstrapStat | ((...args: number[][]) => number),
  B: number,
  a: number,
  ...args: number[][]
): number[] {
  if (args.length === 0) {
    throw new Error('at least one argument is needed')
  }
  if (stat === 'mean') {
    stat = mean
  } else if (stat === 'median') {
    stat = (x: number[]) => median(x)
  } else if (stat === 'ab') {
    if (args.length !== 3) {
      throw new Error('calculate ab needs three arguments')
    } else if (
      args[0].length !== args[1].length || args[0].length !== args[2].length
    ) {
      throw new Error('the length of x, m and y must be the same')
    }
    stat = calculateAB
  }
  const statistic: number[] = []
  for (let i = 0; i < B; i++) {
    const sample = bootstrapSample(...args)
    statistic.push(stat(...sample))
  }
  const sorted = sort(statistic)
  const lower = sorted[Math.floor(B * (a / 2))]
  const upper = sorted[Math.floor(B * (1 - a / 2))]
  return [lower, upper]
}

function calculateAB(x: number[], m: number[], y: number[]): number {
  const xm: number = mean(x)
  const mm: number = mean(m)
  const ym: number = mean(y)
  const xstd: number = std(x, true, xm)
  const mstd: number = std(m, true, mm)
  const a = corr(x, m, [xm, mm]) * mstd / xstd
  const spxm: number = sp(x, m, [xm, mm])
  const spxy: number = sp(x, y, [xm, ym])
  const spmy: number = sp(m, y, [mm, ym])
  const ssx: number = ss(x, xm)
  const ssm: number = ss(m, mm)
  const b = (spmy * ssx - spxy * spxm) / (ssx * ssm - spxm ** 2)
  return a * b
}
