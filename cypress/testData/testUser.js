import user1 from "../../src/assets/user/user1.svg";
import user2 from "../../src/assets/user/user2.svg";
import Pizza from "../../src/assets/pizza.jpg";

const user = {
  username: "annaReal",
  id: "1234",
  firstName: "Anna",
  lastName: "Real",
  picturePath: user1,
};

const reviewer = {
  username: "Anna",
  id: "1234",
  firstName: "Anna",
  lastName: "Joe",
  picturePath: user2,
};

// Define a basic version of recipe without the reviews property
let recipe = {
  title: "Pepperoni Pizza",
  description:
    "There's something truly magical about this pizza recipe that captivates my taste buds every time. It's not just a dish; it's a symphony of flavors that dance on my palate, creating a culinary masterpiece. ",
  picturePath: Pizza,
  rating: 4.8,
  isRecommended: {},
  comments: [],
  tags: ["pizza", "keto"],
  userId: user,
  reviews: [],
};

const review = {
  recipeId: recipe,
  reviewerId: reviewer,
  userReview: "This is a great recipe",
  rating: 5,
  timesMade: 1,
  picturePath: Pizza,
  isRecommend: true,
};

// Update recipe with the reviews property
recipe = {
  ...recipe,
  reviews: [review, review, review],
};

export const testUser = {
  username: "annaReal",
  firstName: "Anna",
  lastName: "Real",
  email: "email.com",
  picturePath: user1,
  following: [user, user],
  followers: [user, user],
  recipes: [recipe, recipe],
  flavorProfile: ["vegetarian", "herb-lover", "cheese"],
  caption: "vegan and vegetable lover | Food Blogger",
  savedRecipes: [recipe, recipe],
  reviews: [review, review],
};
