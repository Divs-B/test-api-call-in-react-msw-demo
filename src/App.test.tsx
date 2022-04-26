import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { server } from "./mocks/server";
import App from "./App";
import { filmError500Task } from "./mocks/handlers";
import { filmError418Task } from "./mocks/handlers";
import { rest } from "msw";

test("loads and displays films", async () => {
  render(<App />);
  const filmsData = await screen.findAllByTestId("filmDataId");
  expect(screen.getAllByTestId("filmDataId")[0]).toHaveTextContent(
    "Castle in the Sky"
  );
});

test("handles server error 500", async () => {
  server.use(filmError500Task);
  render(<App />);
  const errorData = await screen.findAllByTestId("filmErrorId");
  expect(screen.getAllByTestId("filmErrorId")[0]).toHaveTextContent(
    "Oops… something went wrong, try again 🤕"
  );
});

test("handles server error 418", async () => {
  server.use(filmError418Task);
  render(<App />);
  const errorData = await screen.findAllByTestId("filmErrorId");
  expect(screen.getAllByTestId("filmErrorId")[0]).toHaveTextContent(
    "418:I'm a tea pot 🫖, silly"
  );
});
