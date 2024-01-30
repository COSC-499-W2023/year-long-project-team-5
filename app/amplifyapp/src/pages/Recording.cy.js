import React from 'react'
import { Recording } from './Recording'

describe('<Recording />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Recording />)
    cy.get('.amplify-button').should('exist')
    cy.get('.App').should('exist')

  })
})