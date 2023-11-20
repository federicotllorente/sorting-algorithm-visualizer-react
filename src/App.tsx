import { useEffect, useState } from 'react';
import './App.css';

import { Header } from './components/Header';
import { SettingsModal } from './components/SettingsModal';
import { SortingVisualizer } from './components/SortingVisualizer';

import { Sorting, maxArraySize } from './utils/constants';

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
