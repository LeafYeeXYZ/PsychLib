import * as pl from '../lib/index.ts'

const getData = (n: number) => new Array(n).fill(0).map(() => Math.random() * 10)

Deno.bench('@psych/lib - n=1000 - Levene Test', () => {
  const levels = Math.floor(Math.random() * 8) + 3
  const group: number[] = new Array(1000).fill(0).map(() => Math.floor(Math.random() * levels))
  const value: number[] = group.map((v) => Math.random() * 10 + v)
  new pl.LeveneTest(value, group)
})
Deno.bench('@psych/lib - n=1000 - One Way Anova', () => {
  const levels = Math.floor(Math.random() * 8) + 3
  const group: number[] = new Array(1000).fill(0).map(() => Math.floor(Math.random() * levels))
  const value: number[] = group.map((v) => Math.random() * 10 + v)
  new pl.OneWayAnova(value, group)
})
Deno.bench('@psych/lib - n=1000 - One Sample T Test', () => { new pl.OneSampleTTest(getData(1000), 0) })
Deno.bench('@psych/lib - n=1000 - Two Sample T Test', () => { new pl.TwoSampleTTest(getData(1000), getData(1000)) })
Deno.bench('@psych/lib - n=1000 - Paired T Test', () => { new pl.PeerSampleTTest(getData(1000), getData(1000)) })
Deno.bench('@psych/lib - n=1000 - Welch T Test', () => { new pl.WelchTTest(getData(1000), getData(1000)) })
Deno.bench('@psych/lib - n=1000 - Pearson Correlation Test', () => { new pl.PearsonCorrTest(getData(1000), getData(1000)) })
Deno.bench('@psych/lib - n=1000 - Linear Regression One', () => { new pl.LinearRegressionOne(getData(1000), getData(1000)) })
Deno.bench('@psych/lib - n=1000 - Linear Regression Two', () => { new pl.LinearRegressionTwo(getData(1000), getData(1000), getData(1000)) })
Deno.bench('@psych/lib - n=100,B=1000 - Bootstrap CI (ab)', () => { pl.bootstrapTest('ab', 1000, 0.05, getData(100), getData(100), getData(100)) })
Deno.bench('@psych/lib - n=100,B=1000 - Bootstrap CI (mean)', () => { pl.bootstrapTest('mean', 1000, 0.05, getData(100), getData(100), getData(100)) })
Deno.bench('@psych/lib - n=100,B=1000 - Bootstrap CI (median)', () => { pl.bootstrapTest('median', 1000, 0.05, getData(100), getData(100), getData(100)) })
