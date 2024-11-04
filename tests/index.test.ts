import * as pl from '../lib/index.ts'
import { assertAlmostEquals } from 'jsr:@std/assert'



// // Distribution
// console.time('distribution')
// assert.strictEqual(as.z2p(1.96).toFixed(3), '0.975')
// assert.strictEqual(as.z2p(-2.58).toFixed(3), '0.005')
// assert.strictEqual(as.p2z(0.975).toFixed(2), '1.96')
// assert.strictEqual(as.p2z(0.005).toFixed(2), '-2.58')
// assert.strictEqual(as.t2p(0.7, 10).toFixed(3), '0.500')
// assert.strictEqual(as.t2p(0.7, 10, false).toFixed(3), '0.250')
// assert.strictEqual(as.t2p(2.086, 20).toFixed(3), '0.050')
// assert.strictEqual(as.t2p(2.086, 20, false).toFixed(3), '0.025')
// assert.strictEqual(as.t2p(-0.7, 10).toFixed(3), '0.500')
// assert.strictEqual(as.t2p(-0.7, 10, false).toFixed(3), '0.250')
// assert.strictEqual(as.t2p(-2.086, 20).toFixed(3), '0.050')
// assert.strictEqual(as.t2p(-2.086, 20, false).toFixed(3), '0.025')
// assert.strictEqual(as.p2t(0.500, 10).toFixed(2), '0.70')
// assert.strictEqual(as.p2t(0.250, 10, false).toFixed(2), '0.70')
// assert.strictEqual(as.p2t(0.050, 20).toFixed(2), '2.09')
// assert.strictEqual(as.p2t(0.025, 20, false).toFixed(2), '2.09')
// assert.strictEqual(as.f2p(161, 1.0, 1.0, false).toFixed(3), '0.050')
// assert.strictEqual(as.f2p(4.1, 2, 10, false).toFixed(3), '0.050')
// assert.strictEqual(as.f2p(647.8, 1.0, 1.0).toFixed(3), '0.050')
// assert.strictEqual(as.f2p(7.15, 5, 5).toFixed(3), '0.050')
// assert.strictEqual(as.p2f(0.05, 1.0, 1.0, false).toFixed(0), '161')
// assert.strictEqual(as.p2f(0.05, 2, 10, false).toFixed(1), '4.1')
// assert.strictEqual(as.p2f(0.05, 1.0, 1.0).toFixed(1), '647.8')
// assert.strictEqual(as.p2f(0.05, 5, 5).toFixed(2), '7.15')
// console.timeEnd('distribution')

// // Utils
// console.time('utils')
// const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const m = [34, 56, 78, 90, 124, 145, 167, 189, 200, 234]
// const y = [2, 6, 31, 66, 100, 134, 167, 200, 234, 267]
// const kurtosis = ts.kurtosisTest(x)
// const skewness = ts.skewnessTest(x)
// assert.strictEqual(skewness.skewness - 0 < 1e-12, true)
// assert.strictEqual(skewness.z - 0 < 1e-12, true)
// assert.strictEqual(skewness.p.toFixed(3), '1.000')
// assert.strictEqual(typeof kurtosis.kurtosis, 'number')
// assert.strictEqual(typeof kurtosis.z, 'number')
// assert.strictEqual(typeof kurtosis.p, 'number')
// assert.strictEqual(ts.mode([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).toFixed(PERCISION), Number(5.5).toFixed(PERCISION))
// assert.strictEqual(ts.mode([1, 1, 1, 2, 2, 2, 3, 3, 3, 3]).toFixed(PERCISION), Number(3).toFixed(PERCISION))
// console.timeEnd('utils')

// // LinearRegression
// console.time('linearRegression')
// const lr1 = new ts.LinearRegressionOne(x, y)
// const lr2 = new ts.LinearRegressionTwo(x, m, y)
// const lr3 = new ts.LinearRegressionTwo(x, m, y, 'sequential')
// assert.strictEqual(typeof lr1.b0, 'number')
// assert.strictEqual(typeof lr1.b1, 'number')
// assert.strictEqual(typeof lr1.p, 'number')
// assert.strictEqual(lr2.b2 === lr3.b2, true)
// assert.strictEqual(lr2.b1 < lr3.b1, true)
// assert.strictEqual(typeof lr2.p, 'number')
// assert.strictEqual(typeof lr3.p, 'number')
// assert.strictEqual(typeof lr2.b1p, 'number')
// assert.strictEqual(typeof lr3.b1p, 'number')
// assert.strictEqual(typeof lr2.b2p, 'number')
// assert.strictEqual(typeof lr3.b2p, 'number')
// console.timeEnd('linearRegression')

// // Bootstrap
// const B = 1000
// const a = 0.05
// console.time('bootstrap')
// const bs = ts.bootstrapTest(x, m, y, B, a)
// assert.strictEqual(bs.length, 2)
// assert.strictEqual(typeof bs[0], 'number')
// assert.strictEqual(typeof bs[1], 'number')
// console.timeEnd('bootstrap')

// // TTest
// console.time('ttest')
// const ttest1 = new ts.OneSampleTTest(x, 5.5)
// assert.strictEqual(ttest1.t.toFixed(PERCISION), Number(0).toFixed(PERCISION))
// assert.strictEqual(ttest1.p.toFixed(PERCISION), Number(1).toFixed(PERCISION))
// const ttest2 = new ts.TwoSampleTTest(x, m)
// assert.strictEqual(typeof ttest2.t, 'number')
// assert.strictEqual(typeof ttest2.p, 'number')
// assert.strictEqual(ttest2.t < 0, true)
// assert.strictEqual(ttest2.p < 0.05, true)
// const ttest3 = new ts.PeerSampleTTest(x, y)
// assert.strictEqual(typeof ttest3.t, 'number')
// assert.strictEqual(typeof ttest3.p, 'number')
// assert.strictEqual(ttest3.t < 0, true)
// assert.strictEqual(ttest3.p < 0.05, true)
// assert.strictEqual(typeof ttest3.ci[0], 'number')
// assert.strictEqual(typeof ttest3.ci[1], 'number')
// console.timeEnd('ttest')