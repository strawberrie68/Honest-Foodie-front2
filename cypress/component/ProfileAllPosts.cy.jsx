import ProfileAllPosts from "../../src/pages/profile/ProfileSections/ProfileAllPosts";
import { testUser } from "../testData/testUser";
import { BrowserRouter } from "react-router-dom";

const user = testUser;
const totalPosts = user.reviews.length + user.recipes.length;

describe("ProfileAllPosts component", () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <ProfileAllPosts
          user={user}
          recipes={user.recipes}
          reviews={user.reviews}
        />
      </BrowserRouter>
    );
  });

  it("renders the correct number of RecipeCard  + Review components", () => {
    cy.get(".profile-all-posts").children().should("have.length", totalPosts);
  });

  it("RecipeCard info rendered", () => {
    cy.contains(user.recipes[0].title);
    cy.contains(user.recipes[0].description);
    cy.contains(user.recipes[0].rating);
    cy.contains(user.recipes[0].tags[0]);
  });

  it("ReviewCard info rendered", () => {
    cy.contains(user.reviews[0].userReview);
    cy.contains(user.reviews[0].rating.toFixed(1));
    cy.contains(user.firstName + " Recommends this recipe");
  });
});
