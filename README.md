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
Runtime | Deno 2.1.1 (aarch64-apple-darwin)


benchmark                                                                  time/iter (avg)        iter/s      (min … max)           p75      p99     p995
-------------------------------------------------------------------------- ----------------------------- --------------------- --------------------------
Baseline (Generate Data) - n=500,1 - number after n means generate times            8.6 µs       116,100 (  6.8 µs … 115.7 µs)   8.4 µs  12.2 µs  15.5 µs
Baseline (Generate Data) - n=500,2 - number after n means generate times           20.1 µs        49,770 ( 14.5 µs …   1.2 ms)  21.2 µs  61.4 µs  73.3 µs
Baseline (Generate Data) - n=500,3 - number after n means generate times           32.1 µs        31,160 ( 22.0 µs …   3.9 ms)  34.2 µs  86.3 µs 100.6 µs
Baseline (Generate Group) - n=500 - for ANOVA & Levene test                         9.8 µs       102,200 (  8.0 µs … 295.0 µs)   9.7 µs  13.7 µs  17.3 µs
Baseline (Math.random) - for distribution benchmarks                                3.7 ns   273,100,000 (  3.3 ns …  18.5 ns)   3.6 ns   8.4 ns   8.9 ns
@psych/lib - n=500,1 - Sum                                                         10.1 µs        99,290 (  7.9 µs … 471.3 µs)  11.8 µs  24.0 µs  31.2 µs
@psych/lib - n=500,1 - Mean                                                         9.8 µs       102,000 (  7.3 µs … 147.6 µs)  11.7 µs  14.5 µs  17.3 µs
@psych/lib - n=500,1 - Max                                                          8.9 µs       112,500 (  8.7 µs …  11.0 µs)   8.8 µs  11.0 µs  11.0 µs
@psych/lib - n=500,1 - Min                                                          9.2 µs       109,200 (  8.7 µs …  11.4 µs)   8.9 µs  11.4 µs  11.4 µs
@psych/lib - n=500,1 - Median                                                      32.5 µs        30,740 ( 27.2 µs … 183.4 µs)  34.0 µs  40.8 µs  55.8 µs
@psych/lib - n=500,1 - Mode                                                        53.6 µs        18,640 ( 46.9 µs … 191.5 µs)  54.2 µs  87.8 µs 115.7 µs
@psych/lib - n=500,1 - Quantile                                                    32.3 µs        30,950 ( 27.5 µs … 178.9 µs)  33.8 µs  40.2 µs  55.0 µs
@psych/lib - n=500,1 - Range                                                        9.5 µs       104,800 (  7.9 µs … 115.6 µs)   9.2 µs  13.5 µs  15.1 µs
@psych/lib - n=500,1 - Variance                                                    10.0 µs        99,820 (  7.8 µs … 152.9 µs)   9.2 µs  16.6 µs  18.0 µs
@psych/lib - n=500,1 - Std                                                          9.5 µs       105,500 (  7.7 µs … 190.3 µs)   9.2 µs  12.7 µs  13.9 µs
@psych/lib - n=500,2 - Cov                                                         20.1 µs        49,710 ( 15.3 µs … 149.1 µs)  22.9 µs  26.9 µs  30.7 µs
@psych/lib - n=500,2 - Corr                                                        21.7 µs        46,040 ( 17.0 µs … 195.1 µs)  24.6 µs  34.7 µs  38.5 µs
@psych/lib - n=500,1 - Kurtosis                                                    26.9 µs        37,180 ( 23.1 µs … 189.1 µs)  28.6 µs  32.9 µs  35.0 µs
@psych/lib - n=500,1 - Skewness                                                    27.4 µs        36,430 ( 23.3 µs … 157.8 µs)  29.0 µs  34.6 µs  37.5 µs
@psych/lib - n=500,1 - SS                                                          10.0 µs       100,300 (  7.8 µs … 198.0 µs)   9.2 µs  17.3 µs  19.6 µs
@psych/lib - n=500,2 - SSDiff                                                      20.5 µs        48,690 ( 15.9 µs … 140.6 µs)  25.6 µs  31.2 µs  48.4 µs
@psych/lib - n=500,1 - SEM                                                          9.6 µs       104,500 (  8.1 µs … 247.5 µs)   9.2 µs  13.5 µs  16.6 µs
@psych/lib - n=500,1 - Array.prototype.sort                                        69.6 µs        14,360 ( 62.6 µs … 204.3 µs)  69.5 µs  84.5 µs 143.4 µs
@psych/lib - n=500,1 - Quick Sort                                                  32.5 µs        30,800 ( 27.4 µs … 148.3 µs)  34.0 µs  39.8 µs  41.8 µs
@psych/lib - n=500,1 - Merge Sort                                                  54.3 µs        18,420 ( 37.9 µs …   7.3 ms)  46.2 µs 219.0 µs 379.5 µs
@psych/lib - n=500,1 - Heap Sort                                                   53.5 µs        18,700 ( 46.5 µs …   2.5 ms)  51.9 µs  82.6 µs 146.4 µs
@psych/lib - Z Score to P Value                                                     6.5 ns   153,100,000 (  6.4 ns …  20.2 ns)   6.5 ns   9.1 ns  12.5 ns
@psych/lib - P Value to Z Score                                                    14.9 ns    67,110,000 ( 14.1 ns …  29.0 ns)  14.8 ns  20.6 ns  21.3 ns
@psych/lib - df=30 - T to P Value                                                 116.7 ns     8,570,000 (107.2 ns … 134.1 ns) 117.2 ns 128.4 ns 129.5 ns
@psych/lib - df=30 - P Value to T                                                 506.0 ns     1,976,000 (484.4 ns … 520.6 ns) 509.1 ns 517.6 ns 520.6 ns
@psych/lib - df=5,30 - F to P Value                                                95.4 ns    10,480,000 ( 93.4 ns … 131.0 ns)  95.9 ns 105.0 ns 106.6 ns
@psych/lib - df=5,30 - P Value to F                                               563.2 ns     1,776,000 (536.7 ns … 595.1 ns) 565.2 ns 595.1 ns 595.1 ns
@psych/lib - df=6 - Chi2 to P Value                                                41.9 ns    23,890,000 ( 41.2 ns …  56.9 ns)  41.9 ns  44.2 ns  49.0 ns
@psych/lib - df=6 - P Value to Chi2                                               409.3 ns     2,443,000 (381.0 ns … 427.1 ns) 411.9 ns 421.7 ns 427.1 ns
@psych/lib - Random Normal Distribution                                            15.7 ns    63,660,000 ( 13.5 ns …  26.7 ns)  15.7 ns  21.5 ns  22.0 ns
@psych/lib - df=30 - Random T Distribution                                        133.2 ns     7,510,000 (122.0 ns … 149.4 ns) 133.8 ns 143.9 ns 146.1 ns
@psych/lib - df=5,30 - Random F Distribution                                      198.6 ns     5,034,000 (181.7 ns … 211.2 ns) 200.3 ns 208.9 ns 209.4 ns
@psych/lib - df=6 - Random Chi2 Distribution                                       95.6 ns    10,470,000 ( 86.6 ns … 108.7 ns)  96.4 ns 104.1 ns 108.0 ns
@psych/lib - n=500 - One Way Anova                                                 26.6 µs        37,650 ( 20.4 µs … 164.9 µs)  28.0 µs  34.9 µs  52.4 µs
@psych/lib - n=500 - Levene Test                                                   61.2 µs        16,340 ( 54.8 µs … 204.5 µs)  61.4 µs  72.5 µs 124.0 µs
@psych/lib - n=500,1 - One Sample KS Test                                         110.7 µs         9,035 (103.2 µs … 199.2 µs) 110.2 µs 176.2 µs 180.3 µs
@psych/lib - n=500,1 - One Sample T Test                                           10.6 µs        94,580 (  9.2 µs … 109.4 µs)  10.1 µs  16.8 µs  17.2 µs
@psych/lib - n=500,2 - Two Sample T Test                                           26.1 µs        38,260 ( 18.7 µs … 138.2 µs)  32.9 µs  36.0 µs  41.3 µs
@psych/lib - n=500,2 - Paired T Test                                               23.7 µs        42,270 ( 19.4 µs … 483.2 µs)  26.6 µs  32.0 µs  49.8 µs
@psych/lib - n=500,2 - Welch T Test                                                24.0 µs        41,590 ( 17.8 µs … 135.6 µs)  28.7 µs  36.5 µs  41.2 µs
@psych/lib - n=500,2 - Pearson Correlation Test                                    34.9 µs        28,670 ( 17.2 µs …   8.3 ms)  25.5 µs 298.2 µs 571.4 µs
@psych/lib - n=500,2 - Linear Regression One                                       35.3 µs        28,360 ( 20.3 µs …   1.7 ms)  46.2 µs  81.2 µs 122.6 µs
@psych/lib - n=500,3 - Linear Regression Two                                       68.4 µs        14,620 ( 43.6 µs … 194.3 µs)  72.2 µs 116.9 µs 145.9 µs
@psych/lib - n=500,3,B=5000 - Bootstrap CI (ab)                                    69.0 ms          14.5 ( 63.5 ms …  78.5 ms)  70.9 ms  78.5 ms  78.5 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (mean)                                  37.9 ms          26.4 ( 35.7 ms …  40.2 ms)  38.8 ms  40.2 ms  40.2 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (median)                               146.5 ms           6.8 (145.7 ms … 147.6 ms) 147.3 ms 147.6 ms 147.6 ms
```
