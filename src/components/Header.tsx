import { Dispatch, FunctionComponent, SetStateAction } from "react";

type HeaderProps = {
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  size: number;
  resetArray: (arraySize: number) => void;
  handleSort: () => void;
}

export const Header: FunctionComponent<HeaderProps> = ({
  setIsSettingsOpen,
  size,
  resetArray,
  handleSort
}) => {
  return (
    <header>
      <div>
        <h2>Array Sorting Visualizer</h2>
        {/* <p>By <a href="https://www.federicotllorente.com/" target="_blank" rel="noopener noreferrer">Federico Tejedor Llorente</a></p> */}
      </div>
      <div>
        <button onClick={() => resetArray(size)}>
          Generate new array
        </button>
        <button onClick={() => setIsSettingsOpen(true)}>
          Open settings
        </button>
        <button onClick={handleSort}>
          Sort
        </button>
      </div>
    </header>
  )
}
