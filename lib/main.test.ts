import { cov, sp, ss } from './base/index.ts'
import { LinearRegressionOne, LinearRegressionTwo } from './regression/index.ts'
import { assertEquals } from 'jsr:@std/assert'

Deno.test('ss', () => {
	assertEquals(ss([[3, 1], [2, 1], [1, 1]]), 5)
})

Deno.test('sp', () => {
	// 1 * 0 + 0 * -3 + -1 * 3
	assertEquals(sp([[3, 2], [2, -1], [1, 5]]), -3)
})

Deno.test('cov', () => {
	assertEquals(cov([[3, 2], [2, -1], [1, 5]]), -1)
})

Deno.test('LinearRegressionOne', () => {
	const x = [1, 2, 3, 4, 5]
	const y = [2, 3, 4, 5, 6]
	const lr = new LinearRegressionOne(x, y)
	assertEquals(lr.b0, 1)
	assertEquals(lr.b1, 1)
	assertEquals(lr.calc(6), 7)
	assertEquals(typeof lr.p, 'number')
	assertEquals(typeof lr.t, 'number')
})

Deno.test('LinearRegressionTwo', () => {
	const x1 = [1, 2, 3, 4, 10]
	const x2 = [1, 3, 5, 7, 9]
	const y = [6, 14, 22, 30, 48]
	const lr = new LinearRegressionTwo(x1, x2, y)
	assertEquals(lr.b0, 1)
	assertEquals(lr.b1, 2)
	assertEquals(lr.b2, 3)
	assertEquals(lr.calc(6, 7), 34)
	assertEquals(typeof lr.p, 'number')
	assertEquals(typeof lr.t, 'number')
})
