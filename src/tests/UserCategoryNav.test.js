import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import UserCategoryNav from "../components/UserCategoryNav";

test("renders UserCategoryNav and checks for elements", () => {
  render(<UserCategoryNav />);

  const allElement = screen.getByText(/ALL/i);
  expect(allElement).toBeInTheDocument();

  const recipesElement = screen.getByText(/RECIPES/i);
  expect(recipesElement).toBeInTheDocument();

  const reviewsElement = screen.getByText(/REVIEWS/i);
  expect(reviewsElement).toBeInTheDocument();

  const tastebudsElement = screen.getByText(/TASTEBUDS/i);
  expect(tastebudsElement).toBeInTheDocument();
});
