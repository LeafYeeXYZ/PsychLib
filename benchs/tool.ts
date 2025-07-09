import { sum } from '../lib/base.ts'

export type BenchResultEN = {
	name: string
	msPerIteration: number
	usPerIteration: number
	nmPerIteration: number
	iterationsPerSec: number
	betterThanRelative?: string
}

export type BenchResultZH = {
	名称: string
	单次运行时间_毫秒: number
	单次运行时间_微秒: number
	单次运行时间_纳秒: number
	每秒运行次数: number
	比比较对象快了?: string
}

export type BenchResultLanguage = 'en' | 'zh'

export type BenchParams<T extends BenchResultLanguage> = {
	name: string
	relativeTo?: BenchResultZH | BenchResultEN
	baselineMs?: number[]
	fn: () => Promise<void> | void
	maxIterations?: number
	minTimeMs?: number
	maxTimeMs?: number
	warmupTimes?: number
	resultLanguage?: T
}

export async function bench<
	T extends BenchResultLanguage = 'zh',
	R = T extends 'en' ? BenchResultEN : BenchResultZH,
>({
	name,
	relativeTo,
	baselineMs = [],
	fn,
	maxIterations = 100_000,
	minTimeMs = 1_000,
	maxTimeMs = 3_000,
	warmupTimes = 10,
	resultLanguage = 'zh' as T,
}: BenchParams<T>): Promise<R> {
	for (let i = 0; i < warmupTimes; i++) {
		await fn()
	}
	let iters = 0
	const start = performance.now()
	while (true) {
		await fn()
		iters++
		const elapsed = performance.now() - start
		if (elapsed <= minTimeMs) {
			continue
		}
		if (iters >= maxIterations || elapsed >= maxTimeMs) {
			break
		}
	}
	const end = performance.now()
	const msPerIteration = (end - start) / iters - sum(baselineMs)
	const iterationsPerSec = +(1000 / msPerIteration).toFixed(0)
	const usPerIteration = +(msPerIteration * 1_000).toFixed(0)
	const nmPerIteration = +(msPerIteration * 1_000_000).toFixed(0)
	const result = (
		resultLanguage === 'en'
			? {
					name,
					msPerIteration: +msPerIteration.toFixed(6),
					usPerIteration,
					nmPerIteration,
					iterationsPerSec,
					betterThanRelative: relativeTo
						? `${(((relativeTo as BenchResultEN).msPerIteration ?? (relativeTo as BenchResultZH).单次运行时间_毫秒) / msPerIteration).toFixed(2)}x`
						: undefined,
				}
			: {
					名称: name,
					单次运行时间_毫秒: +msPerIteration.toFixed(6),
					单次运行时间_微秒: usPerIteration,
					单次运行时间_纳秒: nmPerIteration,
					每秒运行次数: iterationsPerSec,
					比比较对象快了: relativeTo
						? `${(((relativeTo as BenchResultZH).单次运行时间_毫秒 ?? (relativeTo as BenchResultEN).msPerIteration) / msPerIteration).toFixed(2)}倍`
						: undefined,
				}
	) as R
	console.table([result])
	return result
}
