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
   Date | 2024-11-05
    CPU | Apple M3
Runtime | Deno 2.0.4 (aarch64-apple-darwin)


benchmark                                   time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------------------- ----------------------------- --------------------- --------------------------
Base Bench - sum - @psych/lib                        8.1 µs       123,600 (  6.0 µs … 120.2 µs)   7.7 µs  12.9 µs  14.5 µs
Base Bench - sum - simple-statistics                 8.3 µs       120,300 (  6.1 µs … 129.9 µs)   8.2 µs  12.8 µs  14.5 µs
Base Bench - sum - mathjs                           18.5 µs        54,050 ( 10.0 µs … 235.2 µs)  24.5 µs  33.8 µs  62.0 µs
Base Bench - mean - @psych/lib                       8.3 µs       120,300 (  6.0 µs … 156.7 µs)   8.0 µs  13.3 µs  14.9 µs
Base Bench - mean - simple-statistics                8.4 µs       118,500 (  6.1 µs … 128.5 µs)   8.3 µs  13.0 µs  15.1 µs
Base Bench - mean - mathjs                          24.6 µs        40,710 ( 19.6 µs … 137.4 µs)  28.8 µs  33.4 µs  68.6 µs
Base Bench - max - @psych/lib                        8.4 µs       119,200 (  6.2 µs … 122.0 µs)   7.9 µs  13.1 µs  14.5 µs
Base Bench - max - simple-statistics                 8.3 µs       120,800 (  5.9 µs … 138.9 µs)   8.0 µs  13.1 µs  14.4 µs
Base Bench - max - mathjs                           14.9 µs        66,970 (  9.5 µs … 152.5 µs)  11.5 µs  33.8 µs  40.0 µs
Base Bench - min - @psych/lib                        7.5 µs       132,800 (  7.3 µs …  10.3 µs)   7.4 µs  10.3 µs  10.3 µs
Base Bench - min - simple-statistics                 7.5 µs       133,900 (  7.2 µs …  10.3 µs)   7.3 µs  10.3 µs  10.3 µs
Base Bench - min - mathjs                           15.1 µs        66,310 (  9.5 µs … 166.3 µs)  11.7 µs  34.2 µs  39.2 µs
Base Bench - median - @psych/lib                    59.4 µs        16,840 ( 48.5 µs … 217.5 µs)  61.3 µs  73.2 µs 106.4 µs
Base Bench - median - simple-statistics             16.7 µs        59,940 ( 10.9 µs … 137.5 µs)  17.5 µs  23.6 µs  29.1 µs
Base Bench - median - mathjs                        63.4 µs        15,780 ( 48.0 µs … 224.9 µs)  65.3 µs  95.1 µs 137.0 µs
Base Bench - quantile - @psych/lib                 121.3 µs         8,243 (103.3 µs … 442.1 µs) 123.4 µs 180.2 µs 211.2 µs
Base Bench - quantile - simple-statistics           34.7 µs        28,840 ( 23.0 µs … 159.0 µs)  38.6 µs  49.9 µs 102.2 µs
Base Bench - quantile - mathjs                     121.0 µs         8,267 ( 94.0 µs … 263.7 µs) 123.8 µs 196.9 µs 203.8 µs
Base Bench - vari - @psych/lib                       9.2 µs       108,200 (  6.6 µs … 241.8 µs)   8.1 µs  20.0 µs  21.0 µs
Base Bench - vari - simple-statistics                8.6 µs       116,800 (  6.8 µs … 151.8 µs)   8.2 µs  13.4 µs  14.7 µs
Base Bench - vari - mathjs                          74.0 µs        13,510 ( 33.6 µs … 200.6 µs)  81.6 µs 116.3 µs 148.0 µs
Base Bench - std - @psych/lib                        8.6 µs       116,400 (  6.7 µs … 121.6 µs)   8.4 µs  13.2 µs  14.7 µs
Base Bench - std - simple-statistics                 8.7 µs       114,800 (  6.8 µs … 128.0 µs)   8.5 µs  13.3 µs  14.8 µs
Base Bench - std - mathjs                           66.6 µs        15,020 ( 55.5 µs … 250.2 µs)  66.8 µs 110.5 µs 128.7 µs
Base Bench - corr - @psych/lib                      38.8 µs        25,790 ( 22.1 µs … 139.5 µs)  39.6 µs  54.1 µs 101.9 µs
Base Bench - corr - simple-statistics               24.4 µs        40,970 ( 16.4 µs … 195.9 µs)  27.2 µs  34.4 µs  79.5 µs
Base Bench - corr - mathjs                          93.8 µs        10,660 ( 70.8 µs … 227.5 µs) 129.5 µs 153.4 µs 201.3 µs
Base Bench - cov - @psych/lib                       20.5 µs        48,760 ( 13.5 µs … 160.2 µs)  23.9 µs  30.7 µs  75.5 µs
Base Bench - cov - simple-statistics                18.4 µs        54,220 ( 14.1 µs … 117.6 µs)  17.8 µs  27.7 µs  72.2 µs
Base Bench - kurtosis - @psych/lib                  42.1 µs        23,730 ( 36.8 µs … 186.9 µs)  44.8 µs  51.9 µs  60.0 µs
Base Bench - kurtosis - simple-statistics            8.7 µs       114,900 (  6.9 µs … 195.6 µs)   8.3 µs  13.7 µs  15.2 µs
Base Bench - skewness - @psych/lib                  41.9 µs        23,840 ( 36.9 µs … 200.5 µs)  44.8 µs  51.0 µs  64.2 µs
Base Bench - skewness - simple-statistics            8.7 µs       115,200 (  6.9 µs … 126.7 µs)   8.3 µs  13.5 µs  15.0 µs
Base Bench - sort - @psych/lib                     115.6 µs         8,652 ( 97.2 µs … 276.8 µs) 117.5 µs 163.5 µs 192.2 µs
Base Bench - sort - native                         271.4 µs         3,685 (237.6 µs … 539.8 µs) 273.5 µs 359.8 µs 392.6 µs
Base Bench - sort - mathjs                         419.6 µs         2,383 (381.5 µs … 601.3 µs) 423.7 µs 483.8 µs 505.9 µs
Base Bench - ss - @psych/lib                         9.2 µs       109,100 (  6.7 µs … 167.5 µs)   8.1 µs  19.5 µs  20.6 µs
Base Bench - ss - native                             8.9 µs       112,200 (  6.2 µs … 108.0 µs)   7.8 µs  19.8 µs  21.1 µs
Base Bench - ssDiff - @psych/lib                    23.9 µs        41,830 ( 12.4 µs … 125.5 µs)  29.4 µs  36.5 µs  73.7 µs
Base Bench - ssDiff - native                        18.4 µs        54,460 ( 12.5 µs … 174.3 µs)  23.9 µs  32.5 µs  72.8 µs
Base Bench - sp - @psych/lib                        17.8 µs        56,100 ( 13.5 µs … 117.9 µs)  16.9 µs  26.5 µs  71.2 µs
Base Bench - sp - native                            20.3 µs        49,150 ( 13.5 µs … 131.4 µs)  31.4 µs  35.9 µs  77.4 µs
Base Bench - sem - @psych/lib                        8.5 µs       117,600 (  6.7 µs … 104.0 µs)   8.1 µs  13.2 µs  14.5 µs
Base Bench - sem - simple-statistics                 8.3 µs       119,800 (  8.1 µs …  11.0 µs)   8.2 µs  11.0 µs  11.0 µs


