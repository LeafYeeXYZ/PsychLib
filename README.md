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
Base Bench - sum - @psych/lib                        8.2 µs       122,500 (  6.2 µs … 936.5 µs)   7.9 µs  12.9 µs  13.7 µs
Base Bench - sum - simple-statistics                10.7 µs        93,860 (  9.1 µs … 126.5 µs)  11.0 µs  13.3 µs  14.3 µs
Base Bench - sum - mathjs                           18.9 µs        52,920 ( 10.4 µs … 144.8 µs)  24.7 µs  32.4 µs  38.2 µs
Base Bench - mean - @psych/lib                       8.5 µs       117,400 (  6.5 µs … 119.6 µs)   8.2 µs  13.4 µs  14.5 µs
Base Bench - mean - simple-statistics                8.5 µs       117,100 (  6.2 µs … 145.6 µs)   8.4 µs  12.9 µs  13.9 µs
Base Bench - mean - mathjs                          25.3 µs        39,590 ( 19.8 µs … 151.5 µs)  30.4 µs  33.5 µs  40.5 µs
Base Bench - max - @psych/lib                        8.6 µs       116,900 (  6.6 µs … 127.5 µs)   8.2 µs  13.1 µs  13.9 µs
Base Bench - max - simple-statistics                 8.5 µs       117,400 (  6.0 µs … 114.2 µs)   8.4 µs  13.2 µs  14.4 µs
Base Bench - max - mathjs                           15.3 µs        65,340 (  9.5 µs … 178.6 µs)  11.8 µs  36.1 µs  39.8 µs
Base Bench - min - @psych/lib                        8.0 µs       125,400 (  6.2 µs … 134.5 µs)   7.8 µs  12.6 µs  13.3 µs
Base Bench - min - simple-statistics                 7.8 µs       127,500 (  6.1 µs … 136.4 µs)   7.7 µs  12.6 µs  13.4 µs
Base Bench - min - mathjs                           15.3 µs        65,280 (  9.6 µs … 184.5 µs)  11.8 µs  35.1 µs  38.1 µs
Base Bench - median - @psych/lib                    59.9 µs        16,680 ( 48.3 µs … 270.4 µs)  61.9 µs  68.0 µs  73.3 µs
Base Bench - median - simple-statistics             16.6 µs        60,070 ( 11.0 µs … 152.3 µs)  17.4 µs  23.0 µs  24.8 µs
Base Bench - median - mathjs                        63.2 µs        15,830 ( 47.8 µs … 245.8 µs)  65.2 µs  81.5 µs 130.8 µs
Base Bench - quantile - @psych/lib                 121.0 µs         8,266 (103.6 µs … 276.2 µs) 123.5 µs 135.6 µs 192.6 µs
Base Bench - quantile - simple-statistics           35.1 µs        28,490 ( 23.1 µs … 135.5 µs)  39.0 µs  44.6 µs  93.6 µs
Base Bench - quantile - mathjs                     121.2 µs         8,250 ( 91.8 µs … 305.3 µs) 124.5 µs 186.2 µs 193.5 µs
Base Bench - vari - @psych/lib                       9.4 µs       106,500 (  6.7 µs … 123.7 µs)   8.4 µs  20.1 µs  21.5 µs
Base Bench - vari - simple-statistics                8.7 µs       115,000 (  7.3 µs …  99.6 µs)   8.5 µs  13.0 µs  14.0 µs
Base Bench - vari - mathjs                          75.2 µs        13,300 ( 34.2 µs … 170.9 µs)  85.0 µs  97.4 µs 139.8 µs
Base Bench - std - @psych/lib                        8.6 µs       116,900 (  6.7 µs … 151.4 µs)   8.4 µs  13.3 µs  14.3 µs
Base Bench - std - simple-statistics                 8.6 µs       115,700 (  7.2 µs … 149.7 µs)   8.5 µs  13.3 µs  14.5 µs
Base Bench - std - mathjs                           66.6 µs        15,010 ( 55.9 µs … 182.8 µs)  68.5 µs  77.2 µs 123.1 µs
Base Bench - corr - @psych/lib                      39.8 µs        25,100 ( 22.3 µs …   1.3 ms)  39.6 µs  87.0 µs 107.3 µs
Base Bench - corr - simple-statistics               25.4 µs        39,330 ( 16.4 µs …   1.4 ms)  27.2 µs  66.6 µs  89.8 µs
Base Bench - corr - mathjs                          94.2 µs        10,620 ( 75.3 µs … 246.8 µs) 131.3 µs 146.2 µs 201.5 µs
Base Bench - cov - @psych/lib                       20.4 µs        49,130 ( 14.4 µs … 126.4 µs)  23.9 µs  26.7 µs  72.1 µs
Base Bench - cov - simple-statistics                18.4 µs        54,300 ( 14.2 µs … 130.9 µs)  17.8 µs  26.0 µs  72.1 µs
Base Bench - kurtosis - @psych/lib                  41.4 µs        24,180 ( 36.9 µs … 181.8 µs)  42.2 µs  48.6 µs  53.1 µs
Base Bench - kurtosis - simple-statistics            8.8 µs       113,700 (  6.9 µs … 151.5 µs)   8.6 µs  13.2 µs  14.1 µs
Base Bench - skewness - @psych/lib                  41.6 µs        24,060 ( 37.0 µs … 165.5 µs)  44.4 µs  48.2 µs  51.6 µs
Base Bench - skewness - simple-statistics            8.9 µs       112,900 (  6.9 µs … 172.5 µs)   8.6 µs  13.9 µs  18.3 µs
Base Bench - sort - @psych/lib                     116.3 µs         8,601 ( 98.5 µs … 348.6 µs) 117.6 µs 132.9 µs 193.4 µs
Base Bench - sort - native                         272.8 µs         3,666 (244.1 µs … 676.6 µs) 273.4 µs 358.5 µs 497.8 µs
Base Bench - sort - mathjs                         418.8 µs         2,388 (406.0 µs … 582.5 µs) 421.4 µs 460.5 µs 503.8 µs
Base Bench - ss - @psych/lib                         9.3 µs       107,000 (  6.7 µs … 151.4 µs)   8.5 µs  19.7 µs  20.7 µs
Base Bench - ss - native                             9.1 µs       110,500 (  6.3 µs … 200.0 µs)   8.0 µs  20.0 µs  21.1 µs
Base Bench - ssDiff - @psych/lib                    23.9 µs        41,910 ( 13.2 µs … 147.8 µs)  29.4 µs  32.9 µs  71.8 µs
Base Bench - ssDiff - native                        18.2 µs        54,850 ( 12.5 µs … 111.5 µs)  22.3 µs  30.3 µs  70.9 µs
Base Bench - sp - @psych/lib                        17.7 µs        56,500 ( 13.4 µs … 107.6 µs)  16.8 µs  25.7 µs  69.1 µs
Base Bench - sp - native                            20.2 µs        49,430 ( 14.4 µs … 118.0 µs)  31.2 µs  34.2 µs  71.5 µs
Base Bench - sem - @psych/lib                        8.5 µs       117,300 (  6.7 µs … 100.8 µs)   8.3 µs  13.0 µs  13.8 µs
Base Bench - sem - simple-statistics                12.5 µs        79,910 ( 10.9 µs …  12.9 µs)  12.6 µs  12.9 µs  12.9 µs


