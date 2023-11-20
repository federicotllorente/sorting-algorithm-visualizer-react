export const quickSort = (arr: number[], start: number, end: number) => {
  if (start >= end) return;

  let idx: number = partition(arr, start, end);

  quickSort(arr, start, idx - 1);
  quickSort(arr, idx + 1, end);
}

const partition = (arr: number[], start: number, end: number): number => {
  let pivotIndex = start;
  let pivotValue = arr[end];

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, pivotIndex);
      pivotIndex++;
    }
  }

  swap(arr, pivotIndex, end);

  return pivotIndex;
}

const swap = (arr: number[], a: number, b: number) => {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
