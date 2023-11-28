import React from 'react'
import FilterTabs from './FilterTabs'

describe('<FilterTabs />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FilterTabs />)
  })
})