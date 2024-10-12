import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { Modal } from "./Modal.tsx";
import { getMockGifs } from "../../tests/mockData.ts";

describe("Modal", () => {
  const mockGif = getMockGifs()[0];
  const onClose = vi.fn();

  beforeEach(() => {
    render(<Modal gif={mockGif} onClose={onClose} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it.only("renders skeleton and image with mocked gif", async () => {
    // title is present
    const title = screen.getByText(mockGif.title);
    expect(title).toBeInTheDocument();

    // skeleton loader is present
    const skeletonLoader = screen.getByTestId("skeleton-loader");
    expect(skeletonLoader).toBeInTheDocument();

    // image is present and has correct url
    const image = await screen.findByTestId("modal-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockGif.images.original.url);
  });

  it("Close button should have focus and calls onClose with Mouse and Escape key", async () => {
    const closeButton = screen.getByLabelText("Close modal");
    expect(closeButton).toHaveFocus();

    userEvent.click(closeButton);
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
    userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(2);
    });
  });
});
