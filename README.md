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
   Date | 2024-11-05
    CPU | Apple M3
Runtime | Deno 2.0.4 (aarch64-apple-darwin)


benchmark           time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------- ----------------------------- --------------------- --------------------------

group Base Functions Bench
@psych/lib                 506.9 µs         1,973 (432.6 µs …   1.2 ms) 531.8 µs 638.0 µs 666.4 µs
@psych/lib - opt           290.2 µs         3,446 (264.5 µs …   1.0 ms) 297.8 µs 346.4 µs 391.8 µs
simple-statistics          461.0 µs         2,169 (418.2 µs … 592.6 µs) 466.6 µs 543.9 µs 546.2 µs
mathjs                       1.2 ms         808.1 (991.2 µs …   1.4 ms)   1.3 ms   1.4 ms   1.4 ms

summary
  @psych/lib - opt
     1.59x faster than simple-statistics
     1.75x faster than @psych/lib
     4.26x faster than mathjs


benchmark       time/iter (avg)        iter/s      (min … max)           p75      p99     p995
--------------- ----------------------------- --------------------- --------------------------

group Statistics To P
@psych/lib             383.9 ns     2,605,000 (362.0 ns … 401.0 ns) 391.9 ns 397.3 ns 401.0 ns
@stdlib/stats          131.4 µs         7,612 (120.7 µs … 553.0 µs) 132.1 µs 155.8 µs 163.0 µs
jstat-esm              463.5 ns     2,157,000 (441.7 ns … 484.1 ns) 474.7 ns 480.9 ns 484.1 ns

summary
  @psych/lib
     1.21x faster than jstat-esm
   342.20x faster than @stdlib/stats

group P To Statistics
@psych/lib              13.7 µs        73,210 (  7.0 µs … 136.1 µs)  14.8 µs  22.8 µs  26.2 µs
@stdlib/stats          135.5 µs         7,379 (122.8 µs … 426.9 µs) 136.6 µs 154.8 µs 167.6 µs
jstat-esm                1.8 µs       555,400 (  1.7 µs …   1.9 µs)   1.8 µs   1.9 µs   1.9 µs

summary
  @psych/lib
     7.59x slower than jstat-esm
     9.92x faster than @stdlib/stats


benchmark                                           time/iter (avg)        iter/s      (min … max)           p75      p99     p995
--------------------------------------------------- ----------------------------- --------------------- --------------------------
@psych/lib - n=1000 - Levene Test                          134.3 µs         7,446 (114.8 µs … 593.9 µs) 135.0 µs 224.7 µs 240.5 µs
@psych/lib - n=1000 - One Way Anova                         53.7 µs        18,610 ( 40.5 µs … 239.4 µs)  55.8 µs 111.8 µs 126.2 µs
@psych/lib - n=1000 - One Sample T Test                     14.9 µs        67,180 ( 10.9 µs … 139.1 µs)  16.0 µs  26.7 µs  54.5 µs
@psych/lib - n=1000 - Two Sample T Test                     45.0 µs        22,230 ( 35.2 µs … 410.2 µs)  48.0 µs  58.3 µs 102.0 µs
@psych/lib - n=1000 - Paired T Test                         31.5 µs        31,710 ( 22.2 µs … 187.8 µs)  33.8 µs  59.0 µs  84.8 µs
@psych/lib - n=1000 - Welch T Test                          42.0 µs        23,820 ( 23.5 µs … 139.6 µs)  46.2 µs  53.3 µs  92.2 µs
@psych/lib - n=1000 - Pearson Correlation Test              31.7 µs        31,580 ( 15.6 µs … 133.5 µs)  39.3 µs  43.1 µs  77.7 µs
@psych/lib - n=1000 - Linear Regression One                 78.3 µs        12,770 ( 48.7 µs … 177.3 µs)  79.4 µs 125.7 µs 146.4 µs
@psych/lib - n=1000 - Linear Regression Two                125.8 µs         7,950 ( 63.3 µs … 242.1 µs) 139.2 µs 201.5 µs 209.2 µs
@psych/lib - n=100,B=1000 - Bootstrap CI (ab)                5.7 ms         175.6 (  5.6 ms …   5.8 ms)   5.7 ms   5.8 ms   5.8 ms
@psych/lib - n=100,B=1000 - Bootstrap CI (mean)              5.3 ms         188.8 (  5.2 ms …   5.4 ms)   5.4 ms   5.4 ms   5.4 ms
@psych/lib - n=100,B=1000 - Bootstrap CI (median)            8.5 ms         117.1 (  8.5 ms …   8.6 ms)   8.6 ms   8.6 ms   8.6 ms
```