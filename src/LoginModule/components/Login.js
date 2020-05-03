import React from 'react';
import { LoginForm } from './LoginForm';
import Alert from '@material-ui/lab/Alert';

export function Login({ state, onSubmit }) {
  if (state.user) {
    return (
      <Alert severity="success">
        Logged in as <b>{state.user.email}</b>
      </Alert>
    );
  }

  const isLoading = state.status === 'pending';
  const isError = state.status === 'rejected';

  return (
    <>
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
      {isError && <Alert severity="error">{state.error}</Alert>}
    </>
  );
}
