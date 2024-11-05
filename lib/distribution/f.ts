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
 * @throws {Error} df1 must be greater than 0
 * @throws {Error} df2 must be greater than 0
 * @throws {Error} f must be greater than or equal to 0
 */
export function f2p(
  f: number,
  df1: number,
  df2: number,
  twoside: boolean = true,
): number {
  if (df1 <= 0) {
    throw new Error('df1 must be greater than 0')
  }
  if (df2 <= 0) {
    throw new Error('df2 must be greater than 0')
  }
  if (f < 0) {
    throw new Error('f must be greater than or equal to 0')
  }
  if (f === 0) return 1
  if (f === Infinity) return 0
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
 * @param precision precision (default is 1e-8)
 * @returns f value
 * @throws {Error} df1 must be greater than 0
 * @throws {Error} df2 must be greater than 0
 */
export function p2f(
  p: number,
  df1: number,
  df2: number,
  twoside: boolean = true,
  precision: number = 1e-8,
): number {
  // 参数验证
  if (df1 <= 0) {
    throw new Error('df1 must be greater than 0')
  }
  if (df2 <= 0) {
    throw new Error('df2 must be greater than 0')
  }
  // 特殊值快速处理
  if (p === 1) return 0
  if (p === 0) return Infinity
  // 处理双侧情况
  const _p = twoside ? p / 2 : p
  // 初始搜索范围
  const maxIter = 100
  let min = 0
  let max = 100
  let f: number
  let pval: number
  // 动态扩展搜索范围
  while (f2p(max, df1, df2, false) > _p) {
    min = max
    max *= 2
  }
  // 二分查找，添加最大迭代限制
  for (let i = 0; i < maxIter; i++) {
    f = (min + max) / 2
    pval = f2p(f, df1, df2, false)
    // 精度满足要求则提前返回
    if (Math.abs(pval - _p) < precision) {
      return f
    }
    if (pval > _p) {
      min = f
    } else {
      max = f
    }
    // 区间收敛检查
    if (Math.abs(max - min) < precision) {
      return (max + min) / 2
    }
  }
  return (max + min) / 2
}
