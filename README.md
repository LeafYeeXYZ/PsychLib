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
Runtime | Deno 2.1.7 (aarch64-apple-darwin)


benchmark                                                     time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------------------------------------- ----------------------------- --------------------- --------------------------
Baseline (Generate Data) - n=500,1                                     7.9 µs       125,900 (  6.8 µs …  96.7 µs)   7.7 µs  11.7 µs  14.2 µs
Baseline (Generate Data) - n=500,2                                    17.2 µs        58,150 ( 14.3 µs … 170.7 µs)  18.2 µs  27.5 µs  58.0 µs
Baseline (Generate Data) - n=500,3                                    27.8 µs        36,020 ( 22.0 µs …  97.6 µs)  31.0 µs  64.4 µs  73.3 µs
Baseline (Generate Group) - n=500 - for ANOVA & Levene test            9.3 µs       108,000 (  8.0 µs … 354.9 µs)   9.2 µs  12.7 µs  15.3 µs
Baseline (Math.random) - for distribution benchmarks                   3.7 ns   268,600,000 (  3.4 ns …  14.5 ns)   3.8 ns   8.1 ns   8.9 ns
@psych/lib - n=5000,1 - Array.prototype.sort                         851.9 µs         1,174 (790.8 µs …   1.1 ms) 870.4 µs   1.0 ms   1.0 ms
@psych/lib - n=5000,1 - Iterative Quick Sort                         353.7 µs         2,828 (329.1 µs … 544.9 µs) 356.5 µs 458.2 µs 486.6 µs
@psych/lib - n=5000,1 - Recursive Quick Sort                         375.6 µs         2,662 (356.8 µs … 553.1 µs) 378.3 µs 466.4 µs 478.4 µs
@psych/lib - n=5000,1 - Merge Sort                                   517.8 µs         1,931 (495.9 µs … 687.9 µs) 523.8 µs 632.8 µs 649.7 µs
@psych/lib - n=5000,1 - Heap Sort                                    638.2 µs         1,567 (614.1 µs … 793.2 µs) 653.8 µs 730.2 µs 763.0 µs
@psych/lib - Z Score to P Value                                        6.4 ns   155,000,000 (  5.9 ns …  19.7 ns)   6.4 ns  11.0 ns  12.2 ns
@psych/lib - P Value to Z Score                                       14.3 ns    69,730,000 ( 13.1 ns …  28.9 ns)  14.7 ns  19.7 ns  20.1 ns
@psych/lib - df=30 - T to P Value                                    108.9 ns     9,185,000 (107.2 ns … 125.1 ns) 108.9 ns 118.8 ns 121.6 ns
@psych/lib - df=30 - P Value to T                                    468.5 ns     2,134,000 (461.4 ns … 493.6 ns) 470.4 ns 483.4 ns 493.6 ns
@psych/lib - df=5,30 - F to P Value                                   93.9 ns    10,650,000 ( 86.5 ns … 737.9 ns)  89.5 ns 242.0 ns 629.6 ns
@psych/lib - df=5,30 - P Value to F                                  523.9 ns     1,909,000 (513.7 ns … 549.0 ns) 526.4 ns 545.9 ns 549.0 ns
@psych/lib - df=6 - Chi2 to P Value                                   42.0 ns    23,790,000 ( 38.6 ns … 397.8 ns)  41.7 ns  81.7 ns 215.0 ns
@psych/lib - df=6 - P Value to Chi2                                  384.4 ns     2,601,000 (376.2 ns … 406.9 ns) 387.2 ns 402.4 ns 406.9 ns
@psych/lib - Random Normal Distribution                               26.4 ns    37,930,000 ( 13.4 ns … 439.7 ns)  16.2 ns 225.0 ns 274.8 ns
@psych/lib - df=30 - Random T Distribution                           148.4 ns     6,738,000 (119.1 ns … 981.0 ns) 130.7 ns 758.7 ns 978.9 ns
@psych/lib - df=5,30 - Random F Distribution                         184.4 ns     5,424,000 (178.5 ns … 225.9 ns) 185.1 ns 205.0 ns 214.5 ns
@psych/lib - df=6 - Random Chi2 Distribution                          87.3 ns    11,450,000 ( 84.3 ns … 101.0 ns)  87.9 ns  95.1 ns  99.2 ns
@psych/lib - n=500 - Kurtosis Test                                    26.4 µs        37,910 ( 23.4 µs … 153.8 µs)  27.0 µs  33.2 µs  34.8 µs
@psych/lib - n=500 - Skewness Test                                    27.8 µs        35,930 ( 23.6 µs …   1.4 ms)  27.7 µs  35.0 µs  78.6 µs
@psych/lib - n=500 - One Way Anova                                    26.2 µs        38,150 ( 20.0 µs … 168.9 µs)  28.0 µs  33.9 µs  46.1 µs
@psych/lib - n=500,k=3 - RM Anova                                     50.7 µs        19,730 ( 39.0 µs … 168.2 µs)  53.6 µs 102.0 µs 112.5 µs
@psych/lib - n=500 - Levene Test                                      54.6 µs        18,330 ( 48.4 µs … 213.0 µs)  55.4 µs  66.6 µs 113.4 µs
@psych/lib - n=500,1 - One Sample KS Test                            108.6 µs         9,212 ( 93.3 µs … 258.9 µs) 109.3 µs 170.1 µs 173.8 µs
@psych/lib - n=500,1 - One Sample T Test                              10.1 µs        98,570 (  8.5 µs … 181.7 µs)   9.9 µs  15.9 µs  16.3 µs
@psych/lib - n=500,2 - Two Sample T Test                              24.8 µs        40,370 ( 18.3 µs … 134.4 µs)  31.2 µs  35.1 µs  40.0 µs
@psych/lib - n=500,2 - Paired T Test                                  22.5 µs        44,450 ( 18.1 µs … 162.9 µs)  24.9 µs  29.6 µs  45.6 µs
@psych/lib - n=500,2 - Welch T Test                                   24.0 µs        41,740 ( 16.5 µs … 210.6 µs)  31.7 µs  36.1 µs  43.4 µs
@psych/lib - n=500,2 - Pearson Correlation Test                       21.5 µs        46,460 ( 16.0 µs … 126.9 µs)  23.4 µs  35.1 µs  39.7 µs
@psych/lib - n=500,2 - Linear Regression One                          34.5 µs        28,950 ( 19.0 µs …   1.5 ms)  44.0 µs  83.7 µs 119.2 µs
@psych/lib - n=500,3 - Linear Regression Two                          66.8 µs        14,960 ( 39.9 µs … 208.2 µs)  71.9 µs  86.2 µs 131.2 µs
@psych/lib - n=500,3,B=5000 - Bootstrap CI (ab)                       65.2 ms          15.3 ( 60.6 ms …  74.4 ms)  67.8 ms  74.4 ms  74.4 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (mean)                     37.2 ms          26.9 ( 34.4 ms …  40.1 ms)  38.1 ms  40.1 ms  40.1 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (median)                  121.5 ms           8.2 (118.6 ms … 126.1 ms) 122.2 ms 126.1 ms 126.1 ms
@psych/lib - n=500,3 - Cronbach's Alpha                               54.2 µs        18,450 ( 42.5 µs … 179.1 µs)  56.3 µs 117.6 µs 126.0 µs
```
