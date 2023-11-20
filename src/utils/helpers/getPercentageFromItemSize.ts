import { maxItemSize } from "../constants";

export const getPercentageFromItemSize = (itemSize: number) => {
  const percentage = (itemSize * 100) / maxItemSize;

  return percentage;
}
