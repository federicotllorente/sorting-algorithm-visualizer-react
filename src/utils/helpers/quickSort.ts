import { Dispatch, SetStateAction } from "react"
import { Entry, EntryState } from "../types";

type UseQuickSort = {
  array: Array<Entry>;
  setArray: Dispatch<SetStateAction<Array<Entry>>>;
}

type UseQuickSortOutput = {
  quickSort: (arr: Array<Entry>, start: number, end: number) => Promise<void>;
}

export const useQuickSort = ({
  array,
  setArray
}: UseQuickSort): UseQuickSortOutput => {
  const quickSort = async (arr: Array<Entry>, start: number, end: number) => {
    if (start >= end) return;
  
    let idx: number = await partition(arr, start, end);
  
    await quickSort(arr, start, idx - 1);
    await quickSort(arr, idx + 1, end);
  }

  const partition = async (arr: Array<Entry>, start: number, end: number): Promise<number> => {
    let pivotIndex = start;
    let pivotValue = arr[end].value;
  
    for (let i = start; i < end; i++) {
      if (arr[i].value < pivotValue) {
        await swap(arr, i, pivotIndex);
        pivotIndex++;
      }
    }
  
    await swap(arr, pivotIndex, end);
  
    return pivotIndex;
  }

  const swap = async (arr: Array<Entry>, a: number, b: number) => {
    await sleep(10);

    // TODO: Set red as BG color for both a and b
    let tempArray = arr;
    tempArray[a].state = EntryState.validating;
    tempArray[b].state = EntryState.validating;
    setArray([...tempArray]);

    await sleep(10);

    // Swap array items
    let temp = tempArray[a];
    tempArray[a] = tempArray[b];
    tempArray[b] = temp;
    setArray([...tempArray]);

    await sleep(10);

    // TODO: Set green as BG color for both a and b
    tempArray[a].state = EntryState.validated;
    tempArray[b].state = EntryState.validated;
    setArray([...tempArray]);
  }

  const sleep = (ms: number) => {
    return new Promise(res => setTimeout(res, ms));
  }

  return {
    quickSort
  }
}
