import "./ComicStripItem.css";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export interface Strip {
  alt: string;
  day: string;
  img: string;
  link: string;
  month: string;
  news: string;
  num: number;
  safe_title: string;
  title: string;
  transcript: string;
  year: string;
}

export interface Props {
  index: number;
  strip: Strip | undefined;
  onItemClick: (item: Strip | undefined) => void;
}

const ComicStripItem: React.FC<Props> = ({ index, strip, onItemClick }) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 1,
    trackVisibility: true,
    delay: 100,
    rootMargin: "0px 0px 100px 0px",
  });
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    inView && imgRef && imgRef.current?.setAttribute("src", strip?.img || "");
  }, [inView, strip]);

  return (
    <div className="comic-strips__item" ref={ref}>
      <img
        ref={imgRef}
        width="200px"
        height="200px"
        className="comic-strips__item-pic"
        alt={strip?.alt || "Не удалось загрузить картинку"}
        style={{ animationDelay: `${index * 0.5}s` }}
        loading="lazy"
        onClick={() => onItemClick(strip)}
      />
    </div>
  );
};

export default ComicStripItem;
