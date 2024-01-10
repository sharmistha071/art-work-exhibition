import { render, screen } from "@testing-library/react";

import Home from "./Home";

describe("App", () => {
  it("renders headline", () => {
    render(<Home />);

    screen.debug();

    // check if App components renders headline
  });
});
