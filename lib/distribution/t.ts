// 预计算的常量
const LOG_SQRT_2PI = Math.log(2 * Math.PI) / 2
const GAMMA_C = [
  0.99999999999980993,
  676.5203681218851,
  -1259.1392167224028,
  771.32342877765313,
  -176.61502916214059,
  12.507343278686905,
  -0.13857109526572012,
  9.9843695780195716e-6,
  1.5056327351493116e-7,
]

function gammaln(x: number): number {
  if (x < 0.5) {
    return LOG_SQRT_2PI - Math.log(Math.sin(Math.PI * x)) - gammaln(1 - x)
  }

  x -= 1
  let t = GAMMA_C[0]
  for (let i = 1; i < 9; i++) {
    t += GAMMA_C[i] / (x + i)
  }

  const tmp = x + 7.5
  return LOG_SQRT_2PI + (x + 0.5) * Math.log(tmp) - tmp + Math.log(t)
}

function betacf(x: number, a: number, b: number): number {
  const fpmin = 1e-30
  const maxIter = 100
  const eps = 3e-7

  const qab = a + b
  const qap = a + 1
  const qam = a - 1

  let c = 1
  let d = 1 - qab * x / qap
  if (Math.abs(d) < fpmin) d = fpmin
  d = 1 / d
  let h = d

  for (let m = 1; m <= maxIter; m++) {
    const m2 = 2 * m
    // 第一次迭代
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2))
    d = 1 + aa * d
    c = 1 + aa / c
    if (Math.abs(d) < fpmin) d = fpmin
    if (Math.abs(c) < fpmin) c = fpmin
    d = 1 / d
    const del = d * c
    h *= del
    // 第二次迭代
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2))
    d = 1 + aa * d
    c = 1 + aa / c
    if (Math.abs(d) < fpmin) d = fpmin
    if (Math.abs(c) < fpmin) c = fpmin
    d = 1 / d
    h *= d * c
    // 提前退出条件
    if (Math.abs(del - 1) < eps && Math.abs(d * c - 1) < eps) break
  }

  return h
}

function ibeta(x: number, a: number, b: number): number {
  if (x <= 0) return 0
  if (x >= 1) return 1

  const bt = Math.exp(
    gammaln(a + b) - gammaln(a) - gammaln(b) +
      a * Math.log(x) + b * Math.log(1 - x),
  )

  const symmetryPoint = (a + 1) / (a + b + 2)
  if (x < symmetryPoint) {
    return bt * betacf(x, a, b) / a
  }
  return 1 - bt * betacf(1 - x, b, a) / b
}

/**
 * Student's t-distribution t value to p value
 * P value is the probability of the |t| to the right tail if twoside is false
 * otherwise, P value is the probability of the -|t| to the left tail and |t| to the right tail
 *
 * 把 t 分布的 t 值转换为显著性概率值 p
 * 即如果是单侧检验，p 值表示 |t| 的右尾概率
 * 如果是双侧检验，p 值表示 -|t| 的左尾概率和 |t| 的右尾概率
 * @param t t value
 * @param df degree of freedom
 * @param twoside two side or not (default is true)
 * @returns p value
 * @throws {Error} degree of freedom must be greater than 0
 */
export function t2p(t: number, df: number, twoside: boolean = true): number {
  if (df <= 0) {
    throw new Error('degree of freedom must be greater than 0')
  }
  const x: number = Math.abs(t)
  if (x === Infinity) {
    return 0
  }
  const p: number = ibeta(
    (x + Math.sqrt(x * x + df)) / (2 * Math.sqrt(x * x + df)),
    df / 2,
    df / 2,
  )
  return twoside ? 2 * (1 - p) : 1 - p
}

/**
 * Student's t-distribution p value to t value
 * P value means the probability of the |t| to the right tail if twoside is false
 * otherwise, P value means the probability of the -|t| to the left tail and |t| to the right tail
 *
 * 把 t 分布的显著性概率值 p 转换为 t 值
 * 即如果是单侧检验，p 值表示 |t| 的右尾概率
 * 如果是双侧检验，p 值表示 -|t| 的左尾概率和 |t| 的右尾概率
 * @param p p value
 * @param df degree of freedom
 * @param twoside two side or not (default is true)
 * @param precision precision (default is 0.00001)
 * @returns t value
 * @throws {Error} p value must be in the range (0, 1)
 * @throws {Error} degree of freedom must be greater than 0
 */
export function p2t(
  p: number,
  df: number,
  twoside: boolean = true,
  precision: number = 0.000001,
): number {
  if (p <= 0 || p >= 1) {
    throw new Error('p value must be in the range (0, 1)')
  }
  if (df <= 0) {
    throw new Error('degree of freedom must be greater than 0')
  }
  let min: number = 0.0
  let max: number = 1000000.0
  let t: number = 0.0
  while (max - min > precision) {
    t = (max + min) / 2
    if (t2p(t, df, twoside) < p) {
      max = t
    } else {
      min = t
    }
  }
  return t
}
