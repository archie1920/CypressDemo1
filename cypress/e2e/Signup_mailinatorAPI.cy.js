import homePage from "../pages/homePage";
import authV2Page from "../pages/authV2Page";

describe("Signup flow", () => {
  let username;

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1280, 720);
  });

  it("SignUp with new email address", () => {
    username =
      "test" +
      authV2Page.getRandNum() +
      "." +
      authV2Page.getToday() +
      "@xyz.testinator.com";
    cy.log(username);

    cy.get("button").contains("Sign up").click();

    //make sure Auth V2 page loaded properly
    authV2Page.getemail().should("be.visible");
    authV2Page.getSignUpBtn().should("be.visible");
    cy.get("h4").should("contain", "Get started");
    cy.contains("p", "Please enter your details to join").should("exist");
    cy.url().should("contain", "/sign-up");
    authV2Page.signUp(username);

    //Email verification page
    cy.url().should("contain", "/sign-up");
    cy.get("h4").should("contain", "Verify your email");
    cy.get('[data-testid="signUpButton"]').should("be.disabled");
    cy.get('[data-testid="resendCodeButton"]')
      .should("exist")
      .should("have.attr", "href", "/a/sign-up");
    
    //get the verification code from mailinator 
    const codeRetrieved = (vcode) => {
      cy.log(vcode);
      cy.get('[data-id="0"]').type(vcode);
    };
    authV2Page.getVerificationCode(codeRetrieved);
    cy.get('[data-testid="signUpButton"]').should("be.not.disabled").click();
    //validation for successful login - nav-bar validation
    homePage.getJoinBtn().should("not.exist");
    //login button is not visible
    homePage.getLoginBtn().should("not.exist");
    //Packages page 
    cy.get('[data-testid="pageLinkPackages"]')
      .should("exist")
      .should("have.attr", "href", "/a/join");
  });

  it("Forgot Password - lets you reset the password", () => {
    cy.get("button").contains("Sign in").click();
    //make sure Auth V2 page loaded properly
    authV2Page.getemail().should("be.visible");
    authV2Page.getsigninBtn().should("be.visible");
    cy.get('[data-testid="forgotPasswordLink"]').click();
    cy.url().should("contain", "/password-reset");
    cy.contains("h4", "Reset password").should("exist");

    authV2Page.getemail().click().clear().type(username);

    cy.get('[data-testid="resetPasswordButton"]').click();
    //Password rest page
    cy.contains("h4", "Check your email").should("exist");
    cy.url().should("contain", "/password-reset");
    cy.get(".react-code-input").should("exist").should("be.visible");
    cy.get('[data-testid="passwordInput"]').should("exist");
    cy.get('[data-testid="passwordResetConfirmButton"]')
      .should("exist")
      .should("be.disabled");
    //Get the code from mailinator
    const codeRetrieved = (vcode) => {
      cy.log(vcode);
      cy.get('[data-id="0"]').type(vcode);
    };
    authV2Page.getVerificationCode(codeRetrieved);
    cy.get('[data-testid="passwordResetConfirmButton"]').should("be.disabled");
    authV2Page.getpwdinput().click().clear().type("postoffice");
    cy.get('[data-testid="passwordResetConfirmButton"]')
      .should("not.be.disabled")
      .click();
    //Password rest success page
    cy.get('[data-testid="StarsIcon"]').should("exist");
    cy.contains("h4", "All done!").should("exist");
    cy.get("button").contains("Sign in").click();
    //make sure Auth V2 page loaded properly and user is able to login after reset password
    authV2Page.getemail().should("be.visible");
    authV2Page.getsigninBtn().should("be.visible");
    authV2Page.signIn(username, "postoffice");
    cy.log("Login successful. redirected to Home page");
    //Join Community button is not visible
    homePage.getJoinBtn().should("not.exist");
    //login button is not visible
    homePage.getLoginBtn().should("not.exist");
  });
});
