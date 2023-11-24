import { useEffect, useState } from 'react';
import JSConfetti from 'js-confetti';
import './App.css';

import { Header } from './components/Header';
import { SettingsModal } from './components/SettingsModal';
import { SortingVisualizer } from './components/SortingVisualizer';

import { maxArraySize, maxItemSize } from './utils/constants';
import { useQuickSort } from './utils/helpers/quickSort';
import { Entry, EntryState, Sorting } from './utils/types';

const jsConfetti = new JSConfetti()

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [size, setSize] = useState<number>(0);
  const [sorting, setSorting] = useState<Sorting>(Sorting.merge);
  const [array, setArray] = useState<Array<Entry>>([]);

  const { doQuickSort } = useQuickSort({ setArray });

  useEffect(() => {
    const randomSize = Math.floor(Math.random() * maxArraySize);
    setSize(randomSize);
  }, []);

  const resetArray = (arraySize: number) => {
    const newArray: Array<Entry> = [];

    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * maxItemSize),
        state: EntryState.invalidated
      });
    }

    setArray(newArray);
  }

  useEffect(() => {
    resetArray(size);
  }, [size]);

  const onQuickSort = async () => {
    const arrayCopy = [...array];
    await doQuickSort(arrayCopy);
    jsConfetti.addConfetti()
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
