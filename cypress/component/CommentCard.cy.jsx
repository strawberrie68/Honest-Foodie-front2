import CommentCard from "../../src/components/TypesOfRecipeCards/CommentCard";
import user1 from "../../src/assets/user/user1.svg";
import user2 from "../../src/assets/user/user2.svg";
import Pizza from "../../src/assets/pizza.jpg";

describe("User Review is EMPTY", () => {
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

  it("Recipe card info is EMPTY and NOT RENDERED", () => {
    cy.get(".comment-card").should("be.empty");
  });
});

describe("User Review is NOT EMPTY", () => {
  const userRecommends = {
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
          "This is a great recipe. There's something truly magical about this pizza recipe that captivates my taste buds every time. It's not just a dish; it's a symphony of flavors that dance on my palate, creating a culinary masterpiece. ",
        rating: 5,
        timesMade: 1,
        picturePath: Pizza,
        isRecommend: true,
      },
    ],
    flavorProfile: ["vegetarian", "herb-lover", "cheese"],
    caption: "vegan and vegetable lover | Food Blogger",
  };

  const userNotRecommends = {
    ...userRecommends,
    reviews: userRecommends.reviews.map((review) => ({
      ...review,
      isRecommend: false,
    })),
  };

  const reviewIsRecommended = userRecommends.reviews[0];

  context("Recipe card info should be RENDER", () => {
    it("Recipe card info should be rendered", () => {
      cy.mount(
        <CommentCard user={userRecommends} review={reviewIsRecommended} />,
      );

      cy.contains(reviewIsRecommended.recipeId.title);
      cy.contains(reviewIsRecommended.recipeId.userId.firstName);
      cy.contains(reviewIsRecommended.recipeId.userId.lastName);
      cy.contains(reviewIsRecommended.recipeId.rating + " ⭐️");
      cy.contains(reviewIsRecommended.recipeId.review.length + " Reviews");
    });

    it("Recipe user review is rendered", () => {
      cy.mount(
        <CommentCard user={userRecommends} review={reviewIsRecommended} />,
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
      cy.mount(
        <CommentCard
          user={userNotRecommends}
          review={userNotRecommends.reviews[0]}
        />,
      );

      cy.contains(
        userNotRecommends.firstName + " Recommends this recipe",
      ).should("not.exist");
    });

    it("RENDERED when recipe is recommended", () => {
      cy.mount(
        <CommentCard user={userRecommends} review={reviewIsRecommended} />,
      );

      cy.contains(userRecommends.firstName + " Recommends this recipe");
    });
  });
});
