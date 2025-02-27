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
Runtime | Deno 2.2.1 (aarch64-apple-darwin)


benchmark                                                     time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------------------------------------- ----------------------------- --------------------- --------------------------
Baseline (Generate Data) - n=500,1                                     8.6 µs       116,600 (  6.8 µs … 120.8 µs)   8.3 µs  13.4 µs  16.5 µs
Baseline (Generate Data) - n=500,2                                    18.5 µs        54,050 ( 13.9 µs …   5.2 ms)  20.5 µs  47.5 µs  54.5 µs
Baseline (Generate Data) - n=500,3                                    48.0 µs        20,830 ( 21.9 µs …  12.2 ms)  34.8 µs 373.2 µs 755.3 µs
Baseline (Generate Group) - n=500 - for ANOVA & Levene test           10.3 µs        97,540 (  7.8 µs …   1.9 ms)   9.3 µs  24.3 µs  43.5 µs
Baseline (Math.random) - for distribution benchmarks                   3.8 ns   261,200,000 (  3.4 ns …  17.9 ns)   3.8 ns   7.5 ns   7.9 ns
@psych/lib - n=5000,1 - Array.prototype.sort                         879.2 µs         1,137 (811.4 µs … 992.4 µs) 879.0 µs 966.5 µs 972.8 µs
@psych/lib - n=5000,1 - Iterative Quick Sort                         369.8 µs         2,704 (336.4 µs … 468.1 µs) 373.2 µs 443.2 µs 450.0 µs
@psych/lib - n=5000,1 - Recursive Quick Sort                         396.1 µs         2,524 (360.7 µs … 488.0 µs) 398.4 µs 469.9 µs 474.4 µs
@psych/lib - n=5000,1 - Merge Sort                                   542.5 µs         1,843 (499.5 µs … 632.3 µs) 543.1 µs 596.2 µs 605.9 µs
@psych/lib - n=5000,1 - Heap Sort                                    674.1 µs         1,484 (625.0 µs … 775.6 µs) 674.5 µs 749.4 µs 759.8 µs
@psych/lib - Z Score to P Value                                        6.5 ns   154,400,000 (  5.9 ns …  17.6 ns)   6.4 ns  10.4 ns  10.9 ns
@psych/lib - P Value to Z Score                                       14.8 ns    67,690,000 ( 13.3 ns …  26.0 ns)  14.7 ns  18.7 ns  18.9 ns
@psych/lib - df=30 - T to P Value                                    113.9 ns     8,783,000 (106.7 ns … 125.1 ns) 115.7 ns 121.0 ns 121.3 ns
@psych/lib - df=30 - P Value to T                                    522.5 ns     1,914,000 (494.9 ns … 547.5 ns) 531.4 ns 544.1 ns 547.5 ns
@psych/lib - df=5,30 - F to P Value                                   93.9 ns    10,650,000 ( 87.1 ns … 106.7 ns)  94.6 ns 102.0 ns 104.3 ns
@psych/lib - df=5,30 - P Value to F                                  552.6 ns     1,809,000 (518.7 ns … 564.4 ns) 560.9 ns 563.1 ns 564.4 ns
@psych/lib - df=6 - Chi2 to P Value                                   41.7 ns    23,990,000 ( 38.6 ns …  54.2 ns)  41.8 ns  44.8 ns  47.7 ns
@psych/lib - df=6 - P Value to Chi2                                  345.7 ns     2,892,000 (327.5 ns … 375.8 ns) 355.9 ns 366.0 ns 375.8 ns
@psych/lib - Random Normal Distribution                               15.7 ns    63,540,000 ( 14.5 ns …  27.6 ns)  15.7 ns  19.7 ns  20.2 ns
@psych/lib - df=30 - Random T Distribution                            74.5 ns    13,420,000 ( 67.0 ns …  84.1 ns)  75.0 ns  80.5 ns  80.6 ns
@psych/lib - df=5,30 - Random F Distribution                         115.3 ns     8,675,000 (103.5 ns … 123.2 ns) 115.8 ns 121.2 ns 121.3 ns
@psych/lib - df=6 - Random Chi2 Distribution                          55.1 ns    18,140,000 ( 48.8 ns …  64.6 ns)  55.7 ns  60.7 ns  61.3 ns
@psych/lib - n=500 - Kurtosis Test                                    15.9 µs        62,740 ( 13.6 µs … 179.6 µs)  17.7 µs  18.8 µs  20.8 µs
@psych/lib - n=500 - Skewness Test                                    16.1 µs        62,170 ( 12.9 µs … 713.5 µs)  17.8 µs  19.4 µs  21.2 µs
@psych/lib - n=500 - One Way Anova                                    26.7 µs        37,400 ( 20.3 µs … 193.2 µs)  28.6 µs  33.2 µs  36.5 µs
@psych/lib - n=500,k=3 - RM Anova                                     49.4 µs        20,260 ( 38.3 µs … 227.0 µs)  52.5 µs  60.9 µs 120.8 µs
@psych/lib - n=500 - Levene Test                                      55.9 µs        17,880 ( 52.2 µs … 264.6 µs)  56.2 µs  63.2 µs  69.1 µs
@psych/lib - n=500,1 - One Sample KS Test                            110.4 µs         9,059 (102.7 µs … 286.5 µs) 110.2 µs 126.6 µs 203.0 µs
@psych/lib - n=500,1 - One Sample T Test                              10.3 µs        96,920 (  8.4 µs … 163.3 µs)  10.0 µs  14.5 µs  14.8 µs
@psych/lib - n=500,2 - Two Sample T Test                              22.0 µs        45,460 ( 18.1 µs … 181.6 µs)  27.4 µs  29.2 µs  31.6 µs
@psych/lib - n=500,2 - Paired T Test                                  22.4 µs        44,690 ( 18.0 µs … 193.2 µs)  26.5 µs  29.2 µs  32.7 µs
@psych/lib - n=500,2 - Welch T Test                                   21.3 µs        46,840 ( 16.5 µs … 164.5 µs)  26.4 µs  29.1 µs  31.0 µs
@psych/lib - n=500,2 - Pearson Correlation Test                       20.9 µs        47,890 ( 16.0 µs … 161.5 µs)  24.8 µs  29.0 µs  30.7 µs
@psych/lib - n=500,3,B=5000 - Bootstrap CI (ab)                       64.3 ms          15.6 ( 61.3 ms …  74.8 ms)  64.6 ms  74.8 ms  74.8 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (mean)                     36.9 ms          27.1 ( 34.7 ms …  39.9 ms)  37.8 ms  39.9 ms  39.9 ms
@psych/lib - n=500,3,B=5000 - Bootstrap CI (median)                  125.3 ms           8.0 (124.5 ms … 126.7 ms) 125.7 ms 126.7 ms 126.7 ms
@psych/lib - n=500,2 - Linear Regression One                          26.7 µs        37,510 ( 20.5 µs … 288.2 µs)  34.4 µs  36.7 µs  39.5 µs
@psych/lib - n=500,3 - Linear Regression Two                          55.6 µs        17,980 ( 39.1 µs … 394.0 µs)  61.0 µs  64.4 µs  68.0 µs
@psych/lib - n=500,5 - Linear Regression                             276.6 µs         3,615 (212.0 µs …   1.4 ms) 289.1 µs 457.1 µs 527.6 µs
@psych/lib - n=500,10 - Linear Regression                            591.8 µs         1,690 (500.2 µs … 926.2 µs) 611.6 µs 848.2 µs 903.9 µs
@psych/lib - n=500,3 - Cronbach's Alpha                               54.4 µs        18,380 ( 42.8 µs … 312.4 µs)  57.6 µs  63.5 µs  72.2 µs
@psych/lib - 50x100 - Matrix Creation                                 82.6 µs        12,100 ( 77.7 µs … 336.0 µs)  81.8 µs 114.3 µs 122.5 µs
@psych/lib - 50x100 - Matrix Addition                                183.6 µs         5,446 (173.2 µs … 437.2 µs) 183.2 µs 239.3 µs 372.0 µs
@psych/lib - 50x100 - Matrix Transpose                               102.7 µs         9,741 ( 96.7 µs … 351.9 µs) 102.3 µs 113.4 µs 126.8 µs
@psych/lib - 50x100 - Matrix Multiplication                            1.2 ms         824.9 (  1.2 ms …   1.6 ms)   1.2 ms   1.3 ms   1.6 ms
@psych/lib - 50x50 - Matrix Inverse                                  500.9 µs         1,996 (488.5 µs … 906.2 µs) 499.1 µs 545.0 µs 776.5 µs
```
