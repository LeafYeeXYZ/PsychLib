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
@psych/lib - n=500 - Sum                                         3.7 µs       269,400 (  3.5 µs …   6.3 µs)   3.6 µs   6.3 µs   6.3 µs
@psych/lib - n=500 - Mean                                        3.8 µs       262,900 (  3.5 µs …   6.3 µs)   3.8 µs   6.3 µs   6.3 µs
@psych/lib - n=500 - Max                                         4.0 µs       249,500 (  3.6 µs …   6.6 µs)   3.8 µs   6.6 µs   6.6 µs
@psych/lib - n=500 - Min                                         3.9 µs       258,200 (  3.7 µs …   6.3 µs)   3.8 µs   6.3 µs   6.3 µs
@psych/lib - n=500 - Median                                     28.4 µs        35,230 ( 24.3 µs …   1.6 ms)  28.3 µs  55.0 µs  75.2 µs
@psych/lib - n=500 - Mode                                       49.7 µs        20,100 ( 44.8 µs … 187.6 µs)  49.6 µs  86.2 µs 136.0 µs
@psych/lib - n=500 - Quantile                                   27.7 µs        36,100 ( 24.3 µs … 220.0 µs)  28.2 µs  32.6 µs  34.8 µs
@psych/lib - n=500 - Range                                       4.1 µs       242,600 (  4.0 µs …   5.7 µs)   4.1 µs   5.7 µs   5.7 µs
@psych/lib - n=500 - Variance                                    4.2 µs       240,700 (  3.9 µs …   7.4 µs)   4.1 µs   7.4 µs   7.4 µs
@psych/lib - n=500 - Std                                         4.1 µs       242,200 (  3.9 µs …   5.5 µs)   4.0 µs   5.5 µs   5.5 µs
@psych/lib - n=500 - Cov                                         8.2 µs       121,400 (  7.1 µs … 110.2 µs)   7.9 µs  12.5 µs  13.2 µs
@psych/lib - n=500 - Corr                                        9.7 µs       102,800 (  7.7 µs … 116.3 µs)   8.5 µs  20.3 µs  20.9 µs
@psych/lib - n=500 - Kurtosis                                   21.3 µs        46,910 ( 18.7 µs … 157.0 µs)  22.6 µs  24.5 µs  25.8 µs
@psych/lib - n=500 - Skewness                                   21.5 µs        46,600 ( 18.7 µs … 156.0 µs)  22.7 µs  24.5 µs  26.0 µs
@psych/lib - n=500 - SS                                          4.1 µs       246,500 (  3.9 µs …   7.0 µs)   3.9 µs   7.0 µs   7.0 µs
@psych/lib - n=500 - SSDiff                                      7.9 µs       126,000 (  6.6 µs … 112.0 µs)   7.2 µs  15.1 µs  15.7 µs
@psych/lib - n=500 - SEM                                         4.0 µs       250,900 (  3.9 µs …   5.3 µs)   4.0 µs   5.3 µs   5.3 µs
@psych/lib - n=500 - Sort                                       26.6 µs        37,560 ( 24.2 µs … 178.7 µs)  27.8 µs  30.3 µs  32.8 µs
@psych/lib - Z Score to P Value                                  8.0 ns   124,900,000 (  7.8 ns …  17.0 ns)   7.9 ns   9.4 ns  13.8 ns
@psych/lib - P Value to Z Score                                 14.4 ns    69,460,000 ( 13.6 ns …  27.3 ns)  14.3 ns  19.9 ns  20.2 ns
@psych/lib - df=30 - T to P Value                              116.4 ns     8,591,000 (115.0 ns … 132.9 ns) 116.4 ns 123.8 ns 127.7 ns
@psych/lib - df=30 - P Value to T                              501.4 ns     1,994,000 (490.0 ns … 521.2 ns) 503.7 ns 517.0 ns 521.2 ns
@psych/lib - df=5,30 - F to P Value                             99.1 ns    10,090,000 ( 93.0 ns … 849.0 ns)  94.1 ns 212.1 ns 642.3 ns
@psych/lib - df=5,30 - P Value to F                            562.3 ns     1,779,000 (554.7 ns … 599.2 ns) 564.9 ns 599.2 ns 599.2 ns
@psych/lib - df=6 - Chi2 to P Value                             43.3 ns    23,070,000 ( 40.5 ns … 495.3 ns)  41.5 ns  83.0 ns 208.1 ns
@psych/lib - df=6 - P Value to Chi2                            413.3 ns     2,419,000 (394.3 ns … 431.2 ns) 415.8 ns 426.6 ns 431.2 ns
@psych/lib - n=500 - One Way Anova                              26.8 µs        37,340 ( 21.4 µs … 155.9 µs)  28.3 µs  34.4 µs  51.5 µs
@psych/lib - n=500 - Levene Test                                61.6 µs        16,240 ( 56.8 µs … 215.6 µs)  61.7 µs  78.2 µs 123.2 µs
@psych/lib - n=500 - One Sample KS Test                         70.2 µs        14,240 ( 66.0 µs … 187.2 µs)  69.7 µs 128.5 µs 133.0 µs
@psych/lib - n=500 - One Sample T Test                           5.2 µs       193,900 (  4.5 µs … 111.4 µs)   5.1 µs   7.7 µs   8.0 µs
@psych/lib - n=500 - Two Sample T Test                          12.2 µs        82,170 (  9.3 µs … 185.8 µs)  10.6 µs  23.0 µs  26.1 µs
@psych/lib - n=500 - Paired T Test                              11.9 µs        83,800 ( 10.2 µs … 156.5 µs)  11.4 µs  17.8 µs  24.8 µs
@psych/lib - n=500 - Welch T Test                               11.1 µs        90,470 (  8.5 µs … 141.7 µs)   9.5 µs  22.1 µs  24.0 µs
@psych/lib - n=500 - Pearson Correlation Test                    9.3 µs       107,900 (  8.0 µs … 129.2 µs)   8.8 µs  13.9 µs  15.2 µs
@psych/lib - n=100,10x10 - Partial Correlation Matrix           43.4 µs        23,040 ( 38.4 µs … 204.7 µs)  40.7 µs  76.7 µs 127.0 µs
@psych/lib - n=100,10x10 - KMO Test                             46.4 µs        21,550 ( 40.8 µs … 203.0 µs)  44.3 µs  76.0 µs 123.9 µs
@psych/lib - n=500 - Linear Regression One                      16.3 µs        61,240 ( 10.8 µs … 158.6 µs)  12.4 µs  34.9 µs  37.8 µs
@psych/lib - n=500 - Linear Regression Two                      40.0 µs        25,010 ( 24.8 µs … 143.6 µs)  52.9 µs  58.8 µs  86.1 µs
@psych/lib - n=500,B=1000 - Bootstrap CI (ab)                   28.3 ms          35.4 ( 27.9 ms …  28.8 ms)  28.3 ms  28.8 ms  28.8 ms
@psych/lib - n=500,B=1000 - Bootstrap CI (mean)                 25.5 ms          39.2 ( 25.0 ms …  26.6 ms)  25.7 ms  26.6 ms  26.6 ms
@psych/lib - n=500,B=1000 - Bootstrap CI (median)               47.4 ms          21.1 ( 46.7 ms …  48.6 ms)  47.6 ms  48.6 ms  48.6 ms
```
