import { render, screen } from "@testing-library/react";
import ComicStripFullItem from "./ComicStripFullItem";
import userEvent from "@testing-library/user-event";

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

describe("<ComicStripFullItem />", () => {
  it("should render strip img", async () => {
    render(<ComicStripFullItem strip={TEST_STRIP} onClose={jest.fn()} />);

    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();
  });

  it("should render strip img title", async () => {
    render(<ComicStripFullItem strip={TEST_STRIP} onClose={jest.fn()} />);

    const title = screen.getByText(TEST_STRIP.title);

    expect(title).toBeInTheDocument();
  });

  it("should call onClose on Close button press", async () => {
    const onClose = jest.fn();
    render(<ComicStripFullItem strip={TEST_STRIP} onClose={onClose} />);
    const button = screen.getByRole("button", { name: "close" });

    userEvent.click(button);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose on Esc press", async () => {
    const onClose = jest.fn();
    render(<ComicStripFullItem strip={TEST_STRIP} onClose={onClose} />);

    userEvent.keyboard("{esc}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
