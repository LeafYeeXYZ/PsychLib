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
Base Bench - sum - @psych/lib                        8.0 µs       125,600 (  6.1 µs … 122.8 µs)   7.6 µs  12.6 µs  13.3 µs
Base Bench - sum - simple-statistics                 8.5 µs       118,000 (  6.2 µs … 157.4 µs)   8.2 µs  14.0 µs  17.3 µs
Base Bench - sum - mathjs                           23.2 µs        43,150 ( 10.0 µs … 157.2 µs)  32.4 µs  39.9 µs  68.7 µs
Base Bench - mean - @psych/lib                       8.8 µs       113,200 (  6.0 µs …   1.5 ms)   8.8 µs  16.4 µs  27.6 µs
Base Bench - mean - simple-statistics                8.6 µs       116,900 (  6.2 µs … 198.5 µs)   8.4 µs  13.9 µs  15.9 µs
Base Bench - mean - mathjs                          28.0 µs        35,750 ( 17.8 µs … 142.0 µs)  33.3 µs  38.3 µs  47.0 µs
Base Bench - max - @psych/lib                        8.4 µs       118,400 (  6.2 µs … 170.6 µs)   7.7 µs  13.2 µs  14.1 µs
Base Bench - max - simple-statistics                 8.3 µs       121,200 (  6.4 µs … 114.2 µs)   7.5 µs  13.1 µs  14.3 µs
Base Bench - max - mathjs                           17.1 µs        58,510 (  9.6 µs … 166.9 µs)  12.0 µs  41.5 µs  45.7 µs
Base Bench - min - @psych/lib                        8.0 µs       125,000 (  6.2 µs … 125.9 µs)   7.7 µs  13.1 µs  14.5 µs
Base Bench - min - simple-statistics                 7.7 µs       129,700 (  6.0 µs … 161.1 µs)   7.3 µs  13.0 µs  14.2 µs
Base Bench - min - mathjs                           17.5 µs        57,290 (  9.6 µs … 159.1 µs)  12.1 µs  42.7 µs  46.5 µs
Base Bench - median - @psych/lib                    64.7 µs        15,460 ( 48.1 µs …   5.7 ms)  62.5 µs 113.5 µs 151.4 µs
Base Bench - median - simple-statistics             17.1 µs        58,460 ( 11.2 µs … 423.0 µs)  17.8 µs  24.8 µs  29.6 µs
Base Bench - median - mathjs                        72.5 µs        13,800 ( 55.4 µs … 802.5 µs)  73.2 µs 151.0 µs 187.6 µs
Base Bench - quantile - @psych/lib                 122.2 µs         8,181 (104.8 µs … 264.3 µs) 123.8 µs 143.5 µs 199.8 µs
Base Bench - quantile - simple-statistics           35.0 µs        28,530 ( 23.1 µs … 178.3 µs)  38.9 µs  46.8 µs  93.2 µs
Base Bench - quantile - mathjs                     133.0 µs         7,520 (102.4 µs … 279.3 µs) 136.2 µs 216.4 µs 226.3 µs
Base Bench - vari - @psych/lib                       9.2 µs       108,900 (  7.1 µs … 168.8 µs)   8.0 µs  19.9 µs  21.0 µs
Base Bench - vari - simple-statistics                8.5 µs       117,100 (  6.8 µs … 119.8 µs)   8.2 µs  13.0 µs  13.9 µs
Base Bench - vari - mathjs                          86.4 µs        11,580 ( 38.2 µs … 187.7 µs)  93.3 µs 103.1 µs 158.2 µs
Base Bench - std - @psych/lib                        8.6 µs       116,500 (  6.7 µs … 146.2 µs)   8.4 µs  13.0 µs  14.0 µs
Base Bench - std - simple-statistics                 8.5 µs       117,200 (  6.9 µs … 114.4 µs)   8.2 µs  13.0 µs  14.1 µs
Base Bench - std - mathjs                           74.6 µs        13,400 ( 66.4 µs … 185.5 µs)  72.4 µs 114.2 µs 132.8 µs
Base Bench - corr - @psych/lib                      38.8 µs        25,800 ( 20.8 µs … 150.8 µs)  39.6 µs  45.4 µs 102.8 µs
Base Bench - corr - simple-statistics               24.3 µs        41,100 ( 16.4 µs … 127.0 µs)  27.2 µs  31.0 µs  77.3 µs
Base Bench - corr - mathjs                          99.2 µs        10,080 ( 75.0 µs … 244.8 µs) 145.2 µs 155.1 µs 214.4 µs
Base Bench - cov - @psych/lib                       20.2 µs        49,450 ( 13.4 µs … 166.0 µs)  23.9 µs  27.1 µs  72.5 µs
Base Bench - cov - simple-statistics                18.2 µs        54,820 ( 15.0 µs … 188.1 µs)  17.2 µs  25.9 µs  71.2 µs
Base Bench - kurtosis - @psych/lib                  42.0 µs        23,790 ( 36.8 µs … 173.0 µs)  44.9 µs  48.1 µs  51.8 µs
Base Bench - kurtosis - simple-statistics            8.6 µs       116,100 (  6.9 µs … 102.6 µs)   8.2 µs  13.2 µs  13.9 µs
Base Bench - skewness - @psych/lib                  41.9 µs        23,890 ( 36.9 µs … 180.6 µs)  44.9 µs  48.1 µs  52.4 µs
Base Bench - skewness - simple-statistics            8.6 µs       116,300 (  6.9 µs … 110.1 µs)   8.2 µs  13.3 µs  14.3 µs
Base Bench - sort - @psych/lib                     116.3 µs         8,598 ( 98.2 µs … 243.9 µs) 117.9 µs 130.1 µs 193.5 µs
Base Bench - sort - native                         271.3 µs         3,685 (239.0 µs … 417.2 µs) 272.8 µs 348.0 µs 350.2 µs
Base Bench - sort - mathjs                         436.0 µs         2,293 (395.8 µs … 583.5 µs) 440.2 µs 506.3 µs 525.5 µs
Base Bench - ss - @psych/lib                         9.3 µs       107,400 (  6.7 µs … 112.6 µs)   8.4 µs  19.7 µs  20.4 µs
Base Bench - ss - native                             8.8 µs       113,400 (  6.7 µs … 119.2 µs)   7.6 µs  19.7 µs  20.7 µs
Base Bench - ssDiff - @psych/lib                    23.9 µs        41,900 ( 13.2 µs … 124.2 µs)  29.5 µs  33.6 µs  72.7 µs
Base Bench - ssDiff - native                        18.1 µs        55,220 ( 13.3 µs … 117.8 µs)  19.5 µs  30.2 µs  71.6 µs
Base Bench - sp - @psych/lib                        17.6 µs        56,680 ( 13.5 µs … 127.9 µs)  16.5 µs  25.6 µs  70.8 µs
Base Bench - sp - native                            20.0 µs        49,900 ( 14.4 µs … 146.7 µs)  27.4 µs  35.0 µs  76.0 µs
Base Bench - sem - @psych/lib                        8.5 µs       118,000 (  7.2 µs … 105.2 µs)   8.1 µs  13.0 µs  13.9 µs
Base Bench - sem - simple-statistics                12.5 µs        80,000 ( 11.0 µs …  12.7 µs)  12.6 µs  12.7 µs  12.7 µs


