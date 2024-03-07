import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../../src/components/NavBar/NavBar.jsx";

const navItems = ["Home", "Explore", "My Recipes", "Saved"];

describe("CategoryCard", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <NavBar />
      </Router>
    );
  });

  navItems.forEach((navItem) => {
    it(`${navItem}: Displays the ${navItem} icon`, () => {
      cy.get(".nav-text").contains(navItem).should("be.visible");
    });

    it(`${navItem}: sets the active icon to ${navItem} correctly`, () => {
      cy.get(".nav-link").contains(navItem).click();
      cy.get(".nav-text").contains(navItem).should("have.class", "text-black");
      cy.get(".nav-text")
        .contains(navItem)
        .should("not.have.class", "text-neutral-400");
    });
  });
});
