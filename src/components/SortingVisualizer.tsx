import { FunctionComponent, useEffect, useState } from "react";
import { Sorting, maxArraySize, maxItemSize } from "../utils/constants";
import { getPercentageFromItemSize } from "../utils/helpers/getPercentageFromItemSize";

type SortingVisualizerProps = {
  size: number;
  sorting: Sorting;
}

export const SortingVisualizer: FunctionComponent<SortingVisualizerProps> = ({
  size,
  sorting
}) => {
  const [array, setArray] = useState<Array<number>>([]);

  const resetArray = (arraySize: number) => {
    const newArray = [];

    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * maxItemSize));
    }

    setArray(newArray);
  }

  useEffect(() => {
    resetArray(size);
  }, [size]);

  return (
    <div className="sorting-visualizer" style={{ gap: (size / maxArraySize) >= 0.6 ? '4px' : '8px' }}>
      {array.map((el, idx) => (
        <span
          key={`sorting-array-${idx}`}
          style={{ height: `${getPercentageFromItemSize(el)}%` }}
        >
          <p>{el}</p>
        </span>
      ))}
    </div>
  )
}
