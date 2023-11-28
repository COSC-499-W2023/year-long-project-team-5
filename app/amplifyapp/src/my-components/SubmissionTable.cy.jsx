import React from 'react';
import {SubmissionTable} from './SumissionTable'

describe('<SubmissionTable/>', () => {
    it('renders SubmsisionTable and see that each table header contains expected value', () => {
        cy.mount(<SubmissionTable></SubmissionTable>)
        cy.get('.tableHeader').eq(0).should('contains.text', 'Customer ID')
        cy.get('.tableHeader').eq(1).should('contains.text', 'Customer Email')
        cy.get('.tableHeader').eq(2).should('contains.text', 'Date Sent')
        cy.get('.tableHeader').eq(2).should('contains.text', 'Date Received')
        cy.get('.tableHeader').eq(3).should('contains.text', 'Date Received')
        cy.get('.tableHeader').eq(4).should('contains.text', 'Video Link')
    })
})