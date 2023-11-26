import React from 'react'
import { SubmissionRow } from './SubmissionRow'

describe('<SubmissionRow/>', () => {
    it('renders SubmissionRow', () => {
      // see: https://on.cypress.io/mounting-react
      cy.mount(<SubmissionRow />)
    })
  })