import UserAllRecipes from "../../src/pages/profile/ProfileSections/UserAllRecipes";
import { testUser } from "../../cypress/testData/testUser";
import { BrowserRouter } from "react-router-dom";

const mountUserAllRecipes = () => {
  cy.mount(
    <BrowserRouter>
      <UserAllRecipes user={testUser} recipes={testUser.recipes} />
    </BrowserRouter>
  );
};

describe("UserAllRecipes", () => {
  beforeEach(mountUserAllRecipes);

  it("renders the correct number of RecipeCard components", () => {
    cy.get(".recipe-card-container")
      .children()
      .should("have.length", testUser.recipes.length);
  });
});
