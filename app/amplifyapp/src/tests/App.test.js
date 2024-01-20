import { render, screen, act } from '@testing-library/react';
import App from '../App';


test('checks if text is on the screen', async () => {
  render(<App />);
  var linkElement;
  await act(async () => {
    linkElement = screen.getAllByText(/software/i);
  });
  expect(linkElement.length).toBeGreaterThan(0);
});