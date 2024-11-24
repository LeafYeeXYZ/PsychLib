import { mean, median, sort, sp, ss, std } from '../base.ts'

/**
 * Bootstrap sampling
 *
 * Bootstrap 抽样
 * @param data data to be sampled
 * @param B sampling times
 * @returns bootstrap samples
 * @example
 * ```typescript
 * import { bootstrapSample } from '@psych/lib'
 * bootstrapSample([1, 2, 3], 3)
 * // maybe [[1, 2, 2], [3, 3, 3], [1, 1, 3]]
 */
export function bootstrapSample<T>(data: T[], B: number): T[][] {
  const samples: T[][] = Array.from({ length: B }, () => [])
  const n = data.length
  for (let i = 0; i < B; i++) {
    for (let j = 0; j < n; j++) {
      const r = Math.floor(Math.random() * n)
      samples[i].push(data[r])
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
  const statistic: number[] = []

  if (stat === 'mean') {
    const samples = bootstrapSample(args[0], B)
    for (let i = 0; i < B; i++) {
      statistic.push(mean(samples[i]))
    }

  } else if (stat === 'median') {
    const samples = bootstrapSample(args[0], B)
    for (let i = 0; i < B; i++) {
      statistic.push(median(samples[i]))
    }

  } else if (stat === 'ab') {
    if (args.length !== 3) {
      throw new Error('calculate ab needs three arguments')
    }
    const n = args[0].length
    if (n !== args[1].length || n !== args[2].length) {
      throw new Error('the length of x, m and y must be the same')
    }
    const indexes = Array.from({ length: n }, (_, i) => i)
    const samples = bootstrapSample(indexes, B)
    const x = samples.map((sample) => sample.map((i) => args[0][i]))
    const m = samples.map((sample) => sample.map((i) => args[1][i]))
    const y = samples.map((sample) => sample.map((i) => args[2][i]))
    for (let i = 0; i < B; i++) {
      statistic.push(calculateMediationEffect(x[i], m[i], y[i]))
    }

  } else {
    for (let i = 0; i < B; i++) {
      statistic.push(stat(...args.map((arg) => bootstrapSample(arg, 1)[0])))
    }
  }
  const sorted = sort(statistic)
  const lower = sorted[Math.floor(B * (a / 2))]
  const upper = sorted[Math.floor(B * (1 - a / 2))]
  return [lower, upper]
}

/**
 * Calculate the mediation effect
 * 
 * 计算中介效应 (a * b)
 * @param x independent variable
 * @param m mediator variable
 * @param y dependent variable
 * @returns mediation effect
 * @example
 * ```typescript
 * import { getMediationEffect } from '@psych/lib'
 * const x = Array.from({ length: 200 }, () => Math.random())
 * const m = Array.from({ length: 200 }, (_, i) => 0.5 * x[i] + Math.random())
 * const y = Array.from({ length: 200 }, (_, i) => 0.3 * x[i] + 0.5 * m[i] + Math.random())
 * console.log(getMediationEffect(x, m, y))
 * ```
 */
export function calculateMediationEffect(x: number[], m: number[], y: number[]): number {
  const xm: number = mean(x)
  const mm: number = mean(m)
  const ym: number = mean(y)
  const xstd: number = std(x, true, xm)
  const mstd: number = std(m, true, mm)
  const ssx: number = ss(x, xm)
  const ssm: number = ss(m, mm)
  const spxm: number = sp(x, m, [xm, mm])
  const spxy: number = sp(x, y, [xm, ym])
  const spmy: number = sp(m, y, [mm, ym])
  const a = (spxm / Math.sqrt(ssx * ssm)) * mstd / xstd
  const b = (spmy * ssx - spxy * spxm) / (ssx * ssm - spxm ** 2)
  return a * b
}
