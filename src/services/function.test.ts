import { expect, it, describe } from "vitest";
import { formatArtWorks } from "./functions";

describe("formatArtWorks", () => {
  it("should format books correctly", () => {
    const artworks = [
      {
        id: 1,
        title: "Art 1",
        alt_text: "Alt Text 1",
        thumbnail: {
          alt_text: "Alt Text 1"
        }
      },
      {
        id: 2,
        title: "Art 2",
        alt_text: "Alt Text 2",
        thumbnail: {
          alt_text: "Alt Text 2"
        }
      }
    ];
    const result = formatArtWorks(artworks);
    expect(result).toEqual([
      {
        id: 1,
        title: "Art 1",
        alt_text: "Alt Text 1",
        thumbnail: ""
      },
      {
        id: 2,
        title: "Art 2",
        alt_text: "Alt Text 2",
        thumbnail: ""
      }
    ]);
  });
});
