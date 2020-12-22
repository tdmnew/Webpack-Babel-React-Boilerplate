import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App.js';

test('renders div text', () => {
  render(<App />);
  const text = screen.getByText(/React App/i);
  expect(text).toBeInTheDocument();
});
