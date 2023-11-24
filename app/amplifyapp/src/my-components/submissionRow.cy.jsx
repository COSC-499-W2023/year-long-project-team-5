import React from 'react'
import { submissionRow } from './submissionRow'

describe('<submissionRow />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<submissionRow />)
  })
})