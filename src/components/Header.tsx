import { Dispatch, FunctionComponent, SetStateAction } from "react";

type HeaderProps = {
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header: FunctionComponent<HeaderProps> = ({
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
