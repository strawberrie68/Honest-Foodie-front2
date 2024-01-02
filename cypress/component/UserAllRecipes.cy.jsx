import UserAllRecipes from "../../src/pages/profile/ProfileSections/UserAllRecipes";
import { testUser } from "../../cypress/testData/testUser";

describe("UserAllRecipes", () => {
  beforeEach(() => {
    cy.mount(<UserAllRecipes user={testUser} recipes={testUser.recipes} />);
  });

  it("renders the correct number of RecipeCard components", () => {
    cy.get(".recipe-card-container")
      .children()
      .should("have.length", testUser.recipes.length);
  });
});
