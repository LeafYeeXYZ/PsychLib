import * as pl from '../lib/index.ts'
import py from './python.ts'
import { assertAlmostEquals } from 'jsr:@std/assert'


Deno.test('Reliability Test', () => {
  // Note: CorrReliability and HalfReliability are already tested in base.test.ts (pl.corr)
  for (let i = 0; i < 20; i++) {
    const items = new Array(5).fill(0).map(() => new Array(50).fill(0).map(() => Math.random() * 10))
    const pl_alpha = new pl.AlphaRealiability(items).alpha[0]
    const py_alpha = py.runPython(`
      import numpy as np
      def cronbach_alpha(data):
        k = len(data)
        n = len(data[0])
        total = np.sum(data, axis=0)
        items_variance = np.sum([np.var(item, ddof=1) for item in data])
        total_variance = np.var(total, ddof=1)
        alpha = (k / (k - 1)) * (1 - items_variance / total_variance)
        return alpha
      data = np.array(${JSON.stringify(items)})
      alpha = cronbach_alpha(data)
      alpha
    `)
    assertAlmostEquals(pl_alpha, py_alpha, 1e-6)
  }
})
