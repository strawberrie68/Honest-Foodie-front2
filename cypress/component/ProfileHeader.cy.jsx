import ProfileHeader from "../../src/components/ProfileHeader";
import user1 from "../../src/assets/user/user1.svg";

describe("Render ProfileHeader Component ", () => {
  const user = {
    username: "annaReal",
    firstName: "Anna",
    lastName: "Real",
    email: "email.com",
    picturePath: user1,
    following: ["testuser02", "testuser03"],
    followers: ["testuser02", "testuser03", "testuser03"],
    recipes: ["testrecipe01", "testrecipe02"],
    reviews: ["testreview01", "testreview02"],
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
