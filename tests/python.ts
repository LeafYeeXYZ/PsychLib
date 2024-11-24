import { loadPyodide } from 'npm:pyodide@0.26.4'

const PACKAGES = ['numpy', 'pandas', 'scipy', 'scikit-learn', 'statsmodels']

const py = await loadPyodide()
await py.loadPackage(PACKAGES)

export default py
