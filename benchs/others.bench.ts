import * as pl from '../lib/index.ts'

const getData = () => new Array(1000).fill(0).map(() => Math.random() * 10)

Deno.bench('@psych/lib - n=1000 - One Way Anova', () => {
  const levels = Math.floor(Math.random() * 8) + 3
  const group: number[] = new Array(1000).fill(0).map(() => Math.floor(Math.random() * levels))
  const value: number[] = group.map((v) => Math.random() * 10 + v)
  new pl.OneWayAnova(value, group)
})
Deno.bench('@psych/lib - n=1000 - One Sample T Test', () => { new pl.OneSampleTTest(getData(), 0) })
Deno.bench('@psych/lib - n=1000 - Two Sample T Test', () => { new pl.TwoSampleTTest(getData(), getData()) })
Deno.bench('@psych/lib - n=1000 - Paired T Test', () => { new pl.PeerSampleTTest(getData(), getData()) })
Deno.bench('@psych/lib - n=1000 - Welch T Test', () => { new pl.WelchTTest(getData(), getData()) })
Deno.bench('@psych/lib - n=1000 - Pearson Correlation Test', () => { new pl.PearsonCorrTest(getData(), getData()) })
Deno.bench('@psych/lib - n=1000 - Linear Regression One', () => { new pl.LinearRegressionOne(getData(), getData()) })
Deno.bench('@psych/lib - n=1000 - Linear Regression Two', () => { new pl.LinearRegressionTwo(getData(), getData(), getData()) })
Deno.bench('@psych/lib - n=1000 - Bootstrap CI (B=1000)', () => { pl.bootstrapTest(getData(), getData(), getData(), 1000, 0.05) })
