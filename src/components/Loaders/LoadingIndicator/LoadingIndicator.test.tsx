import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LoadingIndicator } from "./LoadingIndicator";

describe("LoadingIndicator", () => {
  render(<LoadingIndicator limit={10} />);
  it("renders the correct number of skeleton loaders", () => {
    const loadingContainer = screen.getByTestId("skeleton-loading-container");
    expect(loadingContainer).toBeInTheDocument();

    expect(screen.getAllByTestId("skeleton-loader")).toHaveLength(10);
  });
});
