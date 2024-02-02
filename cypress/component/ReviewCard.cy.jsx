import ReviewCard from "../../src/components/TypesOfRecipeCards/ReviewCard";
import { testUser } from "../testData/testUser";
import { BrowserRouter } from "react-router-dom";

const user = testUser;
const review = user.reviews[0];

describe("ReviewCard", () => {
  context("when user review is empty", () => {
    const user = { ...testUser, reviews: [] };

    beforeEach(() => {
      cy.mount(
        <BrowserRouter>
          <ReviewCard reviewer={user} review={null} />
        </BrowserRouter>
      );
    });

    it("ReviewCard does not render", () => {
      cy.get("review-card").should("not.exist");
    });
  });

  context("when user review is not empty", () => {
    context("recipe card info", () => {
      beforeEach(() => {
        cy.mount(
          <BrowserRouter>
            <ReviewCard
              reviewer={user}
              review={review}
              recipe={review.recipeId}
            />
          </BrowserRouter>
        );
      });

      it("renders recipe card info", () => {
        cy.contains(review.recipeId.title);
        cy.contains(review.recipeId.userId.firstName);
        cy.contains(review.recipeId.userId.lastName);
        cy.contains(review.recipeId.rating.toFixed(1) + " ⭐️");
        cy.contains(review.recipeId.reviews.length + " Reviews");
      });

      it("renders user review", () => {
        cy.contains(review.rating.toFixed(1));
        cy.get(".user-review").contains(review.userReview);
        cy.contains(review.userReview);
        cy.get(".user-review").should("have.css", "text-overflow", "clip");
      });
    });

    context("recipe card displays recommendation", () => {
      it("does not render when recipe is not recommended", () => {
        review.isRecommend = false;
        cy.mount(
          <BrowserRouter>
            <ReviewCard
              reviewer={user}
              review={review}
              recipe={review.recipeId}
            />
          </BrowserRouter>
        );

        cy.contains(user.firstName + " Recommends this recipe").should(
          "not.exist"
        );
      });

      it("renders when recipe is recommended", () => {
        review.isRecommend = true;
        cy.mount(
          <BrowserRouter>
            <ReviewCard
              reviewer={user}
              review={review}
              recipe={review.recipeId}
            />
          </BrowserRouter>
        );

        cy.contains(user.firstName + " Recommends this recipe");
      });
    });
  });
});
