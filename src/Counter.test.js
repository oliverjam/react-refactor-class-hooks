import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import Counter from "./Counter";

afterEach(cleanup);

describe("Counter component", () => {
  test("Buttons increment and decrement count", () => {
    const { getByLabelText, getByText } = render(<Counter />);
    const decButton = getByLabelText(/decrement count/i);
    getByText(/count is 0/i);
    const incButton = getByLabelText(/increment count/i);
    fireEvent.click(decButton);
    getByText(/count is -1/i);
    fireEvent.click(incButton);
    fireEvent.click(incButton);
    getByText(/count is 1/i);
  });
});
