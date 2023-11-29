import UserTastebuds from "../../src/pages/profile/ProfileSections/UserTastebuds";

describe("Display UserTastebuds section components", () => {
  beforeEach(() => {
    cy.mount(<UserTastebuds />);
  });

  it("user tasteId section displayed", () => {
    cy.get(".user-tasteId").contains("My taste id:");
    cy.get(".user-tasteId").children().should("have.length", 4);
  });

  it("user like section displayed", () => {
    cy.get(".user-likes").contains("I tend to like");
  });

  it("user favorite category displayed", () => {
    cy.get(".category-card-div").children().should("have.length", 7);
  });
});
