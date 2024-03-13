// cypress test for DynamicText component
import { DynamicText } from './DynamicText'

const TestDynamicText = ({children}) => {
    return (
        <div width='200px'>
            <DynamicText>{children}</DynamicText>
        </div>
    )
}

describe('DynamicText Render', () => {
    it('truncates as expected', () => {
        const mockContent = 'This is a super long text that should be truncated This is a super long text that should be truncated This is a super long text that should be truncated';
        cy.mount(<TestDynamicText>{mockContent}</TestDynamicText>)
        cy.get('.textContent', { timeout: 1000 }).should('exist').and('have.css', 'text-overflow', 'ellipsis');
        cy.get('.textDynamicOption').should('exist');
    })
    
    it('does not truncate short text', () => {
        const mockContent = 'Short text';
        cy.mount(<TestDynamicText>{mockContent}</TestDynamicText>)
        cy.get('.textContent', { timeout: 1000 }).should('exist').and('not.have.css', 'text-overflow', 'ellipsis');
        cy.get('.textDynamicOption').should('not.exist');
    })
})
