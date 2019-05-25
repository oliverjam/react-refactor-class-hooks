const React = require("react");
const { render, cleanup } = require("react-testing-library");
const Pokemon = require("./Pokemon");

let originalFetch = window.fetch;
beforeEach(() => {
  const mockPoke = {
    name: "Pikachu",
    sprites: {
      front_default: "https://fakesprite.com/",
    },
  };
  window.fetch = jest.fn(() => {
    return Promise.resolve({ json: () => Promise.resolve(mockPoke) });
  });
});

afterEach(() => {
  cleanup();
  window.fetch = originalFetch;
});

describe("Counter component", () => {
  test("Buttons increment and decrement count", async () => {
    const { getByText, findByText, findByAltText } = render(<Pokemon />);
    getByText(/Loading.../i);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    await findByText(/pikachu/i);
    await findByAltText(/pikachu default sprite/i);
  });
});
