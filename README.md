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

console.log(bootstrapTest(
  [1, 2, 3, 4, 5],
  [123, 44, 765, 23, 1],
  [43, 23, 12, 4, 5],
  1000,
  0.05
)) // [xxx, xxx]: 95% confidence interval of ab (mediation effect)

console.log(z2p(1.96).toFixed(3)) // 0.975
console.log(z2p(-2.58).toFixed(3)) // 0.005
console.log(p2f(0.05, 5, 5).toFixed(2)) // 7.15
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
Runtime | Deno 2.0.5 (aarch64-apple-darwin)

benchmark                                               time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------------------------------- ----------------------------- --------------------- --------------------------
@psych/lib - n=500 - Sum                                         3.8 µs       261,400 (  3.6 µs …   6.6 µs)   3.7 µs   6.6 µs   6.6 µs
@psych/lib - n=500 - Mean                                        3.8 µs       262,800 (  3.6 µs …   6.5 µs)   3.8 µs   6.5 µs   6.5 µs
@psych/lib - n=500 - Max                                         3.8 µs       266,200 (  3.6 µs …   6.3 µs)   3.7 µs   6.3 µs   6.3 µs
@psych/lib - n=500 - Min                                         3.7 µs       268,300 (  3.6 µs …   6.2 µs)   3.6 µs   6.2 µs   6.2 µs
@psych/lib - n=500 - Median                                     26.5 µs        37,790 ( 22.9 µs … 247.7 µs)  27.2 µs  30.6 µs  32.9 µs
@psych/lib - n=500 - Mode                                       48.6 µs        20,600 ( 44.6 µs … 187.4 µs)  48.8 µs  59.6 µs 107.6 µs
@psych/lib - n=500 - Quantile                                   27.4 µs        36,490 ( 24.2 µs … 167.3 µs)  28.0 µs  30.9 µs  33.4 µs
@psych/lib - n=500 - Range                                       4.0 µs       248,700 (  3.9 µs …   5.5 µs)   4.0 µs   5.5 µs   5.5 µs
@psych/lib - n=500 - Variance                                    4.1 µs       245,500 (  3.9 µs …   7.3 µs)   4.0 µs   7.3 µs   7.3 µs
@psych/lib - n=500 - Std                                         4.0 µs       251,500 (  3.9 µs …   5.3 µs)   3.9 µs   5.3 µs   5.3 µs
@psych/lib - n=500 - Cov                                         8.3 µs       120,200 (  7.1 µs …  90.5 µs)   8.1 µs  12.5 µs  13.0 µs
@psych/lib - n=500 - Corr                                        9.7 µs       102,900 (  7.8 µs … 117.0 µs)   8.5 µs  20.3 µs  21.0 µs
@psych/lib - n=500 - Kurtosis                                   21.4 µs        46,830 ( 19.9 µs … 138.6 µs)  22.5 µs  24.5 µs  26.6 µs
@psych/lib - n=500 - Skewness                                   21.4 µs        46,680 ( 19.0 µs … 148.2 µs)  21.6 µs  24.8 µs  26.1 µs
@psych/lib - n=500 - SS                                          4.1 µs       246,000 (  3.9 µs …   7.0 µs)   3.9 µs   7.0 µs   7.0 µs
@psych/lib - n=500 - SSDiff                                      8.0 µs       125,300 (  6.5 µs …  96.1 µs)   7.5 µs  15.1 µs  15.6 µs
@psych/lib - n=500 - SEM                                         4.0 µs       248,300 (  3.9 µs …   5.3 µs)   4.0 µs   5.3 µs   5.3 µs
@psych/lib - n=500 - Sort                                       26.6 µs        37,570 ( 24.1 µs … 141.5 µs)  27.8 µs  30.0 µs  31.6 µs
@psych/lib - Z Score to P Value                                  7.8 ns   128,800,000 (  7.1 ns …  20.6 ns)   7.7 ns   8.9 ns  13.8 ns
@psych/lib - P Value to Z Score                                 14.5 ns    68,900,000 ( 13.7 ns …  28.2 ns)  14.4 ns  19.9 ns  20.3 ns
@psych/lib - df=30 - T to P Value                              116.8 ns     8,561,000 (108.1 ns … 129.6 ns) 116.8 ns 125.6 ns 126.1 ns
@psych/lib - df=30 - P Value to T                              500.3 ns     1,999,000 (487.9 ns … 508.6 ns) 502.9 ns 507.0 ns 508.6 ns
@psych/lib - df=5,30 - F to P Value                             94.2 ns    10,610,000 ( 90.6 ns … 109.3 ns)  94.1 ns 101.3 ns 102.5 ns
@psych/lib - df=5,30 - P Value to F                            562.8 ns     1,777,000 (549.9 ns … 580.5 ns) 565.4 ns 580.5 ns 580.5 ns
@psych/lib - df=6 - Chi2 to P Value                             41.4 ns    24,170,000 ( 38.4 ns …  52.8 ns)  41.4 ns  45.8 ns  48.5 ns
@psych/lib - df=6 - P Value to Chi2                            408.2 ns     2,450,000 (388.5 ns … 421.6 ns) 411.1 ns 418.8 ns 421.6 ns
@psych/lib - n=500 - One Way Anova                              26.7 µs        37,520 ( 21.4 µs … 206.7 µs)  28.2 µs  33.7 µs  52.8 µs
@psych/lib - n=500 - Levene Test                                61.7 µs        16,210 ( 57.1 µs … 196.6 µs)  61.8 µs  75.5 µs 102.1 µs
@psych/lib - n=500 - One Sample KS Test                         70.2 µs        14,250 ( 65.9 µs … 157.0 µs)  69.7 µs 128.5 µs 131.2 µs
@psych/lib - n=500 - One Sample T Test                           5.1 µs       196,700 (  4.9 µs …   7.8 µs)   4.9 µs   7.8 µs   7.8 µs
@psych/lib - n=500 - Two Sample T Test                          11.9 µs        84,300 (  9.3 µs … 127.2 µs)  10.5 µs  21.8 µs  22.7 µs
@psych/lib - n=500 - Paired T Test                              11.7 µs        85,160 ( 10.2 µs … 185.2 µs)  11.3 µs  16.9 µs  18.5 µs
@psych/lib - n=500 - Welch T Test                               10.8 µs        92,220 (  8.5 µs … 113.8 µs)   9.6 µs  21.1 µs  22.0 µs
@psych/lib - n=500 - Pearson Correlation Test                    9.3 µs       107,800 (  8.0 µs … 120.2 µs)   9.0 µs  13.4 µs  14.2 µs
@psych/lib - n=100,10x10 - Partial Correlation Matrix           41.0 µs        24,400 ( 36.1 µs … 183.3 µs)  38.3 µs  69.8 µs 111.7 µs
@psych/lib - n=100,10x10 - KMO Test                             44.3 µs        22,550 ( 38.5 µs … 216.2 µs)  41.7 µs 103.4 µs 126.5 µs
@psych/lib - n=100,10x10 - Bartlett Sphericity Test             26.5 µs        37,690 ( 23.7 µs … 159.8 µs)  25.0 µs  78.2 µs  99.5 µs
@psych/lib - n=500 - Linear Regression One                      16.2 µs        61,900 ( 10.9 µs … 118.6 µs)  12.2 µs  34.3 µs  37.9 µs
@psych/lib - n=500 - Linear Regression Two                      39.4 µs        25,360 ( 24.9 µs … 139.2 µs)  52.2 µs  57.0 µs  82.3 µs
@psych/lib - n=500,B=1000 - Bootstrap CI (ab)                   27.9 ms          35.8 ( 27.7 ms …  28.2 ms)  28.0 ms  28.2 ms  28.2 ms
@psych/lib - n=500,B=1000 - Bootstrap CI (mean)                 24.9 ms          40.2 ( 24.8 ms …  25.0 ms)  24.9 ms  25.0 ms  25.0 ms
@psych/lib - n=500,B=1000 - Bootstrap CI (median)               46.7 ms          21.4 ( 46.4 ms …  48.3 ms)  46.7 ms  48.3 ms  48.3 ms
```
