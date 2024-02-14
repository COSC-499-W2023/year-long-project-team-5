describe('test filter menu', () => {
    it('check to see if filter menu appears', () => {
        cy.visit('localhost:3000/Submissions')
        cy.get('.filter_button').click()
            .then(() =>
            cy.get('aside').should('exist')
            )
    })
})
