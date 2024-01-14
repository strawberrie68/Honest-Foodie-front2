import CommentCard from "../../src/components/TypesOfRecipeCards/CommentCard";
import { testUser } from "../testData/testUser";

const createTestUser = (isRecommend) => ({
  ...testUser,
  reviews: [
    {
      ...testUser.reviews[0],
      isRecommend,
    },
  ],
});

const mountCommentCard = (user, review) => {
  cy.mount(<CommentCard reviewer={user} review={review} />);
};

describe("CommentCard", () => {
  context("when user review is empty", () => {
    const user = { ...testUser, reviews: [] };

    beforeEach(() => {
      mountCommentCard(user, null);
    });

    it("CommentCard does not render", () => {
      cy.get("comment-card-details").should("not.exist");
    });
  });

  context("when user review is not empty", () => {
    const userNotRecommends = createTestUser(false);
    const notRecommendedReview = userNotRecommends.reviews[0];

    const userRecommends = createTestUser(true);
    const recommendedReview = userRecommends.reviews[0];

    context("recipe card info", () => {
      beforeEach(() => {
        mountCommentCard(userRecommends, recommendedReview);
      });

      it("renders recipe card info", () => {
        cy.contains(recommendedReview.recipeId.title);
        cy.contains(recommendedReview.recipeId.userId.firstName);
        cy.contains(recommendedReview.recipeId.userId.lastName);
        cy.contains(recommendedReview.recipeId.rating.toFixed(1) + " ⭐️");
        cy.contains(recommendedReview.recipeId.reviews.length + " Reviews");
      });

      it("renders user review", () => {
        cy.contains(recommendedReview.rating.toFixed(1));
        cy.get(".user-review").contains(recommendedReview.userReview);
        cy.contains(recommendedReview.userReview);
        cy.get(".user-review").should("have.css", "text-overflow", "clip");
      });
    });

    context("recipe card displays recommendation", () => {
      it("does not render when recipe is not recommended", () => {
        mountCommentCard(userNotRecommends, notRecommendedReview);

        cy.contains(
          userNotRecommends.firstName + " Recommends this recipe"
        ).should("not.exist");
      });

      it("renders when recipe is recommended", () => {
        mountCommentCard(userRecommends, recommendedReview);

        cy.contains(userRecommends.firstName + " Recommends this recipe");
      });
    });
  });
});
