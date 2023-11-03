import NavBar from "../../src/components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";

describe("Render <NavBar /> component", () => {
  it("should contain categories nav text and inactive color is grey", () => {
    cy.mount(
      <Router>
        <NavBar />
      </Router>,
    );
    cy.get("#Home-text")
      .should("contain", "Home")
      .should("have.css", "color", "rgb(163, 163, 163)");
    cy.get("#Explore-text")
      .should("contain", "Explore")
      .should("have.css", "color", "rgb(163, 163, 163)");
    cy.get("#My-Recipes-text")
      .should("contain", "My Recipes")
      .should("have.css", "color", "rgb(163, 163, 163)");
    cy.get("#Saved-text")
      .should("contain", "Saved")
      .should("have.css", "color", "rgb(163, 163, 163)");
  });

  it("categories nav text inactive color is grey", () => {
    cy.mount(
      <Router>
        <NavBar />
      </Router>,
    );
    cy.get("#Home-icon").should(
      "have.css",
      "border-color",
      "rgb(229, 231, 235)",
    );
    cy.get("#Explore-icon").should(
      "have.css",
      "border-color",
      "rgb(229, 231, 235)",
    );
    cy.get("#My-Recipes-icon").should(
      "have.css",
      "border-color",
      "rgb(229, 231, 235)",
    );
    cy.get("#Saved-icon").should(
      "have.css",
      "border-color",
      "rgb(229, 231, 235)",
    );
  });

  it("nav categories turn black when active", () => {
    cy.mount(
      <Router>
        <NavBar />
      </Router>,
    );
    cy.contains("Home")
      .click()
      .should("have.css", "color")
      .and("eq", "rgb(0, 0, 0)");
    cy.contains("Explore")
      .click()
      .should("have.css", "color")
      .and("eq", "rgb(0, 0, 0)");
    cy.contains("My Recipes")
      .click()
      .should("have.css", "color")
      .and("eq", "rgb(0, 0, 0)");
    cy.contains("Saved")
      .click()
      .should("have.css", "color")
      .and("eq", "rgb(0, 0, 0)");
  });
});
