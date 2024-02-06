import ProfilePost from "../../src/components/TypesOfRecipeCards/ProfilePost";
import { testUser } from "../testData/testUser";
import { BrowserRouter } from "react-router-dom";

const user = testUser;
const recipe = user.recipes[0];
const review = user.reviews[0];

describe("ProfilePost", () => {
  context("when ProfilePost is empty", () => {
    const user = { ...testUser, reviews: [] };

    beforeEach(() => {
      cy.mount(
        <BrowserRouter>
          <ProfilePost reviewer={user} post={null} />
        </BrowserRouter>
      );
    });

    it("ProfilePost does not render", () => {
      cy.get(".profile-post").should("not.exist");
    });
  });

  context("when ProfilePost is not empty", () => {
    context("ProfilePost contains only recipe", () => {
      it("renders recipe card info", () => {
        cy.mount(
          <BrowserRouter>
            <ProfilePost reviewer={user} post={recipe} />
          </BrowserRouter>
        );
        cy.contains(recipe.title);
        cy.contains(recipe.userId.firstName);
        cy.contains(recipe.userId.lastName);
        cy.contains(recipe.rating.toFixed(1) + " ⭐️");
        cy.contains(recipe.reviews.length + " Reviews");
      });
    });

    context("ProfilePost contains only review", () => {
      it("renders review info", () => {
        cy.mount(
          <BrowserRouter>
            <ProfilePost reviewer={user} post={review} />
          </BrowserRouter>
        );

        cy.contains(review.rating.toFixed(1));
        cy.get(".user-review").contains(review.userReview);
        cy.contains(review.userReview);
        cy.get(".user-review").should("have.css", "text-overflow", "clip");
      });
    });

    context("ProfilePost is a review - displays recommendation", () => {
      it("does not render when review is not recommended", () => {
        review.isRecommend = false;
        cy.mount(
          <BrowserRouter>
            <ProfilePost reviewer={user} post={review} />
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
            <ProfilePost reviewer={user} post={review} />
          </BrowserRouter>
        );

        cy.contains(user.firstName + " Recommends this recipe");
      });
    });
  });
});
