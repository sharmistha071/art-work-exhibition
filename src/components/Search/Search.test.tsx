import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search";

describe("Search", () => {
  it("calls onSearch with the correct query when the Search button is clicked", () => {
    const mockOnSearch = jest.fn();
    render(<Search onSearch={mockOnSearch} />);

    const searchInput = screen.getByTestId("search-wrapper");
    const searchButton = screen.getByText("Search");

    //fire search event
    fireEvent.change(searchInput, { target: { value: "starry night" } });

    // click the Search button
    fireEvent.click(searchButton);

    // verify that onSearch is called with the correct query
    expect(mockOnSearch).toHaveBeenCalledWith("starry night");
  });
});
