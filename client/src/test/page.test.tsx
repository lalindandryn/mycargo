import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Page component", () => {
  test("renders the Home page", () => {
    render(<Home />);
    expect(screen.getByText(/Get started by editing/)).toBeInTheDocument();
    expect(
      screen.getByText(/Save and see your changes instantly/),
    ).toBeInTheDocument();
  });
});
