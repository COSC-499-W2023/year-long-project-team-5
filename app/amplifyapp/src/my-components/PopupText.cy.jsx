// cypress test for PopupText component
import { PopupText } from './PopupText'

const TestPopUpText = ({children}) => {
    return (
        <div style={{ width: '20px' }}>
            <PopupText>{children}</PopupText>
        </div>
    )
}

describe('PopupText Render', () => {
    it('truncates as expected', () => {
        const mockContent = 'This is a super long text that should be truncated This is a super long text that should be truncated This is a super long text that should be truncated';
        cy.mount(<TestPopUpText>{mockContent}</TestPopUpText>)
        cy.get('.textContent').should('exist')
        cy.get('.textContent').should('have.css', 'text-overflow', 'ellipsis')
        cy.get('.textPopupOption').should('exist')
    })
    it('does not truncate short text', () => {
        const mockContent = 'Short text';
        cy.mount(<TestPopUpText>{mockContent}</TestPopUpText>)
        cy.get('.textContent').should('exist')
        cy.get('.textContent').should('not.have.css', 'text-overflow', 'ellipsis')
        cy.get('.textPopupOption').should('not.exist')
    })
})
