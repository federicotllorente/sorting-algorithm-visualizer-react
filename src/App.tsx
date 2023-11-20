import { useEffect, useState } from 'react';
import './App.css';

import { Header } from './components/Header';
import { SettingsModal } from './components/SettingsModal';
import { SortingVisualizer } from './components/SortingVisualizer';

import { Sorting, maxArraySize, maxItemSize } from './utils/constants';
import { quickSort } from './utils/helpers/quickSort';

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [size, setSize] = useState<number>(0);
  const [sorting, setSorting] = useState<Sorting>(Sorting.merge);
  const [array, setArray] = useState<Array<number>>([]);

  useEffect(() => {
    const randomSize = Math.floor(Math.random() * maxArraySize);
    setSize(randomSize);
  }, []);

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

  const onQuickSort = () => {
    const arrayCopy = array;
    quickSort(arrayCopy, 0, arrayCopy.length - 1);
    setArray([...arrayCopy]);
  }

  const getHandleSortFunction = (sortingMethod: Sorting): () => void => {
    switch (sortingMethod) {
      case Sorting.quick:
        return onQuickSort;

      default: {
        const doNothing = () => {}
        return doNothing;
      }
    }
  }

  return (
    <div className="App">
      <Header
        setIsSettingsOpen={setIsSettingsOpen}
        size={size}
        resetArray={resetArray}
        handleSort={getHandleSortFunction(sorting)}
      />
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
        array={array}
      />
    </div>
  );
}

export default App;
