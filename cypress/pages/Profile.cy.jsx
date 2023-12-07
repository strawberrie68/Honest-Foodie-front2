import Profile from "../../src/pages/profile/profile";
import { BrowserRouter as Router } from "react-router-dom";
describe("Profile Page", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <Profile />
      </Router>,
    );
  });

  it("should display the profileHeader component", () => {
    cy.get(".ProfileHeader").should("be.visible");
  });

  it("should display the UserCategoryNav component", () => {
    cy.get(".UserCategoryNav").should("be.visible");
  });

  it("When UserCategoryNav 'ALL' button should display recent user posts", () => {
    cy.get(".UserCategoryNav").contains("ALL").click();

    cy.get(".profile-title").should("contain", "Recent");
  });

  it("When UserCategoryNav 'RECIPES' button should display all user recipes", () => {
    cy.get(".UserCategoryNav").contains("RECIPES").click();

    cy.get(".profile-title").should("contain", "Recipes");
  });

  it("When UserCategoryNav 'REVIEWS' button should display all user reviews", () => {
    cy.get(".UserCategoryNav").contains("REVIEWS").click();

    cy.get(".profile-title").should("contain", "Reviews");
  });

  it("When UserCategoryNav 'TASTEBUDS' button should display user taste id", () => {
    cy.get(".UserCategoryNav").contains("TASTEBUDS").click();

    cy.get(".profile-title").should("contain", "Taste ID");
  });
});
