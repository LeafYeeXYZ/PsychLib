import * as pl from '../lib/index.ts'
import py from './python.ts'
import { assertAlmostEquals, assertEquals } from 'jsr:@std/assert'


Deno.test('Linear Regression One/Two Test', () => {
  for (let i = 0; i < 20; i++) {
    const x = new Array(100).fill(0).map(() => Math.random() * 100)
    const m = new Array(100).fill(0).map(() => Math.random() * 100)
    const y = new Array(100).fill(0).map((_, i) => 0.1 * x[i] + 0.2 * m[i] + Math.random() * 200)
    const lr1_pl = new pl.LinearRegressionOne(x, y)
    const lr1_py = JSON.parse(py.runPython(`
      import numpy as np
      from scipy.stats import linregress
      import json
      x = ${JSON.stringify(x)}
      y = ${JSON.stringify(y)}
      result = linregress(x, y)
      json.dumps([result.slope, result.intercept, result.rvalue, result.pvalue])
    `))
    assertAlmostEquals(lr1_pl.b1, lr1_py[0], 1e-6)
    assertAlmostEquals(lr1_pl.b0, lr1_py[1], 1e-6)
    assertAlmostEquals(lr1_pl.r2, lr1_py[2] ** 2, 1e-6)
    assertAlmostEquals(lr1_pl.p, lr1_py[3], 1e-6)
    const lr2_pl = new pl.LinearRegressionTwo(x, m, y)
    const lr2_py = JSON.parse(py.runPython(`
      import numpy as np
      from statsmodels.api import OLS
      import json
      x = ${JSON.stringify(x)}
      m = ${JSON.stringify(m)}
      y = ${JSON.stringify(y)}
      # 添加常数项
      x = np.c_[x, m]
      x = np.c_[np.ones_like(x[:, 0]), x]
      result = OLS(y, x).fit()
      json.dumps([
        result.params.tolist(),
        result.tvalues.tolist(),
        result.pvalues.tolist(),
        result.fvalue,
        result.f_pvalue,
        result.rsquared,
        result.rsquared_adj,
      ])
    `))
    assertAlmostEquals(lr2_pl.b0, lr2_py[0][0], 1e-6)
    assertAlmostEquals(lr2_pl.b1, lr2_py[0][1], 1e-6)
    assertAlmostEquals(lr2_pl.b2, lr2_py[0][2], 1e-6)
    assertAlmostEquals(lr2_pl.b1t!, lr2_py[1][1], 0.1)
    assertAlmostEquals(lr2_pl.b2t!, lr2_py[1][2], 0.1)
    assertAlmostEquals(lr2_pl.b1p, lr2_py[2][1], 0.1)
    assertAlmostEquals(lr2_pl.b2p, lr2_py[2][2], 0.1)
    assertAlmostEquals(lr2_pl.F, lr2_py[3], 1e-6)
    assertAlmostEquals(lr2_pl.p, lr2_py[4], 1e-6)
    assertAlmostEquals(lr2_pl.r2, lr2_py[5], 1e-6)
    assertAlmostEquals(lr2_pl.r2adj, lr2_py[6], 1e-6)
    const lr2seq_pl = new pl.LinearRegressionTwo(x, m, y, 'sequential')
    const lr2seq_py = JSON.parse(py.runPython(`
      import numpy as np
      from statsmodels.api import OLS
      import json
      x = ${JSON.stringify(x)}
      m = ${JSON.stringify(m)}
      y = ${JSON.stringify(y)}
      # 添加常数项
      x1 = np.c_[x]
      x1 = np.c_[np.ones_like(x1[:, 0]), x1]
      x2 = np.c_[x, m]
      x2 = np.c_[np.ones_like(x2[:, 0]), x2]
      result1 = OLS(y, x1).fit()
      result2 = OLS(y, x2).fit()
      b1 = result1.params[1]
      b2 = result2.params[2]
      b0 = np.mean(y) - b1 * np.mean(x) - b2 * np.mean(m)
      r2increase = result2.rsquared - result1.rsquared
      json.dumps([b0, b1, b2, r2increase])
    `))
    assertAlmostEquals(lr2seq_pl.b0, lr2seq_py[0], 1e-6)
    assertAlmostEquals(lr2seq_pl.b1, lr2seq_py[1], 1e-6)
    assertAlmostEquals(lr2seq_pl.b2, lr2seq_py[2], 1e-6)
    assertAlmostEquals(lr2seq_pl.r2increase!, lr2seq_py[3], 1e-1)
    // 注: Python 没有直接算 r2increase 显著性的方法, 后续可以考虑与 R 交叉验证
    assertEquals(!isNaN(lr2seq_pl.b2p), true)
  }
})

Deno.test('Linear Regression Multi Test', () => {
  // 多元线性回归 (10个自变量)
  const x = new Array(100).fill(0).map(() => new Array(10).fill(0).map(() => Math.random()))
  const y = x.map(row => row[0] * 0.1 + row[1] * 0.2 + row[2] * 0.3 + row[3] * 0.4 + row[4] * 0.5 + row[5] * 0.6 + row[6] * 0.7 + row[7] * 0.8 + row[8] * 0.9 + row[9] * 1.0 + Math.random())
  const lr10_pl = new pl.LinearRegression(x, y)
  const lr10_py = JSON.parse(py.runPython(`
    import numpy as np
    from statsmodels.api import OLS
    import json
    x = ${JSON.stringify(x)}
    y = ${JSON.stringify(y)}
    # 添加常数项
    x = np.c_[x]
    x = np.c_[np.ones_like(x[:, 0]), x]
    result = OLS(y, x).fit()
    json.dumps([
      result.params.tolist(),
      result.tvalues.tolist(),
      result.pvalues.tolist(),
      result.fvalue,
      result.f_pvalue,
      result.rsquared,
      result.rsquared_adj,
    ])
  `))
  for (let i = 0; i < 10; i++) {
    assertAlmostEquals(lr10_pl.coefficients[i], lr10_py[0][i], 1e-6)
    assertAlmostEquals(lr10_pl.tValues[i], lr10_py[1][i], 1e-6)
    assertAlmostEquals(lr10_pl.pValues[i], lr10_py[2][i], 1e-6)
  }
  assertAlmostEquals(lr10_pl.F, lr10_py[3], 1e-6)
  assertAlmostEquals(lr10_pl.p, lr10_py[4], 1e-6)
  assertAlmostEquals(lr10_pl.r2, lr10_py[5], 1e-6)
  assertAlmostEquals(lr10_pl.r2adj, lr10_py[6], 1e-6)
})
