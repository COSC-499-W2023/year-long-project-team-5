import React from 'react'
import { SubmissionRow } from './SubmissionRow'
const expVidURL = 'https://www.w3schools.com/howto/howto_website_static.asp'
const fakeSubmission = {name: "Keena", email: 'kenaa@example.com', dateSent: '2020-01-01T00:00:00', dateReceived: '2020-01-03T00:00:00',videoLink: expVidURL}
describe('<SubmissionRow/>', () => {

    it('renders SubmissionRow', () => {
      // first thing is to check if the component is rendered
      cy.mount(<SubmissionRow name = {fakeSubmission.name} email = {fakeSubmission.email} 
       dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {fakeSubmission.videoLink} />)
    })

    // write assertions with .get to using className assigned in React..
    it('check if component renders with correct data being passed through props..', () => {
      cy.mount(<SubmissionRow name = {fakeSubmission.name} email = {fakeSubmission.email} 
      dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {fakeSubmission.videoLink} />)
      cy.get('.subClientName').eq(0).should('contains.text', 'Keena')
      cy.get('.subEmail').eq(0).should('contains.text', 'kenaa@example.com')
      cy.get('.subDS').eq(0).should('contains.text', '2020-01-01T00:00:00')
      cy.get('.subDR').eq(0).should('contains.text', '2020-01-03T00:00:00')
      cy.get('.subLink').eq(0).should('exist').and('contains.text', 'Video')
    })

    it("check if component renders 'No Video Received' text message instead of button if there's no link", () => {
      cy.mount(<SubmissionRow id = {fakeSubmission.id} email = {fakeSubmission.email} 
        dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {null} />)
      cy.get('.subLink').eq(0).should('exist').and('contains.text', ' No Video Received')

    })

    it("check if component renders 'NA' text message instead of date if there's no link", ()=> {
      cy.mount(<SubmissionRow id = {fakeSubmission.id} email = {fakeSubmission.email} 
        dateSent = {fakeSubmission.dateSent} dateReceived = '2022-01-12T12:10:05' videoLink = {null}  ></SubmissionRow>)
    })

    it("check if component renders 'NA' text message instead of date if there's no date", ()=> {
      cy.mount(<SubmissionRow id = {fakeSubmission.id} email = {fakeSubmission.email} 
        dateSent = {fakeSubmission.dateSent} dateReceived = {null} videoLink = {null}  ></SubmissionRow>)
    })
  })

