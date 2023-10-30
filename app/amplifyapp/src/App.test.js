import { render, screen, act } from '@testing-library/react';
import App from './App';

test('renders create account', async () => {
  let linkElement;
  await act(() => {render(<App />)
  })
  await act(() => linkElement = screen.getByText(/Create Account/i))
  expect(linkElement).toBeInTheDocument();
});

test('renders create', async () => {
  let linkElement;
  await act(() => {render(<App />)
  })
  await act(() => linkElement = screen.getByText(/Create Account/i))
  expect(linkElement).toBeInTheDocument();
});

test('renders account', async () => {
  let linkElement;
  await act(() => {render(<App />)
  })
  await act(() => linkElement = screen.getByText(/Create Account/i))
  expect(linkElement).toBeInTheDocument();
});

test('renders login', async () => {
  let linkElement;
  await act(() => {render(<App />)
  })
  await act(() => linkElement = screen.getByText(/Create Account/i))
  expect(linkElement).toBeInTheDocument();
});