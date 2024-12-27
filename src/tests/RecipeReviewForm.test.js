import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import RecipeReviewForm from "../components/RecipeReviewForm/RecipeReviewForm";

// Mock Redux store
const mockStore = configureStore({
  reducer: {
    auth: () => ({
      user: {
        id: "test-user-id",
      },
    }),
  },
});

const renderWithRedux = (component) => {
  return render(<Provider store={mockStore}>{component}</Provider>);
};

describe("RecipeReviewForm Component", () => {
  const mockHandleSubmitReview = jest.fn();

  beforeEach(() => {
    renderWithRedux(
      <RecipeReviewForm onHandleSubmitReview={mockHandleSubmitReview} />,
    );
  });

  test("renders all form elements correctly", () => {
    // Check for main elements
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByLabelText("Image Link")).toBeInTheDocument();
    expect(screen.getByLabelText("Your Rating")).toBeInTheDocument();
    expect(screen.getByLabelText("Your Review")).toBeInTheDocument();
    expect(screen.getByText("Submit Review")).toBeInTheDocument();

    // Check for star rating buttons
    const ratingButtons = screen.getAllByRole("radio");
    expect(ratingButtons).toHaveLength(5);
  });

  test("handles text input changes", () => {
    const imageInput = screen.getByLabelText("Image Link");
    const reviewInput = screen.getByLabelText("Your Review");

    fireEvent.change(imageInput, {
      target: { value: "https://example.com/image.jpg" },
    });
    fireEvent.change(reviewInput, { target: { value: "Great recipe!" } });

    expect(imageInput.value).toBe("https://example.com/image.jpg");
    expect(reviewInput.value).toBe("Great recipe!");
  });

  test("handles rating selection", () => {
    const ratingButtons = screen.getAllByRole("radio");

    // Click the third star
    fireEvent.click(ratingButtons[2]);

    // Check if the first three stars are filled
    const stars = screen.getAllByRole("radio");
    expect(stars[0]).toHaveAttribute("aria-checked", "false");
    expect(stars[1]).toHaveAttribute("aria-checked", "false");
    expect(stars[2]).toHaveAttribute("aria-checked", "true");
  });

  test("submits form with correct data", async () => {
    // Fill out the form
    fireEvent.change(screen.getByLabelText("Image Link"), {
      target: { value: "https://example.com/image.jpg" },
    });
    fireEvent.change(screen.getByLabelText("Your Review"), {
      target: { value: "Delicious recipe!" },
    });
    const ratingButtons = screen.getAllByRole("radio");
    fireEvent.click(ratingButtons[4]); // 5-star rating

    // Submit the form
    fireEvent.submit(screen.getByRole("form"));

    // Check if onHandleSubmitReview was called with correct data
    expect(mockHandleSubmitReview).toHaveBeenCalledWith({
      imageUrl: "https://example.com/image.jpg",
      rating: 5,
      reviewText: "Delicious recipe!",
      userId: "test-user-id",
    });
  });

  test("validates required fields", () => {
    // Try to submit empty form
    fireEvent.submit(screen.getByRole("form"));

    // Check if form wasn't submitted
    expect(mockHandleSubmitReview).not.toHaveBeenCalled();
  });
});
