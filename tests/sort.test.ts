import { assertEquals } from 'jsr:@std/assert'
import * as m from '../lib/sort.ts'
import { normalArray } from './utils.ts'

Deno.test('Sort', () => {
	const data = normalArray(10000, 0, 100)
	const asc = data.toSorted((a, b) => a - b)
	const desc = data.toSorted((a, b) => b - a)
	assertEquals(m.sort(data), asc)
	assertEquals(m.sort(data, false), desc)
	assertEquals(m.sort(data, true, 'recursiveQuickSort'), asc)
	assertEquals(m.sort(data, true, 'iterativeQuickSort'), asc)
	assertEquals(m.sort(data, true, 'native'), asc)
	assertEquals(m.sort(data, true, 'mergeSort'), asc)
	assertEquals(m.sort(data, true, 'heapSort'), asc)
})
