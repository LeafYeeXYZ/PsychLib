/**
 * @module @psych/lib
 * @description PsychLib is a TypeScript library for math, statistics, and data analysis. Featured in psychological and educational research.
 * @example Quick Start
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
 */

export * from './base.ts'
export * from './regression/index.ts'
export * from './mediation/index.ts'
export * from './ttest/index.ts'
export * from './distribution/index.ts'
export * from './correlation/index.ts'
export * from './anova/index.ts'
export * from './nonparam/index.ts'
