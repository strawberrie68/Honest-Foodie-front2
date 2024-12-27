import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import RecipePage from "../pages/RecipePage/RecipePage";
import authReducer from "../redux/authRedux";
import favoritesReducer from "../redux/favoriteSlice";

// Mock modules
jest.mock("axios");
jest.mock("fraction.js", () => {
  return function MockFraction(value) {
    return {
      toFraction: () => value.toString(),
    };
  };
});
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ recipeId: "123" }),
  useNavigate: () => jest.fn(),
}));

// Mock components
jest.mock("../components/NavBar/NavBar", () => {
  return function MockNavBar() {
    return <div data-testid="mock-navbar">Mock NavBar</div>;
  };
});

jest.mock("../utils/ResponsiveImage", () => {
  return function MockResponsiveImage({ alt }) {
    return <img data-testid="mock-image" alt={alt} />;
  };
});

jest.mock("../components/RecipeReviewForm/RecipeReviewForm", () => {
  return function MockRecipeReviewForm({ onHandleSubmitReview }) {
    return (
      <div data-testid="mock-review-form">
        <label htmlFor="review">Your Review</label>
        <textarea
          id="review"
          onChange={(e) => onHandleSubmitReview({ reviewText: e.target.value })}
        />
        <button
          onClick={() => onHandleSubmitReview({ reviewText: "Test review" })}
        >
          Submit Review
        </button>
      </div>
    );
  };
});

jest.mock("../components/RecipeReviewCard/RecipeReviewCard", () => {
  return function MockRecipeReviewCard({ review }) {
    return <div data-testid="mock-review-card">{review.reviewText}</div>;
  };
});

// Mock star ratings component used in RecipePage
jest.mock("react-star-ratings", () => {
  return function MockStarRatings() {
    return <div data-testid="mock-star-ratings" />;
  };
});

// Mock recipe data
const mockRecipe = {
  id: "123",
  title: "Test Recipe",
  description: "A delicious test recipe",
  imageUrl: "https://example.com/image.jpg",
  preparationTime: 30,
  cookingTime: 45,
  servings: 4,
  user: {
    id: "user1",
    username: "testuser",
    profilePicture: "https://example.com/profile.jpg",
  },
  tags: [{ tag: { name: "healthy" } }],
  sections: [
    {
      name: "Main Ingredients",
      ingredients: [{ quantity: 1, unit: "cup", name: "flour" }],
    },
  ],
  steps: [{ id: 1, instruction: "Mix ingredients" }],
  reviews: [
    {
      id: "review1",
      rating: 5,
      reviewText: "Great recipe!",
      imageUrl: "https://example.com/review.jpg",
      user: {
        username: "reviewer1",
        profilePicture: "https://example.com/reviewer.jpg",
      },
    },
  ],
};

// Mock Redux initial state
const mockInitialState = {
  auth: {
    user: {
      id: "testUserId",
      username: "testUser",
      following: [],
    },
    token: "mock-token",
    posts: [],
  },
  favorites: {
    recipes: [],
    isLoading: false,
    error: null,
  },
};

// Create test store with mock data
const createTestStore = (initialState = mockInitialState) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      favorites: favoritesReducer,
    },
    preloadedState: initialState,
  });
};

const renderWithProviders = (
  component,
  { initialState = mockInitialState } = {},
) => {
  const store = createTestStore(initialState);
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
  );
};

describe("RecipePage Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Mock the environment variable
    process.env.VITE_API_URL = "http://test-api.com";
  });

  test("displays error message when API call fails", async () => {
    const errorMessage = "Failed to load recipe";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    renderWithProviders(<RecipePage />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });

  test("displays recipe details when API call succeeds", async () => {
    axios.get.mockResolvedValueOnce({ data: mockRecipe });

    renderWithProviders(<RecipePage />);

    await waitFor(() => {
      expect(screen.getByText(mockRecipe.title)).toBeInTheDocument();
      expect(screen.getByText(mockRecipe.description)).toBeInTheDocument();
      expect(screen.getByText(mockRecipe.user.username)).toBeInTheDocument();
      expect(screen.getByText("30 min")).toBeInTheDocument(); // prep time
      expect(screen.getByText("#healthy")).toBeInTheDocument(); // tag
    });
  });

  test("displays recipe ingredients correctly", async () => {
    axios.get.mockResolvedValueOnce({ data: mockRecipe });

    renderWithProviders(<RecipePage />);

    await waitFor(() => {
      expect(screen.getByText("Main Ingredients")).toBeInTheDocument();
      expect(screen.getByText(/1 cup flour/)).toBeInTheDocument();
    });
  });

  test("displays recipe instructions correctly", async () => {
    axios.get.mockResolvedValueOnce({ data: mockRecipe });

    renderWithProviders(<RecipePage />);

    await waitFor(() => {
      expect(screen.getByText("Instructions")).toBeInTheDocument();
      expect(screen.getByText(/Mix ingredients/)).toBeInTheDocument();
    });
  });

  test("handles review submission", async () => {
    axios.get.mockResolvedValueOnce({ data: mockRecipe });
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    renderWithProviders(<RecipePage />);

    await waitFor(() => {
      expect(screen.getByText("Submit Review")).toBeInTheDocument();
    });

    // Fill out review form
    const reviewText = screen.getByLabelText("Your Review");
    fireEvent.change(reviewText, { target: { value: "Amazing recipe!" } });

    // Submit form
    const submitButton = screen.getByText("Submit Review");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  test("displays existing reviews", async () => {
    axios.get.mockResolvedValueOnce({ data: mockRecipe });

    renderWithProviders(<RecipePage />);

    await waitFor(() => {
      expect(screen.getByText("Other reviews")).toBeInTheDocument();
      expect(screen.getByText("Great recipe!")).toBeInTheDocument();
    });
  });
});
