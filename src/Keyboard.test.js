import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import Keyboard from "./Keyboard";

afterEach(cleanup);

describe("Keyboard component", () => {
  test("Key strings are rendered", () => {
    const { getByText, queryByText } = render(<Keyboard />);
    fireEvent.keyDown(window, { key: "ArrowUp" });
    getByText(/arrowup/i);
    fireEvent.keyDown(window, { key: "Enter" });
    getByText(/enter/i);

    cleanup(); // remove component from the DOM
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(queryByText(/arrowright/i)).toBeFalsy(); // shouldn't be there since event listener is removed
  });
});