benchmark                                             time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------------------------------- ----------------------------- --------------------- --------------------------
Correlation Bench - PearsonCorrTest - @psych/lib              29.3 µs        34,100 ( 14.5 µs … 234.5 µs)  39.3 µs  64.7 µs  86.8 µs
Correlation Bench - PearsonCorrTest - @stdlib/stats           25.6 µs        39,120 ( 20.5 µs … 347.4 µs)  30.5 µs  40.4 µs  79.0 µs


benchmark                                            time/iter (avg)        iter/s      (min … max)           p75      p99     p995
---------------------------------------------------- ----------------------------- --------------------- --------------------------
Distribution Bench - z2p - @psych/lib                         6.6 ns   151,900,000 (  6.3 ns …  25.1 ns)   6.4 ns  10.9 ns  11.1 ns
Distribution Bench - z2p - jstat-esm                         47.2 ns    21,190,000 ( 42.6 ns …  53.7 ns)  50.0 ns  51.9 ns  52.1 ns
Distribution Bench - p2z - @psych/lib                        14.9 ns    67,020,000 ( 13.2 ns …  26.6 ns)  14.8 ns  19.3 ns  19.5 ns
Distribution Bench - p2z - jstat-esm                        190.2 ns     5,258,000 (184.8 ns … 207.1 ns) 191.0 ns 204.1 ns 204.4 ns
Distribution Bench - t2p - @psych/lib                       164.5 ns     6,078,000 (150.9 ns … 173.2 ns) 165.2 ns 171.0 ns 172.5 ns
Distribution Bench - t2p - jstat-esm                        172.3 ns     5,803,000 (158.6 ns … 180.5 ns) 175.7 ns 178.6 ns 179.3 ns
Distribution Bench - p2t - @psych/lib                         5.5 µs       180,400 (  5.2 µs …   9.4 µs)   5.4 µs   9.4 µs   9.4 µs
Distribution Bench - p2t - jstat-esm                        512.3 ns     1,952,000 (477.3 ns … 534.1 ns) 519.5 ns 533.1 ns 534.1 ns
Distribution Bench - f2p - @psych/lib                       130.5 ns     7,664,000 (119.4 ns … 158.8 ns) 130.7 ns 150.3 ns 151.6 ns
Distribution Bench - f2p - jstat-esm                        133.0 ns     7,517,000 (121.7 ns … 143.5 ns) 135.8 ns 138.5 ns 139.5 ns
Distribution Bench - p2f - @psych/lib                         4.0 µs       248,200 (  3.9 µs …   5.1 µs)   4.0 µs   5.1 µs   5.1 µs
Distribution Bench - p2f - jstat-esm                        617.6 ns     1,619,000 (580.9 ns … 640.7 ns) 620.4 ns 640.7 ns 640.7 ns
Distribution Bench - randomNormal - @psych/lib               15.8 ns    63,360,000 ( 13.4 ns …  23.7 ns)  15.7 ns  20.3 ns  20.7 ns
Distribution Bench - randomNormal - @stdlib/random           15.8 ns    63,180,000 ( 14.3 ns …  25.6 ns)  15.8 ns  20.6 ns  21.2 ns


