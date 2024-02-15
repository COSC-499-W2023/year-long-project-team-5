// cypress test to see if the video recorder works on mobile and desktop
import React from 'react';
import WebcamVideo from './VideoRecorder';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for testing

describe('Video Recorder', () => {
    it('should record video on mobile', () => {
        cy.viewport('iphone-6');
        cy.mount(
        <MemoryRouter>
            <WebcamVideo />
        </MemoryRouter>
        );
        cy.get('.mobile-webcam').should('exist');
        cy.get('.recordButton').click();
        cy.wait(3000);
        cy.get('.stopButton').click();
        cy.get('.responsive-video').should('exist');
        cy.wait(3000);
    });
    it('should record video on tablet', () => {
        cy.viewport('ipad-2');
        cy.mount(
        <MemoryRouter>
            <WebcamVideo />
        </MemoryRouter>
        );
        cy.get('.mobile-webcam').should('exist');
        cy.get('.recordButton').click();
        cy.wait(3000);
        cy.get('.stopButton').click();
        cy.get('.responsive-video').should('exist');
        cy.wait(3000);
    });
    it('should record video on desktop', () => {
        cy.viewport('macbook-15');
        cy.mount(
        <MemoryRouter>
            <WebcamVideo />
        </MemoryRouter>
        );
        cy.get('.mobile-webcam').should('not.exist');
        cy.get('.recordButton').click();
        cy.wait(3000);
        cy.get('.stopButton').click();
        cy.get('.responsive-video').should('exist');
        cy.wait(3000);
    });
});
