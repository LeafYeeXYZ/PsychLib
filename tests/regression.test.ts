import { assertAlmostEquals } from 'jsr:@std/assert'
import * as pl from '../lib/index.ts'
import py from './python.ts'

Deno.test('Linear Regression One Test', () => {
	for (let i = 0; i < 20; i++) {
		const x = new Array(100).fill(0).map(() => Math.random() * 100)
		const m = new Array(100).fill(0).map(() => Math.random() * 100)
		const y = new Array(100)
			.fill(0)
			.map((_, i) => 0.1 * x[i] + 0.2 * m[i] + Math.random() * 200)
		const lr1_pl = new pl.LinearRegressionOne(x, y)
		const lr1_py = JSON.parse(
			py.runPython(`
      import numpy as np
      from scipy.stats import linregress
      import json
      x = ${JSON.stringify(x)}
      y = ${JSON.stringify(y)}
      result = linregress(x, y)
      json.dumps([result.slope, result.intercept, result.rvalue, result.pvalue])
    `),
		)
		assertAlmostEquals(lr1_pl.b1, lr1_py[0], 1e-6)
		assertAlmostEquals(lr1_pl.b0, lr1_py[1], 1e-6)
		assertAlmostEquals(lr1_pl.r2, lr1_py[2] ** 2, 1e-6)
		assertAlmostEquals(lr1_pl.p, lr1_py[3], 1e-6)
	}
})

Deno.test('Linear Regression Multi Test', () => {
	// 多元线性回归 (10个自变量)
	const x = new Array(100)
		.fill(0)
		.map(() => new Array(10).fill(0).map(() => Math.random()))
	const y = x.map(
		(row) =>
			row[0] * 0.1 +
			row[1] * 0.2 +
			row[2] * 0.3 +
			row[3] * 0.4 +
			row[4] * 0.5 +
			row[5] * 0.6 +
			row[6] * 0.7 +
			row[7] * 0.8 +
			row[8] * 0.9 +
			row[9] * 1.0 +
			Math.random(),
	)
	const lr10_pl = new pl.LinearRegression(x, y)
	const lr10_py = JSON.parse(
		py.runPython(`
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
  `),
	)
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

Deno.test('Linear Regression Stepwise Test', () => {
	// 逐步回归
	const x = new Array(100)
		.fill(0)
		.map(() => new Array(5).fill(0).map(() => Math.random()))
	const y = x.map(
		(row) =>
			row[0] * 0.1 + row[1] * 0.2 + row[2] * 0.3 + row[3] * 0.4 + row[4] * 0.5 + Math.random(),
	)
	const lr5_pl = new pl.LinearRegressionStepwise(x, y)
	const lr5_py = JSON.parse(
		py.runPython(`
			from statsmodels.api import OLS
			import numpy as np
			import json

			x = ${JSON.stringify(x)}
			y = ${JSON.stringify(y)}

			# Function to perform stepwise regression
			def stepwise_selection(X, y, initial_list=[], threshold_in=0.01, threshold_out=0.05, verbose=False):
				included = list(initial_list)
				while True:
					changed = False
					
					# Forward step
					excluded = list(set(range(X.shape[1])) - set(included))
					new_pval = float("inf")
					new_index = None
					
					for i in excluded:
						candidate = included + [i]
						X_subset = np.column_stack([X[:, j] for j in candidate])
						X_subset = np.column_stack([np.ones(len(y)), X_subset])
						model = OLS(y, X_subset).fit()
						
						# Get p-value for new variable
						if len(included) > 0:
							pval = model.pvalues[len(included) + 1]  # +1 for intercept
						else:
							pval = model.pvalues[1]  # +1 for intercept
							
						if pval < threshold_in and pval < new_pval:
							new_pval = pval
							new_index = i

					if new_index is not None:
						included.append(new_index)
						changed = True
						if verbose:
							print(f'Add variable {new_index}, p-value: {new_pval}')
							
					# Backward step
					model = None
					while True:
						worst_pval = 0
						worst_index = None
						if len(included) > 0:
							X_subset = np.column_stack([X[:, j] for j in included])
							X_subset = np.column_stack([np.ones(len(y)), X_subset])
							model = OLS(y, X_subset).fit()
							
							for i in range(len(included)):
								pval = model.pvalues[i + 1]  # +1 for intercept
								if pval > threshold_out and pval > worst_pval:
									worst_pval = pval
									worst_index = i
									
							if worst_index is not None:
								if verbose:
									print(f'Drop variable {included[worst_index]}, p-value: {worst_pval}')
								del included[worst_index]
								changed = True
							else:
								break
						else:
							break
							
					if not changed:
						break
						
				if len(included) > 0:
					X_subset = np.column_stack([X[:, j] for j in included])
					X_subset = np.column_stack([np.ones(len(y)), X_subset])
					model = OLS(y, X_subset).fit()
				return included, model

			# Convert to numpy array
			X = np.array(x)
			Y = np.array(y)

			# Perform stepwise regression
			selected_vars, model = stepwise_selection(X, Y, verbose=False)

			# Create a model with only selected variables
			X_selected = np.column_stack([X[:, j] for j in selected_vars]) if selected_vars else np.empty((len(y), 0))
			X_selected = np.column_stack([np.ones(len(y)), X_selected])

			final_model = OLS(Y, X_selected).fit()

			# Return the same format as the other tests
			result = [
				final_model.params.tolist(),
				final_model.tvalues.tolist(),
				final_model.pvalues.tolist(),
				final_model.fvalue,
				final_model.f_pvalue,
				final_model.rsquared,
				final_model.rsquared_adj,
			]
			json.dumps(result)
		`)
	)
	for (let i = 0; i < lr5_pl.selectedVariables.length + 1; i++) {
		assertAlmostEquals(lr5_pl.coefficients[i], lr5_py[0][i], 1e-6)
		assertAlmostEquals(lr5_pl.tValues[i], lr5_py[1][i], 1e-6)
		assertAlmostEquals(lr5_pl.pValues[i], lr5_py[2][i], 1e-6)
	}
	assertAlmostEquals(lr5_pl.F, lr5_py[3], 1e-6)
	assertAlmostEquals(lr5_pl.p, lr5_py[4], 1e-6)
	assertAlmostEquals(lr5_pl.r2, lr5_py[5], 1e-6)
	assertAlmostEquals(lr5_pl.r2adj, lr5_py[6], 1e-6)
})
