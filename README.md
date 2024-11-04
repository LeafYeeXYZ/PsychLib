# Introduction

**PsychLib** is a TypeScript library for math, statistics, and data analysis. Featured in psychological and educational research.

- PsychLib can be used in all modern JavaScript/TypeScript environments, including browsers, Node.js, Deno, and Bun.
- PsychLib has 0 dependencies and is lightweight.
- For use cases, please refer to my another project [PsychPen](https://github.com/LeafYeeXYZ/PsychPen).

**For full documentation, see <https://jsr.io/@psych/lib/docs>.**

- [Introduction](#introduction)
- [Qiuck Start](#qiuck-start)
- [Development](#development)

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

**For full documentation, see <https://jsr.io/@psych/lib/docs>.**

# Development

If you haven't installed `deno` yet, please install it referring to the <https://deno.com>. Then, clone this repository and install dependencies.

```bash
git clone https://github.com/LeafYeeXYZ/PsychLib.git
```

Now you can write `TypeScript` code in `/lib/**/*.ts` and export functions in `/lib/index.ts`. After writing the code, remember to add test cases in `tests/*.test.ts`. You can run the test cases using the following command.

```bash
deno test
```

You can also add benchmark cases in `tests/*.bench.ts` and run the benchmark using the following command.

```bash
deno bench
```

This project publishes to <https://jsr.io>, so you don't need to compile the code to JavaScript. Just use the following command to publish the code.

```bash
deno publish
```
