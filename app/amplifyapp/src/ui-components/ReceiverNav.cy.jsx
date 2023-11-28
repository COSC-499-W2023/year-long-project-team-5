import React from 'react'
import ReceiverNav from './ReceiverNav'

describe('<ReceiverNav />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ReceiverNav />)
  })
})