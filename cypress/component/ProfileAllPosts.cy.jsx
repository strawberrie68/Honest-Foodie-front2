import ProfileAllPosts from "../../src/pages/profile/ProfileSections/ProfileAllPosts";
import { testUser } from "../testData/testUser";
import { BrowserRouter } from "react-router-dom";

const user = testUser;

describe("ProfileAllPosts component", () => {
  context("when recipes and reviews are empty", () => {
    it("should be empty", () => {
      cy.mount(
        <BrowserRouter>
          <ProfileAllPosts user={user} recipes={[]} reviews={[]} />
        </BrowserRouter>
      );

      cy.get(".profile-all-posts").children().should("have.length", 0);
    });
  });

  context("contains reviews only", () => {
    beforeEach(() => {
      cy.mount(
        <BrowserRouter>
          <ProfileAllPosts user={user} recipes={[]} reviews={user.reviews} />
        </BrowserRouter>
      );
    });

    it("renders the correct number of reviews", () => {
      cy.get(".profile-all-posts")
        .children()
        .should("have.length", user.reviews.length);
    });

    it("renders review info", () => {
      cy.contains(user.reviews[0].userReview);
      cy.contains(user.reviews[0].rating.toFixed(1));
      cy.contains(user.firstName + " Recommends this recipe");
    });
  });

  context("contains recipes only", () => {
    beforeEach(() => {
      cy.mount(
        <BrowserRouter>
          <ProfileAllPosts user={user} recipes={user.recipes} reviews={[]} />
        </BrowserRouter>
      );
    });

    it("renders the correct number of recipes ", () => {
      cy.get(".profile-all-posts")
        .children()
        .should("have.length", user.recipes.length);
    });

    it("renders the recipe info ", () => {
      cy.contains(user.recipes[0].title);
      cy.contains(user.recipes[0].description);
      cy.contains(user.recipes[0].rating);
      cy.contains(user.recipes[0].tags[0]);
    });
  });
});
