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
Runtime | Deno 2.2.1 (aarch64-apple-darwin)


benchmark                                                     time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------------------------------------- ----------------------------- --------------------- --------------------------
Baseline (Generate Data) - n=500,1                                     8.5 µs       117,600 (  6.8 µs …  75.5 µs)   8.3 µs  12.1 µs  15.2 µs
Baseline (Generate Data) - n=500,2                                    17.5 µs        57,160 ( 13.8 µs … 110.2 µs)  18.0 µs  27.9 µs  47.4 µs
Baseline (Generate Data) - n=500,3                                    27.7 µs        36,070 ( 21.1 µs … 108.9 µs)  32.0 µs  54.9 µs  62.9 µs
Baseline (Generate Group) - n=500 - for ANOVA & Levene test           12.5 µs        80,150 (  7.9 µs …   3.3 ms)  10.3 µs  57.4 µs 119.6 µs
Baseline (Math.random) - for distribution benchmarks                   5.3 ns   187,800,000 (  3.4 ns … 442.5 ns)   3.9 ns  37.0 ns  54.1 ns
@psych/lib - n=5000,1 - Array.prototype.sort                         880.8 µs         1,135 (786.0 µs …   1.3 ms) 884.2 µs 996.1 µs   1.0 ms
@psych/lib - n=5000,1 - Iterative Quick Sort                         362.4 µs         2,759 (332.0 µs … 478.6 µs) 372.0 µs 436.2 µs 453.5 µs
@psych/lib - n=5000,1 - Recursive Quick Sort                         389.7 µs         2,566 (357.7 µs … 492.6 µs) 397.9 µs 450.7 µs 476.5 µs
@psych/lib - n=5000,1 - Merge Sort                                   547.2 µs         1,827 (497.2 µs …   1.3 ms) 545.1 µs 653.9 µs 670.2 µs
@psych/lib - n=5000,1 - Heap Sort                                    673.2 µs         1,485 (621.7 µs … 825.1 µs) 675.2 µs 734.9 µs 782.8 µs
@psych/lib - Z Score to P Value                                        4.0 ns   250,200,000 (  3.6 ns …  37.4 ns)   3.9 ns   4.6 ns   9.7 ns
@psych/lib - P Value to Z Score                                       14.8 ns    67,560,000 ( 13.3 ns …  32.7 ns)  14.7 ns  20.0 ns  20.8 ns
@psych/lib - df=30 - T to P Value                                    113.0 ns     8,849,000 (107.7 ns … 127.4 ns) 116.4 ns 125.4 ns 125.6 ns
@psych/lib - df=30 - P Value to T                                    517.1 ns     1,934,000 (493.6 ns … 555.5 ns) 526.8 ns 549.7 ns 555.5 ns
@psych/lib - df=5,30 - F to P Value                                   94.9 ns    10,540,000 ( 87.7 ns … 110.2 ns)  95.6 ns 105.3 ns 106.7 ns
@psych/lib - df=5,30 - P Value to F                                  542.2 ns     1,844,000 (518.9 ns … 568.2 ns) 556.2 ns 563.5 ns 568.2 ns
@psych/lib - df=6 - Chi2 to P Value                                   42.3 ns    23,640,000 ( 38.9 ns …  56.4 ns)  42.5 ns  45.6 ns  52.4 ns
@psych/lib - df=6 - P Value to Chi2                                  343.5 ns     2,911,000 (328.3 ns … 364.9 ns) 355.0 ns 361.8 ns 364.9 ns
@psych/lib - Random Normal Distribution                               15.7 ns    63,670,000 ( 13.4 ns …  30.8 ns)  15.7 ns  17.1 ns  21.9 ns
@psych/lib - df=30 - Random T Distribution                            79.8 ns    12,530,000 ( 71.1 ns …  96.8 ns)  80.5 ns  88.4 ns  89.4 ns
@psych/lib - df=5,30 - Random F Distribution                         117.1 ns     8,537,000 (105.5 ns … 128.0 ns) 118.3 ns 126.9 ns 127.3 ns
@psych/lib - df=6 - Random Chi2 Distribution                          58.0 ns    17,250,000 ( 52.0 ns …  74.6 ns)  58.6 ns  65.9 ns  66.9 ns
@psych/lib - n=500 - Kurtosis Test                                    16.0 µs        62,550 ( 13.8 µs … 171.4 µs)  17.7 µs  18.8 µs  20.5 µs
@psych/lib - n=500 - Skewness Test                                    16.0 µs        62,310 ( 12.7 µs … 188.5 µs)  17.8 µs  19.3 µs  21.0 µs
@psych/lib - n=500 - One Way Anova                                    27.0 µs        36,980 ( 21.3 µs … 180.4 µs)  28.9 µs  33.7 µs  36.6 µs
@psych/lib - n=500,k=3 - RM Anova                                     49.5 µs        20,200 ( 38.6 µs … 198.8 µs)  52.8 µs  62.3 µs 126.2 µs
@psych/lib - n=500 - Levene Test                                      55.5 µs        18,030 ( 48.8 µs … 426.2 µs)  55.9 µs  62.2 µs  67.8 µs
@psych/lib - n=500,1 - One Sample KS Test                            108.5 µs         9,216 ( 94.7 µs … 286.8 µs) 108.8 µs 144.8 µs 201.0 µs
@psych/lib - n=500,1 - One Sample T Test                              10.4 µs        96,140 (  9.1 µs … 147.9 µs)  10.0 µs  15.0 µs  15.6 µs
@psych/lib - n=500,2 - Two Sample T Test                              22.1 µs        45,230 ( 18.1 µs … 162.5 µs)  27.5 µs  30.8 µs  32.9 µs
@psych/lib - n=500,2 - Paired T Test                                  22.7 µs        44,090 ( 18.0 µs … 173.9 µs)  27.5 µs  30.2 µs  32.8 µs
@psych/lib - n=500,2 - Welch T Test                                   21.3 µs        46,880 ( 17.4 µs … 156.2 µs)  27.0 µs  28.9 µs  31.2 µs
@psych/lib - n=500,2 - Pearson Correlation Test                       20.7 µs        48,230 ( 17.0 µs … 169.3 µs)  25.0 µs  28.5 µs  30.4 µs
@psych/lib - n=500,2 - Linear Regression One                          26.7 µs        37,480 ( 20.5 µs … 193.2 µs)  34.4 µs  37.0 µs  40.4 µs
@psych/lib - n=500,3 - Linear Regression Two                          53.4 µs        18,720 ( 39.5 µs … 200.7 µs)  58.4 µs  63.8 µs  74.7 µs
@psych/lib - n=500,3,B=5000 - Bootstrap CI (ab)                       64.6 ms          15.5 ( 61.8 ms …  75.8 ms)  64.6 ms  75.8 ms  75.8 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (mean)                     37.1 ms          26.9 ( 34.9 ms …  41.4 ms)  38.0 ms  41.4 ms  41.4 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (median)                  126.3 ms           7.9 (124.6 ms … 128.2 ms) 127.2 ms 128.2 ms 128.2 ms
@psych/lib - n=500,3 - Cronbach's Alpha                               54.7 µs        18,280 ( 42.3 µs … 606.6 µs)  57.2 µs  63.6 µs  73.2 µs
@psych/lib - 50x100 - Matrix Creation                                 83.4 µs        11,990 ( 73.3 µs … 409.3 µs)  82.2 µs 109.3 µs 129.8 µs
@psych/lib - 50x100 - Matrix Addition                                182.6 µs         5,477 (173.7 µs … 502.3 µs) 180.8 µs 203.8 µs 391.2 µs
@psych/lib - 50x100 - Matrix Transpose                                98.0 µs        10,200 ( 95.1 µs … 393.5 µs)  97.2 µs 105.4 µs 120.5 µs
@psych/lib - 50x100 - Matrix Multiplication                            1.1 ms         900.9 (884.6 µs …   1.5 ms)   1.2 ms   1.2 ms   1.4 ms
@psych/lib - 50x50 - Matrix Inverse                                  510.5 µs         1,959 (489.7 µs …   5.3 ms) 498.3 µs 653.2 µs 790.0 µs
```
