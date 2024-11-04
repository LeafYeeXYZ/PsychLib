import * as pl from '../lib/index.ts'
import pc from 'npm:@stdlib/stats-pcorrtest@^0.2.2'

const x = () => new Array(1000).fill(0).map(() => Math.random() * 100)
const y = () => new Array(1000).fill(0).map(() => Math.random() * 100)

Deno.bench('Correlation Bench - PearsonCorrTest - @psych/lib', () => { new pl.PearsonCorrTest(x(), y()) })
Deno.bench('Correlation Bench - PearsonCorrTest - @stdlib/stats', () => { pc(x(), y()) })
