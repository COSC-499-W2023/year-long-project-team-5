import React from 'react'
import { SubmissionRow } from './SubmissionRow'

const fakeSubmission = {id: 1, email: 'kenaa@example.com', dateSent: '2020-01-01T00:00:0', dateReceived: '2020-01-03T00:00',videoLink: 'https://www.youtube.com/watch?v=dQw4w9'}

describe('<SubmissionRow/>', () => {
    it('renders SubmissionRow', () => {
      // see: https://on.cypress.io/mounting-react
      // first thing is to check if the component is rendered
      cy.mount(<SubmissionRow id = {fakeSubmission.id} email = {fakeSubmission.email} 
       dateSent = {fakeSubmission.dateSent} dateReceived = {fakeSubmission.dateReceived} videoLink = {fakeSubmission.videoLink} />)
    })
    // if each row has: id, email, date sent, date received, and video submission link
    it('each row has values in props: id, email, date sent, date received, and video submission link', () => {
      cy.get('[data-cy=id').should('have.text', fakeSubmission.id);
      cy.get('[data-cy=email]').should('have.text', fakeSubmission.email);
      cy.get('[data-cy=dateSent]').should('have.text', fakeSubmission.dateSent);
      cy.get('[data-cy=dateReceived]').should('have.text', fakeSubmission.dateReceived);
      cy.get('[data-cy=videoLink]').should('have.text', 'Video Link');
      cy.get('[data-cy=videoLink]').should('have.attr', 'href', fakeSubmission.videoLink);
    })
    // if video link opens the correct webpage containing the video
    it('renders SubmissionRow', () => {
      cy.get('[data-cy=')
    })
  })