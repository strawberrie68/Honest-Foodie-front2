import { testUser } from "../testData/testUser";
import RecipeCard from "../../src/components/TypesOfRecipeCards/RecipeCard";
import { BrowserRouter } from "react-router-dom";
const recipe = testUser.recipes[0];

describe("Pinned RecipeCard", () => {
  it("renders recipe card info", () => {
    cy.mount(
      <BrowserRouter>
        <RecipeCard recipe={recipe} pinned={true} />
      </BrowserRouter>
    );

    cy.contains(recipe.title);
    cy.contains(recipe.userId.firstName);
    cy.contains(recipe.userId.lastName);
    cy.contains(recipe.rating.toFixed(1) + " ⭐️");
    cy.contains(recipe.reviews.length + " Reviews");
  });
  it("renders the Pinned icon when pinned is true", () => {
    cy.mount(
      <BrowserRouter>
        <RecipeCard recipe={recipe} pinned={true} />
      </BrowserRouter>
    );
    cy.get(".pinned").should("exist");
  });

  it("does not render the Pinned icon when pinned is false", () => {
    cy.mount(
      <BrowserRouter>
        <RecipeCard recipe={recipe} pinned={false} />
      </BrowserRouter>
    );

    cy.get(".pinned").should("not.exist");
  });
});
