# Introduction

[![JSR Version](https://jsr.io/badges/@psych/lib)](https://jsr.io/@psych/lib) [![JSR Scope](https://jsr.io/badges/@psych)](https://jsr.io/@psych) [![JSR Score](https://jsr.io/badges/@psych/lib/score)](https://jsr.io/@psych/lib/score)

**PsychLib** is a TypeScript library for math, statistics, and data analysis. Featured in psychological and educational research.

- PsychLib can be used in all modern JavaScript/TypeScript environments, including browsers, Node.js, Deno, and Bun.
- For use cases, please refer to my another project [PsychPen](https://github.com/LeafYeeXYZ/PsychPen).

**For full documentation, see <https://jsr.io/@psych/lib/doc>.**

- [Introduction](#introduction)
- [Qiuck Start](#qiuck-start)
- [Development](#development)
- [Benchmark](#benchmark)

# Qiuck Start

```bash
npx jsr add @psych/lib # if using npm
bunx jsr add @psych/lib # if using bun
deno add jsr:@psych/lib # if using deno
pnpm dlx jsr add @psych/lib # if using pnpm
yarn dlx jsr add @psych/lib # if using yarn
```

```typescript
import { randomNormal, WelchTTest } from '@psych/lib'

const groupA = new Array(500).fill(0).map(() => randomNormal(10, 2))
const groupB = new Array(500).fill(0).map(() => randomNormal(11, 2))
const tTest = new WelchTTest(groupA, groupB)
console.log(tTest.t, tTest.df, tTest.p) // Maybe -6.5..., 997.4..., 0.0...
```

**For full documentation, see <https://jsr.io/@psych/lib/doc>.**

# Development

If you haven't installed `deno` yet, please install it referring to the <https://deno.com>. Then, clone this repository.

```bash
git clone https://github.com/LeafYeeXYZ/PsychLib.git
```

Now you can write `TypeScript` code in `/lib/**/*.ts` and export functions in `/lib/index.ts`. Note that you should not import base functions from `/lib/index.ts` to avoid circular dependencies. Instead, you can import them directly from `/lib/base.ts` or `/lib/xxx/index.ts`.

After writing the code, remember to add test cases in `/tests/*.test.ts`. You can run the test cases using the following command.

```bash
deno test -A
```

You can also add benchmark cases in `/benchs/*.bench.ts` and run the benchmark using the following command.

```bash
deno bench -A
```

This project publishes to <https://jsr.io>, so you don't need to compile the code to JavaScript. And you also don't need to publish the package manually. Just modify `deno.json` and push the code to the repository. The `GitHub Action` will do the rest for you.

# Benchmark

```bash
    CPU | Apple M3
Runtime | Deno 2.2.3 (aarch64-apple-darwin)


benchmark                                           time/iter (avg)        iter/s      (min … max)           p75      p99     p995
--------------------------------------------------- ----------------------------- --------------------- --------------------------
sum() - n=500                                              273.9 ns     3,652,000 (270.6 ns … 286.9 ns) 275.3 ns 282.1 ns 286.9 ns
mean() - n=500                                             275.8 ns     3,626,000 (271.3 ns … 303.9 ns) 276.2 ns 292.6 ns 303.9 ns
max() - n=500                                              178.0 ns     5,619,000 (171.9 ns … 197.9 ns) 185.1 ns 192.3 ns 195.9 ns
min() - n=500                                              175.0 ns     5,715,000 (169.4 ns … 194.1 ns) 181.8 ns 186.5 ns 187.2 ns
median() - n=500                                             6.9 µs       144,000 (  6.0 µs …  11.5 µs)   7.0 µs  11.5 µs  11.5 µs
mode() - n=500                                              25.3 µs        39,520 ( 22.0 µs … 121.1 µs)  25.0 µs  49.9 µs  51.1 µs
quantile() - n=500                                           6.4 µs       155,300 (  6.3 µs …   7.2 µs)   6.4 µs   7.2 µs   7.2 µs
range() - n=500                                            358.6 ns     2,788,000 (339.6 ns … 379.9 ns) 366.3 ns 374.8 ns 379.9 ns
vari() - n=500                                             598.7 ns     1,670,000 (591.2 ns … 664.2 ns) 596.0 ns 664.2 ns 664.2 ns
std() - n=500                                              595.3 ns     1,680,000 (591.2 ns … 626.5 ns) 595.2 ns 626.5 ns 626.5 ns
cov() - n=500,2                                            905.5 ns     1,104,000 (895.5 ns … 962.2 ns) 904.6 ns 962.2 ns 962.2 ns
corr() - n=500,2                                             1.5 µs       673,900 (  1.4 µs …   2.2 µs)   1.5 µs   2.2 µs   2.2 µs
kurtosis() - n=500                                           4.6 µs       219,400 (  4.5 µs …   4.6 µs)   4.6 µs   4.6 µs   4.6 µs
skewness() - n=500                                           4.6 µs       219,000 (  4.5 µs …   4.7 µs)   4.6 µs   4.7 µs   4.7 µs
ss() - n=500                                               637.8 ns     1,568,000 (590.7 ns …   2.5 µs) 625.7 ns   2.5 µs   2.5 µs
ssDiff() - n=500,2                                         330.6 ns     3,025,000 (312.1 ns … 344.0 ns) 336.2 ns 341.8 ns 344.0 ns
sem() - n=500                                              597.6 ns     1,673,000 (591.4 ns … 628.6 ns) 596.5 ns 628.6 ns 628.6 ns
Array.prototype.sort() - n=5000                              1.3 ms         764.9 (  1.2 ms …   3.1 ms)   1.3 ms   1.5 ms   1.8 ms
sort() - iterativeQuickSort - n=5000                       121.1 µs         8,258 (106.5 µs … 291.8 µs) 124.3 µs 150.9 µs 159.1 µs
sort() - recursiveQuickSort - n=5000                       149.1 µs         6,707 (130.8 µs … 294.5 µs) 152.8 µs 185.2 µs 205.8 µs
sort() - mergeSort - n=5000                                340.3 µs         2,938 (302.5 µs … 470.2 µs) 344.7 µs 389.3 µs 396.0 µs
sort() - heapSort - n=5000                                 433.5 µs         2,307 (388.4 µs … 596.4 µs) 435.2 µs 504.7 µs 527.8 µs
z2p()                                                        6.5 ns   153,800,000 (  6.3 ns …  16.0 ns)   6.4 ns   9.8 ns  10.1 ns
p2z()                                                       14.8 ns    67,350,000 ( 13.1 ns …  29.7 ns)  14.7 ns  19.8 ns  21.1 ns
t2p() - df=30                                              115.5 ns     8,659,000 (107.0 ns … 125.8 ns) 116.7 ns 124.5 ns 124.8 ns
p2t() - df=30                                              534.8 ns     1,870,000 (493.3 ns … 565.3 ns) 542.0 ns 558.4 ns 565.3 ns
f2p() - df=5,30                                             95.3 ns    10,490,000 ( 87.5 ns … 119.1 ns)  96.2 ns 105.2 ns 107.5 ns
p2f() - df=5,30                                            557.6 ns     1,793,000 (523.5 ns … 574.5 ns) 565.0 ns 574.5 ns 574.5 ns
c2p() - df=6                                                41.5 ns    24,080,000 ( 38.0 ns …  58.3 ns)  41.6 ns  49.3 ns  51.5 ns
p2c() - df=6                                               382.1 ns     2,617,000 (332.8 ns …   3.1 µs) 361.3 ns 820.7 ns   3.1 µs
randomNormal()                                              15.6 ns    64,280,000 ( 13.5 ns …  34.8 ns)  15.7 ns  20.1 ns  21.1 ns
randomT() - df=30                                           74.4 ns    13,440,000 ( 68.3 ns … 101.9 ns)  75.2 ns  83.8 ns  84.6 ns
randomF() - df=5,30                                        115.9 ns     8,630,000 (110.0 ns … 175.7 ns) 116.8 ns 135.0 ns 135.3 ns
randomChi2() - df=6                                         55.9 ns    17,900,000 ( 52.9 ns … 115.5 ns)  56.1 ns  63.9 ns  68.7 ns
KurtosisTest - n=500                                         4.8 µs       207,800 (  4.6 µs …   8.2 µs)   4.7 µs   8.2 µs   8.2 µs
SkewnessTest - n=500                                         4.6 µs       215,600 (  4.6 µs …   4.7 µs)   4.7 µs   4.7 µs   4.7 µs
OneWayAnova - n=500                                          6.6 µs       151,900 (  6.0 µs … 128.6 µs)   6.5 µs   7.8 µs  10.5 µs
PeerAnova - n=500,3iv                                       18.5 µs        54,180 ( 17.3 µs … 150.9 µs)  18.3 µs  23.7 µs  41.4 µs
LeveneTest - n=500                                          21.3 µs        46,890 ( 20.5 µs … 154.2 µs)  21.1 µs  27.2 µs  32.0 µs
OneSampleKSTest - n=500                                     90.0 µs        11,110 ( 87.2 µs … 194.9 µs)  89.2 µs 139.0 µs 145.8 µs
OneSampleTTest - n=500                                       1.6 µs       626,100 (  1.6 µs …   1.8 µs)   1.6 µs   1.8 µs   1.8 µs
TwoSampleTTest - n=500                                       3.0 µs       334,600 (  2.9 µs …   4.3 µs)   3.0 µs   4.3 µs   4.3 µs
PeerSampleTTest - n=500                                      4.0 µs       250,700 (  3.9 µs …   4.0 µs)   4.0 µs   4.0 µs   4.0 µs
WelchTTest - n=500                                           2.2 µs       453,900 (  2.1 µs …   3.3 µs)   2.2 µs   3.3 µs   3.3 µs
PearsonCorrTest - n=500                                      1.8 µs       551,100 (  1.8 µs …   1.9 µs)   1.8 µs   1.9 µs   1.9 µs
bootstrapSample() - n=500,B=5000                            34.2 ms          29.3 ( 32.7 ms …  37.8 ms)  34.8 ms  37.8 ms  37.8 ms
bootstrapTest() - mean - n=500,B=5000                       36.6 ms          27.3 ( 34.5 ms …  40.0 ms)  37.7 ms  40.0 ms  40.0 ms
bootstrapTest() - median - n=500,B=5000                    127.0 ms           7.9 (125.9 ms … 130.1 ms) 127.2 ms 130.1 ms 130.1 ms
bootstrapTest() - ab - n=500,B=5000                         78.3 ms          12.8 ( 75.4 ms …  87.0 ms)  78.1 ms  87.0 ms  87.0 ms
LinearRegressionOne - n=500                                  6.4 µs       156,900 (  4.8 µs … 506.3 µs)   5.2 µs  14.0 µs  14.2 µs
LinearRegressionStandard - n=500,3iv                       107.6 µs         9,298 ( 90.6 µs … 605.9 µs) 115.9 µs 160.3 µs 321.3 µs
LinearRegressionStepwise - n=500,3iv                       829.4 µs         1,206 (738.6 µs …   1.3 ms) 853.6 µs   1.2 ms   1.2 ms
LinearRegressionSequential - n=500,3iv                     311.7 µs         3,208 (268.0 µs … 635.8 µs) 314.2 µs 541.0 µs 572.5 µs
SimpleMediationModel - n=500                                95.3 µs        10,490 ( 82.8 µs … 509.2 µs)  98.7 µs 116.2 µs 223.2 µs
SimpleMediationModel - n=500 - bootstrap (B=5000)          457.0 ms           2.2 (445.8 ms … 460.7 ms) 459.3 ms 460.7 ms 460.7 ms
AlphaRealiability - n=500,3iv                               22.3 µs        44,770 ( 21.3 µs … 273.8 µs)  22.1 µs  24.9 µs  28.3 µs
Matrix.prototype.add() - 50x100                             17.4 µs        57,360 ( 16.9 µs … 356.9 µs)  17.3 µs  19.6 µs  20.7 µs
Matrix.prototype.transpose() - 50x100                       19.9 µs        50,250 ( 19.0 µs … 271.7 µs)  19.9 µs  22.0 µs  23.8 µs
Matrix.prototype.multiply() - 50x100 * 100x50                1.1 ms         936.9 (  1.1 ms …   1.2 ms)   1.1 ms   1.1 ms   1.1 ms
Matrix.prototype.inverse() - 50x50                         453.0 µs         2,208 (444.2 µs … 737.9 µs) 452.3 µs 473.9 µs 500.0 µs
```
