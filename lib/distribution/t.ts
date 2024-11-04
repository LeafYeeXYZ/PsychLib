function gammaln(x: number): number {
  const c: number[] = [
    76.18009172947146,
    -86.50532032941677,
    24.01409824083091,
    -1.231739572450155,
    0.001208650973866179,
    -0.000005395239384953,
  ]
  let y: number = x
  let tmp: number = x + 5.5
  tmp -= (x + 0.5) * Math.log(tmp)
  let ser: number = 1.000000000190015
  for (let j: number = 0; j < 6; j++) {
    ser += c[j] / ++y
  }
  return -tmp + Math.log(2.5066282746310005 * ser / x)
}

function ibeta(x: number, a: number, b: number): number {
  const bt: number = (x === 0 || x === 1) ? 0 : Math.exp(
    gammaln(a + b) - gammaln(a) - gammaln(b) + a * Math.log(x) +
      b * Math.log(1 - x),
  )
  if (x < 0 || x > 1) return 0
  if (x < (a + 1) / (a + b + 2)) {
    return bt * betacf(x, a, b) / a
  }
  return 1 - bt * betacf(1 - x, b, a) / b
}

function betacf(x: number, a: number, b: number): number {
  const fpmin: number = 1e-30
  const qab: number = a + b
  const qap: number = a + 1
  const qam: number = a - 1
  let c: number = 1
  let d: number = 1 - qab * x / qap
  if (Math.abs(d) < fpmin) d = fpmin
  d = 1 / d
  let h: number = d
  for (let m: number = 1; m <= 100; m++) {
    const m2: number = 2 * m
    let aa: number = m * (b - m) * x / ((qam + m2) * (a + m2))
    d = 1 + aa * d
    if (Math.abs(d) < fpmin) d = fpmin
    c = 1 + aa / c
    if (Math.abs(c) < fpmin) c = fpmin
    d = 1 / d
    h *= d * c
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2))
    d = 1 + aa * d
    if (Math.abs(d) < fpmin) d = fpmin
    c = 1 + aa / c
    if (Math.abs(c) < fpmin) c = fpmin
    d = 1 / d
    h *= d * c
  }
  return h
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
  precision: number = 0.00001,
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
