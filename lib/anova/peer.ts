import { tukey } from 'npm:jstat-esm@2.0.2'
import { ss, sum } from '../base.ts'
import { f2p, t2p } from '../distribution/index.ts'
import type { BonferroniResult, ScheffeResult, TukeyResult } from './types.ts'

/**
 * Repeated measures ANOVA
 *
 * 重复测量方差分析
 */
export class PeerAnova {
	/**
	 * Repeated measures ANOVA
	 *
	 * 重复测量方差分析
	 * @param values dependent variables, one row for one variable, one column for one observation
	 * @param group [optional] group names
	 * @returns Repeated measures anova result
	 * @example
	 * ```typescript
	 * import { PeerAnova } from '@psych/lib'
	 * const values = [
	 *  [1, 2, 3, 4, 5],
	 *  [2, 3, 4, 5, 6],
	 *  [3, 4, 5, 6, 7],
	 * ]
	 * const anova = new PeerAnova(values)
	 * console.log(anova.p, anova.f)
	 * ```
	 * @throws {Error} length of values should be equal
	 * @throws {Error} group should be more than 1
	 */
	constructor(values: number[][], group?: string[]) {
		const k = values.length
		if (k < 2) {
			throw new Error('group should be more than 1')
		}
		const n = values[0].length
		if (values.some((v) => v.length !== n)) {
			throw new Error('length of values should be equal')
		}
		this.k = k
		this.n = n
		this.values = values
		for (let i = 0; i < k; i++) {
			this.groups.push(group?.[i] ?? `Group ${i + 1}`)
			const _sum = sum(values[i])
			const _mean = _sum / n
			this.groupsSum.push(_sum)
			this.groupsMean.push(_mean)
		}
		const flatValues = values.flat()
		const totalSum = sum(flatValues)
		const _G = totalSum ** 2 / (n * k)
		const _totalProduct = ss(flatValues, 0)
		let _groupProductN = 0
		for (let i = 0; i < k; i++) {
			_groupProductN += this.groupsSum[i] ** 2 / n
		}
		let _groupProductK = 0
		for (let i = 0; i < n; i++) {
			let _sum = 0
			for (let j = 0; j < k; j++) {
				_sum += values[j][i]
			}
			_groupProductK += _sum ** 2 / k
		}
		this.dfT = n * k - 1
		this.dfB = k - 1
		this.dfW = this.dfT - this.dfB
		this.SSt = _totalProduct - _G
		this.SSb = _groupProductN - _G
		this.SSw = this.SSt - this.SSb
		this.SSsubj = _groupProductK - _G
		this.SSerror = this.SSw - this.SSsubj
		this.dfSubj = n - 1
		this.dfError = this.dfW - this.dfSubj
		this.MSt = this.SSt / this.dfT
		this.MSb = this.SSb / this.dfB
		this.MSw = this.SSw / this.dfW
		this.MSsubj = this.SSsubj / this.dfSubj
		this.MSerror = this.SSerror / this.dfError
		this.f = this.MSb / this.MSerror
		this.p = f2p(this.f, this.dfB, this.dfError)
		this.r2 = this.SSb / this.SSt
		this.r2adj = this.SSb / (this.SSb + this.SSerror)
		this.cohenF = Math.sqrt(this.r2 / (1 - this.r2))
		for (let i = 0; i < k - 1; i++) {
			for (let j = i + 1; j < k; j++) {
				const groupA = this.groups[i]
				const groupB = this.groups[j]
				const diff = this.groupsMean[i] - this.groupsMean[j]
				const d = diff / Math.sqrt(this.MSerror)
				this.cohenD.push({ groupA, groupB, diff, d })
			}
		}
	}
	/**
	 * Measure effect R^2 (or eta^2) (equals SSb / SSt)
	 *
	 * 效应量 R^2 (或 eta^2) (等于 处理间平方和 / 总平方和)
	 */
	r2: number
	/**
	 * Measure effect R^2 adjusted (equals SSb / (SSb + SSerror))
	 *
	 * 调整后的效应量 R^2 (等于 处理间平方和 / (处理间平方和 + 误差平方和))
	 */
	r2adj: number
	/**
	 * Measure effect size Cohen's f
	 *
	 * 测量效应量 Cohen's f
	 */
	cohenF: number
	/**
	 * Cohen's d for each group pair (d = diff / sqrt(MSerror))
	 *
	 * 每组对的 Cohen's d (d = diff / sqrt(MSerror))
	 */
	cohenD: { groupA: string; groupB: string; diff: number; d: number }[] = []
	/**
	 * F value (equals MSb / MSerror)
	 *
	 * F值 (等于 处理间均方 / 误差均方)
	 */
	f: number
	/**
	 * p value (equals F(dfB, dfError))
	 *
	 * p值 (等于 F(处理间自由度, 误差自由度))
	 */
	p: number
	/**
	 * Within-subject mean square
	 *
	 * 被试内均方
	 */
	MSsubj: number
	/**
	 * Error mean square
	 *
	 * 误差均方
	 */
	MSerror: number
	/**
	 * Within-subject sum of squares (equals SSw - SSerror)
	 *
	 * 被试内平方和 (等于处理内平方和 - 误差平方和)
	 */
	SSsubj: number
	/**
	 * Error sum of squares (equals SSw - SSsubj)
	 *
	 * 误差平方和 (等于处理内平方和 - 被试内平方和)
	 */
	SSerror: number
	/**
	 * Within-subject degrees of freedom (equals n - 1)
	 *
	 * 被试内自由度 (等于 n - 1)
	 */
	dfSubj: number
	/**
	 * Error degrees of freedom (equals dfW - dfSubj)
	 *
	 * 误差自由度 (等于 处理内自由度 - 被试内自由度)
	 */
	dfError: number
	/**
	 * Groups
	 *
	 * 分组
	 */
	groups: string[] = []
	/**
	 * Values
	 *
	 * 数据
	 */
	values: number[][]
	/**
	 * Count of each group
	 *
	 * 每组的元素个数
	 */
	/**
	 * Sample size
	 *
	 * 样本量
	 */
	n: number
	/**
	 * Number of groups
	 *
	 * 组数
	 */
	k: number
	/**
	 * Sum of each group
	 *
	 * 每组的和
	 */
	groupsSum: number[] = []
	/**
	 * Mean of each group
	 *
	 * 每组的均值
	 */
	groupsMean: number[] = []
	/**
	 * Total degrees of freedom
	 *
	 * 总自由度
	 */
	dfT: number
	/**
	 * Between-group degrees of freedom
	 *
	 * 处理间自由度
	 */
	dfB: number
	/**
	 * Within-group degrees of freedom
	 *
	 * 处理内自由度
	 */
	dfW: number
	/**
	 * Within-group sum of squares
	 *
	 * 处理内平方和
	 */
	SSw: number
	/**
	 * Between-group sum of squares
	 *
	 * 处理间平方和
	 */
	SSb: number
	/**
	 * Total sum of squares
	 *
	 * 总平方和
	 */
	SSt: number
	/**
	 * Mean square between
	 *
	 * 处理间均方
	 */
	MSb: number
	/**
	 * Mean square within
	 *
	 * 处理内均方
	 */
	MSw: number
	/**
	 * Mean square total
	 *
	 * 总均方
	 */
	MSt: number
	/**
	 * Scheffe post hoc test (use MSerror instead of MSw)
	 *
	 * Scheffe 事后检验 (使用 MSerror 代替 MSw)
	 * @returns Scheffe post hoc test result
	 */
	scheffe(): ScheffeResult[] {
		const k = this.k
		const n = this.n
		const results: ScheffeResult[] = []
		// 两两比较
		for (let i = 0; i < k - 1; i++) {
			for (let j = i + 1; j < k; j++) {
				const diff = this.groupsMean[i] - this.groupsMean[j]
				const _Gab = sum([...this.values[i], ...this.values[j]]) ** 2 / (2 * n)
				const _Pab = (this.groupsSum[i] ** 2 + this.groupsSum[j] ** 2) / n
				const SSab = _Pab - _Gab
				const MSab = SSab / this.dfB
				const f = MSab / this.MSerror
				const p = f2p(f, this.dfB, this.dfError)
				results.push({
					groupA: this.groups[i],
					groupB: this.groups[j],
					diff,
					f,
					p,
				})
			}
		}
		return results
	}
	/**
	 * Bonferroni post hoc test (use MSerror instead of MSw as Sp^2)
	 *
	 * Bonferroni 事后检验 (使用 MSerror 代替 MSw 作为 Sp^2)
	 * @returns Bonferroni post hoc test result
	 */
	bonferroni(): BonferroniResult[] {
		const k = this.k
		const n = this.n
		const sig = 0.05 / ((k * (k - 1)) / 2)
		const results: BonferroniResult[] = []
		// 两两比较
		for (let i = 0; i < k - 1; i++) {
			for (let j = i + 1; j < k; j++) {
				const diff = this.groupsMean[i] - this.groupsMean[j]
				const se = Math.sqrt((2 * this.MSerror) / n)
				const t = Math.abs(diff) / se
				const p = t2p(t, this.dfError)
				results.push({
					groupA: this.groups[i],
					groupB: this.groups[j],
					diff,
					t,
					p,
					sig,
				})
			}
		}
		return results
	}
	/**
	 * Tukey's HSD post hoc test (use MSerror instead of MSw)
	 *
	 * Tukey's HSD 事后检验 (使用 MSerror 代替 MSw)
	 * @returns Tukey's HSD post hoc test result
	 * @throws {Error} Tukey HSD test requires equal group size
	 */
	tukey(): TukeyResult[] {
		const k = this.k
		const n = this.n
		const peers = (k * (k - 1)) / 2
		const results: TukeyResult[] = []
		const sem = Math.sqrt(this.MSerror / n)
		const HSD = tukey.inv(0.05, peers, this.dfError) * sem
		// 两两比较
		for (let i = 0; i < k - 1; i++) {
			for (let j = i + 1; j < k; j++) {
				const diff = this.groupsMean[i] - this.groupsMean[j]
				const q = Math.abs(diff) / sem
				const p = 1 - tukey.cdf(q, peers, this.dfError)
				results.push({
					groupA: this.groups[i],
					groupB: this.groups[j],
					diff,
					HSD,
					q,
					p,
				})
			}
		}
		return results
	}
}
