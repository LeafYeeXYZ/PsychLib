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


benchmark                                           time/iter (avg)        iter/s      (min … max)           p75      p99     p995
--------------------------------------------------- ----------------------------- --------------------- --------------------------
@psych/lib - n=500 - Sum                                     3.7 µs       266,700 (  3.5 µs …   6.1 µs)   3.6 µs   6.1 µs   6.1 µs
@psych/lib - n=500 - Mean                                    3.7 µs       268,000 (  3.5 µs …   6.3 µs)   3.6 µs   6.3 µs   6.3 µs
@psych/lib - n=500 - Max                                     3.8 µs       265,600 (  3.6 µs …   6.1 µs)   3.6 µs   6.1 µs   6.1 µs
@psych/lib - n=500 - Min                                     3.7 µs       271,600 (  3.6 µs …   5.2 µs)   3.6 µs   5.2 µs   5.2 µs
@psych/lib - n=500 - Median                                 26.2 µs        38,150 ( 22.5 µs … 240.5 µs)  26.4 µs  33.1 µs  36.9 µs
@psych/lib - n=500 - Mode                                   47.7 µs        20,980 ( 41.4 µs … 188.6 µs)  48.0 µs  81.4 µs 109.1 µs
@psych/lib - n=500 - Quantile                               26.6 µs        37,630 ( 22.9 µs … 166.3 µs)  27.6 µs  30.0 µs  32.2 µs
@psych/lib - n=500 - Range                                   4.1 µs       244,100 (  4.0 µs …   5.5 µs)   4.1 µs   5.5 µs   5.5 µs
@psych/lib - n=500 - Variance                                4.4 µs       229,800 (  3.9 µs …   7.8 µs)   4.0 µs   7.8 µs   7.8 µs
@psych/lib - n=500 - Std                                     4.1 µs       242,000 (  3.9 µs …   7.4 µs)   3.9 µs   7.4 µs   7.4 µs
@psych/lib - n=500 - Cov                                     7.9 µs       126,300 (  7.7 µs …  10.4 µs)   7.8 µs  10.4 µs  10.4 µs
@psych/lib - n=500 - Corr                                    9.7 µs       102,900 (  7.8 µs … 123.7 µs)   8.8 µs  20.5 µs  21.5 µs
@psych/lib - n=500 - Kurtosis                               21.3 µs        47,050 ( 18.9 µs … 169.2 µs)  21.4 µs  23.8 µs  26.3 µs
@psych/lib - n=500 - Skewness                               21.4 µs        46,760 ( 19.5 µs … 152.7 µs)  21.5 µs  24.5 µs  27.1 µs
@psych/lib - n=500 - SS                                      4.6 µs       218,500 (  3.9 µs …   7.7 µs)   4.4 µs   7.7 µs   7.7 µs
@psych/lib - n=500 - SSDiff                                  7.9 µs       126,100 (  7.0 µs …  12.9 µs)   7.5 µs  12.9 µs  12.9 µs
@psych/lib - n=500 - SEM                                     4.0 µs       250,500 (  3.9 µs …   5.2 µs)   4.0 µs   5.2 µs   5.2 µs
@psych/lib - n=500 - Sort                                   26.5 µs        37,680 ( 24.2 µs … 142.0 µs)  27.7 µs  29.5 µs  30.3 µs
@psych/lib - Z Score to P Value                              7.8 ns   128,400,000 (  7.6 ns …  19.6 ns)   7.8 ns   8.8 ns  13.8 ns
@psych/lib - P Value to Z Score                             14.5 ns    69,050,000 ( 13.6 ns …  25.5 ns)  14.4 ns  20.0 ns  20.3 ns
@psych/lib - df=30 - T to P Value                          116.2 ns     8,604,000 (107.8 ns … 133.8 ns) 116.2 ns 123.6 ns 125.0 ns
@psych/lib - df=30 - P Value to T                          502.6 ns     1,990,000 (486.7 ns … 521.8 ns) 505.3 ns 512.1 ns 521.8 ns
@psych/lib - df=5,30 - F to P Value                         94.4 ns    10,590,000 ( 91.0 ns … 108.3 ns)  94.3 ns 101.4 ns 102.0 ns
@psych/lib - df=5,30 - P Value to F                        565.0 ns     1,770,000 (557.3 ns … 588.6 ns) 566.5 ns 588.6 ns 588.6 ns
@psych/lib - df=6 - Chi2 to P Value                         41.3 ns    24,210,000 ( 40.7 ns …  56.5 ns)  41.3 ns  45.5 ns  48.8 ns
@psych/lib - df=6 - P Value to Chi2                        411.0 ns     2,433,000 (382.2 ns … 425.4 ns) 414.3 ns 423.5 ns 425.4 ns
@psych/lib - n=500 - One Way Anova                          26.4 µs        37,890 ( 20.3 µs … 294.2 µs)  27.9 µs  33.7 µs  53.0 µs
@psych/lib - n=500 - Levene Test                            61.2 µs        16,330 ( 56.1 µs … 222.6 µs)  61.5 µs  76.2 µs 110.2 µs
@psych/lib - n=500 - One Sample KS Test                     70.3 µs        14,220 ( 65.4 µs … 257.9 µs)  70.0 µs 131.7 µs 134.6 µs
@psych/lib - n=500 - One Sample T Test                       5.4 µs       186,600 (  4.5 µs … 149.3 µs)   5.2 µs   9.0 µs  10.6 µs
@psych/lib - n=500 - Two Sample T Test                      11.9 µs        84,150 (  9.2 µs … 139.7 µs)  10.3 µs  21.9 µs  22.9 µs
@psych/lib - n=500 - Paired T Test                          11.6 µs        85,890 ( 10.2 µs … 115.9 µs)  11.3 µs  16.7 µs  17.8 µs
@psych/lib - n=500 - Welch T Test                           10.9 µs        92,070 (  8.5 µs … 118.4 µs)   9.7 µs  21.1 µs  21.8 µs
@psych/lib - n=500 - Pearson Correlation Test                9.4 µs       106,500 (  8.0 µs … 132.9 µs)   9.1 µs  15.0 µs  20.6 µs
@psych/lib - n=500 - Linear Regression One                  16.4 µs        60,920 ( 10.8 µs … 241.7 µs)  12.3 µs  36.1 µs  38.0 µs
@psych/lib - n=500 - Linear Regression Two                  40.5 µs        24,660 ( 24.9 µs … 203.0 µs)  53.2 µs  57.1 µs  87.3 µs
@psych/lib - n=500,B=1000 - Bootstrap CI (ab)               15.9 ms          62.7 ( 12.2 ms …  22.7 ms)  15.8 ms  22.7 ms  22.7 ms
@psych/lib - n=500,B=1000 - Bootstrap CI (mean)              7.7 ms         129.9 (  7.2 ms …   9.3 ms)   7.7 ms   9.3 ms   9.3 ms
@psych/lib - n=500,B=1000 - Bootstrap CI (median)           29.6 ms          33.8 ( 29.3 ms …  31.1 ms)  29.6 ms  31.1 ms  31.1 ms
```
