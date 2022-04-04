import "./ComicStripFullItem.css";
import React, { useEffect, useRef } from "react";
import { Strip } from "../ComicStripItem";

export interface Props {
  strip: Strip;
  onClose: () => void;
}

const ComicStripFullItem: React.FC<Props> = ({ strip, onClose }) => {
  const { img, transcript, day, month, year, title, num } = strip;

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === "Escape") {
        onClose();
      }
    }

    // const handleScroll = () => {
    //   onClose();
    // };

    // window.addEventListener("scroll", handleScroll);

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  return (
    <div className="comic-strips__full-item-wrapper">
      <div className="comic-strips__full-item">
        <span className="comic-strips__full-item-info--title">{title}</span>
        <div className="comic-strips__full-item-pic-wrapper">
          <img
            width="700px"
            src={img}
            className="comic-strips__full-item-pic"
            alt={strip.alt}
          />
        </div>

        <div className="comic-strips__full-item-info-wrapper">
          <span className="comic-strips__full-item-info">Number: {num}</span>
          <span className="comic-strips__full-item-info">
            Date: {day}/{month}/{year}
          </span>
        </div>
        <span className="comic-strips__full-item-info">{transcript}</span>
      </div>
    </div>
  );
};

export default ComicStripFullItem;
