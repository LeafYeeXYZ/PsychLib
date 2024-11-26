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
Baseline (Generate Data) - n=500,1 - number after n means generate times            8.5 µs       117,900 (  7.0 µs … 119.3 µs)   8.3 µs  12.6 µs  16.2 µs
Baseline (Generate Data) - n=500,2 - number after n means generate times           17.8 µs        56,030 ( 14.4 µs …  95.2 µs)  19.2 µs  27.0 µs  61.9 µs
Baseline (Generate Data) - n=500,3 - number after n means generate times           28.6 µs        34,940 ( 21.9 µs … 108.6 µs)  33.8 µs  68.5 µs  77.5 µs
Baseline (Generate Group) - n=500 - for ANOVA & Levene test                         9.8 µs       102,300 (  8.0 µs … 392.2 µs)   9.6 µs  13.4 µs  16.7 µs
Baseline (Math.random) - for distribution benchmarks                                3.9 ns   256,800,000 (  3.2 ns … 163.8 ns)   3.6 ns  10.2 ns  14.4 ns
@psych/lib - n=500,1 - Sum                                                          9.6 µs       104,000 (  7.3 µs … 128.2 µs)  11.1 µs  14.0 µs  14.9 µs
@psych/lib - n=500,1 - Mean                                                         9.5 µs       105,000 (  7.2 µs …  99.2 µs)  11.0 µs  13.4 µs  14.6 µs
@psych/lib - n=500,1 - Max                                                          9.2 µs       108,100 (  8.6 µs …  14.5 µs)   8.8 µs  14.5 µs  14.5 µs
@psych/lib - n=500,1 - Min                                                          8.9 µs       112,900 (  8.6 µs …  11.0 µs)   8.8 µs  11.0 µs  11.0 µs
@psych/lib - n=500,1 - Median                                                      32.0 µs        31,260 ( 27.0 µs … 171.2 µs)  33.7 µs  39.1 µs  43.4 µs
@psych/lib - n=500,1 - Mode                                                        53.3 µs        18,770 ( 45.3 µs … 433.4 µs)  54.2 µs  80.0 µs 122.0 µs
@psych/lib - n=500,1 - Quantile                                                    33.5 µs        29,890 ( 27.1 µs …   1.6 ms)  33.5 µs  64.1 µs 116.2 µs
@psych/lib - n=500,1 - Range                                                        9.6 µs       104,300 (  7.6 µs … 215.7 µs)   9.2 µs  14.1 µs  15.9 µs
@psych/lib - n=500,1 - Variance                                                    10.0 µs       100,200 (  7.5 µs … 128.9 µs)   9.2 µs  17.2 µs  18.8 µs
@psych/lib - n=500,1 - Std                                                          9.4 µs       106,200 (  7.6 µs … 118.0 µs)   9.2 µs  13.0 µs  14.6 µs
@psych/lib - n=500,2 - Cov                                                         20.1 µs        49,630 ( 15.2 µs … 169.2 µs)  22.1 µs  28.8 µs  42.9 µs
@psych/lib - n=500,2 - Corr                                                        21.8 µs        45,790 ( 15.8 µs … 163.7 µs)  24.8 µs  36.2 µs  39.0 µs
@psych/lib - n=500,1 - Kurtosis                                                    26.4 µs        37,930 ( 23.1 µs … 180.0 µs)  27.4 µs  34.0 µs  36.7 µs
@psych/lib - n=500,1 - Skewness                                                    27.9 µs        35,830 ( 23.2 µs …   1.1 ms)  27.8 µs  63.3 µs 115.4 µs
@psych/lib - n=500,1 - SS                                                           9.9 µs       101,400 (  7.6 µs … 146.5 µs)   9.2 µs  16.5 µs  18.2 µs
@psych/lib - n=500,2 - SSDiff                                                      20.4 µs        49,080 ( 14.8 µs … 134.5 µs)  24.5 µs  30.3 µs  35.3 µs
@psych/lib - n=500,1 - SEM                                                          9.5 µs       105,500 (  7.7 µs … 127.5 µs)   9.2 µs  13.1 µs  14.8 µs
@psych/lib - n=500,1 - Array.prototype.sort                                        68.8 µs        14,540 ( 60.0 µs … 170.8 µs)  69.1 µs  85.5 µs 140.9 µs
@psych/lib - n=500,1 - Quick Sort                                                  31.9 µs        31,360 ( 27.2 µs … 157.2 µs)  33.5 µs  39.5 µs  41.2 µs
@psych/lib - n=500,1 - Merge Sort                                                  44.0 µs        22,710 ( 37.9 µs … 487.2 µs)  45.2 µs  59.7 µs 102.0 µs
@psych/lib - n=500,1 - Heap Sort                                                   59.4 µs        16,840 ( 43.9 µs …   2.5 ms)  51.6 µs 275.4 µs 450.1 µs
@psych/lib - Z Score to P Value                                                     8.0 ns   125,500,000 (  6.4 ns … 208.5 ns)   6.6 ns  46.9 ns  69.0 ns
@psych/lib - P Value to Z Score                                                    14.9 ns    66,960,000 ( 13.2 ns …  29.1 ns)  14.8 ns  20.8 ns  21.8 ns
@psych/lib - df=30 - T to P Value                                                 114.7 ns     8,722,000 (107.5 ns … 129.9 ns) 116.4 ns 124.9 ns 125.9 ns
@psych/lib - df=30 - P Value to T                                                 559.5 ns     1,787,000 (525.6 ns … 609.8 ns) 565.9 ns 588.2 ns 609.8 ns
@psych/lib - df=5,30 - F to P Value                                                94.7 ns    10,560,000 ( 87.1 ns … 108.0 ns)  94.7 ns 101.7 ns 107.2 ns
@psych/lib - df=5,30 - P Value to F                                               560.4 ns     1,784,000 (519.5 ns … 567.7 ns) 564.7 ns 567.7 ns 567.7 ns
@psych/lib - df=6 - Chi2 to P Value                                                42.2 ns    23,690,000 ( 39.0 ns …  68.2 ns)  42.5 ns  50.0 ns  55.3 ns
@psych/lib - df=6 - P Value to Chi2                                               403.1 ns     2,481,000 (380.6 ns … 420.5 ns) 411.8 ns 420.1 ns 420.5 ns
@psych/lib - Random Normal Distribution                                            15.8 ns    63,490,000 ( 13.5 ns …  29.3 ns)  15.7 ns  21.3 ns  22.0 ns
@psych/lib - df=30 - Random T Distribution                                        131.1 ns     7,626,000 (121.6 ns … 142.5 ns) 133.3 ns 140.7 ns 141.9 ns
@psych/lib - df=5,30 - Random F Distribution                                      193.6 ns     5,165,000 (179.7 ns … 207.1 ns) 198.8 ns 206.2 ns 206.3 ns
@psych/lib - df=6 - Random Chi2 Distribution                                       95.4 ns    10,480,000 ( 87.5 ns … 106.8 ns)  96.8 ns 103.4 ns 103.8 ns
@psych/lib - n=500 - One Way Anova                                                 26.3 µs        38,080 ( 19.8 µs … 167.0 µs)  27.9 µs  33.5 µs  54.1 µs
@psych/lib - n=500 - Levene Test                                                   60.7 µs        16,460 ( 53.0 µs … 218.5 µs)  61.2 µs  73.6 µs 128.2 µs
@psych/lib - n=500,1 - One Sample KS Test                                          75.9 µs        13,180 ( 66.7 µs … 187.6 µs)  75.5 µs 136.6 µs 143.0 µs
@psych/lib - n=500,1 - One Sample T Test                                           10.5 µs        94,860 (  8.5 µs … 132.9 µs)  10.1 µs  16.8 µs  17.2 µs
@psych/lib - n=500,2 - Two Sample T Test                                           26.1 µs        38,290 ( 17.4 µs … 149.9 µs)  33.2 µs  35.2 µs  40.0 µs
@psych/lib - n=500,2 - Paired T Test                                               23.5 µs        42,640 ( 18.7 µs … 133.3 µs)  26.6 µs  29.9 µs  45.1 µs
@psych/lib - n=500,2 - Welch T Test                                                23.9 µs        41,870 ( 16.8 µs … 125.9 µs)  27.9 µs  35.2 µs  39.1 µs
@psych/lib - n=500,2 - Pearson Correlation Test                                    20.9 µs        47,790 ( 17.0 µs … 127.9 µs)  24.3 µs  33.2 µs  36.0 µs
@psych/lib - n=500,2 - Linear Regression One                                       32.7 µs        30,560 ( 21.3 µs … 126.2 µs)  46.2 µs  49.1 µs  76.2 µs
@psych/lib - n=500,3 - Linear Regression Two                                       67.6 µs        14,800 ( 40.8 µs … 171.2 µs)  72.1 µs  92.5 µs 138.6 µs
@psych/lib - n=500,3,B=5000 - Bootstrap CI (ab)                                    71.1 ms          14.1 ( 65.1 ms …  79.5 ms)  75.2 ms  79.5 ms  79.5 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (mean)                                  38.0 ms          26.3 ( 35.8 ms …  40.7 ms)  38.9 ms  40.7 ms  40.7 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (median)                               144.2 ms           6.9 (143.3 ms … 146.0 ms) 145.0 ms 146.0 ms 146.0 ms
```
