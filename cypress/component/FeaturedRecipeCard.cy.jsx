import FeaturedRecipeCategory from "../../src/components/TypesOfRecipeCards/FeaturedRecipeCard";

describe("Display FeaturedRecipeCategory componenet", () => {
  const category = [
    {
      picturePath:
        "https://plus.unsplash.com/premium_photo-1676234917179-a7b1ca98c984?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZvb2R8ZW58MHx8MHx8fDA%3D",
      title: "Top Recipes",
    },
  ];
  beforeEach(() => {
    cy.mount(<FeaturedRecipeCategory category={category[0]} />);
  });

  it("componenet renders img", () => {
    cy.get("img").should(
      "have.attr",
      "src",
      "https://plus.unsplash.com/premium_photo-1676234917179-a7b1ca98c984?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    );
  });

  it("componenet renders title", () => {
    cy.get(".featured-recipe-title").contains("Top Recipes");
  });
});
