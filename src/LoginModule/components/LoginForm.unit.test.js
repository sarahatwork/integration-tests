import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  test('initial state', () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);

    // it renders empty email and passsword fields
    const emailField = getByLabelText('Email');
    expect(emailField.value).toBe('');
    const passwordField = getByLabelText('Password');
    expect(passwordField.value).toBe('');

    // it renders enabled submit button
    const button = getByRole('button');
    expect(button.disabled).toBe(false);
    expect(button.textContent).toBe('Submit');
  });

  it('calls onSubmit with form data on submit button click', () => {
    const onSubmitSpy = jest.fn();
    const { getByLabelText, getByRole } = render(
      <LoginForm onSubmit={onSubmitSpy} />
    );

    const emailField = getByLabelText('Email');
    const passwordField = getByLabelText('Password');
    const button = getByRole('button');

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
    const { getByRole } = render(<LoginForm isLoading />);

    const button = getByRole('button');

    expect(button.disabled).toBe(true);
    expect(button.textContent).toBe('Loading...');
  });
});
