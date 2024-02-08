function login() {
    cy.visit('localhost:3000/submission')
    // using json file to store the login credentials (you have to create the file yourself - cypress.env.json)
    cy.get('input[name="username"]').type(Cypress.env('user_name'))
    cy.get('input[name="password"]').type(Cypress.env('password'))


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
    })

})