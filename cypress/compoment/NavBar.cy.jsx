import NavBar from "../../src/components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";

describe("Render <NavBar /> component", () => {
  it("all nav categories should be displayed", () => {
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
