import * as pl from '../lib/index.ts'
import ttest from 'npm:@stdlib/stats-ttest'
import ttest2 from 'npm:@stdlib/stats-ttest2'

const x = () => new Array(1000).fill(0).map(() => Math.random() * 100)
const y = () => new Array(1000).fill(0).map(() => Math.random() * 101)

Deno.bench('TTest Bench - OneSampleTTest - @psych/lib', () => { new pl.OneSampleTTest(x(), 0) })
Deno.bench('TTest Bench - OneSampleTTest - @stdlib/stats', () => { ttest(x()) })
Deno.bench('TTest Bench - TwoSampleTTest - @psych/lib', () => { new pl.TwoSampleTTest(x(), y()) })
Deno.bench('TTest Bench - TwoSampleTTest - @stdlib/stats', () => { ttest2(x(), y()) })
Deno.bench('TTest Bench - PeerSampleTTest - @psych/lib', () => { new pl.PeerSampleTTest(x(), y()) })
Deno.bench('TTest Bench - PeerSampleTTest - @stdlib/stats', () => { ttest(x(), y()) })
Deno.bench('TTest Bench - WelchTTest - @psych/lib', () => { new pl.WelchTTest(x(), y()) })
