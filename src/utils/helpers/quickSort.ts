import { Dispatch, SetStateAction, useState } from "react"
import { Entry, EntryState } from "../types";

type UseQuickSort = {
  setArray: Dispatch<SetStateAction<Array<Entry>>>;
}

type UseQuickSortOutput = {
  doQuickSort: (arr: Array<Entry>) => Promise<void>;
}

export const useQuickSort = ({
  setArray
}: UseQuickSort): UseQuickSortOutput => {
  let arrayForComparing: Array<Entry> = [];

  const doQuickSort = async (arr: Array<Entry>) => {
    const arrayForComparingToSet = [...arr];
    const arrayCopy = [...arr];

    quickSort(arrayForComparingToSet, 0, arrayForComparingToSet.length - 1);
    arrayForComparing = arrayForComparingToSet;

    await asyncQuickSort(arrayCopy, 0, arrayCopy.length - 1);
  }

  const quickSort = (arr: Array<Entry>, start: number, end: number) => {
    if (start >= end) return;
  
    let idx: number = partition(arr, start, end);
  
    quickSort(arr, start, idx - 1);
    quickSort(arr, idx + 1, end);
  }

  const asyncQuickSort = async (arr: Array<Entry>, start: number, end: number) => {
    if (start >= end) return;
  
    let idx: number = await asyncPartition(arr, start, end);
  
    await asyncQuickSort(arr, start, idx - 1);
    await asyncQuickSort(arr, idx + 1, end);
  }

  const partition = (arr: Array<Entry>, start: number, end: number): number => {
    let pivotIndex = start;
    let pivotValue = arr[end].value;
  
    for (let i = start; i < end; i++) {
      if (arr[i].value < pivotValue) {
        swap(arr, i, pivotIndex);
        pivotIndex++;
      }
    }
  
    swap(arr, pivotIndex, end);
  
    return pivotIndex;
  }

  const asyncPartition = async (arr: Array<Entry>, start: number, end: number): Promise<number> => {
    let pivotIndex = start;
    let pivotValue = arr[end].value;
  
    for (let i = start; i < end; i++) {
      if (arr[i].value < pivotValue) {
        await asyncSwap(arr, i, pivotIndex);
        pivotIndex++;
      }
    }
  
    await asyncSwap(arr, pivotIndex, end);
  
    return pivotIndex;
  }

  const swap = (arr: Array<Entry>, a: number, b: number) => {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }

  const asyncSwap = async (arr: Array<Entry>, a: number, b: number) => {
    await sleep(10);

    let tempArray = arr;
    tempArray[a].state = EntryState.validating;
    tempArray[b].state = EntryState.validating;
    setArray([...tempArray]);

    await sleep(10);

    let temp = tempArray[a];
    tempArray[a] = tempArray[b];
    tempArray[b] = temp;
    setArray([...tempArray]);

    await sleep(10);

    if (tempArray[a].value == arrayForComparing[a].value) {
      tempArray[a].state = EntryState.validated;
    } else {
      tempArray[a].state = EntryState.invalidated;
    }

    if (tempArray[b].value == arrayForComparing[b].value) {
      tempArray[b].state = EntryState.validated;
    } else {
      tempArray[b].state = EntryState.invalidated;
    }
    
    setArray([...tempArray]);
  }

  const sleep = (ms: number) => {
    return new Promise(res => setTimeout(res, ms));
  }

  return {
    doQuickSort
  }
}
