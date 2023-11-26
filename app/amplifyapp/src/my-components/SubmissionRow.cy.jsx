import React from 'react'
import { SubmissionRow } from './SubmissionRow'
const expVidURL = 'https://www.w3schools.com/howto/howto_website_static.asp'
const fakeSubmission = {id: 1, email: 'kenaa@example.com', dateSent: '2020-01-01T00:00:00', dateReceived: '2020-01-03T00:00:00',videoLink: expVidURL}
const expSubURL = ''
describe('<SubmissionRow/>', () => {
    it('renders SubmissionRow', () => {
      // see: https://on.cypress.io/mounting-react
      // first thing is to check if the component is rendered
      cy.mount(<SubmissionRow id = {fakeSubmission.id} email = {fakeSubmission.email} 
       dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {fakeSubmission.videoLink} />)
    })
    // write assertions with .get to using className assigned in React..
    it('check if component renders with correct data being passed through props..', () => {
      cy.mount(<SubmissionRow id = {fakeSubmission.id} email = {fakeSubmission.email} 
      dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {fakeSubmission.videoLink} />)
      cy.get('.subID').eq(0).should('contains.text', '1')
      cy.get('.subEmail').eq(0).should('contains.text', 'kenaa@example.com')
      cy.get('.subDS').eq(0).should('contains.text', '2020-01-01T00:00:00')
      cy.get('.subDR').eq(0).should('contains.text', '2020-01-03T00:00:00')
      cy.get('.vidLink').eq(0).should('contains.text', 'Video Link')
      cy.get('.vidLink :first-child').eq(0).should('have.attr', 'href').and('include', expVidURL)
      //cy.get('.fullLink').eq(0).should('exist').and('have.attr', 'href')
    })
    //doesn't work as a test
    // it('check if video link when clicked, opens the correct link', () => {
    //   cy.mount(<SubmissionRow id = {fakeSubmission.id} email = {fakeSubmission.email} 
    //     dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {fakeSubmission.videoLink} />)
    //   cy.get('.vidLink :first-child').eq(0).click()
    //   .then((openedUrl) => {
    //     expect(openedUrl).to.eq(expVidURL);
    //     cy.go('back')
    //   })
    // })
    it('check if full submission link works and opens a new page', () =>{
      cy.mount(<SubmissionRow id = {fakeSubmission.id} email = {fakeSubmission.email} 
               dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {fakeSubmission.videoLink} />)
      cy.get('.fullLink :first-child').eq(0).click().then(
        () => {
          cy.url().should('equal', expSubURL)
        }
      )
      cy.go('back')
    })
  })

