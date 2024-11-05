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
  if (x === Infinity) return 0
  if (x === 0 && twoside) return 1
  if (x === 0 && !twoside) return 0.5
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
 * @param precision precision (default is 1e-8)
 * @returns t value
 * @throws {Error} degree of freedom must be greater than 0
 */
export function p2t(
  p: number,
  df: number,
  twoside: boolean = true,
  precision: number = 1e-8,
): number {
  if (df <= 0) throw new Error('degree of freedom must be greater than 0')
  if (p === 0.5 && twoside) return 0
  if (p === 1) return 0
  if (p === 0) return Infinity
  // 调整p值(单侧转换)
  const _p = twoside ? p / 2 : p
  // 初始搜索范围
  const maxIter = 100
  let min = 0
  let max = 1000
  let mid: number
  let pval: number
  // 扩展搜索范围直到找到合适的区间
  while (t2p(max, df, false) > _p) {
    min = max
    max *= 2
  }
  // 二分查找
  for (let i = 0; i < maxIter; i++) { // 最大迭代次数限制
    mid = (min + max) / 2
    pval = t2p(mid, df, false)
    if (Math.abs(pval - _p) < precision) {
      return mid
    }
    if (pval > _p) {
      min = mid
    } else {
      max = mid
    }
    // 额外的收敛检查
    if (Math.abs(max - min) < precision) {
      return (max + min) / 2
    }
  }
  return (max + min) / 2
}
