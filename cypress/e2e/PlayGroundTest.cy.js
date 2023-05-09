describe("Cypress demo using PlayGroundTest website", () => {
  beforeEach(function () {
    cy.visit("/");
    cy.viewport(1280, 720);
  });
  it("Home page Loads fine", () => {
    //title is present and visible
    cy.get("#title")
      .should("exist")
      .should("have.text", "UI Test AutomationPlayground");
    //image is present
    cy.get(".img-fluid")
      .should("exist")
      .should("be.visible")
      .should("have.attr", "src", "/static/cube.png")
      .should("have.attr", "alt", "Responsive image");

    cy.get(".alert")
      .should("have.class", "alert-warning")
      .should("have.css", "background-color", "rgb(255, 243, 205)");
  });
  it("Text Input validation", () => {
    cy.contains("a", "Text Input").click();
    cy.url().should("contain", "/textinput");
    cy.get("#newButtonName").click().type("Test Button Text");
    cy.get("#updatingButton")
      .should(
        "contain.text",
        "Button That Should Change it's Name Based on Input Value"
      )
      .should("have.css", "background-color", "rgb(0, 123, 255)")
      .click()
      .should("have.text", "Test Button Text");
  });
  it("Validate button colors and click on alert popup", () => {
    cy.contains("a", "Class Attribute").click();
    cy.url().should("contain", "/classattr");
    cy.contains("h3", "Class Attribute").should("exist");
    cy.contains("h4", "Playground").should("exist");
    cy.get(".btn-primary")
      .should("have.css", "background-color", "rgb(0, 123, 255)")
      .click();
    cy.log("It a Blue Button");
    cy.get(".btn-warning")
      .should("have.css", "background-color", "rgb(255, 193, 7)")
      .click();
    cy.log("It a Yellow Button");
    cy.get(".btn-success")
      .should("have.css", "background-color", "rgb(40, 167, 69)")
      .click();
    cy.log("It a Green Button");
  });
});
