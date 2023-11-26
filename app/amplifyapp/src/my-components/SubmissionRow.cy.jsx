import React from 'react'
import { SubmissionRow } from './SubmissionRow'

const fakeSubmission = {id: 1, email: 'kenaa@example.com', dateSent: '2020-01-01T00:00:00', dateReceived: '2020-01-03T00:00:00',videoLink: 'https://www.youtube.com/watch?v=dQw4w9'}

describe('<SubmissionRow/>', () => {
    it('renders SubmissionRow', () => {
      // see: https://on.cypress.io/mounting-react
      // first thing is to check if the component is rendered
      cy.mount(<SubmissionRow id = {fakeSubmission.id} email = {fakeSubmission.email} 
       dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {fakeSubmission.videoLink} />)
    })
    // if each row has: id, email, date sent, date received, and video submission link
    it('each row has values in props: id, email, date sent, date received, and video submission link', () => {
      cy.mount(<SubmissionRow id = {fakeSubmission.id} email = {fakeSubmission.email} 
      dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {fakeSubmission.videoLink} />)
      cy.contains('1').should('be.visible');
      cy.contains('kenaa@example.com').should('be.visible');
      cy.contains('2020-01-01T00:00:00').should('be.visible');
      cy.contains('2020-01-03T00:00:00').should('be.visible');
      cy.contains('Video Link').should('be.visible');
      // cy.contains('https://www.youtube.com/watch?v=dQw4w9').should('be.visible');
    })
// trying to write assertions with props:
    it('renders SubmissionRow', () => {
      cy.mount(<SubmissionRow id = {fakeSubmission.id} email = {fakeSubmission.email} 
      dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {fakeSubmission.videoLink} />)
      cy.get('a.amplify-link').should('contains.text', 'Video Link')
      cy.get('a.amplify-link').should('have.attr', 'href').and('include', 'https://www.youtube.com/watch?v=dQw4w9')
    })
  })