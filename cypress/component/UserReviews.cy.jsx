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
      cy.get(".user-reviews").contains("No reviews yet").should("not.exist");
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
      cy.get(".user-reviews").children().should("have.length", 1);
    });

    it("should render correct text", () => {
      cy.get(".user-reviews").contains("No reviews yet");
    });
  });
});

// describe("UserReviews", () => {
//   testUser.reviews = [];
//   beforeEach(() => {
//     cy.mount(
//       <BrowserRouter>
//         <UserReviews user={testUser} reviews={testUser.reviews} />
//       </BrowserRouter>
//     );
//   });

//   context("when user has no reviews", () => {
//     it("should not render RecipeCard", () => {
//       testUser.reviews = [];

//       cy.get(".user-reviews").children().should("have.length", 0);
//     });

//     it("should render correct text", () => {
//       testUser.reviews = [];
//       cy.get(".user-reviews").contains("No reviews yet");
//     });
//   });
// });
