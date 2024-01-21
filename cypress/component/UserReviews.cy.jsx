import UserReviews from "../../src/pages/profile/ProfileSections/UserReviews";
import { testUser } from "../../cypress/testData/testUser";
import { BrowserRouter } from "react-router-dom";

describe("UserReviews", () => {
  context("when user has reviews", () => {
    beforeEach(() => {
      cy.mount(
        <BrowserRouter>
          <UserReviews user={testUser} reviews={testUser.reviews} />
        </BrowserRouter>
      );
    });

    it("should render the correct number of RecipeCard components", () => {
      cy.get(".user-reviews")
        .children()
        .should("have.length", testUser.reviews.length);
    });

    it("should not render text", () => {
      cy.get(".empty-reviews").should("not.exist");
    });
  });

  context("when user has no reviews", () => {
    beforeEach(() => {
      testUser.reviews = [];
      cy.mount(
        <BrowserRouter>
          <UserReviews user={testUser} reviews={testUser.reviews} />
        </BrowserRouter>
      );
    });
    it("should not render RecipeCard", () => {
      cy.get(".user-reviews").children().should("have.length", 0);
    });

    it("should render correct text", () => {
      cy.get(".empty-reviews").contains("No reviews yet");
    });
  });
});
