import { FunctionComponent } from "react";
import { Sorting, maxArraySize } from "../utils/constants";
import { getPercentageFromItemSize } from "../utils/helpers/getPercentageFromItemSize";

type SortingVisualizerProps = {
  size: number;
  sorting: Sorting;
  array: number[];
}

export const SortingVisualizer: FunctionComponent<SortingVisualizerProps> = ({
  size,
  sorting,
  array
}) => {
  return (
    <div className="sorting-visualizer" style={{ gap: (size / maxArraySize) >= 0.6 ? '4px' : '8px' }}>
      {array.map((el, idx) => (
        <span
          key={`sorting-array-${el}-idx-${idx}`}
          style={{ height: `${getPercentageFromItemSize(el)}%` }}
        ></span>
      ))}
    </div>
  )
}
