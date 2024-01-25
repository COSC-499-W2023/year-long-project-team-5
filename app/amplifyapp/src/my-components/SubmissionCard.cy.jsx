import React from 'react'
import { SubmissionCard } from './SubmissionCard'

describe('SubmissionCard Render', () => {
  it('renders', () => {
    cy.mount(<SubmissionCard />)
  })
})

describe('SubmissionCard loading props', () => {
  const mockProps = {
    id: 1,
    email: 'test@example.com',
    dateSent: '2024-01-23',
    dateReceived: '2024-01-24',
    videoLink: 'http://localhost:8080/video',
    description: 'Test description',
  };

  beforeEach(() => {
    cy.mount(<SubmissionCard {...mockProps} />)
  });

  it('renders with provided props', () => {
    cy.get('.amplify-card').should('exist');

    cy.contains(/N\/A/i).should('exist');
    cy.contains(/Email: test@example\.com/i).should('exist');
    cy.contains(/Sent: 2024-01-23/i).should('exist');
    cy.contains(/Instructions:/i).should('exist');
    cy.contains(/Test description/i).should('exist');
    cy.contains(/video/i).should('exist');
    cy.contains(/Received: 2024-01-24/i).should('exist');
  });

  it('opens video link in a new window when "Video" button is clicked', () => {

    //Prevent window from actually opening
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('.amplify-card').should('exist');
    //window should open at correct URL
    cy.contains(/video/i).click();
    cy.get('@windowOpen').should('be.calledWith', 'http://localhost:8080/video');
  });
});

describe('SubmissionCard loading props with nulls', () => {
  const propsWithNull = {
    id: 2,
    email: 'test@example.com',
    dateSent: '2024-01-23',
    description: 'Test description',
    videoLink: null,
    dateReceived: null,
  };

  it('renders "No Video Received" button when videoLink or dateReceived is null', () => {
    cy.mount(<SubmissionCard {...propsWithNull} />)

    cy.get('.amplify-card').should('exist');
    cy.contains(/No Video Received/i).should('exist');
    cy.contains(/Received:/i).should('not.exist');
  });
});
