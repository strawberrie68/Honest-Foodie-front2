import AddRecipe from "../../src/pages/addRecipe/addRecipe";
import { BrowserRouter as Router } from "react-router-dom";

describe("AddRecipe", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <AddRecipe />
      </Router>
    );
  });

  it("submits the form correctly", () => {
    cy.get('input[name="title"]').type("Test Recipe");
    cy.get('input[name="servings"]').type("4");
    cy.get('input[name="hour"]').type("1");
    cy.get('input[name="minutes"]').type("30");
    cy.get('textarea[name="inputIngredients"]').type(
      "Cake\n- 1/2 cup flour\n- 1 cup sugar\n- 2 eggs\n- 1/2 cup milk"
    );
    cy.get('textarea[name="inputSteps"]').type(
      "- Mix flour, baking powder and salt in bowl\n- In a separate bowl mix egg and vanilla\n"
    );
    cy.get('input[name="inputTags"]').type("strawberry, cake");
    cy.get('input[type="submit"]').click();
  });
});

describe("AddRecipe - is displaying correctly", () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <AddRecipe />
      </Router>
    );
  });

  it("renders the form", () => {
    cy.get("form").should("exist");
  });

  it("renders the recipe name input", () => {
    cy.get('input[name="title"]').should("exist");
  });

  it("renders the servings input", () => {
    cy.get('input[name="servings"]').should("exist");
  });

  it("renders the time inputs", () => {
    cy.get('input[name="hour"]').should("exist");
    cy.get('input[name="minutes"]').should("exist");
  });

  it("renders the ingredients textarea", () => {
    cy.get('textarea[name="inputIngredients"]').should("exist");
  });

  it("renders the steps textarea", () => {
    cy.get('textarea[name="inputSteps"]').should("exist");
  });

  it("renders the tags input", () => {
    cy.get('input[name="inputTags"]').should("exist");
  });

  it("renders the submit button", () => {
    cy.get('input[type="submit"]').should("exist");
  });
});