benchmark                                             time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------------------------------- ----------------------------- --------------------- --------------------------
Correlation Bench - PearsonCorrTest - @psych/lib              32.3 µs        31,000 ( 15.0 µs … 208.6 µs)  39.2 µs  75.4 µs  87.0 µs
Correlation Bench - PearsonCorrTest - @stdlib/stats           25.5 µs        39,170 ( 19.2 µs … 316.8 µs)  30.0 µs  66.2 µs  83.0 µs


benchmark                                            time/iter (avg)        iter/s      (min … max)           p75      p99     p995
---------------------------------------------------- ----------------------------- --------------------- --------------------------
Distribution Bench - z2p - @psych/lib                         6.6 ns   151,300,000 (  5.9 ns …  24.6 ns)   6.4 ns  11.0 ns  11.4 ns
Distribution Bench - z2p - jstat-esm                         46.7 ns    21,410,000 ( 42.5 ns …  57.8 ns)  48.8 ns  53.6 ns  54.3 ns
Distribution Bench - p2z - @psych/lib                        14.9 ns    67,030,000 ( 13.2 ns …  24.3 ns)  14.8 ns  19.6 ns  20.0 ns
Distribution Bench - p2z - jstat-esm                        194.1 ns     5,152,000 (185.1 ns … 215.3 ns) 199.1 ns 214.0 ns 214.5 ns
Distribution Bench - t2p - @psych/lib                       160.9 ns     6,214,000 (149.0 ns … 177.7 ns) 163.0 ns 171.3 ns 174.3 ns
Distribution Bench - t2p - jstat-esm                        169.8 ns     5,888,000 (157.6 ns … 181.4 ns) 174.1 ns 178.7 ns 179.8 ns
Distribution Bench - p2t - @psych/lib                         5.3 µs       188,100 (  5.2 µs …   6.3 µs)   5.3 µs   6.3 µs   6.3 µs
Distribution Bench - p2t - jstat-esm                        511.4 ns     1,955,000 (480.2 ns … 549.6 ns) 519.0 ns 535.8 ns 549.6 ns
Distribution Bench - f2p - @psych/lib                       127.3 ns     7,857,000 (117.3 ns … 148.8 ns) 129.1 ns 136.7 ns 138.9 ns
Distribution Bench - f2p - jstat-esm                        131.1 ns     7,627,000 (121.0 ns … 144.2 ns) 134.7 ns 142.4 ns 142.8 ns
Distribution Bench - p2f - @psych/lib                         3.9 µs       253,600 (  3.9 µs …   4.6 µs)   3.9 µs   4.6 µs   4.6 µs
Distribution Bench - p2f - jstat-esm                        601.1 ns     1,664,000 (567.0 ns … 618.7 ns) 611.7 ns 618.7 ns 618.7 ns
Distribution Bench - c2p - @psych/lib                        61.2 ns    16,340,000 ( 54.7 ns …  74.1 ns)  61.9 ns  68.1 ns  68.9 ns
Distribution Bench - c2p - jstat-esm                        119.4 ns     8,377,000 (111.0 ns … 134.9 ns) 121.9 ns 130.4 ns 131.1 ns
Distribution Bench - p2c - @psych/lib                         2.7 µs       368,800 (  2.7 µs …   2.8 µs)   2.7 µs   2.8 µs   2.8 µs
Distribution Bench - p2c - jstat-esm                        398.1 ns     2,512,000 (379.9 ns … 425.8 ns) 410.3 ns 425.3 ns 425.8 ns
Distribution Bench - randomNormal - @psych/lib               15.6 ns    63,980,000 ( 13.4 ns …  24.8 ns)  15.7 ns  20.4 ns  20.8 ns
Distribution Bench - randomNormal - @stdlib/random           15.8 ns    63,400,000 ( 14.1 ns …  27.1 ns)  15.8 ns  21.0 ns  21.9 ns


