import "./ComicStripItem.css";
import React, { useEffect, useRef } from "react";
import xhr from "../../xhr";
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
}

const ComicStripBlock: React.FC<Props> = ({ index, strip }) => {
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
  // const [strip, setStrip] = React.useState<Strip | null>(null);

  // useEffect(() => {
  //   fetchStrip(stripId);
  // }, [stripId]);

  // const fetchStrip = (id: number) => {
  //   xhr.get(`/${id}/info.0.json`).then((res: Strip) => {
  //     console.log(res);
  //     setStrip(res);
  //   });
  // };

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
      />
    </div>
  );
};

export default ComicStripBlock;
