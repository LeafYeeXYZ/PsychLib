// deno-lint-ignore-file no-explicit-any
// biome-ignore-all lint/suspicious/noExplicitAny: 无法避免使用 any 类型

const pkg = (pkg: string) => `
  if (!requireNamespace('${pkg}', quietly = TRUE)) {
		install.packages('${pkg}', repos = 'https://cran.rstudio.com/')
	}
`

/**
 * Executes R code using the Rscript command line tool.
 * @param code R code to execute
 * @returns The output of the R code execution
 */
export async function R(
	code: string,
	packagesToInstall: string[] = [],
): Promise<any> {
	const result = await fetch('http://127.0.0.1:8000/execute', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			code: `${packagesToInstall.map(pkg).join('\n')}\n${code}`,
		}),
	})
	if (!result.ok) {
		throw new Error(`R execution failed: ${result.statusText}`)
	}
	const data = await result.json()
	if (data.status === 'error') {
		throw new Error(`R execution error: ${data.message}`)
	}
	return data.result
}
