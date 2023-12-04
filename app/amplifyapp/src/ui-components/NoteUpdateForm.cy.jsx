import React from 'react'
import NoteUpdateForm from './NoteUpdateForm'

describe('<NoteUpdateForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NoteUpdateForm />)
  })
})