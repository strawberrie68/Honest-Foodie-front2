import CommentCard from "../../src/components/TypesOfRecipeCards/CommentCard";
import { testUser } from "../testData/testUser";

describe("User Review is EMPTY", () => {
  const user = {
    ...testUser,
    reviews: [],
  };

  beforeEach(() => {
    cy.mount(<CommentCard reviewer={user} review={null} />);
  });

  it("the component should is empty", () => {
    cy.get("comment-card-details").should("not.exist");
  });
});

describe("User Review is NOT EMPTY", () => {
  const userNotRecommends = {
    ...testUser,
    reviews: [
      {
        ...testUser.reviews[0],
        isRecommend: false,
      },
    ],
  };
  const badReview = userNotRecommends.reviews[0];

  const userRecommends = {
    ...testUser,
    reviews: [
      {
        ...testUser.reviews[0],
        isRecommend: true,
      },
    ],
  };
  const reviewIsRecommended = userRecommends.reviews[0];

  context("Recipe card info should be RENDER", () => {
    it("Recipe card info should be rendered", () => {
      cy.mount(
        <CommentCard reviewer={userRecommends} review={reviewIsRecommended} />
      );

      cy.contains(reviewIsRecommended.recipeId.title);
      cy.contains(reviewIsRecommended.recipeId.userId.firstName);
      cy.contains(reviewIsRecommended.recipeId.userId.lastName);
      cy.contains(reviewIsRecommended.recipeId.rating + " ⭐️");
      cy.contains(reviewIsRecommended.recipeId.reviews.length + " Reviews");
    });

    it("Recipe user review is rendered", () => {
      cy.mount(
        <CommentCard reviewer={userRecommends} review={reviewIsRecommended} />
      );

      cy.contains(reviewIsRecommended.rating.toFixed(1));
      cy.get(".user-review").contains(reviewIsRecommended.userReview);
      cy.contains(reviewIsRecommended.rating.toFixed(1));
      cy.contains(reviewIsRecommended.userReview);
      cy.get(".user-review").should("have.css", "text-overflow", "clip");
    });
  });

  context("Recipe card displays recommendation", () => {
    it("NOT RENDERED when recipe is not recommended", () => {
      cy.mount(<CommentCard reviewer={userNotRecommends} review={badReview} />);

      cy.contains(
        userNotRecommends.firstName + " Recommends this recipe"
      ).should("not.exist");
    });

    it("RENDERED when recipe is recommended", () => {
      cy.mount(
        <CommentCard reviewer={userRecommends} review={reviewIsRecommended} />
      );

      cy.contains(userRecommends.firstName + " Recommends this recipe");
    });
  });
});
