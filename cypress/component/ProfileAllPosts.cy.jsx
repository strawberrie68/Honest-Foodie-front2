import ProfileAllPosts from "../../src/pages/profile/ProfileSections/ProfileAllPosts";
import { testUser } from "../testData/testUser";
import { BrowserRouter } from "react-router-dom";

describe("ProfileAllPosts component", () => {
  const user = testUser;
  const totalPosts = user.reviews.length + user.recipes.length;

  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <ProfileAllPosts recipes={user.recipes} reviews={user.reviews} />
      </BrowserRouter>
    );
  });

  it("renders the correct number of RecipeCard components", () => {
    cy.get(".profile-all-posts").children().should("have.length", totalPosts);
  });
});
