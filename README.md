# Introduction

[![JSR Version](https://jsr.io/badges/@psych/lib)](https://jsr.io/@psych/lib) [![JSR Scope](https://jsr.io/badges/@psych)](https://jsr.io/@psych) [![JSR Score](https://jsr.io/badges/@psych/lib/score)](https://jsr.io/@psych/lib/score)

**PsychLib** is a TypeScript library for math, statistics, and data analysis. Featured in psychological and educational research.

- PsychLib can be used in all modern JavaScript/TypeScript environments, including browsers, Node.js, Deno, and Bun.
- For use cases, please refer to my another project [PsychPen](https://github.com/LeafYeeXYZ/PsychPen).
- All functions have been tested for consistency with R's psych package and other JavaScript/R statistical libraries.

**For full documentation, see <https://jsr.io/@psych/lib/doc>.**

- [Introduction](#introduction)
- [Qiuck Start](#qiuck-start)
- [Development](#development)
- [Testing](#testing)
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
deno task r:install # only once
deno task r:server
deno task test
```

You can also add benchmark cases in `/benchs/*.bench.ts` and run the benchmark using the following command.

```bash
deno task bench
```

This project publishes to <https://jsr.io>, so you don't need to compile the code to JavaScript. And you also don't need to publish the package manually. Just modify `deno.json` and push the code to the repository. The `GitHub Action` will do the rest for you.

# Testing

| PsychLib Function | Testing Method | Passed | Precision |
| :---: | :---: | :---: | :---: |
| Basic Functions | `JS:simple-statistics` | ✅ | `1e-6` |
| `Matrix` | `JS:ml-matrix` | ✅ | `1e-6` |
| `sort` | `JS:Array.prototype.sort` | ✅ |  |
| `OneSampleTTest` | `R:psych` | ✅ | `1e-4` |
| `TwoSampleTTest` | `R:psych` | ✅ | `1e-4` |
| `PeerSampleTTest` | `R:psych` | ✅ | `1e-4` |
| `WelchTTest` | `R:psych` | ✅ | `1e-4` |
| `AlphaRealiability` | `R:psych` | ✅ | `1e-4` |
| `LeveneTest` | `R:car` | ✅ | `1e-4` |
| `OneSampleKSTest` | `R:stats` | ⚠️ | D: `1e-4`<br>p: `1e-4` (`n >= 100`) / `0.15` (`n < 100`)<br>Reject: `0` |
| `z2p` & `p2z` | `R:stats` | ✅ | `1e-4` |
| `t2p` & `p2t` | `R:stats` | ✅ | `1e-4` |
| `f2p` & `p2f` | `R:stats` | ✅ | `1e-4` |
| `c2p` & `p2c` | `R:stats` | ✅ | `1e-4` |
| `PearsonCorrTest` | `R:stats` | ✅ | `1e-4` |
| Regression | See `tests/regression.test.ts` | ⚠️ WIP |  |
| Mediation | See `tests/mediation.test.ts` | ⚠️ WIP |  |
| ANOVA | See `tests/anova.test.ts` | ⚠️ WIP |  |

> I'm working on migrating all tests to `R`, you can see the progress above.

# Benchmark

```bash
    CPU | Apple M3
Runtime | Deno 2.4.0 (aarch64-apple-darwin)


| benchmark                                           | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| --------------------------------------------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| sum() - n=500                                       |        287.3 ns |     3,480,000 | (270.5 ns … 310.4 ns) | 295.4 ns | 309.4 ns | 310.4 ns |
| mean() - n=500                                      |        284.9 ns |     3,511,000 | (271.1 ns … 311.0 ns) | 295.2 ns | 310.4 ns | 311.0 ns |
| max() - n=500                                       |        193.5 ns |     5,169,000 | (179.8 ns … 204.9 ns) | 196.1 ns | 202.1 ns | 203.9 ns |
| min() - n=500                                       |        183.8 ns |     5,439,000 | (169.7 ns … 198.3 ns) | 185.1 ns | 195.7 ns | 196.6 ns |
| median() - n=500                                    |          6.0 µs |       167,500 | (  5.8 µs …   7.3 µs) |   5.9 µs |   7.3 µs |   7.3 µs |
| mode() - n=500                                      |         24.6 µs |        40,590 | ( 23.2 µs … 103.9 µs) |  24.0 µs |  47.7 µs |  50.5 µs |
| quantile() - n=500                                  |          5.9 µs |       168,200 | (  5.8 µs …   7.3 µs) |   5.9 µs |   7.3 µs |   7.3 µs |
| range() - n=500                                     |        378.2 ns |     2,644,000 | (372.8 ns … 399.6 ns) | 379.9 ns | 399.1 ns | 399.6 ns |
| vari() - n=500                                      |        635.3 ns |     1,574,000 | (598.8 ns … 848.3 ns) | 640.3 ns | 848.3 ns | 848.3 ns |
| std() - n=500                                       |        631.9 ns |     1,582,000 | (592.5 ns … 652.8 ns) | 638.9 ns | 652.8 ns | 652.8 ns |
| cov() - n=500                                       |        961.6 ns |     1,040,000 | (906.8 ns … 995.7 ns) | 968.5 ns | 995.7 ns | 995.7 ns |
| corr() - n=500                                      |          1.6 µs |       633,500 | (  1.5 µs …   3.1 µs) |   1.5 µs |   3.1 µs |   3.1 µs |
| kurtosis() - n=500                                  |          4.5 µs |       222,300 | (  4.5 µs …   4.6 µs) |   4.5 µs |   4.6 µs |   4.6 µs |
| skewness() - n=500                                  |          4.5 µs |       221,100 | (  4.5 µs …   4.7 µs) |   4.5 µs |   4.7 µs |   4.7 µs |
| ss() - n=500                                        |        640.9 ns |     1,560,000 | (610.1 ns … 921.1 ns) | 641.5 ns | 921.1 ns | 921.1 ns |
| ssDiff() - n=500                                    |        339.6 ns |     2,945,000 | (334.7 ns … 514.6 ns) | 339.7 ns | 355.3 ns | 514.6 ns |
| sem() - n=500                                       |        669.6 ns |     1,493,000 | (599.9 ns …   2.4 µs) | 640.5 ns |   2.4 µs |   2.4 µs |
| Array.prototype.sort() - n=5000                     |          1.3 ms |         743.5 | (  1.3 ms …   2.2 ms) |   1.4 ms |   1.6 ms |   1.8 ms |
| sort() - iterativeQuickSort - n=5000                |        124.1 µs |         8,059 | (110.1 µs … 453.8 µs) | 130.8 µs | 185.2 µs | 216.0 µs |
| sort() - recursiveQuickSort - n=5000                |        150.9 µs |         6,627 | (137.5 µs … 326.8 µs) | 152.8 µs | 201.4 µs | 225.2 µs |
| sort() - mergeSort - n=5000                         |        338.1 µs |         2,958 | (317.6 µs … 531.6 µs) | 346.5 µs | 399.7 µs | 417.2 µs |
| sort() - heapSort - n=5000                          |        444.9 µs |         2,248 | (432.9 µs … 575.3 µs) | 446.8 µs | 493.9 µs | 520.6 µs |
| z2p()                                               |          6.5 ns |   154,400,000 | (  6.3 ns …  11.6 ns) |   6.4 ns |   9.1 ns |   9.2 ns |
| p2z()                                               |         14.7 ns |    68,080,000 | ( 14.0 ns …  20.0 ns) |  14.6 ns |  17.3 ns |  17.6 ns |
| t2p() - df=30                                       |        116.4 ns |     8,592,000 | (114.6 ns … 127.1 ns) | 116.5 ns | 121.8 ns | 122.7 ns |
| p2t() - df=30                                       |        560.2 ns |     1,785,000 | (555.8 ns … 584.3 ns) | 560.6 ns | 574.3 ns | 584.3 ns |
| f2p() - df=5,30                                     |         95.0 ns |    10,530,000 | ( 93.7 ns … 108.3 ns) |  95.0 ns |  98.5 ns | 100.0 ns |
| p2f() - df=5,30                                     |        563.5 ns |     1,775,000 | (558.9 ns … 592.5 ns) | 563.8 ns | 592.5 ns | 592.5 ns |
| c2p() - df=6                                        |         41.1 ns |    24,310,000 | ( 40.6 ns …  50.7 ns) |  41.1 ns |  44.3 ns |  44.6 ns |
| p2c() - df=6                                        |        357.6 ns |     2,796,000 | (351.4 ns … 369.7 ns) | 359.5 ns | 366.9 ns | 369.7 ns |
| randomNormal()                                      |         15.9 ns |    63,010,000 | ( 14.4 ns …  21.7 ns) |  15.8 ns |  18.5 ns |  18.6 ns |
| randomT() - df=30                                   |         74.0 ns |    13,510,000 | ( 71.1 ns …  98.2 ns) |  74.4 ns |  77.6 ns |  78.5 ns |
| randomF() - df=5,30                                 |        113.8 ns |     8,788,000 | (109.6 ns … 124.7 ns) | 114.6 ns | 118.4 ns | 118.5 ns |
| randomChi2() - df=6                                 |         55.4 ns |    18,060,000 | ( 52.0 ns …  64.0 ns) |  55.9 ns |  59.3 ns |  59.9 ns |
| KurtosisTest - n=500                                |          4.5 µs |       221,200 | (  4.5 µs …   4.6 µs) |   4.5 µs |   4.6 µs |   4.6 µs |
| SkewnessTest - n=500                                |          4.5 µs |       220,400 | (  4.5 µs …   4.6 µs) |   4.5 µs |   4.6 µs |   4.6 µs |
| OneWayAnova - n=500                                 |          6.6 µs |       151,400 | (  6.3 µs … 109.2 µs) |   6.5 µs |   7.7 µs |  10.5 µs |
| PeerAnova - n=500,3iv                               |         17.9 µs |        55,930 | ( 17.0 µs …  93.0 µs) |  17.8 µs |  24.4 µs |  45.0 µs |
| LeveneTest - n=500                                  |         20.6 µs |        48,660 | ( 19.9 µs … 162.8 µs) |  20.5 µs |  24.8 µs |  27.0 µs |
| OneSampleKSTest - n=500                             |         14.3 µs |        69,710 | ( 13.2 µs … 105.9 µs) |  16.0 µs |  16.9 µs |  18.4 µs |
| OneSampleTTest - n=500                              |          1.6 µs |       616,400 | (  1.6 µs …   2.2 µs) |   1.6 µs |   2.2 µs |   2.2 µs |
| TwoSampleTTest - n=500                              |          2.9 µs |       348,200 | (  2.8 µs …   4.9 µs) |   2.8 µs |   4.9 µs |   4.9 µs |
| PeerSampleTTest - n=500                             |          3.9 µs |       257,800 | (  3.9 µs …   3.9 µs) |   3.9 µs |   3.9 µs |   3.9 µs |
| WelchTTest - n=500                                  |          2.3 µs |       440,500 | (  2.2 µs …   4.2 µs) |   2.2 µs |   4.2 µs |   4.2 µs |
| PearsonCorrTest - n=500                             |          1.8 µs |       546,000 | (  1.8 µs …   1.9 µs) |   1.8 µs |   1.9 µs |   1.9 µs |
| bootstrapSample() - n=500,B=5000                    |         33.9 ms |          29.5 | ( 32.1 ms …  37.5 ms) |  34.4 ms |  37.5 ms |  37.5 ms |
| bootstrapTest() - mean - n=500,B=5000               |         36.4 ms |          27.5 | ( 34.4 ms …  39.5 ms) |  36.9 ms |  39.5 ms |  39.5 ms |
| bootstrapTest() - median - n=500,B=5000             |        125.2 ms |           8.0 | (124.2 ms … 129.0 ms) | 125.5 ms | 129.0 ms | 129.0 ms |
| bootstrapTest() - ab - n=500,B=5000                 |         96.3 ms |          10.4 | ( 73.8 ms … 138.7 ms) | 119.5 ms | 138.7 ms | 138.7 ms |
| LinearRegressionOne - n=500                         |          7.0 µs |       142,900 | (  4.7 µs … 480.5 µs) |  11.4 µs |  12.4 µs |  12.7 µs |
| LinearRegressionStandard - n=500,3iv                |        138.9 µs |         7,200 | (116.4 µs …   1.1 ms) | 137.3 µs | 250.1 µs | 283.2 µs |
| LinearRegressionStepwise - n=500,3iv                |          1.0 ms |         969.8 | (977.4 µs …   1.4 ms) |   1.0 ms |   1.3 ms |   1.3 ms |
| LinearRegressionSequential - n=500,3iv              |        347.1 µs |         2,881 | (322.6 µs … 654.6 µs) | 362.3 µs | 461.9 µs | 485.9 µs |
| SimpleMediationModel - n=500                        |        105.2 µs |         9,502 | (100.5 µs … 373.0 µs) | 105.3 µs | 118.9 µs | 203.4 µs |
| SimpleMediationModel - n=500 - bootstrap (B=5000)   |        580.2 ms |           1.7 | (542.7 ms … 748.5 ms) | 600.2 ms | 748.5 ms | 748.5 ms |
| AlphaRealiability - n=500,3iv                       |         22.3 µs |        44,900 | ( 21.4 µs … 185.8 µs) |  22.2 µs |  24.7 µs |  26.8 µs |
| Matrix.prototype.add() - 50x100                     |         20.4 µs |        49,050 | ( 19.2 µs … 152.5 µs) |  20.5 µs |  22.7 µs |  24.4 µs |
| Matrix.prototype.transpose() - 50x100               |         25.4 µs |        39,400 | ( 24.4 µs … 155.4 µs) |  25.4 µs |  28.2 µs |  30.8 µs |
| Matrix.prototype.multiply() - 50x100 * 100x50       |        944.8 µs |         1,058 | (904.1 µs …   1.0 ms) | 945.4 µs |   1.0 ms |   1.0 ms |
| Matrix.prototype.inverse() - 50x50                  |        458.9 µs |         2,179 | (452.5 µs … 636.7 µs) | 458.8 µs | 481.3 µs | 565.6 µs |
```