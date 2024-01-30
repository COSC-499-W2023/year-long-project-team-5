import React from 'react';
import {SubmissionTable} from './SubmissionTable'
import { SubmissionRow } from './SubmissionRow';

context('Laptop Test', () => {
    beforeEach(() => {
      // run these tests as if in a desktop
      // browser with a 720p monitor
      cy.viewport('macbook-13')
    })
    it('renders SubmsisionTable and see that each table header contains expected value', () => {
        cy.mount(<SubmissionTable></SubmissionTable>)
        cy.get('.tableHeader').eq(0).should('contains.text', 'Name')
        cy.get('.tableHeader').eq(1).should('contains.text', 'Email')
        cy.get('.tableHeader').eq(2).should('contains.text', 'Note')
        cy.get('.tableHeader').eq(3).should('contains.text', 'Date Sent')
        cy.get('.tableHeader').eq(4).should('contains.text', 'Date Received')
        cy.get('.tableHeader').eq(5).should('contains.text', 'Submission')
    })
})

context('Tablet Test', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport('ipad-2')
  })
  it('renders SubmsisionTable and see that each table header contains expected value', () => {
      cy.mount(<SubmissionTable></SubmissionTable>)
      cy.get('.tableHeader').eq(0).should('contains.text', 'Name')
      cy.get('.tableHeader').eq(1).should('contains.text', 'Email')
      cy.get('.tableHeader').eq(2).should('contains.text', 'Note')
      cy.get('.tableHeader').eq(3).should('contains.text', 'Date Sent')
      cy.get('.tableHeader').eq(4).should('contains.text', 'Date Received')
      cy.get('.tableHeader').eq(5).should('contains.text', 'Submission')
  })
})