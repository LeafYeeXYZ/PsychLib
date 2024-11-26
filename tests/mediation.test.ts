import * as pl from '../lib/index.ts'
import { assertAlmostEquals } from 'jsr:@std/assert'
import py from './python.ts'

const N = 200
const B = 1000
const ALPHA = 0.05
const x: number[] = new Array(N).fill(0).map(() => pl.randomNormal(0, 1))
const m: number[] = new Array(N).fill(0).map((_, i) => 0.5 * x[i] + pl.randomNormal(0, 1))
const y: number[] = new Array(N).fill(0).map((_, i) => 0.3 * x[i] + 0.5 * m[i] + pl.randomNormal(0, 1))
Deno.test('Mediation Test', () => {
  // Bootstrap test
  const bootstrap_pl = pl.bootstrapTest('ab', B, ALPHA, x, m, y)
  const bootstrap_py = JSON.parse(py.runPython(`
    import numpy as np
    import pandas as pd
    import statsmodels.api as sm
    import json
    X = np.array(${JSON.stringify(x)})
    M = np.array(${JSON.stringify(m)})
    Y = np.array(${JSON.stringify(y)})
    data = pd.DataFrame({'X': X, 'M': M, 'Y': Y})
    # 定义回归函数
    def regress(X, y):
      X = sm.add_constant(X)  # 添加截距项
      model = sm.OLS(y, X).fit()
      return model
    # Bootstrap 计算间接效应的置信区间
    n_bootstrap = ${B}
    bootstrap_effects = []
    for i in range(n_bootstrap):
      sample = data.sample(frac=1, replace=True)
      model_a_boot = regress(sample['X'], sample['M'])
      a_boot = model_a_boot.params['X']
      model_b_boot = regress(sample[['X', 'M']], sample['Y'])
      b_boot = model_b_boot.params['M']
      bootstrap_effects.append(a_boot * b_boot)
    bootstrap_effects = np.array(bootstrap_effects)
    # 计算间接效应的均值和95%置信区间
    ci_lower = np.percentile(bootstrap_effects, 2.5)
    ci_upper = np.percentile(bootstrap_effects, 97.5)
    json.dumps([ci_lower, ci_upper])
  `))
  assertAlmostEquals(bootstrap_pl[0], bootstrap_py[0], 0.1)
  assertAlmostEquals(bootstrap_pl[1], bootstrap_py[1], 0.1)
  assertAlmostEquals(bootstrap_pl[1] - bootstrap_pl[0], bootstrap_py[1] - bootstrap_py[0], 0.1)
})
