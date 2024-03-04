
// make cypress.env.json file in the root of the project (/amplifyapp) and add the following:
// { "login_email": "your_email", "login_password": "your_password" }

function login() {
    cy.visit('localhost:3000/Request')
    cy.get('input[name="username"]').type(Cypress.env('login_email'))
    cy.get('input[name="password"]').type(Cypress.env('login_password'), { log: false }) // Hide password from logs
    cy.get('button[type="submit"]').click()
}

function inputFormControlValues(testEmail=false, testDescription=false) {
    cy.get('input[name="name"]').type('testuser')
    testDescription && cy.get('input[name="email"]').type('testuser@test.com')
    testEmail && cy.get('textarea[name="description"]').type("This is a test description for the video request form. This is a test description for the video request form. ")
}

function testFormEmail(email) {
    cy.get('input[name="email"]').type(email)
    cy.get('button[type="submit"]').click()
}
function testFormDescription(description) {
    cy.get('textarea[name="description"]').type(description)
    cy.get('button[type="submit"]').click()
}
function clearForm() {
    cy.get('input[name="name"]').clear()
    cy.get('textarea[name="description"]').clear()
    cy.get('input[name="email"]').clear()
}

describe('testing the request video form', () => {
    beforeEach(() => {
        login()
    })

    it('valid data: see if success feedback is shown on submit', () => {
        cy.get
        inputFormControlValues(true, true)
        cy.get('button[type="submit"]').click()
        cy.get('.successFeedback').should('be.visible')
    })
    const clearlyWrongEmails = ['testuser', 'testuser@', 'testuser@.com', 'testxxxx@xxx', 'testuser.com', 'testuser@.com', 'testuser@@.com', 'testuser!@.com']
    it('invalid email data: see if error feedback is shown when typing', () => {
        clearlyWrongEmails.forEach(email => {
            clearForm()
            inputFormControlValues(true, false)
            testFormEmail(email)
            cy.get('.errorFeedback').should('be.visible')
        })
    })
    it('invalid description data: see if error feedback is shown when message <20 char', () => {
        clearForm()
        inputFormControlValues(false, true)
        testFormDescription('short')
        cy.get('.errorFeedback').should('be.visible')
    })
    it('invalid description & email data: see error feedback when both email and description are wrong', () => {
        clearForm()
        inputFormControlValues(false, false)
        testFormDescription('short')
        cy.get('.errorFeedback').should('be.visible')
    })
})
