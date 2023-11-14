import CommentCard from "../../src/components/TypesOfRecipeCards/CommentCard";
import user1 from "../../src/assets/user/user1.svg";
import user2 from "../../src/assets/user/user2.svg";
import Pizza from "../../src/assets/pizza.jpg";

describe("Render CommentCard Component when user review is EMPTY", () => {
  const user = {
    firstName: "Anna",
    lastName: "Real",
    picturePath: user1,
    reviews: [],
    flavorProfile: ["vegetarian", "herb-lover", "cheese"],
    caption: "vegan and vegetable lover | Food Blogger",
  };

  const review = user.reviews[0] || null;

  beforeEach(() => {
    cy.mount(<CommentCard user={user} review={review} />);
  });

  it("the component should is empty", () => {
    cy.get(".empty").should("be.empty");
  });
});

describe("Render CommentCard Component is NOT empty and receipe is recommended", () => {
  const user = {
    firstName: "Anna",
    lastName: "Real",
    picturePath: user1,
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
    flavorProfile: ["vegetarian", "herb-lover", "cheese"],
    caption: "vegan and vegetable lover | Food Blogger",
  };
  const review = user.reviews[0];

  beforeEach(() => {
    cy.mount(<CommentCard user={user} review={review} />);
  });

  it("orginal recipe info should be rendered ", () => {
    cy.contains(review.recipeId.title);
    cy.contains(review.recipeId.userId.firstName);
    cy.contains(review.recipeId.userId.lastName);
    cy.contains(review.recipeId.rating + " ⭐️");
    cy.contains(review.recipeId.review.length + " Reviews");
  });

  it("recipe review should be rendered", () => {
    cy.contains(review.rating.toFixed(1));
    cy.contains(review.userReview.slice(0, 105) + "...");
  });

  it("if profile recommend the recipe show", () => {
    cy.contains(user.firstName + " Recommends this recipe");
  });
});

describe("Render CommentCard Component is NOT empty and receipe is NOT recommended", () => {
  const user = {
    firstName: "Anna",
    lastName: "Real",
    picturePath: user1,
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
        isRecommend: false,
      },
    ],
    flavorProfile: ["vegetarian", "herb-lover", "cheese"],
    caption: "vegan and vegetable lover | Food Blogger",
  };
  const review = user.reviews[0];

  beforeEach(() => {
    cy.mount(<CommentCard user={user} review={review} />);
  });

  it("orginal recipe info should be rendered", () => {
    cy.contains(review.recipeId.title);
    cy.contains(review.recipeId.userId.firstName);
    cy.contains(review.recipeId.userId.lastName);
    cy.contains(review.recipeId.rating + " ⭐️");
    cy.contains(review.recipeId.review.length + " Reviews");
  });

  it("recipe review should be rendered", () => {
    cy.contains(review.rating.toFixed(1));
    cy.contains(review.userReview.slice(0, 105) + "...");
  });

  it("if profile does not recommend the recipe, should be empty", () => {
    cy.contains(user.firstName + " Recommends this recipe").should("not.exist");
  });
});
