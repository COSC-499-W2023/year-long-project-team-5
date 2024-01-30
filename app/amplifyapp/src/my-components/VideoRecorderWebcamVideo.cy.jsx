import React from 'react'
import WebcamVideo from './VideoRecorder'

describe('<WebcamVideo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<WebcamVideo />)
    cy.get('.amplify-button').should('exist')
  })
})