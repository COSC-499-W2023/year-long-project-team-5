describe('test filter menu', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/Submissions')
        cy.get('input[name=username]').type('ihnyntgidltnhhxjmh@cazlq.com')
        cy.get('input[name=password]').type('Password123')
        cy.get('button[type=submit]').click()
      })
    
     
    it('check to see if filter menu appears upon clicking filter button, and closes after clicking x', () => {
       
        cy.get('.sidebar-toggle').click()
            .then(() =>
            cy.get('.visible').should('exist')
            )
        cy.get('.filter_closeButton').click()
            .then(()=>
            cy.get('.visible').should('not.exist')
            )
    })
    it('check to see if filtering by video status works', () => {
        cy.get('.sidebar-toggle').click()
        cy.get('#videoStatusFilter').select('noVideo')
        cy.get('#submitFilters').click()
            .then(() =>
                cy.get('.amplify-button--enabled').should('not.exist')
            )
        cy.get('#videoStatusFilter').select('submitted')
            .then(() =>
                cy.get('.amplify-button--disabled').should('not.exist')
            )
    })
    it('check to see if filtering by date sent and received works', () => {
        cy.get('.sidebar-toggle').click()
        cy.get('#dateSent').type('2024-01-30').click()
        cy.get("#clearFilters").click()
        .then(() => 
            cy.get('#submissions').should('contains.text', 'Sent: 1/30/2024')
        )
        cy.get('#dateReceived').type('2024-01-31').click()
        cy.get('#submitFilters').click()
        .then(() =>
            cy.get('#submissions').should('contains.text', 'Received: 1/31/2024')     
        )
    })
    it('check to see if clearing filters works', () => {
        cy.get('.sidebar-toggle').click()
        cy.get("#clearFilters").click()
        .then(() =>
            cy.get("#dateSent").should('have.value', ''),
            cy.get("#dateReceived").should('have.value', ''),
            cy.get("#videoStatusFilter").should('have.value', '')
        )
    })
    
})
 