import React from 'react';
import { DynamicText } from './DynamicText';

const TestDynamicText = ({ testWidths, children }) => {
    return <DynamicText variation="primary" testWidths={testWidths}>{children}</DynamicText>
}
describe('DynamicText Render with Mocked Measurements', () => {
    it('truncates as expected with mocked measurements', () => {
        const mockContent = 'This is a super long text that should be truncated This is a super long text that should be truncated This is a super long text that should be truncated';
        // Mock widths to simulate truncation
        const testWidths = { containerWidth: 100, contentWidth: 500 };
        cy.mount(<TestDynamicText testWidths={testWidths}>{mockContent}</TestDynamicText>)
        cy.get('.textContent').should('exist').and('have.css', 'text-overflow', 'ellipsis');
        cy.get('.textDynamicOption').should('exist');
    });
    it('expands and collapses as expected with mocked measurements', () => {
        const mockContent = 'This is a super long text that should be truncated This is a super long text that should be truncated This is a super long text that should be truncated';
        // Mock widths to simulate truncation
        const testWidths = { containerWidth: 100, contentWidth: 500 };
        cy.mount(<TestDynamicText testWidths={testWidths}>{mockContent}</TestDynamicText>)
        cy.get('.textContent').should('exist').and('have.css', 'text-overflow', 'ellipsis');
        cy.get('.textDynamicOption').should('exist').click();
        cy.get('.textContent').should('exist').and('not.have.css', 'text-overflow', 'ellipsis');
        cy.get('.textDynamicOption').should('exist').click();
        cy.get('.textContent').should('exist').and('have.css', 'text-overflow', 'ellipsis');
    });

    it('does not truncate short text with mocked measurements', () => {
        const mockContent = 'Short text';
        // Mock widths to simulate no truncation
        const testWidths = { containerWidth: 500, contentWidth: 100 };
        cy.mount(<TestDynamicText testWidths={testWidths}>{mockContent}</TestDynamicText>)
        cy.get('.textContent').should('exist').and('not.have.css', 'text-overflow', 'ellipsis');
        cy.get('.textDynamicOption').should('not.exist');
    });
});
