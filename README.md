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

If you haven't installed `deno` yet, please install it referring to the <https://deno.com>. Then, clone this repository and install dependencies.

```bash
git clone https://github.com/LeafYeeXYZ/PsychLib.git
```

Now you can write `TypeScript` code in `/lib/**/*.ts` and export functions in `/lib/index.ts`. After writing the code, remember to add test cases in `/tests/*.test.ts`. You can run the test cases using the following command.

```bash
deno test -A
```

You can also add benchmark cases in `/benchs/*.bench.ts` and run the benchmark using the following command.

```bash
deno bench -A
```

This project publishes to <https://jsr.io>, so you don't need to compile the code to JavaScript. Just use the following command to publish the code.

```bash
deno publish
```

# Benchmark

```bash
   Date | 2024-11-04
    CPU | Apple M3
Runtime | Deno 2.0.4 (aarch64-apple-darwin)


benchmark                                   time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------------------- ----------------------------- --------------------- --------------------------
Base Bench - sum - @psych/lib                        7.9 µs       125,900 (  6.1 µs … 109.6 µs)   7.6 µs  12.7 µs  13.2 µs
Base Bench - sum - simple-statistics                 8.4 µs       118,400 (  6.2 µs … 130.4 µs)   8.3 µs  12.7 µs  13.7 µs
Base Bench - sum - mathjs                           22.5 µs        44,520 (  9.8 µs … 146.2 µs)  31.4 µs  35.9 µs  45.4 µs
Base Bench - mean - @psych/lib                       8.5 µs       118,300 (  6.5 µs … 142.6 µs)   8.2 µs  13.5 µs  14.7 µs
Base Bench - mean - simple-statistics                8.5 µs       117,100 (  6.6 µs … 139.6 µs)   8.4 µs  12.8 µs  13.9 µs
Base Bench - mean - mathjs                          27.7 µs        36,140 ( 23.4 µs … 159.3 µs)  33.4 µs  36.8 µs  48.4 µs
Base Bench - max - @psych/lib                        8.5 µs       117,800 (  6.2 µs … 111.6 µs)   8.2 µs  13.0 µs  14.0 µs
Base Bench - max - simple-statistics                 8.4 µs       119,500 (  6.5 µs … 123.9 µs)   8.0 µs  13.1 µs  14.0 µs
Base Bench - max - mathjs                           17.2 µs        58,040 (  9.6 µs … 153.6 µs)  11.8 µs  42.8 µs  47.3 µs
Base Bench - min - @psych/lib                        7.7 µs       129,500 (  7.5 µs …  10.4 µs)   7.6 µs  10.4 µs  10.4 µs
Base Bench - min - simple-statistics                 7.5 µs       132,600 (  7.3 µs …  10.3 µs)   7.4 µs  10.3 µs  10.3 µs
Base Bench - min - mathjs                           17.3 µs        57,710 (  9.6 µs … 198.1 µs)  11.9 µs  43.0 µs  45.8 µs
Base Bench - median - @psych/lib                    59.9 µs        16,700 ( 48.2 µs … 369.6 µs)  61.6 µs  68.2 µs  77.4 µs
Base Bench - median - simple-statistics             16.8 µs        59,560 ( 11.0 µs … 143.8 µs)  17.5 µs  23.3 µs  25.2 µs
Base Bench - median - mathjs                        68.5 µs        14,600 ( 53.8 µs … 198.5 µs)  70.5 µs  85.7 µs 136.6 µs
Base Bench - quantile - @psych/lib                 121.2 µs         8,254 (104.1 µs … 247.3 µs) 123.5 µs 134.8 µs 198.2 µs
Base Bench - quantile - simple-statistics           34.9 µs        28,640 ( 23.0 µs … 158.1 µs)  39.1 µs  44.6 µs  98.3 µs
Base Bench - quantile - mathjs                     132.7 µs         7,537 (104.8 µs … 264.8 µs) 136.4 µs 201.7 µs 209.8 µs
Base Bench - vari - @psych/lib                       9.4 µs       106,700 (  6.7 µs … 118.5 µs)   8.4 µs  19.9 µs  20.8 µs
Base Bench - vari - simple-statistics                8.7 µs       115,500 (  6.8 µs … 129.9 µs)   8.4 µs  13.0 µs  14.0 µs
Base Bench - vari - mathjs                          85.8 µs        11,650 ( 40.7 µs … 215.2 µs)  92.7 µs 103.2 µs 158.9 µs
Base Bench - std - @psych/lib                        8.6 µs       116,600 (  6.7 µs … 146.2 µs)   8.4 µs  13.0 µs  13.7 µs
Base Bench - std - simple-statistics                 8.7 µs       115,300 (  7.3 µs … 116.3 µs)   8.5 µs  13.0 µs  13.8 µs
Base Bench - std - mathjs                           74.2 µs        13,470 ( 65.9 µs … 184.5 µs)  72.1 µs 108.9 µs 131.7 µs
Base Bench - corr - @psych/lib                      38.7 µs        25,870 ( 22.0 µs … 139.4 µs)  39.6 µs  44.6 µs 102.9 µs
Base Bench - corr - simple-statistics               24.4 µs        41,040 ( 17.5 µs … 137.2 µs)  27.1 µs  31.6 µs  76.0 µs
Base Bench - corr - mathjs                         100.2 µs         9,975 ( 75.4 µs … 274.4 µs) 146.1 µs 162.5 µs 214.1 µs
Base Bench - cov - @psych/lib                       20.4 µs        49,030 ( 14.4 µs … 121.3 µs)  23.9 µs  27.0 µs  71.9 µs
Base Bench - cov - simple-statistics                18.6 µs        53,820 ( 14.5 µs … 119.1 µs)  17.9 µs  25.9 µs  70.8 µs
Base Bench - kurtosis - @psych/lib                  42.1 µs        23,760 ( 36.9 µs … 174.0 µs)  44.8 µs  49.0 µs  52.4 µs
Base Bench - kurtosis - simple-statistics            8.8 µs       113,100 (  7.4 µs … 117.8 µs)   8.7 µs  13.3 µs  15.0 µs
Base Bench - skewness - @psych/lib                  42.1 µs        23,770 ( 36.9 µs … 211.5 µs)  44.8 µs  48.0 µs  51.6 µs
Base Bench - skewness - simple-statistics            8.7 µs       115,300 (  7.0 µs … 138.3 µs)   8.4 µs  13.2 µs  14.3 µs
Base Bench - sort - @psych/lib                     116.7 µs         8,569 ( 98.4 µs … 308.5 µs) 117.7 µs 130.5 µs 185.4 µs
Base Bench - sort - native                         271.4 µs         3,685 (243.6 µs … 411.3 µs) 272.7 µs 343.3 µs 346.8 µs
Base Bench - sort - mathjs                         435.4 µs         2,297 (399.3 µs … 561.9 µs) 438.4 µs 509.5 µs 519.1 µs
Base Bench - ss - @psych/lib                         9.3 µs       107,600 (  7.1 µs … 131.0 µs)   8.4 µs  19.4 µs  20.4 µs
Base Bench - ss - native                             9.0 µs       111,200 (  6.3 µs … 106.6 µs)   8.0 µs  19.7 µs  20.8 µs
Base Bench - ssDiff - @psych/lib                    23.9 µs        41,800 ( 12.3 µs … 115.1 µs)  29.5 µs  32.5 µs  74.1 µs
Base Bench - ssDiff - native                        18.1 µs        55,210 ( 12.5 µs … 142.4 µs)  20.5 µs  31.6 µs  69.8 µs
Base Bench - sp - @psych/lib                        17.7 µs        56,500 ( 13.6 µs … 106.7 µs)  16.8 µs  25.6 µs  68.8 µs
Base Bench - sp - native                            20.2 µs        49,530 ( 13.5 µs … 127.7 µs)  30.9 µs  33.7 µs  75.5 µs
Base Bench - sem - @psych/lib                        8.6 µs       116,500 (  6.7 µs … 113.1 µs)   8.4 µs  13.0 µs  13.7 µs
Base Bench - sem - simple-statistics                 8.4 µs       118,600 (  8.2 µs …  11.0 µs)   8.3 µs  11.0 µs  11.0 µs


benchmark                                             time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------------------------------- ----------------------------- --------------------- --------------------------
Correlation Bench - PearsonCorrTest - @psych/lib              30.7 µs        32,540 ( 16.3 µs … 237.2 µs)  40.0 µs  66.1 µs  85.5 µs
Correlation Bench - PearsonCorrTest - @stdlib/stats           26.1 µs        38,250 ( 19.3 µs … 370.7 µs)  30.8 µs  45.8 µs  87.9 µs


benchmark                               time/iter (avg)        iter/s      (min … max)           p75      p99     p995
--------------------------------------- ----------------------------- --------------------- --------------------------
Distribution Bench - z2p - @psych/lib            5.9 ns   168,200,000 (  5.7 ns …  65.5 ns)   5.8 ns  10.9 ns  11.2 ns
Distribution Bench - z2p - jstat-esm            47.7 ns    20,960,000 ( 42.6 ns …  52.4 ns)  50.3 ns  51.6 ns  51.9 ns
Distribution Bench - p2z - @psych/lib           14.9 ns    66,950,000 ( 13.1 ns …  24.1 ns)  14.8 ns  19.4 ns  19.6 ns
Distribution Bench - p2z - jstat-esm           191.3 ns     5,226,000 (184.4 ns … 219.1 ns) 193.0 ns 207.0 ns 210.6 ns
Distribution Bench - t2p - @psych/lib          916.5 ns     1,091,000 (911.2 ns … 954.2 ns) 917.8 ns 954.2 ns 954.2 ns
Distribution Bench - t2p - jstat-esm           126.7 ns     7,894,000 (116.6 ns … 147.4 ns) 129.8 ns 134.3 ns 138.2 ns
Distribution Bench - p2t - @psych/lib           34.5 µs        28,960 ( 33.6 µs … 141.8 µs)  34.7 µs  42.0 µs  43.7 µs
Distribution Bench - p2t - jstat-esm           571.7 ns     1,749,000 (535.2 ns … 583.4 ns) 574.6 ns 583.4 ns 583.4 ns
Distribution Bench - f2p - @psych/lib          900.3 ns     1,111,000 (893.1 ns … 941.0 ns) 900.6 ns 941.0 ns 941.0 ns
Distribution Bench - f2p - jstat-esm           114.1 ns     8,768,000 (104.4 ns … 121.7 ns) 116.6 ns 119.5 ns 120.5 ns
Distribution Bench - p2f - @psych/lib           34.6 µs        28,890 ( 33.6 µs … 131.4 µs)  34.6 µs  42.2 µs  44.0 µs
Distribution Bench - p2f - jstat-esm           586.7 ns     1,704,000 (552.3 ns … 637.9 ns) 593.7 ns 637.9 ns 637.9 ns


benchmark                                             time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------------------------------- ----------------------------- --------------------- --------------------------
TTest Bench - OneSampleTTest - @psych/lib                     49.5 µs        20,210 ( 41.5 µs … 155.4 µs)  51.0 µs  65.2 µs 101.8 µs
TTest Bench - OneSampleTTest - @stdlib/stats-ttest            13.2 µs        75,680 ( 10.6 µs … 157.5 µs)  12.8 µs  20.8 µs  55.9 µs
TTest Bench - TwoSampleTTest - @psych/lib                     79.0 µs        12,660 ( 71.7 µs … 442.0 µs)  78.1 µs 127.1 µs 130.9 µs
TTest Bench - TwoSampleTTest - @stdlib/stats-ttest2           26.1 µs        38,290 ( 21.1 µs … 130.4 µs)  31.4 µs  36.3 µs  79.9 µs
TTest Bench - PeerSampleTTest - @psych/lib                    65.4 µs        15,300 ( 52.4 µs … 227.5 µs)  66.3 µs 114.9 µs 131.7 µs
TTest Bench - PeerSampleTTest - @stdlib/stats-ttest           26.0 µs        38,490 ( 20.2 µs … 132.1 µs)  30.6 µs  37.6 µs  85.4 µs
TTest Bench - WelchTTest - @psych/lib                         78.0 µs        12,820 ( 71.0 µs … 258.9 µs)  77.6 µs  88.5 µs 145.5 µs
```