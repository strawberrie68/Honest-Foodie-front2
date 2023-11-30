import user1 from "../../src/assets/user/user1.svg";

import user2 from "../../src/assets/user/user2.svg";
import Pizza from "../../src/assets/pizza.jpg";
import ProfileAllPosts from "../../src/pages/profile/ProfileSections/ProfileAllPosts";

describe("ProfileAllPosts component", () => {
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
    reviews: [
      {
        recipeId: {
          title: "Itallian Pizza",
          picturePath: Pizza,
          rating: 4.8,
          tags: ["pizza", "keto"],
          userId: {
            username: "annieReal",
            id: "1234",
            firstName: "Annie",
            lastName: "Real",
            picturePath: user2,
          },
          review: [1, 2, 3, 45, 2],
        },
        userReview:
          "This is a great recipe. Would make it again rtrerr rrrrrrrrtr etrrekjrth qjkertjherw ktjkewhtv ertwrewr ewrw ",
        rating: 5,
        timesMade: 1,
        picturePath: Pizza,
        isRecommend: true,
      },
    ],
  };

  beforeEach(() => {
    cy.mount(
      <ProfileAllPosts
        user={user}
        recipes={user.recipes}
        reviews={user.reviews}
      />,
    );
  });

  it("renders the correct number of RecipeCard components", () => {
    cy.get(".profile-all-posts").children().should("have.length", 3); // replace 3 with the expected number of RecipeCard components
  });
});
