import NavBar from "../../src/components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";

describe("Render NavBar component", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <NavBar />
      </Router>,
    );
  });

  it("icon is inactive by default", () => {
    cy.get(".icon").should("have.class", "icon-inactive");
  });

  it("icon is active when clicked", () => {
    cy.get(".icon").first().click().should("have.class", "icon-active");
  });

  it("icon label is inactive by default", () => {
    cy.get(".icon-label").should("have.class", "text-inactive");
  });

  it("icon label is active when clicked", () => {
    cy.get(".icon-label").first().click().should("have.class", "text-active");
  });
});