benchmark                                       time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------------------------- ----------------------------- --------------------- --------------------------
TTest Bench - OneSampleTTest - @psych/lib               14.9 µs        67,330 ( 11.9 µs … 135.4 µs)  16.0 µs  25.3 µs  53.9 µs
TTest Bench - OneSampleTTest - @stdlib/stats            13.5 µs        73,880 ( 10.9 µs … 164.6 µs)  13.0 µs  21.6 µs  56.0 µs
TTest Bench - TwoSampleTTest - @psych/lib               44.9 µs        22,290 ( 31.0 µs … 415.7 µs)  47.6 µs  58.6 µs 100.1 µs
TTest Bench - TwoSampleTTest - @stdlib/stats            26.9 µs        37,110 ( 21.5 µs … 171.4 µs)  31.7 µs  37.4 µs  79.5 µs
TTest Bench - PeerSampleTTest - @psych/lib              29.2 µs        34,200 ( 22.6 µs … 136.9 µs)  33.9 µs  39.9 µs  85.8 µs
TTest Bench - PeerSampleTTest - @stdlib/stats           26.5 µs        37,780 ( 20.7 µs … 168.7 µs)  31.1 µs  39.5 µs  84.1 µs
TTest Bench - WelchTTest - @psych/lib                   43.4 µs        23,060 ( 29.1 µs … 224.5 µs)  46.5 µs  53.9 µs  95.5 µs
```