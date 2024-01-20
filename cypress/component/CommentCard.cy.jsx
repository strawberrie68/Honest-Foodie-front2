import CommentCard from "../../src/components/TypesOfRecipeCards/CommentCard";
import { testUser } from "../testData/testUser";

const user = testUser;
const review = user.reviews[0];

describe("CommentCard", () => {
  context("when user review is empty", () => {
    const user = { ...testUser, reviews: [] };

    beforeEach(() => {
      cy.mount(<CommentCard reviewer={user} review={null} />);
    });

    it("CommentCard does not render", () => {
      cy.get("comment-card-details").should("not.exist");
    });
  });

  context("when user review is not empty", () => {
    context("recipe card info", () => {
      beforeEach(() => {
        cy.mount(<CommentCard reviewer={user} review={review} />);
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
        cy.mount(<CommentCard reviewer={user} review={review} />);

        cy.contains(user.firstName + " Recommends this recipe").should(
          "not.exist"
        );
      });

      it("renders when recipe is recommended", () => {
        review.isRecommend = true;
        cy.mount(<CommentCard reviewer={user} review={review} />);

        cy.contains(user.firstName + " Recommends this recipe");
      });
    });
  });
});
