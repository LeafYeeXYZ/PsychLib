import { randomNormal } from '../lib/distribution/index.ts'

export function randomArray(
	length: number,
	min: number,
	max: number,
): number[] {
	return new Array(length).fill(0).map(() => Math.random() * (max - min) + min)
}

export function normalArray(
	length: number,
	mean: number,
	std: number,
): number[] {
	return new Array(length).fill(0).map(() => randomNormal(mean, std))
}

export function randomMatrix(
	rows: number,
	cols: number,
	min: number,
	max: number,
): number[][] {
	return new Array(rows).fill(0).map(() => randomArray(cols, min, max))
}
