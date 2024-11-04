import * as pl from '../lib/index.ts'
import { assertEquals } from 'jsr:@std/assert'

const x: number[] = new Array(1000).fill(0).map(() => Math.random() * 100)

Deno.test('Utils Test', () => {
  assertEquals(typeof pl.kurtosisTest(x).p, 'number')
  assertEquals(typeof pl.skewnessTest(x).p, 'number')
  assertEquals(typeof pl.kurtosisTest(x).z, 'number')
  assertEquals(typeof pl.skewnessTest(x).z, 'number')
})
