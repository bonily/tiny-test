import { render, screen } from "@testing-library/react";
import ComicStripItem from "./ComicStripItem";
import userEvent from "@testing-library/user-event";

import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

const TEST_STRIP = {
  alt: '"The Amazing Spider-',
  day: "7",
  img: '"https://imgs.xkcd.com/comics/spider_',
  link: '"https://xkcd.com/',
  month: "12",
  news: "https://xkcd.com/",
  num: 10,
  safe_title: '"Spider-',
  title: '"Spider-',
  transcript: '"The Amazing Spider-',
  year: "2019",
};

describe("<ComicStripItem />", () => {
  it("should render strip img", async () => {
    render(
      <ComicStripItem strip={TEST_STRIP} index={25} onItemClick={jest.fn()} />
    );
    mockAllIsIntersecting(true);

    const img = screen.getByAltText(TEST_STRIP.alt);

    expect(img).toBeInTheDocument();
  });

  test("should call onItemClick on img click", async () => {
    const onItemClick = jest.fn();
    render(
      <ComicStripItem strip={TEST_STRIP} index={25} onItemClick={onItemClick} />
    );
    mockAllIsIntersecting(true);

    const img = screen.getByAltText(TEST_STRIP.alt);

    userEvent.click(img);

    expect(onItemClick).toHaveBeenCalledTimes(1);
  });
});
