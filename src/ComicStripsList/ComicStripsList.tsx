import "./ComicStripsList.css";
import React, { useCallback, useEffect, useState } from "react";
import ComicStripBlock from "../ComicStripsList/ComicStripsBlock";

import xhr from "../xhr";
import { Strip } from "./ComicStripsBlock/ComicStripBlock";

export interface Props {
  stripIds: number[];
  reloadStripIds: () => void;
}

const ComicStripsList: React.FC<Props> = ({ stripIds, reloadStripIds }) => {
  const [strips, setStrips] = useState<Array<Strip | undefined>>([]);
  const [loading, setLoading] = useState(false);

  const fetchStrips = useCallback((ids: number[]) => {
    let result: Array<Strip | undefined> = [];
    const fetchData = async () => {
      setLoading(true);

      for (const id of ids) {
        const comic = await fetchStrip(id);
        result.push(comic);
      }
      setStrips(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchStrips(stripIds);
  }, [fetchStrips, stripIds]);

  const fetchStrip = async (id: number): Promise<Strip> => {
    const strip = await xhr.get(`/${id}/info.0.json`).catch((err) => {
      throw err;
    });
    return strip || undefined;
  };

  return (
    <div className="comic-strips__list">
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          {strips.map((strip, i) => (
            <ComicStripBlock strip={strip} key={strip?.num || i} index={i} />
          ))}
          <button onClick={reloadStripIds}>RELOAD</button>
        </>
      )}
    </div>
  );
};

export default ComicStripsList;
