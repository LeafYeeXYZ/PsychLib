import { tukey } from 'npm:jstat-esm@2.0.2'
import { ss, sum } from '../base.ts'
import { f2p, t2p } from '../distribution/index.ts'
import type { BonferroniResult, ScheffeResult, TukeyResult } from './types.ts'

/**
 * One-way ANOVA
 *
 * 单因素方差分析
 */
export class OneWayAnova {
	/**
	 * One-way ANOVA
	 *
	 * 单因素方差分析
	 * @param value dependent variable
	 * @param group independent variable
	 * @returns one-way anova result
	 * @example
	 * ```typescript
	 * import { OneWayAnova } from '@psych/lib'
	 * const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	 * const group = ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'C']
	 * const anova = new OneWayAnova(value, group)
	 * console.log(anova.p, anova.f)
	 * ```
	 * @throws {Error} length of value and group should be equal
	 * @throws {Error} group should be more than 1
	 */
	constructor(value: number[], group: (string | number)[]) {
		const n = value.length
		if (n !== group.length) {
			throw new Error('length of value and group should be equal')
		}
		this.groups = Array.from(new Set(group)).sort((a, b) => (a > b ? 1 : -1))
		const k = this.groups.length
		if (k < 2) {
			throw new Error('group should be more than 1')
		}
		this.n = n
		this.k = k
		this.dfT = n - 1
		this.dfB = k - 1
		this.dfW = this.dfT - this.dfB
		// 下面的错误示范: 这样写会导致所有的 values 都指向同一个数组
		// const values = new Array(this.groups.length).fill([])
		this.values = Array.from({ length: k }, () => [])
		for (let i = 0; i < n; i++) {
			const _i = this.groups.indexOf(group[i])
			this.values[_i].push(value[i])
		}
		for (let i = 0; i < k; i++) {
			const _count = this.values[i].length
			const _sum = sum(this.values[i])
			const _mean = _sum / _count
			this.groupsCount.push(_count)
			this.groupsSum.push(_sum)
			this.groupsMean.push(_mean)
		}
		const totalSum = sum(value)
		const _G = totalSum ** 2 / n
		const _totalProduct = ss(value, 0)
		let _groupProduct = 0
		for (let i = 0; i < k; i++) {
			_groupProduct += this.groupsSum[i] ** 2 / this.groupsCount[i]
		}
		this.SSt = _totalProduct - _G
		this.SSb = _groupProduct - _G
		this.SSw = this.SSt - this.SSb
		this.MSt = this.SSt / this.dfT
		this.MSw = this.SSw / this.dfW
		this.MSb = this.SSb / this.dfB
		this.f = this.MSb / this.MSw
		this.p = f2p(this.f, this.dfB, this.dfW)
		this.r2 = this.SSb / this.SSt
		this.cohenF = Math.sqrt(this.r2 / (1 - this.r2))
		for (let i = 0; i < k - 1; i++) {
			for (let j = i + 1; j < k; j++) {
				const groupA = String(this.groups[i])
				const groupB = String(this.groups[j])
				const diff = this.groupsMean[i] - this.groupsMean[j]
				const d = diff / Math.sqrt(this.MSw)
				this.cohenD.push({ groupA, groupB, diff, d })
			}
		}
	}
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
	 * Measure effect size Cohen's f
	 *
	 * 测量效应量 Cohen's f
	 */
	cohenF: number
	/**
	 * Cohen's d for each group pair (d = diff / sqrt(MSw))
	 *
	 * 每组对的 Cohen's d (d = diff / sqrt(MSw))
	 */
	cohenD: { groupA: string; groupB: string; diff: number; d: number }[] = []
	/**
	 * Measure effect R^2 (or eta^2) (equals SSb / SSt)
	 *
	 * 测量效应 R^2 (或 eta^2) (等于 处理间平方和 / 总平方和)
	 */
	r2: number
	/**
	 * P value
	 *
	 * P值
	 */
	p: number
	/**
	 * F value
	 *
	 * F值
	 */
	f: number
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
	 * Count of each group
	 *
	 * 每组的元素个数
	 */
	groupsCount: number[] = []
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
	 * Groups
	 *
	 * 分组
	 */
	groups: (string | number)[]
	/**
	 * Values
	 *
	 * 分组数据
	 */
	values: number[][]
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
	 * Scheffe post hoc test
	 *
	 * Scheffe 事后检验
	 * @returns Scheffe post hoc test result
	 */
	scheffe(): ScheffeResult[] {
		const results: ScheffeResult[] = []
		// 两两比较
		for (let i = 0; i < this.groups.length - 1; i++) {
			for (let j = i + 1; j < this.groups.length; j++) {
				const diff = this.groupsMean[i] - this.groupsMean[j]
				const _Gab =
					sum([...this.values[i], ...this.values[j]]) ** 2 /
					(this.groupsCount[i] + this.groupsCount[j])
				const _Pab =
					this.groupsSum[i] ** 2 / this.groupsCount[i] +
					this.groupsSum[j] ** 2 / this.groupsCount[j]
				const SSab = _Pab - _Gab
				const MSab = SSab / this.dfB
				const f = MSab / this.MSw
				const p = f2p(f, this.dfB, this.dfW)
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
	 * Bonferroni post hoc test
	 * Sp^2 = MSw
	 *
	 * Bonferroni 事后检验
	 * Sp^2 使用 MSw 代替
	 * @returns Bonferroni post hoc test result
	 */
	bonferroni(): BonferroniResult[] {
		const sig = 0.05 / ((this.groups.length * (this.groups.length - 1)) / 2)
		const results: BonferroniResult[] = []
		// 两两比较
		for (let i = 0; i < this.groups.length - 1; i++) {
			for (let j = i + 1; j < this.groups.length; j++) {
				const diff = this.groupsMean[i] - this.groupsMean[j]
				const se = Math.sqrt(
					this.MSw / this.groupsCount[i] + this.MSw / this.groupsCount[j],
				)
				const t = Math.abs(diff) / se
				const p = t2p(t, this.dfW)
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
	 * Tukey's HSD post hoc test
	 *
	 * Tukey's HSD 事后检验
	 * @returns Tukey's HSD post hoc test result
	 * @throws {Error} Tukey HSD test requires equal group size
	 */
	tukey(): TukeyResult[] {
		if (new Set(this.groupsCount).size !== 1) {
			throw new Error('Tukey HSD test requires equal group size')
		}
		const peers = (this.groups.length * (this.groups.length - 1)) / 2
		const results: TukeyResult[] = []
		const sem = Math.sqrt(this.MSw / this.groupsCount[0])
		const HSD = tukey.inv(0.05, peers, this.dfW) * sem
		// 两两比较
		for (let i = 0; i < this.groups.length - 1; i++) {
			for (let j = i + 1; j < this.groups.length; j++) {
				const diff = this.groupsMean[i] - this.groupsMean[j]
				const q = Math.abs(diff) / sem
				const p = 1 - tukey.cdf(q, peers, this.dfW)
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
