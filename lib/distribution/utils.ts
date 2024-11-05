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

export function lowRegGamma(s: number, z: number): number {
  const EPSILON = 1e-8
  let sum = 1 / s
  let value = sum
  for (let n = 1; n < 100; n++) {
    sum *= z / (s + n)
    value += sum
    if (sum < EPSILON) break
  }
  return value * Math.exp(-z + s * Math.log(z) - gammaln(s))
}

export function gammaln(x: number): number {
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

export function betacf(x: number, a: number, b: number): number {
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
    const delNext = d * c
    h *= delNext
    // 提前退出条件
    if (Math.abs(del - 1) < eps && Math.abs(delNext - 1) < eps) break
  }
  return h
}

export function ibeta(x: number, a: number, b: number): number {
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
