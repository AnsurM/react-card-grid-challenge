import { fireEvent, renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useEventListener } from "./eventListeners";

describe("Utility: EventListener", () => {
  let element: HTMLDivElement;
  let callback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    element = document.createElement("div");
    callback = vi.fn();
  });

  it("should add event listener to the specified element", () => {
    const { unmount } = renderHook(() =>
      useEventListener({ element, eventType: "click", callback })
    );

    fireEvent.click(element);
    expect(callback).toHaveBeenCalledTimes(1);

    unmount();
  });

  it("should remove event listener when component unmounts", () => {
    const { unmount } = renderHook(() =>
      useEventListener({ element, eventType: "click", callback })
    );

    unmount();
    fireEvent.click(element);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should throw an error if required arguments are missing", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      renderHook(() =>
        useEventListener({ element: null as any, eventType: "click", callback })
      );
    }).toThrow(
      "Not enough arguments for useEventListener. element, eventType and callback are required."
    );

    expect(() => {
      renderHook(() =>
        useEventListener({ element, eventType: "" as any, callback })
      );
    }).toThrow(
      "Not enough arguments for useEventListener. element, eventType and callback are required."
    );

    expect(() => {
      renderHook(() =>
        useEventListener({ element, eventType: "click", callback: null as any })
      );
    }).toThrow(
      "Not enough arguments for useEventListener. element, eventType and callback are required."
    );

    consoleError.mockRestore();
  });

  it("should work with different event types", () => {
    const keydownCallback = vi.fn();
    const mousedownCallback = vi.fn();

    renderHook(() =>
      useEventListener({
        element,
        eventType: "keydown",
        callback: keydownCallback,
      })
    );

    renderHook(() =>
      useEventListener({
        element,
        eventType: "mousedown",
        callback: mousedownCallback,
      })
    );

    fireEvent.keyDown(element);
    expect(keydownCallback).toHaveBeenCalledTimes(1);
    expect(mousedownCallback).not.toHaveBeenCalled();

    fireEvent.mouseDown(element);
    expect(keydownCallback).toHaveBeenCalledTimes(1);
    expect(mousedownCallback).toHaveBeenCalledTimes(1);
  });
});
