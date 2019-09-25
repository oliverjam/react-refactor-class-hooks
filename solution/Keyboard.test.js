import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Keyboard from "./Keyboard";

afterEach(cleanup);

describe("Keyboard component", () => {
  test("Key strings are rendered", () => {
    const { getByText } = render(<Keyboard />);
    fireEvent.keyDown(window, { key: "ArrowUp" });
    getByText(/arrowup/i);
    fireEvent.keyDown(window, { key: "Enter" });
    getByText(/enter/i);
  });
  test("Event listener should be removed when component unmounts", () => {
    global.console.error = jest.fn(() => {});
    render(<Keyboard />);
    cleanup(); // remove component from the DOM
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(global.console.error).not.toHaveBeenCalled();
  });
  test("KeyDown event listener only runs once", () => {
    const actualAddEventListener = global.addEventListener;
    let keydowns = 0;
    global.addEventListener = jest.fn().mockImplementation((event, cb) => {
      if (event === "keydown") keydowns += 1; // keep track of how many keydowns have happened
      actualAddEventListener(event, cb); // run the real addEventListener after
    });

    const { getByText } = render(<Keyboard />);
    fireEvent.keyDown(window, { key: "ArrowUp" });
    getByText(/arrowup/i);
    fireEvent.keyDown(window, { key: "Enter" });
    getByText(/enter/i);
    expect(keydowns).toBe(1);

    global.addEventListener = actualAddEventListener;
  });
});
