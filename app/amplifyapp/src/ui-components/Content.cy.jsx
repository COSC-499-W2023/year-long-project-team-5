import React from 'react'
import Content from './Content'

describe('<Content />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Content />)
  })
})