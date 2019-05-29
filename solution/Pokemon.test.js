import React from "react";
import { render, cleanup } from "react-testing-library";
import Pokemon from "./Pokemon";

const mockResponse = name => {
  return Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        name,
        sprites: { front_default: "https://fake.com" }
      })
  });
};

afterEach(cleanup);

describe("Pokemon component", () => {
  test("Fetches pokemon data and renders it", async () => {
    const name = "charizard";
    window.fetch = jest.fn().mockReturnValueOnce(mockResponse(name));

    const { getByText, findByText, findByAltText } = render(
      <Pokemon name={name} />
    );

    getByText(/Loading.../i);
    expect(window.fetch).toHaveBeenCalledTimes(1);

    await findByText(name);
    await findByAltText(`${name} default sprite`);
  });
  test("Refetches pokemon data when name prop changes", async () => {
    window.fetch = jest.fn();

    const name = "charizard";
    window.fetch.mockReturnValueOnce(mockResponse(name));
    const { findByText, findByAltText, rerender } = render(
      <Pokemon name={name} />
    );
    await findByText(name);

    const newName = "pikachu";
    window.fetch.mockReturnValueOnce(mockResponse(newName));
    rerender(<Pokemon name={newName} />);

    await findByText(newName);
    await findByAltText(`${newName} default sprite`);

    expect(window.fetch).toHaveBeenCalledTimes(2);
  });
  test("Does not refetch data if unrelated prop changes", async () => {
    const name = "charizard";
    window.fetch = jest.fn().mockReturnValue(mockResponse(name));
    const { findByText, findByAltText, rerender } = render(
      <Pokemon name={name} />
    );

    rerender(<Pokemon name={name} />);

    await findByText(name);
    await findByAltText(`${name} default sprite`);
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });
});
