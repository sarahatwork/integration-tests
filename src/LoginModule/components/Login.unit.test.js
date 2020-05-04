import React from 'react';
import { render, screen } from '@testing-library/react';
import { Login } from './Login';

describe('Login', () => {
  it('renders default state', () => {
    render(<Login state={{ status: 'idle' }} />);

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });

  it('renders signed in state', () => {
    render(<Login state={{ user: { email: 'test@email.com' } }} />);

    const loggedInText = screen.getByText('Logged in as');
    expect(loggedInText).toBeInTheDocument();
    const emailAddressText = screen.getByText('test@email.com');
    expect(emailAddressText).toBeInTheDocument();

    // form is not rendered
    const submitButton = screen.queryByRole('button');
    expect(submitButton).toBeNull();
  });

  it('renders error state', () => {
    render(<Login state={{ status: 'rejected', error: 'invalid password' }} />);

    const errorText = screen.getByText('Error:');
    expect(errorText).toBeInTheDocument();
    const errorMessageText = screen.getByText('invalid password');
    expect(errorMessageText).toBeInTheDocument();
  });
});
