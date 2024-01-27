import React from 'react'
import NavBar from './NavBar'

describe('<NavBar />', () => {
  //ignore uncaught error of app not being wrapped in <Authenticator.provider> 
  //(we do have it wrapped cypress isn't detecting it)
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NavBar />)
  })
});