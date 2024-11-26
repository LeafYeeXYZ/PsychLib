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
import { z2p, p2f, bootstrapTest } from '@psych/lib'

console.log(z2p(1.96).toFixed(3)) // 0.975
console.log(z2p(-2.58).toFixed(3)) // 0.005
console.log(p2f(0.05, 5, 5).toFixed(2)) // 7.15
console.log(bootstrapTest(
  'ab',
  1000,
  0.05,
  new Array(100).fill(0).map(() => Math.random() * 10),
  new Array(100).fill(0).map(() => Math.random() * 10),
  new Array(100).fill(0).map(() => Math.random() * 10)
)) // [xxx, xxx]: 95% confidence interval of ab (mediation effect)
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
Runtime | Deno 2.1.1 (aarch64-apple-darwin)


benchmark                                                                  time/iter (avg)        iter/s      (min … max)           p75      p99     p995
-------------------------------------------------------------------------- ----------------------------- --------------------- --------------------------
Baseline (Generate Data) - n=500,1 - number after n means generate times            8.3 µs       120,600 (  7.0 µs … 120.4 µs)   8.1 µs  12.2 µs  14.5 µs
Baseline (Generate Data) - n=500,2 - number after n means generate times           25.0 µs        39,950 ( 14.6 µs …   2.5 ms)  21.8 µs 158.5 µs 287.7 µs
Baseline (Generate Data) - n=500,3 - number after n means generate times           33.3 µs        30,020 ( 22.0 µs …   1.5 ms)  34.5 µs 108.0 µs 211.2 µs
Baseline (Generate Group) - n=500 - for ANOVA & Levene test                         9.5 µs       105,300 (  8.0 µs … 388.9 µs)   9.3 µs  13.0 µs  17.4 µs
Baseline (Math.random) - for distribution benchmarks                                3.6 ns   277,200,000 (  3.2 ns …  28.0 ns)   3.6 ns   6.5 ns   9.0 ns
@psych/lib - n=500,1 - Sum                                                          9.6 µs       104,300 (  7.4 µs … 127.1 µs)  11.2 µs  13.0 µs  14.1 µs
@psych/lib - n=500,1 - Mean                                                         9.7 µs       103,500 (  7.5 µs … 107.3 µs)  11.3 µs  13.0 µs  14.3 µs
@psych/lib - n=500,1 - Max                                                          8.8 µs       113,500 (  8.5 µs …  11.2 µs)   8.7 µs  11.2 µs  11.2 µs
@psych/lib - n=500,1 - Min                                                          8.8 µs       113,900 (  8.4 µs …  11.1 µs)   8.7 µs  11.1 µs  11.1 µs
@psych/lib - n=500,1 - Median                                                      31.3 µs        31,910 ( 26.7 µs … 174.5 µs)  32.3 µs  36.5 µs  40.4 µs
@psych/lib - n=500,1 - Mode                                                        53.2 µs        18,790 ( 45.6 µs … 157.9 µs)  54.2 µs  82.7 µs 114.5 µs
@psych/lib - n=500,1 - Quantile                                                    31.6 µs        31,640 ( 27.3 µs … 173.2 µs)  33.8 µs  37.0 µs  39.9 µs
@psych/lib - n=500,1 - Range                                                        9.5 µs       105,700 (  7.6 µs … 111.3 µs)   9.1 µs  13.5 µs  14.1 µs
@psych/lib - n=500,1 - Variance                                                    10.0 µs       100,100 (  8.3 µs … 135.8 µs)   9.2 µs  16.6 µs  16.9 µs
@psych/lib - n=500,1 - Std                                                          9.4 µs       106,400 (  7.7 µs … 108.5 µs)   9.1 µs  12.8 µs  13.0 µs
@psych/lib - n=500,2 - Cov                                                         20.2 µs        49,420 ( 15.3 µs … 137.7 µs)  23.4 µs  25.4 µs  28.5 µs
@psych/lib - n=500,2 - Corr                                                        21.6 µs        46,310 ( 17.0 µs … 139.1 µs)  24.4 µs  33.3 µs  37.2 µs
@psych/lib - n=500,1 - Kurtosis                                                    25.6 µs        39,120 ( 23.0 µs … 184.2 µs)  26.8 µs  30.6 µs  34.2 µs
@psych/lib - n=500,1 - Skewness                                                    25.7 µs        38,870 ( 23.2 µs … 186.2 µs)  26.9 µs  30.7 µs  34.2 µs
@psych/lib - n=500,1 - SS                                                           9.8 µs       102,200 (  7.7 µs … 148.2 µs)   9.1 µs  16.2 µs  16.5 µs
@psych/lib - n=500,2 - SSDiff                                                      20.4 µs        49,070 ( 14.8 µs … 107.5 µs)  25.8 µs  27.9 µs  31.2 µs
@psych/lib - n=500,1 - SEM                                                          9.4 µs       106,600 (  7.8 µs … 119.7 µs)   9.1 µs  12.7 µs  13.0 µs
@psych/lib - n=500,1 - Array.prototype.sort                                        69.5 µs        14,390 ( 60.4 µs … 266.8 µs)  69.6 µs  77.6 µs 135.5 µs
@psych/lib - n=500,1 - Quick Sort                                                  31.8 µs        31,480 ( 27.5 µs … 155.1 µs)  33.5 µs  36.5 µs  39.2 µs
@psych/lib - n=500,1 - Merge Sort                                                  43.8 µs        22,860 ( 37.0 µs … 475.9 µs)  44.8 µs  52.4 µs 101.1 µs
@psych/lib - n=500,1 - Heap Sort                                                   50.1 µs        19,970 ( 43.7 µs … 275.8 µs)  51.2 µs  56.1 µs  59.2 µs
@psych/lib - Z Score to P Value                                                     6.5 ns   154,500,000 (  5.9 ns …  19.0 ns)   6.4 ns   7.3 ns  12.1 ns
@psych/lib - P Value to Z Score                                                    14.8 ns    67,730,000 ( 13.2 ns …  23.7 ns)  14.7 ns  20.4 ns  20.7 ns
@psych/lib - df=30 - T to P Value                                                 113.6 ns     8,800,000 (107.6 ns … 132.1 ns) 116.6 ns 122.8 ns 124.1 ns
@psych/lib - df=30 - P Value to T                                                 489.4 ns     2,043,000 (464.4 ns … 512.6 ns) 501.6 ns 508.2 ns 512.6 ns
@psych/lib - df=5,30 - F to P Value                                                93.9 ns    10,650,000 ( 87.2 ns … 108.3 ns)  94.8 ns 103.2 ns 107.1 ns
@psych/lib - df=5,30 - P Value to F                                               549.7 ns     1,819,000 (519.4 ns … 568.7 ns) 561.3 ns 567.7 ns 568.7 ns
@psych/lib - df=6 - Chi2 to P Value                                                41.8 ns    23,910,000 ( 38.7 ns …  55.0 ns)  41.9 ns  47.3 ns  49.8 ns
@psych/lib - df=6 - P Value to Chi2                                               386.6 ns     2,586,000 (377.2 ns … 411.3 ns) 387.5 ns 411.3 ns 411.3 ns
@psych/lib - n=500 - One Way Anova                                                 26.4 µs        37,870 ( 20.0 µs … 199.2 µs)  28.0 µs  33.7 µs  53.9 µs
@psych/lib - n=500 - Levene Test                                                   60.6 µs        16,500 ( 53.8 µs … 248.1 µs)  61.0 µs  70.3 µs 126.1 µs
@psych/lib - n=500,1 - One Sample KS Test                                          75.8 µs        13,200 ( 66.4 µs … 195.6 µs)  75.6 µs 138.0 µs 142.5 µs
@psych/lib - n=500,1 - One Sample T Test                                           10.5 µs        94,810 (  8.6 µs … 104.7 µs)  10.2 µs  16.6 µs  17.0 µs
@psych/lib - n=500,2 - Two Sample T Test                                           25.7 µs        38,890 ( 17.2 µs … 167.0 µs)  32.5 µs  38.5 µs  45.6 µs
@psych/lib - n=500,2 - Paired T Test                                               23.4 µs        42,700 ( 19.8 µs … 141.9 µs)  26.3 µs  31.4 µs  48.1 µs
@psych/lib - n=500,2 - Welch T Test                                                23.9 µs        41,850 ( 18.8 µs … 117.6 µs)  27.9 µs  33.9 µs  39.8 µs
@psych/lib - n=500,2 - Pearson Correlation Test                                    20.8 µs        48,160 ( 17.8 µs … 130.6 µs)  23.4 µs  32.7 µs  33.7 µs
@psych/lib - n=500,2 - Linear Regression One                                       32.8 µs        30,450 ( 21.2 µs … 199.5 µs)  46.2 µs  49.4 µs  78.9 µs
@psych/lib - n=500,3 - Linear Regression Two                                       67.7 µs        14,770 ( 40.6 µs … 177.2 µs)  72.2 µs  91.8 µs 136.2 µs
@psych/lib - n=500,3,B=5000 - Bootstrap CI (ab)                                    69.1 ms          14.5 ( 64.0 ms …  77.2 ms)  72.7 ms  77.2 ms  77.2 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (mean)                                  38.2 ms          26.2 ( 36.5 ms …  40.1 ms)  38.8 ms  40.1 ms  40.1 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (median)                               143.6 ms           7.0 (142.6 ms … 145.9 ms) 143.8 ms 145.9 ms 145.9 ms
```
