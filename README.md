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
Runtime | Deno 2.2.3 (aarch64-apple-darwin)


benchmark                                                             time/iter (avg)        iter/s      (min … max)           p75      p99     p995
--------------------------------------------------------------------- ----------------------------- --------------------- --------------------------
Baseline (Generate Data) - n=500,1                                             8.7 µs       115,500 (  6.8 µs …  92.4 µs)   8.3 µs  12.2 µs  14.6 µs
Baseline (Generate Data) - n=500,2                                            17.7 µs        56,410 ( 14.0 µs … 250.2 µs)  16.9 µs  26.5 µs  47.0 µs
Baseline (Generate Data) - n=500,3                                            27.8 µs        35,990 ( 21.2 µs …  86.9 µs)  33.0 µs  54.8 µs  59.8 µs
Baseline (Generate Group) - n=500 - for ANOVA & Levene test                    9.3 µs       107,800 (  7.8 µs …  74.6 µs)   9.0 µs  12.8 µs  41.0 µs
Baseline (Math.random) - for distribution benchmarks                           3.8 ns   260,700,000 (  3.4 ns …  74.6 ns)   3.8 ns   7.5 ns   8.1 ns
@psych/lib - Z Score to P Value                                                6.5 ns   152,900,000 (  5.9 ns …  17.2 ns)   6.5 ns  10.8 ns  11.8 ns
@psych/lib - P Value to Z Score                                               15.8 ns    63,460,000 ( 13.1 ns …   1.5 µs)  14.9 ns  23.5 ns  34.1 ns
@psych/lib - df=30 - T to P Value                                            116.3 ns     8,598,000 (107.1 ns … 231.4 ns) 118.9 ns 136.1 ns 139.9 ns
@psych/lib - df=30 - P Value to T                                            526.3 ns     1,900,000 (499.9 ns … 555.1 ns) 539.1 ns 550.3 ns 555.1 ns
@psych/lib - df=5,30 - F to P Value                                           94.0 ns    10,640,000 ( 87.5 ns … 115.0 ns)  95.6 ns 105.3 ns 107.8 ns
@psych/lib - df=5,30 - P Value to F                                          549.5 ns     1,820,000 (517.7 ns … 580.1 ns) 561.1 ns 577.5 ns 580.1 ns
@psych/lib - df=6 - Chi2 to P Value                                           41.8 ns    23,950,000 ( 38.5 ns …  55.0 ns)  42.1 ns  48.3 ns  51.1 ns
@psych/lib - df=6 - P Value to Chi2                                          350.6 ns     2,852,000 (327.5 ns … 396.6 ns) 360.0 ns 385.7 ns 396.6 ns
@psych/lib - Random Normal Distribution                                       15.6 ns    63,990,000 ( 13.4 ns …  26.5 ns)  15.7 ns  20.4 ns  21.1 ns
@psych/lib - df=30 - Random T Distribution                                    74.5 ns    13,420,000 ( 66.5 ns … 119.6 ns)  75.2 ns  88.5 ns  93.5 ns
@psych/lib - df=5,30 - Random F Distribution                                 114.1 ns     8,765,000 (103.8 ns … 185.2 ns) 115.3 ns 127.3 ns 130.9 ns
@psych/lib - df=6 - Random Chi2 Distribution                                  55.5 ns    18,030,000 ( 49.5 ns …  98.0 ns)  56.0 ns  64.5 ns  66.7 ns
@psych/lib - n=500 - Kurtosis Test                                            15.9 µs        62,970 ( 12.6 µs … 121.8 µs)  17.7 µs  19.5 µs  21.5 µs
@psych/lib - n=500 - Skewness Test                                            15.9 µs        62,770 ( 12.7 µs … 113.2 µs)  17.7 µs  19.5 µs  21.8 µs
@psych/lib - n=500 - One Way Anova                                            26.7 µs        37,430 ( 19.8 µs … 314.9 µs)  28.4 µs  36.7 µs  69.1 µs
@psych/lib - n=500,k=3 - RM Anova                                             52.5 µs        19,050 ( 39.0 µs …   1.2 ms)  52.3 µs 117.0 µs 166.5 µs
@psych/lib - n=500 - Levene Test                                              55.2 µs        18,120 ( 47.8 µs … 275.5 µs)  55.4 µs  70.5 µs 109.3 µs
@psych/lib - n=500,1 - One Sample KS Test                                    108.9 µs         9,182 ( 97.1 µs … 219.1 µs) 108.8 µs 163.2 µs 170.1 µs
@psych/lib - n=500,1 - One Sample T Test                                      10.9 µs        91,440 (  8.5 µs … 119.0 µs)  13.0 µs  15.0 µs  17.9 µs
@psych/lib - n=500,2 - Two Sample T Test                                      22.2 µs        44,970 ( 16.8 µs … 147.2 µs)  27.7 µs  32.3 µs  47.5 µs
@psych/lib - n=500,2 - Paired T Test                                          22.3 µs        44,790 ( 17.7 µs … 127.2 µs)  25.9 µs  30.0 µs  41.1 µs
@psych/lib - n=500,2 - Welch T Test                                           21.0 µs        47,520 ( 16.2 µs … 124.3 µs)  26.2 µs  30.0 µs  37.0 µs
@psych/lib - n=500,2 - Pearson Correlation Test                               20.5 µs        48,690 ( 16.0 µs … 220.5 µs)  24.3 µs  28.4 µs  35.5 µs
@psych/lib - n=500,2 - Linear Regression One                                  26.8 µs        37,310 ( 18.9 µs … 160.3 µs)  34.0 µs  40.0 µs  70.8 µs
@psych/lib - n=500,5 - Linear Regression                                     288.3 µs         3,469 (241.2 µs …   1.6 ms) 288.0 µs 459.8 µs 521.6 µs
@psych/lib - n=500,10 - Linear Regression                                    611.8 µs         1,635 (502.1 µs … 865.7 µs) 644.5 µs 794.7 µs 832.9 µs
@psych/lib - n=500 - Simple Mediation Model without bootstrap                134.4 µs         7,442 (115.4 µs … 334.8 µs) 135.2 µs 251.6 µs 265.0 µs
@psych/lib - n=500 - Simple Mediation Model with bootstrap (B=5000)          480.7 ms           2.1 (440.8 ms … 613.2 ms) 482.8 ms 613.2 ms 613.2 ms
@psych/lib - n=500,3 - Cronbach's Alpha                                       54.4 µs        18,370 ( 45.1 µs … 388.8 µs)  57.0 µs  65.0 µs  78.5 µs
@psych/lib - 50x100 - Matrix Creation                                         87.2 µs        11,470 ( 77.5 µs …   1.9 ms)  81.9 µs 255.8 µs 361.4 µs
@psych/lib - 50x100 - Matrix Addition                                        183.4 µs         5,452 (174.5 µs … 505.6 µs) 181.8 µs 213.0 µs 402.8 µs
@psych/lib - 50x100 - Matrix Transpose                                       103.1 µs         9,698 ( 98.0 µs … 426.0 µs) 102.2 µs 115.6 µs 127.2 µs
@psych/lib - 50x100 - Matrix Multiplication                                    1.2 ms         824.3 (  1.2 ms …   1.6 ms)   1.2 ms   1.3 ms   1.6 ms
@psych/lib - 50x50 - Matrix Inverse                                          498.2 µs         2,007 (487.8 µs … 870.2 µs) 496.8 µs 536.7 µs 812.1 µs
```
