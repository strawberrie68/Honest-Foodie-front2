import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../../src/components/NavBar/NavBar.jsx";

const navItems = ["Home", "Explore", "My Recipes", "Saved"];

describe("renders NavBar - display basic icons", () => {
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

describe("NavBar - responsive", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <NavBar />
      </Router>
    );
  });
  it("renders correctly in mobile view", () => {
    const width = 360;
    cy.viewport(width, 640);

    cy.get(".navbar-container").should("have.css", "height", "64px");
    cy.get(".navbar-container").should("have.css", "width", width + "px");
    cy.get(".navbar-container .logo").should("not.be.visible");
    cy.get(".navbar-container .nav-link").should(
      "have.css",
      "flex-direction",
      "row"
    );
  });

  it("renders correctly in desktop view", () => {
    const height = 768;
    const width = 1024;
    cy.viewport(1024, 768);

    cy.get(".navbar-container").should("have.css", "height", height + "px");
    cy.get(".navbar-container").should("not.have.css", "width", width + "px");
    cy.get(".navbar-container .logo").should("be.visible");
    cy.get(".navbar-container .nav-link").should(
      "have.css",
      "flex-direction",
      "column"
    );
  });
});