benchmark                                             time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------------------------------- ----------------------------- --------------------- --------------------------
Correlation Bench - PearsonCorrTest - @psych/lib              32.0 µs        31,270 ( 15.5 µs … 223.4 µs)  39.0 µs  73.0 µs  83.8 µs
Correlation Bench - PearsonCorrTest - @stdlib/stats           25.2 µs        39,730 ( 20.3 µs … 323.9 µs)  29.9 µs  65.8 µs  78.8 µs


benchmark                               time/iter (avg)        iter/s      (min … max)           p75      p99     p995
--------------------------------------- ----------------------------- --------------------- --------------------------
Distribution Bench - z2p - @psych/lib            6.8 ns   147,300,000 (  6.2 ns …  58.4 ns)   6.7 ns  11.8 ns  12.0 ns
Distribution Bench - z2p - jstat-esm            46.5 ns    21,520,000 ( 42.6 ns …  54.0 ns)  47.5 ns  51.2 ns  51.7 ns
Distribution Bench - p2z - @psych/lib           14.8 ns    67,370,000 ( 13.1 ns …  24.1 ns)  14.7 ns  19.3 ns  19.5 ns
Distribution Bench - p2z - jstat-esm           187.8 ns     5,325,000 (183.8 ns … 219.4 ns) 188.9 ns 208.2 ns 209.9 ns
Distribution Bench - t2p - @psych/lib          162.8 ns     6,143,000 (148.8 ns … 171.5 ns) 163.9 ns 169.7 ns 171.0 ns
Distribution Bench - t2p - jstat-esm           171.7 ns     5,825,000 (157.8 ns … 180.6 ns) 174.9 ns 180.2 ns 180.5 ns
Distribution Bench - p2t - @psych/lib            5.3 µs       189,300 (  5.2 µs …   6.0 µs)   5.3 µs   6.0 µs   6.0 µs
Distribution Bench - p2t - jstat-esm           503.8 ns     1,985,000 (478.9 ns … 534.7 ns) 515.4 ns 532.0 ns 534.7 ns
Distribution Bench - f2p - @psych/lib          128.7 ns     7,769,000 (118.2 ns … 139.8 ns) 128.9 ns 134.2 ns 134.5 ns
Distribution Bench - f2p - jstat-esm           132.3 ns     7,561,000 (120.1 ns … 138.0 ns) 134.7 ns 137.4 ns 138.0 ns
Distribution Bench - p2f - @psych/lib            4.0 µs       251,800 (  3.8 µs …   4.5 µs)   4.0 µs   4.5 µs   4.5 µs
Distribution Bench - p2f - jstat-esm           610.5 ns     1,638,000 (572.3 ns … 621.2 ns) 617.4 ns 621.2 ns 621.2 ns


