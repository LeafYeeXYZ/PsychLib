import * as pl from '../lib/index.ts'

const N = 500
const B = 5000
const MEAN = 10
const STD = 3
const getData = (n: number = N, mean: number = MEAN, std: number = STD) => new Array(n).fill(0).map(() => pl.randomNormal(mean, std))
const getGroup = (n: number = N) => {
  const levels = Math.floor(Math.random() * 8) + 3
  const group: number[] = new Array(n).fill(0).map(() => Math.floor(Math.random() * levels))
  const value: number[] = group.map((v) => Math.random() * 10 + v)
  return { value, group }
}
Deno.bench(`Baseline (Generate Data) - n=${N},1 - number after n means generate times`, () => { getData() })
Deno.bench(`Baseline (Generate Data) - n=${N},2 - number after n means generate times`, () => { getData(); getData() })
Deno.bench(`Baseline (Generate Data) - n=${N},3 - number after n means generate times`, () => { getData(); getData(); getData() })
Deno.bench(`Baseline (Generate Group) - n=${N} - for ANOVA & Levene test`, () => { getGroup() })
Deno.bench(`Baseline (Math.random) - for distribution benchmarks`, () => { Math.random() })
// Bases
Deno.bench(`@psych/lib - n=${N},1 - Sum`, () => { pl.sum(getData()) })
Deno.bench(`@psych/lib - n=${N},1 - Mean`, () => { pl.mean(getData()) })
Deno.bench(`@psych/lib - n=${N},1 - Max`, () => { pl.max(getData()) })
Deno.bench(`@psych/lib - n=${N},1 - Min`, () => { pl.min(getData()) })
Deno.bench(`@psych/lib - n=${N},1 - Median`, () => { pl.median(getData()) })
Deno.bench(`@psych/lib - n=${N},1 - Mode`, () => { pl.mode(getData()) })
Deno.bench(`@psych/lib - n=${N},1 - Quantile`, () => { pl.quantile(getData(), 0.25) })
Deno.bench(`@psych/lib - n=${N},1 - Range`, () => { pl.range(getData()) })
Deno.bench(`@psych/lib - n=${N},1 - Variance`, () => { pl.vari(getData()) })
Deno.bench(`@psych/lib - n=${N},1 - Std`, () => { pl.std(getData()) })
Deno.bench(`@psych/lib - n=${N},2 - Cov`, () => { pl.cov(getData(), getData(N, MEAN + 2, STD + 1)) })
Deno.bench(`@psych/lib - n=${N},2 - Corr`, () => { pl.corr(getData(), getData(N, MEAN + 2, STD + 1)) })
Deno.bench(`@psych/lib - n=${N},1 - Kurtosis`, () => { pl.kurtosis(getData()) })
Deno.bench(`@psych/lib - n=${N},1 - Skewness`, () => { pl.skewness(getData()) })
Deno.bench(`@psych/lib - n=${N},1 - SS`, () => { pl.ss(getData()) })
Deno.bench(`@psych/lib - n=${N},2 - SSDiff`, () => { pl.ssDiff(getData(), getData(N, MEAN + 2, STD + 1)) })
Deno.bench(`@psych/lib - n=${N},1 - SEM`, () => { pl.sem(getData()) })
// Sort
Deno.bench(`@psych/lib - n=${N},1 - Array.prototype.sort`, () => { pl.sort(getData(), true, 'native') })
Deno.bench(`@psych/lib - n=${N},1 - Quick Sort`, () => { pl.sort(getData()) })
Deno.bench(`@psych/lib - n=${N},1 - Merge Sort`, () => { pl.sort(getData(), true, 'mergeSort') })
Deno.bench(`@psych/lib - n=${N},1 - Heap Sort`, () => { pl.sort(getData(), true, 'heapSort') })
// Distributions
Deno.bench(`@psych/lib - Z Score to P Value`, () => { pl.z2p((Math.random() - 0.5) * 10) })
Deno.bench(`@psych/lib - P Value to Z Score`, () => { pl.p2z(Math.random()) })
Deno.bench(`@psych/lib - df=30 - T to P Value`, () => { pl.t2p((Math.random() - 0.5) * 10, 30) })
Deno.bench(`@psych/lib - df=30 - P Value to T`, () => { pl.p2t(Math.random(), 30) })
Deno.bench(`@psych/lib - df=5,30 - F to P Value`, () => { pl.f2p(Math.random() * 10, 5, 30) })
Deno.bench(`@psych/lib - df=5,30 - P Value to F`, () => { pl.p2f(Math.random(), 5, 30) })
Deno.bench(`@psych/lib - df=6 - Chi2 to P Value`, () => { pl.c2p(Math.random() * 10, 6) })
Deno.bench(`@psych/lib - df=6 - P Value to Chi2`, () => { pl.p2c(Math.random(), 6) })
// Tests
Deno.bench(`@psych/lib - n=${N} - One Way Anova`, () => { const { value, group } = getGroup(); new pl.OneWayAnova(value, group) })
Deno.bench(`@psych/lib - n=${N} - Levene Test`, () => { const { value, group } = getGroup(); new pl.LeveneTest(value, group) })
Deno.bench(`@psych/lib - n=${N},1 - One Sample KS Test`, () => { new pl.OneSampleKSTest(getData()) })
Deno.bench(`@psych/lib - n=${N},1 - One Sample T Test`, () => { new pl.OneSampleTTest(getData(), 0) })
Deno.bench(`@psych/lib - n=${N},2 - Two Sample T Test`, () => { new pl.TwoSampleTTest(getData(), getData(N, MEAN + 2, STD + 1)) })
Deno.bench(`@psych/lib - n=${N},2 - Paired T Test`, () => { new pl.PeerSampleTTest(getData(), getData(N, MEAN + 2, STD + 1)) })
Deno.bench(`@psych/lib - n=${N},2 - Welch T Test`, () => { new pl.WelchTTest(getData(), getData(N, MEAN + 2, STD + 1)) })
Deno.bench(`@psych/lib - n=${N},2 - Pearson Correlation Test`, () => { new pl.PearsonCorrTest(getData(), getData(N, MEAN + 2, STD + 1)) })
Deno.bench(`@psych/lib - n=${N},2 - Linear Regression One`, () => { new pl.LinearRegressionOne(getData(), getData(N, MEAN + 2, STD + 1)) })
Deno.bench(`@psych/lib - n=${N},3 - Linear Regression Two`, () => { new pl.LinearRegressionTwo(getData(), getData(N, MEAN + 2, STD + 1), getData(N, MEAN + 4, STD + 2)) })
Deno.bench(`@psych/lib - n=${N},3,B=${B} - Bootstrap CI (ab)`, () => { pl.bootstrapTest('ab', B, 0.05, getData(), getData(N, MEAN + 2, STD + 1), getData(N, MEAN + 4, STD + 2)) })
Deno.bench(`@psych/lib - n=${N},3,B=${B} - Bootstrap CI (mean)`, () => { pl.bootstrapTest('mean', B, 0.05, getData(), getData(N, MEAN + 2, STD + 1), getData(N, MEAN + 4, STD + 2)) })
Deno.bench(`@psych/lib - n=${N},3,B=${B} - Bootstrap CI (median)`, () => { pl.bootstrapTest('median', B, 0.05, getData(), getData(N, MEAN + 2, STD + 1), getData(N, MEAN + 4, STD + 2)) })
