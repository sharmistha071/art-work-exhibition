import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Card from "./Card";

const mockArtwork = {
  id: 1,
  title: "Test Artwork",
  alt_text: "Test Alt Text",
  thumbnail: "test_thumbnail_id"
};

describe("Card", () => {
  it("renders Card component with provided content", () => {
    render(
      <MemoryRouter>
        <Card content={mockArtwork} />
      </MemoryRouter>
    );

    const titleElement = screen.getByText("Test Artwork");
    const altTextElement = screen.getByText("Test Alt Text");
    const imageElement = screen.getByAltText("Avatar");

    expect(titleElement).toBeInTheDocument();
    expect(altTextElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://www.artic.edu/iiif/2/test_thumbnail_id/full/274,263/0/default.jpg"
    );
  });

  it("renders default image when thumbnail is not provided", () => {
    const mockArtworkWithoutThumbnail = {
      ...mockArtwork,
      thumbnail: undefined
    };

    render(
      <MemoryRouter>
        <Card content={mockArtworkWithoutThumbnail} />
      </MemoryRouter>
    );

    const imageElement = screen.getByAltText("Avatar");

    expect(imageElement).toHaveAttribute(
      "src",
      "https://dummyimage.com/180x190/dedede/3b3b3b&text=Image+Not+Available"
    );
  });
});
