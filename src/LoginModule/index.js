import React from 'react';
import { useLogin } from './hooks/useLogin';
import { Login } from './components/Login';

export function LoginModule() {
  const { state, onSubmit } = useLogin();

  return <Login state={state} onSubmit={onSubmit} />;
}
