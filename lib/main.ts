/**
 * @module
 *
 * TypeScript library that provides APIs for data analysis, especially for psychological and educational research.
 *
 * @example Basic Usage
 *
 * ```typescript
 * import { LinearRegressionOne } from 'jsr:@leaf/psych-lib'
 *
 * const x = [1, 2, 3, 4, 5]
 * const y = [2, 4, 7, 12, 20]
 * const regression = new LinearRegressionOne(x, y)
 * console.log(regression.b0, regression.b1)
 * ```
 */

export * from './base/index.ts'
export * from './regression/index.ts'
