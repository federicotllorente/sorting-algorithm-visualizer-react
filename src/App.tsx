import { useEffect, useState } from 'react';
import JSConfetti from 'js-confetti';
import './App.css';

import { Header } from './components/Header';
import { SettingsModal } from './components/SettingsModal';
import { SortingVisualizer } from './components/SortingVisualizer';

import { maxArraySize, maxItemSize } from './utils/constants';
import { Entry, EntryState, Sorting } from './utils/types';
import { useQuickSort } from './utils/helpers/quickSort';
import { useBubbleSort } from './utils/helpers/bubbleSort';

const jsConfetti = new JSConfetti()

const App = () => {
  const [isConfettiEnabled, setIsConfettiEnabled] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isSortedAlready, setIsSortedAlready] = useState<boolean>(false);
  const [size, setSize] = useState<number>(0);
  const [sorting, setSorting] = useState<Sorting>(Sorting.quick);
  const [array, setArray] = useState<Array<Entry>>([]);

  const { doQuickSort } = useQuickSort({ setArray });
  const { doBubbleSort } = useBubbleSort({ setArray });

  useEffect(() => {
    const randomSize = Math.floor(Math.random() * maxArraySize);
    setSize(randomSize);
  }, []);

  const resetArray = (arraySize: number) => {
    setIsSortedAlready(false)
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
    setIsSortedAlready(true)

    const arrayCopy = [...array];
    await doQuickSort(arrayCopy);

    if (isConfettiEnabled) jsConfetti.addConfetti()
  }

  const onBubbleSort = async () => {
    setIsSortedAlready(true)

    const arrayCopy = [...array];
    await doBubbleSort(arrayCopy);

    if (isConfettiEnabled) jsConfetti.addConfetti()
  }

  const getHandleSortFunction = (sortingMethod: Sorting): () => void => {
    switch (sortingMethod) {
      case Sorting.quick:
        return onQuickSort;

      case Sorting.bubble:
        return onBubbleSort;

      default: {
        const doNothing = () => {}
        return doNothing;
      }
    }
  }

  const [isScreenValid, setIsScreenValid] = useState<boolean>(false);

  useEffect(() => {
    if (window.outerWidth >= 650) {
      setIsScreenValid(true);
    } else {
      setIsScreenValid(false);
    }

    window.addEventListener('resize', () => {
      if (window.outerWidth >= 650) {
        setIsScreenValid(true);
      } else {
        setIsScreenValid(false);
      }
    });

    return () => {
      window.removeEventListener('resize', () => {
        if (window.outerWidth >= 650) {
          setIsScreenValid(true);
        } else {
          setIsScreenValid(false);
        }
      });
    }
  }, [])

  return isScreenValid ? (
    <div className="App">
      <Header
        isSortedAlready={isSortedAlready}
        isConfettiEnabled={isConfettiEnabled}
        setIsConfettiEnabled={setIsConfettiEnabled}
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
        array={array}
      />
    </div>
  ) : (
    <div className="App">
      <div className="alert">
        <h2>Window size is too small</h2>
        <p>You should have a window with a width of at least 650px for this app to work. Please try with a larger window size</p>
      </div>
    </div>
  );
}

export default App;
