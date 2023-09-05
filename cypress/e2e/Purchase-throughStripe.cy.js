import homePage from "../pages/homePage";
import authV2Page from "../pages/authV2Page";
import videoPage from "../pages/videoPage";
import "cypress-plugin-stripe-elements";


describe("Purchase flow regression testcases ", () => {
  beforeEach(function () {
    cy.visit("/");
  });

  it("TC1 - Existing user is able to Buy Free subscription", () => {
    cy.viewport(1280, 720);
    //find gated video and click on it
    homePage.getLockIcon().should("exist").trigger("click");
    cy.url().should("contain", "video");
    //check for "join to Unlock" text
    videoPage
      .getUnlocktext()
      .should("exist")
      .should("contain", "Join To Unlock");
    cy.get('[data-testid="videoUnlockJoin"]').should("exist").click();
    
    cy.url().should("contain", "/a/join");

    cy.contains("p", "Forever")
      .parent()
      .parent()
      .find('[data-testid="buttonSubscribe"]')
      .should("contain", "Subscribe")
      .click();
    
    //not logged in user should be shown "Sign up page"
    authV2Page.getemail().should("be.visible");
    //click on Login to login as existing user
    cy.get('[data-testid="loginLink"]')
      .should("contain", "Login")
      .should("be.visible")
      .click();
    cy.fixture("logindata.json").then((user) => {
      authV2Page.signIn(user.user7.username, user.user7.password);
    });
    cy.url().should("contains", "/checkout/success/")
    cy.get('[data-testid="VerifiedRoundedIcon"]').should("be.visible")
    cy.get('h4').should("contain", "You're in!")
    cy.get('[data-testid="successButton"]').should("exist").click()
    homePage.getJoinBtn().should("not.exist");
    homePage.getLoginBtn().should("not.exist");
   
  });

  it("TC2 - Existing user is able to Buy Paid subscription", () => {
    cy.viewport(1280, 720);
    //find gated video and click on it
    homePage.getLockIcon().should("exist").trigger("click");
    cy.url().should("contain", "video");
    //check for "join to Unlock" text
    videoPage
      .getUnlocktext()
      .should("exist")
      .should("contain", "Join To Unlock");
    cy.get('[data-testid="videoUnlockJoin"]').should("exist").click();
    
    cy.url().should("contain", "/a/join");

    cy.contains("p", "Billed Monthly")
      .parent()
      .parent()
      .find('[data-testid="buttonSubscribe"]')
      .should("contain", "Subscribe")
      .click();
    
    //not logged in user should be shown "Sign up page"
    authV2Page.getemail().should("be.visible");
    //click on Login to login as existing user
    cy.get('[data-testid="loginLink"]')
      .should("contain", "Login")
      .should("be.visible")
      .click();
    cy.fixture("logindata.json").then((user) => {
      authV2Page.signIn(user.user8.username, user.user8.password);
    });

    cy.url().should("contains", "https://checkout.stripe.com/c/pay/")
  
    cy.get('iframe[name="stripe-origin-frame"]').should("exist")
    cy.get(".App-Payment").should("exist").should("be.visible")
    cy.get("#cardNumber").type("4242424242424242");
      cy.get("#cardCvc").type("123");
      cy.get("#cardExpiry").type(
        "12" + (new Date().getFullYear() + 10).toString().substr(-2)
      );
      cy.get("#billingName").type("auto test");
    cy.get("#billingPostalCode").type("94040");
    cy.get('[data-testid="hosted-payment-submit-button"]').click()
    
    cy.url().should("contains", "/checkout/success/")
    cy.get('[data-testid="VerifiedRoundedIcon"]').should("be.visible")
    cy.contains("h4", "You're in!").should("be.visible")
    cy.get('[data-testid="successButton"]').should("exist").click()
    homePage.getJoinBtn().should("not.exist");
    homePage.getLoginBtn().should("not.exist");
  });

})