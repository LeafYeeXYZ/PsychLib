# Introduction

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
@psych/lib - n=500 - Sum                                     3.8 µs       265,100 (  3.6 µs …   6.2 µs)   3.7 µs   6.2 µs   6.2 µs
@psych/lib - n=500 - Mean                                    3.7 µs       270,000 (  3.5 µs …   6.2 µs)   3.6 µs   6.2 µs   6.2 µs
@psych/lib - n=500 - Max                                     3.7 µs       267,600 (  3.6 µs …   6.1 µs)   3.6 µs   6.1 µs   6.1 µs
@psych/lib - n=500 - Min                                     3.7 µs       267,900 (  3.6 µs …   6.2 µs)   3.6 µs   6.2 µs   6.2 µs
@psych/lib - n=500 - Median                                 26.5 µs        37,740 ( 22.9 µs … 240.2 µs)  27.1 µs  30.8 µs  33.1 µs
@psych/lib - n=500 - Mode                                   48.4 µs        20,680 ( 42.6 µs … 150.2 µs)  48.4 µs  59.2 µs 107.8 µs
@psych/lib - n=500 - Quantile                               27.3 µs        36,570 ( 24.2 µs … 181.9 µs)  28.0 µs  30.7 µs  33.0 µs
@psych/lib - n=500 - Range                                   4.0 µs       248,100 (  3.9 µs …   5.5 µs)   4.0 µs   5.5 µs   5.5 µs
@psych/lib - n=500 - Variance                                4.1 µs       245,200 (  3.9 µs …   7.3 µs)   3.9 µs   7.3 µs   7.3 µs
@psych/lib - n=500 - Std                                     4.0 µs       251,200 (  3.9 µs …   5.3 µs)   3.9 µs   5.3 µs   5.3 µs
@psych/lib - n=500 - Cov                                     8.2 µs       122,200 (  7.1 µs …  93.0 µs)   7.8 µs  12.5 µs  13.1 µs
@psych/lib - n=500 - Corr                                    9.8 µs       102,200 (  7.7 µs …  98.3 µs)   8.7 µs  20.3 µs  20.8 µs
@psych/lib - n=500 - Kurtosis                               21.3 µs        46,980 ( 18.7 µs … 139.6 µs)  22.6 µs  23.8 µs  25.4 µs
@psych/lib - n=500 - Skewness                               21.5 µs        46,580 ( 18.8 µs … 154.2 µs)  22.6 µs  24.1 µs  26.3 µs
@psych/lib - n=500 - SS                                      4.1 µs       242,100 (  4.0 µs …   7.0 µs)   4.0 µs   7.0 µs   7.0 µs
@psych/lib - n=500 - SSDiff                                  7.9 µs       126,900 (  6.5 µs … 113.9 µs)   7.2 µs  15.1 µs  15.8 µs
@psych/lib - n=500 - SEM                                     4.0 µs       250,500 (  3.9 µs …   5.3 µs)   4.0 µs   5.3 µs   5.3 µs
@psych/lib - n=500 - Sort                                   26.7 µs        37,410 ( 22.9 µs … 155.2 µs)  27.8 µs  32.1 µs  35.8 µs
@psych/lib - n=500 - One Way Anova                          26.7 µs        37,470 ( 20.9 µs … 169.3 µs)  28.2 µs  34.0 µs  53.5 µs
@psych/lib - n=500 - Levene Test                            61.5 µs        16,270 ( 53.2 µs … 255.3 µs)  61.6 µs  73.8 µs  97.7 µs
@psych/lib - n=500 - One Sample KS Test                     70.1 µs        14,260 ( 63.6 µs … 168.5 µs)  69.7 µs 128.6 µs 132.6 µs
@psych/lib - n=500 - One Sample T Test                       9.1 µs       109,400 (  7.9 µs … 141.5 µs)   8.7 µs  15.8 µs  16.8 µs
@psych/lib - n=500 - Two Sample T Test                      18.5 µs        53,980 ( 13.9 µs … 399.5 µs)  22.8 µs  32.1 µs  34.2 µs
@psych/lib - n=500 - Paired T Test                          15.7 µs        63,590 ( 14.1 µs … 117.7 µs)  15.3 µs  22.3 µs  25.4 µs
@psych/lib - n=500 - Welch T Test                           17.5 µs        57,170 ( 12.5 µs … 153.1 µs)  15.6 µs  31.7 µs  33.6 µs
@psych/lib - n=500 - Pearson Correlation Test               10.0 µs        99,760 (  8.0 µs …   2.2 ms)   9.2 µs  18.7 µs  33.2 µs
@psych/lib - n=500 - Linear Regression One                  16.4 µs        61,150 ( 10.8 µs … 174.1 µs)  12.5 µs  34.4 µs  36.9 µs
@psych/lib - n=500 - Linear Regression Two                  40.1 µs        24,950 ( 25.7 µs … 148.1 µs)  52.2 µs  58.5 µs  87.1 µs
@psych/lib - n=500,B=1000 - Bootstrap CI (ab)               27.9 ms          35.8 ( 27.8 ms …  28.2 ms)  27.9 ms  28.2 ms  28.2 ms
@psych/lib - n=500,B=1000 - Bootstrap CI (mean)             25.0 ms          39.9 ( 24.9 ms …  25.4 ms)  25.1 ms  25.4 ms  25.4 ms
@psych/lib - n=500,B=1000 - Bootstrap CI (median)           46.7 ms          21.4 ( 46.6 ms …  46.9 ms)  46.7 ms  46.9 ms  46.9 ms
```
