import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { LoginModule } from './';

describe('LoginModule', () => {
  test('initial state', () => {
    render(<LoginModule />);

    // it renders empty email and passsword fields
    const emailField = screen.getByRole('textbox', { name: 'Email' });
    expect(emailField).toHaveValue('');
    const passwordField = screen.getByLabelText('Password');
    expect(passwordField).toHaveValue('');

    // it renders enabled submit button
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Submit');
  });

  test('successful login', async () => {
    jest
      .spyOn(window, 'fetch')
      .mockResolvedValue({ json: () => ({ token: '123' }) });

    render(<LoginModule />);

    const emailField = screen.getByRole('textbox', { name: 'Email' });
    const passwordField = screen.getByLabelText('Password');
    const button = screen.getByRole('button');

    // fill out and submit form
    fireEvent.change(emailField, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordField, { target: { value: 'password' } });
    fireEvent.click(button);

    // it sets loading state
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');

    await waitFor(() => {
      // it hides form elements
      expect(button).not.toBeInTheDocument();
      expect(emailField).not.toBeInTheDocument();
      expect(passwordField).not.toBeInTheDocument();

      // it displays success text and email address
      const loggedInText = screen.getByText('Logged in as');
      expect(loggedInText).toBeInTheDocument();
      const emailAddressText = screen.getByText('test@email.com');
      expect(emailAddressText).toBeInTheDocument();
    });
  });

  test('error login', async () => {
    jest
      .spyOn(window, 'fetch')
      .mockResolvedValue({ json: () => ({ error: 'invalid password' }) });

    render(<LoginModule />);

    const emailField = screen.getByRole('textbox', { name: 'Email' });
    const passwordField = screen.getByLabelText('Password');
    const button = screen.getByRole('button');

    // fill out and submit form
    fireEvent.change(emailField, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordField, { target: { value: 'password' } });
    fireEvent.click(button);

    // it sets loading state
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');

    await waitFor(() => {
      // it resets button
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent('Submit');

      // it displays error text
      const errorText = screen.getByText('Error:');
      expect(errorText).toBeInTheDocument();
      const errorMessageText = screen.getByText('invalid password');
      expect(errorMessageText).toBeInTheDocument();
    });
  });
});
