describe('', () => {
  it('Home page Loads fine', () => {
    cy.visit('/')
    //title is present and visible
    cy.get('#title').should("exist").should("have.text", "UI Test AutomationPlayground")
    //image is present
    cy.get('.img-fluid')
      .should("exist")
      .should("be.visible")
      .should("have.attr", "src", "/static/cube.png")
      .should("have.attr", "alt", "Responsive image")
    
    cy.get('.alert').should("have.class","alert-warning")
      .should("have.css", "background-color", "rgb(255, 243, 205)")
    
    
  })
})