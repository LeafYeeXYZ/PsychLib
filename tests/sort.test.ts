import { assertEquals } from 'jsr:@std/assert'
import { randomNormal, sort } from '../lib/index.ts'

const N = 100000
const x: number[] = new Array(N).fill(0).map(() => randomNormal(10, 2))

Deno.test('Sort Test', () => {
	const asc = x.toSorted((a, b) => a - b)
	const desc = x.toSorted((a, b) => b - a)
	assertEquals(sort(x), asc)
	assertEquals(sort(x, false), desc)
	assertEquals(sort(x, true, 'recursiveQuickSort'), asc)
	assertEquals(sort(x, true, 'iterativeQuickSort'), asc)
	assertEquals(sort(x, true, 'native'), asc)
	assertEquals(sort(x, true, 'mergeSort'), asc)
	assertEquals(sort(x, true, 'heapSort'), asc)
})
