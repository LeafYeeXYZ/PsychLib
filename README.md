# Introduction

[![JSR Version](https://jsr.io/badges/@psych/lib)](https://jsr.io/@psych/lib) [![JSR Scope](https://jsr.io/badges/@psych)](https://jsr.io/@psych) [![JSR Score](https://jsr.io/badges/@psych/lib/score)](https://jsr.io/@psych/lib/score)

**PsychLib** is a TypeScript library for math, statistics, and data analysis. Featured in psychological and educational research.

- PsychLib can be used in all modern JavaScript/TypeScript environments, including browsers, Node.js, Deno, and Bun.
- For use cases, please refer to my another project [PsychPen](https://github.com/LeafYeeXYZ/PsychPen).
- All functions have been tested for consistency with R's psych package and other JavaScript/R statistical libraries.

**For full documentation, see <https://jsr.io/@psych/lib/doc>.**

- [Introduction](#introduction)
- [Qiuck Start](#qiuck-start)
- [Development](#development)
- [Testing](#testing)
- [Benchmark](#benchmark)
  - [Basic Functions](#basic-functions)
  - [Compare with R](#compare-with-r)

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
deno task r:install # only once
deno task r:server
deno task test
```

You can also add benchmark cases in `/benchs/*.bench.ts` and run the benchmark using the following command.

```bash
deno task bench
```

This project publishes to <https://jsr.io>, so you don't need to compile the code to JavaScript. And you also don't need to publish the package manually. Just modify `deno.json` and push the code to the repository. The `GitHub Action` will do the rest for you.

# Testing

| PsychLib Function | Testing Method | Passed | Precision |
| :---: | :---: | :---: | :---: |
| Basic Functions | `JS:simple-statistics` | ✅ | `1e-6` |
| `Matrix` | `JS:ml-matrix` | ✅ | `1e-6` |
| `sort` | `JS:Array.prototype.sort` | ✅ | `0` |
| `OneSampleTTest` | `R:psych` | ✅ | `1e-4` |
| `TwoSampleTTest` | `R:psych` | ✅ | `1e-4` |
| `PeerSampleTTest` | `R:psych` | ✅ | `1e-4` |
| `WelchTTest` | `R:psych` | ✅ | `1e-4` |
| `AlphaRealiability` | `R:psych` | ✅ | `1e-4` |
| `LeveneTest` | `R:car` | ✅ | `1e-4` |
| `OneSampleKSTest` | `R:stats` | ⚠️ | D: `1e-4`<br>p: `1e-4` (`n >= 100`) / `0.15` (`n < 100`)<br>Reject: `0` |
| `z2p` & `p2z` | `R:stats` | ✅ | `1e-4` |
| `t2p` & `p2t` | `R:stats` | ✅ | `1e-4` |
| `f2p` & `p2f` | `R:stats` | ✅ | `1e-4` |
| `c2p` & `p2c` | `R:stats` | ✅ | `1e-4` |
| `PearsonCorrTest` | `R:stats` | ✅ | `1e-4` |
| `OneWayAnova` | `R:stats` | ✅ | `1e-4` |
| `PeerAnova` | `R:stats` | ✅ | `1e-4` |
| ANOVA Post Hoc | see `tests/anova.test.ts` | ⚠️ WIP |  |
| Regression | See `tests/regression.test.ts` | ⚠️ WIP |  |
| Mediation | See `tests/mediation.test.ts` | ⚠️ WIP |  |

> I'm working on migrating all tests to `R`, you can see the progress above.

# Benchmark

## Basic Functions

```bash
    CPU | Apple M3
Runtime | Deno 2.4.1 (aarch64-apple-darwin)
   File | /benchs/base.bench.ts


| benchmark                             | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| ------------------------------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| sum() - n=1000                        |          1.0 µs |       979,400 | (583.0 ns …  53.5 µs) |   1.3 µs |   1.6 µs |   1.6 µs |
| mean() - n=1000                       |          1.3 µs |       748,500 | (625.0 ns …  34.0 µs) |   1.4 µs |   1.6 µs |   1.6 µs |
| max() - n=1000                        |        442.0 ns |     2,262,000 | (333.0 ns …  39.5 µs) | 458.0 ns | 708.0 ns | 709.0 ns |
| min() - n=1000                        |          1.1 µs |       917,400 | (375.0 ns …  39.4 µs) |   1.2 µs |   1.5 µs |   1.5 µs |
| median() - n=1000                     |         41.9 µs |        23,880 | ( 36.8 µs …  92.1 µs) |  42.4 µs |  49.5 µs |  51.6 µs |
| mode() - n=1000                       |         82.2 µs |        12,160 | ( 72.2 µs … 169.5 µs) |  82.2 µs | 123.6 µs | 135.0 µs |
| quantile() - n=1000                   |         41.9 µs |        23,890 | ( 36.9 µs …  77.1 µs) |  42.5 µs |  49.5 µs |  51.2 µs |
| range() - n=1000                      |          1.4 µs |       697,400 | (834.0 ns …  31.0 µs) |   1.5 µs |   1.8 µs |   1.8 µs |
| vari() - n=1000                       |          3.0 µs |       332,600 | (  1.4 µs …  62.5 µs) |   3.0 µs |   3.6 µs |   3.8 µs |
| std() - n=1000                        |          1.4 µs |       709,200 | (  1.2 µs …  30.0 µs) |   1.4 µs |   1.8 µs |   3.0 µs |
| cov() - n=1000                        |          2.1 µs |       473,900 | (  1.9 µs …  16.1 µs) |   2.1 µs |   2.6 µs |   2.7 µs |
| corr() - n=1000                       |          6.8 µs |       147,000 | (  3.4 µs …  97.5 µs) |   7.3 µs |   8.2 µs |   8.9 µs |
| kurtosis() - n=1000                   |         13.3 µs |        74,960 | ( 11.7 µs …   4.7 ms) |  12.6 µs |  30.0 µs |  30.1 µs |
| skewness() - n=1000                   |         12.5 µs |        79,780 | ( 11.7 µs …  76.9 µs) |  12.5 µs |  15.4 µs |  18.4 µs |
| ss() - n=1000                         |          2.0 µs |       506,100 | (  1.3 µs …  22.4 µs) |   2.9 µs |   3.0 µs |   3.2 µs |
| ssDiff() - n=1000                     |          1.9 µs |       525,200 | (708.0 ns …  49.3 µs) |   2.1 µs |   2.3 µs |   2.5 µs |
| sem() - n=1000                        |          1.4 µs |       702,700 | (  1.3 µs …   9.9 µs) |   1.5 µs |   1.8 µs |   1.8 µs |
| array.sort() - n=1000                 |        260.5 µs |         3,839 | (243.0 µs …   1.0 ms) | 262.5 µs | 314.6 µs | 334.9 µs |
| array.toSorted() - n=1000             |        127.6 µs |         7,839 | (118.6 µs … 551.9 µs) | 126.6 µs | 164.4 µs | 217.9 µs |
| sort() - quickSort (iter) - n=1000    |         45.6 µs |        21,910 | ( 40.5 µs … 261.1 µs) |  45.9 µs |  54.0 µs |  56.0 µs |
| sort() - quickSort (recur) - n=1000   |         50.3 µs |        19,870 | ( 44.5 µs … 160.5 µs) |  50.8 µs |  55.7 µs |  57.7 µs |
| sort() - mergeSort - n=1000           |         73.0 µs |        13,690 | ( 70.8 µs … 477.7 µs) |  72.9 µs |  80.8 µs |  86.9 µs |
| sort() - heapSort - n=1000            |         91.6 µs |        10,910 | ( 88.2 µs … 287.5 µs) |  91.3 µs | 106.0 µs | 112.3 µs |
| z2p()                                 |          4.2 ns |   239,700,000 | (  3.7 ns …   1.1 µs) |   3.9 ns |   9.0 ns |   9.9 ns |
| p2z()                                 |         14.6 ns |    68,410,000 | ( 13.8 ns …  31.4 ns) |  14.6 ns |  19.5 ns |  22.0 ns |
| t2p() - df=30                         |        116.0 ns |     8,623,000 | (112.8 ns … 139.1 ns) | 116.3 ns | 127.3 ns | 128.8 ns |
| p2t() - df=30                         |        556.9 ns |     1,796,000 | (550.7 ns … 584.7 ns) | 558.3 ns | 575.0 ns | 584.7 ns |
| f2p() - df=5,30                       |         93.7 ns |    10,680,000 | ( 92.6 ns … 106.8 ns) |  93.7 ns | 100.3 ns | 101.7 ns |
| p2f() - df=5,30                       |        565.3 ns |     1,769,000 | (550.6 ns … 593.1 ns) | 568.1 ns | 593.1 ns | 593.1 ns |
| c2p() - df=5                          |         46.4 ns |    21,560,000 | ( 45.7 ns …  59.1 ns) |  46.5 ns |  48.3 ns |  50.0 ns |
| p2c() - df=5                          |        345.1 ns |     2,898,000 | (325.0 ns … 361.2 ns) | 347.4 ns | 357.4 ns | 361.2 ns |
| randomNormal()                        |         15.6 ns |    64,020,000 | ( 14.5 ns …  29.1 ns) |  15.7 ns |  18.4 ns |  20.0 ns |
| randomT() - df=30                     |         73.1 ns |    13,690,000 | ( 70.5 ns …  87.6 ns) |  73.6 ns |  80.2 ns |  82.8 ns |
| randomF() - df=5,30                   |        113.3 ns |     8,829,000 | (108.8 ns … 128.1 ns) | 114.4 ns | 124.8 ns | 127.2 ns |
| randomChi2() - df=5                   |         54.9 ns |    18,220,000 | ( 52.6 ns …  66.4 ns) |  55.2 ns |  59.5 ns |  61.5 ns |
| matrix.add() - 50x50                  |         12.1 µs |        82,710 | ( 11.3 µs … 176.0 µs) |  12.0 µs |  16.5 µs |  34.4 µs |
| matrix.transpose() - 50x50            |         11.0 µs |        91,160 | ( 10.4 µs … 165.0 µs) |  11.0 µs |  12.5 µs |  13.9 µs |
| matrix.multiply() - 50x50             |        378.5 µs |         2,642 | (339.8 µs …   2.9 ms) | 348.0 µs | 498.0 µs |   1.6 ms |
| matrix.inverse() - 50x50              |        472.6 µs |         2,116 | (449.1 µs …   5.6 ms) | 457.1 µs | 779.0 µs | 994.7 µs |
```

## Compare with R

⚠️ Currently work in progress, the results may not be accurate.

```bash
    CPU | Apple M3
Runtime | Deno 2.4.1 (aarch64-apple-darwin) | R 4.5.1 (2025-06-13)
   File | /benchs/ttest.ts & /benchs/tool.ts


┌───────┬─────────────────────────────────────┬───────────────────┬───────────────────┬───────────────────┬──────────────┬────────────────┐
│ (idx) │ 名称                                │ 单次运行时间_毫秒 │ 单次运行时间_微秒 │ 单次运行时间_纳秒 │ 每秒运行次数 │ 比比较对象快了 │
├───────┼─────────────────────────────────────┼───────────────────┼───────────────────┼───────────────────┼──────────────┼────────────────┤
│     0 │ "R语言服务器基准测试 - n=1000"      │ 1.263272          │ 1263              │ 1263272           │ 792          │                │
│     1 │ "R语言服务器基准测试 - n=1000x2"    │ 1.678868          │ 1679              │ 1678868           │ 596          │                │
│     2 │ "单样本T检验 - PsychLib - n=1000"   │ 0.002515          │ 3                 │ 2515              │ 397687       │ "40.74倍"      │
│     3 │ "单样本T检验 - R - n=1000"          │ 0.102441          │ 102               │ 102441            │ 9762         │                │
│     4 │ "配对样本T检验 - PsychLib - n=1000" │ 0.007628          │ 8                 │ 7628              │ 131100       │ "27.16倍"      │
│     5 │ "配对样本T检验 - R - n=1000"        │ 0.207184          │ 207               │ 207184            │ 4827         │                │
│     6 │ "独立样本T检验 - PsychLib - n=1000" │ 0.005021          │ 5                 │ 5021              │ 199182       │ "53.31倍"      │
│     7 │ "独立样本T检验 - R - n=1000"        │ 0.267655          │ 268               │ 267655            │ 3736         │                │
│     8 │ "不等方差T检验 - PsychLib - n=1000" │ 0.003761          │ 4                 │ 3761              │ 265869       │ "86.43倍"      │
│     9 │ "不等方差T检验 - R - n=1000"        │ 0.32509           │ 325               │ 325090            │ 3076         │                │
└───────┴─────────────────────────────────────┴───────────────────┴───────────────────┴───────────────────┴──────────────┴────────────────┘
```
