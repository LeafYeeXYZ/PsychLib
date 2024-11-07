import * as pl from '../lib/index.ts'
import { assertEquals } from 'jsr:@std/assert'

const x: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)
const m: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)
const y: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)

Deno.test('Mediation Test', () => {
  assertEquals(pl.bootstrapSample(x, m, y)[0].length, x.length)
  assertEquals(pl.bootstrapSample(x, m, y)[1].length, m.length)
  assertEquals(pl.bootstrapSample(x, m, y)[2].length, y.length)
  const bootstrap = pl.bootstrapTest(x, m, y, 1000, 0.05)
  assertEquals(typeof bootstrap[0], 'number')
  assertEquals(typeof bootstrap[1], 'number')
  assertEquals(bootstrap[0] < bootstrap[1], true)
})
