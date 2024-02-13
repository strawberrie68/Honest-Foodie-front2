import CategoryCard from "../../src/components/CategoryCard";
import user1 from "../../src/assets/user/user1.svg";

describe("Render CategoryCard componenet ", () => {
  const category = {
    name: "Popular",
    icon: "💫",
  };

  it("all the user info should be rendered", () => {
    cy.mount(<CategoryCard icon={category.icon} name={category.name} />);
    cy.contains("Popular");
    cy.contains("💫");
  });
});
