import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { LoginForm } from './LoginForm';

export function Login({ state, onSubmit }) {
  if (state.user) {
    return (
      <Box m={1}>
        <Typography variant="body1">
          Logged in as <b>{state.user.email}</b>
        </Typography>
      </Box>
    );
  }

  const isLoading = state.status === 'pending';
  const isError = state.status === 'rejected';

  return (
    <>
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
      {isError && (
        <Box m={1}>
          <Typography variant="body1">
            <b>Error: </b> {state.error}
          </Typography>
        </Box>
      )}
    </>
  );
}
