import { Dispatch, SetStateAction } from "react"
import { Entry, EntryState } from "../types";

type UseBubbleSort = {
  setArray: Dispatch<SetStateAction<Array<Entry>>>;
}

type UseBubbleSortOutput = {
  doBubbleSort: (arr: Array<Entry>) => Promise<void>;
}

export const useBubbleSort = ({
  setArray
}: UseBubbleSort): UseBubbleSortOutput => {
  let arrayForComparing: Array<Entry> = [];

  const doBubbleSort = async (arr: Array<Entry>) => {
    const arrayForComparingToSet = [...arr];
    const arrayCopy = [...arr];

    bubbleSort(arrayForComparingToSet, 0, arrayForComparingToSet.length - 1);
    arrayForComparing = arrayForComparingToSet;

    await asyncBubbleSort(arrayCopy, 0, arrayCopy.length - 1);
  }

  const bubbleSort = (arr: Array<Entry>, start: number, end: number) => {
    if (start >= end) return;
    
    const lastIdx: number = partition(arr, start, end);

    bubbleSort(arr, start, lastIdx);
  }

  const asyncBubbleSort = async (arr: Array<Entry>, start: number, end: number) => {
    if (start >= end) return;
    
    const lastIdx: number = await asyncPartition(arr, start, end);

    await asyncBubbleSort(arr, start, lastIdx);
  }

  const partition = (arr: Array<Entry>, start: number, end: number): number => {
    let lastIndex = end;

    for (let i = start; i < end; i++) {
      if (arr[i].value > arr[i + 1].value) {
        swap(arr, i, i + 1);
      }
    }

    lastIndex--;
    return lastIndex;
  }

  const asyncPartition = async (arr: Array<Entry>, start: number, end: number): Promise<number> => {
    let lastIndex = end;

    for (let i = start; i < end; i++) {
      if (arr[i].value > arr[i + 1].value) {
        await asyncSwap(arr, i, i + 1);
      }
    }

    lastIndex--;
    return lastIndex;
  }

  const swap = (arr: Array<Entry>, a: number, b: number) => {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }

  const asyncSwap = async (arr: Array<Entry>, a: number, b: number) => {
    await sleep(3);

    let tempArray = arr;
    tempArray[a].state = EntryState.validating;
    tempArray[b].state = EntryState.validating;
    setArray([...tempArray]);

    await sleep(3);

    let temp = tempArray[a];
    tempArray[a] = tempArray[b];
    tempArray[b] = temp;
    setArray([...tempArray]);

    await sleep(3);

    if (tempArray[a].value === arrayForComparing[a].value) {
      tempArray[a].state = EntryState.validated;
    } else {
      tempArray[a].state = EntryState.invalidated;
    }

    if (tempArray[b].value === arrayForComparing[b].value) {
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
    doBubbleSort
  }
}
