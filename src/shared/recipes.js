import Pizza from "../assets/pizza.jpg";
import User1 from "../assets/user/user1.svg";
import User2 from "../assets/user/user2.svg";

export const recipes = [
  {
    title: "Itallian Pizza",
    description: "Authentic Italian Pizza that is to die for",
    picturePath: Pizza,
    rating: 4.8,
    servings: 10,
    steps: [
      {
        stepName: "Cake",
        step: [
          "In a large bowl, whisk the egg whites with an electric mixer until soft peaks form. Gradually whisk in the sugar until semi-stiff peaks form.",
          "In another bowl, whisk the egg yolks with the oil and milk. Add the flour. Add one-quarter of the meringue mixture and stir to combine. Using a spatula, gently fold in the remaining meringue. Spread the batter out in the two prepared cake pans.",
          "Bake for 20 minutes or until a toothpick inserted in the centre of a cake comes out clean. Remove from the oven and immediately turn the cake pans over on a wire rack to cool completely, about 2 hours. Run a thin blade between the side of the pans and the cakes to unmould.",
        ],
      },
      {
        stepName: "Whipped Cream",
        step: [
          "In a bowl, whisk the cream and ¼ cup (60 ml) of the condensed milk with an electric mixer until stiff peaks form. Transfer ½ cup (125 ml) of the whipped cream into a pastry bag fitted with a plain tip. Set aside until ready to decorate the cake.",
        ],
      },
      {
        stepName: "Assembly",
        step: [
          "Place one cake on a serving dish. Using a pastry brush, cover the top of the cake with the remaining condensed milk. Spread ¾ cup (180 ml) of the whipped cream over the top of the cake. Top with the diced strawberries. Cover with the second cake. Using a spatula, spread ¾ cup (180 ml) of the whipped cream in a thin layer around the sides of the cake. Spread the remaining whipped cream over the top of the cake. Using the pastry bag, pipe dollops of the reserved whipped cream around the top edge of the cake. Decorate with the fresh strawberries. The strawberry shortcake will keep covered in the refrigerator for 2 days.",
        ],
      },
    ],
    ingredients: [
      {
        ingredientsFor: "Cake",
        allIngredients: [
          {
            ingredient: "eggs",
            unit: "none",
            amount: 3,
          },
          {
            ingredient: "sugar",
            unit: "cup",
            amount: 0.25,
          },
          {
            ingredient: "vegetable oil",
            unit: "tbsp",
            amount: 2,
          },
          {
            ingredient: "milk",
            unit: "tbsp",
            amount: 2,
          },
          {
            ingredient: "all-purpose flour",
            unit: "cup",
            amount: 0.33,
          },
        ],
      },
      {
        ingredientsFor: "Whipped Cream",
        allIngredients: [
          {
            ingredient: "whipping cream",
            unit: "cup",
            amount: 3,
          },
          {
            ingredient: "condensed milk",
            unit: "cup",
            amount: 0.33,
          },
        ],
      },
    ],
    time: { hours: "1", minutes: "30" },
    isRecommended: {},
    comments: [],
    review: [
      {
        reviewer: {
          username: "annie",
          id: "1234",
          firstName: "Annie",
          lastName: "Joe",
          picturePath: User2,
        },
        review: "This is a great recipe",
        rating: 5,
        timesMade: 1,
        picturePath: Pizza,
      },
      {
        reviewer: {
          username: "annie",
          id: "1234",
          firstName: "Annie",
          lastName: "Joe",
          picturePath: User2,
        },
        review: "This is a great recipe",
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
      picturePath: User1,
    },
  },
  {
    userId: {
      username: "annaReal",
      id: "1234",
      firstName: "Anna",
      lastName: "Real",
      picturePath: User1,
    },
    title: "Raspberry Cream Cake",
    description: "Fresh berry cake for something light yet sweet",
    picturePath: Pizza,
    rating: 4.8,
    servings: 6,
    steps: [
      {
        stepName: "Cake",
        step: [
          "In a large bowl, whisk the egg whites with an electric mixer until soft peaks form. Gradually whisk in the sugar until semi-stiff peaks form.",
          "In another bowl, whisk the egg yolks with the oil and milk. Add the flour. Add one-quarter of the meringue mixture and stir to combine. Using a spatula, gently fold in the remaining meringue. Spread the batter out in the two prepared cake pans.",
          "Bake for 20 minutes or until a toothpick inserted in the centre of a cake comes out clean. Remove from the oven and immediately turn the cake pans over on a wire rack to cool completely, about 2 hours. Run a thin blade between the side of the pans and the cakes to unmould.",
        ],
      },
      {
        stepName: "Whipped Cream",
        step: [
          "In a bowl, whisk the cream and ¼ cup (60 ml) of the condensed milk with an electric mixer until stiff peaks form. Transfer ½ cup (125 ml) of the whipped cream into a pastry bag fitted with a plain tip. Set aside until ready to decorate the cake.",
        ],
      },
      {
        stepName: "Assembly",
        step: [
          "Place one cake on a serving dish. Using a pastry brush, cover the top of the cake with the remaining condensed milk. Spread ¾ cup (180 ml) of the whipped cream over the top of the cake. Top with the diced strawberries. Cover with the second cake. Using a spatula, spread ¾ cup (180 ml) of the whipped cream in a thin layer around the sides of the cake. Spread the remaining whipped cream over the top of the cake. Using the pastry bag, pipe dollops of the reserved whipped cream around the top edge of the cake. Decorate with the fresh strawberries. The strawberry shortcake will keep covered in the refrigerator for 2 days.",
        ],
      },
    ],
    ingredients: [
      {
        ingredientsFor: "Cake",
        allIngredients: [
          {
            ingredient: "eggs",
            unit: "none",
            amount: 3,
          },
          {
            ingredient: "sugar",
            unit: "cup",
            amount: 0.25,
          },
          {
            ingredient: "vegetable oil",
            unit: "tbsp",
            amount: 2,
          },
          {
            ingredient: "milk",
            unit: "tbsp",
            amount: 2,
          },
          {
            ingredient: "all-purpose flour",
            unit: "cup",
            amount: 0.33,
          },
        ],
      },
      {
        ingredientsFor: "Whipped Cream",
        allIngredients: [
          {
            ingredient: "whipping cream",
            unit: "cup",
            amount: 3,
          },
          {
            ingredient: "condensed milk",
            unit: "cup",
            amount: 0.33,
          },
        ],
      },
    ],
    time: { hours: "1", minutes: "30" },
    isRecommended: {},
    comments: [],
    review: [
      {
        reviewer: {
          username: "annie",
          id: "1234",
          firstName: "Annie",
          lastName: "Joe",
          picturePath: User2,
        },
        review: "This is a great recipe",
        rating: 5,
        timesMade: 1,
        picturePath: Pizza,
      },
      {
        reviewer: {
          username: "annie",
          id: "1234",
          firstName: "Annie",
          lastName: "Joe",
          picturePath: User2,
        },
        review: "This is a great recipe",
        rating: 5,
        timesMade: 1,
        picturePath: Pizza,
      },
    ],
    tags: ["cake", "berry"],
    description: "Authentic Pizza that is to die for",
  },
  {
    userId: {
      username: "annaReal",
      id: "1234",
      firstName: "Anna",
      lastName: "Real",
      picturePath: User1,
    },
    title: "Banana Whip Cream Pancakes",
    description: "Banana Pancakes perfect for breakfast",
    picturePath: Pizza,
    rating: 4.8,
    servings: 6,
    steps: [
      {
        stepName: "Cake",
        step: [
          "In a large bowl, whisk the egg whites with an electric mixer until soft peaks form. Gradually whisk in the sugar until semi-stiff peaks form.",
          "In another bowl, whisk the egg yolks with the oil and milk. Add the flour. Add one-quarter of the meringue mixture and stir to combine. Using a spatula, gently fold in the remaining meringue. Spread the batter out in the two prepared cake pans.",
          "Bake for 20 minutes or until a toothpick inserted in the centre of a cake comes out clean. Remove from the oven and immediately turn the cake pans over on a wire rack to cool completely, about 2 hours. Run a thin blade between the side of the pans and the cakes to unmould.",
        ],
      },
      {
        stepName: "Whipped Cream",
        step: [
          "In a bowl, whisk the cream and ¼ cup (60 ml) of the condensed milk with an electric mixer until stiff peaks form. Transfer ½ cup (125 ml) of the whipped cream into a pastry bag fitted with a plain tip. Set aside until ready to decorate the cake.",
        ],
      },
      {
        stepName: "Assembly",
        step: [
          "Place one cake on a serving dish. Using a pastry brush, cover the top of the cake with the remaining condensed milk. Spread ¾ cup (180 ml) of the whipped cream over the top of the cake. Top with the diced strawberries. Cover with the second cake. Using a spatula, spread ¾ cup (180 ml) of the whipped cream in a thin layer around the sides of the cake. Spread the remaining whipped cream over the top of the cake. Using the pastry bag, pipe dollops of the reserved whipped cream around the top edge of the cake. Decorate with the fresh strawberries. The strawberry shortcake will keep covered in the refrigerator for 2 days.",
        ],
      },
    ],
    ingredients: [
      {
        ingredientsFor: "Cake",
        allIngredients: [
          {
            ingredient: "eggs",
            unit: "none",
            amount: 3,
          },
          {
            ingredient: "sugar",
            unit: "cup",
            amount: 0.25,
          },
          {
            ingredient: "vegetable oil",
            unit: "tbsp",
            amount: 2,
          },
          {
            ingredient: "milk",
            unit: "tbsp",
            amount: 2,
          },
          {
            ingredient: "all-purpose flour",
            unit: "cup",
            amount: 0.33,
          },
        ],
      },
      {
        ingredientsFor: "Whipped Cream",
        allIngredients: [
          {
            ingredient: "whipping cream",
            unit: "cup",
            amount: 3,
          },
          {
            ingredient: "condensed milk",
            unit: "cup",
            amount: 0.33,
          },
        ],
      },
    ],
    time: { hours: "1" },
    isRecommended: {},
    comments: [],
    review: [
      {
        reviewer: {
          username: "annie",
          id: "1234",
          firstName: "Annie",
          lastName: "Joe",
          picturePath: User2,
        },
        review: "This is a great recipe",
        rating: 5,
        timesMade: 1,
        picturePath: Pizza,
      },
      {
        reviewer: {
          username: "annie",
          id: "1234",
          firstName: "Annie",
          lastName: "Joe",
          picturePath: User2,
        },
        review: "This is a great recipe",
        rating: 5,
        timesMade: 1,
        picturePath: Pizza,
      },
    ],
    tags: ["banana", "pancake"],
    description: "Fresh pancakes that is to die for",
  },
];
