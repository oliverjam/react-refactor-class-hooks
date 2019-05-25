const React = require("react");
const { render, fireEvent, cleanup } = require("react-testing-library");
const { Counter } = require("./");

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
