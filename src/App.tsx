import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [size, setSize] = useState<number>(0);
  const [sorting, setSorting] = useState<Sorting>(Sorting.merge);

  useEffect(() => {
    const randomSize = Math.floor(Math.random() * maxArraySize);
    setSize(randomSize);
  }, []);

  return (
    <div className="App">
      <Header setIsSettingsOpen={setIsSettingsOpen} />
      {isSettingsOpen && (
        <SettingsModal
          setIsSettingsOpen={setIsSettingsOpen}
          size={size}
          setSize={setSize}
          sorting={sorting}
          setSorting={setSorting}
        />
      )}
      <SortingVisualizer
        size={size}
        sorting={sorting}
      />
    </div>
  );
}

export default App;

type HeaderProps = {
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: FunctionComponent<HeaderProps> = ({
  setIsSettingsOpen
}) => {
  return (
    <header>
      <div>
        <h2>Array Sorting Visualizer</h2>
        {/* <p>By <a href="https://www.federicotllorente.com/" target="_blank" rel="noopener noreferrer">Federico Tejedor Llorente</a></p> */}
      </div>
      <div>
        <button onClick={() => setIsSettingsOpen(true)}>
          Open settings
        </button>
        <button>
          Sort
        </button>
      </div>
    </header>
  )
}

type SettingsModalProps = {
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
  sorting: Sorting;
  setSorting: Dispatch<SetStateAction<Sorting>>;
}

enum Sorting {
  'merge' = 'merge',
  'quick' = 'quick',
  'heap' = 'heap',
  'bubble' = 'bubble'
}

const maxArraySize = 100;
const maxItemSize = 2000;

const getPercentageFromItemSize = (itemSize: number) => {
  const percentage = (itemSize * 100) / maxItemSize;

  return percentage;
}

const SettingsModal: FunctionComponent<SettingsModalProps> = ({
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

type SortingVisualizerProps = {
  size: number;
  sorting: Sorting;
}

const SortingVisualizer: FunctionComponent<SortingVisualizerProps> = ({
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
