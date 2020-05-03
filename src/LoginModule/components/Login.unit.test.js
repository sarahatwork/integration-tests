import React from 'react';
import { render } from '@testing-library/react';
import { Login } from './Login';
import errors from '../../errors';

describe('Login', () => {
  it('renders default state', () => {
    const { getByRole } = render(<Login state={{ status: 'idle' }} />);

    const submitButton = getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });

  it('renders signed in state', () => {
    const { getByText, queryByRole } = render(
      <Login state={{ user: { email: 'test@email.com' } }} />
    );

    const loggedInText = getByText('Logged in as');
    expect(loggedInText).toBeInTheDocument();
    const emailAddressText = getByText('test@email.com');
    expect(emailAddressText).toBeInTheDocument();

    // form is not rendered
    const submitButton = queryByRole('button');
    expect(submitButton).toBeNull();
  });

  it('renders error state', () => {
    const { getByText } = render(
      <Login state={{ status: 'rejected', error: 'Missing password' }} />
    );

    const errorText = getByText('Error:');
    expect(errorText).toBeInTheDocument();
    const errorMessageText = getByText(errors['Missing password']);
    expect(errorMessageText).toBeInTheDocument();
  });
});
