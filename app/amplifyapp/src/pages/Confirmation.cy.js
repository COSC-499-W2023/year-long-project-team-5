import React from 'react'
import { Confirmation } from './Confirmation'

describe('<Confirmation />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Confirmation />)
    cy.get('.App').should('exist')
  })
})