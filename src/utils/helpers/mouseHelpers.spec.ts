import { fireEvent, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useMouseDownEventListener } from "./mouseHelpers";
import { useEventListener } from "./eventListeners";

// Mock the useEventListener hook
vi.mock("./eventListeners", () => ({
  useEventListener: vi.fn(),
}));

describe("Utility: MouseDownEventListener", () => {
  let element: HTMLDivElement;
  let callback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    element = document.createElement("div");
    callback = vi.fn();
    vi.mocked(useEventListener).mockClear();
  });

  it("should call useEventListener with correct parameters", () => {
    renderHook(() => useMouseDownEventListener(element, callback));

    expect(useEventListener).toHaveBeenCalledWith({
      element,
      eventType: "mousedown",
      callback,
    });
  });

  it("should trigger the callback when mousedown event occurs", () => {
    // Mock the implementation of useEventListener
    vi.mocked(useEventListener).mockImplementation(({ callback }) => {
      // Simulate attaching the event listener
      element.addEventListener("mousedown", callback);
    });

    renderHook(() => useMouseDownEventListener(element, callback));

    expect(useEventListener).toHaveBeenCalledWith({
      element,
      eventType: "mousedown",
      callback,
    });

    fireEvent.mouseDown(element);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.any(MouseEvent));
  });

  it("should not trigger the callback for other mouse events", () => {
    renderHook(() => useMouseDownEventListener(element, callback));

    // Simulate the behavior of useEventListener
    const [[{ callback: eventCallback }]] =
      vi.mocked(useEventListener).mock.calls;

    fireEvent.mouseUp(element);
    fireEvent.mouseMove(element);

    expect(eventCallback).not.toHaveBeenCalled();
  });

  it("should work with different element types", () => {
    const button = document.createElement("button");
    renderHook(() => useMouseDownEventListener(button, callback));

    expect(useEventListener).toHaveBeenCalledWith({
      element: button,
      eventType: "mousedown",
      callback,
    });
  });
});
