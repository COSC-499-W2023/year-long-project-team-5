
describe('<VideoRecorder/>', () => {
    it('renders VideoRecorder and checks if recordButton loads/clicks', () => {
        cy.visit('localhost:3000/Recording')
        cy.get('.recordButton').should('exist')
          .then(() => 
            cy.get('.recordButton').click()
          )
    })
})
