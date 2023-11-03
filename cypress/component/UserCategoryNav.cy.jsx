import UserCategoryNav from "../../src/components/UserCategoryNav";

describe("UserCategoryNav.cy.jsx", () => {
  it("playground", () => {
    cy.mount(<UserCategoryNav />);
    cy.contains("ALL");
    cy.contains("RECIPES");
    cy.contains("REVIEWS");
    cy.contains("TASTEBUDS");
  });
});
