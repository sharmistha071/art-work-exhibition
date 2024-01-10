import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Home from "./Home";

jest.mock("../services/useAPI", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    state: {
      loading: false,
      results: [
        {
          id: 1,
          title: "Artwork 1",
          alt_text: "Alt Text 1",
          thumbnail: "thumbnail_url_1"
        },
        {
          id: 2,
          title: "Artwork 2",
          alt_text: "Alt Text 2",
          thumbnail: "thumbnail_url_2"
        }
      ],
      error: {}
    }
  }))
}));

describe("Home", () => {
  it("renders Home component", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  it("renders the component with results", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // waiting for the component to render
    await waitFor(() => {
      // assert if the results are displayed
      expect(screen.getByText("Artwork 1")).toBeInTheDocument();
      expect(screen.getByText("Artwork 2")).toBeInTheDocument();
    });
  });
  it("handle search properly", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const searchInput = screen.getByTestId("search-wrapper");
    userEvent.type(searchInput, "starry night");
    expect(screen.getByTestId("search-wrapper")).toBeInTheDocument();
  });
});
