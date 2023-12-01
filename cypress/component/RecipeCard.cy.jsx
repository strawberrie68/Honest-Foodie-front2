import RecipeCard from "../../src/components/TypesOfRecipeCards/RecipeCard";
import Pizza from "../../src/assets/pizza.jpg";
import User1 from "../../src/assets/user/user1.svg";

describe("Render RecipeCard component ", () => {
  const recipe = {
    title: "Italian Pizza",
    description: "Authentic Italian Pizza that is to die for",
    picturePath: Pizza,
    rating: 4.8,
    review: [5, 5, 4, 3, 5],
    tags: ["pizza", "keto"],
    userId: {
      username: "annaReal",
      id: "1234",
      firstName: "Anna",
      lastName: "Real",
      picturePath: User1,
    },
  };

  it("all the user info should be rendered", () => {
    cy.mount(<RecipeCard recipe={recipe} />);

    cy.contains(`${recipe.userId.firstName} ${recipe.userId.lastName}`);
    cy.contains(`${recipe.rating} ⭐️`);
    cy.contains(`${recipe.review.length} Reviews`);
    cy.contains(recipe.title);
    cy.contains(recipe.description);
  });
});
