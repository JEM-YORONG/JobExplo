import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders JobExplo landing page', () => {
  render(<App />);
  const titleElement = screen.getByText(/jobexplo/i);
  expect(titleElement).toBeInTheDocument();
});
