import { sort, mean, ss, std, sp } from '../base.ts'

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
 * Simple mediation model nonparametric Bootstrap test
 *
 * 简单中介效应模型的中介效应非参数 Bootstrap 检验
 * @param x independent variable
 * @param m mediator variable
 * @param y dependent variable
 * @param B sampling times
 * @param a signifiance level
 * @returns confidence interval
 * @example
 * ```typescript
 * import { bootstrapTest } from '@psych/lib'
 * bootstrapTest([1, 2, 3], [4, 5, 6], [7, 8, 9], 1000, 0.05)
 * ```
 * @throws {Error} the length of x, m and y must be the same
 */
export function bootstrapTest(
  x: number[],
  m: number[],
  y: number[],
  B: number,
  a: number,
): number[] {
  if (x.length != m.length || x.length != y.length) {
    throw new Error('the length of x, m and y must be the same')
  }
  const ab: number[] = []
  for (let i = 0; i < B; i++) {
    const [_x, _m, _y] = bootstrapSample(x, m, y)
    ab.push(calculate(_x, _m, _y))
  }
  const sorted = sort(ab)
  const lower = sorted[Math.floor(B * a / 2)]
  const upper = sorted[Math.floor(B * (1 - a / 2))]
  return [lower, upper]
}

function calculate(x: number[], m: number[], y: number[]): number {
  const xm: number = mean(x)
  const mm: number = mean(m)
  const ym: number = mean(y)
  const ssx: number = ss(x, xm)
  const ssm: number = ss(m, mm)
  const stdx: number = std(x, true, xm)
  const stdm: number = std(m, true, mm)
  const spxm: number = sp(x, m, [xm, mm])
  const spxy: number = sp(x, y, [xm, ym])
  const spmy: number = sp(m, y, [mm, ym])
  const c: number = spxm / Math.sqrt(ssx * ssm)
  const a: number = c * stdm / stdx
  const b: number = (spmy * ssx - spxy * spxm) / (ssx * ssm - spxm ** 2)
  return a * b
}
