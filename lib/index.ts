/**
 * @module @psych/lib
 * @example Quick start
 * ```typescript
 * import { z2p, p2f, bootstrapTest } from '@psych/lib'
 *
 * console.log(z2p(1.96).toFixed(3)) // 0.975
 * console.log(z2p(-2.58).toFixed(3)) // 0.005
 * console.log(p2f(0.05, 5, 5).toFixed(2)) // 7.15
 * console.log(bootstrapTest(
 *   'ab',
 *   1000,
 *   0.05,
 *   new Array(100).fill(0).map(() => Math.random() * 10),
 *   new Array(100).fill(0).map(() => Math.random() * 10),
 *   new Array(100).fill(0).map(() => Math.random() * 10)
 * )) // [xxx, xxx]: 95% confidence interval of ab (mediation effect)
 * ```
 * @example Use with @psych/sheet
 * ```typescript
 * import { importSheet } from '@psych/sheet'
 * import { WelchTTest } from '@psych/lib'
 * import { readFile } from 'node:fs/promises'
 * import { resolve } from 'node:path'
 * 
 * // Import data from Excel file
 * const filePath = resolve(import.meta.dirname, 'data.xlsx')
 * const fileBuffer = await readFile(filePath)
 * const sheet = await importSheet(fileBuffer)
 * // Get independent and dependent variables
 * const independentVariable = sheet.map((row) => row['independentVariable'])
 * const dependentVariable = sheet.map((row) => row['dependentVariable'])
 * // Perform Welch's t-test
 * const test = new WelchTTest(independentVariable, dependentVariable)
 * console.log(test.t, test.df, test.p)
 * ```
 */

export * from './base.ts'
export * from './regression/index.ts'
export * from './mediation/index.ts'
export * from './ttest/index.ts'
export * from './distribution/index.ts'
export * from './correlation/index.ts'
export * from './anova/index.ts'
export * from './nonparam/index.ts'
