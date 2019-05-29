import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import { Keyboard } from "./Keyboard";

afterEach(cleanup);

const spy = jest.spyOn(global.console, "error");

describe("Keyboard component", () => {
  test("Key strings are rendered and no console.error", () => {
    const { getByText } = render(<Keyboard />);
    fireEvent.keyDown(window, { key: "ArrowUp" });
    getByText(/arrowup/i);
    fireEvent.keyDown(window, { key: "Enter" });
    getByText(/enter/i);

    cleanup(); // remove component from the DOM
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(spy).not.toHaveBeenCalled();
  });
});
