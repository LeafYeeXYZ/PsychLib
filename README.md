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
Runtime | Deno 2.1.2 (aarch64-apple-darwin)


benchmark                                                     time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------------------------------------- ----------------------------- --------------------- --------------------------
Baseline (Generate Data) - n=500,1                                     9.0 µs       111,200 (  6.9 µs … 711.1 µs)   8.4 µs  23.1 µs  55.9 µs
Baseline (Generate Data) - n=500,2                                    19.1 µs        52,440 ( 14.5 µs … 126.6 µs)  20.8 µs  28.2 µs  66.0 µs
Baseline (Generate Data) - n=500,3                                    31.8 µs        31,480 ( 22.1 µs …   3.4 ms)  33.6 µs  83.2 µs  97.9 µs
Baseline (Generate Group) - n=500 - for ANOVA & Levene test            9.8 µs       102,100 (  8.0 µs … 322.6 µs)   9.6 µs  14.0 µs  17.8 µs
Baseline (Math.random) - for distribution benchmarks                   3.7 ns   271,500,000 (  3.3 ns …  20.0 ns)   3.6 ns   8.7 ns   9.4 ns
@psych/lib - n=500,1 - Array.prototype.sort                           70.3 µs        14,230 ( 62.5 µs … 209.9 µs)  70.0 µs  88.4 µs 147.4 µs
@psych/lib - n=500,1 - Quick Sort                                     33.1 µs        30,180 ( 27.1 µs … 294.5 µs)  34.0 µs  41.2 µs  46.9 µs
@psych/lib - n=500,1 - Merge Sort                                     42.8 µs        23,350 ( 37.0 µs … 476.9 µs)  43.5 µs  54.0 µs  96.4 µs
@psych/lib - n=500,1 - Heap Sort                                      49.5 µs        20,200 ( 43.6 µs … 287.0 µs)  49.7 µs  59.2 µs  74.6 µs
@psych/lib - Z Score to P Value                                        6.8 ns   147,400,000 (  6.3 ns … 355.8 ns)   6.5 ns  13.2 ns  16.8 ns
@psych/lib - P Value to Z Score                                       14.9 ns    67,320,000 ( 13.1 ns …  27.7 ns)  14.8 ns  21.5 ns  21.9 ns
@psych/lib - df=30 - T to P Value                                    115.8 ns     8,633,000 (107.4 ns … 136.3 ns) 117.3 ns 128.7 ns 130.9 ns
@psych/lib - df=30 - P Value to T                                    502.4 ns     1,991,000 (469.8 ns … 555.2 ns) 508.2 ns 525.9 ns 555.2 ns
@psych/lib - df=5,30 - F to P Value                                   94.7 ns    10,560,000 ( 87.1 ns … 109.6 ns)  94.8 ns 101.3 ns 103.7 ns
@psych/lib - df=5,30 - P Value to F                                  563.0 ns     1,776,000 (524.2 ns … 583.0 ns) 566.6 ns 583.0 ns 583.0 ns
@psych/lib - df=6 - Chi2 to P Value                                   41.0 ns    24,380,000 ( 37.8 ns …  57.0 ns)  41.0 ns  47.7 ns  51.4 ns
@psych/lib - df=6 - P Value to Chi2                                  433.0 ns     2,309,000 (379.8 ns …   2.6 µs) 421.3 ns 781.6 ns   2.6 µs
@psych/lib - Random Normal Distribution                               15.6 ns    63,960,000 ( 13.4 ns …  31.7 ns)  15.6 ns  21.5 ns  23.2 ns
@psych/lib - df=30 - Random T Distribution                           132.0 ns     7,575,000 (121.4 ns … 157.9 ns) 134.7 ns 146.3 ns 149.2 ns
@psych/lib - df=5,30 - Random F Distribution                         194.7 ns     5,136,000 (178.0 ns … 213.8 ns) 198.3 ns 209.8 ns 210.2 ns
@psych/lib - df=6 - Random Chi2 Distribution                          99.7 ns    10,030,000 ( 86.5 ns … 635.5 ns)  97.1 ns 205.5 ns 497.5 ns
@psych/lib - n=500 - Kurtosis Test                                    28.6 µs        34,980 ( 23.3 µs … 151.7 µs)  29.2 µs  35.2 µs  42.4 µs
@psych/lib - n=500 - Skewness Test                                    29.7 µs        33,650 ( 23.5 µs …   2.4 ms)  29.0 µs  75.2 µs 125.8 µs
@psych/lib - n=500 - One Way Anova                                    28.5 µs        35,100 ( 21.2 µs …   1.5 ms)  28.2 µs  84.8 µs 123.9 µs
@psych/lib - n=500 - Levene Test                                      61.4 µs        16,290 ( 53.3 µs … 243.0 µs)  61.3 µs  87.6 µs 126.3 µs
@psych/lib - n=500,1 - One Sample KS Test                            110.7 µs         9,032 ( 99.8 µs … 276.9 µs) 110.5 µs 178.1 µs 189.8 µs
@psych/lib - n=500,1 - One Sample T Test                              10.6 µs        94,610 (  8.6 µs … 157.0 µs)  10.1 µs  17.2 µs  17.5 µs
@psych/lib - n=500,2 - Two Sample T Test                              25.3 µs        39,550 ( 18.5 µs … 174.0 µs)  33.0 µs  38.4 µs  44.8 µs
@psych/lib - n=500,2 - Paired T Test                                  23.8 µs        42,080 ( 19.3 µs … 357.2 µs)  26.8 µs  32.7 µs  74.3 µs
@psych/lib - n=500,2 - Welch T Test                                   24.6 µs        40,670 ( 17.6 µs … 162.0 µs)  32.3 µs  37.6 µs  61.1 µs
@psych/lib - n=500,2 - Pearson Correlation Test                       22.4 µs        44,690 ( 16.2 µs … 179.4 µs)  25.8 µs  36.5 µs  48.2 µs
@psych/lib - n=500,2 - Linear Regression One                          34.2 µs        29,280 ( 21.1 µs … 191.8 µs)  46.0 µs  52.4 µs  79.2 µs
@psych/lib - n=500,3 - Linear Regression Two                          68.2 µs        14,660 ( 40.2 µs … 247.2 µs)  72.2 µs 107.7 µs 138.0 µs
@psych/lib - n=500,3,B=5000 - Bootstrap CI (ab)                       69.4 ms          14.4 ( 65.1 ms …  78.1 ms)  72.2 ms  78.1 ms  78.1 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (mean)                     38.4 ms          26.1 ( 35.6 ms …  39.6 ms)  39.0 ms  39.6 ms  39.6 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (median)                  145.5 ms           6.9 (144.3 ms … 147.2 ms) 146.2 ms 147.2 ms 147.2 ms
@psych/lib - n=500,3 - Cronbach's Alpha                               54.8 µs        18,250 ( 44.4 µs … 325.3 µs)  56.5 µs 121.6 µs 127.0 µs
```
