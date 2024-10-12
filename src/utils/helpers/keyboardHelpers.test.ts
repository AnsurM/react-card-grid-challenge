import { vi } from "vitest";
import {
  getKeyPressInfo,
  getNavigationInfo,
  isKeyboardClick,
  KeyboardEvent,
  useKeyDownEventListener,
} from "./keyboardHelpers";
import { useEventListener } from "./eventListeners";
import { fireEvent, renderHook } from "@testing-library/react";

// Mock KeyboardEvent
const createKeyboardEvent = (key: string, shiftKey = false): KeyboardEvent =>
  ({
    key,
    shiftKey,
  } as KeyboardEvent);

// Mock the useEventListener hook
vi.mock("./eventListeners", () => ({
  useEventListener: vi.fn((params) => {
    // Simulate adding the event listener
    params.element.addEventListener(params.eventType, params.callback);
  }),
}));

describe("Utility: KeyboardHelpers", () => {
  describe("getKeyPressInfo", () => {
    it("should correctly identify space key", () => {
      const event = createKeyboardEvent(" ");
      const info = getKeyPressInfo(event);
      expect(info.isSpace).toBe(true);
      expect(info.isEnter).toBe(false);
    });

    it("should correctly identify enter key", () => {
      const event = createKeyboardEvent("Enter");
      const info = getKeyPressInfo(event);
      expect(info.isEnter).toBe(true);
      expect(info.isSpace).toBe(false);
    });

    it("should correctly identify arrow keys", () => {
      const arrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
      arrowKeys.forEach((key) => {
        const event = createKeyboardEvent(key);
        const info = getKeyPressInfo(event);
        expect(info.isArrow).toBe(true);
        expect(info.arrowKey).toBe(key.toLowerCase());
      });
    });

    it("should correctly identify shift+tab", () => {
      const event = createKeyboardEvent("Tab", true);
      const info = getKeyPressInfo(event);
      expect(info.isShiftTab).toBe(true);
      expect(info.isTab).toBe(true);
    });
  });

  describe("getNavigationInfo", () => {
    it("should identify next navigation for right and down arrows", () => {
      ["ArrowRight", "ArrowDown"].forEach((key) => {
        const event = createKeyboardEvent(key);
        const info = getNavigationInfo(event);
        expect(info.isNext).toBe(true);
        expect(info.isPrevious).toBe(false);
      });
    });

    it("should identify previous navigation for left and up arrows", () => {
      ["ArrowLeft", "ArrowUp"].forEach((key) => {
        const event = createKeyboardEvent(key);
        const info = getNavigationInfo(event);
        expect(info.isNext).toBe(false);
        expect(info.isPrevious).toBe(true);
      });
    });

    it("should not identify navigation for non-arrow keys", () => {
      const event = createKeyboardEvent("Enter");
      const info = getNavigationInfo(event);
      expect(info.isNext).toBe(false);
      expect(info.isPrevious).toBe(false);
    });
  });

  describe("isKeyboardClick", () => {
    it("should return true for space and enter keys", () => {
      [" ", "Enter"].forEach((key) => {
        const event = createKeyboardEvent(key);
        expect(isKeyboardClick(event)).toBe(true);
      });
    });

    it("should return false for other keys", () => {
      ["ArrowLeft", "Escape", "a"].forEach((key) => {
        const event = createKeyboardEvent(key);
        expect(isKeyboardClick(event)).toBe(false);
      });
    });
  });

  describe("useKeyDownEventListener", () => {
    it("should invoke callback when Enter key is pressed on button", () => {
      const mockCallback = vi.fn();
      const button = document.createElement("button");
      document.body.appendChild(button);

      renderHook(() => useKeyDownEventListener(button, mockCallback));

      fireEvent.keyDown(button, { key: "Enter" });

      expect(useEventListener).toHaveBeenCalledWith({
        element: button,
        eventType: "keydown",
        callback: expect.any(Function),
      });

      expect(mockCallback).toHaveBeenCalledTimes(1);

      // Clean up
      document.body.removeChild(button);
    });
  });
});
