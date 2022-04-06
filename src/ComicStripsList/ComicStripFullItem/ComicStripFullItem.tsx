import "./ComicStripFullItem.css";
import React, { useEffect } from "react";
import { Strip } from "../ComicStripsItem/ComicStripItem";

export interface Props {
  strip: Strip;
  onClose: () => void;
}

const ComicStripFullItem: React.VFC<Props> = ({ strip, onClose }) => {
  const { img, transcript, day, month, year, title, num, alt } = strip;

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  return (
    <div className="comic-strips__full-item-wrapper">
      <div className="comic-strips__full-item">
        <button className="comic-strips__full-item-close" onClick={onClose}>
          close
        </button>
        <h5 className="comic-strips__full-item-info--title">{title}</h5>
        <div className="comic-strips__full-item-info-wrapper">
          <span className="comic-strips__full-item-info">Number: {num}</span>
          <span className="comic-strips__full-item-info">
            Date: {day}/{month}/{year}
          </span>
        </div>
        <div className="comic-strips__full-item-pic-wrapper">
          <img
            width="700px"
            src={img}
            className="comic-strips__full-item-pic"
            alt={alt}
          />
        </div>
        <span className="comic-strips__full-item-info">{transcript}</span>
      </div>
    </div>
  );
};

export default ComicStripFullItem;
