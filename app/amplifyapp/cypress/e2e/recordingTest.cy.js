
describe('test recording button', () => {
    it('visits recording page and clicks record button to see if it works', () => {
        cy.visit('localhost:3000/Recording')
        cy.get('.recordButton').should('exist')
          .then(() => 
            cy.get('.recordButton').click()
          )
    })
    it('visits recording page and sees if there is a delay for button to be rendered - should be ~500ms', () => {
        let startTime, endTime = 0
        cy.visit('localhost:3000/Recording')
        cy.window().then(win => {
            startTime = win.performance.now();
            cy.get('.recordButton').should('exist')
              .then(() => {
                  endTime = win.performance.now()
              })
              .then(() => {
                const duration = endTime- startTime;
                console.log(`Operation took ${duration} milliseconds.`)});
        });
    })
})
