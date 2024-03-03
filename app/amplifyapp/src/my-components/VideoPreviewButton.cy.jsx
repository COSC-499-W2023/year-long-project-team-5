import React from 'react'
import { VideoPreviewButton } from './VideoPreviewButton'

describe('SubmissionCard Render', () => {
    it('renders', () => {
        cy.mount(<VideoPreviewButton/>)
    })
})

describe('VideoPreviewButton Component', () => {
    const mockProps = {
        videoUrl: 'your-video-url',
        name: 'Sample Video',
        description: 'This is a sample video for testing purposes'
      };
    beforeEach(() => {
      cy.mount(<VideoPreviewButton {...mockProps}/>)
    });
  
    it('should open and close the video preview', () => {
        cy.contains(/video/i).click();
  
        // Video preview should be open
        cy.get('#overlay').should('be.visible');
    
        // Close the video preview
        cy.get('svg').click({force: true});
    
        // Video preview should be closed
        cy.get('#overlay').should('not.exist');
    });
  
    it('should display video details correctly', () => { 
      cy.contains(/video/i).click();
  
      // Video preview should display correct details
      cy.get('#overlay')
        .should('be.visible')
        .within(() => {
          cy.get('h3').should('contain', mockProps.name);
          cy.get('p').should('contain', mockProps.description);
          cy.get('source').should('have.attr', 'src', mockProps.videoUrl);
        });
    });
});
  