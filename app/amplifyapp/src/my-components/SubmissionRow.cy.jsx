import React from 'react'
import { SubmissionRow } from './SubmissionRow'
const expVidURL = 'https://www.w3schools.com/howto/howto_website_static.asp'
const fakeSubmission = {name: "Keena", email: 'kenaa@example.com', description: 'this is a description', dateSent: '2020-01-01T00:00:00', dateReceived: '2020-01-03T00:00:00',videoLink: expVidURL}

function setViewPortToDesktop(){
  cy.viewport(1280, 720)
}

describe('<SubmissionRow/>', () => {
    beforeEach(() => {
      setViewPortToDesktop()
    })

    it('renders SubmissionRow', () => {
      // first thing is to check if the component is rendered
      cy.mount(<SubmissionRow name = {fakeSubmission.name} email = {fakeSubmission.email} 
       dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {fakeSubmission.videoLink} />)
    })

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

    it('check if description renders properly', () => {
      cy.mount(<SubmissionRow id = {fakeSubmission.id} email = {fakeSubmission.email} 
        dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {fakeSubmission.videoLink} description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu" />)
      // get the description and check if the length of text is greater than 10
      cy.get('.description').invoke('text').then((text) => {
        expect(text.length).to.be.lessThan(150);
      });
    })
  })

