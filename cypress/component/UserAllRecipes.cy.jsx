import user1 from "../../src/assets/user/user1.svg";

import user2 from "../../src/assets/user/user2.svg";
import Pizza from "../../src/assets/pizza.jpg";
import UserAllRecipes from "../../src/pages/profile/ProfileSections/UserAllRecipes";

describe("UserAllRecipes", () => {
  const user = {
    username: "annaReal",
    firstName: "Anna",
    lastName: "Real",
    email: "email.com",
    picturePath: user1,
    following: ["testuser02", "testuser03"],
    followers: ["testuser02", "testuser03"],
    recipes: [
      {
        title: "Itallian Pizza",
        description: "Authentic Italian Pizza that is to die for",
        picturePath: Pizza,
        rating: 4.8,
        isRecommended: {},
        comments: [],
        review: [
          {
            reviewer: {
              username: "annie",
              id: "1234",
              firstName: "Annie",
              lastName: "Joe",
              picturePath: user2,
            },
            review: "This is a great recipe",
            rating: 5,
            timesMade: 1,
            picturePath: Pizza,
          },
          {
            reviewer: {
              username: "sandy",
              id: "1234",
              firstName: "Sandy",
              lastName: "James",
              picturePath: user2,
            },
            review: "Top notch",
            rating: 5,
            timesMade: 1,
            picturePath: Pizza,
          },
        ],
        tags: ["pizza", "keto"],
        userId: {
          username: "annaReal",
          id: "1234",
          firstName: "Anna",
          lastName: "Real",
          picturePath: user1,
        },
      },
      {
        title: "Itallian Pizza",
        description: "Authentic Italian Pizza that is to die for",
        picturePath: Pizza,
        rating: 4.8,
        isRecommended: {},
        comments: [],
        review: [
          {
            reviewer: {
              username: "annie",
              id: "1234",
              firstName: "Annie",
              lastName: "Joe",
              picturePath: user2,
            },
            review: "This is a great recipe",
            rating: 5,
            timesMade: 1,
            picturePath: Pizza,
          },
          {
            reviewer: {
              username: "sandy",
              id: "1234",
              firstName: "Sandy",
              lastName: "James",
              picturePath: user2,
            },
            review: "Top notch",
            rating: 5,
            timesMade: 1,
            picturePath: Pizza,
          },
        ],
        tags: ["pizza", "keto"],
        userId: {
          username: "annaReal",
          id: "1234",
          firstName: "Anna",
          lastName: "Real",
          picturePath: user1,
        },
      },
    ],
    flavorProfile: ["vegetarian", "herb-lover", "cheese"],
    caption: "vegan and vegetable lover | Food Blogger",
  };

  beforeEach(() => {
    cy.mount(<UserAllRecipes user={user} recipes={user.recipes} />);
  });

  it("renders the correct number of RecipeCard components", () => {
    cy.get(".recipe-card-container").children().should("have.length", 2); // replace 3 with the expected number of RecipeCard components
  });
});
