function login() {
    cy.visit('localhost:3000/Submissions')
    cy.get('input[name="username"]').type(Cypress.env('login_email'))
    cy.get('input[name="password"]').type(Cypress.env('login_password'), { log: false }) // Hide password from logs
    cy.get('button[type="submit"]').click()
}
function setViewPortDesktop(){
    cy.viewport(1920, 1080)
}


describe('is text being truncated for submission table/card', () => {
    beforeEach(() => {
        setViewPortDesktop()
        login()
    })

    it('valid data: see if success feedback is shown on submit', () => {
        // wait for page to load:
        cy.wait(4000)
        // get all elements with .subRow class and then find the .description class within each element
        cy.get('.subRow').each(($el, index, $list) => {
            // get the text of the description
            const text = $el.find('.description').text()
            // check if the text is less than 100 characters
            expect(text.length).to.be.lessThan(100)
        })
    })
})
