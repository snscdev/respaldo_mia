import React from 'react';
import { render } from '@testing-library/react';
import LoadingScreen from './loading-screen';

test('renders LoadingScreen component correctly', () => {
  const { container } = render(<LoadingScreen />);
  expect(container).toBeTruthy();
});