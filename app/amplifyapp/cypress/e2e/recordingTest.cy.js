
describe('test recording button', () => {
    it('visits recording page and clicks record button to see if it works', () => {
        cy.visit('localhost:3000/Recording')
        cy.get('.recordButton').should('exist')
          .then(() => 
            cy.get('.recordButton').click()
          )
    })
})
