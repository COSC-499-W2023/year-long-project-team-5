import React from 'react'
import Filters from './Filters'

describe('<Filters />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Filters />)
  })
})