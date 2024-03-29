import { BrowserRouter as Router } from "react-router-dom";
import SearchBar from "../../src/components/SearchBar";

const navItems = ["Home", "Explore", "My Recipes", "Saved"];

describe("renders SearchBar - display basic icons", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <SearchBar />
      </Router>
    );
  });

  it("renders the search bar", () => {
    cy.get(".flex.w-full.gap-2").should("exist");
  });

  it("renders the search input", () => {
    cy.get('input[type="text"]').should("exist");
  });

  it("renders the search icon", () => {
    cy.get(".search-icon").should("exist");
  });

  it("renders the filter icon", () => {
    cy.get(".search-filter-icon").should("exist");
  });

  it("renders the add recipe link", () => {
    cy.get('a[href="/add/recipe"]').should("exist");
  });

  it("renders the add icon", () => {
    cy.get(".search-add-recipe").should("exist");
  });
});
