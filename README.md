# Introduction

[![JSR Version](https://jsr.io/badges/@psych/lib)](https://jsr.io/@psych/lib) [![JSR Scope](https://jsr.io/badges/@psych)](https://jsr.io/@psych) [![JSR Score](https://jsr.io/badges/@psych/lib/score)](https://jsr.io/@psych/lib/score)

**PsychLib** is a TypeScript library for math, statistics, and data analysis. Featured in psychological and educational research.

- PsychLib can be used in all modern JavaScript/TypeScript environments, including browsers, Node.js, Deno, and Bun.
- PsychLib has 0 dependencies and is lightweight.
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

benchmark                                           time/iter (avg)        iter/s      (min … max)           p75      p99     p995
--------------------------------------------------- ----------------------------- --------------------- --------------------------
@psych/lib - n=500 - Sum                                     3.7 µs       268,500 (  3.5 µs …   6.1 µs)   3.6 µs   6.1 µs   6.1 µs
@psych/lib - n=500 - Mean                                    3.7 µs       269,900 (  3.5 µs …   6.3 µs)   3.6 µs   6.3 µs   6.3 µs
@psych/lib - n=500 - Max                                     3.7 µs       269,000 (  3.6 µs …   6.1 µs)   3.6 µs   6.1 µs   6.1 µs
@psych/lib - n=500 - Min                                     3.7 µs       268,800 (  3.6 µs …   6.1 µs)   3.6 µs   6.1 µs   6.1 µs
@psych/lib - n=500 - Median                                 26.5 µs        37,740 ( 23.0 µs … 196.1 µs)  27.1 µs  30.7 µs  33.3 µs
@psych/lib - n=500 - Mode                                   48.5 µs        20,610 ( 43.9 µs … 166.2 µs)  48.7 µs  64.4 µs 108.8 µs
@psych/lib - n=500 - Quantile                               27.5 µs        36,370 ( 24.4 µs … 157.6 µs)  28.1 µs  31.4 µs  34.0 µs
@psych/lib - n=500 - Range                                   4.0 µs       249,800 (  3.9 µs …   5.5 µs)   4.0 µs   5.5 µs   5.5 µs
@psych/lib - n=500 - Variance                                4.1 µs       246,200 (  3.9 µs …   7.3 µs)   3.9 µs   7.3 µs   7.3 µs
@psych/lib - n=500 - Std                                     4.0 µs       251,400 (  3.9 µs …   5.2 µs)   3.9 µs   5.2 µs   5.2 µs
@psych/lib - n=500 - Cov                                     8.2 µs       121,700 (  6.7 µs … 117.8 µs)   7.9 µs  12.4 µs  13.1 µs
@psych/lib - n=500 - Corr                                    9.7 µs       103,400 (  7.7 µs … 100.5 µs)   8.5 µs  20.2 µs  20.8 µs
@psych/lib - n=500 - Kurtosis                               21.2 µs        47,140 ( 18.7 µs … 143.1 µs)  21.6 µs  24.4 µs  25.9 µs
@psych/lib - n=500 - Skewness                               21.2 µs        47,070 ( 18.8 µs … 159.5 µs)  21.5 µs  24.7 µs  26.8 µs
@psych/lib - n=500 - SS                                      4.0 µs       247,100 (  3.9 µs …   6.9 µs)   3.9 µs   6.9 µs   6.9 µs
@psych/lib - n=500 - SSDiff                                  7.9 µs       126,900 (  6.5 µs … 100.9 µs)   7.2 µs  15.1 µs  15.5 µs
@psych/lib - n=500 - SEM                                     4.0 µs       251,200 (  3.9 µs …   5.3 µs)   4.0 µs   5.3 µs   5.3 µs
@psych/lib - n=500 - Sort                                   26.7 µs        37,520 ( 23.5 µs … 164.9 µs)  27.8 µs  30.7 µs  33.2 µs
@psych/lib - Z Score to P Value                              6.5 ns   152,700,000 (  6.4 ns …  21.5 ns)   6.5 ns   7.7 ns  12.3 ns
@psych/lib - P Value to Z Score                             14.9 ns    67,340,000 ( 13.7 ns …  28.9 ns)  14.8 ns  20.3 ns  20.6 ns
@psych/lib - df=30 - T to P Value                          116.0 ns     8,622,000 (107.7 ns … 130.6 ns) 116.4 ns 124.0 ns 127.0 ns
@psych/lib - df=30 - P Value to T                            4.4 µs       226,600 (  4.3 µs …   5.3 µs)   4.4 µs   5.3 µs   5.3 µs
@psych/lib - df=5,30 - F to P Value                         93.6 ns    10,680,000 ( 86.4 ns … 114.7 ns)  93.7 ns 101.3 ns 103.4 ns
@psych/lib - df=5,30 - P Value to F                          3.8 µs       264,700 (  3.7 µs …   4.4 µs)   3.8 µs   4.4 µs   4.4 µs
@psych/lib - df=6 - Chi2 to P Value                         41.5 ns    24,120,000 ( 38.4 ns …  56.6 ns)  41.5 ns  45.5 ns  49.0 ns
@psych/lib - df=6 - P Value to Chi2                          5.3 µs       189,400 (  5.2 µs …   5.4 µs)   5.3 µs   5.4 µs   5.4 µs
@psych/lib - n=500 - One Way Anova                          26.4 µs        37,820 ( 20.1 µs … 172.3 µs)  27.9 µs  34.6 µs  46.1 µs
@psych/lib - n=500 - Levene Test                            63.0 µs        15,870 ( 54.3 µs … 238.6 µs)  62.9 µs  88.8 µs 124.1 µs
@psych/lib - n=500 - One Sample KS Test                     71.1 µs        14,060 ( 65.6 µs … 218.5 µs)  70.5 µs 131.4 µs 149.8 µs
@psych/lib - n=500 - One Sample T Test                       9.0 µs       111,600 (  7.4 µs … 143.7 µs)   8.5 µs  14.8 µs  15.5 µs
@psych/lib - n=500 - Two Sample T Test                      18.3 µs        54,550 ( 13.2 µs … 151.0 µs)  21.7 µs  31.9 µs  33.8 µs
@psych/lib - n=500 - Paired T Test                          15.9 µs        63,030 ( 12.8 µs … 147.0 µs)  15.3 µs  23.2 µs  38.4 µs
@psych/lib - n=500 - Welch T Test                           16.9 µs        59,040 ( 12.0 µs … 161.9 µs)  14.8 µs  30.8 µs  32.6 µs
@psych/lib - n=500 - Pearson Correlation Test                9.7 µs       102,900 (  8.1 µs … 133.0 µs)   9.3 µs  13.5 µs  15.5 µs
@psych/lib - n=500 - Linear Regression One                  17.4 µs        57,400 ( 10.8 µs …   1.6 ms)  12.4 µs  41.4 µs  70.2 µs
@psych/lib - n=500 - Linear Regression Two                  40.0 µs        25,000 ( 25.4 µs … 137.2 µs)  52.1 µs  59.8 µs  85.2 µs
@psych/lib - n=500,B=1000 - Bootstrap CI (ab)               28.4 ms          35.2 ( 27.9 ms …  29.9 ms)  28.7 ms  29.9 ms  29.9 ms
@psych/lib - n=500,B=1000 - Bootstrap CI (mean)             25.0 ms          40.0 ( 24.9 ms …  25.3 ms)  25.0 ms  25.3 ms  25.3 ms
@psych/lib - n=500,B=1000 - Bootstrap CI (median)           47.1 ms          21.2 ( 46.7 ms …  48.1 ms)  47.4 ms  48.1 ms  48.1 ms
```
