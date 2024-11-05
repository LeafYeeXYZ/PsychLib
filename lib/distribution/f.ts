// 预计算常量
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
  const eps = 3e-7
  const maxIter = 100

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
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2))
    d = 1 + aa * d
    c = 1 + aa / c
    if (Math.abs(d) < fpmin) d = fpmin
    if (Math.abs(c) < fpmin) c = fpmin
    d = 1 / d
    const del = d * c
    h *= del

    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2))
    d = 1 + aa * d
    c = 1 + aa / c
    if (Math.abs(d) < fpmin) d = fpmin
    if (Math.abs(c) < fpmin) c = fpmin
    d = 1 / d
    const delNext = d * c
    h *= delNext

    if (Math.abs(del - 1) < eps && Math.abs(delNext - 1) < eps) break
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
  return x < symmetryPoint
    ? bt * betacf(x, a, b) / a
    : 1 - bt * betacf(1 - x, b, a) / b
}

/**
 * F distribution f value to p value
 * P value is the probability of f value to the right tail if twoside is false
 * otherwise, it is the number above times 2
 *
 * f 分布的 f 值转 p 值
 * 如果是单尾检验，p 值是 f 值右尾的概率
 * 如果是双尾检验，p 值是 f 值右尾概率的两倍
 * @param f f value
 * @param df1 degree of freedom 1
 * @param df2 degree of freedom 2
 * @param twoside two side or not (default is true)
 * @returns p value
 * @throws {Error} f must be greater than 0
 * @throws {Error} df1 must be greater than 0
 * @throws {Error} df2 must be greater than 0
 */
export function f2p(
  f: number,
  df1: number,
  df2: number,
  twoside: boolean = true,
): number {
  if (f <= 0) {
    throw new Error('f must be greater than 0')
  }
  if (df1 <= 0) {
    throw new Error('df1 must be greater than 0')
  }
  if (df2 <= 0) {
    throw new Error('df2 must be greater than 0')
  }
  const x: number = df2 / (df2 + df1 * f)
  const p: number = ibeta(x, df2 / 2, df1 / 2)
  return twoside ? 2 * Math.min(p, 1 - p) : p
}

/**
 * F distribution p value to f value
 * P value is the probability of f value to the right tail if twoside is false
 * otherwise, it is the number above times 2
 *
 * f 分布的 p 值转 f 值
 * 如果是单尾检验，p 值是 f 值右尾的概率
 * 如果是双尾检验，p 值是 f 值右尾概率的两倍
 * @param p p value
 * @param df1 degree of freedom 1
 * @param df2 degree of freedom 2
 * @param twoside two side or not (default is true)
 * @param precision precision (default is 0.00001)
 * @returns f value
 * @throws {Error} p value must be in the range (0, 1)
 * @throws {Error} df1 must be greater than 0
 * @throws {Error} df2 must be greater than 0
 */
export function p2f(
  p: number,
  df1: number,
  df2: number,
  twoside: boolean = true,
  precision: number = 0.000001,
): number {
  if (p <= 0 || p >= 1) {
    throw new Error('p value must be in the range (0, 1)')
  }
  if (df1 <= 0) {
    throw new Error('df1 must be greater than 0')
  }
  if (df2 <= 0) {
    throw new Error('df2 must be greater than 0')
  }
  let min: number = 0.0
  let max: number = 1000000.0
  let f: number = 0.0
  while (max - min > precision) {
    f = (min + max) / 2
    if (f2p(f, df1, df2, twoside) < p) {
      max = f
    } else {
      min = f
    }
  }
  return f
}
