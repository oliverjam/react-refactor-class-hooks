const React = require("react");
const { render, cleanup } = require("react-testing-library");
const Pokemon = require("./Pokemon");

const fetchMock = name => () => {
  return Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        name,
        sprites: { front_default: "https://fake.com" },
      }),
  });
};

afterEach(cleanup);

describe("Pokemon component", () => {
  test("Fetches pokemon data and renders it", async () => {
    const name = "charizard";
    window.fetch = jest.fn(fetchMock(name));

    const { getByText, findByText, findByAltText, rerender } = render(
      <Pokemon name={name} />
    );

    getByText(/Loading.../i);
    expect(window.fetch).toHaveBeenCalledTimes(1);

    await findByText(name);
    await findByAltText(`${name} default sprite`);

    const newName = "pikachu";
    window.fetch = jest.fn(fetchMock(newName));
    rerender(<Pokemon name={newName} />);

    getByText(/Loading.../i);
    expect(window.fetch).toHaveBeenCalledTimes(1);

    await findByText(newName);
    await findByAltText(`${newName} default sprite`);
  });
});
