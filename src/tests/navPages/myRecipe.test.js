import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../src/redux/authRedux.js";
import MyRecipe from "../../../src/pages/navbar pages/my recipes/myrecipes";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import testRecipe from "../test_helper.js";

const renderWithStore = (recipes) => {
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
          recipes: recipes,
        },
        token: "mock-token",
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <MyRecipe />
      </MemoryRouter>
    </Provider>
  );
};

describe("MyRecipe Page", () => {
  it('displays "My recipes" text when successfully loaded', () => {
    const { getByText } = renderWithStore([]);
    expect(getByText("My recipes")).toBeInTheDocument();
  });

  it('displays "No recipes yet" text when recipes is empty', () => {
    const { getByText } = renderWithStore([]);
    expect(getByText("No recipes yet")).toBeInTheDocument();
  });

  it('does not display "No recipes yet" text when recipes is not empty', () => {
    const { queryByText } = renderWithStore([testRecipe]);
    expect(queryByText("No recipes yet")).toBeNull();
    expect(queryByText(testRecipe.title)).toBeInTheDocument();
  });
});
