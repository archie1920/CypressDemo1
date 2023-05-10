describe("Cypress E2E demo using UltimateQA", () => {
  it(" New User registration", () => {
    cy.visit("https://courses.ultimateqa.com/users/sign_in");
    cy.get(".page__heading")
      .should("exist")
      .should("contain.text", "Welcome Back!");
    cy.get(".sign-in__sign-up").should("exist").should("be.visible").click();
    cy.url().should("contain", "/sign_up");
    cy.get(".page__heading").should("contain.text", "Create a new account");
    const random = "CypressDemo" + Math.random().toString().substr(2, 3);
    cy.log(random);
    cy.get('input[name="user[first_name]"]').click().type("Demo");
    //cy.get('#user\[first_name\]').click().type("Demo")
    cy.get('input[name="user[last_name]"]').click().type("Demo");
    cy.get('input[name="user[email]"]')
      .click()
      .type(random + "@" + random + ".com");
    cy.get('input[name="user[password]"]')
      .click()
      .type(random + "$");
    cy.get('input[name="user[terms]"]').click({ multiple: true, force: true });
    cy.get("button").click({ multiple: true, force: true });
      
    //handling captcha is work in progress ... looking for the solution how to handle it ...
  });
});
