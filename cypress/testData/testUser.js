import user1 from "../../src/assets/user/user1.svg";

import user2 from "../../src/assets/user/user2.svg";
import Pizza from "../../src/assets/pizza.jpg";

export const testUser = {
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
      title: "Pepperoni Pizza",
      description:
        "There's something truly magical about this pizza recipe that captivates my taste buds every time. It's not just a dish; it's a symphony of flavors that dance on my palate, creating a culinary masterpiece. ",
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
