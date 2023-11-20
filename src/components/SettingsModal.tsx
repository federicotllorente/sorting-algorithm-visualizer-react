import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Sorting, maxArraySize } from "../utils/constants";

type SettingsModalProps = {
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
  sorting: Sorting;
  setSorting: Dispatch<SetStateAction<Sorting>>;
}

export const SettingsModal: FunctionComponent<SettingsModalProps> = ({
  setIsSettingsOpen,
  size,
  setSize,
  sorting,
  setSorting
}) => {
  return (
    <div className="settings-modal">
      <div className="settings-modal--wrapper">
        <button
          onClick={() => setIsSettingsOpen(false)}
          className="settings-modal--wrapper--close-button"
        >
          Close
        </button>
        <div className="settings-modal--wrapper--size">
          <h3>Change array size and sorting speed</h3>
          <div>
            <input
              type="range"
              id="size"
              min="0"
              max={`${maxArraySize}`}
              step="10"
              value={`${size}`}
              onChange={(e) => setSize(Number(e.target.value))}
            />
            <span>
              {size}
            </span>
          </div>
        </div>
        <div className="settings-modal--wrapper--sorting">
          <h3>Sorting algorithm</h3>
          <div>
            <button
              onClick={() => setSorting(Sorting.merge)}
              id={`sorting-${Sorting.merge}`}
              className={sorting === Sorting.merge ? 'active' : 'not-active'}
            >
              Merge sort
            </button>
            <button
              onClick={() => setSorting(Sorting.quick)}
              id={`sorting-${Sorting.quick}`}
              className={sorting === Sorting.quick ? 'active' : 'not-active'}
            >
              Quick sort
            </button>
            <button
              onClick={() => setSorting(Sorting.heap)}
              id={`sorting-${Sorting.heap}`}
              className={sorting === Sorting.heap ? 'active' : 'not-active'}
            >
              Heap sort
            </button>
            <button
              onClick={() => setSorting(Sorting.bubble)}
              id={`sorting-${Sorting.bubble}`}
              className={sorting === Sorting.bubble ? 'active' : 'not-active'}
            >
              Bubble sort
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
