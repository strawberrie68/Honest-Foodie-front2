import Explore from "../../../src/pages/navbar pages/explore/explore";
import { BrowserRouter as Router } from "react-router-dom";
describe("Explore Page", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <Explore />
      </Router>
    );
  });

  it("successfully loads", () => {
    cy.contains("Explore");
  });

  it("displays the correct heading", () => {
    cy.get("h1").should("contain", "Explore");
    cy.get(".search").should("contain", "Search");
    cy.get(".featured").should("contain", "Featured");
    cy.get(".trending").should("contain", "Trending");
    cy.get(".browse").should("contain", "Browse");
  });
});
