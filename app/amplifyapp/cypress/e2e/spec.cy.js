describe('testing dark/light mode', () => {
  it('finds the content "toggle button on home page"', () => {
    cy.visit('localhost:3000')
    cy.get('.App').should('have.css', 'background-color')
    .then(backgroundColor => {
      //rgb(255, 255, 255) is light mode color 
      expect(backgroundColor).to.equal("rgb(255, 255, 255)"); // expect(backgroundColor) to be light mode
    });

    cy.get('.toggleColorMode').click()

    cy.get('.App').should('have.css', 'background-color')
    .then(backgroundColor => {
      //rgb(13,26,38) is dark mode color 
      expect(backgroundColor).to.equal("rgb(13, 26, 38)"); // expect(backgroundColor) to be dark mode
    });
  })
  it('switch to another page, see if bg is still dark mode bg"', () => {
    cy.visit('localhost:3000')
    cy.get('.toggleColorMode').click()
    cy.get('[style="flex-direction: row;"] > :nth-child(3)').click()
    cy.get('.App').should('have.css', 'background-color')
    .then(backgroundColor => {
      expect(backgroundColor).to.equal("rgb(13, 26, 38)"); // expect(backgroundColor) to be dark mode
    });
  })
  it('switch to another page, see if bg is still dark mode bg, then toggle back to light mode"', () => {
    cy.visit('localhost:3000')
    cy.get('.toggleColorMode').click()
    cy.get('[style="flex-direction: row;"] > :nth-child(3)').click()
    cy.get('.App').should('have.css', 'background-color')
    .then(backgroundColor => {
      //rgb(13,26,38) is dark mode color 
      expect(backgroundColor).to.equal("rgb(13, 26, 38)"); // expect(backgroundColor) to be dark mode
    });
    cy.get('.toggleColorMode').click()
    cy.get('.App').should('have.css', 'background-color')
    .then(backgroundColor => {
      //rgb(255, 255, 255) is light mode color 
      expect(backgroundColor).to.equal("rgb(255, 255, 255)"); // expect(backgroundColor) to be light mode
    });
  })
})