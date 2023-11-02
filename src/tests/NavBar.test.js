import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";

describe("NavBar", () => {
  test("renders NavBar text", () => {
    render(
      <Router>
        <NavBar />
      </Router>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("renders the correct link", async () => {
    render(
      <Router>
        <NavBar />
      </Router>,
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
