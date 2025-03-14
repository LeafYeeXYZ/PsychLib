import { assertAlmostEquals } from 'jsr:@std/assert'
import * as pl from '../lib/index.ts'
import py from './python.ts'

const x = new Array(1000).fill(0).map(() => Math.random() * 100)
const y = new Array(1000).fill(0).map(() => Math.random() * 101)

Deno.test('TTest Test', () => {
	const ttest_pl = new pl.OneSampleTTest(x, 0)
	const ttest_py = JSON.parse(
		py.runPython(`
    import numpy as np
    from scipy.stats import ttest_1samp
    import json
    x = ${JSON.stringify(x)}
    result = ttest_1samp(x, 0)
    low, high = result.confidence_interval()
    json.dumps([result.statistic.item(), result.pvalue.item(), result.df.item(), [low, high]])
  `),
	)
	assertAlmostEquals(ttest_pl.t, ttest_py[0], 1e-6)
	assertAlmostEquals(ttest_pl.p, ttest_py[1], 1e-6)
	assertAlmostEquals(ttest_pl.df, ttest_py[2], 1e-6)
	assertAlmostEquals(ttest_pl.ci[0], ttest_py[3][0], 1e-6)
	assertAlmostEquals(ttest_pl.ci[1], ttest_py[3][1], 1e-6)
	const ttestp_pl = new pl.PeerSampleTTest(x, y)
	const ttestp_py = JSON.parse(
		py.runPython(`
    import numpy as np
    from scipy.stats import ttest_rel
    import json
    x = ${JSON.stringify(x)}
    y = ${JSON.stringify(y)}
    result = ttest_rel(x, y)
    low, high = result.confidence_interval()
    json.dumps([result.statistic.item(), result.pvalue.item(), result.df.item(), [low, high]])
  `),
	)
	assertAlmostEquals(ttestp_pl.t, ttestp_py[0], 1e-6)
	assertAlmostEquals(ttestp_pl.p, ttestp_py[1], 1e-6)
	assertAlmostEquals(ttestp_pl.df, ttestp_py[2], 1e-6)
	assertAlmostEquals(ttestp_pl.ci[0], ttestp_py[3][0], 1e-6)
	assertAlmostEquals(ttestp_pl.ci[1], ttestp_py[3][1], 1e-6)
	const ttest2_pl = new pl.TwoSampleTTest(x, y)
	const ttest2_py = JSON.parse(
		py.runPython(`
    import numpy as np
    from scipy.stats import ttest_ind
    import json
    x = ${JSON.stringify(x)}
    y = ${JSON.stringify(y)}
    result = ttest_ind(x, y)
    json.dumps([result.statistic, result.pvalue, result.df, result.confidence_interval()])
  `),
	)
	assertAlmostEquals(ttest2_pl.t, ttest2_py[0], 1e-6)
	assertAlmostEquals(ttest2_pl.p, ttest2_py[1], 1e-6)
	assertAlmostEquals(ttest2_pl.df, ttest2_py[2], 1e-6)
	assertAlmostEquals(ttest2_pl.ci[0], ttest2_py[3][0], 1e-6)
	assertAlmostEquals(ttest2_pl.ci[1], ttest2_py[3][1], 1e-6)
	const ttestw_pl = new pl.WelchTTest(x, y)
	const ttestw_py = JSON.parse(
		py.runPython(`
    import numpy as np
    from scipy.stats import ttest_ind
    import json
    x = ${JSON.stringify(x)}
    y = ${JSON.stringify(y)}
    result = ttest_ind(x, y, equal_var=False)
    json.dumps([result.statistic, result.pvalue, result.df, result.confidence_interval()])
  `),
	)
	assertAlmostEquals(ttestw_pl.t, ttestw_py[0], 1e-6)
	assertAlmostEquals(ttestw_pl.p, ttestw_py[1], 1e-6)
	assertAlmostEquals(ttestw_pl.df, ttestw_py[2], 1e-6)
	assertAlmostEquals(ttestw_pl.ci[0], ttestw_py[3][0], 1e-6)
	assertAlmostEquals(ttestw_pl.ci[1], ttestw_py[3][1], 1e-6)
})
