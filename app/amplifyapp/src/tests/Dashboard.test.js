import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

jest.mock('../graphql/queries', () => ({
  listSubmissions: jest.fn(),
}));

jest.mock('../aws-exports', () => ({}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Dashboard component', () => {
    render(<Dashboard />);
    expect(screen.getByText('Your Video Submissions')).toBeInTheDocument();
  });

  it('fetches and displays submissions', async () => {
    const mockSubmissions = [
      { id: 1, User: { name: 'John', email: 'john@example.com' }, note: 'Test note', createdAt: new Date() },
    ];

    require('../graphql/queries').listSubmissions.mockResolvedValue({ data: { listSubmissions: { items: mockSubmissions } } });

    render(<Dashboard />);

    // Wait for the component to fetch and display submissions
    await screen.findByText('John');
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Test note')).toBeInTheDocument();
  });

  it('filters submissions based on search', async () => {
    const mockSubmissions = [
      { id: 1, User: { name: 'John', email: 'john@example.com' }, note: 'Test note', createdAt: new Date() },
      { id: 2, User: { name: 'Jane', email: 'jane@example.com' }, note: 'Another note', createdAt: new Date() },
    ];

    require('../graphql/queries').listSubmissions.mockResolvedValue({ data: { listSubmissions: { items: mockSubmissions } } });

    render(<Dashboard />);

    // Wait for the component to fetch and display submissions
    await screen.findByText('John');

    // Search for Jane
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Jane' } });

    // Wait for the component to filter submissions
    await screen.findByText('Jane');
    expect(screen.queryByText('John')).toBeNull();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });
});
