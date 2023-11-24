import { Dispatch, SetStateAction } from "react"

type UseQuickSort = {
  array: number[];
  setArray: Dispatch<SetStateAction<number[]>>;
}

type UseQuickSortOutput = {
  quickSort: (arr: number[], start: number, end: number) => Promise<void>;
}

export const useQuickSort = ({
  array,
  setArray
}: UseQuickSort): UseQuickSortOutput => {
  const quickSort = async (arr: number[], start: number, end: number) => {
    if (start >= end) return;
  
    let idx: number = await partition(arr, start, end);
  
    await quickSort(arr, start, idx - 1);
    await quickSort(arr, idx + 1, end);
  }

  const partition = async (arr: number[], start: number, end: number): Promise<number> => {
    let pivotIndex = start;
    let pivotValue = arr[end];
  
    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        await swap(arr, i, pivotIndex);
        pivotIndex++;
      }
    }
  
    await swap(arr, pivotIndex, end);
  
    return pivotIndex;
  }

  const swap = async (arr: number[], a: number, b: number) => {
    await sleep(10);

    // TODO: Set red as BG color for both a and b

    let tempArray = arr;
    let temp = tempArray[a];
    tempArray[a] = tempArray[b];
    tempArray[b] = temp;

    setArray([...tempArray]);

    // TODO: Set green as BG color for both a and b
  }

  const sleep = (ms: number) => {
    return new Promise(res => setTimeout(res, ms));
  }

  return {
    quickSort
  }
}
