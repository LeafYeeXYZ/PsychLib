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


benchmark                                                     time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------------------------------------- ----------------------------- --------------------- --------------------------
Baseline (Generate Data) - n=500,1                                     8.7 µs       115,200 (  6.9 µs …  85.5 µs)   8.3 µs  12.6 µs  15.9 µs
Baseline (Generate Data) - n=500,2                                    18.0 µs        55,480 ( 14.0 µs …  92.2 µs)  19.0 µs  27.8 µs  47.4 µs
Baseline (Generate Data) - n=500,3                                    28.4 µs        35,270 ( 21.3 µs …  97.6 µs)  34.1 µs  54.5 µs  65.1 µs
Baseline (Generate Group) - n=500 - for ANOVA & Levene test            9.3 µs       107,900 (  8.3 µs …  83.8 µs)   8.9 µs  13.3 µs  40.8 µs
Baseline (Math.random) - for distribution benchmarks                   3.9 ns   258,900,000 (  3.7 ns …  14.9 ns)   3.8 ns   7.0 ns   7.1 ns
@psych/lib - n=5000,1 - Array.prototype.sort                         878.9 µs         1,138 (838.3 µs …   1.1 ms) 881.5 µs 975.8 µs   1.0 ms
@psych/lib - n=5000,1 - Iterative Quick Sort                         371.8 µs         2,690 (336.3 µs … 503.3 µs) 374.6 µs 440.1 µs 455.2 µs
@psych/lib - n=5000,1 - Recursive Quick Sort                         401.6 µs         2,490 (363.4 µs … 511.5 µs) 404.0 µs 476.0 µs 481.2 µs
@psych/lib - n=5000,1 - Merge Sort                                   547.2 µs         1,828 (495.3 µs …   1.3 ms) 543.2 µs 653.8 µs 665.1 µs
@psych/lib - n=5000,1 - Heap Sort                                    678.1 µs         1,475 (624.7 µs … 860.4 µs) 677.1 µs 781.7 µs 797.6 µs
@psych/lib - Z Score to P Value                                        4.0 ns   247,900,000 (  3.8 ns …  41.6 ns)   4.0 ns   4.8 ns   9.8 ns
@psych/lib - P Value to Z Score                                       14.8 ns    67,600,000 ( 14.1 ns …  28.9 ns)  14.7 ns  19.8 ns  21.3 ns
@psych/lib - df=30 - T to P Value                                    115.7 ns     8,642,000 (107.3 ns … 131.1 ns) 116.0 ns 126.5 ns 130.4 ns
@psych/lib - df=30 - P Value to T                                    533.9 ns     1,873,000 (507.5 ns … 555.3 ns) 538.7 ns 552.2 ns 555.3 ns
@psych/lib - df=5,30 - F to P Value                                   95.2 ns    10,500,000 ( 87.5 ns … 114.7 ns)  95.9 ns 105.6 ns 110.9 ns
@psych/lib - df=5,30 - P Value to F                                  559.2 ns     1,788,000 (533.8 ns … 580.3 ns) 562.4 ns 570.7 ns 580.3 ns
@psych/lib - df=6 - Chi2 to P Value                                   42.0 ns    23,830,000 ( 38.7 ns …  57.7 ns)  42.0 ns  44.1 ns  46.6 ns
@psych/lib - df=6 - P Value to Chi2                                  356.8 ns     2,803,000 (332.4 ns … 379.6 ns) 359.7 ns 370.1 ns 379.6 ns
@psych/lib - Random Normal Distribution                               15.7 ns    63,830,000 ( 13.7 ns …  30.1 ns)  15.7 ns  17.3 ns  21.8 ns
@psych/lib - df=30 - Random T Distribution                            74.1 ns    13,500,000 ( 71.0 ns …  91.3 ns)  74.6 ns  83.2 ns  84.6 ns
@psych/lib - df=5,30 - Random F Distribution                         115.5 ns     8,660,000 (111.8 ns … 130.3 ns) 115.9 ns 124.7 ns 125.3 ns
@psych/lib - df=6 - Random Chi2 Distribution                          55.5 ns    18,020,000 ( 52.4 ns …  68.9 ns)  56.1 ns  63.0 ns  64.0 ns
@psych/lib - n=500 - Kurtosis Test                                    16.0 µs        62,660 ( 13.5 µs … 171.2 µs)  17.7 µs  18.7 µs  20.3 µs
@psych/lib - n=500 - Skewness Test                                    16.1 µs        62,170 ( 13.6 µs … 192.2 µs)  17.9 µs  19.4 µs  21.0 µs
@psych/lib - n=500 - One Way Anova                                    26.7 µs        37,430 ( 21.2 µs … 201.4 µs)  28.5 µs  34.2 µs  38.0 µs
@psych/lib - n=500,k=3 - RM Anova                                     49.3 µs        20,280 ( 41.0 µs … 187.5 µs)  52.7 µs  62.5 µs 124.6 µs
@psych/lib - n=500 - Levene Test                                      55.3 µs        18,070 ( 51.6 µs … 210.2 µs)  55.7 µs  63.1 µs  67.2 µs
@psych/lib - n=500,1 - One Sample KS Test                            109.4 µs         9,143 (100.3 µs … 270.0 µs) 109.2 µs 134.2 µs 202.8 µs
@psych/lib - n=500,1 - One Sample T Test                              10.4 µs        96,490 (  8.9 µs … 162.4 µs)  10.1 µs  14.2 µs  14.7 µs
@psych/lib - n=500,2 - Two Sample T Test                              22.2 µs        45,110 ( 18.0 µs … 783.3 µs)  27.7 µs  29.3 µs  32.0 µs
@psych/lib - n=500,2 - Paired T Test                                  22.5 µs        44,530 ( 18.7 µs … 172.2 µs)  26.5 µs  29.3 µs  33.2 µs
@psych/lib - n=500,2 - Welch T Test                                   21.1 µs        47,350 ( 17.2 µs … 174.0 µs)  26.2 µs  28.3 µs  30.7 µs
@psych/lib - n=500,2 - Pearson Correlation Test                       20.7 µs        48,390 ( 17.0 µs … 166.9 µs)  24.9 µs  28.2 µs  30.5 µs
@psych/lib - n=500,3,B=5000 - Bootstrap CI (ab)                       65.0 ms          15.4 ( 62.3 ms …  72.7 ms)  64.7 ms  72.7 ms  72.7 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (mean)                     36.9 ms          27.1 ( 35.2 ms …  40.5 ms)  37.4 ms  40.5 ms  40.5 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (median)                  125.5 ms           8.0 (124.8 ms … 126.6 ms) 125.8 ms 126.6 ms 126.6 ms
@psych/lib - n=500,2 - Linear Regression One                          26.7 µs        37,420 ( 20.6 µs … 306.8 µs)  33.9 µs  36.8 µs  39.7 µs
@psych/lib - n=500,5 - Linear Regression                             269.7 µs         3,708 (225.5 µs … 684.5 µs) 279.2 µs 451.9 µs 511.2 µs
@psych/lib - n=500,10 - Linear Regression                            566.2 µs         1,766 (496.0 µs … 908.6 µs) 583.5 µs 773.0 µs 829.3 µs
@psych/lib - n=500,3 - Cronbach's Alpha                               53.8 µs        18,580 ( 45.2 µs … 309.2 µs)  56.7 µs  63.1 µs  75.7 µs
@psych/lib - 50x100 - Matrix Creation                                 82.5 µs        12,120 ( 77.6 µs … 318.8 µs)  81.8 µs 112.0 µs 121.1 µs
@psych/lib - 50x100 - Matrix Addition                                183.0 µs         5,465 (174.8 µs … 454.8 µs) 181.8 µs 207.7 µs 360.9 µs
@psych/lib - 50x100 - Matrix Transpose                               102.7 µs         9,742 ( 97.3 µs … 359.0 µs) 102.2 µs 114.6 µs 123.7 µs
@psych/lib - 50x100 - Matrix Multiplication                            1.2 ms         817.9 (  1.2 ms …   1.6 ms)   1.3 ms   1.3 ms   1.5 ms
@psych/lib - 50x50 - Matrix Inverse                                  500.1 µs         2,000 (489.3 µs … 847.6 µs) 498.0 µs 533.2 µs 775.0 µs
```
