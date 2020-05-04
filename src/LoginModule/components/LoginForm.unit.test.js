import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  test('initial state', () => {
    render(<LoginForm />);

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

  it('calls onSubmit with form data on submit button click', () => {
    const onSubmitSpy = jest.fn();
    render(<LoginForm onSubmit={onSubmitSpy} />);

    const emailField = screen.getByRole('textbox', { name: 'Email' });
    const passwordField = screen.getByLabelText('Password');
    const button = screen.getByRole('button');

    // fill out and submit form
    fireEvent.change(emailField, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordField, { target: { value: 'password' } });
    fireEvent.click(button);

    expect(onSubmitSpy).toHaveBeenCalledWith({
      email: 'test@email.com',
      password: 'password',
    });
  });

  it('updates button on loading state', () => {
    render(<LoginForm isLoading />);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');
  });
});
