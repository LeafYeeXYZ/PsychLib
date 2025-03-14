/**
 * Available sort algorithms
 *
 * 可用的排序算法
 *
 * | Algorithm | Time Complexity (average) | Time Complexity (worst) | Space Complexity | Stable |
 * | :-------: | :-----------------------: | :---------------------: | :--------------: | :----: |
 * | native (Array.prototype.sort) | - | - | - | Yes |
 * | recursiveQuickSort | O(n log n) | O(n^2) | O(log n) | No |
 * | iterativeQuickSort | O(n log n) | O(n^2) | O(log n) | No |
 * | mergeSort | O(n log n) | O(n log n) | O(n) | Yes |
 * | heapSort | O(n log n) | O(n log n) | O(1) | No |
 */
export type SortAlgorithm =
	| 'native'
	| 'mergeSort'
	| 'heapSort'
	| 'recursiveQuickSort'
	| 'iterativeQuickSort'

/**
 * Sort numbers in ascending or descending order
 *
 * 对数字进行升序或降序排序
 * @param data numbers
 * @param ascending whether to sort in ascending order (default is true)
 * @param algorithm sort algorithm (default is 'iterativeQuickSort')
 * @param modify whether to modify the original array (default is false)
 *
 * @returns sorted numbers
 */
export function sort(
	data: number[],
	ascending = true,
	algorithm: SortAlgorithm = 'iterativeQuickSort',
	modify = false,
): number[] {
	try {
		const source = modify ? data : data.slice()
		switch (algorithm) {
			case 'iterativeQuickSort':
				iterativeQuickSort(source, ascending)
				break
			case 'recursiveQuickSort':
				quickSort(source, 0, source.length - 1, ascending)
				break
			case 'native':
				ascending ? source.sort((a, b) => a - b) : source.sort((a, b) => b - a)
				break
			case 'mergeSort':
				mergeSort(source, 0, source.length - 1, ascending)
				break
			case 'heapSort':
				heapSort(source, ascending)
				break
		}
		return source
	} catch (e) {
		// 避免 Max Call Stack Size Exceeded 错误
		console.warn(
			`Error occurred in sorting: ${
				e instanceof Error ? e.message : JSON.stringify(e)
			}, fallback to native sort.`,
		)
		return modify
			? data.sort(ascending ? (a, b) => a - b : (a, b) => b - a)
			: data.toSorted(ascending ? (a, b) => a - b : (a, b) => b - a)
	}
}

/**
 * Sort numbers in ascending or descending order using iterative QuickSort
 * @param arr numbers
 * @param ascending whether to sort in ascending order (default is true)
 * @returns sorted numbers
 * @private
 */
function iterativeQuickSort(arr: number[], ascending = true): number[] {
	const stack: number[] = []
	stack.push(0)
	stack.push(arr.length - 1)
	while (stack.length > 0) {
		const high = stack.pop()
		const low = stack.pop()
		if (high !== undefined && low !== undefined) {
			const pi: number = partition(arr, low, high, ascending)
			if (pi - 1 > low) {
				stack.push(low)
				stack.push(pi - 1)
			}
			if (pi + 1 < high) {
				stack.push(pi + 1)
				stack.push(high)
			}
		}
	}
	return arr
}

/**
 * Partition the array for QuickSort
 * @param arr array to partition
 * @param low starting index
 * @param high ending index
 * @param ascending whether to sort in ascending order
 * @returns partition index
 * @private
 */
function partition(
	arr: number[],
	low: number,
	high: number,
	ascending: boolean,
): number {
	const pivot: number = arr[high]
	let i: number = low - 1
	for (let j: number = low; j < high; j++) {
		if (ascending ? arr[j] < pivot : arr[j] > pivot) {
			i++
			const temp: number = arr[i]
			arr[i] = arr[j]
			arr[j] = temp
		}
	}
	const temp: number = arr[i + 1]
	arr[i + 1] = arr[high]
	arr[high] = temp
	return i + 1
}

/**
 * QuickSort algorithm
 * @param arr array to sort
 * @param low starting index
 * @param high ending index
 * @param ascending whether to sort in ascending order
 * @private
 */
function quickSort(
	arr: number[],
	low: number,
	high: number,
	ascending: boolean,
): void {
	if (low < high) {
		const pi: number = partition(arr, low, high, ascending)
		quickSort(arr, low, pi - 1, ascending)
		quickSort(arr, pi + 1, high, ascending)
	}
}

/**
 * MergeSort algorithm
 * @param arr array to sort
 * @param low starting index
 * @param high ending index
 * @param ascending whether to sort in ascending order
 * @private
 */
function mergeSort(
	arr: number[],
	low: number,
	high: number,
	ascending: boolean,
): void {
	if (low < high) {
		const mid: number = Math.floor((low + high) / 2)
		mergeSort(arr, low, mid, ascending)
		mergeSort(arr, mid + 1, high, ascending)
		merge(arr, low, mid, high, ascending)
	}
}

/**
 * Merge two subarrays
 * @param arr array to merge
 * @param low starting index
 * @param mid middle index
 * @param high ending index
 * @param ascending whether to sort in ascending order
 * @private
 */
function merge(
	arr: number[],
	low: number,
	mid: number,
	high: number,
	ascending: boolean,
): void {
	const n1: number = mid - low + 1
	const n2: number = high - mid
	const L: number[] = new Array(n1)
	const R: number[] = new Array(n2)
	for (let i = 0; i < n1; i++) {
		L[i] = arr[low + i]
	}
	for (let i = 0; i < n2; i++) {
		R[i] = arr[mid + 1 + i]
	}
	let i = 0
	let j = 0
	let k: number = low
	while (i < n1 && j < n2) {
		if (ascending ? L[i] <= R[j] : L[i] >= R[j]) {
			arr[k] = L[i]
			i++
		} else {
			arr[k] = R[j]
			j++
		}
		k++
	}
	while (i < n1) {
		arr[k] = L[i]
		i++
		k++
	}
	while (j < n2) {
		arr[k] = R[j]
		j++
		k++
	}
}

/**
 * Heapify the array
 * @param arr array to heapify
 * @param n size of the heap
 * @param i root index
 * @param ascending whether to sort in ascending order
 * @private
 */
function heapify(
	arr: number[],
	n: number,
	i: number,
	ascending: boolean,
): void {
	let largest = i
	const l = 2 * i + 1
	const r = 2 * i + 2
	if (l < n && (ascending ? arr[l] > arr[largest] : arr[l] < arr[largest])) {
		largest = l
	}
	if (r < n && (ascending ? arr[r] > arr[largest] : arr[r] < arr[largest])) {
		largest = r
	}
	if (largest !== i) {
		const swap = arr[i]
		arr[i] = arr[largest]
		arr[largest] = swap
		heapify(arr, n, largest, ascending)
	}
}

/**
 * HeapSort algorithm
 * @param arr array to sort
 * @param ascending whether to sort in ascending order
 * @private
 */
function heapSort(arr: number[], ascending: boolean): void {
	const n = arr.length
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		heapify(arr, n, i, ascending)
	}
	for (let i = n - 1; i >= 0; i--) {
		const temp = arr[0]
		arr[0] = arr[i]
		arr[i] = temp
		heapify(arr, i, 0, ascending)
	}
}
