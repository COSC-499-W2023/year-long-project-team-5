
// make cypress.env.json file in the root of the project (/amplifyapp) and add the following:
// { "login_email": "your_email", "login_password": "your_password" }

function login() {
    cy.visit('localhost:3000/submission')
    cy.get('input[name="username"]').type(Cypress.env('login_email'))
    cy.get('input[name="password"]').type(Cypress.env('login_password'), { log: false }) // Hide password from logs
    cy.get('button[type="submit"]').click()
}

function inputFormControlValues() {
    cy.get('input[name="name"]').type('testuser')
    cy.get('input[name="description"]').type('test description')
}

function testFormEmail(email) {
    cy.get('input[name="email"]').type(email)
    cy.get('button[type="submit"]').click()
}

function clearForm() {
    cy.get('input[name="name"]').clear()
    cy.get('input[name="description"]').clear()
    cy.get('input[name="email"]').clear()
}

describe('testing the request video form', () => {
    beforeEach(() => {
        login()
    })

    it('valid data: see if success feedback is shown on submit', () => {
        cy.get
        inputFormControlValues()
        testFormEmail('testuser@gmail.com')
        cy.get('.successFeedback').should('be.visible')
    })
    const clearlyWrongEmails = ['testuser', 'testuser@', 'testuser@.com', 'testxxxx@xxx', 'testuser.com', 'testuser@.com', 'testuser@@.com', 'testuser!@.com']
    it('invalid email data: see if error feedback is shown when typing', () => {
        clearlyWrongEmails.forEach(email => {
            clearForm()
            inputFormControlValues()
            testFormEmail(email)
            cy.get('.errorFeedback').should('be.visible')
        })
    })
})
