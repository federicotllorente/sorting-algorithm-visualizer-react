import { FunctionComponent } from "react";
import { maxArraySize } from "../utils/constants";
import { getPercentageFromItemSize } from "../utils/helpers/getPercentageFromItemSize";
import { Entry } from "../utils/types";

type SortingVisualizerProps = {
  size: number;
  array: Array<Entry>;
}

export const SortingVisualizer: FunctionComponent<SortingVisualizerProps> = ({
  size,
  array
}) => {
  return (
    <div className="sorting-visualizer" style={{ gap: (size / maxArraySize) >= 0.6 ? '4px' : '8px' }}>
      {array.map((el, idx) => (
        <span
          key={`sorting-array-${el.value}-idx-${idx}`}
          style={{ height: `${getPercentageFromItemSize(el.value)}%` }}
          className={el.state}
        ></span>
      ))}
    </div>
  )
}
