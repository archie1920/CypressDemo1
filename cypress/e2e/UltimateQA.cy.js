describe("Cypress E2E demo using UltimateQA", () => {
  let username;
  let password;

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
    username = random + "@" + random + ".com";
    password = random + "$";
    cy.get('input[name="user[email]"]').click().type(username);
    cy.get('input[name="user[password]"]').click().type(password);
    cy.get('input[name="user[terms]"]').click({ multiple: true, force: true });
    cy.get("button").click({ multiple: true, force: true });

    //sign up successful
    cy.contains("a", "My Dashboard")
      .should("exist")
      .should("have.attr", "href", "/enrollments");
  });

  it("After login user can access my profile", () => {
    cy.visit("https://courses.ultimateqa.com");
    cy.get(".header__nav-item.header__nav-sign-in").should("exist").click();
    cy.url().should("contain", "/sign_in");
    cy.get('input[name="user[email]"]').click().type(username);
    cy.get('input[name="user[password]"]').click().type(password);
    cy.get("button").click({ multiple: true, force: true })
  });
});
