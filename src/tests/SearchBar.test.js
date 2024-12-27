import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  test("renders SearchBar with all necessary elements", () => {
    render(<SearchBar />);

    // Check for input element
    const inputElement = screen.getByPlaceholderText(
      /Search food, ingredients, users, cuisines, etc/i,
    );
    expect(inputElement).toBeInTheDocument();

    // Check for search icon

    const searchIcon = screen.getByTestId("magnifying-glass-icon");
    expect(searchIcon).toBeInTheDocument();

    // Check for form element with correct accessibility role
    const searchForm = screen.getByRole("search");
    expect(searchForm).toBeInTheDocument();
    expect(searchForm).toHaveAttribute("aria-label", "Search food and more");
  });

  test("handles input changes correctly", () => {
    const mockOnSearchChange = jest.fn();
    render(<SearchBar onSearchChange={mockOnSearchChange} />);

    const inputElement = screen.getByPlaceholderText(
      /Search food, ingredients, users, cuisines, etc/i,
    );

    // Simulate user typing
    fireEvent.change(inputElement, { target: { value: "pasta" } });

    // Check if input value updated
    expect(inputElement.value).toBe("pasta");
    // Check if callback was called with correct value
    expect(mockOnSearchChange).toHaveBeenCalledWith("pasta");
  });

  test("maintains empty state when no input provided", () => {
    const mockOnSearchChange = jest.fn();
    render(<SearchBar onSearchChange={mockOnSearchChange} />);

    const inputElement = screen.getByPlaceholderText(
      /Search food, ingredients, users, cuisines, etc/i,
    );

    expect(inputElement.value).toBe("");
    expect(mockOnSearchChange).not.toHaveBeenCalled();
  });

  test("meets accessibility requirements", () => {
    render(<SearchBar />);

    // Check for hidden label
    const label = screen.getByLabelText(
      /Search food, ingredients, users, cuisines, etc/i,
    );
    expect(label).toBeInTheDocument();

    // Check input has correct ID
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "search-input");
  });
});
