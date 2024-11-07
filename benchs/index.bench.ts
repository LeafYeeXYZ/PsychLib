import * as pl from '../lib/index.ts'

const getData = (n: number = 500) => new Array(n).fill(0).map(() => Math.random() * 10)
const getGroup = (n: number = 500) => {
  const levels = Math.floor(Math.random() * 8) + 3
  const group: number[] = new Array(n).fill(0).map(() => Math.floor(Math.random() * levels))
  const value: number[] = group.map((v) => Math.random() * 10 + v)
  return { value, group }
}
const N = 500
// Bases
Deno.bench(`@psych/lib - n=${N} - Sum`, () => { pl.sum(getData()) })
Deno.bench(`@psych/lib - n=${N} - Mean`, () => { pl.mean(getData()) })
Deno.bench(`@psych/lib - n=${N} - Max`, () => { pl.max(getData()) })
Deno.bench(`@psych/lib - n=${N} - Min`, () => { pl.min(getData()) })
Deno.bench(`@psych/lib - n=${N} - Median`, () => { pl.median(getData()) })
Deno.bench(`@psych/lib - n=${N} - Mode`, () => { pl.mode(getData()) })
Deno.bench(`@psych/lib - n=${N} - Quantile`, () => { pl.quantile(getData(), 0.25) })
Deno.bench(`@psych/lib - n=${N} - Range`, () => { pl.range(getData()) })
Deno.bench(`@psych/lib - n=${N} - Variance`, () => { pl.vari(getData()) })
Deno.bench(`@psych/lib - n=${N} - Std`, () => { pl.std(getData()) })
Deno.bench(`@psych/lib - n=${N} - Cov`, () => { pl.cov(getData(), getData()) })
Deno.bench(`@psych/lib - n=${N} - Corr`, () => { pl.corr(getData(), getData()) })
Deno.bench(`@psych/lib - n=${N} - Kurtosis`, () => { pl.kurtosis(getData()) })
Deno.bench(`@psych/lib - n=${N} - Skewness`, () => { pl.skewness(getData()) })
Deno.bench(`@psych/lib - n=${N} - SS`, () => { pl.ss(getData()) })
Deno.bench(`@psych/lib - n=${N} - SSDiff`, () => { pl.ssDiff(getData(), getData()) })
Deno.bench(`@psych/lib - n=${N} - SEM`, () => { pl.sem(getData()) })
Deno.bench(`@psych/lib - n=${N} - Sort`, () => { pl.sort(getData()) })
// Tests
Deno.bench(`@psych/lib - n=${N} - One Way Anova`, () => { const { value, group } = getGroup(); new pl.OneWayAnova(value, group) })
Deno.bench(`@psych/lib - n=${N} - Levene Test`, () => { const { value, group } = getGroup(); new pl.LeveneTest(value, group) })
Deno.bench(`@psych/lib - n=${N} - One Sample KS Test`, () => { new pl.OneSampleKSTest(getData()) })
Deno.bench(`@psych/lib - n=${N} - One Sample T Test`, () => { new pl.OneSampleTTest(getData(), 0) })
Deno.bench(`@psych/lib - n=${N} - Two Sample T Test`, () => { new pl.TwoSampleTTest(getData(), getData()) })
Deno.bench(`@psych/lib - n=${N} - Paired T Test`, () => { new pl.PeerSampleTTest(getData(), getData()) })
Deno.bench(`@psych/lib - n=${N} - Welch T Test`, () => { new pl.WelchTTest(getData(), getData()) })
Deno.bench(`@psych/lib - n=${N} - Pearson Correlation Test`, () => { new pl.PearsonCorrTest(getData(), getData()) })
Deno.bench(`@psych/lib - n=${N} - Linear Regression One`, () => { new pl.LinearRegressionOne(getData(), getData()) })
Deno.bench(`@psych/lib - n=${N} - Linear Regression Two`, () => { new pl.LinearRegressionTwo(getData(), getData(), getData()) })
Deno.bench(`@psych/lib - n=${N},B=1000 - Bootstrap CI (ab)`, () => { pl.bootstrapTest('ab', 1000, 0.05, getData(), getData(), getData()) })
Deno.bench(`@psych/lib - n=${N},B=1000 - Bootstrap CI (mean)`, () => { pl.bootstrapTest('mean', 1000, 0.05, getData(), getData(), getData()) })
Deno.bench(`@psych/lib - n=${N},B=1000 - Bootstrap CI (median)`, () => { pl.bootstrapTest('median', 1000, 0.05, getData(), getData(), getData()) })