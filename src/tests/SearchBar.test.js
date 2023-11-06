import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../components/SearchBar";

test("renders SearchBar and checks for input element", () => {
  render(<SearchBar />);

  const inputElement = screen.getByPlaceholderText(
    /Search Food, ingredients, users, cuisines, etc/i
  );
  expect(inputElement).toBeInTheDocument();
});
