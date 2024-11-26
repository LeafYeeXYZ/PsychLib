/**
 * @module @psych/lib
 * @example Quick start
 * ```typescript
 * import { randomNormal, WelchTTest } from '@psych/lib'
 * 
 * const groupA = new Array(500).fill(0).map(() => randomNormal(10, 2))
 * const groupB = new Array(500).fill(0).map(() => randomNormal(11, 2))
 * const tTest = new WelchTTest(groupA, groupB)
 * console.log(tTest.t, tTest.df, tTest.p) // Maybe -6.5..., 997.4..., 0.0...
 * ```
 * @example Use with @psych/sheet
 * ```typescript
 * import { importSheet } from '@psych/sheet'
 * import { WelchTTest } from '@psych/lib'
 * import { readFile } from 'node:fs/promises'
 * import { resolve } from 'node:path'
 * 
 * const filePath = resolve(import.meta.dirname, 'data.xlsx')
 * const fileBuffer = await readFile(filePath)
 * const sheet = await importSheet(fileBuffer)
 * 
 * const data = sheet.map((row) => row['data'])
 * const group = sheet.map((row) => row['group'])
 * const groupA = data.filter((_, i) => group[i] === 'A')
 * const groupB = data.filter((_, i) => group[i] === 'B')
 * const tTest = new WelchTTest(groupA, groupB)
 * console.log(tTest.t, tTest.df, tTest.p)
 * ```
 */

export * from './base.ts'
export * from './sort.ts'
export * from './regression/index.ts'
export * from './mediation/index.ts'
export * from './ttest/index.ts'
export * from './distribution/index.ts'
export * from './correlation/index.ts'
export * from './anova/index.ts'
export * from './nonparam/index.ts'