benchmark                                             time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------------------------------- ----------------------------- --------------------- --------------------------
TTest Bench - OneSampleTTest - @psych/lib                     14.5 µs        68,890 ( 11.8 µs … 110.2 µs)  15.7 µs  24.5 µs  54.8 µs
TTest Bench - OneSampleTTest - @stdlib/stats-ttest            13.4 µs        74,660 ( 11.0 µs … 130.2 µs)  12.9 µs  21.1 µs  56.1 µs
TTest Bench - TwoSampleTTest - @psych/lib                     43.7 µs        22,870 ( 31.1 µs … 372.5 µs)  46.7 µs  56.9 µs 101.4 µs
TTest Bench - TwoSampleTTest - @stdlib/stats-ttest2           26.6 µs        37,560 ( 21.6 µs … 123.1 µs)  31.8 µs  37.1 µs  79.5 µs
TTest Bench - PeerSampleTTest - @psych/lib                    29.1 µs        34,360 ( 22.3 µs … 181.6 µs)  33.8 µs  40.3 µs  84.2 µs
TTest Bench - PeerSampleTTest - @stdlib/stats-ttest           26.1 µs        38,250 ( 20.3 µs … 199.5 µs)  31.0 µs  38.2 µs  84.5 µs
TTest Bench - WelchTTest - @psych/lib                         42.2 µs        23,710 ( 28.8 µs … 151.7 µs)  45.5 µs  52.8 µs  95.7 µs
```