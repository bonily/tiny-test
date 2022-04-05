import "./App.css";
import React from "react";
import ComicStripsList from "./ComicStripsList";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function createRendomStripIds(count: number): number[] {
  return Array(count)
    .fill(1)
    .map(() => getRandomInt(2600));
}

const STRIPS_COUNT = 9;

function App() {
  const [stripIds, setStripIds] = React.useState<number[]>(
    createRendomStripIds(STRIPS_COUNT)
  );

  const reloadStripIds = () => {
    setStripIds(createRendomStripIds(9));
  };

  return (
    <div className="App">
      <ComicStripsList stripIds={stripIds} reloadStripIds={reloadStripIds} />
    </div>
  );
}

export default App;
