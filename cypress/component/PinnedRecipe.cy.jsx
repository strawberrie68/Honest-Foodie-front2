import { testUser } from "../testData/testUser";
import ProfilePost from "../../src/components/TypesOfRecipeCards/ProfilePost";
import { BrowserRouter } from "react-router-dom";
const recipe = testUser.recipes[0];

describe("Pinned ProfilePost", () => {
  it("renders recipe card info", () => {
    cy.mount(
      <BrowserRouter>
        <ProfilePost post={recipe} pinned={true} />
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
        <ProfilePost post={recipe} pinned={true} />
      </BrowserRouter>
    );
    cy.get(".pinned").should("exist");
  });

  it("does not render the Pinned icon when pinned is false", () => {
    cy.mount(
      <BrowserRouter>
        <ProfilePost post={recipe} pinned={false} />
      </BrowserRouter>
    );

    cy.get(".pinned").should("not.exist");
  });
});
