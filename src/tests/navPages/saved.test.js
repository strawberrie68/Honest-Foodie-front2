import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../src/redux/authRedux.js";
import Saved from "../../../src/pages/navbar pages/saved/saved";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import testRecipe from "../test_helper.js";

const renderWithStore = (savedRecipes) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: {
          username: "mock-username",
          firstName: "mock-firstName",
          lastName: "mock-lastName",
          following: [],
          followers: [],
          email: "mock-email",
          password: "mock-password",
          savedRecipes: savedRecipes,
        },
        token: "mock-token",
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Saved />
      </MemoryRouter>
    </Provider>
  );
};

describe("Saved Recipes Page", () => {
  it('displays "Saved recipes" text when successfully loaded', () => {
    const { getByText } = renderWithStore([]);
    expect(getByText("Saved recipes")).toBeInTheDocument();
  });

  it('displays "No recipes yet" text when recipes is empty', () => {
    const { getByText } = renderWithStore([]);
    expect(getByText("Save some recipes to make later!")).toBeInTheDocument();
  });

  it('does not display "No recipes yet" text when recipes is not empty', () => {
    const { queryByText } = renderWithStore([testRecipe]);
    expect(queryByText("Save some recipes to make later!")).toBeNull();
    expect(queryByText(testRecipe.title)).toBeInTheDocument();
  });
});
