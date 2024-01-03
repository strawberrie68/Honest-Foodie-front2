import user1 from "../../src/assets/user/user1.svg";
import user2 from "../../src/assets/user/user2.svg";
import Pizza from "../../src/assets/pizza.jpg";

const review = {
  recipeId: {
    title: "Italian Pizza",
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
  userReview: "This is a great recipe. Would make it again",
  rating: 5,
  timesMade: 1,
  picturePath: Pizza,
  isRecommend: true,
};

const recipe = {
  title: "Italian Pizza",
  description: "Authentic Italian Pizza that is to die for",
  picturePath: Pizza,
  rating: 4.8,
  isRecommended: {},
  comments: [],
  review: [review],
  tags: ["pizza", "keto"],
  userId: {
    username: "annaReal",
    id: "1234",
    firstName: "Anna",
    lastName: "Real",
    picturePath: user1,
  },
};

export const testUser = {
  username: "annaReal",
  firstName: "Anna",
  lastName: "Real",
  email: "email.com",
  picturePath: user1,
  following: ["testuser02", "testuser03"],
  followers: ["testuser02", "testuser03"],
  recipes: [recipe, recipe],
  flavorProfile: ["vegetarian", "herb-lover", "cheese"],
  caption: "vegan and vegetable lover | Food Blogger",
  reviews: [review],
};
