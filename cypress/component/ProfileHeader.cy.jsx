import ProfileHeader from "../../src/components/ProfileHeader";
import user1 from "../../src/assets/user/user1.svg";

import user2 from "../../src/assets/user/user2.svg";
import Pizza from "../../src/assets/pizza.jpg";

describe("Render ProfileHeader Component ", () => {
  const recipe = {
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
    review: [review, review, review, review],
  };

  const review = {
    recipeId: recipe,
    userReview:
      "There's something truly magical about this pizza recipe that captivates my taste buds every time. It's not just a dish; it's a symphony of flavors that dance on my palate, creating a culinary masterpiece. ",
    rating: 5,
    timesMade: 1,
    picturePath: Pizza,
    isRecommend: true,
  };

  const user = {
    username: "annaReal",
    firstName: "Anna",
    lastName: "Real",
    email: "email.com",
    picturePath: user1,
    following: ["testuser02", "testuser03"],
    followers: ["testuser02", "testuser03", "testuser03"],
    recipes: [recipe, recipe],
    reviews: [review, review],
    flavorProfile: ["vegetarian", "herb-lover", "cheese"],
    caption: "vegan and vegetable lover | Food Blogger",
  };

  context("mobile test", () => {
    beforeEach(() => {
      // run these tests as if in a phone
      // browser with a 320 x 568 screen
      cy.viewport("iphone-5");
      cy.mount(<ProfileHeader user={user} />);
    });
    it("user image rendered", () => {
      cy.get("img").should("have.attr", "src", user1);
    });

    it("user stats rendered #posts, #following, #follower", () => {
      cy.get("#followings-num").contains("2");
      cy.get("#followers-num").contains("3");
      cy.get("#posts-num").contains("4");
    });

    it("user info rendered", () => {
      cy.contains(user.username);
      cy.contains(user.firstName);
      cy.contains(user.caption);
    });

    it("flavorId tags rendered", () => {
      cy.get("img").should("have.attr", "src", user1);
      cy.get("#flavor-profile-tags").contains("vegetarian");
      cy.get("#flavor-profile-tags").contains("herb-lover");
      cy.get("#flavor-profile-tags").contains("cheese");
    });
  });
  context("desktop test", () => {
    beforeEach(() => {
      // run these tests as if in a desktop
      // browser with a 1024 x 768 screen
      cy.viewport(1024, 768);
      cy.mount(<ProfileHeader user={user} />);
    });
    it("user image rendered", () => {
      cy.get("img").should("have.attr", "src", user1);
    });

    it("user stats rendered #posts, #following, #follower", () => {
      cy.get("#followings-num").contains("2");
      cy.get("#followers-num").contains("3");
      cy.get("#posts-num").contains("4");
    });

    it("user info rendered", () => {
      cy.contains(user.username);
      cy.contains(user.firstName);
      cy.contains(user.caption);
    });

    it("flavorId tags rendered", () => {
      cy.get("img").should("have.attr", "src", user1);
      cy.get("#flavor-profile-tags").contains("vegetarian");
      cy.get("#flavor-profile-tags").contains("herb-lover");
      cy.get("#flavor-profile-tags").contains("cheese");
    });
  });
});

describe("Render ProfileHeader Component when user data is EMPTY", () => {
  const emptyUser = {
    username: "annaReal",
    firstName: "Anna",
    lastName: "Real",
    email: "email.com",
    picturePath: user1,
    following: [],
    followers: [],
    recipes: [],
    reviews: [],
    flavorProfile: [],
    caption: "vegan and vegetable lover | Food Blogger",
  };

  context("mobile test", () => {
    beforeEach(() => {
      // run these tests as if in a desktop
      // browser with a iphone 5
      cy.viewport("iphone-5");
    });

    it("Number of following is zero", () => {
      cy.mount(<ProfileHeader user={emptyUser} />);

      cy.get("#followings-num").contains("0");
    });

    it("Number of follower is zero", () => {
      cy.mount(<ProfileHeader user={emptyUser} />);

      cy.get("#followers-num").contains("0");
    });

    it("Number of recipes and reviews is zero", () => {
      cy.mount(<ProfileHeader user={emptyUser} />);

      cy.get("#posts-num").contains("0");
    });
  });

  context("desktop test", () => {
    beforeEach(() => {
      // run these tests as if in a desktop
      // browser with a 1024 x 768 screen
      cy.viewport(1024, 768);
      cy.mount(<ProfileHeader user={emptyUser} />);
    });

    it("Number of following is zero", () => {
      cy.mount(<ProfileHeader user={emptyUser} />);

      cy.get("#followings-num").contains("0");
    });

    it("Number of follower is zero", () => {
      cy.mount(<ProfileHeader user={emptyUser} />);

      cy.get("#followers-num").contains("0");
    });
    it("Number of recipes and reviews is zero", () => {
      cy.mount(<ProfileHeader user={emptyUser} />);

      cy.get("#posts-num").contains("0");
    });
  });
});
