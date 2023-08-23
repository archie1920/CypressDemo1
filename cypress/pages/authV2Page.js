class authV2 {
  getemail() {
    return cy.get('[data-testid="emailInput"] input');
  }
  getpwdinput() {
    return cy.get('[data-testid="passwordInput"] input');
  }
  getsigninBtn() {
    return cy.contains("button", "Sign in");
  }
  getSignUpBtn() {
    return cy.get('[data-testid="signUpButton"]');
  }

  signIn(username, password) {
    this.getemail().click().clear().type(username);
    this.getpwdinput().click().clear().type(password);
    this.getsigninBtn().click();
  }

  signIn_error(username, password) {
    this.getemail().click().clear().type(username);
    this.getpwdinput()
      .click()
      .clear()
      .type(password + "abc");
    this.getsigninBtn().click();
    cy.get("#mui-2-helper-text").should(
      "contain",
      "Incorrect email or password."
    );
  }

  invalidEmail_error(password) {
    this.getemail().click().clear().type("creator");
    this.getpwdinput().click().clear().type(password);
    this.getsigninBtn().click();
    cy.get("#mui-1-helper-text").should(
      "contain",
      "Must be a valid email address."
    );
  }
  incorrectemailpwd_error(username, password) {
    this.getemail()
      .click()
      .clear()
      .type("x" + username);
    this.getpwdinput().click().clear().type(password);
    this.getsigninBtn().click();
    cy.get("#mui-2-helper-text").should(
      "contain",
      "Incorrect email or password."
    );
  }

  getRandNum() {
    let s = "";
    s = Math.floor(Math.random() * 100) + 1;
    return s;
  }
  getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    return (today = mm + dd);
  }

  signUp(username) {
    this.getemail().click().type(username);
    this.getpwdinput().click().clear().type("postoffice");
    cy.get(".PrivateSwitchBase-input").click();
    this.getSignUpBtn().click();
  }

  signUp_emptyEmail() {
    this.getemail()
      .click()
      .type("test" + this.getRandNum() + "." + this.getToday());
    this.getpwdinput().click().clear().type("postoffice");
    cy.get(".PrivateSwitchBase-input").click();
    this.getSignUpBtn().click();
    cy.contains("p", "Must be a valid email address.");
  }

  signUp_incompletePassword() {
    this.getemail()
      .click()
      .type(
        "test" +
          "." +
          this.getToday() +
          "." +
          this.getRandNum() +
          "@qxyzt.testinator.com"
      );
    this.getpwdinput().click().clear().type("123");
    cy.get(".PrivateSwitchBase-input").click();
    this.getSignUpBtn().click();
    cy.contains("p", "Must be at least 8 characters.");
  }

  signup_Password_FieldValidation() {
    this.getemail()
      .click()
      .type(
        "test" +
          "." +
          this.getToday() +
          "." +
          this.getRandNum() +
          "@qdft.testinator.com"
      );
    cy.get(".PrivateSwitchBase-input").click();
    this.getSignUpBtn().click();
    cy.get('input[type="password"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");
  }

  
  apiKey = "9363f4854645646457458771d88918f3";
  domain = "xyz.testinator.com";
  inbox = "test*";
  limit = 1;
  sort = "descending";

  getVerificationCode(codeRetrievedCallback) {
    var vcode = 0;
    cy.wait(1000);
    cy.request(
      "GET",
      `https://api.mailinator.com/api/v2/domains/${this.domain}/inboxes/${this.inbox}/?limit=${this.limit}&sort=${this.sort}&token=${this.apiKey}`
    ).then((response) => {
      // Check if the response status is 200 OK
      expect(response.status).to.eq(200);
      let msgid = response.body.msgs[0].id;

      cy.request(
        "GET",
        `https://mailinator.com/api/v2/domains/${this.domain}/messages/${msgid}?token=${this.apiKey}`
      ).then((response) => {
        expect(response.status).to.eq(200);
        const verificationCode =
          response.body.parts[0].body.match(/>(\d{6})</)[0];
        vcode = verificationCode.substring(1, verificationCode.length - 1);
        cy.log(vcode);
        codeRetrievedCallback(vcode);
      });
      //cy.log(vcode);
    });
  }
}
export default new authV2();
