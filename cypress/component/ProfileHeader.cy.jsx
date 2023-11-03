import ProfileHeader from "../../src/components/ProfileHeader";
import user1 from "../../src/assets/user/user1.svg";

describe("ProfileHeader.cy.jsx", () => {
  const user = {
    username: "annaReal",
    firstName: "Anna",
    lastName: "Real",
    email: "email.com",
    picturePath: user1,
    following: ["testuser02", "testuser03"],
    followers: ["testuser02", "testuser03", "testuser03"],
    recipes: ["testrecipe01", "testrecipe02"],
    reviews: ["testreview01", "testreview02"],
    flavorProfile: ["vegetarian", "herb-lover", "cheese"],
    caption: "vegan and vegetable lover | Food Blogger",
  };

  it("playground", () => {
    cy.mount(<ProfileHeader user={user} />);
    cy.contains(user.username);
    cy.get("#followings-num").contains("2");
    cy.get("#followers-num").contains("3");
    cy.get("#posts-num").contains("4");
    cy.contains(user.firstName);
    cy.contains(user.caption);
    cy.get("img").should("have.attr", "src", user1);
    cy.get("#flavor-profile-tags").contains("vegetarian");
    cy.get("#flavor-profile-tags").contains("herb-lover");
    cy.get("#flavor-profile-tags").contains("cheese");
  });
});
