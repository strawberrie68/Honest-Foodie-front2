import UserCategoryNav from "../../src/components/UserCategoryNav";

describe("Render <UserCategoryNav /> component", () => {
  it("all nav categories should be displayed", () => {
    cy.mount(<UserCategoryNav />);
    cy.contains("ALL");
    cy.contains("RECIPES");
    cy.contains("REVIEWS");
    cy.contains("TASTEBUDS");
  });
});
