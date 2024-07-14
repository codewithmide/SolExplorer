import React from 'react';
import { render } from '@testing-library/react';
import DashboardLayout from '@/app/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

test('renders DashboardLayout component correctly', () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: jest.fn(),
    query: {},
    pathname: '/',
    asPath: '/',
  }));

  const { asFragment } = render(<DashboardLayout path="test-path">Test Children</DashboardLayout>);
  expect(asFragment()).toMatchSnapshot();
});
