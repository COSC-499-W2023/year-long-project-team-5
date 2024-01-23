import React from 'react'
import { SubmissionCard } from './SubmissionCard'

describe('<SubmissionCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SubmissionCard />)
  })
})