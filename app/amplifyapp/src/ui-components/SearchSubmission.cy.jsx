import React from 'react'
import SearchSubmission from './SearchSubmission'

describe('<SearchSubmission />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SearchSubmission />)
  })
})