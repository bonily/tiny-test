import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import xhr from "./xhr";
import ComicStripsList from "./ComicStripsList";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function createRendomStripIds(count: number): number[] {
  return Array(count)
    .fill(1)
    .map(() => getRandomInt(2600));
}

function App() {
  const [stripIds, setStripIds] = React.useState<number[]>([]);
  useEffect(() => {
    setStripIds(createRendomStripIds(9));
  }, []);

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