benchmark                                       time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------------------------- ----------------------------- --------------------- --------------------------
TTest Bench - OneSampleTTest - @psych/lib               14.7 µs        68,060 ( 11.0 µs … 125.3 µs)  16.8 µs  25.3 µs  55.7 µs
TTest Bench - OneSampleTTest - @stdlib/stats            13.6 µs        73,480 ( 10.8 µs … 139.8 µs)  13.0 µs  23.0 µs  57.2 µs
TTest Bench - TwoSampleTTest - @psych/lib               44.0 µs        22,740 ( 30.9 µs … 451.6 µs)  46.8 µs  69.5 µs 102.4 µs
TTest Bench - TwoSampleTTest - @stdlib/stats            26.5 µs        37,710 ( 20.0 µs … 129.2 µs)  31.8 µs  42.1 µs  81.0 µs
TTest Bench - PeerSampleTTest - @psych/lib              29.3 µs        34,190 ( 22.3 µs … 171.7 µs)  33.8 µs  48.9 µs  89.5 µs
TTest Bench - PeerSampleTTest - @stdlib/stats           26.5 µs        37,790 ( 20.5 µs … 147.6 µs)  31.1 µs  44.0 µs  87.1 µs
TTest Bench - WelchTTest - @psych/lib                   42.5 µs        23,510 ( 29.2 µs … 156.5 µs)  45.7 µs  56.9 µs 102.0 µs
```