
import { BrowserRouter as Router } from "react-router-dom";
import CategoryCard from "../../src/components/CategoryCard.jsx";
import { categoriesIcon } from "../../src/shared/categoriesIcon.js";

const { icon, name } = categoriesIcon[0];

describe("CategoryCard", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <CategoryCard icon={icon} name={name} />
      </Router>
    );
  });

  it("displays the category name", () => {
    cy.contains(name);
    cy.contains(icon);

  });
});
