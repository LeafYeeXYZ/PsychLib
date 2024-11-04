import { mean, sort, sp, ss, std } from '../base.ts'

/**
 * Bootstrap sampling
 *
 * Bootstrap 抽样
 * @param x data to be sampled
 * @param m data to be sampled
 * @param y data to be sampled
 * @returns a bootstrap sample
 * @example
 * ```typescript
 * import { bootstrapSample } from 'psych-lib'
 * bootstrapSample([1, 2, 3], [4, 5, 6], [7, 8, 9])
 * // maybe { x: [1, 2, 2], m: [4, 5, 5], y: [7, 8, 8] }
 */
export function bootstrapSample(
  x: number[],
  m: number[],
  y: number[],
): { x: number[]; m: number[]; y: number[] } {
  const xS: number[] = []
  const mS: number[] = []
  const yS: number[] = []
  for (let i = 0; i < x.length; i++) {
    const r = Math.floor(Math.random() * x.length)
    xS.push(x[r])
    mS.push(m[r])
    yS.push(y[r])
  }
  return { x: xS, m: mS, y: yS }
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
    const sample = bootstrapSample(x, m, y)
    ab.push(calculate(sample.x, sample.m, sample.y))
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
