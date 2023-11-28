import React from 'react'
import NoteCreateForm from './NoteCreateForm'

describe('<NoteCreateForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NoteCreateForm />)
  })
})