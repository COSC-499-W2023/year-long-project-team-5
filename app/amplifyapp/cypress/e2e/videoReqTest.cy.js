function login() {
    cy.visit('localhost:3000/submission')
    cy.get('input[name="username"]').type('ihnyntgidltnhhxjmh@cazlq.com')
    cy.get('input[name="password"]').type('Password123')
    cy.get('button[type="submit"]').click()
}
function inputFormTestEmail(email) {
    cy.get('input[name="name"]').type('axaxtestuser')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="description"]').type('this has to be there')
}

describe('testing the request video form', () => {
    it('valid data: see if success feedback is shown on submit', () => {
        login()
        inputFormTestEmail('testuser@test.com')
        cy.get('button[type="submit"]').click()
        cy.get('.successFeedback').should('be.visible')
    })
    it('invalid email data: see if error feedback is shown when typing', () => {
        login()
        inputFormTestEmail('testuser@.com')
        cy.get('button[type="submit"]').click()
        cy.get('.errorFeedback').should('be.visible')
        inputFormTestEmail('test.com')
        cy.get('button[type="submit"]').click()
        cy.get('.errorFeedback').should('be.visible')
        inputFormTestEmail('name')
        cy.get('button[type="submit"]').click()
        cy.get('.errorFeedback').should('be.visible')
        inputFormTestEmail('testuser@test.')
        cy.get('button[type="submit"]').click()
        cy.get('.errorFeedback').should('be.visible')
    })

})