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
Runtime | Deno 2.1.3 (aarch64-apple-darwin)


benchmark                                                     time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------------------------------------- ----------------------------- --------------------- --------------------------
Baseline (Generate Data) - n=500,1                                     8.5 µs       117,800 (  7.0 µs … 131.4 µs)   8.3 µs  12.0 µs  13.8 µs
Baseline (Generate Data) - n=500,2                                    18.7 µs        53,490 ( 14.4 µs … 101.7 µs)  20.1 µs  26.7 µs  60.5 µs
Baseline (Generate Data) - n=500,3                                    29.6 µs        33,830 ( 22.1 µs … 107.6 µs)  33.8 µs  69.3 µs  76.9 µs
Baseline (Generate Group) - n=500 - for ANOVA & Levene test            9.7 µs       103,400 (  8.0 µs … 320.9 µs)   9.5 µs  13.3 µs  14.8 µs
Baseline (Math.random) - for distribution benchmarks                   3.9 ns   254,100,000 (  3.4 ns … 219.6 ns)   3.8 ns   8.8 ns   9.2 ns
@psych/lib - n=5000,1 - Array.prototype.sort                         888.2 µs         1,126 (796.7 µs …   1.0 ms) 890.4 µs 987.3 µs   1.0 ms
@psych/lib - n=5000,1 - Iterative Quick Sort                         366.9 µs         2,726 (336.7 µs … 476.8 µs) 372.3 µs 457.1 µs 467.5 µs
@psych/lib - n=5000,1 - Recursive Quick Sort                         390.9 µs         2,559 (359.8 µs … 515.4 µs) 397.2 µs 467.3 µs 487.7 µs
@psych/lib - n=5000,1 - Merge Sort                                   539.4 µs         1,854 (494.2 µs … 617.6 µs) 540.2 µs 603.0 µs 609.7 µs
@psych/lib - n=5000,1 - Heap Sort                                    670.5 µs         1,492 (616.5 µs … 837.7 µs) 680.0 µs 785.5 µs 814.6 µs
@psych/lib - Z Score to P Value                                        6.5 ns   154,300,000 (  5.9 ns …  19.1 ns)   6.4 ns  11.6 ns  12.3 ns
@psych/lib - P Value to Z Score                                       14.6 ns    68,550,000 ( 12.9 ns …  25.7 ns)  14.6 ns  20.2 ns  20.7 ns
@psych/lib - df=30 - T to P Value                                    113.0 ns     8,847,000 (107.1 ns … 125.7 ns) 115.9 ns 122.5 ns 122.8 ns
@psych/lib - df=30 - P Value to T                                    486.9 ns     2,054,000 (464.6 ns … 521.1 ns) 498.4 ns 520.2 ns 521.1 ns
@psych/lib - df=5,30 - F to P Value                                   93.5 ns    10,690,000 ( 86.9 ns … 107.3 ns)  94.5 ns 103.6 ns 105.3 ns
@psych/lib - df=5,30 - P Value to F                                  543.5 ns     1,840,000 (518.3 ns … 574.0 ns) 556.4 ns 566.4 ns 574.0 ns
@psych/lib - df=6 - Chi2 to P Value                                   41.0 ns    24,410,000 ( 37.8 ns …  56.1 ns)  41.0 ns  48.0 ns  49.1 ns
@psych/lib - df=6 - P Value to Chi2                                  387.6 ns     2,580,000 (375.2 ns … 415.0 ns) 391.4 ns 410.6 ns 415.0 ns
@psych/lib - Random Normal Distribution                               15.6 ns    63,990,000 ( 13.4 ns …  26.3 ns)  15.6 ns  21.1 ns  21.9 ns
@psych/lib - df=30 - Random T Distribution                           127.0 ns     7,874,000 (117.9 ns … 140.1 ns) 130.6 ns 137.3 ns 138.6 ns
@psych/lib - df=5,30 - Random F Distribution                         190.6 ns     5,246,000 (177.6 ns … 205.3 ns) 196.7 ns 204.6 ns 204.6 ns
@psych/lib - df=6 - Random Chi2 Distribution                          88.7 ns    11,280,000 ( 84.3 ns … 105.0 ns)  90.0 ns 100.7 ns 103.1 ns
@psych/lib - n=500 - Kurtosis Test                                    27.2 µs        36,800 ( 23.2 µs … 159.4 µs)  28.5 µs  34.0 µs  35.7 µs
@psych/lib - n=500 - Skewness Test                                    27.8 µs        36,000 ( 23.4 µs … 144.7 µs)  29.1 µs  34.9 µs  38.0 µs
@psych/lib - n=500 - One Way Anova                                    26.4 µs        37,910 ( 19.5 µs … 166.5 µs)  28.0 µs  33.2 µs  46.6 µs
@psych/lib - n=500 - Levene Test                                      55.3 µs        18,080 ( 48.8 µs … 208.0 µs)  55.7 µs  64.1 µs 116.3 µs
@psych/lib - n=500,1 - One Sample KS Test                            109.8 µs         9,106 ( 92.9 µs … 205.8 µs) 110.0 µs 174.2 µs 177.7 µs
@psych/lib - n=500,1 - One Sample T Test                              10.6 µs        94,520 (  8.7 µs … 123.0 µs)  10.1 µs  17.1 µs  17.5 µs
@psych/lib - n=500,2 - Two Sample T Test                              25.4 µs        39,380 ( 19.8 µs … 138.1 µs)  33.1 µs  36.5 µs  40.4 µs
@psych/lib - n=500,2 - Paired T Test                                  23.6 µs        42,430 ( 18.3 µs … 127.9 µs)  26.6 µs  31.8 µs  52.3 µs
@psych/lib - n=500,2 - Welch T Test                                   24.4 µs        40,920 ( 16.7 µs … 142.0 µs)  32.2 µs  37.4 µs  42.9 µs
@psych/lib - n=500,2 - Pearson Correlation Test                       22.2 µs        45,020 ( 16.1 µs … 242.2 µs)  25.4 µs  37.2 µs  41.8 µs
@psych/lib - n=500,2 - Linear Regression One                          33.3 µs        30,070 ( 19.2 µs … 289.0 µs)  46.1 µs  50.6 µs  79.8 µs
@psych/lib - n=500,3 - Linear Regression Two                          67.4 µs        14,840 ( 40.3 µs … 175.6 µs)  72.0 µs  87.0 µs 134.5 µs
@psych/lib - n=500,3,B=5000 - Bootstrap CI (ab)                       67.2 ms          14.9 ( 62.5 ms …  76.2 ms)  68.6 ms  76.2 ms  76.2 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (mean)                     37.8 ms          26.5 ( 35.5 ms …  39.9 ms)  38.6 ms  39.9 ms  39.9 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (median)                  125.2 ms           8.0 (124.0 ms … 128.4 ms) 125.7 ms 128.4 ms 128.4 ms
@psych/lib - n=500,3 - Cronbach's Alpha                               54.0 µs        18,510 ( 41.7 µs … 166.6 µs)  55.5 µs 117.0 µs 122.4 µs
```
