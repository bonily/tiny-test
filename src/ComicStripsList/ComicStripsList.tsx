import "./ComicStripsList.css";
import React, { useCallback, useEffect, useState } from "react";

import xhr from "../xhr";

import Loading from "../Loading";
import ComicStripFullItem from "./ComicStripFullItem";
import ComicStripItem from "./ComicStripsItem";
import { Strip } from "./ComicStripsItem/ComicStripItem";

export interface Props {
  stripIds: number[];
  reloadStripIds: () => void;
}

const ComicStripsList: React.FC<Props> = ({ stripIds, reloadStripIds }) => {
  const [strips, setStrips] = useState<Array<Strip | undefined>>([]);
  const [loading, setLoading] = useState(true);
  const [fillStripInfo, setFillStripInfo] = useState<Strip | undefined>(
    undefined
  );

  const fetchStrips = useCallback(async (ids: number[]) => {
    const promises = ids.map((id) => fetchStrip(id));
    setLoading(true);
    const result = await Promise.all(promises);
    setStrips(result);
    setLoading(false);
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

  const onItemClick = (item: Strip | undefined) => {
    setFillStripInfo(item);
  };

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className="comic-strips__list">
        {strips.map((strip, i) => (
          <ComicStripItem
            strip={strip}
            key={strip?.num || i}
            index={i}
            onItemClick={onItemClick}
          />
        ))}
      </div>
      <button
        className="comic-strips__list-reload"
        onClick={reloadStripIds}
        style={{ animationDelay: `${strips.map.length}s` }}
      >
        RELOAD
      </button>
      {fillStripInfo && (
        <ComicStripFullItem
          strip={fillStripInfo}
          onClose={() => onItemClick(undefined)}
        />
      )}
    </div>
  );
};

export default ComicStripsList;
